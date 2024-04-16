"use client"

import { HTMLAttributes, useEffect, useMemo } from "react"
import Image from "next/image"
import { l2NetworksOptions } from "@/data/networks/options"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { type Address } from "viem"
import { useAccount } from "wagmi"
import { z } from "zod"

import { useTokenList } from "@/lib/hooks/use-token-list"
import { useNftsForOwner } from "@/lib/hooks/web3/use-nfts-for-owner"
import { type AppMode } from "@/lib/state/app-mode"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ConnectButton } from "@/components/blockchain/connect-button"
import { Erc721CollectionSelector } from "@/components/blockchain/erc721/erc721-collection-selector"
import { Erc721TokenIdSelector } from "@/components/blockchain/erc721/erc721-token-id-selector"

const formSchema = z.object({
  remoteToken: z.string().optional(),
  localToken: z.string().min(1, "Local Token is required"),
  tokenId: z.string().min(1, "TokenID is required"),
  sourceNetwork: z.string().min(1, "Source Network is required"),
  name: z.string().optional(),
  logoURI: z.string().optional(),
})

// Type for form data
type FormData = z.infer<typeof formSchema>

interface FormSelectErc721TokenL2Props extends HTMLAttributes<HTMLFormElement> {
  appMode: AppMode
  onTokenSelected?: (
    data: FormData & {
      remoteToken: string
      name: string
      logoURI: string
    }
  ) => void
}

export function FormSelectErc721TokenL2({
  appMode,
  onTokenSelected,
  className,
  ...props
}: FormSelectErc721TokenL2Props) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })
  const watchSourceNetwork = form.watch("sourceNetwork")
  const watchLocalToken = form.watch("localToken")
  const watchRemoteToken = form.watch("remoteToken")

  const tokenList = useTokenList()
  // Filter token list to only show tokens that have a token address for the selected network
  const filteredTokenList = useMemo(() => {
    if (!watchSourceNetwork) return tokenList
    return {
      ...tokenList,
      tokens: tokenList.tokens.filter(
        (token) =>
          token?.extensions?.bridgeInfo?.[watchSourceNetwork]?.tokenAddress !==
          undefined
      ),
    }
  }, [tokenList, watchSourceNetwork])

  const contractAddresses = useMemo(() => {
    const contractAddressesList: Address[] = []
    tokenList.tokens.forEach((token) => {
      const tokenAddress =
        token?.extensions?.bridgeInfo?.[watchSourceNetwork]?.tokenAddress
      if (typeof tokenAddress === "string") {
        contractAddressesList.push(tokenAddress as Address)
      }
    })

    if (!watchLocalToken || watchLocalToken === "") return contractAddressesList

    return [watchLocalToken as Address, ...contractAddressesList]
  }, [tokenList, watchSourceNetwork, watchLocalToken])

  const { address } = useAccount()
  const { data: nfts } = useNftsForOwner({
    chainId: watchSourceNetwork ? Number(watchSourceNetwork) : undefined,
    contractAddresses,
    owner: address,
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    onTokenSelected?.({
      localToken: data.localToken,
      tokenId: data.tokenId,
      remoteToken: data.remoteToken ?? "",
      sourceNetwork: data.sourceNetwork,
      name: data.name ?? "",
      logoURI: data.logoURI ?? "/logo.svg",
    })
  }

  useEffect(() => {
    form.reset({
      sourceNetwork: undefined,
      localToken: undefined,
      tokenId: undefined,
    })
  }, [appMode])

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-y-5", className)}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <FormField
          control={form.control}
          name="sourceNetwork"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="sourceNetwork">Source Network</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value.toString())
                  // Reset selected token and token ID when network changes
                  form.resetField("localToken")
                  form.resetField("remoteToken")
                  form.resetField("name")
                  form.resetField("logoURI")
                  form.resetField("tokenId")
                }}
              >
                <FormControl>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select a network" />
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
              <FormMessage />
            </FormItem>
          )}
        />
        {watchSourceNetwork && (
          <FormField
            control={form.control}
            name="localToken"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select NFT Collection</FormLabel>
                <Erc721CollectionSelector
                  appMode={appMode}
                  className="h-fit justify-start px-3 py-2"
                  chainType="L2"
                  chainId={Number(watchSourceNetwork)}
                  nfts={nfts}
                  tokenList={filteredTokenList}
                  selectedToken={field.value as Address}
                  setRemoteToken={(remoteToken) =>
                    form.setValue("remoteToken", remoteToken)
                  }
                  setTokenMetadata={({ logoURI, name }) => {
                    form.setValue("logoURI", logoURI)
                    form.setValue("name", name)
                  }}
                  setSelectedToken={(token) => field.onChange(token)}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {watchLocalToken && (
          <FormField
            control={form.control}
            name="tokenId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Token</FormLabel>
                <Erc721TokenIdSelector
                  className="border-none p-0"
                  nfts={nfts}
                  chainType="L2"
                  l1ContractAddress={watchRemoteToken as Address}
                  l2ContractAddress={watchLocalToken as Address}
                  onSelectTokenId={(tokenId) => field.onChange(tokenId)}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {address ? (
          <Button type="submit">Review Transaction</Button>
        ) : (
          <ConnectButton className="w-full" />
        )}
      </form>
    </Form>
  )
}
