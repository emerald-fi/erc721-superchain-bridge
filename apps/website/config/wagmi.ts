import { env } from "@/env.mjs"
import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { http } from "wagmi"
import {
  base,
  baseSepolia,
  mainnet,
  optimism,
  optimismSepolia,
  sepolia,
} from "wagmi/chains"

export const chains = [
  mainnet,
  base,
  optimism,
  sepolia,
  baseSepolia,
  optimismSepolia,
] as const

export const chainIds = chains.map(({ id }) => id)
export const config = getDefaultConfig({
  appName: "Based Bridge",
  projectId: env.NEXT_PUBLIC_PROJECT_ID,
  chains,
  transports: {
    [mainnet.id]: http(env.NEXT_PUBLIC_MAINNET_RPC),
    [base.id]: http(env.NEXT_PUBLIC_BASE_RPC),
    [optimism.id]: http(env.NEXT_PUBLIC_OPTIMISM_RPC),
    [sepolia.id]: http(env.NEXT_PUBLIC_SEPOLIA_RPC),
    [baseSepolia.id]: http(env.NEXT_PUBLIC_BASE_SEPOLIA_RPC),
    [optimismSepolia.id]: http(env.NEXT_PUBLIC_OPTIMISM_SEPOLIA_RPC),
  },
})

export type SupportedChainId = (typeof chains)[number]["id"]
