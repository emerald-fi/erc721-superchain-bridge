"use client"

import { useCallback, useMemo, useState } from "react"
import Image from "next/image"
import { type Address } from "viem"

import { type Nft } from "@/lib/hooks/web3/use-nfts-for-owner"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface Erc721TokenIdSelectorPropsProps {
  className?: string
  onSelectTokenId?: (id: string) => void
  contractAddress: Address | undefined
  nfts: Nft[] | undefined | null
}

export function Erc721TokenIdSelector({
  className,
  contractAddress,
  nfts,
  onSelectTokenId,
}: Erc721TokenIdSelectorPropsProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [selectedTokenId, setSelectedTokenId] = useState<string | undefined>()
  const handleSelect = useCallback(
    (id: string) => {
      setSelectedTokenId(id)
      onSelectTokenId?.(id)
    },
    [setSelectedTokenId]
  )
  const filteredTokenList = useMemo(
    () =>
      nfts?.filter(
        (nft) =>
          nft.contract.address.toLowerCase() === contractAddress?.toLowerCase()
      ),
    [nfts, contractAddress]
  )

  if (!filteredTokenList?.length)
    return (
      <Card className="w-full p-3 py-6">
        <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
          <span className="font-bold">
            You're not the owner of any tokens in this collection.
          </span>{" "}
          <br />
          Please select another collection or connect to a different wallet.
        </p>
      </Card>
    )

  return (
    <div
      className={cn(
        "grid max-h-[380px] w-full grid-cols-1 gap-4 overflow-y-auto rounded-xl border border-primary/10 p-3 sm:grid-cols-2",
        className
      )}
    >
      {filteredTokenList?.map((nft) => (
        <Card
          className={cn(
            "flex h-fit cursor-pointer items-center gap-x-6 border-2  p-4 transition duration-200",
            selectedTokenId === nft.tokenId
              ? "border-primary"
              : "hover:border-primary/25"
          )}
          onClick={() => handleSelect(nft.tokenId)}
          key={nft.tokenId}
        >
          <div className="relative h-[60px] w-[60px]">
            {imageLoaded ? null : (
              <Skeleton className="absolute h-[60px] w-[60px] rounded-md" />
            )}
            <Image
              width={60}
              height={60}
              className={cn("absolute rounded-md", !imageLoaded && "invisible")}
              alt={`${nft.tokenId} image`}
              src={nft.imageUrl ?? "/logo.svg"}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          <div className="text-2xl font-semibold">#{nft.tokenId}</div>
        </Card>
      ))}
    </div>
  )
}
