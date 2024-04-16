"use client"

import { l1NetworkOptions } from "@/data/networks/options"
import { Address, Hex } from "viem"
import { useAccount } from "wagmi"

import {
  BridgedErc721State,
  useBridgedERC721ByOwner,
} from "@/lib/event-cache/hooks/use-bridged-erc721"
import { useAppMode } from "@/lib/state/app-mode"
import { Skeleton } from "@/components/ui/skeleton"
import { ConnectButton } from "@/components/blockchain/connect-button"
import { LinkComponent } from "@/components/shared/link-component"

import { WithdrawalCard } from "./components/withdrawal-card"

export default function WithdrawalPage() {
  const { address } = useAccount()
  const { appMode } = useAppMode()
  const l1ChainId = l1NetworkOptions[appMode].chainId

  const { data, isLoading } = useBridgedERC721ByOwner({
    params: {
      owner: address,
      l1ChainId,
      states: [BridgedErc721State.PendingToL1],
    },
    query: {
      enabled: !!address,
    },
  })

  return (
    <div className="container flex w-full max-w-3xl flex-col items-center px-4 py-20 ">
      <div className="w-full">
        <div className="mb-10 text-xl">
          <h2 className="px-2 pb-8 pt-4 text-center text-4xl font-black sm:pb-10 sm:text-5xl">
            Pending Withdrawals
          </h2>
          <p>
            In order to withdrawal a bridged NFT from the L2 back to Ethereum,
            you need to execute the{" "}
            <LinkComponent
              className="font-medium"
              href="https://docs.optimism.io/stack/protocol/withdrawal-flow"
            >
              Optimism Withdrawal Flow
            </LinkComponent>{" "}
            in three steps:
          </p>
          <ol className="mt-4 flex list-inside list-decimal flex-col gap-y-1 px-2 text-lg">
            <li>
              <span className="font-semibold">
                Withdrawal initiating transaction
              </span>
              , which the user submits on L2.
            </li>
            <li>
              <span className="font-semibold">
                Withdrawal proving transaction
              </span>
              , which the user submits on L1 to prove that the withdrawal is
              legitimate (takes up to 1 hour to be available after the
              withdrawal initiating transaction).
            </li>
            <li>
              <span className="font-semibold">
                Withdrawal finalizing transaction
              </span>
              , which the user submits on L1 after the fault challenge period
              has passed, to actually run the transaction on L1 (takes 1 week to
              be available after the withdrawal proving transaction).
            </li>
          </ol>
        </div>
        <div className="flex flex-col items-center gap-y-4 sm:px-8">
          {!address ? (
            <ConnectButton className="py-8" />
          ) : isLoading ? (
            <>
              {Array.from({ length: 4 }).map((_, idx) => (
                <Skeleton key={idx} className="h-[200px] w-full" />
              ))}
            </>
          ) : data && data?.bridgedErc721s?.items.length === 0 ? (
            <div className="py-10 text-center text-3xl font-semibold">
              No pending withdrawals found.
            </div>
          ) : (
            data?.bridgedErc721s.items.map(
              ({ l2ChainId, txHash, l1Token, tokenId }) => (
                <WithdrawalCard
                  key={txHash}
                  l1ChainId={l1ChainId}
                  l2ChainId={l2ChainId}
                  hash={txHash as Hex}
                  l1Address={l1Token as Address}
                  tokenId={tokenId}
                />
              )
            )
          )}
        </div>
      </div>
    </div>
  )
}
