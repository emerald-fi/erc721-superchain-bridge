"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { l1NetworkOptions, l2NetworksOptions } from "@/data/networks/options"
import { LuExternalLink } from "react-icons/lu"
import { type Address, type Hex } from "viem"
import { useAccount } from "wagmi"

import {
  BridgedErc721State,
  useBridgedERC721ByOwner,
} from "@/lib/event-cache/hooks/use-bridged-erc721"
import { useTokenList } from "@/lib/hooks/use-token-list"
import { useAppMode } from "@/lib/state/app-mode"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BlockExplorerLink } from "@/components/blockchain/block-explorer-link"
import { ConnectButton } from "@/components/blockchain/connect-button"

export default function BridgedCollectionsByChainIdPage({
  params: { chainId },
}: {
  params: {
    chainId: string
  }
}) {
  const router = useRouter()
  const { appMode } = useAppMode()
  const { address } = useAccount()
  const tokenList = useTokenList()

  const bridgedERC721ByOwnerQuery = useBridgedERC721ByOwner({
    params: {
      owner: address,
      l2chainId: Number(chainId),
      states: [
        BridgedErc721State.L2,
        BridgedErc721State.PendingToL1,
        BridgedErc721State.PendingToL2,
      ],
    },
    query: {
      enabled: !!address,
    },
  })
  const l1Chain = l1NetworkOptions[appMode] || 1
  const l2Chain = l2NetworksOptions[appMode][Number(chainId)] || 10

  useEffect(() => {
    const newChainId = Object.values(l2NetworksOptions[appMode])[0].chainId

    // If AppMode changes, redirect to the first chain in the new mode
    if (!l2NetworksOptions[appMode][Number(chainId)]) {
      router.push(`/account-history/${newChainId}`)
    }
  }, [appMode])

  return (
    <div className="container mt-8 flex w-full max-w-xl flex-col items-center justify-center px-0">
      <h2 className="px-2 pb-8 pt-4 text-center text-4xl font-black sm:pb-14 sm:text-6xl">
        Your Bridged NFTs
      </h2>
      <Tabs value={chainId} className="mb-8 mt-12 w-full sm:w-[600px]">
        <TabsList className="mb-20 w-full flex-wrap gap-2 bg-transparent sm:mb-10">
          {Object.values(l2NetworksOptions[appMode]).map(
            ({ name, chainId: optionChainId }) => (
              <Link
                key={optionChainId}
                href={`/account-history/${optionChainId}`}
                legacyBehavior
                passHref
              >
                <TabsTrigger
                  value={optionChainId.toString()}
                  className="flex flex-1 items-center justify-center rounded-full py-3 text-lg data-[state=active]:border-2"
                >
                  {name}
                </TabsTrigger>
              </Link>
            )
          )}
        </TabsList>
      </Tabs>
      <div className="flex w-full flex-col gap-y-4 px-4 py-10 sm:px-8">
        {!address ? (
          <div className="mt-20">
            <ConnectButton />
          </div>
        ) : bridgedERC721ByOwnerQuery.isLoading ? (
          <>
            {Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton key={idx} className="h-[200px] w-full" />
            ))}
          </>
        ) : !bridgedERC721ByOwnerQuery.data ||
          bridgedERC721ByOwnerQuery.data?.bridgedErc721s.items.length === 0 ? (
          <div className="mt-20 text-center text-2xl font-semibold">
            No bridged NFTs found
          </div>
        ) : (
          bridgedERC721ByOwnerQuery.data?.bridgedErc721s.items
            .sort(
              (a, b) =>
                Object.keys(BridgedErc721State).indexOf(a.state) -
                Object.keys(BridgedErc721State).indexOf(b.state)
            )
            .map((bridgedErc721) => {
              const tokenMetadata = tokenList?.tokens.find(
                (token) => token.address === bridgedErc721.l1Token
              )
              return (
                <Card
                  className="flex w-full flex-col items-center gap-x-0 gap-y-5 p-6 sm:flex-row sm:gap-x-4"
                  key={bridgedErc721.id}
                >
                  <div>
                    <Image
                      alt={`logo`}
                      quality={100}
                      width={120}
                      height={120}
                      className="shrink-0 rounded-md"
                      src={tokenMetadata?.logoURI || "/logo.svg"}
                    />
                  </div>
                  <div className="flex w-full flex-col gap-y-2 px-4">
                    <div>
                      <h3 className="text-left text-2xl font-semibold">
                        {tokenMetadata?.name || "Unknown"}
                      </h3>
                      <h4 className="text-left text-2xl font-semibold">
                        # {bridgedErc721.tokenId}
                      </h4>
                      <h4 className="text-left text-xl font-semibold">
                        Status:{" "}
                        {bridgedErc721.state === BridgedErc721State.L2
                          ? l2NetworksOptions[appMode][bridgedErc721.l2ChainId]
                              ?.name || "L1"
                          : bridgedErc721.state ===
                            BridgedErc721State.PendingToL1
                          ? `Pending bridge to ${
                              l1NetworkOptions[appMode]?.name || "L2"
                            }`
                          : `Pending bridge to ${
                              l2NetworksOptions[appMode][
                                bridgedErc721.l2ChainId
                              ]?.name || "L2"
                            }`}
                      </h4>
                    </div>
                    <div className="flex flex-col gap-y-1">
                      <div>
                        <BlockExplorerLink
                          className="no-underline underline-offset-2 hover:underline"
                          chainId={bridgedErc721.txChainId}
                          tx={bridgedErc721.txHash as Hex}
                        >
                          <div className="flex w-full items-center gap-x-2 text-sm font-bold">
                            <div>Transaction Details</div>
                            <div>
                              {" "}
                              <LuExternalLink className="block" />
                            </div>
                          </div>
                        </BlockExplorerLink>
                      </div>
                      <div className="flex w-full flex-wrap items-center justify-between gap-x-2 text-sm">
                        <div className="font-bold">{l1Chain.name}</div>
                        <BlockExplorerLink
                          className="w-full break-words text-xs text-muted-foreground no-underline underline-offset-2 hover:underline"
                          chainId={l1Chain.chainId}
                          address={bridgedErc721.l1Token as Address}
                        />
                      </div>
                      <div className="flex w-full flex-wrap items-center justify-between gap-x-2 text-sm">
                        <div className="font-bold">{l2Chain?.name}</div>
                        <BlockExplorerLink
                          className="w-full break-words text-xs text-muted-foreground no-underline underline-offset-2 hover:underline"
                          chainId={l2Chain.chainId}
                          address={bridgedErc721.l2Token as Address}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })
        )}
      </div>
    </div>
  )
}
