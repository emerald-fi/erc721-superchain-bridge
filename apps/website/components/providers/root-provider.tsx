"use client"

import "@rainbow-me/rainbowkit/styles.css"

import { type ReactNode } from "react"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"
import { WagmiProvider } from "wagmi"

import { config } from "@/config/wagmi"
import { useIsMounted } from "@/lib/hooks/use-is-mounted"

interface RootProviderProps {
  children: ReactNode
}

export const queryClient = new QueryClient()

export default function RootProvider({ children }: RootProviderProps) {
  const isMounted = useIsMounted()
  return isMounted ? (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  ) : null
}
