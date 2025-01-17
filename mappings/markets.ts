import BN from 'bn.js'
import { encodeAddress } from '@polkadot/keyring'
import { EventContext, StoreContext } from '@subsquid/hydra-common'
import { util } from '@zeitgeistpm/sdk'
import { Account, Asset, AccountBalance, CategoryMetadata, HistoricalAccountBalance, Market, MarketDisputeMechanism, MarketPeriod, MarketReport, MarketType, OutcomeReport, MarketStatus, HistoricalMarket } from '../generated/model'
import { PredictionMarkets } from '../chain'
import { Cache, IPFS, Tools } from './util'
import { MarketId, MarketType as MType } from '@zeitgeistpm/typesV1/dist/interfaces'

export async function predictionMarketBoughtCompleteSet({
    store,
    event,
    block,
    extrinsic,
}: EventContext & StoreContext) {

    const [marketIdOf, accountId] = new PredictionMarkets.BoughtCompleteSetEvent(event).params

    const savedMarket = await store.get(Market, { where: { marketId: marketIdOf.toNumber() } })
    if (!savedMarket) return

    const hm = new HistoricalMarket()
    hm.marketId = savedMarket.marketId
    hm.event = event.method
    hm.blockNumber = block.height
    hm.timestamp = new BN(block.timestamp)
    console.log(`[${event.name}] Saving historical market: ${JSON.stringify(hm, null, 2)}`)
    await store.save<HistoricalMarket>(hm)

    const walletId = encodeAddress(accountId, +(await Tools.getSDK()).api.consts.system.ss58Prefix.toString())
    var acc = await store.get(Account, { where: { wallet: walletId } })
    if (!acc) { return }

    const len = +savedMarket.marketType.categorical!
    for (var i = 0; i < len; i++) {
        const currencyId = util.AssetIdFromString(`[${marketIdOf},${i}]`)
        const ab = await store.get(AccountBalance, { where: { account: acc, assetId: currencyId } })
        if (!ab) { return } 

        var hab = await store.get(HistoricalAccountBalance, { where: 
            { accountId: acc.wallet, assetId: currencyId, event: "Endowed", blockNumber: block.height } })
        if (hab) {
            hab.event = hab.event.concat(event.method)
            console.log(`[${event.name}] Saving historical account balance: ${JSON.stringify(hab, null, 2)}`)
            await store.save<HistoricalAccountBalance>(hab)
        } else {
            var amount = new BN(0)
            if (extrinsic?.args[1]) {
                amount = new BN(extrinsic?.args[1].value.toString()!)
            } else if (extrinsic?.args[0].name === "calls") {
                for (var ext of extrinsic.args[0].value as Array<{ args: { amount: number, market_id: number }}> ) {
                    const { args: { amount: amt, market_id } } = ext;
                    if (market_id == marketIdOf.toNumber()) {
                        amount = new BN(amt)
                        break
                    }
                }
            }
            if (amount > new BN(0)) {
                ab.balance = ab.balance.add(amount)
                console.log(`[${event.name}] Saving account balance: ${JSON.stringify(ab, null, 2)}`)
                await store.save<AccountBalance>(ab)

                hab = new HistoricalAccountBalance()
                hab.accountId = acc.wallet
                hab.event = event.method
                hab.assetId = ab.assetId
                hab.amount = amount
                hab.balance = ab.balance
                hab.blockNumber = block.height
                hab.timestamp = new BN(block.timestamp)
                console.log(`[${event.name}] Saving historical account balance: ${JSON.stringify(hab, null, 2)}`)
                await store.save<HistoricalAccountBalance>(hab) 
            }
        }
    }
}

export async function predictionMarketApprovedV1({
    store,
    event,
    block,
    extrinsic,
}: EventContext & StoreContext) {

    const [marketIdOf] = new PredictionMarkets.MarketApprovedEventV1(event).params

    const savedMarket = await store.get(Market, { where: { marketId: marketIdOf.toNumber() } })
    if (!savedMarket) return

    savedMarket.status = savedMarket.scoringRule === "CPMM" ? MarketStatus.Active : MarketStatus.CollectingSubsidy
    console.log(`[${event.name}] Saving market: ${JSON.stringify(savedMarket, null, 2)}`)
    await store.save<Market>(savedMarket)

    const hm = new HistoricalMarket()
    hm.marketId = savedMarket.marketId
    hm.event = event.method
    hm.status = savedMarket.status
    hm.blockNumber = block.height
    hm.timestamp = new BN(block.timestamp)
    console.log(`[${event.name}] Saving historical market: ${JSON.stringify(hm, null, 2)}`)
    await store.save<HistoricalMarket>(hm)
}

