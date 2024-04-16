import { env } from "@/env.mjs"
import { createPublicClient, http } from "viem"
import {
  base,
  baseSepolia,
  mainnet,
  optimism,
  optimismSepolia,
  sepolia,
} from "viem/chains"
import { publicActionsL1, publicActionsL2 } from "viem/op-stack"

// L1 Public Clients

export const mainnetPublicClient = createPublicClient({
  chain: mainnet,
  transport: http(env.NEXT_PUBLIC_MAINNET_RPC),
}).extend(publicActionsL1())
export const sepoliaPublicClient = createPublicClient({
  chain: sepolia,
  transport: http(env.NEXT_PUBLIC_SEPOLIA_RPC),
}).extend(publicActionsL1())

// L2 Public Clients

export const optimismPublicClient = createPublicClient({
  chain: optimism,
  transport: http(env.NEXT_PUBLIC_OPTIMISM_RPC),
}).extend(publicActionsL2())
export const basePublicClient = createPublicClient({
  chain: base,
  transport: http(env.NEXT_PUBLIC_BASE_RPC),
}).extend(publicActionsL2())
export const optimismSepoliaPublicClient = createPublicClient({
  chain: optimismSepolia,
  transport: http(env.NEXT_PUBLIC_OPTIMISM_SEPOLIA_RPC),
}).extend(publicActionsL2())
export const baseSepoliaPublicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(env.NEXT_PUBLIC_BASE_SEPOLIA_RPC),
}).extend(publicActionsL2())

export function getPublicClients({ l2ChainId }: { l2ChainId: number }) {
  switch (l2ChainId) {
    case base.id:
      return {
        publicClientL1: mainnetPublicClient,
        publicClientL2: basePublicClient,
      }
    case optimism.id:
      return {
        publicClientL1: mainnetPublicClient,
        publicClientL2: optimismPublicClient,
      }
    case baseSepolia.id:
      return {
        publicClientL1: sepoliaPublicClient,
        publicClientL2: baseSepoliaPublicClient,
      }
    case optimismSepolia.id:
      return {
        publicClientL1: sepoliaPublicClient,
        publicClientL2: optimismSepoliaPublicClient,
      }
    default:
      throw new Error(`Unsupported L2 chain ID: ${l2ChainId}`)
  }
}
