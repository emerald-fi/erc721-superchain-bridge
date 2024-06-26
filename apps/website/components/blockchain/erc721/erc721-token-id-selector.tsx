"use client"

import { useCallback, useMemo, useState } from "react"
import Image from "next/image"
import { ENS_CONTRACT_ADDRESS } from "@/data/constants"
import { type Address } from "viem"

import { type Nft } from "@/lib/hooks/web3/use-nfts-for-owner"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

type ChainType = "L1" | "L2"

interface Erc721TokenIdSelectorPropsProps {
  className?: string
  chainType: ChainType
  onSelectTokenId?: (id: string) => void
  l1ContractAddress: Address | undefined
  l2ContractAddress: Address | undefined
  nfts: Nft[] | undefined | null
}

export function Erc721TokenIdSelector({
  chainType,
  className,
  l1ContractAddress,
  l2ContractAddress,
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

  const isEnsContract = useMemo(
    () => l1ContractAddress === ENS_CONTRACT_ADDRESS,
    [l1ContractAddress]
  )

  const filteredTokenList = useMemo(
    () =>
      nfts?.filter((nft) =>
        chainType === "L1"
          ? nft.contract.address.toLowerCase() ===
            l1ContractAddress?.toLowerCase()
          : nft.contract.address.toLowerCase() ===
            l2ContractAddress?.toLowerCase()
      ),
    [nfts, l1ContractAddress, l2ContractAddress, chainType]
  )

  if (nfts === undefined) {
    return <Skeleton className="h-24 w-full rounded-xl" />
  }

  if (!filteredTokenList?.length) {
    return (
      <>
        <Card className="w-full p-3 py-6">
          <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
            <span className="font-bold">
              You're not the owner of any tokens in this collection.
            </span>{" "}
            <br />
            Please select another collection or connect to a different wallet.
          </p>
        </Card>
      </>
    )
  }

  return (
    <div
      className={cn(
        "grid max-h-[380px] w-full grid-cols-1 gap-2 overflow-y-auto rounded-xl border border-primary/10 p-3",
        className
      )}
    >
      {filteredTokenList?.map((nft) => (
        <Card
          className={cn(
            "flex h-fit w-full cursor-pointer items-center gap-x-4 border-2 p-4 transition duration-200",
            selectedTokenId === nft.tokenId
              ? "border-primary"
              : "hover:border-primary/25"
          )}
          onClick={() => handleSelect(nft.tokenId)}
          key={nft.tokenId}
        >
          <div className="relative h-[64px] min-w-[64px] overflow-hidden rounded-md">
            {imageLoaded ? null : (
              <Skeleton className="absolute h-[64px] w-[64px] rounded-md" />
            )}
            <Image
              width={64}
              height={64}
              className={cn("absolute", !imageLoaded && "invisible")}
              alt={`${nft.tokenId} image`}
              src={nft.imageUrl ?? "/logo.svg"}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          <div className="overflow-x-auto text-xl font-semibold">
            {isEnsContract ? nft.name : "#" + nft.tokenId}
          </div>
        </Card>
      ))}
    </div>
  )
}