export async function predictionMarketApprovedV2({
    store,
    event,
    block,
    extrinsic,
}: EventContext & StoreContext) {

    const [marketIdOf, status] = new PredictionMarkets.MarketApprovedEventV2(event).params

    const savedMarket = await store.get(Market, { where: { marketId: marketIdOf.toNumber() } })
    if (!savedMarket) return

    savedMarket.status = status.toString()
    console.log(`[${event.name}] Saving market: ${JSON.stringify(savedMarket, null, 2)}`)
    await store.save<Market>(savedMarket)

    const hm = new HistoricalMarket()
    hm.marketId = savedMarket.marketId
    hm.event = event.method
    hm.status = savedMarket.status
    hm.blockNumber = block.height
    hm.timestamp = new BN(block.timestamp)
    console.log(`[${event.name}] Saving historical market: ${JSON.stringify(hm, null, 2)}`)
    await store.save<HistoricalMarket>(hm)
}

export async function predictionMarketCreatedV1({
    store,
    event,
    block,
    extrinsic,
}: EventContext & StoreContext) {

    const [marketIdOf, market] = new PredictionMarkets.MarketCreatedEventV1(event).params

    const marketCreator = encodeAddress(market.creator, +(await Tools.getSDK()).api.consts.system.ss58Prefix.toString())
    const marketOracle = encodeAddress(market.oracle, +(await Tools.getSDK()).api.consts.system.ss58Prefix.toString())

    const newMarket = new Market()
    newMarket.marketId = marketIdOf.toNumber()
    newMarket.creator = marketCreator
    newMarket.creation = market.creation.toString()
    newMarket.creatorFee = market.creator_fee.toNumber()
    newMarket.oracle = marketOracle
    newMarket.outcomeAssets = (await createAssetsForMarket(marketIdOf, market.market_type)) as string[]

    const metadata = await decodeMarketMetadata(market.metadata.toString())
    if (metadata) {
        newMarket.slug = metadata.slug
        newMarket.question = metadata.question
        newMarket.description = metadata.description
        newMarket.img = metadata.img

        if (metadata.categories) {
            newMarket.categories = []

            for (let i = 0; i < metadata.categories.length; i++) {
                const cm = new CategoryMetadata()
                cm.name = metadata.categories[i].name
                cm.ticker = metadata.categories[i].ticker
                cm.img = metadata.categories[i].img
                cm.color = metadata.categories[i].color
                newMarket.categories.push(cm)
            }
        }
        
        if (metadata.tags) {
            newMarket.tags = []
            for (let i = 0; i < metadata.tags.length; i++) {
                newMarket.tags.push(metadata.tags[i])
            }
        }
    }

    const marketType = new MarketType()
    if (market.market_type.isCategorical) {
        marketType.categorical = market.market_type.asCategorical.toString()
    } else if (market.market_type.isScalar) {
        marketType.scalar = market.market_type.asScalar.toString()
    }
    newMarket.marketType = marketType

    const period = new MarketPeriod()
    if (market.period.isBlock) {
        period.block = market.period.asBlock.toString()

        const sdk = await Tools.getSDK()
        const now = (await sdk.api.query.timestamp.now()).toString();
        const head = await sdk.api.rpc.chain.getHeader();
        const blockNum = head.number.toNumber();
        const diffInMs = +(sdk.api.consts.timestamp.minimumPeriod).toString() * (market.period.asBlock[1].toNumber() - blockNum);
        newMarket.end = new BN(now + diffInMs)
    } else if (market.period.isTimestamp) {
        period.timestamp = market.period.asTimestamp.toString()
        newMarket.end = new BN(market.period.asTimestamp[1])
    }
    newMarket.period = period

    newMarket.scoringRule = market.scoring_rule.toString()
    newMarket.status = market.status.toString()

    const mdm = new MarketDisputeMechanism()
    if (market.mdm.isAuthorized) {
        mdm.authorized = market.mdm.asAuthorized.toString()
    } else if (market.mdm.isCourt) {
        mdm.court = true
    } else if (market.mdm.isSimpleDisputes) {
        mdm.simpleDisputes = true
    }
    newMarket.mdm = mdm

    console.log(`[${event.name}] Saving market: ${JSON.stringify(newMarket, null, 2)}`)
    await store.save<Market>(newMarket)

    const hm = new HistoricalMarket()
    hm.marketId = newMarket.marketId
    hm.event = event.method
    hm.status = newMarket.status
    hm.blockNumber = block.height
    hm.timestamp = new BN(block.timestamp)
    console.log(`[${event.name}] Saving historical market: ${JSON.stringify(hm, null, 2)}`)
    await store.save<HistoricalMarket>(hm)

    const len = +newMarket.marketType.categorical!
    for (var i = 0; i < len; i++) {
        const asset = new Asset()
        asset.assetId = JSON.stringify(util.AssetIdFromString(`[${marketIdOf},${i}]`))
        console.log(`[${event.name}] Saving asset: ${JSON.stringify(asset, null, 2)}`)
        await store.save<Asset>(asset)
    }
}

