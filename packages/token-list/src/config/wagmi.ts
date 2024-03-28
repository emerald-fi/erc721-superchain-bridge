import { http, createConfig, Config } from "@wagmi/core";
import {
  mainnet,
  base,
  optimism,
  sepolia,
  baseSepolia,
  optimismSepolia,
} from "@wagmi/core/chains";
import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.MAINNET_RPC_URL) throw new Error("MAINNET_RPC_URL is not set");
if (!process.env.BASE_RPC_URL) throw new Error("BASE_RPC_URL is not set");
if (!process.env.OPTIMISM_RPC_URL)
  throw new Error("OPTIMISM_RPC_URL is not set");

export const l1ChainIds = [mainnet.id] as number[];
export const l1ChainIdsTestnet = [sepolia.id] as number[];

export const l2ChainIds = [base.id, optimism.id] as number[];
export const l2ChainIdsTestnet = [
  baseSepolia.id,
  optimismSepolia.id,
] as number[];

export const config: Config = createConfig({
  chains: [mainnet, base, optimism, sepolia, baseSepolia, optimismSepolia],
  transports: {
    [mainnet.id]: http(process.env.MAINNET_RPC_URL),
    [base.id]: http(process.env.BASE_RPC_URL),
    [optimism.id]: http(process.env.OPTIMISM_RPC_URL),
    [sepolia.id]: http(process.env.SEPOLIA_RPC_URL),
    [baseSepolia.id]: http(process.env.BASE_SEPOLIA_RPC_URL),
    [optimismSepolia.id]: http(process.env.OPTIMISM_SEPOLIA_RPC_URL),
  },
});
