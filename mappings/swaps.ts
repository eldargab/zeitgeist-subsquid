import BN from 'bn.js'
import { EventContext, StoreContext } from '@subsquid/hydra-common'
import { Asset, HistoricalAssetPrice, Market, MarketHistory, Pool, Weight} from '../generated/model'
import { Swaps } from '../chain'
import { HistoricalPool } from '../generated/modules/historical-pool/historical-pool.model'

export async function swapPoolCreated({
    store,
    event,
    block,
    extrinsic,
}: EventContext & StoreContext) {

    const [cpep, pool] = new Swaps.PoolCreateEvent(event).params
    
    const newPool = new Pool()
    newPool.poolId = cpep.pool_id.toNumber();
    newPool.baseAsset = pool.base_asset.toString();
    newPool.marketId = pool.market_id.toNumber();
    newPool.poolStatus = pool.pool_status.toString();
    newPool.scoringRule = pool.scoring_rule.toString();
    newPool.swapFee = pool.swap_fee.toString();
    newPool.totalSubsidy = pool.total_subsidy.toString();
    newPool.totalWeight = pool.total_weight.toString();
    newPool.weights = []
    newPool.ztgQty = new BN(1000000000000)

    const savedMarket = await store.get(Market, { where: { marketId: newPool.marketId } })
    if (savedMarket) {
        savedMarket.poolId = newPool.poolId

        const mh = new MarketHistory()
        mh.event = event.method
        mh.poolId = savedMarket.poolId
        mh.blockNumber = block.height
        mh.timestamp = block.timestamp.toString()
        savedMarket.marketHistory?.push(mh)
        console.log(`[${event.method}] Saving market: ${JSON.stringify(savedMarket, null, 2)}`)
        await store.save<Market>(savedMarket)
    }

    const weights = JSON.parse(pool.weights.toString())
    Object.entries(weights).map(async entry => {
        const weight = new Weight()
        weight.assetId = entry[0]
        weight.len = entry[1] as string
        newPool.weights.push(weight)
        
        if (entry[0].length > 5) {
            const asset = await store.get(Asset, { where: { assetId: entry[0] } })
            if (!asset) { return }

            const spotPrice = await calcSpotPrice(+newPool.ztgQty,weights.Ztg,1000000000000,+weight.len, +pool.swap_fee.toString())
            asset.price = spotPrice
            asset.qty = new BN(1000000000000)
            console.log(`[${event.method}] Saving asset: ${JSON.stringify(asset, null, 2)}`)
            await store.save<Asset>(asset)

            const hap = new HistoricalAssetPrice()
            hap.assetId = asset.assetId
            hap.price = asset.price
            hap.qty = asset.qty
            hap.dPrice = hap.price
            hap.dQty = hap.qty
            hap.event = event.method
            hap.blockNumber = block.height
            hap.timestamp = new BN(block.timestamp)
            console.log(`[${event.method}] Saving historical asset price: ${JSON.stringify(hap, null, 2)}`)
            await store.save<HistoricalAssetPrice>(hap)
        }
    });
    console.log(`[${event.method}] Saving pool: ${JSON.stringify(newPool, null, 2)}`)
    await store.save<Pool>(newPool)

    const newHP = new HistoricalPool()
    newHP.poolId = newPool.poolId
    newHP.event = event.method
    newHP.ztgQty = newPool.ztgQty
    newHP.blockNumber = block.height
    newHP.timestamp = new BN(block.timestamp)
    console.log(`[${event.method}] Saving historical pool: ${JSON.stringify(newHP, null, 2)}`)
    await store.save<HistoricalPool>(newHP)
}

export async function swapPoolExited({
    store,
    event,
    block,
    extrinsic,
}: EventContext & StoreContext) {

    const [pae] = new Swaps.PoolExitEvent(event).params

    const savedPool = await store.get(Pool, { where: { poolId: pae.cpep.pool_id.toNumber() } })
    if (!savedPool) return

    const ztgWt = +savedPool.weights[savedPool.weights.length - 1].len
    const oldZtgQty = savedPool.ztgQty
    const newZtgQty = oldZtgQty.sub(new BN(pae.bounds[pae.bounds.length - 1])) 
    savedPool.ztgQty = newZtgQty
    console.log(`Saving pool: ${JSON.stringify(savedPool, null, 2)}`)
    await store.save<Pool>(savedPool)

    const newHP = new HistoricalPool()
    newHP.poolId = savedPool.poolId
    newHP.event = event.method
    newHP.ztgQty = savedPool.ztgQty
    newHP.blockNumber = block.height
    newHP.timestamp = new BN(block.timestamp)
    console.log(`Saving historical pool: ${JSON.stringify(newHP, null, 2)}`)
    await store.save<HistoricalPool>(newHP)

    savedPool.weights.forEach(async (wt, idx) => {
        const asset = await store.get(Asset, { where: { assetId: wt.assetId } })
        if (!asset) return

        const assetWt = +wt.len
        const oldAssetQty = asset.qty!
        const newAssetQty = oldAssetQty.sub(new BN(pae.bounds[idx]))
        const oldPrice = asset.price!
        const newPrice = await calcSpotPrice(newZtgQty.toNumber(),ztgWt,newAssetQty.toNumber(),assetWt,+savedPool.swapFee)

        asset.price = newPrice
        asset.qty = newAssetQty
        console.log(`[${event.method}] Saving asset: ${JSON.stringify(asset, null, 2)}`)
        await store.save<Asset>(asset)

        const hap = new HistoricalAssetPrice()
        hap.assetId = asset.assetId
        hap.price = asset.price
        hap.qty = asset.qty
        hap.dPrice = newPrice - oldPrice
        hap.dQty = newAssetQty.sub(oldAssetQty)
        hap.event = event.method
        hap.blockNumber = block.height
        hap.timestamp = new BN(block.timestamp)
        console.log(`[${event.method}] Saving historical asset price: ${JSON.stringify(hap, null, 2)}`)
        await store.save<HistoricalAssetPrice>(hap)
    });
}

