import { createConfig } from "@ponder/core";
import { http } from "viem";
import { L1ERC721BridgeAbi, L2ERC721BridgeAbi, OptimismMintableERC721FactoryAbi } from "./abis";
import { OPTIMISM_L2_ERC721_BRIDGE_ADDRESS, OPTIMISM_MINTABLE_ERC721_FACTORY_ADDRESS } from "./constants";

export default createConfig({
  networks: {
    ethereum: {
      chainId: 1,
      transport: http(process.env.PONDER_RPC_URL_1),
    },
    sepolia: {
      chainId: 11155111,
      transport: http(process.env.PONDER_RPC_URL_11155111),
    },
    optimism: {
      chainId: 10,
      transport: http(process.env.PONDER_RPC_URL_10),
    },
    base: {
      chainId: 8453,
      transport: http(process.env.PONDER_RPC_URL_8453),
    },
    optimismSepolia: {
      chainId: 11155420,
      transport: http(process.env.PONDER_RPC_URL_11155420),
    },
    baseSepolia: {
      chainId: 84532,
      transport: http(process.env.PONDER_RPC_URL_84532),
    },
  },

  contracts: {
    OptimismMintableERC721Factory: {
      abi: OptimismMintableERC721FactoryAbi,
      filter: { event: "OptimismMintableERC721Created" },
      address: OPTIMISM_MINTABLE_ERC721_FACTORY_ADDRESS,
      network: {
        // Production
        optimism: {
          // Block number of the first transaction
          startBlock: 116002023
        },
        base: {
          // Block number of the first transaction
          startBlock: 2297164
        },
        // Testnet
        optimismSepolia: {
          // Block number of the first transaction
          startBlock: 7074623
        },
        baseSepolia: {
          // Block number of the first transaction
          startBlock: 6932093
        },
      },
    },
    L1ERC721Bridge: {
      abi: L1ERC721BridgeAbi,
      filter: { event: ["ERC721BridgeInitiated", "ERC721BridgeFinalized"] },
      network: {
        // Production
        ethereum: {
          address: [
            // Optimism
            "0x5a7749f83b81B301cAb5f48EB8516B986DAef23D",
            // Base
            "0x608d94945A64503E642E6370Ec598e519a2C1E53",
          ],
          // Block number of the first transaction
          startBlock: 15677422,
        },
        sepolia: {
          address: [
            // Optimism Sepolia Testnet
            "0xd83e03D576d23C9AEab8cC44Fa98d058D2176D1f",
            // Base Sepolia Testnet
            "0x21eFD066e581FA55Ef105170Cc04d74386a09190"
          ],
          // Block number of the first transaction
          startBlock: 5126689
        },
      },
    },
    L2ERC721Bridge: {
      abi: L2ERC721BridgeAbi,
      filter: { event: ["ERC721BridgeInitiated", "ERC721BridgeFinalized"] },
      address: OPTIMISM_L2_ERC721_BRIDGE_ADDRESS,
      network: {
        // Production
        optimism: {
          // Block number of the first transaction
          startBlock: 0
        },
        base: {
          // Block number of the first transaction
          startBlock: 0
        },
        // Testnet
        optimismSepolia: {
          // Block number of the first transaction
          startBlock: 0
        },
        baseSepolia: {
          // Block number of the first transaction
          startBlock: 0
        },
      },
    }
  },
});
