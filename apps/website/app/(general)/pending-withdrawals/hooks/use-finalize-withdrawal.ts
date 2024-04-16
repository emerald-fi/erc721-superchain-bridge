import { useMutation } from "@tanstack/react-query"
import { WalletClient, type TransactionReceipt } from "viem"
import { getWithdrawals, walletActionsL1 } from "viem/op-stack"

import { getPublicClients } from "../config"

export const useFinalizeWithdrawal = ({
  l2ChainId,
  receipt,
  walletClient,
}: {
  l2ChainId: number
  receipt: TransactionReceipt | undefined
  walletClient: WalletClient | undefined
}) => {
  return useMutation({
    mutationKey: ["finalize-withdrawal", l2ChainId, receipt?.transactionHash],
    mutationFn: async () => {
      if (!receipt || !walletClient) return

      const extendedWalletClient = walletClient.extend(walletActionsL1())

      const [withdrawal] = getWithdrawals(receipt)

      const { publicClientL2 } = getPublicClients({ l2ChainId })

      // @ts-expect-error
      return extendedWalletClient.finalizeWithdrawal({
        targetChain: publicClientL2.chain,
        withdrawal,
      })
    },
  })
}
