// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { HataTypes } from './sources/hata/types';
import * as importedModule$0 from "./sources/hata/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']>;
  OrderDirection: OrderDirection;
  Price: ResolverTypeWrapper<Price>;
  Price_filter: Price_filter;
  Price_orderBy: Price_orderBy;
  Property: ResolverTypeWrapper<Property>;
  Property_filter: Property_filter;
  Property_orderBy: Property_orderBy;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Int8: Scalars['Int8'];
  Price: Price;
  Price_filter: Price_filter;
  Property: Property;
  Property_filter: Property_filter;
  Query: {};
  String: Scalars['String'];
  Subscription: {};
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = {};

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type PriceResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Price'] = ResolversParentTypes['Price']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PropertyResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Property'] = ResolversParentTypes['Property']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  isActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  propertyID?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  landlord?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  area?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  previewCID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  payment?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  price?: Resolver<Maybe<ResolversTypes['Price']>, ParentType, ContextType, RequireFields<QuerypriceArgs, 'id' | 'subgraphError'>>;
  prices?: Resolver<Array<ResolversTypes['Price']>, ParentType, ContextType, RequireFields<QuerypricesArgs, 'skip' | 'first' | 'subgraphError'>>;
  property?: Resolver<Maybe<ResolversTypes['Property']>, ParentType, ContextType, RequireFields<QuerypropertyArgs, 'id' | 'subgraphError'>>;
  properties?: Resolver<Array<ResolversTypes['Property']>, ParentType, ContextType, RequireFields<QuerypropertiesArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  price?: SubscriptionResolver<Maybe<ResolversTypes['Price']>, "price", ParentType, ContextType, RequireFields<SubscriptionpriceArgs, 'id' | 'subgraphError'>>;
  prices?: SubscriptionResolver<Array<ResolversTypes['Price']>, "prices", ParentType, ContextType, RequireFields<SubscriptionpricesArgs, 'skip' | 'first' | 'subgraphError'>>;
  property?: SubscriptionResolver<Maybe<ResolversTypes['Property']>, "property", ParentType, ContextType, RequireFields<SubscriptionpropertyArgs, 'id' | 'subgraphError'>>;
  properties?: SubscriptionResolver<Array<ResolversTypes['Property']>, "properties", ParentType, ContextType, RequireFields<SubscriptionpropertiesArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  Int8?: GraphQLScalarType;
  Price?: PriceResolvers<ContextType>;
  Property?: PropertyResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = HataTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch (relativeModuleId) {
    case ".graphclient/sources/hata/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;

    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
  const pubsub = new PubSub();
  const sourcesStore = rootStore.child('sources');
  const logger = new DefaultLogger("GraphClient");
  const cache = new (MeshCache as any)({
    ...({} as any),
    importFn,
    store: rootStore.child('cache'),
    pubsub,
    logger,
  } as any)

  const sources: MeshResolvedSource[] = [];
  const transforms: MeshTransform[] = [];
  const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
  const hataTransforms = [];
  const additionalTypeDefs = [] as any[];
  const hataHandler = new GraphqlHandler({
    name: "hata",
    config: { "endpoint": "https://api.studio.thegraph.com/query/59239/hata/v0.1.3" },
    baseDir,
    cache,
    pubsub,
    store: sourcesStore.child("hata"),
    logger: logger.child("hata"),
    importFn,
  });
  sources[0] = {
    name: 'hata',
    handler: hataHandler,
    transforms: hataTransforms
  }
  const additionalResolvers = [] as any[]
  const merger = new (BareMerger as any)({
    cache,
    pubsub,
    logger: logger.child('bareMerger'),
    store: rootStore.child('bareMerger')
  })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
        {
          document: ActivePropertyQueryDocument,
          get rawSDL() {
            return printWithCache(ActivePropertyQueryDocument);
          },
          location: 'ActivePropertyQueryDocument.graphql'
        }
      ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type ActivePropertyQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type ActivePropertyQueryQuery = { properties: Array<Pick<Property, 'isActive' | 'area' | 'id' | 'landlord' | 'location' | 'payment' | 'previewCID' | 'price' | 'propertyID'>> };


export const ActivePropertyQueryDocument = gql`
    query ActivePropertyQuery {
  properties(where: {isActive: true}, orderBy: area) {
    isActive
    area
    id
    landlord
    location
    payment
    previewCID
    price
    propertyID
  }
}
    ` as unknown as DocumentNode<ActivePropertyQueryQuery, ActivePropertyQueryQueryVariables>;


export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    ActivePropertyQuery(variables?: ActivePropertyQueryQueryVariables, options?: C): Promise<ActivePropertyQueryQuery> {
      return requester<ActivePropertyQueryQuery, ActivePropertyQueryQueryVariables>(ActivePropertyQueryDocument, variables, options) as Promise<ActivePropertyQueryQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;