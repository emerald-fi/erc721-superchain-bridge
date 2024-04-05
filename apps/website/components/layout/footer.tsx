import { HTMLAttributes } from "react"
import Image from "next/image"
import { FaGithub, FaXTwitter } from "react-icons/fa6"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { LinkComponent } from "../shared/link-component"
import { ModeToggle } from "../shared/mode-toggle"

const menuItems = [
  {
    title: "Security",
    href: "/security",
  },
  {
    title: "FAQ",
    href: "/faq",
  },
  {
    title: "User Guide",
    href: "/user-guide",
  },
  {
    title: "Documentation",
    href: "/documentation",
  },
  {
    title: "Create Collection",
    href: "/create",
  },
  {
    title: "Bridged Collections",
    href: "/bridged-collections",
  },
  {
    title: "Testing Tools",
    href: "/mint",
  },
]

export function Footer({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <footer
      className={cn(
        " border-2 bg-neutral-100 bg-gradient-to-t from-neutral-100 to-white py-6 text-primary/80 shadow-xl dark:bg-neutral-800 dark:from-neutral-900 dark:to-neutral-800 sm:px-8",
        className
      )}
      {...props}
    >
      <div className="container">
        <div className="flex items-center justify-between gap-x-1">
          <div className="flex flex-wrap items-center gap-2">
            <LinkComponent href="/">
              <Image
                className="rounded-xl"
                alt="Logo"
                width={42}
                height={42}
                src="/logo.svg"
              />
            </LinkComponent>
            <h3 className="font-bold">{siteConfig.title}</h3>
            <p>{siteConfig.description}</p>
          </div>
          <ModeToggle />
        </div>
        <div className="mt-5 flex flex-col items-center justify-between gap-x-2 gap-y-3 sm:flex-row">
          <LinkComponent
            className="min-w-fit font-bold uppercase sm:order-last"
            href={"/layer-up"}
          >
            ❖ Layer Up
          </LinkComponent>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 sm:justify-start">
            {menuItems.map(({ href, title }) => (
              <LinkComponent id={title} key={href} href={href}>
                {title}
              </LinkComponent>
            ))}
          </div>
        </div>
        <div className="mt-5 flex flex-col items-center justify-between gap-5 sm:flex-row">
          <span className="text-xs">© 2024 District Labs, Inc.</span>
          <div className="flex items-center gap-x-4 transition">
            <LinkComponent href={`${siteConfig.links.github}`}>
              <FaGithub className="h-6 w-6 hover:text-primary" />
            </LinkComponent>
            <LinkComponent href={`${siteConfig.links.twitter}`}>
              <FaXTwitter className="h-6 w-6 hover:text-primary" />
            </LinkComponent>
          </div>
        </div>
      </div>
    </footer>
  )
}
