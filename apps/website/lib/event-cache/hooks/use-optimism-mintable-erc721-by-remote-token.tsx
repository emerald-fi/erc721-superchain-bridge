import { Address } from "viem"

import { graphql } from "../gql"
import { useGraphQL } from "../use-graphql"

const getOtimismMintableERC721ByRemoteTokenQuery = graphql(/* GraphQL */ `
  query getOtimismMintableERC721ByRemoteTokenQuery(
    $remoteToken: String!
    $chainId: Int
  ) {
    optimismMintableERC721s(
      where: { remoteToken: $remoteToken, chainId: $chainId }
    ) {
      items {
        id
        chainId
        blockNumber
        localToken
        localName
        localSymbol
        remoteToken
        remoteName
        remoteSymbol
        deployer
      }
    }
  }
`)

export function useOtimismMintableERC721ByRemoteTokenQuery(params: {
  remoteToken: Address
  chainId?: number
  query?: { enabled: boolean }
}) {
  return useGraphQL(
    getOtimismMintableERC721ByRemoteTokenQuery,
    {
      queryKey: [
        "getOtimismMintableERC721ByRemoteToken",
        params.chainId,
        params.remoteToken,
      ],
      enabled: params.query?.enabled,
    },
    params
  )
}
