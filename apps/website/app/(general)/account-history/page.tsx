"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { l2NetworksOptions } from "@/data/networks/options"

import { useAppMode } from "@/lib/state/app-mode"

export default function BridgedCollectionsPage() {
  const { appMode } = useAppMode()
  const router = useRouter()

  useEffect(() => {
    router.push(
      `/account-history/${Object.values(l2NetworksOptions[appMode])[0].chainId}`
    )
  }, [])

  return null
}
