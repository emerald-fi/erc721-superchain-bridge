"use client"

import { optimismMintableErc721FactoryAbi } from "@/data/abis"
import { l1NetworkOptions, l2NetworksOptions } from "@/data/networks/options"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useEffect, useState, type HTMLAttributes } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDebounce } from "usehooks-ts"
import {
  checksumAddress,
  decodeEventLog,
  isAddress,
  type Address,
  type BaseError,
} from "viem"
import {
  useAccount,
  useTransactionReceipt,
  useWaitForTransactionReceipt,
} from "wagmi"
import { z } from "zod"

import { ConnectButton } from "@/components/blockchain/connect-button"
import { ContractWriteButton } from "@/components/blockchain/contract-write-button"
import { SwitchNetworkButton } from "@/components/blockchain/switch-network-button"
import { TransactionStatus } from "@/components/blockchain/transaction-status"
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
import { useOtimismMintableERC721ByRemoteTokenQuery } from "@/lib/event-cache/hooks/use-optimism-mintable-erc721-by-remote-token"
import {
  useReadErc721Name,
  useReadErc721Symbol,
  useSimulateOptimismMintableErc721FactoryCreateOptimismMintableErc721,
  useWriteOptimismMintableErc721FactoryCreateOptimismMintableErc721,
} from "@/lib/generated/blockchain"
import { useAppMode } from "@/lib/state/app-mode"
import { cn } from "@/lib/utils"

import { BlockExplorerLink } from "../blockchain/block-explorer-link"
import { LinkComponent } from "../shared/link-component"
import { Card } from "../ui/card"

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
  const watchL2ChainId = form.watch("l2ChainId")

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

  const getOtimismMintableERC721ByRemoteTokenQuery =
    useOtimismMintableERC721ByRemoteTokenQuery({
      chainId: Number(watchL2ChainId),
      remoteToken: isAddress(watchRemoteToken)
        ? checksumAddress(watchRemoteToken)
        : "0x0",
      query: {
        enabled: isAddress(watchRemoteToken) && Boolean(Number(watchL2ChainId)),
      },
    })

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

  const onSubmit: SubmitHandler<FormData> = () => {
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
        {getOtimismMintableERC721ByRemoteTokenQuery.data &&
          getOtimismMintableERC721ByRemoteTokenQuery.data
            ?.optimismMintableERC721s?.items?.length > 0 && (
            <div className="flex flex-col gap-y-2">
              <p className="text-center text-sm font-medium text-red-500">
                The NFT collection has already been synced with{" "}
                {l2NetworksOptions[appMode][currentChainId || 1].name}. If the
                token is not in the Emerald Superchain NFT token list, please
                contact the collection creator to have it added.
              </p>
              <Card className="max-h-[200px] overflow-y-auto break-words p-4">
                {getOtimismMintableERC721ByRemoteTokenQuery.data?.optimismMintableERC721s?.items?.map(
                  (item) => (
                    <BlockExplorerLink
                      key={item.id}
                      address={item.localToken as Address}
                      chainId={item.chainId}
                      className="block py-0.5 text-sm underline-offset-2"
                    >
                      {item.localToken}
                    </BlockExplorerLink>
                  )
                )}
              </Card>
            </div>
          )}
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
      <NFTAddressFromTransactionReceipt
        transactionHash={createOptimismMintableERC721.data}
      />
    </Form>
  )
}

const NFTAddressFromTransactionReceipt = ({
  transactionHash,
}: {
  transactionHash?: Address
}) => {
  const [localToken, setLocalToken] = useState<Address>()

  const result = useTransactionReceipt({
    hash: transactionHash,
  })

  useEffect(() => {
    if (result.data) {
      const log = result.data.logs[0]
      if (!log) return
      const topics = decodeEventLog({
        abi: optimismMintableErc721FactoryAbi,
        data: log.data,
        topics: log.topics,
      })
      if (topics?.args?.localToken) {
        setLocalToken(topics.args.localToken)
      }
    }
  }, [result.data])

  if (!localToken) return null

  return (
    <Card className="mt-4 p-3 text-sm">
      <p className="mb-2">
        <span className="font-bold">Success!</span> The L2 NFT has been
        successfully created.
      </p>
      <div className="mb-2">
        <BlockExplorerLink
          address={localToken}
          className="link font-bold no-underline underline-offset-2 hover:underline"
        >
          {localToken}
        </BlockExplorerLink>
      </div>
      <p className="mb-2">
        Please review the{" "}
        <LinkComponent className="link font-bold" href="/documentation">
          documentation
        </LinkComponent>{" "}
        to learn how a collection can listed/verified in the{" "}
        <LinkComponent
          className="link font-bold"
          href="https://github.com/emerald-fi/erc721-superchain-bridge/blob/main/packages/token-list/src/default-token-list.json"
        >
          Emerald Superchain NFT token list
        </LinkComponent>
        .
      </p>
    </Card>
  )
}
