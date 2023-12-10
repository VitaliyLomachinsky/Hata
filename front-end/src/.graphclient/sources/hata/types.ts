// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace HataTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
  Int8: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Price = {
  id: Scalars['Bytes'];
  price: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
};

export type Price_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  price?: InputMaybe<Scalars['BigInt']>;
  price_not?: InputMaybe<Scalars['BigInt']>;
  price_gt?: InputMaybe<Scalars['BigInt']>;
  price_lt?: InputMaybe<Scalars['BigInt']>;
  price_gte?: InputMaybe<Scalars['BigInt']>;
  price_lte?: InputMaybe<Scalars['BigInt']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Price_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Price_filter>>>;
};

export type Price_orderBy =
  | 'id'
  | 'price'
  | 'blockTimestamp';

export type Property = {
  id: Scalars['Bytes'];
  isActive?: Maybe<Scalars['Boolean']>;
  propertyID: Scalars['Bytes'];
  landlord: Scalars['Bytes'];
  location: Scalars['String'];
  area: Scalars['Int'];
  previewCID: Scalars['String'];
  price?: Maybe<Scalars['BigInt']>;
  payment?: Maybe<Scalars['Int']>;
};

export type Property_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isActive_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isActive_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  propertyID?: InputMaybe<Scalars['Bytes']>;
  propertyID_not?: InputMaybe<Scalars['Bytes']>;
  propertyID_gt?: InputMaybe<Scalars['Bytes']>;
  propertyID_lt?: InputMaybe<Scalars['Bytes']>;
  propertyID_gte?: InputMaybe<Scalars['Bytes']>;
  propertyID_lte?: InputMaybe<Scalars['Bytes']>;
  propertyID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  propertyID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  propertyID_contains?: InputMaybe<Scalars['Bytes']>;
  propertyID_not_contains?: InputMaybe<Scalars['Bytes']>;
  landlord?: InputMaybe<Scalars['Bytes']>;
  landlord_not?: InputMaybe<Scalars['Bytes']>;
  landlord_gt?: InputMaybe<Scalars['Bytes']>;
  landlord_lt?: InputMaybe<Scalars['Bytes']>;
  landlord_gte?: InputMaybe<Scalars['Bytes']>;
  landlord_lte?: InputMaybe<Scalars['Bytes']>;
  landlord_in?: InputMaybe<Array<Scalars['Bytes']>>;
  landlord_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  landlord_contains?: InputMaybe<Scalars['Bytes']>;
  landlord_not_contains?: InputMaybe<Scalars['Bytes']>;
  location?: InputMaybe<Scalars['String']>;
  location_not?: InputMaybe<Scalars['String']>;
  location_gt?: InputMaybe<Scalars['String']>;
  location_lt?: InputMaybe<Scalars['String']>;
  location_gte?: InputMaybe<Scalars['String']>;
  location_lte?: InputMaybe<Scalars['String']>;
  location_in?: InputMaybe<Array<Scalars['String']>>;
  location_not_in?: InputMaybe<Array<Scalars['String']>>;
  location_contains?: InputMaybe<Scalars['String']>;
  location_contains_nocase?: InputMaybe<Scalars['String']>;
  location_not_contains?: InputMaybe<Scalars['String']>;
  location_not_contains_nocase?: InputMaybe<Scalars['String']>;
  location_starts_with?: InputMaybe<Scalars['String']>;
  location_starts_with_nocase?: InputMaybe<Scalars['String']>;
  location_not_starts_with?: InputMaybe<Scalars['String']>;
  location_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  location_ends_with?: InputMaybe<Scalars['String']>;
  location_ends_with_nocase?: InputMaybe<Scalars['String']>;
  location_not_ends_with?: InputMaybe<Scalars['String']>;
  location_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  area?: InputMaybe<Scalars['Int']>;
  area_not?: InputMaybe<Scalars['Int']>;
  area_gt?: InputMaybe<Scalars['Int']>;
  area_lt?: InputMaybe<Scalars['Int']>;
  area_gte?: InputMaybe<Scalars['Int']>;
  area_lte?: InputMaybe<Scalars['Int']>;
  area_in?: InputMaybe<Array<Scalars['Int']>>;
  area_not_in?: InputMaybe<Array<Scalars['Int']>>;
  previewCID?: InputMaybe<Scalars['String']>;
  previewCID_not?: InputMaybe<Scalars['String']>;
  previewCID_gt?: InputMaybe<Scalars['String']>;
  previewCID_lt?: InputMaybe<Scalars['String']>;
  previewCID_gte?: InputMaybe<Scalars['String']>;
  previewCID_lte?: InputMaybe<Scalars['String']>;
  previewCID_in?: InputMaybe<Array<Scalars['String']>>;
  previewCID_not_in?: InputMaybe<Array<Scalars['String']>>;
  previewCID_contains?: InputMaybe<Scalars['String']>;
  previewCID_contains_nocase?: InputMaybe<Scalars['String']>;
  previewCID_not_contains?: InputMaybe<Scalars['String']>;
  previewCID_not_contains_nocase?: InputMaybe<Scalars['String']>;
  previewCID_starts_with?: InputMaybe<Scalars['String']>;
  previewCID_starts_with_nocase?: InputMaybe<Scalars['String']>;
  previewCID_not_starts_with?: InputMaybe<Scalars['String']>;
  previewCID_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  previewCID_ends_with?: InputMaybe<Scalars['String']>;
  previewCID_ends_with_nocase?: InputMaybe<Scalars['String']>;
  previewCID_not_ends_with?: InputMaybe<Scalars['String']>;
  previewCID_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['BigInt']>;
  price_not?: InputMaybe<Scalars['BigInt']>;
  price_gt?: InputMaybe<Scalars['BigInt']>;
  price_lt?: InputMaybe<Scalars['BigInt']>;
  price_gte?: InputMaybe<Scalars['BigInt']>;
  price_lte?: InputMaybe<Scalars['BigInt']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  payment?: InputMaybe<Scalars['Int']>;
  payment_not?: InputMaybe<Scalars['Int']>;
  payment_gt?: InputMaybe<Scalars['Int']>;
  payment_lt?: InputMaybe<Scalars['Int']>;
  payment_gte?: InputMaybe<Scalars['Int']>;
  payment_lte?: InputMaybe<Scalars['Int']>;
  payment_in?: InputMaybe<Array<Scalars['Int']>>;
  payment_not_in?: InputMaybe<Array<Scalars['Int']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Property_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Property_filter>>>;
};

