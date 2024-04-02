/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core"

export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  BigInt: { input: any; output: any }
}

export type OptimismMintableErc721 = {
  __typename?: "OptimismMintableERC721"
  blockNumber: Scalars["BigInt"]["output"]
  chainId: Scalars["Int"]["output"]
  deployer: Scalars["String"]["output"]
  id: Scalars["String"]["output"]
  localName?: Maybe<Scalars["String"]["output"]>
  localSymbol?: Maybe<Scalars["String"]["output"]>
  localToken: Scalars["String"]["output"]
  remoteName?: Maybe<Scalars["String"]["output"]>
  remoteSymbol?: Maybe<Scalars["String"]["output"]>
  remoteToken: Scalars["String"]["output"]
}

export type OptimismMintableErc721Filter = {
  AND?: InputMaybe<Array<InputMaybe<OptimismMintableErc721Filter>>>
  OR?: InputMaybe<Array<InputMaybe<OptimismMintableErc721Filter>>>
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>
  blockNumber_in?: InputMaybe<Array<InputMaybe<Scalars["BigInt"]["input"]>>>
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>
  blockNumber_not_in?: InputMaybe<Array<InputMaybe<Scalars["BigInt"]["input"]>>>
  chainId?: InputMaybe<Scalars["Int"]["input"]>
  chainId_gt?: InputMaybe<Scalars["Int"]["input"]>
  chainId_gte?: InputMaybe<Scalars["Int"]["input"]>
  chainId_in?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>
  chainId_lt?: InputMaybe<Scalars["Int"]["input"]>
  chainId_lte?: InputMaybe<Scalars["Int"]["input"]>
  chainId_not?: InputMaybe<Scalars["Int"]["input"]>
  chainId_not_in?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>
  deployer?: InputMaybe<Scalars["String"]["input"]>
  deployer_contains?: InputMaybe<Scalars["String"]["input"]>
  deployer_ends_with?: InputMaybe<Scalars["String"]["input"]>
  deployer_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>
  deployer_not?: InputMaybe<Scalars["String"]["input"]>
  deployer_not_contains?: InputMaybe<Scalars["String"]["input"]>
  deployer_not_ends_with?: InputMaybe<Scalars["String"]["input"]>
  deployer_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>
  deployer_not_starts_with?: InputMaybe<Scalars["String"]["input"]>
  deployer_starts_with?: InputMaybe<Scalars["String"]["input"]>
  id?: InputMaybe<Scalars["String"]["input"]>
  id_contains?: InputMaybe<Scalars["String"]["input"]>
  id_ends_with?: InputMaybe<Scalars["String"]["input"]>
  id_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>
  id_not?: InputMaybe<Scalars["String"]["input"]>
  id_not_contains?: InputMaybe<Scalars["String"]["input"]>
  id_not_ends_with?: InputMaybe<Scalars["String"]["input"]>
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>
  id_not_starts_with?: InputMaybe<Scalars["String"]["input"]>
  id_starts_with?: InputMaybe<Scalars["String"]["input"]>
  localName?: InputMaybe<Scalars["String"]["input"]>
  localName_contains?: InputMaybe<Scalars["String"]["input"]>
  localName_ends_with?: InputMaybe<Scalars["String"]["input"]>
  localName_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>
  localName_not?: InputMaybe<Scalars["String"]["input"]>
  localName_not_contains?: InputMaybe<Scalars["String"]["input"]>
  localName_not_ends_with?: InputMaybe<Scalars["String"]["input"]>
  localName_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>
  localName_not_starts_with?: InputMaybe<Scalars["String"]["input"]>
  localName_starts_with?: InputMaybe<Scalars["String"]["input"]>
  localSymbol?: InputMaybe<Scalars["String"]["input"]>
  localSymbol_contains?: InputMaybe<Scalars["String"]["input"]>
  localSymbol_ends_with?: InputMaybe<Scalars["String"]["input"]>
  localSymbol_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>
  localSymbol_not?: InputMaybe<Scalars["String"]["input"]>
  localSymbol_not_contains?: InputMaybe<Scalars["String"]["input"]>
  localSymbol_not_ends_with?: InputMaybe<Scalars["String"]["input"]>
  localSymbol_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>
  localSymbol_not_starts_with?: InputMaybe<Scalars["String"]["input"]>
  localSymbol_starts_with?: InputMaybe<Scalars["String"]["input"]>
  localToken?: InputMaybe<Scalars["String"]["input"]>
  localToken_contains?: InputMaybe<Scalars["String"]["input"]>
  localToken_ends_with?: InputMaybe<Scalars["String"]["input"]>
  localToken_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>
  localToken_not?: InputMaybe<Scalars["String"]["input"]>
  localToken_not_contains?: InputMaybe<Scalars["String"]["input"]>
  localToken_not_ends_with?: InputMaybe<Scalars["String"]["input"]>
  localToken_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>
  localToken_not_starts_with?: InputMaybe<Scalars["String"]["input"]>
  localToken_starts_with?: InputMaybe<Scalars["String"]["input"]>
  remoteName?: InputMaybe<Scalars["String"]["input"]>
  remoteName_contains?: InputMaybe<Scalars["String"]["input"]>
  remoteName_ends_with?: InputMaybe<Scalars["String"]["input"]>
  remoteName_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>
  remoteName_not?: InputMaybe<Scalars["String"]["input"]>
  remoteName_not_contains?: InputMaybe<Scalars["String"]["input"]>
  remoteName_not_ends_with?: InputMaybe<Scalars["String"]["input"]>
  remoteName_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>
  remoteName_not_starts_with?: InputMaybe<Scalars["String"]["input"]>
  remoteName_starts_with?: InputMaybe<Scalars["String"]["input"]>
  remoteSymbol?: InputMaybe<Scalars["String"]["input"]>
  remoteSymbol_contains?: InputMaybe<Scalars["String"]["input"]>
  remoteSymbol_ends_with?: InputMaybe<Scalars["String"]["input"]>
  remoteSymbol_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>
  remoteSymbol_not?: InputMaybe<Scalars["String"]["input"]>
  remoteSymbol_not_contains?: InputMaybe<Scalars["String"]["input"]>
  remoteSymbol_not_ends_with?: InputMaybe<Scalars["String"]["input"]>
  remoteSymbol_not_in?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >
  remoteSymbol_not_starts_with?: InputMaybe<Scalars["String"]["input"]>
  remoteSymbol_starts_with?: InputMaybe<Scalars["String"]["input"]>
  remoteToken?: InputMaybe<Scalars["String"]["input"]>
  remoteToken_contains?: InputMaybe<Scalars["String"]["input"]>
  remoteToken_ends_with?: InputMaybe<Scalars["String"]["input"]>
  remoteToken_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>
  remoteToken_not?: InputMaybe<Scalars["String"]["input"]>
  remoteToken_not_contains?: InputMaybe<Scalars["String"]["input"]>
  remoteToken_not_ends_with?: InputMaybe<Scalars["String"]["input"]>
  remoteToken_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>
  remoteToken_not_starts_with?: InputMaybe<Scalars["String"]["input"]>
  remoteToken_starts_with?: InputMaybe<Scalars["String"]["input"]>
}

