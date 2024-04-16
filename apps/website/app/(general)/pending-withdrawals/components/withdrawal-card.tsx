"use client"

import { useEffect, useMemo } from "react"
import Image from "next/image"
import { LuExternalLink } from "react-icons/lu"
import { type Address, type BaseError, type Hex } from "viem"
import {
  useChainId,
  useTransactionReceipt,
  useWaitForTransactionReceipt,
  useWalletClient,
} from "wagmi"

import { useTokenList } from "@/lib/hooks/use-token-list"
import { formatTimestamp } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { BlockExplorerLink } from "@/components/blockchain/block-explorer-link"
import { ContractWriteButton } from "@/components/blockchain/contract-write-button"
import { SwitchNetworkButton } from "@/components/blockchain/switch-network-button"
import { TransactionStatus } from "@/components/blockchain/transaction-status"

import { useFinalizeWithdrawal } from "../hooks/use-finalize-withdrawal"
import { useProveWithdrawal } from "../hooks/use-prove-withdrawal"
import { useTimeToFinalize } from "../hooks/use-time-to-finalize"
import { useTimeToProve } from "../hooks/use-time-to-prove"
import { useWithdrawalStatus } from "../hooks/use-withdrawal-status"

interface WithdrawalCardProps {
  l1ChainId: number
  l2ChainId: number
  l1Address: Address
  tokenId: string
  hash: Hex
}

function getWithdrawalStatusText(status: string) {
  switch (status) {
    case "finalized":
      return "Withdrawal finalized"
    case "waiting-to-prove":
      return "Waiting to prove withdrawal"
    case "waiting-to-finalize":
      return "Waiting to finalize withdrawal"
    case "ready-to-prove":
      return "Ready to prove"
    case "ready-to-finalize":
      return "Ready to finalize"
    default:
      return "Unknown"
  }
}

