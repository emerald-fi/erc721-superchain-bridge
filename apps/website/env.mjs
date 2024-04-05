import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  client: {
    NEXT_PUBLIC_API_EVENT_CACHE: z.string().url(),
    NEXT_PUBLIC_MAINNET_RPC: z.string().url().optional(),
    NEXT_PUBLIC_BASE_RPC: z.string().url().optional(),
    NEXT_PUBLIC_OPTIMISM_RPC: z.string().url().optional(),
    NEXT_PUBLIC_SEPOLIA_RPC: z.string().url().optional(),
    NEXT_PUBLIC_BASE_SEPOLIA_RPC: z.string().url().optional(),
    NEXT_PUBLIC_OPTIMISM_SEPOLIA_RPC: z.string().url().optional(),
    NEXT_PUBLIC_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_ALCHEMY_API_KEY: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_API_EVENT_CACHE: process.env.NEXT_PUBLIC_API_EVENT_CACHE,
    NEXT_PUBLIC_MAINNET_RPC: process.env.NEXT_PUBLIC_MAINNET_RPC,
    NEXT_PUBLIC_BASE_RPC: process.env.NEXT_PUBLIC_BASE_RPC,
    NEXT_PUBLIC_OPTIMISM_RPC: process.env.NEXT_PUBLIC_OPTIMISM_RPC,
    NEXT_PUBLIC_SEPOLIA_RPC: process.env.NEXT_PUBLIC_SEPOLIA_RPC,
    NEXT_PUBLIC_BASE_SEPOLIA_RPC: process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC,
    NEXT_PUBLIC_OPTIMISM_SEPOLIA_RPC:
      process.env.NEXT_PUBLIC_OPTIMISM_SEPOLIA_RPC,
    NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
    NEXT_PUBLIC_ALCHEMY_API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  },
})
