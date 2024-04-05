"use client"

import { useAppMode } from "@/lib/state/app-mode"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AppModeSelector() {
  const { appMode, setAppMode } = useAppMode()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-2">
          <div className="flex items-center gap-x-2">
            {appMode === "mainnet" ? (
              <>
                <span className="text-2xl">🚀</span>
                <span className="text-base">Production</span>
              </>
            ) : (
              <>
                <span className="text-2xl">🧪</span>
                <span className="text-base">Testing</span>
              </>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setAppMode("mainnet")}>
          <div className="w-full">Production</div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setAppMode("testnet")}>
          <div className="w-full">Testing</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