export function WithdrawalCard({
  l1ChainId,
  l2ChainId,
  l1Address,
  tokenId,
  hash,
}: WithdrawalCardProps) {
  const chainId = useChainId()
  const { data: walletClient } = useWalletClient()
  const tokenList = useTokenList()

  const tokenMetadata = useMemo(
    () =>
      tokenList?.tokens.find(
        (token) => token.address.toLowerCase() === l1Address.toLowerCase()
      ),
    [tokenList, l1Address]
  )

  const {
    data: receipt,
    isLoading: isLoadingReceipt,
    isError: isErrorReceipt,
    error: errorReceipt,
  } = useTransactionReceipt({
    chainId: l2ChainId,
    hash,
  })

  const { data: timeToProve } = useTimeToProve({
    l2ChainId,
    receipt,
  })
  const { data: timeToFinalize } = useTimeToFinalize({
    l2ChainId,
    receipt,
  })
  const {
    data: withdrawalStatus,
    isLoading,
    isError,
    error,
    refetch,
  } = useWithdrawalStatus({
    receipt,
    l2ChainId,
  })
  const {
    mutateAsync: proveWithdrawal,
    isPending: isPendingProve,
    data: proveHash,
  } = useProveWithdrawal({
    l2ChainId,
    receipt,
    walletClient,
  })
  const {
    mutateAsync: finalizeWithdrawal,
    isPending: isPendingFinalize,
    data: finalizeHash,
  } = useFinalizeWithdrawal({
    l2ChainId,
    receipt,
    walletClient: walletClient,
  })

  const {
    isLoading: isLoadingProveTx,
    isSuccess: isSuccessProveTx,
    isError: isErrorProveTx,
    error: errorProveTx,
  } = useWaitForTransactionReceipt({
    hash: proveHash ?? finalizeHash,
  })
  const {
    isLoading: isLoadingFinalizeTx,
    isSuccess: isSuccessFinalizeTx,
    isError: isErrorFinalizeTx,
    error: errorFinalizeTx,
  } = useWaitForTransactionReceipt({
    hash: finalizeHash,
  })

  // Refetch withdrawal status when transaction is successful
  useEffect(() => {
    if (isSuccessProveTx || isSuccessFinalizeTx) {
      refetch().catch(console.error)
    }
  }, [isSuccessProveTx, isSuccessFinalizeTx, refetch])

  return (
    <Card className="w-full">
      <CardContent className="flex w-full flex-col items-center justify-between gap-x-0 gap-y-5 p-6 sm:flex-row sm:gap-x-7">
        <div>
          <Image
            alt={`logo`}
            quality={100}
            width={100}
            height={100}
            className="shrink-0 rounded-md"
            src={tokenMetadata?.logoURI || "/logo.svg"}
          />
        </div>
        <div className="flex w-full flex-col gap-y-2 px-4">
          <div className="flex flex-col gap-y-1">
            <h3 className="overflow-x-auto text-left text-2xl font-semibold">
              {tokenMetadata?.name || "Unknown"} <span>#{tokenId}</span>
            </h3>
            <h4 className="text-left text-2xl font-semibold"></h4>
            <div className="flex items-center gap-x-2 text-left text-xl font-semibold">
              <h4> Status: </h4>
              {withdrawalStatus ? (
                getWithdrawalStatusText(withdrawalStatus)
              ) : (
                <Skeleton className="h-7 w-44" />
              )}
            </div>
          </div>
          <div>
            <BlockExplorerLink
              className="no-underline underline-offset-2 hover:underline"
              chainId={l2ChainId}
              tx={hash}
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
          <div className="mt-3">
            {isLoading || isLoadingReceipt ? (
              <Skeleton className="h-14 w-full" />
            ) : isError || isErrorReceipt ? (
              <div>
                Error:{" "}
                {error
                  ? error.message
                  : errorReceipt
                  ? errorReceipt.message
                  : "Unknown error"}
              </div>
            ) : withdrawalStatus === "waiting-to-prove" ? (
              <div className="text-lg">
                You will be able to execute the withdrawal proving transaction
                at:{" "}
                <span className="font-semibold">
                  {formatTimestamp(timeToProve?.timestamp)}
                </span>
              </div>
            ) : withdrawalStatus === "waiting-to-finalize" ? (
              <div>
                You will be able to execute the withdrawal finalizing
                transaction at:{" "}
                <span className="font-semibold">
                  {formatTimestamp(timeToFinalize?.timestamp)}
                </span>
              </div>
            ) : chainId !== l1ChainId ? (
              <SwitchNetworkButton
                type="button"
                className="w-full"
                targetChainId={l1ChainId}
              >
                Switch Network
              </SwitchNetworkButton>
            ) : (
              <>
                {withdrawalStatus === "ready-to-prove" && (
                  <div className="w-full">
                    <ContractWriteButton
                      className="w-full"
                      isLoadingTx={isLoadingProveTx}
                      isLoadingWrite={isPendingProve}
                      onClick={() => proveWithdrawal()}
                      loadingTxText="Proving Withdrawal..."
                      type="button"
                    >
                      Prove Withdrawal
                    </ContractWriteButton>
                    <TransactionStatus
                      className="mt-5"
                      hash={proveHash}
                      isError={isErrorProveTx}
                      error={errorProveTx as BaseError}
                      isLoadingTx={isLoadingProveTx}
                      isSuccess={isSuccessProveTx}
                    />
                  </div>
                )}
                {withdrawalStatus === "ready-to-finalize" && (
                  <div className="w-full">
                    <ContractWriteButton
                      className="w-full"
                      isLoadingTx={isLoadingFinalizeTx}
                      isLoadingWrite={isPendingFinalize}
                      onClick={() => finalizeWithdrawal()}
                      loadingTxText="Finalizing Withdrawal..."
                      type="button"
                    >
                      Finalize Withdrawal
                    </ContractWriteButton>
                    <TransactionStatus
                      className="mt-5"
                      hash={finalizeHash}
                      isError={isErrorFinalizeTx}
                      error={errorFinalizeTx as BaseError}
                      isLoadingTx={isLoadingFinalizeTx}
                      isSuccess={isSuccessFinalizeTx}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
