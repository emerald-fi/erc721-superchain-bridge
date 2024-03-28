import { type HTMLAttributes } from "react"
import Image from "next/image"
import { ConnectButton as ConnectButtonRainbowkit } from "@rainbow-me/rainbowkit"

import { truncateEthAddress } from "@/lib/utils"

import { Button } from "../ui/button"

interface ConnectButtonProps extends HTMLAttributes<HTMLDivElement> {
  classNameConnect?: string
  classNameConnected?: string
  classNameWrongNetwork?: string
  labelConnect?: string
  labelWrongNetwork?: string
}

export const ConnectButton = ({
  className,
  labelConnect = "Connect Wallet",
  labelWrongNetwork = "Wrong Network",
  ...props
}: ConnectButtonProps) => {
  return (
    <ConnectButtonRainbowkit.Custom>
      {({
        account,
        chain,
        openChainModal,
        openAccountModal,
        openConnectModal,
        authenticationStatus,
      }) => {
        const connected =
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated")

        return (
          <div className={className} {...props}>
            {(() => {
              if (!connected) {
                return (
                  <Button className="w-full" onClick={openConnectModal}>
                    {labelConnect}
                  </Button>
                )
              }

              if (chain.unsupported) {
                return (
                  <Button
                    className="w-full"
                    variant="destructive"
                    onClick={openChainModal}
                  >
                    {labelWrongNetwork}
                  </Button>
                )
              }

              return (
                <div className="flex w-full items-center gap-x-2">
                  <Button size="icon" onClick={openChainModal}>
                    <Image
                      alt={chain.name ?? "Chain icon"}
                      width={20}
                      height={20}
                      src={chain?.iconUrl as string}
                    />
                  </Button>
                  <Button
                    className="flex gap-x-1 text-sm"
                    onClick={openAccountModal}
                  >
                    <div>
                      {account?.ensName ?? truncateEthAddress(account?.address)}
                    </div>
                  </Button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButtonRainbowkit.Custom>
  )
}