export type OptimismMintableErc721Page = {
  __typename?: "OptimismMintableERC721Page"
  items: Array<OptimismMintableErc721>
  pageInfo: PageInfo
}

export type PageInfo = {
  __typename?: "PageInfo"
  endCursor?: Maybe<Scalars["String"]["output"]>
  hasNextPage: Scalars["Boolean"]["output"]
  hasPreviousPage: Scalars["Boolean"]["output"]
  startCursor?: Maybe<Scalars["String"]["output"]>
}

export type Query = {
  __typename?: "Query"
  optimismMintableERC721?: Maybe<OptimismMintableErc721>
  optimismMintableERC721s: OptimismMintableErc721Page
}

export type QueryOptimismMintableErc721Args = {
  id: Scalars["String"]["input"]
  timestamp?: InputMaybe<Scalars["Int"]["input"]>
}

export type QueryOptimismMintableErc721sArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  limit?: InputMaybe<Scalars["Int"]["input"]>
  orderBy?: InputMaybe<Scalars["String"]["input"]>
  orderDirection?: InputMaybe<Scalars["String"]["input"]>
  timestamp?: InputMaybe<Scalars["Int"]["input"]>
  where?: InputMaybe<OptimismMintableErc721Filter>
}

export type AllOptimismMintableErc721QueryQueryVariables = Exact<{
  limit?: InputMaybe<Scalars["Int"]["input"]>
}>

