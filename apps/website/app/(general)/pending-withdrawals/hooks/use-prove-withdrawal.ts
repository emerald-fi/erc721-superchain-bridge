import { useMutation } from "@tanstack/react-query"
import { WalletClient, type TransactionReceipt } from "viem"
import { walletActionsL1 } from "viem/op-stack"

import { getPublicClients } from "../config"

export const useProveWithdrawal = ({
  l2ChainId,
  receipt,
  walletClient,
}: {
  l2ChainId: number
  receipt: TransactionReceipt | undefined
  walletClient: WalletClient | undefined
}) => {
  return useMutation({
    mutationKey: ["prove-withdrawal", l2ChainId, receipt?.transactionHash],
    mutationFn: async () => {
      if (!receipt || !walletClient) return

      const { publicClientL1, publicClientL2 } = getPublicClients({ l2ChainId })
      const extendedWalletClient = walletClient.extend(walletActionsL1())
      const { output, withdrawal } = await publicClientL1.waitToProve({
        receipt,
        // @ts-expect-error
        targetChain: publicClientL2.chain,
      })

      const args = await publicClientL2.buildProveWithdrawal({
        output,
        withdrawal,
      })

      // @ts-expect-error
      return extendedWalletClient.proveWithdrawal(args)
    },
  })
}
