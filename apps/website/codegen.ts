import { CodegenConfig } from "@graphql-codegen/cli"
import * as dotenv from "dotenv"

dotenv.config()

if (!process.env.NEXT_PUBLIC_API_EVENT_CACHE)
  throw new Error("NEXT_PUBLIC_API_EVENT_CACHE is not set")

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_API_EVENT_CACHE,
  documents: ["lib/event-cache/hooks/*.tsx"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./lib/event-cache/gql/": {
      preset: "client",
    },
  },
}

export default config
