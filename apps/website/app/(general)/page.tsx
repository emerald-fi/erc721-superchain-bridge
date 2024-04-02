"use client"

import { useEffect, useState } from "react"
import { l2NetworksOptions } from "@/data/networks/options"
import { LuBadgePlus, LuGanttChart, LuPalette } from "react-icons/lu"
import { type Address } from "viem"

import { useTokenList } from "@/lib/hooks/use-token-list"
import { useAppMode } from "@/lib/state/app-mode"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
    remoteToken: string
    tokenId: string
    name: string
    logoURI: string
    destinationNetwork: string
  }>()
  const [selectedTokenL2, setSelectedTokenL2] = useState<{
    localToken: string
    remoteToken: string
    tokenId: string
    name: string
    logoURI: string
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
    <>
      <section className="py-20 lg:min-h-[780px]">
        <div className="container flex flex-col items-center justify-center px-5 pt-8 sm:px-8 md:pt-16">
          <h3 className="mb-3 inline-block bg-gradient-to-t from-neutral-800 via-neutral-600 to-neutral-500 bg-clip-text text-center text-6xl font-black uppercase text-transparent dark:from-neutral-300 dark:via-neutral-100 dark:to-neutral-100 sm:text-8xl">
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
                  className={cn(
                    selectedTokenL1 !== undefined ? "hidden" : "flex"
                  )}
                  onTokenSelected={setSelectedTokenL1}
                />
                {selectedTokenL1 !== undefined && (
                  <FormL1ToL2Bridge
                    appMode={appMode}
                    localToken={selectedTokenL1.localToken as Address}
                    tokenId={selectedTokenL1.tokenId}
                    remoteToken={selectedTokenL1.remoteToken as Address}
                    name={selectedTokenL1.name}
                    logoURI={selectedTokenL1.logoURI}
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
                  className={cn(
                    selectedTokenL2 !== undefined ? "hidden" : "flex"
                  )}
                  onTokenSelected={setSelectedTokenL2}
                />
                {selectedTokenL2 !== undefined && (
                  <FormL2ToL1Bridge
                    appMode={appMode}
                    localToken={selectedTokenL2.localToken as Address}
                    tokenId={selectedTokenL2.tokenId}
                    sourceNetwork={selectedTokenL2?.sourceNetwork}
                    remoteToken={selectedTokenL2.remoteToken as Address}
                    name={selectedTokenL2.name}
                    logoURI={selectedTokenL2.logoURI}
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
        </div>
        <SectionImportantLinks />
      </section>
      <section className="w-full bg-neutral-100 py-10 dark:bg-neutral-900">
        <div className="container mx-auto px-5 py-24">
          <div className="mb-20 text-center">
            <h4 className="mb-4 text-2xl font-black sm:text-6xl">
              Get A NFT Collection <br /> Listed and Verified
            </h4>
            <p className="mx-auto text-base leading-relaxed lg:w-3/4 xl:w-2/4">
              Based Bridge is both{" "}
              <span className="font-bold">open/permisionless</span> and{" "}
              <span className="font-bold">curated/opinionated.</span> <br />
              Anyone can create a new <span className="font-bold">
                L2 NFT
              </span>{" "}
              and start bridging from an existing{" "}
              <span className="font-bold">L1 NFT</span>.<br />
            </p>
            <div className="my-6 flex justify-center">
              <div className="inline-flex h-1 w-16 rounded-full bg-blue-500"></div>
            </div>
            <p className=" text-xs font-medium text-neutral-600 dark:text-neutral-300">
              However, only verified NFT collections will be listed by default
              in the frontend.
              <br />
              This is to ensure the provenance of the NFTs being bridged is
              clear and transparent.
            </p>
          </div>
          <div className="-mx-4 -mb-10 -mt-4 flex flex-wrap space-y-6 sm:-m-4 md:space-y-0">
            <div className="flex flex-col items-center p-4 text-center md:w-1/3">
              <div className="mb-5 inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-500">
                <LuBadgePlus size={40} />
              </div>
              <div className="grow">
                <h2 className="mb-3 text-lg font-black text-blue-600 dark:text-blue-500">
                  Step 1. Create New L2 NFT
                </h2>
                <p className="text-base leading-relaxed">
                  Before an Ethereum NFT can be bridged to the Superchain, a new
                  L2 NFT must be created, with a direct connection to the
                  original collection address.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center p-4 text-center md:w-1/3">
              <div className="mb-5 inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-500">
                <LuPalette size={40} />
              </div>
              <div className="grow">
                <h2 className="mb-3 text-lg font-black text-blue-600 dark:text-blue-500">
                  Step 2. Verify Provenance
                </h2>
                <p className="text-base leading-relaxed">
                  The bridge is open and permissionless, so it's important to
                  verify the provenance of the collection using a public social
                  channel, before it's given verified status.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center p-4 text-center md:w-1/3">
              <div className="mb-5 inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-500">
                <LuGanttChart size={40} />
              </div>
              <div className="grow">
                <h2 className="mb-3 text-lg font-black text-blue-600 dark:text-blue-500">
                  Step 3. Get Listed
                </h2>
                <p className="text-base leading-relaxed">
                  All of NFT collection addresses must be added to the{" "}
                  <LinkComponent
                    href="https://github.com/emerald-fi/erc721-superchain-bridge/blob/main/packages/token-list/src/default-token-list.json"
                    className="link font-bold"
                  >
                    Emerald Superchain NFT token list
                  </LinkComponent>{" "}
                  before it is automatically displayed in the application
                  frontend.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-x-6">
            <LinkComponent
              href="/create"
              className="link mt-10 inline-block font-bold"
            >
              <Button variant={"blue"}>Create New L2 NFT</Button>
            </LinkComponent>
            <LinkComponent
              href="/documentation"
              className="link mt-10 inline-block font-bold"
            >
              <Button variant={"outline-blue"}>Collection Documentation</Button>
            </LinkComponent>
          </div>
        </div>
      </section>
    </>
  )
}

const SectionImportantLinks = () => {
  return (
    <div className="container mt-20 flex flex-col justify-center">
      <p className="text-center text-sm">
        <span className="font-bold">Have questions?</span>{" "}
        <span className="italic">We're here to help!</span>
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
        <LinkComponent
          href="/security"
          className="cursor-pointer rounded-full border-2 bg-white px-5 py-2 text-sm hover:bg-neutral-100 hover:shadow-sm dark:bg-neutral-900 dark:hover:bg-neutral-700"
        >
          🔐 Security Overview
        </LinkComponent>
        <LinkComponent
          href="https://warpcast.com/~/channel/emerald"
          className="cursor-pointer rounded-full border-2 bg-white px-5 py-2  text-sm hover:bg-neutral-100 hover:shadow-sm dark:bg-neutral-900 dark:hover:bg-neutral-700"
        >
          💠 Farcaster Channel
        </LinkComponent>
        <LinkComponent
          href="/faq"
          className="cursor-pointer rounded-full border-2 bg-white px-5 py-2 text-sm hover:bg-neutral-100 hover:shadow-sm dark:bg-neutral-900 dark:hover:bg-neutral-700"
        >
          🙋‍♂️ Frequently Asked Questions
        </LinkComponent>
      </div>
    </div>
  )
}
