import { emeraldErc721Abi, optimismMintableErc721FactoryAbi } from "@/data/abis"
import { defineConfig } from "@wagmi/cli"
import { react } from "@wagmi/cli/plugins"
import { erc721Abi } from "viem"

export default defineConfig({
  out: "lib/generated/blockchain.ts",
  contracts: [
    {
      name: "erc721",
      abi: erc721Abi,
    },
    {
      name: "emeraldErc721",
      abi: emeraldErc721Abi,
    },
    {
      name: "optimismMintableErc721Factory",
      abi: optimismMintableErc721FactoryAbi,
    },
  ],
  plugins: [react()],
})