export async function predictionMarketCreatedV2({
    store,
    event,
    block,
    extrinsic,
}: EventContext & StoreContext) {

    const [marketIdOf, market] = new PredictionMarkets.MarketCreatedEventV2(event).params

    const marketCreator = encodeAddress(market.creator, +(await Tools.getSDK()).api.consts.system.ss58Prefix.toString())
    const marketOracle = encodeAddress(market.oracle, +(await Tools.getSDK()).api.consts.system.ss58Prefix.toString())

    const newMarket = new Market()
    newMarket.marketId = marketIdOf.toNumber()
    newMarket.creator = marketCreator
    newMarket.creation = market.creation.toString()
    newMarket.creatorFee = market.creator_fee.toNumber()
    newMarket.oracle = marketOracle
    newMarket.outcomeAssets = (await createAssetsForMarket(marketIdOf, market.market_type)) as string[]

    const metadata = await decodeMarketMetadata(market.metadata.toString())
    if (metadata) {
        newMarket.slug = metadata.slug
        newMarket.question = metadata.question
        newMarket.description = metadata.description
        newMarket.img = metadata.img

        if (metadata.categories) {
            newMarket.categories = []

            for (let i = 0; i < metadata.categories.length; i++) {
                const cm = new CategoryMetadata()
                cm.name = metadata.categories[i].name
                cm.ticker = metadata.categories[i].ticker
                cm.img = metadata.categories[i].img
                cm.color = metadata.categories[i].color
                newMarket.categories.push(cm)
            }
        }
        
        if (metadata.tags) {
            newMarket.tags = []
            for (let i = 0; i < metadata.tags.length; i++) {
                newMarket.tags.push(metadata.tags[i])
            }
        }
    }

    const marketType = new MarketType()
    if (market.market_type.isCategorical) {
        marketType.categorical = market.market_type.asCategorical.toString()
    } else if (market.market_type.isScalar) {
        marketType.scalar = market.market_type.asScalar.toString()
    }
    newMarket.marketType = marketType

    const period = new MarketPeriod()
    if (market.period.isBlock) {
        period.block = market.period.asBlock.toString()

        const sdk = await Tools.getSDK()
        const now = (await sdk.api.query.timestamp.now()).toString();
        const head = await sdk.api.rpc.chain.getHeader();
        const blockNum = head.number.toNumber();
        const diffInMs = +(sdk.api.consts.timestamp.minimumPeriod).toString() * (market.period.asBlock[1].toNumber() - blockNum);
        newMarket.end = new BN(now + diffInMs)
    } else if (market.period.isTimestamp) {
        period.timestamp = market.period.asTimestamp.toString()
        newMarket.end = new BN(market.period.asTimestamp[1])
    }
    newMarket.period = period

    newMarket.scoringRule = market.scoring_rule.toString()
    newMarket.status = market.status.toString()

    const mdm = new MarketDisputeMechanism()
    if (market.mdm.isAuthorized) {
        mdm.authorized = market.mdm.asAuthorized.toString()
    } else if (market.mdm.isCourt) {
        mdm.court = true
    } else if (market.mdm.isSimpleDisputes) {
        mdm.simpleDisputes = true
    }
    newMarket.mdm = mdm

    console.log(`[${event.name}] Saving market: ${JSON.stringify(newMarket, null, 2)}`)
    await store.save<Market>(newMarket)

    const hm = new HistoricalMarket()
    hm.marketId = newMarket.marketId
    hm.event = event.method
    hm.status = newMarket.status
    hm.blockNumber = block.height
    hm.timestamp = new BN(block.timestamp)
    console.log(`[${event.name}] Saving historical market: ${JSON.stringify(hm, null, 2)}`)
    await store.save<HistoricalMarket>(hm)

    const len = +newMarket.marketType.categorical!
    for (var i = 0; i < len; i++) {
        const asset = new Asset()
        asset.assetId = JSON.stringify(util.AssetIdFromString(`[${marketIdOf},${i}]`))
        console.log(`[${event.name}] Saving asset: ${JSON.stringify(asset, null, 2)}`)
        await store.save<Asset>(asset)
    }
}

