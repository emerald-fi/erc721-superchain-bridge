import { createConfig } from "@ponder/core";
import { parseAbiItem } from "abitype";
import { http } from "viem";

import { OptimismMintableERC20Factory } from "./abis/OptimismMintableERC20Factory";
// import { L1ERC721Bridge } from "./abis/L1ERC721Bridge";
// import { L2ERC721Bridge } from "./abis/L2ERC721Bridge";

const OptimismMintableERC20FactoryEvent = parseAbiItem(
  "event OptimismMintableERC721Created(address indexed localToken, address indexed remoteToken, address deployer)",
);

export default createConfig({
  networks: {
    ethereum: {
      chainId: 1,
      transport: http(process.env.PONDER_RPC_URL_1),
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
    OptimismMintableERC20Factory: {
      network: {
        base: {
          address: "0x4200000000000000000000000000000000000017",
          startBlock: Number(process.env.PONDER_OPTIMISM_START_BLOCK) || 0,
          endBlock: 10406249,
        },
        optimism: {
          address: "0x4200000000000000000000000000000000000017",
          startBlock: Number(process.env.PONDER_BASE_START_BLOCK) || 0,
          endBlock: 116002024,
        }
      },
      abi: OptimismMintableERC20Factory,
      filter: {
        event: 'OptimismMintableERC721Created'
      },
    },
  },
});
