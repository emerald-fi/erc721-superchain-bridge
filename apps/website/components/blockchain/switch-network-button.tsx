import { ButtonHTMLAttributes } from "react"
import { useAccount, useSwitchChain } from "wagmi"

import { Button } from "../ui/button"

interface SwitchNetworkButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  targetChainId: number
  loadingText?: string
  text?: string
}

export const SwitchNetworkButton = ({
  children,
  className,
  targetChainId,
  loadingText = "Switch the network in your wallet",
  ...props
}: SwitchNetworkButtonProps) => {
  const { switchChain, isPending } = useSwitchChain()
  const { chainId: currentChainId } = useAccount()

  return (
    <Button
      className={className}
      onClick={() => switchChain({ chainId: targetChainId })}
      disabled={currentChainId === targetChainId || isPending}
      {...props}
    >
      {isPending ? loadingText : children ?? "Switch Network"}
    </Button>
  )
}
