"use client"

import { useMemo } from "react"
import { defaultTokenList, testnetTokenList } from "@emerald/erc721-token-list"

import { useAppMode } from "@/lib/state/app-mode"
import type { TokenList } from "@/components/blockchain/erc721/types"

export function useTokenList(): TokenList {
  const { appMode } = useAppMode()
  return useMemo(() => {
    return appMode === "mainnet" ? defaultTokenList : testnetTokenList
  }, [appMode])
}
