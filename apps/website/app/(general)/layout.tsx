import { type ReactNode } from "react"

import { Footer } from "@/components/layout/footer"
import { SiteHeader } from "@/components/layout/site-header"

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col bg-neutral-50 dark:bg-neutral-800">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
