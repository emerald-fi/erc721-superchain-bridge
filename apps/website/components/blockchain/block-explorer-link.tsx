import { HTMLAttributes } from "react"
import { Hex, type Address } from "viem"
import { useAccount } from "wagmi"

import { config } from "@/config/wagmi"
import { cn } from "@/lib/utils"

type BlockExplorerLinkProps = HTMLAttributes<HTMLSpanElement> &
  (
    | {
        address: Address | undefined
        tx?: never
        showExplorerName?: boolean
        chainId?: number
      }
    | {
        address?: never
        tx: Hex | undefined
        showExplorerName?: boolean
        chainId?: number
      }
  )

export const BlockExplorerLink = ({
  address,
  tx,
  children,
  className,
  chainId,
  showExplorerName,
  ...props
}: BlockExplorerLinkProps) => {
  const { chain } = useAccount()

  const blockExplorer = chainId
    ? config.chains.find((c) => c.id === chainId)?.blockExplorers?.default
    : chain?.blockExplorers?.default
  chain?.blockExplorers?.default

  if (!address && !tx) return null

  const type = tx ? "tx" : "address"

  return (
    <span
      className={cn("overflow-x-auto font-medium underline", className)}
      {...props}
    >
      {blockExplorer && (
        <a
          href={`${blockExplorer.url}/${type}/${address ?? tx ?? ""}`}
          rel="noreferrer"
          target="_blank"
        >
          {showExplorerName
            ? blockExplorer.name
            : children ?? address ?? tx ?? ""}
        </a>
      )}
    </span>
  )
}
