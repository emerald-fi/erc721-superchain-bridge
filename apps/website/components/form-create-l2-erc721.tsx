"use client"

import { useEffect, useMemo, type HTMLAttributes } from "react"
import Image from "next/image"
import { l1NetworkOptions, l2NetworksOptions } from "@/data/networks/options"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDebounce } from "usehooks-ts"
import { type Address, type BaseError } from "viem"
import { useAccount, useWaitForTransactionReceipt } from "wagmi"
import { z } from "zod"

import {
  useReadErc721Name,
  useReadErc721Symbol,
  useSimulateOptimismMintableErc721FactoryCreateOptimismMintableErc721,
  useWriteOptimismMintableErc721FactoryCreateOptimismMintableErc721,
} from "@/lib/generated/blockchain"
import { useAppMode } from "@/lib/state/app-mode"
import { cn } from "@/lib/utils"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ConnectButton } from "@/components/blockchain/connect-button"
import { ContractWriteButton } from "@/components/blockchain/contract-write-button"
import { SwitchNetworkButton } from "@/components/blockchain/switch-network-button"
import { TransactionStatus } from "@/components/blockchain/transaction-status"

const formSchema = z.object({
  remoteToken: z.string().min(1, "Remote Token is required"),
  name: z.string().min(1, "Name is required"),
  symbol: z.string().min(1, "Symbol is required"),
  l2ChainId: z.string().min(1, "L2 Chain is required"),
})

type FormData = z.infer<typeof formSchema>

const OPTIMIMS_MINTABLE_ERC721_FACTORY_ADDRESS =
  "0x4200000000000000000000000000000000000017"

export const FormCreateL2ERC721 = ({
  className,
  ...props
}: HTMLAttributes<HTMLFormElement>) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })
  const watchRemoteToken = useDebounce(
    form.watch("remoteToken") as Address,
    500
  )
  const watchName = useDebounce(form.watch("name"), 500)
  const watchSymbol = useDebounce(form.watch("symbol"), 500)
  const watchL2ChainId = useDebounce(form.watch("l2ChainId"), 500)

  const { appMode } = useAppMode()

  const l1Chain = l1NetworkOptions[appMode]
  const l2Chain = l2NetworksOptions[appMode][Number(watchL2ChainId)]

  const formItems: {
    label: string
    name: keyof FormData
    type: string
  }[] = [
    {
      label: `L1 NFT Address ${l1Chain.name}`,
      name: "remoteToken",
      type: "text",
    },
    {
      label: "Name",
      name: "name",
      type: "text",
    },
    {
      label: "Symbol",
      name: "symbol",
      type: "text",
    },
  ]

  const { address, chainId: currentChainId } = useAccount()
  const erc721NameRead = useReadErc721Name({
    chainId: l1Chain.chainId,
    address: watchRemoteToken,
    query: {
      enabled: Boolean(watchRemoteToken),
    },
  })
  const erc721SymbolRead = useReadErc721Symbol({
    chainId: l1Chain.chainId,
    address: watchRemoteToken,
    query: {
      enabled: Boolean(watchRemoteToken),
    },
  })

  const simulateCreateOptimismMintableERC721 =
    useSimulateOptimismMintableErc721FactoryCreateOptimismMintableErc721({
      chainId: Number(watchL2ChainId),
      address: OPTIMIMS_MINTABLE_ERC721_FACTORY_ADDRESS,
      args: [watchRemoteToken, watchName, watchSymbol],
      query: {
        enabled: Boolean(watchRemoteToken),
      },
    })
  const createOptimismMintableERC721 =
    useWriteOptimismMintableErc721FactoryCreateOptimismMintableErc721()
  const { isLoading: isLoadingTx, isSuccess } = useWaitForTransactionReceipt({
    hash: createOptimismMintableERC721.data,
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    createOptimismMintableERC721.writeContract(
      simulateCreateOptimismMintableERC721.data!.request
    )
  }

  useEffect(() => {
    // Reset the form when the app mode changes
    form.reset({
      name: "",
      symbol: "",
      remoteToken: "",
      l2ChainId: "",
    })
  }, [appMode])

  useEffect(() => {
    if (erc721NameRead.data) {
      form.setValue("name", String(erc721NameRead.data))
    }
  }, [erc721NameRead.data])

  useEffect(() => {
    if (erc721SymbolRead.data) {
      form.setValue("symbol", String(erc721SymbolRead.data))
    }
  }, [erc721SymbolRead.data])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-y-4", className)}
        {...props}
      >
        {formItems.map((item) => (
          <FormField
            key={item.name}
            control={form.control}
            name={item.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{item.label}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <FormField
          control={form.control}
          name={"l2ChainId"}
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select the L2 Network" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(l2NetworksOptions[appMode]).map(
                    ({ chainId, logoUrl, name }) => (
                      <SelectItem key={chainId} value={chainId.toString()}>
                        <div className="flex w-full cursor-pointer flex-row items-center gap-x-2.5 py-2">
                          <Image
                            src={logoUrl}
                            width={24}
                            height={24}
                            alt={name}
                          />
                          <div className="text-sm font-medium">{name}</div>
                        </div>
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        {!address ? (
          <ConnectButton className="w-full" />
        ) : l2Chain?.chainId === undefined ||
          currentChainId === l2Chain?.chainId ? (
          <ContractWriteButton
            isLoadingTx={isLoadingTx}
            isLoadingWrite={createOptimismMintableERC721.isPending}
            // Requires that the isMintableErc721Read is false to enable the button to create the L2 ERC721
            write={
              !!simulateCreateOptimismMintableERC721.data?.request &&
              l2Chain?.chainId !== undefined
            }
            loadingTxText="Creating NFT..."
            type="submit"
            className="w-full"
          >
            Create L2 NFT
          </ContractWriteButton>
        ) : (
          <SwitchNetworkButton
            type="button"
            className="w-full"
            targetChainId={l2Chain?.chainId}
          >
            Switch Network
          </SwitchNetworkButton>
        )}
        <TransactionStatus
          className="mt-5"
          error={simulateCreateOptimismMintableERC721.error as BaseError}
          hash={createOptimismMintableERC721.data}
          isError={simulateCreateOptimismMintableERC721.isError}
          isLoadingTx={isLoadingTx}
          isSuccess={isSuccess}
        />
      </form>
    </Form>
  )
}