export async function swapPoolJoined({
    store,
    event,
    block,
    extrinsic,
}: EventContext & StoreContext) {

    const [pae] = new Swaps.PoolJoinEvent(event).params

    const savedPool = await store.get(Pool, { where: { poolId: pae.cpep.pool_id.toNumber() } })
    if (!savedPool) return

    const ztgWt = +savedPool.weights[savedPool.weights.length - 1].len
    const oldZtgQty = savedPool.ztgQty
    const newZtgQty = oldZtgQty.add(new BN(pae.bounds[pae.bounds.length - 1])) 
    savedPool.ztgQty = newZtgQty
    console.log(`Saving pool: ${JSON.stringify(savedPool, null, 2)}`)
    await store.save<Pool>(savedPool)

    const newHP = new HistoricalPool()
    newHP.poolId = savedPool.poolId
    newHP.event = event.method
    newHP.ztgQty = savedPool.ztgQty
    newHP.blockNumber = block.height
    newHP.timestamp = new BN(block.timestamp)
    console.log(`Saving historical pool: ${JSON.stringify(newHP, null, 2)}`)
    await store.save<HistoricalPool>(newHP)

    savedPool.weights.forEach(async (wt, idx) => {
        const asset = await store.get(Asset, { where: { assetId: wt.assetId } })
        if (!asset) return

        const assetWt = +wt.len
        const oldAssetQty = asset.qty!
        const newAssetQty = oldAssetQty.add(new BN(pae.bounds[idx]))
        const oldPrice = asset.price!
        const newPrice = await calcSpotPrice(newZtgQty.toNumber(),ztgWt,newAssetQty.toNumber(),assetWt,+savedPool.swapFee)

        asset.price = newPrice
        asset.qty = newAssetQty
        console.log(`[${event.method}] Saving asset: ${JSON.stringify(asset, null, 2)}`)
        await store.save<Asset>(asset)

        const hap = new HistoricalAssetPrice()
        hap.assetId = asset.assetId
        hap.price = asset.price
        hap.qty = asset.qty
        hap.dPrice = newPrice - oldPrice
        hap.dQty = newAssetQty.sub(oldAssetQty)
        hap.event = event.method
        hap.blockNumber = block.height
        hap.timestamp = new BN(block.timestamp)
        console.log(`[${event.method}] Saving historical asset price: ${JSON.stringify(hap, null, 2)}`)
        await store.save<HistoricalAssetPrice>(hap)
    });
}

export async function swapExactAmountIn({
    store,
    event,
    block,
    extrinsic,
}: EventContext & StoreContext) {

    const [swapEvent] = new Swaps.SwapExactAmountInEvent(event).params
    
    const savedPool = await store.get(Pool, { where: { poolId: swapEvent.cpep.pool_id.toNumber() } })
    if (!savedPool) return

    const ztgWt = +savedPool.weights[savedPool.weights.length - 1].len
    const oldZtgQty = savedPool.ztgQty
    const newZtgQty = oldZtgQty.sub(new BN(swapEvent.asset_amount_out)) 
    savedPool.ztgQty = newZtgQty
    console.log(`Saving pool: ${JSON.stringify(savedPool, null, 2)}`)
    await store.save<Pool>(savedPool)

    const newHP = new HistoricalPool()
    newHP.poolId = savedPool.poolId
    newHP.event = event.method
    newHP.ztgQty = savedPool.ztgQty
    newHP.blockNumber = block.height
    newHP.timestamp = new BN(block.timestamp)
    console.log(`Saving historical pool: ${JSON.stringify(newHP, null, 2)}`)
    await store.save<HistoricalPool>(newHP)

    savedPool.weights.forEach(async wt => {
        const asset = await store.get(Asset, { where: { assetId: wt.assetId } })
        if (!asset) return

        const assetWt = +wt.len
        const oldAssetQty = asset.qty!
        const oldPrice = asset.price!
        var newAssetQty = new BN(0)

        if (extrinsic?.args[1] && wt.assetId === JSON.stringify(extrinsic?.args[1].value)) {
            newAssetQty = oldAssetQty.add(new BN(swapEvent.asset_amount_in))
        } else if (extrinsic?.args[0].name === "calls") {
            for (var ext of extrinsic.args[0].value as Array<{ args: { pool_id: number, asset_in: string }}> ) {
                const { args: { asset_in, pool_id } } = ext;
                if (pool_id == swapEvent.cpep.pool_id.toNumber() && wt.assetId == JSON.stringify(asset_in)) {
                    newAssetQty = oldAssetQty.add(new BN(swapEvent.asset_amount_in))
                    break
                }
            }
        }
        if (newAssetQty.eq(new BN(0))) newAssetQty = oldAssetQty
        const newPrice = await calcSpotPrice(newZtgQty.toNumber(),ztgWt,newAssetQty.toNumber(),assetWt,+savedPool.swapFee)

        asset.price = newPrice
        asset.qty = newAssetQty
        console.log(`[${event.method}] Saving asset: ${JSON.stringify(asset, null, 2)}`)
        await store.save<Asset>(asset)

        const hap = new HistoricalAssetPrice()
        hap.assetId = asset.assetId
        hap.price = asset.price
        hap.qty = asset.qty
        hap.dPrice = newPrice - oldPrice
        hap.dQty = newAssetQty.sub(oldAssetQty)
        hap.event = event.method
        hap.blockNumber = block.height
        hap.timestamp = new BN(block.timestamp)
        console.log(`[${event.method}] Saving historical asset price: ${JSON.stringify(hap, null, 2)}`)
        await store.save<HistoricalAssetPrice>(hap)
    });
}

