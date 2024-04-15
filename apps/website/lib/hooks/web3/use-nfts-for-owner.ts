import { ENS_CONTRACT_ADDRESS } from "@/data/constants"
import { env } from "@/env.mjs"
import { useQuery } from "@tanstack/react-query"
import { type Address } from "viem"

import { chainIds, type SupportedChainId } from "@/config/wagmi"
import { chunkArray } from "@/lib/utils"

export interface Nft {
  imageUrl?: string | null
  contract: {
    address: Address
    name: string | null
    symbol: string
    totalSupply: number | null
    tokenType: "ERC721" | "ERC1155" | "UNKNOWN"
    contractDeployer: Address
    deployedBlockNumber: number
    openSeaMetadata: {
      floorPrice: number | null
      collectionName: string | null
      collectionSlug: string | null
      safelistRequestStatus: string | null
      imageUrl: string | null
      description: string | null
      externalUrl: string | null
      twitterUsername: string | null
      discordUrl: string | null
      bannerImageUrl: string | null
      lastIngestedAt: string | null
    }
    isSpam: boolean | null
    spamClassifications: string[]
  }
  tokenId: string
  tokenType: "ERC721" | "ERC1155"
  name: string
  description: string
  tokenUri: string
  image: {
    cachedUrl: string | null
    thumbnailUrl: string | null
    pngUrl: string | null
    contentType: string | null
    size: number | null
    originalUrl: string | null
  }
  raw: {
    tokenUri: string
    metadata: {
      background_image: string
      image: string
      is_normalized: boolean
      image_url: string
      name: string
      description: string
      attributes: {
        value: string | boolean | number
        trait_type: string
        display_type?: "number" | "date"
      }[]
      version: number
      url: string
    }
    error: string | null
  }
  collection: null
  mint: {
    mintAddress: Address | null
    blockNumber: number | null
    timestamp: number | null
    transactionHash: string | null
  }
  owners: null
  timeLastUpdated: string
  balance: string
  acquiredAt: {
    blockTimestamp: number | null
    blockNumber: number | null
  }
}

interface NftsForOwnerResponse {
  ownedNfts: Nft[]
  totalCount: number
  validAt: {
    blockNumber: number | null
    blockHash: string
    blockTimestamp: number | null
  }
  pageKey: string | null
}

interface Params {
  owner: Address | undefined
  chainId: number | undefined
  contractAddresses?: Address[]
}

// The Alchemy NFT API has a limit of 45 contract addresses per request
const MAX_CONTRACT_ADDRESSES = 45

export function useNftsForOwner({ owner, contractAddresses, chainId }: Params) {
  return useQuery({
    queryKey: ["nfts-for-owner", chainId, owner, contractAddresses],
    queryFn: async () => {
      if (!owner) return null
      const contractAddressChunks =
        contractAddresses && contractAddresses?.length > MAX_CONTRACT_ADDRESSES
          ? chunkArray(contractAddresses, MAX_CONTRACT_ADDRESSES)
          : [contractAddresses]

      const responses = await Promise.all(
        contractAddressChunks.map((addresses) =>
          fetchNftsForOwner({ chainId, owner, contractAddresses: addresses })
        )
      )
      const allNfts = responses
        .flatMap((response) => response)
        // Filters out ENS names that doesn't have a `name` property,
        // Meaning they have expired
        .filter(
          ({ name, contract }) =>
            contract?.address !== ENS_CONTRACT_ADDRESS ||
            (contract?.address === ENS_CONTRACT_ADDRESS && name !== null)
        )
        .map((nft) => ({
          ...nft,
          // Adds a convenience property that gets fallback image from the NFT metadata
          imageUrl:
            nft.image.pngUrl ??
            nft.image.originalUrl ??
            nft.image.cachedUrl ??
            nft.contract.openSeaMetadata?.imageUrl,
        }))
      return allNfts
    },
    enabled: Boolean(owner && chainId),
  })
}

async function fetchNftsForOwner({
  chainId,
  contractAddresses,
  owner,
}: Params) {
  if (!owner) {
    throw new Error("Owner is required")
  }
  if (!chainId) {
    throw new Error("Chain ID is required")
  }

  const alchemyNftApiUrl = getAlchemyNftApiUrlByChainId(chainId)
  const url = new URL(
    `${alchemyNftApiUrl}/${env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTsForOwner`
  )
  url.searchParams.append("owner", owner)
  url.searchParams.append("withMetadata", "true")
  url.searchParams.append("pageSize", "100")

  if (contractAddresses) {
    for (const contractAddress of contractAddresses) {
      url.searchParams.append("contractAddresses[]", contractAddress)
    }
  }

  let pageKey: string | null = null
  const allNfts: Nft[] = []

  do {
    const urlWithPageKey = new URL(
      `${url.toString()}${pageKey ? `&pageKey=${pageKey}` : ""}`
    )
    const response = await fetch(urlWithPageKey.toString())

    if (!response.ok) {
      throw new Error(`Failed to fetch NFTs for owner: ${response.statusText}`)
    }
    const jsonResponse = (await response.json()) as NftsForOwnerResponse

    allNfts.push(...jsonResponse.ownedNfts)
    pageKey =
      typeof jsonResponse.pageKey === "string"
        ? encodeURIComponent(jsonResponse.pageKey)
        : null
  } while (pageKey)

  return allNfts
}

function getAlchemyNftApiUrlByChainId(chainId: number) {
  const chainIdDomainConfig: Record<SupportedChainId, string> = {
    "1": "eth-mainnet",
    "10": "opt-mainnet",
    "11155111": "eth-sepolia",
    "11155420": "opt-sepolia",
    "8453": "base-mainnet",
    "84532": "base-sepolia",
  }

  // @ts-expect-error
  if (!chainIds.includes(chainId))
    throw new Error(`Chain ID ${chainId} is not supported`)

  const chainIdDomain = chainIdDomainConfig?.[chainId as SupportedChainId]

  return `https://${chainIdDomain}.g.alchemy.com/nft/v3`
}
