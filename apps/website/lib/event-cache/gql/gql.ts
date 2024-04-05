/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core"

import * as types from "./graphql"

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n  query allOptimismMintableERC721Query($limit: Int) {\n    optimismMintableERC721s(limit: $limit) {\n      items {\n        id\n        chainId\n        blockNumber\n        localToken\n        localName\n        localSymbol\n        remoteToken\n        remoteName\n        remoteSymbol\n        deployer\n      }\n    }\n  }\n":
    types.AllOptimismMintableErc721QueryDocument,
  '\n  query getBridgedERC721Query(\n    $owner: String\n    $l2chainId: Int\n    $states: [BridgedErc721State]\n  ) {\n    bridgedErc721s(\n      where: { owner: $owner, l2ChainId: $l2chainId, state_in: $states }\n      orderBy: "timestamp"\n      orderDirection: "desc"\n    ) {\n      items {\n        id\n        state\n        l1ChainId\n        l2ChainId\n        l1Token\n        l2Token\n        tokenId\n        owner\n        txHash\n        txChainId\n        timestamp\n      }\n    }\n  }\n':
    types.GetBridgedErc721QueryDocument,
  "\n  query getOtimismMintableERC721ByLocalTokenQuery(\n    $localToken: String!\n    $chainId: Int\n  ) {\n    optimismMintableERC721s(\n      where: { localToken: $localToken, chainId: $chainId }\n    ) {\n      items {\n        id\n        chainId\n        blockNumber\n        localToken\n        localName\n        localSymbol\n        remoteToken\n        remoteName\n        remoteSymbol\n        deployer\n      }\n    }\n  }\n":
    types.GetOtimismMintableErc721ByLocalTokenQueryDocument,
  "\n  query getOtimismMintableERC721ByRemoteTokenQuery(\n    $remoteToken: String!\n    $chainId: Int\n  ) {\n    optimismMintableERC721s(\n      where: { remoteToken: $remoteToken, chainId: $chainId }\n    ) {\n      items {\n        id\n        chainId\n        blockNumber\n        localToken\n        localName\n        localSymbol\n        remoteToken\n        remoteName\n        remoteSymbol\n        deployer\n      }\n    }\n  }\n":
    types.GetOtimismMintableErc721ByRemoteTokenQueryDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query allOptimismMintableERC721Query($limit: Int) {\n    optimismMintableERC721s(limit: $limit) {\n      items {\n        id\n        chainId\n        blockNumber\n        localToken\n        localName\n        localSymbol\n        remoteToken\n        remoteName\n        remoteSymbol\n        deployer\n      }\n    }\n  }\n"
): (typeof documents)["\n  query allOptimismMintableERC721Query($limit: Int) {\n    optimismMintableERC721s(limit: $limit) {\n      items {\n        id\n        chainId\n        blockNumber\n        localToken\n        localName\n        localSymbol\n        remoteToken\n        remoteName\n        remoteSymbol\n        deployer\n      }\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query getBridgedERC721Query(\n    $owner: String\n    $l2chainId: Int\n    $states: [BridgedErc721State]\n  ) {\n    bridgedErc721s(\n      where: { owner: $owner, l2ChainId: $l2chainId, state_in: $states }\n      orderBy: "timestamp"\n      orderDirection: "desc"\n    ) {\n      items {\n        id\n        state\n        l1ChainId\n        l2ChainId\n        l1Token\n        l2Token\n        tokenId\n        owner\n        txHash\n        txChainId\n        timestamp\n      }\n    }\n  }\n'
): (typeof documents)['\n  query getBridgedERC721Query(\n    $owner: String\n    $l2chainId: Int\n    $states: [BridgedErc721State]\n  ) {\n    bridgedErc721s(\n      where: { owner: $owner, l2ChainId: $l2chainId, state_in: $states }\n      orderBy: "timestamp"\n      orderDirection: "desc"\n    ) {\n      items {\n        id\n        state\n        l1ChainId\n        l2ChainId\n        l1Token\n        l2Token\n        tokenId\n        owner\n        txHash\n        txChainId\n        timestamp\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getOtimismMintableERC721ByLocalTokenQuery(\n    $localToken: String!\n    $chainId: Int\n  ) {\n    optimismMintableERC721s(\n      where: { localToken: $localToken, chainId: $chainId }\n    ) {\n      items {\n        id\n        chainId\n        blockNumber\n        localToken\n        localName\n        localSymbol\n        remoteToken\n        remoteName\n        remoteSymbol\n        deployer\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getOtimismMintableERC721ByLocalTokenQuery(\n    $localToken: String!\n    $chainId: Int\n  ) {\n    optimismMintableERC721s(\n      where: { localToken: $localToken, chainId: $chainId }\n    ) {\n      items {\n        id\n        chainId\n        blockNumber\n        localToken\n        localName\n        localSymbol\n        remoteToken\n        remoteName\n        remoteSymbol\n        deployer\n      }\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getOtimismMintableERC721ByRemoteTokenQuery(\n    $remoteToken: String!\n    $chainId: Int\n  ) {\n    optimismMintableERC721s(\n      where: { remoteToken: $remoteToken, chainId: $chainId }\n    ) {\n      items {\n        id\n        chainId\n        blockNumber\n        localToken\n        localName\n        localSymbol\n        remoteToken\n        remoteName\n        remoteSymbol\n        deployer\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getOtimismMintableERC721ByRemoteTokenQuery(\n    $remoteToken: String!\n    $chainId: Int\n  ) {\n    optimismMintableERC721s(\n      where: { remoteToken: $remoteToken, chainId: $chainId }\n    ) {\n      items {\n        id\n        chainId\n        blockNumber\n        localToken\n        localName\n        localSymbol\n        remoteToken\n        remoteName\n        remoteSymbol\n        deployer\n      }\n    }\n  }\n"]

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
