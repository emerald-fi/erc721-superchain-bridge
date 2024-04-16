import { useQuery } from "@tanstack/react-query"
import { type TransactionReceipt } from "viem"

import { getPublicClients } from "../config"

export const useWithdrawalStatus = ({
  l2ChainId,
  receipt,
}: {
  l2ChainId: number
  receipt: TransactionReceipt | undefined
}) => {
  return useQuery({
    queryKey: ["withdrawal-status", l2ChainId, receipt?.transactionHash],
    queryFn: () => {
      if (!receipt) return
      const { publicClientL1, publicClientL2 } = getPublicClients({ l2ChainId })
      return publicClientL1.getWithdrawalStatus({
        receipt,
        // @ts-expect-error
        targetChain: publicClientL2.chain,
      })
    },
    enabled: !!receipt,
  })
}
