"use client"

import { useEffect, useMemo, useState, type HTMLAttributes } from "react"
import Image from "next/image"
import { l2Erc721BridgeAbi } from "@/data/abis"
import { l1NetworkOptions, l2NetworksOptions } from "@/data/networks/options"
import { type Address, type BaseError } from "viem"
import {
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi"

import {
  useReadErc721GetApproved,
  useSimulateErc721Approve,
  useWriteErc721Approve,
} from "@/lib/generated/blockchain"
import { useNftsForOwner } from "@/lib/hooks/web3/use-nfts-for-owner"
import { type AppMode } from "@/lib/state/app-mode"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { BlockExplorerLink } from "@/components/blockchain/block-explorer-link"
import { ConnectButton } from "@/components/blockchain/connect-button"
import { ContractWriteButton } from "@/components/blockchain/contract-write-button"
import { ImageIpfs } from "@/components/blockchain/image-ipfs"
import { SwitchNetworkButton } from "@/components/blockchain/switch-network-button"
import { TransactionStatus } from "@/components/blockchain/transaction-status"

import { queryClient } from "../providers/root-provider"

interface FormL2ToL1BridgePropsProps extends HTMLAttributes<HTMLDivElement> {
  localToken: Address
  remoteToken: Address
  tokenId: string
  name: string
  logoURI: string
  appMode: AppMode
  sourceNetwork: string
  l2ERC721BridgeAddress: Address
  onBack?: () => void
}

export function FormL2ToL1Bridge({
  localToken,
  remoteToken,
  tokenId,
  name,
  logoURI,
  sourceNetwork,
  l2ERC721BridgeAddress,
  className,
  appMode,
  onBack,
  ...props
}: FormL2ToL1BridgePropsProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const l1Chain = l1NetworkOptions[appMode]
  const l2Chains = l2NetworksOptions[appMode]

  const { address } = useAccount()
  const { data: nfts } = useNftsForOwner({
    chainId: Number(sourceNetwork),
    owner: address,
    contractAddresses: [localToken],
  })

  const { chainId: currentChainId } = useAccount()

  // ERC721 Approve
  const readErc721GetApproved = useReadErc721GetApproved({
    address: localToken,
    args: [BigInt(tokenId)],
  })
  const simulateErc721Approve = useSimulateErc721Approve({
    address: localToken,
    args: [l2ERC721BridgeAddress, BigInt(tokenId)],
  })
  const writeErc721Approve = useWriteErc721Approve()
  const waitForErc721Approve = useWaitForTransactionReceipt({
    hash: writeErc721Approve.data,
  })

  // L1ERC721Bridge
  const writeErc721Bridge = useWriteContract()
  const waitForErc721Bridge = useWaitForTransactionReceipt({
    hash: writeErc721Bridge.data,
  })
  const simulateErc721Bridge = useSimulateContract({
    abi: l2Erc721BridgeAbi,
    address: l2ERC721BridgeAddress,
    functionName: "bridgeERC721",
    args: [localToken, remoteToken, BigInt(tokenId), 500000, "0x"],
    query: {
      enabled: readErc721GetApproved.data === l2ERC721BridgeAddress,
    },
  })

  const nft = useMemo(() => {
    return nfts?.find(
      (nft) =>
        nft.contract.address.toLowerCase() === localToken.toLowerCase() &&
        nft.tokenId === tokenId
    )
  }, [nfts, localToken, tokenId])

  // Refetch the ERC721 approval status the approval transaction is successful
  useEffect(() => {
    if (waitForErc721Approve.isSuccess) {
      readErc721GetApproved.refetch().catch((error) => console.error(error))
    }
  }, [waitForErc721Approve.isSuccess])

  // Invalidate the Alchemy NFT API cache when the NFT is bridged
  useEffect(() => {
    if (waitForErc721Bridge.isSuccess) {
      queryClient
        .invalidateQueries({
          queryKey: ["nfts-for-owner", Number(sourceNetwork), address],
        })
        .catch((error) => console.error(error))
    }
  }),
    [waitForErc721Bridge.isSuccess]

  return (
    <div className={cn("flex flex-col gap-y-10", className)} {...props}>
      <div className="flex flex-col gap-y-3">
        <Label>Collection</Label>
        <div className="flex items-center gap-x-3 p-2">
          <ImageIpfs
            alt={`${name} logo`}
            className="h-14 w-14 rounded-md"
            src={
              logoURI === undefined || logoURI === "" ? "/logo.svg" : logoURI
            }
          />
          <h3 className="text-left text-xl font-semibold">{name}</h3>
        </div>
      </div>
      <div className="flex flex-col gap-y-3">
        <div className="flex w-full items-center justify-between text-sm">
          <h3 className="font-semibold">
            {l2Chains[Number(sourceNetwork)]?.name + " Address"}
          </h3>
          <BlockExplorerLink
            className="no-underline underline-offset-2 hover:underline"
            chainId={Number(sourceNetwork)}
            address={localToken}
          >
            {localToken}
          </BlockExplorerLink>
        </div>
        <div className="flex w-full items-center justify-between text-sm">
          <h3 className="font-semibold">{l1Chain.name} Address</h3>
          <BlockExplorerLink
            className="no-underline underline-offset-2 hover:underline"
            chainId={l1Chain.chainId}
            address={remoteToken}
          >
            {remoteToken}
          </BlockExplorerLink>
        </div>
      </div>
      {waitForErc721Bridge.isSuccess ? (
        <div className="flex w-full flex-col gap-y-8">
          <div className="text-lg">
            You have successfully started bridging your NFT back to the{" "}
            <span className="font-semibold">{l1Chain.name} L1</span>. In a week,
            you will be able to see it in your wallet.
          </div>
          <Button
            className="w-full"
            onClick={onBack}
            variant="outline"
            type="button"
          >
            Back
          </Button>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-y-3">
            <Label>Item</Label>
            {nft ? (
              <div className="flex items-center gap-x-5 p-2">
                <div className="relative h-[80px] w-[80px]">
                  {imageLoaded ? null : (
                    <Skeleton className="absolute h-[80px] w-[80px] rounded-md" />
                  )}
                  <Image
                    width={80}
                    height={80}
                    className={cn(
                      "absolute rounded-md",
                      !imageLoaded && "invisible"
                    )}
                    alt={`${nft.tokenId} image`}
                    src={nft.imageUrl ?? "/logo.svg"}
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
                <div className="text-3xl font-semibold">#{nft.tokenId}</div>
              </div>
            ) : (
              <Skeleton className="h-16 w-full" />
            )}
          </div>
          <div className="flex flex-col items-center gap-3 sm:flex-row ">
            <Button
              className="w-full sm:w-fit"
              onClick={onBack}
              variant="outline"
              type="button"
            >
              Back
            </Button>
            {!address ? (
              <ConnectButton className="w-full" />
            ) : currentChainId === undefined ||
              currentChainId !== Number(sourceNetwork) ? (
              <SwitchNetworkButton
                className="w-full"
                targetChainId={Number(sourceNetwork)}
              />
            ) : readErc721GetApproved.data === l2ERC721BridgeAddress ||
              waitForErc721Approve.isSuccess ||
              waitForErc721Bridge.isLoading ? (
              <ContractWriteButton
                className="w-full"
                write={!!simulateErc721Bridge.data?.request}
                isLoadingWrite={writeErc721Bridge.isPending}
                isLoadingTx={waitForErc721Bridge.isLoading}
                loadingTxText="Bridging..."
                onClick={() => {
                  writeErc721Bridge.writeContract(
                    simulateErc721Bridge.data!.request
                  )
                }}
              >
                Bridge ERC721 to L1
              </ContractWriteButton>
            ) : (
              <ContractWriteButton
                className="w-full"
                write={!!simulateErc721Approve.data?.request}
                isLoadingWrite={writeErc721Approve.isPending}
                isLoadingTx={waitForErc721Approve.isLoading}
                loadingTxText="Approving..."
                onClick={() => {
                  writeErc721Approve.writeContract(
                    simulateErc721Approve.data!.request
                  )
                }}
              >
                Approve
              </ContractWriteButton>
            )}
          </div>
        </>
      )}
      {waitForErc721Approve.isLoading && (
        <TransactionStatus
          error={simulateErc721Approve.error as BaseError}
          hash={writeErc721Approve.data}
          isError={simulateErc721Approve.isError}
          isLoadingTx={waitForErc721Approve.isLoading}
          isSuccess={waitForErc721Approve.isSuccess}
        />
      )}
      <TransactionStatus
        error={simulateErc721Bridge.error as BaseError}
        hash={writeErc721Bridge.data}
        isError={simulateErc721Bridge.isError}
        isLoadingTx={waitForErc721Bridge.isLoading}
        isSuccess={waitForErc721Bridge.isSuccess}
      />
    </div>
  )
}
