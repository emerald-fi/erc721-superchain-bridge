// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Site
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
interface SiteConfig {
  name: string
  title: string
  emoji: string
  description: string
  localeDefault: string
  links: {
    twitter: string
    github: string
  }
}

export const SITE_CANONICAL = "https://turboeth.xyz"

export const siteConfig: SiteConfig = {
  name: "Based Bridge",
  title: "Based Bridge",
  emoji: "🌉",
  description: "Native Superchain ERC721 Bridge",
  localeDefault: "en",
  links: {
    twitter: "https://twitter.com/district_labs",
    github: "https://github.com/emerald-fi/based-bridge",
  },
}
