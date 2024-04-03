"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { l2NetworksOptions } from "@/data/networks/options"
import { Address, checksumAddress, isAddress } from "viem"

import { useGetOtimismMintableERC721ByLocalTokenQuery } from "@/lib/event-cache/hooks/use-get-optimism-mintable-erc721-by-local-token"
import { useGetOtimismMintableERC721ByRemoteTokenQuery } from "@/lib/event-cache/hooks/use-get-optimism-mintable-erc721-by-remote-token"
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
import { LinkComponent } from "@/components/shared/link-component"

import { Token, TokenList } from "./types"

type ChainType = "L1" | "L2"

interface Erc721CollectionSelectorProps {
  chainType: ChainType
  chainId: number
  appMode: AppMode
  disabled?: boolean
  className?: string
  selectedToken: Address | undefined
  setSelectedToken: (token: Address) => void
  setDestinationNetwork?: (network: string | undefined) => void
  setRemoteToken?: (remoteToken: Address | undefined) => void
  setTokenMetadata?: (metadata: { name?: string; logoURI?: string }) => void
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
  selectedToken,
  setSelectedToken,
  setDestinationNetwork,
  setRemoteToken,
  setTokenMetadata,
}: Erc721CollectionSelectorProps) {
  const [open, setOpen] = useState(false)
  const [selectedUnlistedToken, setSelectedUnlistedToken] = useState<
    Address | undefined
  >()
  const [searchValue, setSearchValue] = useState("")

  const getOtimismMintableERC721ByRemoteTokenQuery =
    useGetOtimismMintableERC721ByRemoteTokenQuery({
      remoteToken: isAddress(selectedUnlistedToken ?? searchValue)
        ? checksumAddress(selectedUnlistedToken ?? (searchValue as Address))
        : "0x0",
      query: {
        enabled:
          Boolean(chainType === "L1") &&
          (isAddress(searchValue) || Boolean(selectedUnlistedToken)),
      },
    })

  const getOtimismMintableERC721ByLocalTokenQuery =
    useGetOtimismMintableERC721ByLocalTokenQuery({
      localToken: isAddress(selectedUnlistedToken ?? searchValue)
        ? checksumAddress(selectedUnlistedToken ?? (searchValue as Address))
        : "0x0",
      query: {
        enabled:
          Boolean(chainType === "L2") &&
          (isAddress(searchValue) || Boolean(selectedUnlistedToken)),
      },
    })

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
  }, [tokenList.tokens, searchValue, nfts, selectedToken])

  const handleSelect = (token: Address) => {
    setSelectedToken(token)
    setOpen(false)
    setSearchValue("")
  }

  const selectedTokenData = useMemo(() => {
    if (chainType === "L1") {
      if (selectedUnlistedToken) {
        const token =
          getOtimismMintableERC721ByRemoteTokenQuery?.data?.optimismMintableERC721s.items.find(
            (item) =>
              item.remoteToken.toLowerCase() === selectedToken?.toLowerCase()
          )
        if (!token) return

        return {
          name: token.remoteName,
          logoURI: "/logo.svg",
          address: token.remoteToken,
        }
      }

      return tokenList.tokens.find(
        (token) => token.address.toLowerCase() === selectedToken?.toLowerCase()
      )
    }
    if (chainType === "L2") {
      if (selectedUnlistedToken) {
        const token =
          getOtimismMintableERC721ByLocalTokenQuery?.data?.optimismMintableERC721s.items.find(
            (item) =>
              item.localToken.toLowerCase() === selectedToken?.toLowerCase()
          )
        if (!token) return

        return {
          name: token.remoteName,
          logoURI: "/logo.svg",
          address: token.remoteToken,
        }
      }

      return tokenList.tokens.find(
        (token) =>
          token.extensions?.bridgeInfo?.[
            chainId
          ]?.tokenAddress?.toLowerCase() === selectedToken?.toLowerCase()
      )
    }
  }, [
    selectedToken,
    chainType,
    tokenList.tokens,
    getOtimismMintableERC721ByRemoteTokenQuery.data,
    getOtimismMintableERC721ByLocalTokenQuery.data,
    selectedUnlistedToken,
  ])

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
        {selectedToken !== undefined && (
          <div className="flex items-center gap-x-2">
            <ImageIpfs
              alt={`${selectedTokenData?.name || ""} logo`}
              className="h-12 w-12 rounded-md"
              src={selectedTokenData?.logoURI ?? "/logo.svg"}
            />
            <div className="gap-y-2">
              <h3 className="text-left text-lg font-semibold">
                {selectedTokenData?.name}
              </h3>
              <p className="text-xs text-muted-foreground">
                {selectedTokenData?.address}
              </p>
            </div>
          </div>
        )}
        {selectedToken === undefined && (
          <span className="mx-auto text-center text-base font-medium">
            Select NFT Collection
          </span>
        )}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[550px] overflow-hidden p-0 pb-4 shadow-lg">
          <Command
            shouldFilter={false}
            className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
          >
            <h2 className="ml-6 mt-4 font-semibold">Select A NFT Collection</h2>
            <CommandInput
              value={searchValue}
              onValueChange={setSearchValue}
              placeholder="Search by collection name or mainnet address"
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
                      onSelect={() => {
                        const tokenAddress = (
                          chainType === "L1"
                            ? token.address
                            : token.extensions?.bridgeInfo?.[chainId]
                                ?.tokenAddress
                        ) as Address
                        handleSelect(tokenAddress)
                        setSelectedUnlistedToken(undefined)
                        setDestinationNetwork?.(undefined)
                        setRemoteToken?.(undefined)
                        setTokenMetadata?.({
                          logoURI: selectedTokenData?.logoURI,
                          name: selectedTokenData?.name ?? undefined,
                        })
                      }}
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
              {chainType === "L1"
                ? getOtimismMintableERC721ByRemoteTokenQuery.data && (
                    <div>
                      {getOtimismMintableERC721ByRemoteTokenQuery.data.optimismMintableERC721s.items.map(
                        (item) => (
                          <CommandItem
                            key={item.remoteToken}
                            value={item.remoteToken}
                            className={cn("flex cursor-pointer gap-x-2.5 py-2")}
                            onSelect={() => {
                              handleSelect(item.remoteToken as Address)
                              setSelectedUnlistedToken(
                                item.remoteToken as Address
                              )
                              setDestinationNetwork?.(item.chainId.toString())
                              setRemoteToken?.(item.localToken as Address)
                              setTokenMetadata?.({
                                logoURI: "/logo.svg",
                                name:
                                  item.localName ??
                                  item.remoteName ??
                                  undefined,
                              })
                            }}
                          >
                            <ImageIpfs
                              alt={`logo`}
                              className="h-12 w-12 rounded-md"
                              src="/logo.svg"
                            />
                            <div className="flex w-full items-center justify-between pr-3">
                              <div>
                                <h3 className="text-lg font-semibold">
                                  {item.remoteName ?? item.localName}
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                  L2: {item.localToken}
                                </p>
                              </div>
                              <div className="flex flex-col items-center gap-y-1.5">
                                <div className="flex gap-x-1">
                                  <Image
                                    className="even:-ml-3"
                                    src={
                                      l2NetworksOptions[appMode][
                                        Number(item.chainId)
                                      ]?.logoUrl || ""
                                    }
                                    width={24}
                                    height={24}
                                    alt="chain logo"
                                  />
                                </div>
                                <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                                  Unlisted
                                </p>
                              </div>
                            </div>
                          </CommandItem>
                        )
                      )}
                    </div>
                  )
                : getOtimismMintableERC721ByLocalTokenQuery.data && (
                    <div>
                      {getOtimismMintableERC721ByLocalTokenQuery.data.optimismMintableERC721s.items.map(
                        (item) => (
                          <CommandItem
                            key={item.remoteToken}
                            value={item.remoteToken}
                            className={cn("flex cursor-pointer gap-x-2.5 py-2")}
                            onSelect={() => {
                              handleSelect(item.localToken as Address)
                              setSelectedUnlistedToken(
                                item.localToken as Address
                              )
                              setRemoteToken?.(item.remoteToken as Address)
                              setTokenMetadata?.({
                                logoURI: "/logo.svg",
                                name:
                                  item.localName ??
                                  item.remoteName ??
                                  undefined,
                              })
                            }}
                          >
                            <ImageIpfs
                              alt={`logo`}
                              className="h-12 w-12 rounded-md"
                              src="/logo.svg"
                            />
                            <div className="flex w-full items-center justify-between pr-3">
                              <div>
                                <h3 className="text-lg font-semibold">
                                  {item.remoteName ?? item.localName}
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                  {item.localToken}
                                </p>
                              </div>
                              <div className="flex flex-col items-center gap-y-1.5">
                                <div className="flex gap-x-1">
                                  <Image
                                    className="even:-ml-3"
                                    src={
                                      l2NetworksOptions[appMode][
                                        Number(item.chainId)
                                      ]?.logoUrl || ""
                                    }
                                    width={24}
                                    height={24}
                                    alt="chain logo"
                                  />
                                </div>
                                <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                                  Unlisted
                                </p>
                              </div>
                            </div>
                          </CommandItem>
                        )
                      )}
                    </div>
                  )}
            </CommandList>
          </Command>
          <hr className="border-t border-neutral-200 dark:border-neutral-700" />
          <p className="mb-5 inline-block text-center text-xs">
            <span className="font-bold">
              Don't see an NFT collection you want to bridge?
            </span>{" "}
            <br /> Try searching using the collection address or{" "}
            <LinkComponent className="link font-bold" href="/documentation">
              learn how to add a new collection
            </LinkComponent>
            .
          </p>
        </DialogContent>
      </Dialog>
    </>
  )
}
