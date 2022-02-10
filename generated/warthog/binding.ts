import 'graphql-import-node'; // Needed so you can import *.graphql files 

import { makeBindingClass, Options } from 'graphql-binding'
import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import * as schema from  './schema.graphql'

export interface Query {
    accounts: <T = Array<Account>>(args: { offset?: Int | null, limit?: Int | null, where?: AccountWhereInput | null, orderBy?: Array<AccountOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    accountByUniqueInput: <T = Account | null>(args: { where: AccountWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    accountsConnection: <T = AccountConnection>(args: { first?: Int | null, after?: String | null, last?: Int | null, before?: String | null, where?: AccountWhereInput | null, orderBy?: Array<AccountOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    assetBalances: <T = Array<AssetBalance>>(args: { offset?: Int | null, limit?: Int | null, where?: AssetBalanceWhereInput | null, orderBy?: Array<AssetBalanceOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    assetBalanceByUniqueInput: <T = AssetBalance | null>(args: { where: AssetBalanceWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    assetBalancesConnection: <T = AssetBalanceConnection>(args: { first?: Int | null, after?: String | null, last?: Int | null, before?: String | null, where?: AssetBalanceWhereInput | null, orderBy?: Array<AssetBalanceOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    assets: <T = Array<Asset>>(args: { offset?: Int | null, limit?: Int | null, where?: AssetWhereInput | null, orderBy?: Array<AssetOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    assetByUniqueInput: <T = Asset | null>(args: { where: AssetWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    assetsConnection: <T = AssetConnection>(args: { first?: Int | null, after?: String | null, last?: Int | null, before?: String | null, where?: AssetWhereInput | null, orderBy?: Array<AssetOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    historicalAssetBalances: <T = Array<HistoricalAssetBalance>>(args: { offset?: Int | null, limit?: Int | null, where?: HistoricalAssetBalanceWhereInput | null, orderBy?: Array<HistoricalAssetBalanceOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    historicalAssetBalanceByUniqueInput: <T = HistoricalAssetBalance | null>(args: { where: HistoricalAssetBalanceWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    historicalAssetBalancesConnection: <T = HistoricalAssetBalanceConnection>(args: { first?: Int | null, after?: String | null, last?: Int | null, before?: String | null, where?: HistoricalAssetBalanceWhereInput | null, orderBy?: Array<HistoricalAssetBalanceOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    historicalAssetPrices: <T = Array<HistoricalAssetPrice>>(args: { offset?: Int | null, limit?: Int | null, where?: HistoricalAssetPriceWhereInput | null, orderBy?: Array<HistoricalAssetPriceOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    historicalAssetPriceByUniqueInput: <T = HistoricalAssetPrice | null>(args: { where: HistoricalAssetPriceWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    historicalAssetPricesConnection: <T = HistoricalAssetPriceConnection>(args: { first?: Int | null, after?: String | null, last?: Int | null, before?: String | null, where?: HistoricalAssetPriceWhereInput | null, orderBy?: Array<HistoricalAssetPriceOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    historicalPools: <T = Array<HistoricalPool>>(args: { offset?: Int | null, limit?: Int | null, where?: HistoricalPoolWhereInput | null, orderBy?: Array<HistoricalPoolOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    historicalPoolByUniqueInput: <T = HistoricalPool | null>(args: { where: HistoricalPoolWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    historicalPoolsConnection: <T = HistoricalPoolConnection>(args: { first?: Int | null, after?: String | null, last?: Int | null, before?: String | null, where?: HistoricalPoolWhereInput | null, orderBy?: Array<HistoricalPoolOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    markets: <T = Array<Market>>(args: { offset?: Int | null, limit?: Int | null, where?: MarketWhereInput | null, orderBy?: Array<MarketOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    marketByUniqueInput: <T = Market | null>(args: { where: MarketWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    marketsConnection: <T = MarketConnection>(args: { first?: Int | null, after?: String | null, last?: Int | null, before?: String | null, where?: MarketWhereInput | null, orderBy?: Array<MarketOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    pools: <T = Array<Pool>>(args: { offset?: Int | null, limit?: Int | null, where?: PoolWhereInput | null, orderBy?: Array<PoolOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    poolByUniqueInput: <T = Pool | null>(args: { where: PoolWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    poolsConnection: <T = PoolConnection>(args: { first?: Int | null, after?: String | null, last?: Int | null, before?: String | null, where?: PoolWhereInput | null, orderBy?: Array<PoolOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Mutation {}

export interface Subscription {
    stateSubscription: <T = ProcessorState>(args?: {}, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> 
  }

export interface Binding {
  query: Query
  mutation: Mutation
  subscription: Subscription
  request: <T = any>(query: string, variables?: {[key: string]: any}) => Promise<T>
  delegate(operation: 'query' | 'mutation', fieldName: string, args: {
      [key: string]: any;
  }, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<any>;
  delegateSubscription(fieldName: string, args?: {
      [key: string]: any;
  }, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<any>>;
  getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new(...args: any[]): T
}

export const Binding = makeBindingClass<BindingConstructor<Binding>>({ schema: schema as any })

/**
 * Types
*/

export type AccountOrderByInput =   'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'deletedAt_ASC' |
  'deletedAt_DESC' |
  'wallet_ASC' |
  'wallet_DESC'

export type AssetBalanceOrderByInput =   'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'deletedAt_ASC' |
  'deletedAt_DESC' |
  'account_ASC' |
  'account_DESC' |
  'assetId_ASC' |
  'assetId_DESC' |
  'balance_ASC' |
  'balance_DESC'

export type AssetOrderByInput =   'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'deletedAt_ASC' |
  'deletedAt_DESC' |
  'assetId_ASC' |
  'assetId_DESC' |
  'price_ASC' |
  'price_DESC' |
  'qty_ASC' |
  'qty_DESC'

export type HistoricalAssetBalanceOrderByInput =   'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'deletedAt_ASC' |
  'deletedAt_DESC' |
  'account_ASC' |
  'account_DESC' |
  'event_ASC' |
  'event_DESC' |
  'assetId_ASC' |
  'assetId_DESC' |
  'amount_ASC' |
  'amount_DESC' |
  'balance_ASC' |
  'balance_DESC' |
  'blockNumber_ASC' |
  'blockNumber_DESC' |
  'timestamp_ASC' |
  'timestamp_DESC'

export type HistoricalAssetPriceOrderByInput =   'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'deletedAt_ASC' |
  'deletedAt_DESC' |
  'assetId_ASC' |
  'assetId_DESC' |
  'dPrice_ASC' |
  'dPrice_DESC' |
  'dQty_ASC' |
  'dQty_DESC' |
  'price_ASC' |
  'price_DESC' |
  'qty_ASC' |
  'qty_DESC' |
  'event_ASC' |
  'event_DESC' |
  'blockNumber_ASC' |
  'blockNumber_DESC' |
  'timestamp_ASC' |
  'timestamp_DESC'

export type HistoricalPoolOrderByInput =   'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'deletedAt_ASC' |
  'deletedAt_DESC' |
  'poolId_ASC' |
  'poolId_DESC' |
  'event_ASC' |
  'event_DESC' |
  'ztgQty_ASC' |
  'ztgQty_DESC' |
  'blockNumber_ASC' |
  'blockNumber_DESC' |
  'timestamp_ASC' |
  'timestamp_DESC'

export type MarketOrderByInput =   'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'deletedAt_ASC' |
  'deletedAt_DESC' |
  'marketId_ASC' |
  'marketId_DESC' |
  'creator_ASC' |
  'creator_DESC' |
  'creation_ASC' |
  'creation_DESC' |
  'creatorFee_ASC' |
  'creatorFee_DESC' |
  'oracle_ASC' |
  'oracle_DESC' |
  'slug_ASC' |
  'slug_DESC' |
  'question_ASC' |
  'question_DESC' |
  'description_ASC' |
  'description_DESC' |
  'img_ASC' |
  'img_DESC' |
  'end_ASC' |
  'end_DESC' |
  'scoringRule_ASC' |
  'scoringRule_DESC' |
  'status_ASC' |
  'status_DESC' |
  'poolId_ASC' |
  'poolId_DESC' |
  'resolvedOutcome_ASC' |
  'resolvedOutcome_DESC'

export type PoolOrderByInput =   'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'deletedAt_ASC' |
  'deletedAt_DESC' |
  'poolId_ASC' |
  'poolId_DESC' |
  'baseAsset_ASC' |
  'baseAsset_DESC' |
  'marketId_ASC' |
  'marketId_DESC' |
  'poolStatus_ASC' |
  'poolStatus_DESC' |
  'scoringRule_ASC' |
  'scoringRule_DESC' |
  'swapFee_ASC' |
  'swapFee_DESC' |
  'totalSubsidy_ASC' |
  'totalSubsidy_DESC' |
  'totalWeight_ASC' |
  'totalWeight_DESC' |
  'ztgQty_ASC' |
  'ztgQty_DESC'

export interface AccountCreateInput {
  wallet: String
}

export interface AccountUpdateInput {
  wallet?: String | null
}

export interface AccountWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  wallet_eq?: String | null
  wallet_contains?: String | null
  wallet_startsWith?: String | null
  wallet_endsWith?: String | null
  wallet_in?: String[] | String | null
  assetBalances_none?: AssetBalanceWhereInput | null
  assetBalances_some?: AssetBalanceWhereInput | null
  assetBalances_every?: AssetBalanceWhereInput | null
  historicalAssetBalances_none?: HistoricalAssetBalanceWhereInput | null
  historicalAssetBalances_some?: HistoricalAssetBalanceWhereInput | null
  historicalAssetBalances_every?: HistoricalAssetBalanceWhereInput | null
  AND?: AccountWhereInput[] | AccountWhereInput | null
  OR?: AccountWhereInput[] | AccountWhereInput | null
}

export interface AccountWhereUniqueInput {
  id: ID_Output
}

export interface AssetBalanceCreateInput {
  account: ID_Output
  assetId: String
  balance: String
}

export interface AssetBalanceUpdateInput {
  account?: ID_Input | null
  assetId?: String | null
  balance?: String | null
}

export interface AssetBalanceWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  assetId_eq?: String | null
  assetId_contains?: String | null
  assetId_startsWith?: String | null
  assetId_endsWith?: String | null
  assetId_in?: String[] | String | null
  balance_eq?: BigInt | null
  balance_gt?: BigInt | null
  balance_gte?: BigInt | null
  balance_lt?: BigInt | null
  balance_lte?: BigInt | null
  balance_in?: BigInt[] | BigInt | null
  account?: AccountWhereInput | null
  AND?: AssetBalanceWhereInput[] | AssetBalanceWhereInput | null
  OR?: AssetBalanceWhereInput[] | AssetBalanceWhereInput | null
}

export interface AssetBalanceWhereUniqueInput {
  id: ID_Output
}

export interface AssetCreateInput {
  assetId: String
  price?: Float | null
  qty?: String | null
}

export interface AssetUpdateInput {
  assetId?: String | null
  price?: Float | null
  qty?: String | null
}

export interface AssetWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  assetId_eq?: String | null
  assetId_contains?: String | null
  assetId_startsWith?: String | null
  assetId_endsWith?: String | null
  assetId_in?: String[] | String | null
  price_eq?: Float | null
  price_gt?: Float | null
  price_gte?: Float | null
  price_lt?: Float | null
  price_lte?: Float | null
  price_in?: Float[] | Float | null
  qty_eq?: BigInt | null
  qty_gt?: BigInt | null
  qty_gte?: BigInt | null
  qty_lt?: BigInt | null
  qty_lte?: BigInt | null
  qty_in?: BigInt[] | BigInt | null
  AND?: AssetWhereInput[] | AssetWhereInput | null
  OR?: AssetWhereInput[] | AssetWhereInput | null
}

export interface AssetWhereUniqueInput {
  id: ID_Output
}

export interface BaseWhereInput {
  id_eq?: String | null
  id_in?: String[] | String | null
  createdAt_eq?: String | null
  createdAt_lt?: String | null
  createdAt_lte?: String | null
  createdAt_gt?: String | null
  createdAt_gte?: String | null
  createdById_eq?: String | null
  updatedAt_eq?: String | null
  updatedAt_lt?: String | null
  updatedAt_lte?: String | null
  updatedAt_gt?: String | null
  updatedAt_gte?: String | null
  updatedById_eq?: String | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: String | null
  deletedAt_lt?: String | null
  deletedAt_lte?: String | null
  deletedAt_gt?: String | null
  deletedAt_gte?: String | null
  deletedById_eq?: String | null
}

export interface CategoryMetadataCreateInput {
  name?: String | null
  ticker?: String | null
  img?: String | null
  color?: String | null
}

export interface CategoryMetadataInput {
  name?: String | null
  ticker?: String | null
  img?: String | null
  color?: String | null
}

export interface CategoryMetadataUpdateInput {
  name?: String | null
  ticker?: String | null
  img?: String | null
  color?: String | null
}

export interface CategoryMetadataWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  name_eq?: String | null
  name_contains?: String | null
  name_startsWith?: String | null
  name_endsWith?: String | null
  name_in?: String[] | String | null
  ticker_eq?: String | null
  ticker_contains?: String | null
  ticker_startsWith?: String | null
  ticker_endsWith?: String | null
  ticker_in?: String[] | String | null
  img_eq?: String | null
  img_contains?: String | null
  img_startsWith?: String | null
  img_endsWith?: String | null
  img_in?: String[] | String | null
  color_eq?: String | null
  color_contains?: String | null
  color_startsWith?: String | null
  color_endsWith?: String | null
  color_in?: String[] | String | null
  AND?: CategoryMetadataWhereInput[] | CategoryMetadataWhereInput | null
  OR?: CategoryMetadataWhereInput[] | CategoryMetadataWhereInput | null
}

export interface CategoryMetadataWhereUniqueInput {
  id: ID_Output
}

export interface HistoricalAssetBalanceCreateInput {
  account: ID_Output
  event: String
  assetId: String
  amount: String
  balance: String
  blockNumber: Float
  timestamp: String
}

export interface HistoricalAssetBalanceUpdateInput {
  account?: ID_Input | null
  event?: String | null
  assetId?: String | null
  amount?: String | null
  balance?: String | null
  blockNumber?: Float | null
  timestamp?: String | null
}

export interface HistoricalAssetBalanceWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  event_eq?: String | null
  event_contains?: String | null
  event_startsWith?: String | null
  event_endsWith?: String | null
  event_in?: String[] | String | null
  assetId_eq?: String | null
  assetId_contains?: String | null
  assetId_startsWith?: String | null
  assetId_endsWith?: String | null
  assetId_in?: String[] | String | null
  amount_eq?: BigInt | null
  amount_gt?: BigInt | null
  amount_gte?: BigInt | null
  amount_lt?: BigInt | null
  amount_lte?: BigInt | null
  amount_in?: BigInt[] | BigInt | null
  balance_eq?: BigInt | null
  balance_gt?: BigInt | null
  balance_gte?: BigInt | null
  balance_lt?: BigInt | null
  balance_lte?: BigInt | null
  balance_in?: BigInt[] | BigInt | null
  blockNumber_eq?: Int | null
  blockNumber_gt?: Int | null
  blockNumber_gte?: Int | null
  blockNumber_lt?: Int | null
  blockNumber_lte?: Int | null
  blockNumber_in?: Int[] | Int | null
  timestamp_eq?: BigInt | null
  timestamp_gt?: BigInt | null
  timestamp_gte?: BigInt | null
  timestamp_lt?: BigInt | null
  timestamp_lte?: BigInt | null
  timestamp_in?: BigInt[] | BigInt | null
  account?: AccountWhereInput | null
  AND?: HistoricalAssetBalanceWhereInput[] | HistoricalAssetBalanceWhereInput | null
  OR?: HistoricalAssetBalanceWhereInput[] | HistoricalAssetBalanceWhereInput | null
}

export interface HistoricalAssetBalanceWhereUniqueInput {
  id: ID_Output
}

export interface HistoricalAssetPriceCreateInput {
  assetId: String
  dPrice: Float
  dQty: String
  price: Float
  qty: String
  event: String
  blockNumber: Float
  timestamp: String
}

export interface HistoricalAssetPriceUpdateInput {
  assetId?: String | null
  dPrice?: Float | null
  dQty?: String | null
  price?: Float | null
  qty?: String | null
  event?: String | null
  blockNumber?: Float | null
  timestamp?: String | null
}

export interface HistoricalAssetPriceWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  assetId_eq?: String | null
  assetId_contains?: String | null
  assetId_startsWith?: String | null
  assetId_endsWith?: String | null
  assetId_in?: String[] | String | null
  dPrice_eq?: Float | null
  dPrice_gt?: Float | null
  dPrice_gte?: Float | null
  dPrice_lt?: Float | null
  dPrice_lte?: Float | null
  dPrice_in?: Float[] | Float | null
  dQty_eq?: BigInt | null
  dQty_gt?: BigInt | null
  dQty_gte?: BigInt | null
  dQty_lt?: BigInt | null
  dQty_lte?: BigInt | null
  dQty_in?: BigInt[] | BigInt | null
  price_eq?: Float | null
  price_gt?: Float | null
  price_gte?: Float | null
  price_lt?: Float | null
  price_lte?: Float | null
  price_in?: Float[] | Float | null
  qty_eq?: BigInt | null
  qty_gt?: BigInt | null
  qty_gte?: BigInt | null
  qty_lt?: BigInt | null
  qty_lte?: BigInt | null
  qty_in?: BigInt[] | BigInt | null
  event_eq?: String | null
  event_contains?: String | null
  event_startsWith?: String | null
  event_endsWith?: String | null
  event_in?: String[] | String | null
  blockNumber_eq?: Int | null
  blockNumber_gt?: Int | null
  blockNumber_gte?: Int | null
  blockNumber_lt?: Int | null
  blockNumber_lte?: Int | null
  blockNumber_in?: Int[] | Int | null
  timestamp_eq?: BigInt | null
  timestamp_gt?: BigInt | null
  timestamp_gte?: BigInt | null
  timestamp_lt?: BigInt | null
  timestamp_lte?: BigInt | null
  timestamp_in?: BigInt[] | BigInt | null
  AND?: HistoricalAssetPriceWhereInput[] | HistoricalAssetPriceWhereInput | null
  OR?: HistoricalAssetPriceWhereInput[] | HistoricalAssetPriceWhereInput | null
}

export interface HistoricalAssetPriceWhereUniqueInput {
  id: ID_Output
}

export interface HistoricalPoolCreateInput {
  poolId: Float
  event: String
  ztgQty: String
  blockNumber: Float
  timestamp: String
}

export interface HistoricalPoolUpdateInput {
  poolId?: Float | null
  event?: String | null
  ztgQty?: String | null
  blockNumber?: Float | null
  timestamp?: String | null
}

export interface HistoricalPoolWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  poolId_eq?: Int | null
  poolId_gt?: Int | null
  poolId_gte?: Int | null
  poolId_lt?: Int | null
  poolId_lte?: Int | null
  poolId_in?: Int[] | Int | null
  event_eq?: String | null
  event_contains?: String | null
  event_startsWith?: String | null
  event_endsWith?: String | null
  event_in?: String[] | String | null
  ztgQty_eq?: BigInt | null
  ztgQty_gt?: BigInt | null
  ztgQty_gte?: BigInt | null
  ztgQty_lt?: BigInt | null
  ztgQty_lte?: BigInt | null
  ztgQty_in?: BigInt[] | BigInt | null
  blockNumber_eq?: Int | null
  blockNumber_gt?: Int | null
  blockNumber_gte?: Int | null
  blockNumber_lt?: Int | null
  blockNumber_lte?: Int | null
  blockNumber_in?: Int[] | Int | null
  timestamp_eq?: BigInt | null
  timestamp_gt?: BigInt | null
  timestamp_gte?: BigInt | null
  timestamp_lt?: BigInt | null
  timestamp_lte?: BigInt | null
  timestamp_in?: BigInt[] | BigInt | null
  AND?: HistoricalPoolWhereInput[] | HistoricalPoolWhereInput | null
  OR?: HistoricalPoolWhereInput[] | HistoricalPoolWhereInput | null
}

export interface HistoricalPoolWhereUniqueInput {
  id: ID_Output
}

export interface MarketCreateInput {
  marketId: Float
  creator: String
  creation: String
  creatorFee?: Float | null
  oracle: String
  outcomeAssets: Array<String>
  slug?: String | null
  question?: String | null
  description?: String | null
  categories?: CategoryMetadataInput | null
  tags?: String[] | String | null
  img?: String | null
  marketType: MarketTypeInput
  period: MarketPeriodInput
  end: String
  scoringRule: String
  status: String
  poolId?: Float | null
  report?: MarketReportInput | null
  resolvedOutcome?: String | null
  mdm: MarketDisputeMechanismInput
  marketHistory?: MarketHistoryInput | null
}

export interface MarketDisputeMechanismCreateInput {
  authorized?: String | null
  court?: Boolean | null
  simpleDisputes?: Boolean | null
}

export interface MarketDisputeMechanismInput {
  authorized?: String | null
  court?: Boolean | null
  simpleDisputes?: Boolean | null
}

export interface MarketDisputeMechanismUpdateInput {
  authorized?: String | null
  court?: Boolean | null
  simpleDisputes?: Boolean | null
}

export interface MarketDisputeMechanismWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  authorized_eq?: String | null
  authorized_contains?: String | null
  authorized_startsWith?: String | null
  authorized_endsWith?: String | null
  authorized_in?: String[] | String | null
  court_eq?: Boolean | null
  court_in?: Boolean[] | Boolean | null
  simpleDisputes_eq?: Boolean | null
  simpleDisputes_in?: Boolean[] | Boolean | null
  AND?: MarketDisputeMechanismWhereInput[] | MarketDisputeMechanismWhereInput | null
  OR?: MarketDisputeMechanismWhereInput[] | MarketDisputeMechanismWhereInput | null
}

export interface MarketDisputeMechanismWhereUniqueInput {
  id: ID_Output
}

export interface MarketHistoryCreateInput {
  event?: String | null
  status?: String | null
  poolId?: Float | null
  resolvedOutcome?: String | null
  blockNumber?: Float | null
  timestamp?: String | null
}

export interface MarketHistoryInput {
  event?: String | null
  status?: String | null
  poolId?: Int | null
  report?: MarketReportInput | null
  resolvedOutcome?: String | null
  blockNumber?: Int | null
  timestamp?: String | null
}

export interface MarketHistoryUpdateInput {
  event?: String | null
  status?: String | null
  poolId?: Float | null
  resolvedOutcome?: String | null
  blockNumber?: Float | null
  timestamp?: String | null
}

export interface MarketHistoryWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  event_eq?: String | null
  event_contains?: String | null
  event_startsWith?: String | null
  event_endsWith?: String | null
  event_in?: String[] | String | null
  status_eq?: String | null
  status_contains?: String | null
  status_startsWith?: String | null
  status_endsWith?: String | null
  status_in?: String[] | String | null
  poolId_eq?: Int | null
  poolId_gt?: Int | null
  poolId_gte?: Int | null
  poolId_lt?: Int | null
  poolId_lte?: Int | null
  poolId_in?: Int[] | Int | null
  resolvedOutcome_eq?: String | null
  resolvedOutcome_contains?: String | null
  resolvedOutcome_startsWith?: String | null
  resolvedOutcome_endsWith?: String | null
  resolvedOutcome_in?: String[] | String | null
  blockNumber_eq?: Int | null
  blockNumber_gt?: Int | null
  blockNumber_gte?: Int | null
  blockNumber_lt?: Int | null
  blockNumber_lte?: Int | null
  blockNumber_in?: Int[] | Int | null
  timestamp_eq?: String | null
  timestamp_contains?: String | null
  timestamp_startsWith?: String | null
  timestamp_endsWith?: String | null
  timestamp_in?: String[] | String | null
  AND?: MarketHistoryWhereInput[] | MarketHistoryWhereInput | null
  OR?: MarketHistoryWhereInput[] | MarketHistoryWhereInput | null
}

export interface MarketHistoryWhereUniqueInput {
  id: ID_Output
}

export interface MarketPeriodCreateInput {
  block?: String | null
  timestamp?: String | null
}

export interface MarketPeriodInput {
  block?: String | null
  timestamp?: String | null
}

export interface MarketPeriodUpdateInput {
  block?: String | null
  timestamp?: String | null
}

export interface MarketPeriodWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  block_eq?: String | null
  block_contains?: String | null
  block_startsWith?: String | null
  block_endsWith?: String | null
  block_in?: String[] | String | null
  timestamp_eq?: String | null
  timestamp_contains?: String | null
  timestamp_startsWith?: String | null
  timestamp_endsWith?: String | null
  timestamp_in?: String[] | String | null
  AND?: MarketPeriodWhereInput[] | MarketPeriodWhereInput | null
  OR?: MarketPeriodWhereInput[] | MarketPeriodWhereInput | null
}

export interface MarketPeriodWhereUniqueInput {
  id: ID_Output
}

export interface MarketReportCreateInput {
  at: Float
  by: String
}

export interface MarketReportInput {
  at: Int
  by: String
  outcome: OutcomeReportInput
}

export interface MarketReportUpdateInput {
  at?: Float | null
  by?: String | null
}

export interface MarketReportWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  at_eq?: Int | null
  at_gt?: Int | null
  at_gte?: Int | null
  at_lt?: Int | null
  at_lte?: Int | null
  at_in?: Int[] | Int | null
  by_eq?: String | null
  by_contains?: String | null
  by_startsWith?: String | null
  by_endsWith?: String | null
  by_in?: String[] | String | null
  AND?: MarketReportWhereInput[] | MarketReportWhereInput | null
  OR?: MarketReportWhereInput[] | MarketReportWhereInput | null
}

export interface MarketReportWhereUniqueInput {
  id: ID_Output
}

export interface MarketTypeCreateInput {
  categorical?: String | null
  scalar?: String | null
}

export interface MarketTypeInput {
  categorical?: String | null
  scalar?: String | null
}

export interface MarketTypeUpdateInput {
  categorical?: String | null
  scalar?: String | null
}

export interface MarketTypeWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  categorical_eq?: String | null
  categorical_contains?: String | null
  categorical_startsWith?: String | null
  categorical_endsWith?: String | null
  categorical_in?: String[] | String | null
  scalar_eq?: String | null
  scalar_contains?: String | null
  scalar_startsWith?: String | null
  scalar_endsWith?: String | null
  scalar_in?: String[] | String | null
  AND?: MarketTypeWhereInput[] | MarketTypeWhereInput | null
  OR?: MarketTypeWhereInput[] | MarketTypeWhereInput | null
}

export interface MarketTypeWhereUniqueInput {
  id: ID_Output
}

export interface MarketUpdateInput {
  marketId?: Float | null
  creator?: String | null
  creation?: String | null
  creatorFee?: Float | null
  oracle?: String | null
  outcomeAssets?: String[] | String | null
  slug?: String | null
  question?: String | null
  description?: String | null
  categories?: CategoryMetadataInput | null
  tags?: String[] | String | null
  img?: String | null
  marketType?: MarketTypeInput | null
  period?: MarketPeriodInput | null
  end?: String | null
  scoringRule?: String | null
  status?: String | null
  poolId?: Float | null
  report?: MarketReportInput | null
  resolvedOutcome?: String | null
  mdm?: MarketDisputeMechanismInput | null
  marketHistory?: MarketHistoryInput | null
}

export interface MarketWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  marketId_eq?: Int | null
  marketId_gt?: Int | null
  marketId_gte?: Int | null
  marketId_lt?: Int | null
  marketId_lte?: Int | null
  marketId_in?: Int[] | Int | null
  creator_eq?: String | null
  creator_contains?: String | null
  creator_startsWith?: String | null
  creator_endsWith?: String | null
  creator_in?: String[] | String | null
  creation_eq?: String | null
  creation_contains?: String | null
  creation_startsWith?: String | null
  creation_endsWith?: String | null
  creation_in?: String[] | String | null
  creatorFee_eq?: Int | null
  creatorFee_gt?: Int | null
  creatorFee_gte?: Int | null
  creatorFee_lt?: Int | null
  creatorFee_lte?: Int | null
  creatorFee_in?: Int[] | Int | null
  oracle_eq?: String | null
  oracle_contains?: String | null
  oracle_startsWith?: String | null
  oracle_endsWith?: String | null
  oracle_in?: String[] | String | null
  outcomeAssets_containsAll?: String[] | String | null
  outcomeAssets_containsNone?: String[] | String | null
  outcomeAssets_containsAny?: String[] | String | null
  slug_eq?: String | null
  slug_contains?: String | null
  slug_startsWith?: String | null
  slug_endsWith?: String | null
  slug_in?: String[] | String | null
  question_eq?: String | null
  question_contains?: String | null
  question_startsWith?: String | null
  question_endsWith?: String | null
  question_in?: String[] | String | null
  description_eq?: String | null
  description_contains?: String | null
  description_startsWith?: String | null
  description_endsWith?: String | null
  description_in?: String[] | String | null
  categories_json?: JSONObject | null
  tags_containsAll?: String[] | String | null
  tags_containsNone?: String[] | String | null
  tags_containsAny?: String[] | String | null
  img_eq?: String | null
  img_contains?: String | null
  img_startsWith?: String | null
  img_endsWith?: String | null
  img_in?: String[] | String | null
  marketType_json?: JSONObject | null
  period_json?: JSONObject | null
  end_eq?: BigInt | null
  end_gt?: BigInt | null
  end_gte?: BigInt | null
  end_lt?: BigInt | null
  end_lte?: BigInt | null
  end_in?: BigInt[] | BigInt | null
  scoringRule_eq?: String | null
  scoringRule_contains?: String | null
  scoringRule_startsWith?: String | null
  scoringRule_endsWith?: String | null
  scoringRule_in?: String[] | String | null
  status_eq?: String | null
  status_contains?: String | null
  status_startsWith?: String | null
  status_endsWith?: String | null
  status_in?: String[] | String | null
  poolId_eq?: Int | null
  poolId_gt?: Int | null
  poolId_gte?: Int | null
  poolId_lt?: Int | null
  poolId_lte?: Int | null
  poolId_in?: Int[] | Int | null
  report_json?: JSONObject | null
  resolvedOutcome_eq?: String | null
  resolvedOutcome_contains?: String | null
  resolvedOutcome_startsWith?: String | null
  resolvedOutcome_endsWith?: String | null
  resolvedOutcome_in?: String[] | String | null
  mdm_json?: JSONObject | null
  marketHistory_json?: JSONObject | null
  AND?: MarketWhereInput[] | MarketWhereInput | null
  OR?: MarketWhereInput[] | MarketWhereInput | null
}

export interface MarketWhereUniqueInput {
  id: ID_Output
}

export interface OutcomeReportCreateInput {
  categorical?: Float | null
  scalar?: Float | null
}

export interface OutcomeReportInput {
  categorical?: Int | null
  scalar?: Int | null
}

export interface OutcomeReportUpdateInput {
  categorical?: Float | null
  scalar?: Float | null
}

export interface OutcomeReportWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  categorical_eq?: Int | null
  categorical_gt?: Int | null
  categorical_gte?: Int | null
  categorical_lt?: Int | null
  categorical_lte?: Int | null
  categorical_in?: Int[] | Int | null
  scalar_eq?: Int | null
  scalar_gt?: Int | null
  scalar_gte?: Int | null
  scalar_lt?: Int | null
  scalar_lte?: Int | null
  scalar_in?: Int[] | Int | null
  AND?: OutcomeReportWhereInput[] | OutcomeReportWhereInput | null
  OR?: OutcomeReportWhereInput[] | OutcomeReportWhereInput | null
}

export interface OutcomeReportWhereUniqueInput {
  id: ID_Output
}

export interface PoolCreateInput {
  poolId: Float
  baseAsset: String
  marketId: Float
  poolStatus: String
  scoringRule: String
  swapFee: String
  totalSubsidy: String
  totalWeight: String
  weights: WeightInput
  ztgQty: String
}

export interface PoolUpdateInput {
  poolId?: Float | null
  baseAsset?: String | null
  marketId?: Float | null
  poolStatus?: String | null
  scoringRule?: String | null
  swapFee?: String | null
  totalSubsidy?: String | null
  totalWeight?: String | null
  weights?: WeightInput | null
  ztgQty?: String | null
}

export interface PoolWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  poolId_eq?: Int | null
  poolId_gt?: Int | null
  poolId_gte?: Int | null
  poolId_lt?: Int | null
  poolId_lte?: Int | null
  poolId_in?: Int[] | Int | null
  baseAsset_eq?: String | null
  baseAsset_contains?: String | null
  baseAsset_startsWith?: String | null
  baseAsset_endsWith?: String | null
  baseAsset_in?: String[] | String | null
  marketId_eq?: Int | null
  marketId_gt?: Int | null
  marketId_gte?: Int | null
  marketId_lt?: Int | null
  marketId_lte?: Int | null
  marketId_in?: Int[] | Int | null
  poolStatus_eq?: String | null
  poolStatus_contains?: String | null
  poolStatus_startsWith?: String | null
  poolStatus_endsWith?: String | null
  poolStatus_in?: String[] | String | null
  scoringRule_eq?: String | null
  scoringRule_contains?: String | null
  scoringRule_startsWith?: String | null
  scoringRule_endsWith?: String | null
  scoringRule_in?: String[] | String | null
  swapFee_eq?: String | null
  swapFee_contains?: String | null
  swapFee_startsWith?: String | null
  swapFee_endsWith?: String | null
  swapFee_in?: String[] | String | null
  totalSubsidy_eq?: String | null
  totalSubsidy_contains?: String | null
  totalSubsidy_startsWith?: String | null
  totalSubsidy_endsWith?: String | null
  totalSubsidy_in?: String[] | String | null
  totalWeight_eq?: String | null
  totalWeight_contains?: String | null
  totalWeight_startsWith?: String | null
  totalWeight_endsWith?: String | null
  totalWeight_in?: String[] | String | null
  weights_json?: JSONObject | null
  ztgQty_eq?: BigInt | null
  ztgQty_gt?: BigInt | null
  ztgQty_gte?: BigInt | null
  ztgQty_lt?: BigInt | null
  ztgQty_lte?: BigInt | null
  ztgQty_in?: BigInt[] | BigInt | null
  AND?: PoolWhereInput[] | PoolWhereInput | null
  OR?: PoolWhereInput[] | PoolWhereInput | null
}

export interface PoolWhereUniqueInput {
  id: ID_Output
}

export interface WeightCreateInput {
  assetId: String
  len: String
}

export interface WeightInput {
  assetId: String
  len: String
}

export interface WeightUpdateInput {
  assetId?: String | null
  len?: String | null
}

export interface WeightWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  assetId_eq?: String | null
  assetId_contains?: String | null
  assetId_startsWith?: String | null
  assetId_endsWith?: String | null
  assetId_in?: String[] | String | null
  len_eq?: String | null
  len_contains?: String | null
  len_startsWith?: String | null
  len_endsWith?: String | null
  len_in?: String[] | String | null
  AND?: WeightWhereInput[] | WeightWhereInput | null
  OR?: WeightWhereInput[] | WeightWhereInput | null
}

export interface WeightWhereUniqueInput {
  id: ID_Output
}

export interface BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
}

export interface DeleteResponse {
  id: ID_Output
}

export interface Account extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
  wallet: String
  assetBalances?: Array<AssetBalance> | null
  historicalAssetBalances?: Array<HistoricalAssetBalance> | null
}

export interface AccountConnection {
  totalCount: Int
  edges: Array<AccountEdge>
  pageInfo: PageInfo
}

export interface AccountEdge {
  node: Account
  cursor: String
}

export interface Asset extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
  assetId: String
  price?: Float | null
  qty?: BigInt | null
}

export interface AssetBalance extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
  account: Account
  accountId: String
  assetId: String
  balance: BigInt
}

export interface AssetBalanceConnection {
  totalCount: Int
  edges: Array<AssetBalanceEdge>
  pageInfo: PageInfo
}

export interface AssetBalanceEdge {
  node: AssetBalance
  cursor: String
}

export interface AssetConnection {
  totalCount: Int
  edges: Array<AssetEdge>
  pageInfo: PageInfo
}

export interface AssetEdge {
  node: Asset
  cursor: String
}

export interface BaseModel extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
}

export interface BaseModelUUID extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
}

export interface CategoryMetadata {
  name?: String | null
  ticker?: String | null
  img?: String | null
  color?: String | null
}

export interface HistoricalAssetBalance extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
  account: Account
  accountId: String
  event: String
  assetId: String
  amount: BigInt
  balance: BigInt
  blockNumber: Int
  timestamp: BigInt
}

export interface HistoricalAssetBalanceConnection {
  totalCount: Int
  edges: Array<HistoricalAssetBalanceEdge>
  pageInfo: PageInfo
}

export interface HistoricalAssetBalanceEdge {
  node: HistoricalAssetBalance
  cursor: String
}

export interface HistoricalAssetPrice extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
  assetId: String
  dPrice: Float
  dQty: BigInt
  price: Float
  qty: BigInt
  event: String
  blockNumber: Int
  timestamp: BigInt
}

export interface HistoricalAssetPriceConnection {
  totalCount: Int
  edges: Array<HistoricalAssetPriceEdge>
  pageInfo: PageInfo
}

export interface HistoricalAssetPriceEdge {
  node: HistoricalAssetPrice
  cursor: String
}

export interface HistoricalPool extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
  poolId: Int
  event: String
  ztgQty: BigInt
  blockNumber: Int
  timestamp: BigInt
}

export interface HistoricalPoolConnection {
  totalCount: Int
  edges: Array<HistoricalPoolEdge>
  pageInfo: PageInfo
}

export interface HistoricalPoolEdge {
  node: HistoricalPool
  cursor: String
}

export interface Market extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
  marketId: Int
  creator: String
  creation: String
  creatorFee?: Int | null
  oracle: String
  outcomeAssets: Array<String>
  slug?: String | null
  question?: String | null
  description?: String | null
  categories?: CategoryMetadata | null
  tags?: Array<String> | null
  img?: String | null
  marketType: MarketType
  period: MarketPeriod
  end: BigInt
  scoringRule: String
  status: String
  poolId?: Int | null
  report?: MarketReport | null
  resolvedOutcome?: String | null
  mdm: MarketDisputeMechanism
  marketHistory?: MarketHistory | null
}

export interface MarketConnection {
  totalCount: Int
  edges: Array<MarketEdge>
  pageInfo: PageInfo
}

export interface MarketDisputeMechanism {
  authorized?: String | null
  court?: Boolean | null
  simpleDisputes?: Boolean | null
}

export interface MarketEdge {
  node: Market
  cursor: String
}

export interface MarketHistory {
  event?: String | null
  status?: String | null
  poolId?: Int | null
  report?: MarketReport | null
  resolvedOutcome?: String | null
  blockNumber?: Int | null
  timestamp?: String | null
}

export interface MarketPeriod {
  block?: String | null
  timestamp?: String | null
}

export interface MarketReport {
  at: Int
  by: String
  outcome: OutcomeReport
}

export interface MarketType {
  categorical?: String | null
  scalar?: String | null
}

export interface OutcomeReport {
  categorical?: Int | null
  scalar?: Int | null
}

export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String | null
  endCursor?: String | null
}

export interface Pool extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
  poolId: Int
  baseAsset: String
  marketId: Int
  poolStatus: String
  scoringRule: String
  swapFee: String
  totalSubsidy: String
  totalWeight: String
  weights: Weight
  ztgQty: BigInt
}

export interface PoolConnection {
  totalCount: Int
  edges: Array<PoolEdge>
  pageInfo: PageInfo
}

export interface PoolEdge {
  node: Pool
  cursor: String
}

export interface ProcessorState {
  lastCompleteBlock: Float
  lastProcessedEvent: String
  indexerHead: Float
  chainHead: Float
}

export interface StandardDeleteResponse {
  id: ID_Output
}

export interface Weight {
  assetId: String
  len: String
}

/*
GraphQL representation of BigInt
*/
export type BigInt = string

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The javascript `Date` as string. Type represents date and time as the ISO Date string.
*/
export type DateTime = Date | string

/*
The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point).
*/
export type Float = number

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.
*/
export type Int = number

/*
The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
*/

    export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

    export type JsonPrimitive = string | number | boolean | null | {};
    
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface JsonArray extends Array<JsonValue> {}
    
    export type JsonObject = { [member: string]: JsonValue };

    export type JSONObject = JsonObject;
  

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string