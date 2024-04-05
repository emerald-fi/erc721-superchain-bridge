import { graphql } from "../gql"
import { GetBridgedErc721QueryQueryVariables, InputMaybe } from "../gql/graphql"
import { useGraphQL } from "../use-graphql"

export { BridgedErc721State } from "../gql/graphql"

const getBridgedERC721ByOwnerQuery = graphql(/* GraphQL */ `
  query getBridgedERC721Query(
    $owner: String
    $l2chainId: Int
    $states: [BridgedErc721State]
  ) {
    bridgedErc721s(
      where: { owner: $owner, l2ChainId: $l2chainId, state_in: $states }
      orderBy: "timestamp"
      orderDirection: "desc"
    ) {
      items {
        id
        state
        l1ChainId
        l2ChainId
        l1Token
        l2Token
        tokenId
        owner
        txHash
        txChainId
        timestamp
      }
    }
  }
`)

export function useBridgedERC721ByOwner({
  params,
  query,
}: {
  params: GetBridgedErc721QueryQueryVariables
  query?: InputMaybe<{ enabled: boolean }>
}) {
  return useGraphQL(
    getBridgedERC721ByOwnerQuery,
    {
      queryKey: ["getBridgedERC721ByOwner", params],
      enabled: query?.enabled,
    },
    params
  )
}
