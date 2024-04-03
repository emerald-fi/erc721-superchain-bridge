import { Address } from "viem"

import { graphql } from "../gql"
import { useGraphQL } from "../use-graphql"

const getOtimismMintableERC721ByLocalTokenQuery = graphql(/* GraphQL */ `
  query getOtimismMintableERC721ByLocalTokenQuery(
    $localToken: String!
    $chainId: Int
  ) {
    optimismMintableERC721s(
      where: { localToken: $localToken, chainId: $chainId }
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

export function useGetOtimismMintableERC721ByLocalTokenQuery(params: {
  localToken: Address
  chainId?: number
  query?: { enabled: boolean }
}) {
  return useGraphQL(
    getOtimismMintableERC721ByLocalTokenQuery,
    {
      queryKey: [
        "getOtimismMintableERC721ByLocalToken",
        params.chainId,
        params.localToken,
      ],
      enabled: params.query?.enabled,
    },
    params
  )
}
