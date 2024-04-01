import { type HTMLAttributes, type ReactNode } from "react"

import { cn } from "@/lib/utils"

interface ContentPageProps extends HTMLAttributes<HTMLDivElement> {
  emoji: ReactNode
  contentTitle: ReactNode
  contentSubtitle: ReactNode
}

export function ContentPage({
  className,
  emoji,
  contentTitle,
  contentSubtitle,
  children,
  ...props
}: ContentPageProps) {
  return (
    <div
      className={cn(
        "container relative mx-auto mt-8 flex h-full w-full max-w-3xl flex-col items-center justify-center gap-y-4 px-8 pb-20 md:gap-y-8 lg:px-0",
        className
      )}
      {...props}
    >
      <h3 className="text-center text-4xl font-black md:text-7xl">{emoji}</h3>
      <h3 className="text-center text-4xl font-black md:text-7xl">
        {contentTitle}
      </h3>
      <h3 className="text-center text-2xl font-normal md:text-3xl">
        {contentSubtitle}
      </h3>
      <div className="content mx-auto w-full max-w-full break-words">
        {children}
      </div>
    </div>
  )
}
