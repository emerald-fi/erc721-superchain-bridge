import { useQuery } from "@tanstack/react-query"
import { type TransactionReceipt } from "viem"
import { getWithdrawals } from "viem/op-stack"

import { getPublicClients } from "../config"

export const useTimeToFinalize = ({
  l2ChainId,
  receipt,
}: {
  l2ChainId: number
  receipt: TransactionReceipt | undefined
}) => {
  return useQuery({
    queryKey: ["time-to-finalize", l2ChainId, receipt?.transactionHash],
    queryFn: () => {
      if (!receipt) return
      const { publicClientL1, publicClientL2 } = getPublicClients({ l2ChainId })
      const [message] = getWithdrawals(receipt)

      return publicClientL1.getTimeToFinalize({
        withdrawalHash: message.withdrawalHash,
        // @ts-expect-error
        targetChain: publicClientL2.chain,
      })
    },
    enabled: !!receipt,
  })
}
