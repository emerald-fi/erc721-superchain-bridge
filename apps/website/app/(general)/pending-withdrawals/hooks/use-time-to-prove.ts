import { useQuery } from "@tanstack/react-query"
import { type TransactionReceipt } from "viem"

import { getPublicClients } from "../config"

export const useTimeToProve = ({
  l2ChainId,
  receipt,
}: {
  l2ChainId: number
  receipt: TransactionReceipt | undefined
}) => {
  return useQuery({
    queryKey: ["time-to-prove", l2ChainId, receipt?.transactionHash],
    queryFn: () => {
      if (!receipt) return
      const { publicClientL1, publicClientL2 } = getPublicClients({ l2ChainId })
      return publicClientL1.getTimeToProve({
        receipt,
        // @ts-expect-error
        targetChain: publicClientL2.chain,
      })
    },
    enabled: !!receipt,
  })
}