export type AllOptimismMintableErc721QueryQuery = {
  __typename?: "Query"
  optimismMintableERC721s: {
    __typename?: "OptimismMintableERC721Page"
    items: Array<{
      __typename?: "OptimismMintableERC721"
      id: string
      chainId: number
      blockNumber: any
      localToken: string
      localName?: string | null
      localSymbol?: string | null
      remoteToken: string
      remoteName?: string | null
      remoteSymbol?: string | null
      deployer: string
    }>
  }
}

export type GetOtimismMintableErc721ByLocalTokenQueryQueryVariables = Exact<{
  localToken: Scalars["String"]["input"]
  chainId?: InputMaybe<Scalars["Int"]["input"]>
}>

export type GetOtimismMintableErc721ByLocalTokenQueryQuery = {
  __typename?: "Query"
  optimismMintableERC721s: {
    __typename?: "OptimismMintableERC721Page"
    items: Array<{
      __typename?: "OptimismMintableERC721"
      id: string
      chainId: number
      blockNumber: any
      localToken: string
      localName?: string | null
      localSymbol?: string | null
      remoteToken: string
      remoteName?: string | null
      remoteSymbol?: string | null
      deployer: string
    }>
  }
}

export type GetOtimismMintableErc721ByRemoteTokenQueryQueryVariables = Exact<{
  remoteToken: Scalars["String"]["input"]
  chainId?: InputMaybe<Scalars["Int"]["input"]>
}>

export type GetOtimismMintableErc721ByRemoteTokenQueryQuery = {
  __typename?: "Query"
  optimismMintableERC721s: {
    __typename?: "OptimismMintableERC721Page"
    items: Array<{
      __typename?: "OptimismMintableERC721"
      id: string
      chainId: number
      blockNumber: any
      localToken: string
      localName?: string | null
      localSymbol?: string | null
      remoteToken: string
      remoteName?: string | null
      remoteSymbol?: string | null
      deployer: string
    }>
  }
}

export const AllOptimismMintableErc721QueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "allOptimismMintableERC721Query" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "optimismMintableERC721s" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "chainId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "blockNumber" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "localToken" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "localName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "localSymbol" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "remoteToken" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "remoteName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "remoteSymbol" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "deployer" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AllOptimismMintableErc721QueryQuery,
  AllOptimismMintableErc721QueryQueryVariables
>
export const GetOtimismMintableErc721ByLocalTokenQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: {
        kind: "Name",
        value: "getOtimismMintableERC721ByLocalTokenQuery",
      },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "localToken" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "chainId" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "optimismMintableERC721s" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "localToken" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "localToken" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "chainId" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "chainId" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "chainId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "blockNumber" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "localToken" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "localName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "localSymbol" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "remoteToken" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "remoteName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "remoteSymbol" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "deployer" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetOtimismMintableErc721ByLocalTokenQueryQuery,
  GetOtimismMintableErc721ByLocalTokenQueryQueryVariables
>
export const GetOtimismMintableErc721ByRemoteTokenQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: {
        kind: "Name",
        value: "getOtimismMintableERC721ByRemoteTokenQuery",
      },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "remoteToken" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "chainId" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "optimismMintableERC721s" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "remoteToken" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "remoteToken" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "chainId" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "chainId" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "chainId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "blockNumber" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "localToken" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "localName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "localSymbol" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "remoteToken" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "remoteName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "remoteSymbol" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "deployer" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetOtimismMintableErc721ByRemoteTokenQueryQuery,
  GetOtimismMintableErc721ByRemoteTokenQueryQueryVariables
>
