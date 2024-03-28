"use client"

import { env } from "@/env.mjs"
import { useQuery } from "@tanstack/react-query"
import requestQL, { gql } from "graphql-request"

const query = gql`
  query AllClonedERC721Tokens {
    optimismMintableERC20s {
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

export function useGetAllERC721Tokens() {
  return useQuery({
    queryKey: ["allClonedERC721Tokens"],
    queryFn: () =>
      requestQL(env.NEXT_PUBLIC_API_EVENT_CACHE, query, { first: 10 }),
  })
}
