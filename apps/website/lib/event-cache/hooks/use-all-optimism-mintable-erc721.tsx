import { graphql } from "../gql"
import { useGraphQL } from "../use-graphql"

const allOptimismMintableErc721Query = graphql(/* GraphQL */ `
  query allOptimismMintableERC721Query($limit: Int) {
    optimismMintableERC721s(limit: $limit) {
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

export function useAllOptimismMintableERC721(
  params: { limit: number | undefined } = { limit: undefined }
) {
  return useGraphQL(
    allOptimismMintableErc721Query,
    {
      queryKey: ["allOptimismMintableERC721", params],
    },
    params
  )
}
