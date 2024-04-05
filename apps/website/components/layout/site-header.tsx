"use client"

import Image from "next/image"

import { ConnectButton } from "@/components/blockchain/connect-button"

import { AppModeSelector } from "../shared/app-mode-selector"
import { LinkComponent } from "../shared/link-component"
import { buttonVariants } from "../ui/button"

export function SiteHeader() {
  return (
    <header
      className={
        "sticky top-0 z-50 flex w-full flex-col items-center justify-between gap-2 border-b border-primary/20 bg-neutral-50 p-4 shadow dark:bg-neutral-800 sm:flex-row sm:px-12"
      }
    >
      <div className="flex items-center gap-x-3 sm:gap-x-5">
        <div className="shrink-0">
          <LinkComponent href="/">
            <Image
              className="rounded-lg"
              alt="Logo"
              width={50}
              height={50}
              src="/logo.svg"
            />
          </LinkComponent>
        </div>
        <AppModeSelector />
      </div>
      <div className="flex items-center gap-x-4">
        <LinkComponent
          href="/account-history"
          className={buttonVariants({ variant: "ghost" })}
        >
          Account History
        </LinkComponent>
        <div className="flex items-center gap-x-2">
          <ConnectButton className="min-w-fit shrink-0" />
        </div>
      </div>
    </header>
  )
}
