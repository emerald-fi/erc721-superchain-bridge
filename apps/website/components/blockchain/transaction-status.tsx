import { HTMLAttributes } from "react"
import { BaseError } from "viem"

import { cn } from "@/lib/utils"

import { BlockExplorerLink } from "./block-explorer-link"

interface TransactionStatusProps extends HTMLAttributes<HTMLDivElement> {
  error?: BaseError
  isError: boolean
  isLoadingTx: boolean
  isSuccess: boolean
  hash?: `0x${string}`
}

export const TransactionStatus = ({
  className,
  error,
  isError,
  isLoadingTx,
  isSuccess,
  hash,
  ...props
}: TransactionStatusProps) => {
  if (!isLoadingTx && !isSuccess && !isError) return null

  return (
    <div className={cn("flex flex-col gap-y-2", className)}>
      <div className="flex items-center justify-between" {...props}>
        {(isLoadingTx || isSuccess) && (
          <>
            {isLoadingTx ? "Processing..." : "Success!"}
            <BlockExplorerLink showExplorerName tx={hash} />
          </>
        )}
      </div>
      {isError && !isSuccess && (
        <div className="min-w-fit truncate font-medium text-red-500">
          Error: {error?.shortMessage}
        </div>
      )}
    </div>
  )
}
