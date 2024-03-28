import { type Address } from "viem"

import { type AppMode } from "@/lib/state/app-mode"

type NetworkOption = {
  chainId: number
  name: string
  logoUrl: string
}

type L2NetworkOption = NetworkOption & {
  l1ERC721BridgeAddress: Address
  l2ERC721BridgeAddress: Address
}

export const l1NetworkOptions: Record<AppMode, NetworkOption> = {
  mainnet: {
    chainId: 1,
    name: "Ethereum",
    logoUrl: "/networks/ethereum.png",
  },
  testnet: {
    chainId: 11155111,
    name: "Sepolia",
    logoUrl: "/networks/ethereum.png",
  },
}

export const l2NetworksOptions: Record<
  AppMode,
  Record<number, L2NetworkOption>
> = {
  mainnet: {
    10: {
      chainId: 10,
      name: "Optimism",
      logoUrl: "/networks/optimism.png",
      l1ERC721BridgeAddress: "0x5a7749f83b81B301cAb5f48EB8516B986DAef23D",
      l2ERC721BridgeAddress: "0x4200000000000000000000000000000000000014",
    },
    8453: {
      chainId: 8453,
      name: "Base",
      logoUrl: "/networks/base.svg",
      l1ERC721BridgeAddress: "0x608d94945A64503E642E6370Ec598e519a2C1E53",
      l2ERC721BridgeAddress: "0x4200000000000000000000000000000000000014",
    },
  },
  testnet: {
    11155420: {
      chainId: 11155420,
      name: "Optimism Sepolia Testnet",
      logoUrl: "/networks/optimism.png",
      l1ERC721BridgeAddress: "0xd83e03D576d23C9AEab8cC44Fa98d058D2176D1f",
      l2ERC721BridgeAddress: "0x4200000000000000000000000000000000000014",
    },
    84532: {
      chainId: 84532,
      name: "Base Sepolia Testnet",
      logoUrl: "/networks/base.svg",
      l1ERC721BridgeAddress: "0x21eFD066e581FA55Ef105170Cc04d74386a09190",
      l2ERC721BridgeAddress: "0x4200000000000000000000000000000000000014",
    },
  },
}