export async function swapExactAmountOut({
    store,
    event,
    block,
    extrinsic,
}: EventContext & StoreContext) {

    const [swapEvent] = new Swaps.SwapExactAmountOutEvent(event).params
    
    const savedPool = await store.get(Pool, { where: { poolId: swapEvent.cpep.pool_id.toNumber() } })
    if (!savedPool) return

    const ztgWt = +savedPool.weights[savedPool.weights.length - 1].len
    const oldZtgQty = savedPool.ztgQty
    const newZtgQty = oldZtgQty.add(swapEvent.asset_amount_out)
    savedPool.ztgQty = newZtgQty
    console.log(`Saving pool: ${JSON.stringify(savedPool, null, 2)}`)
    await store.save<Pool>(savedPool)

    const newHP = new HistoricalPool()
    newHP.poolId = savedPool.poolId
    newHP.event = event.method
    newHP.ztgQty = savedPool.ztgQty
    newHP.blockNumber = block.height
    newHP.timestamp = new BN(block.timestamp)
    console.log(`Saving historical pool: ${JSON.stringify(newHP, null, 2)}`)
    await store.save<HistoricalPool>(newHP)

    savedPool.weights.forEach(async wt => {
        const asset = await store.get(Asset, { where: { assetId: wt.assetId } })
        if (!asset) return

        const assetWt = +wt.len
        const oldAssetQty = asset.qty!
        const oldPrice = asset.price!
        var newAssetQty = new BN(0)

        if (extrinsic?.args[1] && wt.assetId === JSON.stringify(extrinsic?.args[3].value)) {
            newAssetQty = oldAssetQty.sub(new BN(swapEvent.asset_amount_in))
        } else if (extrinsic?.args[0].name === "calls") {
            for (var ext of extrinsic.args[0].value as Array<{ args: { pool_id: number, asset_out: string }}> ) {
                const { args: { asset_out, pool_id } } = ext;
                if (pool_id == swapEvent.cpep.pool_id.toNumber() && wt.assetId == JSON.stringify(asset_out)) {
                    newAssetQty = oldAssetQty.sub(new BN(swapEvent.asset_amount_in))
                    break
                }
            }
        }
        if (newAssetQty.eq(new BN(0))) newAssetQty = oldAssetQty
        const newPrice = await calcSpotPrice(newZtgQty.toNumber(),ztgWt,newAssetQty.toNumber(),assetWt,+savedPool.swapFee)

        asset.price = newPrice
        asset.qty = newAssetQty
        console.log(`[${event.method}] Saving asset: ${JSON.stringify(asset, null, 2)}`)
        await store.save<Asset>(asset)

        const hap = new HistoricalAssetPrice()
        hap.assetId = asset.assetId
        hap.price = asset.price
        hap.qty = asset.qty
        hap.dPrice = newPrice - oldPrice
        hap.dQty = newAssetQty.sub(oldAssetQty)
        hap.event = event.method
        hap.blockNumber = block.height
        hap.timestamp = new BN(block.timestamp)
        console.log(`[${event.method}] Saving historical asset price: ${JSON.stringify(hap, null, 2)}`)
        await store.save<HistoricalAssetPrice>(hap)
    });
}

async function calcSpotPrice(tokenBalanceIn: number, tokenWeightIn: number, tokenBalanceOut: number, tokenWeightOut: number, swapFee: number): Promise<number> {
    const numer = tokenBalanceIn/tokenWeightIn
    const denom = tokenBalanceOut/tokenWeightOut
    const ratio = numer/denom
    const scale = 1/(1-swapFee)
    const spotPrice = ratio*scale
    return spotPrice
}