export async function predictionMarketStartedWithSubsidyV1({
    store,
    event,
    block,
    extrinsic,
}: EventContext & StoreContext) {

    const [marketIdOf] = new PredictionMarkets.MarketStartedWithSubsidyEventV1(event).params

    const savedMarket = await store.get(Market, { where: { marketId: marketIdOf.toNumber() } })
    if (!savedMarket) return

    savedMarket.status = MarketStatus.Active
    console.log(`[${event.name}] Saving market: ${JSON.stringify(savedMarket, null, 2)}`)
    await store.save<Market>(savedMarket)

    const hm = new HistoricalMarket()
    hm.marketId = savedMarket.marketId
    hm.event = event.method
    hm.status = savedMarket.status
    hm.blockNumber = block.height
    hm.timestamp = new BN(block.timestamp)
    console.log(`[${event.name}] Saving historical market: ${JSON.stringify(hm, null, 2)}`)
    await store.save<HistoricalMarket>(hm)
}

export async function predictionMarketStartedWithSubsidyV2({
    store,
    event,
    block,
    extrinsic,
}: EventContext & StoreContext) {

    const [marketIdOf, status] = new PredictionMarkets.MarketStartedWithSubsidyEventV2(event).params

    const savedMarket = await store.get(Market, { where: { marketId: marketIdOf.toNumber() } })
    if (!savedMarket) return

    savedMarket.status = status.toString()
    console.log(`[${event.name}] Saving market: ${JSON.stringify(savedMarket, null, 2)}`)
    await store.save<Market>(savedMarket)

    const hm = new HistoricalMarket()
    hm.marketId = savedMarket.marketId
    hm.event = event.method
    hm.status = savedMarket.status
    hm.blockNumber = block.height
    hm.timestamp = new BN(block.timestamp)
    console.log(`[${event.name}] Saving historical market: ${JSON.stringify(hm, null, 2)}`)
    await store.save<HistoricalMarket>(hm)
}

export async function predictionMarketInsufficientSubsidyV1({
    store,
    event,
    block,
    extrinsic,
}: EventContext & StoreContext) {

    const [marketIdOf] = new PredictionMarkets.MarketInsufficientSubsidyEventV1(event).params

    const savedMarket = await store.get(Market, { where: { marketId: marketIdOf.toNumber() } })
    if (!savedMarket) return

    savedMarket.status = MarketStatus.InsufficientSubsidy
    console.log(`[${event.name}] Saving market: ${JSON.stringify(savedMarket, null, 2)}`)
    await store.save<Market>(savedMarket)

    const hm = new HistoricalMarket()
    hm.marketId = savedMarket.marketId
    hm.event = event.method
    hm.status = savedMarket.status
    hm.blockNumber = block.height
    hm.timestamp = new BN(block.timestamp)
    console.log(`[${event.name}] Saving historical market: ${JSON.stringify(hm, null, 2)}`)
    await store.save<HistoricalMarket>(hm)
}

export async function predictionMarketInsufficientSubsidyV2({
    store,
    event,
    block,
    extrinsic,
}: EventContext & StoreContext) {

    const [marketIdOf, status] = new PredictionMarkets.MarketInsufficientSubsidyEventV2(event).params

    const savedMarket = await store.get(Market, { where: { marketId: marketIdOf.toNumber() } })
    if (!savedMarket) return

    savedMarket.status = status.toString()
    console.log(`[${event.name}] Saving market: ${JSON.stringify(savedMarket, null, 2)}`)
    await store.save<Market>(savedMarket)

    const hm = new HistoricalMarket()
    hm.marketId = savedMarket.marketId
    hm.event = event.method
    hm.status = savedMarket.status
    hm.blockNumber = block.height
    hm.timestamp = new BN(block.timestamp)
    console.log(`[${event.name}] Saving historical market: ${JSON.stringify(hm, null, 2)}`)
    await store.save<HistoricalMarket>(hm)
}

