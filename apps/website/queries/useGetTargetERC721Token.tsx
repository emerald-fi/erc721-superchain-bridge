"use client"

import { env } from "@/env.mjs"
import { useQuery } from "@tanstack/react-query"
import requestQL, { gql } from "graphql-request"

const query = (chainId: string | number, token: string) => gql`
query TargetClonedERC721Token {
  optimismMintableERC20s(where: {
    remoteToken: "${token}"
    chainId: ${chainId}
  }) {
    items {
      id
      chainId
      deployer
      blockNumber
      localToken
      localName
      localSymbol
      remoteToken
      remoteName
      remoteSymbol
    }
  }
}
`

export function useGetTargetERC721Token(
  chainId: number | string,
  token: string
) {
  return useQuery({
    queryKey: ["targetClonedERC721Token", chainId, token],
    queryFn: () =>
      requestQL(env.NEXT_PUBLIC_API_EVENT_CACHE, query(chainId, token), {
        first: 10,
      }),
    enabled: !!chainId && !!token,
  })
}