export type Property_orderBy =
  | 'id'
  | 'isActive'
  | 'propertyID'
  | 'landlord'
  | 'location'
  | 'area'
  | 'previewCID'
  | 'price'
  | 'payment';

export type Query = {
  price?: Maybe<Price>;
  prices: Array<Price>;
  property?: Maybe<Property>;
  properties: Array<Property>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QuerypriceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypricesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Price_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Price_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypropertyArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypropertiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Property_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Property_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
  price?: Maybe<Price>;
  prices: Array<Price>;
  property?: Maybe<Property>;
  properties: Array<Property>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionpriceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpricesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Price_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Price_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpropertyArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpropertiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Property_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Property_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  price: InContextSdkMethod<Query['price'], QuerypriceArgs, MeshContext>,
  /** null **/
  prices: InContextSdkMethod<Query['prices'], QuerypricesArgs, MeshContext>,
  /** null **/
  property: InContextSdkMethod<Query['property'], QuerypropertyArgs, MeshContext>,
  /** null **/
  properties: InContextSdkMethod<Query['properties'], QuerypropertiesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  price: InContextSdkMethod<Subscription['price'], SubscriptionpriceArgs, MeshContext>,
  /** null **/
  prices: InContextSdkMethod<Subscription['prices'], SubscriptionpricesArgs, MeshContext>,
  /** null **/
  property: InContextSdkMethod<Subscription['property'], SubscriptionpropertyArgs, MeshContext>,
  /** null **/
  properties: InContextSdkMethod<Subscription['properties'], SubscriptionpropertiesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["hata"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