export async function predictionMarketReportedV1({
    store,
    event,
    block,
    extrinsic,
}: EventContext & StoreContext) {

    const [marketIdOf, outcomeReport] = new PredictionMarkets.MarketReportedEventV1(event).params

    const savedMarket = await store.get(Market, { where: { marketId: marketIdOf.toNumber() } })
    if (!savedMarket) return

    const ocr = new OutcomeReport()
    if (outcomeReport.asCategorical) {
        ocr.categorical = outcomeReport.asCategorical.toNumber()
    } else if (outcomeReport.asScalar) {
        ocr.scalar = outcomeReport.asScalar.toNumber()
    }

    const mr = new MarketReport()
    mr.at = block.height
    mr.by = savedMarket.oracle
    mr.outcome = ocr

    savedMarket.status = MarketStatus.Reported
    savedMarket.report = mr
    console.log(`[${event.name}] Saving market: ${JSON.stringify(savedMarket, null, 2)}`)
    await store.save<Market>(savedMarket)

    const hm = new HistoricalMarket()
    hm.marketId = savedMarket.marketId
    hm.event = event.method
    hm.status = savedMarket.status
    hm.report = savedMarket.report
    hm.blockNumber = block.height
    hm.timestamp = new BN(block.timestamp)
    console.log(`[${event.name}] Saving historical market: ${JSON.stringify(hm, null, 2)}`)
    await store.save<HistoricalMarket>(hm)
}

export async function predictionMarketReportedV2({
    store,
    event,
    block,
    extrinsic,
}: EventContext & StoreContext) {

    const [marketIdOf, status, report] = new PredictionMarkets.MarketReportedEventV2(event).params

    const savedMarket = await store.get(Market, { where: { marketId: marketIdOf.toNumber() } })
    if (!savedMarket) return

    const ocr = new OutcomeReport()
    if (report.outcome.asCategorical) {
        ocr.categorical = report.outcome.asCategorical.toNumber()
    } else if (report.outcome.asScalar) {
        ocr.scalar = report.outcome.asScalar.toNumber()
    }
    const mr = new MarketReport()
    mr.at = report.at.toNumber()
    mr.by = report.by.toString()
    mr.outcome = ocr

    savedMarket.status = status.toString()
    savedMarket.report = mr
    console.log(`[${event.name}] Saving market: ${JSON.stringify(savedMarket, null, 2)}`)
    await store.save<Market>(savedMarket)

    const hm = new HistoricalMarket()
    hm.marketId = savedMarket.marketId
    hm.event = event.method
    hm.status = savedMarket.status
    hm.report = savedMarket.report
    hm.blockNumber = block.height
    hm.timestamp = new BN(block.timestamp)
    console.log(`[${event.name}] Saving historical market: ${JSON.stringify(hm, null, 2)}`)
    await store.save<HistoricalMarket>(hm)
}

export async function predictionMarketDisputedV1({
    store,
    event,
    block,
    extrinsic,
}: EventContext & StoreContext) {

    const [marketIdOf, outcomeReport] = new PredictionMarkets.MarketDisputedEventV1(event).params

    const savedMarket = await store.get(Market, { where: { marketId: marketIdOf.toNumber() } })
    if (!savedMarket) return

    savedMarket.status = MarketStatus.Disputed
    console.log(`[${event.name}] Saving market: ${JSON.stringify(savedMarket, null, 2)}`)
    await store.save<Market>(savedMarket)

    const hm = new HistoricalMarket()
    hm.event = event.method
    hm.status = savedMarket.status
    hm.blockNumber = block.height
    hm.timestamp = new BN(block.timestamp)
    console.log(`[${event.name}] Saving historical market: ${JSON.stringify(hm, null, 2)}`)
    await store.save<HistoricalMarket>(hm)
}

