"use client"

import { useEffect, useState } from "react"
import { l2NetworksOptions } from "@/data/networks/options"
import { type Address } from "viem"

import { useTokenList } from "@/lib/hooks/use-token-list"
import { useAppMode } from "@/lib/state/app-mode"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FormL1ToL2Bridge } from "@/components/forms/form-L1-to-L2-bridge"
import { FormL2ToL1Bridge } from "@/components/forms/form-L2-to-L1-bridge"
import { FormSelectErc721TokenL1 } from "@/components/forms/form-select-erc721-token-l1"
import { FormSelectErc721TokenL2 } from "@/components/forms/form-select-erc721-token-l2"
import { LinkComponent } from "@/components/shared/link-component"

export default function HomePage() {
  const [selectedTokenL1, setSelectedTokenL1] = useState<{
    localToken: string
    tokenId: string
    destinationNetwork: string
  }>()
  const [selectedTokenL2, setSelectedTokenL2] = useState<{
    localToken: string
    tokenId: string
    sourceNetwork: string
  }>()

  const { appMode } = useAppMode()
  const tokenList = useTokenList()

  // If the app mode changes, reset the selected token
  useEffect(() => {
    if (selectedTokenL1 !== undefined) {
      setSelectedTokenL1(undefined)
    }
    if (selectedTokenL2 !== undefined) {
      setSelectedTokenL2(undefined)
    }
  }, [appMode])

  return (
    <div className="container mt-8 flex flex-col items-center justify-center px-5 sm:px-8">
      <h3 className="mb-3 inline-block bg-gradient-to-t from-neutral-800 via-neutral-600 to-neutral-500 bg-clip-text text-center text-6xl font-black uppercase text-transparent dark:from-neutral-300 dark:via-neutral-100 dark:to-neutral-100 sm:text-7xl">
        Layer Up
      </h3>
      <h3 className="text-center text-xl font-normal">
        Bring Your Ethereum NFTs to the Superchain
      </h3>
      <Tabs
        defaultValue="to-superchain"
        className="mb-8 mt-12 w-full sm:w-[600px]"
      >
        <TabsList className="mb-20 w-full flex-wrap gap-2 bg-transparent sm:mb-10 ">
          <TabsTrigger
            className="flex flex-1 items-center justify-center rounded-full py-3 text-lg data-[state=active]:border-2"
            value="to-superchain"
          >
            To Superchain
          </TabsTrigger>
          <TabsTrigger
            className="flex flex-1 items-center justify-center rounded-full py-3 text-lg data-[state=active]:border-2"
            value="to-ethereum"
          >
            To Ethereum
          </TabsTrigger>
        </TabsList>
        <TabsContent
          className="rounded-xl bg-white dark:bg-black"
          value="to-superchain"
        >
          <Card className="p-10 shadow-2xl">
            <FormSelectErc721TokenL1
              appMode={appMode}
              className={cn(selectedTokenL1 !== undefined ? "hidden" : "flex")}
              onTokenSelected={setSelectedTokenL1}
            />
            {selectedTokenL1 !== undefined && (
              <FormL1ToL2Bridge
                appMode={appMode}
                localToken={selectedTokenL1.localToken as Address}
                tokenId={selectedTokenL1.tokenId}
                destinationNetwork={selectedTokenL1?.destinationNetwork}
                remoteToken={
                  tokenList.tokens.find(
                    ({ address }) =>
                      address.toLowerCase() ===
                      selectedTokenL1.localToken.toLowerCase()
                  )?.extensions?.bridgeInfo?.[
                    selectedTokenL1?.destinationNetwork
                  ]?.tokenAddress as Address
                }
                l2ChainId={Number(selectedTokenL1?.destinationNetwork)}
                l1ERC721BridgeAddress={
                  l2NetworksOptions[appMode][
                    Number(selectedTokenL1?.destinationNetwork)
                  ]?.l1ERC721BridgeAddress
                }
                onBack={() => {
                  setSelectedTokenL1(undefined)
                }}
              />
            )}
          </Card>
        </TabsContent>
        <TabsContent
          className="rounded-xl bg-white dark:bg-black"
          value="to-ethereum"
        >
          <Card className="p-10 shadow-2xl">
            <FormSelectErc721TokenL2
              appMode={appMode}
              className={cn(selectedTokenL2 !== undefined ? "hidden" : "flex")}
              onTokenSelected={setSelectedTokenL2}
            />
            {selectedTokenL2 !== undefined && (
              <FormL2ToL1Bridge
                appMode={appMode}
                localToken={selectedTokenL2.localToken as Address}
                tokenId={selectedTokenL2.tokenId}
                sourceNetwork={selectedTokenL2?.sourceNetwork}
                remoteToken={
                  tokenList.tokens.find(
                    (token) =>
                      token?.extensions?.bridgeInfo?.[
                        selectedTokenL2.sourceNetwork
                      ]?.tokenAddress.toLowerCase() ===
                      selectedTokenL2.localToken.toLowerCase()
                  )?.address as Address
                }
                l2ERC721BridgeAddress={
                  l2NetworksOptions[appMode][
                    Number(selectedTokenL2?.sourceNetwork)
                  ]?.l2ERC721BridgeAddress
                }
                onBack={() => {
                  setSelectedTokenL2(undefined)
                }}
              />
            )}
          </Card>
        </TabsContent>
      </Tabs>
      <div className="container mt-20 flex flex-col justify-center">
        <p className="text-center text-sm">
          <span className="font-bold">Have questions?</span> We're here to help.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <LinkComponent
            href="/security"
            className="cursor-pointer rounded-full border-2 bg-white px-5 py-2 text-sm hover:bg-neutral-100 hover:shadow-sm dark:bg-neutral-900 dark:hover:bg-neutral-700"
          >
            Security
          </LinkComponent>
          <LinkComponent
            href="/user-guide"
            className="cursor-pointer rounded-full border-2 bg-white px-5 py-2 text-sm hover:bg-neutral-100 hover:shadow-sm dark:bg-neutral-900 dark:hover:bg-neutral-700"
          >
            User Guide
          </LinkComponent>
          <LinkComponent
            href="/documentation"
            className="cursor-pointer rounded-full border-2 bg-white px-5 py-2  text-sm hover:bg-neutral-100 hover:shadow-sm dark:bg-neutral-900 dark:hover:bg-neutral-700"
          >
            Documentation
          </LinkComponent>
        </div>
      </div>
      <section className="body-font text-gray-600">
  <div className="container mx-auto px-5 py-24">
    <div className="mb-20 text-center">
      <h1 className="mb-4 text-2xl font-medium text-gray-900 sm:text-3xl">Raw Denim Heirloom Man Braid</h1>
      <p className="text-gray-500s mx-auto text-base leading-relaxed lg:w-3/4 xl:w-2/4">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug.</p>
      <div className="mt-6 flex justify-center">
        <div className="inline-flex h-1 w-16 rounded-full bg-blue-500"></div>
      </div>
    </div>
    <div className="-mx-4 -mb-10 -mt-4 flex flex-wrap space-y-6 sm:-m-4 md:space-y-0">
      <div className="flex flex-col items-center p-4 text-center md:w-1/3">
        <div className="mb-5 inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-500">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="h-10 w-10" viewBox="0 0 24 24">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
        </div>
        <div className="grow">
          <h2 className="mb-3 text-lg font-medium text-gray-900">Shooting Stars</h2>
          <p className="text-base leading-relaxed">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard.</p>
          <a className="mt-3 inline-flex items-center text-blue-500">Learn More
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="ml-2 h-4 w-4" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
      <div className="flex flex-col items-center p-4 text-center md:w-1/3">
        <div className="mb-5 inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-500">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="h-10 w-10" viewBox="0 0 24 24">
            <circle cx="6" cy="6" r="3"></circle>
            <circle cx="6" cy="18" r="3"></circle>
            <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
          </svg>
        </div>
        <div className="grow">
          <h2 className="mb-3 text-lg font-medium text-gray-900">The Catalyzer</h2>
          <p className="text-base leading-relaxed">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard.</p>
          <a className="mt-3 inline-flex items-center text-blue-500">Learn More
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="ml-2 h-4 w-4" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
      <div className="flex flex-col items-center p-4 text-center md:w-1/3">
        <div className="mb-5 inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-500">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="h-10 w-10" viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <div className="grow">
          <h2 className="mb-3 text-lg font-medium text-gray-900">Neptune</h2>
          <p className="text-base leading-relaxed">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard.</p>
          <a className="mt-3 inline-flex items-center text-blue-500">Learn More
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="ml-2 h-4 w-4" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
    <button className="mx-auto mt-16 flex rounded border-0 bg-blue-500 px-8 py-2 text-lg text-white hover:bg-blue-600 focus:outline-none">Button</button>
  </div>
</section>
    </div>
  )
}
