"use client"

import { HTMLAttributes, useEffect, useMemo } from "react"
import Image from "next/image"
import { l1NetworkOptions, l2NetworksOptions } from "@/data/networks/options"
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
  destinationNetwork: z.string().min(1, "Destination Network is required"),
  overrideDestinationNetwork: z.string().optional(),
  name: z.string().optional(),
  logoURI: z.string().optional(),
})

// Type for form data
type FormData = z.infer<typeof formSchema>

interface FormSelectErc721TokenL1Props extends HTMLAttributes<HTMLFormElement> {
  appMode: AppMode
  onTokenSelected?: (
    data: FormData & {
      remoteToken: string
      name: string
      logoURI: string
    }
  ) => void
}

export function FormSelectErc721TokenL1({
  appMode,
  onTokenSelected,
  className,
  ...props
}: FormSelectErc721TokenL1Props) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })
  const watchLocalToken = form.watch("localToken")
  const watchRemoteToken = form.watch("remoteToken")
  const watchOverrideDestinationNetwork = form.watch(
    "overrideDestinationNetwork"
  )

  const tokenList = useTokenList()
  const contractAddresses = useMemo(() => {
    const tokenListTokens = tokenList.tokens.map(
      (token) => token.address as Address
    )
    if (!watchLocalToken || watchLocalToken === "") return tokenListTokens

    return [watchLocalToken as Address, ...tokenListTokens]
  }, [tokenList, watchLocalToken])

  const { address } = useAccount()
  const { data: nfts } = useNftsForOwner({
    chainId: l1NetworkOptions[appMode].chainId,
    contractAddresses,
    owner: address,
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const selectedToken = tokenList.tokens.find(
      ({ address }) => address.toLowerCase() === data.localToken.toLowerCase()
    )
    const remoteTokenAddress = selectedToken?.extensions?.bridgeInfo?.[
      data?.destinationNetwork
    ]?.tokenAddress as Address

    onTokenSelected?.({
      destinationNetwork: data.destinationNetwork,
      remoteToken: data.remoteToken ?? remoteTokenAddress,
      localToken: data.localToken,
      tokenId: data.tokenId,
      name: data.name ?? selectedToken?.name ?? "",
      logoURI: data.logoURI ?? selectedToken?.logoURI ?? "/logo.svg",
    })
  }

  useEffect(() => {
    form.reset({
      destinationNetwork: undefined,
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
          name="localToken"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Collection</FormLabel>
              <Erc721CollectionSelector
                className="h-fit justify-start px-3 py-4"
                appMode={appMode}
                chainType="L1"
                chainId={l1NetworkOptions[appMode].chainId}
                nfts={nfts}
                tokenList={tokenList}
                selectedToken={field.value as Address}
                setRemoteToken={(remoteToken) =>
                  form.setValue("remoteToken", remoteToken)
                }
                setDestinationNetwork={(network) =>
                  form.setValue("overrideDestinationNetwork", network)
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
                  chainType="L1"
                  l1ContractAddress={watchLocalToken as Address}
                  l2ContractAddress={watchRemoteToken as Address}
                  onSelectTokenId={(tokenId) => field.onChange(tokenId)}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {watchLocalToken && (
          <FormField
            control={form.control}
            name="destinationNetwork"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="destinationNetwork">
                  Destination Network
                </FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select a network" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(l2NetworksOptions[appMode])
                      // Only show network options where the NFT is brigded
                      .filter(({ chainId }) => {
                        if (watchOverrideDestinationNetwork) {
                          return (
                            chainId === Number(watchOverrideDestinationNetwork)
                          )
                        }
                        return (
                          tokenList.tokens.find(
                            ({ address }) =>
                              address.toLowerCase() ===
                              watchLocalToken?.toLowerCase()
                          )?.extensions?.bridgeInfo?.[chainId] !== undefined
                        )
                      })
                      .map(({ chainId, logoUrl, name }) => (
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
                      ))}
                  </SelectContent>
                </Select>
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