export async function predictionMarketDisputedV2({
    store,
    event,
    block,
    extrinsic,
}: EventContext & StoreContext) {

    const [marketIdOf, status, dispute] = new PredictionMarkets.MarketDisputedEventV2(event).params

    const savedMarket = await store.get(Market, { where: { marketId: marketIdOf.toNumber() } })
    if (!savedMarket) return

    const ocr = new OutcomeReport()
    if (dispute.outcome.asCategorical) {
        ocr.categorical = dispute.outcome.asCategorical.toNumber()
    } else if (dispute.outcome.asScalar) {
        ocr.scalar = dispute.outcome.asScalar.toNumber()
    }

    const mr = new MarketReport()
    mr.at = dispute.at.toNumber()
    mr.by = dispute.by.toString()
    mr.outcome = ocr

    savedMarket.status = status.toString()
    savedMarket.report = mr
    console.log(`[${event.name}] Saving market: ${JSON.stringify(savedMarket, null, 2)}`)
    await store.save<Market>(savedMarket)

    const hm = new HistoricalMarket()
    hm.marketId = savedMarket.marketId
    hm.event = event.method
    hm.status = savedMarket.status
    hm.report = savedMarket.report
    hm.blockNumber = block.height
    hm.timestamp = new BN(block.timestamp)
    console.log(`[${event.name}] Saving historical market: ${JSON.stringify(hm, null, 2)}`)
    await store.save<HistoricalMarket>(hm)
}

export async function predictionMarketRejected({
    store,
    event,
    block,
    extrinsic,
}: EventContext & StoreContext) {

    const [marketIdOf] = new PredictionMarkets.MarketRejectedEvent(event).params

    const savedMarket = await store.get(Market, { where: { marketId: marketIdOf.toNumber() } })
    if (!savedMarket) return

    savedMarket.status = MarketStatus.Rejected
    console.log(`[${event.name}] Saving market: ${JSON.stringify(savedMarket, null, 2)}`)
    await store.save<Market>(savedMarket)

    const hm = new HistoricalMarket()
    hm.marketId = savedMarket.marketId
    hm.event = event.method
    hm.status = savedMarket.status
    hm.blockNumber = block.height
    hm.timestamp = new BN(block.timestamp)
    console.log(`[${event.name}] Saving historical market: ${JSON.stringify(hm, null, 2)}`)
    await store.save<HistoricalMarket>(hm)
}

export async function predictionMarketCancelled({
    store,
    event,
    block,
    extrinsic,
}: EventContext & StoreContext) {

    const [marketIdOf] = new PredictionMarkets.MarketCancelledEvent(event).params

    const savedMarket = await store.get(Market, { where: { marketId: marketIdOf.toNumber() } })
    if (!savedMarket) return

    savedMarket.status = MarketStatus.Cancelled
    console.log(`[${event.name}] Saving market: ${JSON.stringify(savedMarket, null, 2)}`)
    await store.save<Market>(savedMarket)

    const hm = new HistoricalMarket()
    hm.marketId = savedMarket.marketId
    hm.event = event.method
    hm.status = savedMarket.status
    hm.blockNumber = block.height
    hm.timestamp = new BN(block.timestamp)
    console.log(`[${event.name}] Saving historical market: ${JSON.stringify(hm, null, 2)}`)
    await store.save<HistoricalMarket>(hm)
}

export async function predictionMarketResolved({
    store,
    event,
    block,
    extrinsic,
}: EventContext & StoreContext) {

    const [marketIdOf, status, outcomeReport] = new PredictionMarkets.MarketResolvedEvent(event).params

    const savedMarket = await store.get(Market, { where: { marketId: marketIdOf.toNumber() } })
    if (!savedMarket) return

    const ocr = new OutcomeReport()
    if (outcomeReport.asCategorical) {
        ocr.categorical = outcomeReport.asCategorical.toNumber()
    } else if (outcomeReport.asScalar) {
        ocr.scalar = outcomeReport.asScalar.toNumber()
    }

    if (savedMarket.report) { savedMarket.report.outcome = ocr }
    savedMarket.status = status.toString()
    console.log(`[${event.name}] Saving market: ${JSON.stringify(savedMarket, null, 2)}`)
    await store.save<Market>(savedMarket)

    const hm = new HistoricalMarket()
    hm.marketId = savedMarket.marketId
    hm.event = event.method
    hm.status = savedMarket.status
    hm.report = savedMarket.report
    hm.blockNumber = block.height
    hm.timestamp = new BN(block.timestamp)
    console.log(`[${event.name}] Saving historical market: ${JSON.stringify(hm, null, 2)}`)
    await store.save<HistoricalMarket>(hm)
}

