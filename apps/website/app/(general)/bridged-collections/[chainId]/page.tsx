"use client"

import { useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { l1NetworkOptions, l2NetworksOptions } from "@/data/networks/options"
import { Address } from "viem"

import { useTokenList } from "@/lib/hooks/use-token-list"
import { useAppMode } from "@/lib/state/app-mode"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { BlockExplorerLink } from "@/components/blockchain/block-explorer-link"

export default function BridgedCollectionsByChainIdPage({
  params: { chainId },
}: {
  params: {
    chainId: string
  }
}) {
  const router = useRouter()
  const { appMode } = useAppMode()
  const tokenList = useTokenList()
  const bridgedTokens = useMemo(() => {
    // eslint-disable-next-line
    // @ts-ignore
    return tokenList.tokens?.filter((token) =>
      Object.keys(token?.extensions?.bridgeInfo || {}).includes(chainId)
    )
  }, [chainId, tokenList])

  const l1Chain = l1NetworkOptions[appMode]
  const l2Chain = l2NetworksOptions[appMode][Number(chainId)]

  useEffect(() => {
    const newChainId = Object.values(l2NetworksOptions[appMode])[0].chainId

    // If AppMode changes, redirect to the first chain in the new mode
    if (!l2NetworksOptions[appMode][Number(chainId)]) {
      router.push(`/bridged-collections/${newChainId}`)
    }
  }, [appMode])

  return (
    <div className="container mt-8 flex w-full max-w-2xl flex-col items-center justify-center px-0">
      <NavigationMenu>
        <NavigationMenuList className="flex w-full flex-wrap items-center gap-x-14 gap-y-4">
          {Object.values(l2NetworksOptions[appMode]).map(
            ({ name, chainId: optionChainId }) => (
              <NavigationMenuItem key={optionChainId}>
                <Link
                  href={`/bridged-collections/${optionChainId}`}
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink
                    active={optionChainId === Number(chainId)}
                    className={cn(navigationMenuTriggerStyle(), "text-xl")}
                  >
                    {name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )
          )}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex w-full flex-col gap-y-4 px-8 py-10">
        {bridgedTokens.length === 0 ? (
          <div className="mt-20 text-center text-2xl font-semibold">
            No bridged collections found for this network
          </div>
        ) : (
          // @ts-ignore
          bridgedTokens.map((token) => (
            <Card className="w-full" key={token.address}>
              <div className="flex w-full items-center gap-x-0 p-4 sm:gap-x-4">
                <Image
                  alt={`${token.name} logo`}
                  quality={100}
                  width={65}
                  height={65}
                  className="block shrink-0 rounded-md sm:hidden"
                  src={token.logoURI}
                />
                <Image
                  alt={`${token.name} logo`}
                  quality={100}
                  width={120}
                  height={120}
                  className="hidden shrink-0 rounded-md sm:block"
                  src={token.logoURI}
                />
                <div className="flex w-full flex-col gap-y-3 px-4">
                  <h3 className="text-left text-2xl font-semibold">
                    {token.name}
                  </h3>
                  <div className="flex flex-col gap-y-1">
                    <div className="flex w-full flex-wrap items-center justify-between gap-x-2 pr-10 text-sm">
                      <div className="font-bold">{l1Chain.name}</div>
                      <BlockExplorerLink
                        className="w-full break-words text-xs text-muted-foreground no-underline underline-offset-2 hover:underline"
                        chainId={l1Chain.chainId}
                        address={token.address as Address}
                      />
                    </div>
                    <div className="flex w-full flex-wrap items-center justify-between gap-x-2 pr-10 text-sm">
                      <div className="font-bold">{l2Chain?.name}</div>
                      <BlockExplorerLink
                        className="w-full break-words text-xs text-muted-foreground no-underline underline-offset-2 hover:underline"
                        chainId={Number(chainId)}
                        address={
                          token?.extensions?.bridgeInfo?.[chainId]
                            ?.tokenAddress as Address
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
