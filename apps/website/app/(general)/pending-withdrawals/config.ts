import { createPublicClient, http } from "viem"
import {
  base,
  baseSepolia,
  mainnet,
  optimism,
  optimismSepolia,
  sepolia,
} from "viem/chains"
import { publicActionsL1, publicActionsL2 } from "viem/op-stack"

// L1 Public Clients

export const mainnetPublicClient = createPublicClient({
  chain: mainnet,
  transport: http(
    "https://eth-mainnet.g.alchemy.com/v2/imurRzka-9M0AUppaAAFZx7QVv3pqMNU"
  ),
}).extend(publicActionsL1())
export const sepoliaPublicClient = createPublicClient({
  chain: sepolia,
  transport: http(
    "https://eth-sepolia.g.alchemy.com/v2/Mu9SzE6925AGVSMdGyRS3X2wQNRXyQME"
  ),
}).extend(publicActionsL1())

// L2 Public Clients

export const optimismPublicClient = createPublicClient({
  chain: optimism,
  transport: http(
    "https://opt-mainnet.g.alchemy.com/v2/AxNqYtzVHrAzXLjZHuNGty2zLYaPMJh7"
  ),
}).extend(publicActionsL2())
export const basePublicClient = createPublicClient({
  chain: base,
  transport: http(
    "https://base-mainnet.g.alchemy.com/v2/q1PUZ7dQsmOFrQIbf4YDwivcEeNAT_vR"
  ),
}).extend(publicActionsL2())
export const optimismSepoliaPublicClient = createPublicClient({
  chain: optimismSepolia,
  transport: http(
    "https://opt-sepolia.g.alchemy.com/v2/XDl5n49_YWGzzrxIeiNGOznM_JNpy4l4"
  ),
}).extend(publicActionsL2())
export const baseSepoliaPublicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(
    "https://base-sepolia.g.alchemy.com/v2/80Rxv3F3Vxcxdik8QVAbxWpmR4BZwStv"
  ),
}).extend(publicActionsL2())

export function getPublicClients({ l2ChainId }: { l2ChainId: number }) {
  switch (l2ChainId) {
    case base.id:
      return {
        publicClientL1: mainnetPublicClient,
        publicClientL2: basePublicClient,
      }
    case optimism.id:
      return {
        publicClientL1: mainnetPublicClient,
        publicClientL2: optimismPublicClient,
      }
    case baseSepolia.id:
      return {
        publicClientL1: sepoliaPublicClient,
        publicClientL2: baseSepoliaPublicClient,
      }
    case optimismSepolia.id:
      return {
        publicClientL1: sepoliaPublicClient,
        publicClientL2: optimismSepoliaPublicClient,
      }
    default:
      throw new Error(`Unsupported L2 chain ID: ${l2ChainId}`)
  }
}
