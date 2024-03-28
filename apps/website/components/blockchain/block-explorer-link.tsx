import { HTMLAttributes } from "react"
import { type Address } from "viem"
import { useAccount } from "wagmi"

import { config } from "@/config/wagmi"
import { cn } from "@/lib/utils"

interface BlockExplorerLinkProps extends HTMLAttributes<HTMLSpanElement> {
  address: Address | undefined
  showExplorerName?: boolean
  chainId?: number
  type?: "address" | "tx"
}

export const BlockExplorerLink = ({
  address,
  children,
  className,
  chainId,
  showExplorerName,
  type = "address",
  ...props
}: BlockExplorerLinkProps) => {
  const { chain } = useAccount()

  const blockExplorer = chainId
    ? config.chains.find((c) => c.id === chainId)?.blockExplorers?.default
    : chain?.blockExplorers?.default
  chain?.blockExplorers?.default

  if (!address) return null

  return (
    <span
      className={cn("overflow-x-auto font-medium underline", className)}
      {...props}
    >
      {blockExplorer && (
        <a
          href={`${blockExplorer.url}/${type}/${address}`}
          rel="noreferrer"
          target="_blank"
        >
          {showExplorerName ? blockExplorer.name : children ?? address}
        </a>
      )}
    </span>
  )
}
