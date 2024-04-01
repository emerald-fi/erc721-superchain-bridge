import { createConfig } from "@ponder/core";
import { http } from "viem";
import { OptimismMintableERC721Factory } from "./abis/OptimismMintableERC721Factory";
import { OPTIMISM_MINTABLE_ERC721_FACTORY_ADDRESS } from "./constants";

export default createConfig({
  networks: {
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
      network: {
        // Production
        optimism: {
          address: OPTIMISM_MINTABLE_ERC721_FACTORY_ADDRESS,
          // Block number of the first transaction
          startBlock: 116002023
        },
        base: {
          address: OPTIMISM_MINTABLE_ERC721_FACTORY_ADDRESS,
          // Block number of the first transaction
          startBlock: 2297164
        },
        // // Testnet
        optimismSepolia: {
          address: OPTIMISM_MINTABLE_ERC721_FACTORY_ADDRESS,
          // Block number of the first transaction
          startBlock: 7074623
        },
        baseSepolia: {
          address: OPTIMISM_MINTABLE_ERC721_FACTORY_ADDRESS,
          // Block number of the first transaction
          startBlock: 6932093
        },
      },
      abi: OptimismMintableERC721Factory,
    },
  },
});
