"use client"

import { useEffect, type HTMLAttributes } from "react"
import Image from "next/image"
import { l1NetworkOptions } from "@/data/networks/options"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDebounce } from "usehooks-ts"
import { type Address, type BaseError } from "viem"
import { useAccount, useWaitForTransactionReceipt } from "wagmi"
import { z } from "zod"

import {
  useSimulateEmeraldErc721Mint,
  useWriteEmeraldErc721Mint,
} from "@/lib/generated/blockchain"
import { useAppMode } from "@/lib/state/app-mode"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ConnectButton } from "@/components/blockchain/connect-button"
import { ContractWriteButton } from "@/components/blockchain/contract-write-button"
import { SwitchNetworkButton } from "@/components/blockchain/switch-network-button"
import { TransactionStatus } from "@/components/blockchain/transaction-status"
import { LinkComponent } from "@/components/shared/link-component"

import { queryClient } from "./providers/root-provider"

const EMERALD_ERC721_ADDRESS_SEPOLIA =
  "0xEd7AEda7069fD33D558ecD5D11b281359EfDb40e"

const formSchema = z.object({
  toAddress: z.string().min(1, "To Address is required"),
})

type FormData = z.infer<typeof formSchema>

export const FormMintERC721 = ({
  className,
  ...props
}: HTMLAttributes<HTMLFormElement>) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const { address } = useAccount()
  const { appMode, setAppMode } = useAppMode()
  const l1Chain = l1NetworkOptions[appMode]

  const watchToAddress = useDebounce(form.watch("toAddress"), 500) as
    | Address
    | undefined

  const simulateEmeraldErc721Mint = useSimulateEmeraldErc721Mint({
    address: EMERALD_ERC721_ADDRESS_SEPOLIA,
    args: watchToAddress ? [watchToAddress] : undefined,
    query: {
      enabled: !!watchToAddress,
    },
  })
  const writeEmeraldErc721Mint = useWriteEmeraldErc721Mint()
  const waitForEmeraldErc721Mint = useWaitForTransactionReceipt({
    hash: writeEmeraldErc721Mint.data,
  })

  const { chainId: currentChainId } = useAccount()

  const onSubmit: SubmitHandler<FormData> = (data) => {
    writeEmeraldErc721Mint.writeContract(
      simulateEmeraldErc721Mint.data!.request
    )
  }

  // Invalidate the Alchemy NFT API cache when the NFT is bridged
  useEffect(() => {
    if (waitForEmeraldErc721Mint.isSuccess) {
      queryClient
        .invalidateQueries({
          queryKey: ["nfts-for-owner", l1Chain.chainId, address],
        })
        .catch((error) => console.error(error))
    }
  }),
    [waitForEmeraldErc721Mint.isSuccess]

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex  flex-col gap-y-8", className)}
        {...props}
      >
        <div className="text-center text-xl font-medium">
          Mint Emerald NFT on {l1Chain.name}
        </div>
        <LinkComponent
          className="w-full"
          href="https://testnets.opensea.io/collection/emerald-22"
        >
          <div className="flex w-full items-center gap-x-5">
            <Image
              src="/emerald.svg"
              className="block shrink-0"
              alt="Emerald"
              width={60}
              height={60}
            />
            <div className="flex w-full flex-col gap-y-1 overflow-scroll">
              <p className="text-2xl font-semibold">Emerald</p>
              <p className="overflow-auto text-xs text-muted-foreground">
                {EMERALD_ERC721_ADDRESS_SEPOLIA}
              </p>
            </div>
          </div>
        </LinkComponent>

        <FormField
          key={"toAddress"}
          control={form.control}
          name={"toAddress"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"To address"}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!address ? (
          <ConnectButton className="w-full" />
        ) : appMode !== "testnet" ? (
          <Button
            onClick={() => setAppMode("testnet")}
            type="button"
            className=""
          >
            Switch to Testnet
          </Button>
        ) : currentChainId !== l1Chain.chainId ? (
          <SwitchNetworkButton
            type="button"
            className="w-full"
            targetChainId={l1Chain?.chainId}
          >
            Switch Network
          </SwitchNetworkButton>
        ) : (
          <ContractWriteButton
            type="submit"
            isLoadingTx={waitForEmeraldErc721Mint.isLoading}
            isLoadingWrite={writeEmeraldErc721Mint.isPending}
            write={!!simulateEmeraldErc721Mint.data?.request}
            loadingTxText="Minting..."
          >
            Mint
          </ContractWriteButton>
        )}
        <TransactionStatus
          error={simulateEmeraldErc721Mint.error as BaseError}
          hash={writeEmeraldErc721Mint.data}
          isError={simulateEmeraldErc721Mint.isError}
          isLoadingTx={waitForEmeraldErc721Mint.isLoading}
          isSuccess={waitForEmeraldErc721Mint.isSuccess}
        />
      </form>
    </Form>
  )
}