export async function predictionMarketSoldCompleteSet({
    store,
    event,
    block,
    extrinsic,
}: EventContext & StoreContext) {

    const [marketIdOf, accountId] = new PredictionMarkets.SoldCompleteSetEvent(event).params

    const savedMarket = await store.get(Market, { where: { marketId: marketIdOf.toNumber() } })
    if (!savedMarket) return

    const hm = new HistoricalMarket()
    hm.marketId = savedMarket.marketId
    hm.event = event.method
    hm.blockNumber = block.height
    hm.timestamp = new BN(block.timestamp)
    console.log(`[${event.name}] Saving historical market: ${JSON.stringify(hm, null, 2)}`)
    await store.save<HistoricalMarket>(hm)

    const walletId = encodeAddress(accountId, +(await Tools.getSDK()).api.consts.system.ss58Prefix.toString())
    var acc = await store.get(Account, { where: { wallet: walletId } })
    if (!acc) { return }

    const len = +savedMarket.marketType.categorical!
    for (var i = 0; i < len; i++) {
        const currencyId = util.AssetIdFromString(`[${marketIdOf},${i}]`)
        const ab = await store.get(AccountBalance, { where: { account: acc, assetId: currencyId } })
        if (!ab) { return }

        var amount = new BN(0)
        if (extrinsic?.args[1]) {
            amount = new BN(extrinsic?.args[1].value.toString()!)
        } else if (extrinsic?.args[0].name === "calls") {
            for (var ext of extrinsic.args[0].value as Array<{ args: { amount: number, market_id: number }}> ) {
                const { args: { amount: amt, market_id } } = ext;
                if (market_id == marketIdOf.toNumber()) {
                    amount = new BN(amt)
                    break
                }
            }
        }
        if (amount > new BN(0)) {
            ab.balance = ab.balance.sub(amount)
            console.log(`[${event.name}] Saving account balance: ${JSON.stringify(ab, null, 2)}`)
            await store.save<AccountBalance>(ab)

            const hab = new HistoricalAccountBalance()
            hab.accountId = acc.wallet
            hab.event = event.method
            hab.assetId = ab.assetId
            hab.amount = new BN(0 - amount.toNumber())
            hab.balance = ab.balance
            hab.blockNumber = block.height
            hab.timestamp = new BN(block.timestamp)
            console.log(`[${event.name}] Saving historical account balance: ${JSON.stringify(hab, null, 2)}`)
            await store.save<HistoricalAccountBalance>(hab) 
        }
    }
}

async function createAssetsForMarket(
    marketId: MarketId,
    marketType: MType
): Promise<string[]> {
    const sdk = await Tools.getSDK()
    return marketType.isCategorical
      ? [...Array(marketType.asCategorical.toNumber()).keys()].map((catIdx) => {
          return sdk.api.createType("Asset", {
            categoricalOutcome: [marketId, catIdx],
          });
        })
      : ["Long", "Short"].map((pos) => {
          const position = sdk.api.createType("ScalarPosition", pos);
          return sdk.api.createType("Asset", {
            scalarOutcome: [marketId, position.toString()],
          });
        });
}

async function decodeMarketMetadata(
    metadata: string,
): Promise<DecodedMarketMetadata | undefined> {

    if (metadata) {
        var raw = await (await Cache.init()).getMeta(metadata)
        if (raw) {
            return raw !== '0' ? JSON.parse(raw) as DecodedMarketMetadata : undefined
        } else {
            try {
                const ipfs = new IPFS();
                raw = await ipfs.read(metadata);
            } catch (err) {
                console.error(err);
                await (await Cache.init()).setMeta(metadata, '0')
            }
            await (await Cache.init()).setMeta(metadata, raw ? raw : '0')
            return raw ? JSON.parse(raw) as DecodedMarketMetadata : undefined
        }
    }
}

type DecodedMarketMetadata = {
    slug: string
    question: string
    description: string
    categories?: CategoryData[]
    tags?: string[]
    img?: string
}

type CategoryData = {
    name: string
    ticker?: string
    img?: string
    color?: string
}