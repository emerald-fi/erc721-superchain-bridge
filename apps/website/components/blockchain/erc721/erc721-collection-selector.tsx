"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { l2NetworksOptions } from "@/data/networks/options"

import { type Nft } from "@/lib/hooks/web3/use-nfts-for-owner"
import { AppMode } from "@/lib/state/app-mode"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ImageIpfs } from "@/components/blockchain/image-ipfs"

import { Token, TokenList } from "./types"

type ChainType = "L1" | "L2"

interface Erc721CollectionSelectorProps {
  chainType: ChainType
  chainId: number
  appMode: AppMode
  disabled?: boolean
  className?: string
  selectedTokenIndex: number | undefined
  setSelectedTokenIndex: (index: number) => void
  tokenList: TokenList
  nfts: Nft[] | undefined | null
}

export function Erc721CollectionSelector({
  appMode,
  chainType,
  chainId,
  disabled,
  className,
  nfts,
  tokenList,
  selectedTokenIndex,
  setSelectedTokenIndex,
}: Erc721CollectionSelectorProps) {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const filteredTokenList = useMemo(() => {
    if (tokenList?.tokens && tokenList.tokens.length > 0) {
      return tokenList.tokens
        .filter((token: Token) => {
          // Developer note: If the token list includes tokens without bridgeInfo we remove them from the list.
          return token.extensions?.bridgeInfo
        })
        .filter((token: Token) => {
          if (!searchValue) return true
          const tokenName = token.name.toLowerCase()
          const tokenSymbol = token.symbol.toLowerCase()
          const tokenAddress = token.address.toLowerCase()
          const isTokenMatch =
            tokenName.includes(searchValue.toLowerCase()) ||
            tokenSymbol.includes(searchValue.toLowerCase()) ||
            tokenAddress.includes(searchValue.toLowerCase())
          return isTokenMatch
        })
        .map((token) => {
          const nftCount =
            nfts?.reduce((acc, nft) => {
              const tokenAddress =
                chainType === "L1"
                  ? token.address
                  : token.extensions?.bridgeInfo?.[chainId]?.tokenAddress || ""
              if (
                nft.contract.address.toLowerCase() ===
                tokenAddress.toLowerCase()
              ) {
                return acc + 1
              }
              return acc
            }, 0) || 0

          return { ...token, nftCount }
        })
        .sort((a, b) => b.nftCount - a.nftCount)
    } else {
      return [] as Array<Token & { nftCount: number }>
    }
  }, [tokenList.tokens, searchValue, nfts])

  const handleSelect = (index: number) => {
    setSelectedTokenIndex(index)
    setOpen(false)
    setSearchValue("")
  }

  const tokenAddress = useMemo(() => {
    if (!selectedTokenIndex) return

    if (chainType === "L1") {
      return tokenList.tokens[selectedTokenIndex]?.address
    }

    if (chainType === "L2") {
      return tokenList.tokens[selectedTokenIndex]?.extensions?.bridgeInfo?.[
        chainId
      ]?.tokenAddress
    }
  }, [selectedTokenIndex, chainType, tokenList.tokens])

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="lg"
        disabled={disabled || !nfts}
        className={(cn("w-fit rounded-full"), className)}
        onClick={() => (!disabled ? setOpen(true) : undefined)}
      >
        {selectedTokenIndex !== undefined && selectedTokenIndex >= 0 && (
          <div className="flex items-center gap-x-2">
            <ImageIpfs
              alt={`${tokenList.tokens[selectedTokenIndex].name} logo`}
              className="h-12 w-12 rounded-md"
              src={tokenList.tokens[selectedTokenIndex].logoURI}
            />
            <div className="gap-y-2">
              <h3 className="text-left text-lg font-semibold">
                {tokenList.tokens[selectedTokenIndex].name}
              </h3>
              <p className="text-xs text-muted-foreground">{tokenAddress}</p>
            </div>
          </div>
        )}
        {selectedTokenIndex === undefined ||
          (selectedTokenIndex === -1 && (
            <span className="mx-auto text-center text-base font-medium">
              Select NFT Collection
            </span>
          ))}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[550px] overflow-hidden p-0 shadow-lg">
          <Command
            shouldFilter={false}
            className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
          >
            <h2 className="ml-6 mt-4 font-semibold">Select A Collection</h2>
            <CommandInput
              value={searchValue}
              onValueChange={setSearchValue}
              placeholder="Search name or paste address"
            />
            <CommandList className="m-3">
              <CommandEmpty>No tokens found.</CommandEmpty>
              {filteredTokenList &&
                filteredTokenList.length > 0 &&
                filteredTokenList.map((token) => {
                  const brigeInfo = token?.extensions?.bridgeInfo
                  const bridgedChains = brigeInfo
                    ? Object.entries(brigeInfo)
                    : undefined
                  const tokenAddress =
                    chainType === "L1"
                      ? token.address
                      : brigeInfo?.[chainId]?.tokenAddress
                  return (
                    <CommandItem
                      key={token.address}
                      value={tokenAddress}
                      className={cn("flex cursor-pointer gap-x-2.5 py-2")}
                      onSelect={() =>
                        handleSelect(
                          tokenList.tokens.findIndex((t) =>
                            chainType === "L1"
                              ? t.address === token.address
                              : t.extensions?.bridgeInfo?.[chainId]
                                  ?.tokenAddress ===
                                token.extensions?.bridgeInfo?.[chainId]
                                  ?.tokenAddress
                          )
                        )
                      }
                    >
                      <ImageIpfs
                        alt={`${token.name} logo`}
                        className="h-12 w-12 rounded-md"
                        src={token.logoURI}
                      />
                      <div className="flex w-full items-center justify-between pr-3">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {token.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {tokenAddress}
                          </p>
                        </div>
                        {/* Counts the number of NFTs the user owns by collection */}
                        {token.nftCount > 0 && (
                          <div className="text-sm text-muted-foreground">
                            {token.nftCount} NFT{token.nftCount > 1 ? "s" : ""}
                          </div>
                        )}
                        {bridgedChains && bridgedChains.length > 0 && (
                          <div className="flex flex-col items-center gap-y-1.5">
                            <div className="flex gap-x-1">
                              {bridgedChains.map(([chainId]) => (
                                <Image
                                  className="even:-ml-3"
                                  key={chainId}
                                  src={
                                    l2NetworksOptions[appMode][Number(chainId)]
                                      ?.logoUrl || ""
                                  }
                                  width={24}
                                  height={24}
                                  alt="chain logo"
                                />
                              ))}
                            </div>
                            {token.extensions?.verification ? (
                              <p className="text-xs font-semibold">Verified</p>
                            ) : (
                              <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                                Unverified
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </CommandItem>
                  )
                })}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  )
}
