import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from "wagmi/codegen"

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// emeraldErc721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const emeraldErc721Abi = [
  { stateMutability: "nonpayable", type: "constructor", inputs: [] },
  { type: "error", inputs: [], name: "AccountBalanceOverflow" },
  { type: "error", inputs: [], name: "BalanceQueryForZeroAddress" },
  { type: "error", inputs: [], name: "NotOwnerNorApproved" },
  { type: "error", inputs: [], name: "TokenAlreadyExists" },
  { type: "error", inputs: [], name: "TokenDoesNotExist" },
  { type: "error", inputs: [], name: "TransferFromIncorrectOwner" },
  { type: "error", inputs: [], name: "TransferToNonERC721ReceiverImplementer" },
  { type: "error", inputs: [], name: "TransferToZeroAddress" },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "id", internalType: "uint256", type: "uint256", indexed: true },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "operator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "isApproved",
        internalType: "bool",
        type: "bool",
        indexed: false,
      },
    ],
    name: "ApprovalForAll",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      { name: "id", internalType: "uint256", type: "uint256", indexed: true },
    ],
    name: "Transfer",
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "IMAGE",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "NEXT_TOKEN_ID",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "result", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "id", internalType: "uint256", type: "uint256" }],
    name: "getApproved",
    outputs: [{ name: "result", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "operator", internalType: "address", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ name: "result", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "to", internalType: "address", type: "address" }],
    name: "mint",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "id", internalType: "uint256", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ name: "result", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
      { name: "data", internalType: "bytes", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "operator", internalType: "address", type: "address" },
      { name: "isApproved", internalType: "bool", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "interfaceId", internalType: "bytes4", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ name: "result", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "id", internalType: "uint256", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// erc721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721Abi = [
  {
    type: "event",
    inputs: [
      { name: "owner", type: "address", indexed: true },
      { name: "spender", type: "address", indexed: true },
      { name: "tokenId", type: "uint256", indexed: true },
    ],
    name: "Approval",
  },
  {
    type: "event",
    inputs: [
      { name: "owner", type: "address", indexed: true },
      { name: "operator", type: "address", indexed: true },
      { name: "approved", type: "bool", indexed: false },
    ],
    name: "ApprovalForAll",
  },
  {
    type: "event",
    inputs: [
      { name: "from", type: "address", indexed: true },
      { name: "to", type: "address", indexed: true },
      { name: "tokenId", type: "uint256", indexed: true },
    ],
    name: "Transfer",
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "spender", type: "address" },
      { name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", type: "address" },
      { name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ name: "owner", type: "address" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "id", type: "uint256" },
      { name: "data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "operator", type: "address" },
      { name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", type: "address" },
      { name: "index", type: "uint256" },
    ],
    name: "tokenByIndex",
    outputs: [{ name: "tokenId", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ type: "uint256" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "sender", type: "address" },
      { name: "recipient", type: "address" },
      { name: "tokeId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// optimismMintableErc721Factory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const optimismMintableErc721FactoryAbi = [
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [
      { name: "_bridge", internalType: "address", type: "address" },
      { name: "_remoteChainId", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "localToken",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "remoteToken",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "deployer",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "OptimismMintableERC721Created",
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "BRIDGE",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "REMOTE_CHAIN_ID",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "_remoteToken", internalType: "address", type: "address" },
      { name: "_name", internalType: "string", type: "string" },
      { name: "_symbol", internalType: "string", type: "string" },
    ],
    name: "createOptimismMintableERC721",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "isOptimismMintableERC721",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "version",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link emeraldErc721Abi}__
 */
export const useReadEmeraldErc721 = /*#__PURE__*/ createUseReadContract({
  abi: emeraldErc721Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link emeraldErc721Abi}__ and `functionName` set to `"IMAGE"`
 */
export const useReadEmeraldErc721Image = /*#__PURE__*/ createUseReadContract({
  abi: emeraldErc721Abi,
  functionName: "IMAGE",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link emeraldErc721Abi}__ and `functionName` set to `"NEXT_TOKEN_ID"`
 */
export const useReadEmeraldErc721NextTokenId =
  /*#__PURE__*/ createUseReadContract({
    abi: emeraldErc721Abi,
    functionName: "NEXT_TOKEN_ID",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link emeraldErc721Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadEmeraldErc721BalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: emeraldErc721Abi,
    functionName: "balanceOf",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link emeraldErc721Abi}__ and `functionName` set to `"getApproved"`
 */
export const useReadEmeraldErc721GetApproved =
  /*#__PURE__*/ createUseReadContract({
    abi: emeraldErc721Abi,
    functionName: "getApproved",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link emeraldErc721Abi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadEmeraldErc721IsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: emeraldErc721Abi,
    functionName: "isApprovedForAll",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link emeraldErc721Abi}__ and `functionName` set to `"name"`
 */
export const useReadEmeraldErc721Name = /*#__PURE__*/ createUseReadContract({
  abi: emeraldErc721Abi,
  functionName: "name",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link emeraldErc721Abi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadEmeraldErc721OwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: emeraldErc721Abi,
  functionName: "ownerOf",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link emeraldErc721Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadEmeraldErc721SupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: emeraldErc721Abi,
    functionName: "supportsInterface",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link emeraldErc721Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadEmeraldErc721Symbol = /*#__PURE__*/ createUseReadContract({
  abi: emeraldErc721Abi,
  functionName: "symbol",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link emeraldErc721Abi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadEmeraldErc721TokenUri = /*#__PURE__*/ createUseReadContract(
  { abi: emeraldErc721Abi, functionName: "tokenURI" }
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link emeraldErc721Abi}__
 */
export const useWriteEmeraldErc721 = /*#__PURE__*/ createUseWriteContract({
  abi: emeraldErc721Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link emeraldErc721Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteEmeraldErc721Approve =
  /*#__PURE__*/ createUseWriteContract({
    abi: emeraldErc721Abi,
    functionName: "approve",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link emeraldErc721Abi}__ and `functionName` set to `"mint"`
 */
export const useWriteEmeraldErc721Mint = /*#__PURE__*/ createUseWriteContract({
  abi: emeraldErc721Abi,
  functionName: "mint",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link emeraldErc721Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteEmeraldErc721SafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: emeraldErc721Abi,
    functionName: "safeTransferFrom",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link emeraldErc721Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteEmeraldErc721SetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: emeraldErc721Abi,
    functionName: "setApprovalForAll",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link emeraldErc721Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteEmeraldErc721TransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: emeraldErc721Abi,
    functionName: "transferFrom",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link emeraldErc721Abi}__
 */
export const useSimulateEmeraldErc721 = /*#__PURE__*/ createUseSimulateContract(
  { abi: emeraldErc721Abi }
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link emeraldErc721Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateEmeraldErc721Approve =
  /*#__PURE__*/ createUseSimulateContract({
    abi: emeraldErc721Abi,
    functionName: "approve",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link emeraldErc721Abi}__ and `functionName` set to `"mint"`
 */
export const useSimulateEmeraldErc721Mint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: emeraldErc721Abi,
    functionName: "mint",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link emeraldErc721Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateEmeraldErc721SafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: emeraldErc721Abi,
    functionName: "safeTransferFrom",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link emeraldErc721Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateEmeraldErc721SetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: emeraldErc721Abi,
    functionName: "setApprovalForAll",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link emeraldErc721Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateEmeraldErc721TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: emeraldErc721Abi,
    functionName: "transferFrom",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link emeraldErc721Abi}__
 */
export const useWatchEmeraldErc721Event =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: emeraldErc721Abi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link emeraldErc721Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchEmeraldErc721ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: emeraldErc721Abi,
    eventName: "Approval",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link emeraldErc721Abi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchEmeraldErc721ApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: emeraldErc721Abi,
    eventName: "ApprovalForAll",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link emeraldErc721Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchEmeraldErc721TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: emeraldErc721Abi,
    eventName: "Transfer",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__
 */
export const useReadErc721 = /*#__PURE__*/ createUseReadContract({
  abi: erc721Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc721BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc721Abi,
  functionName: "balanceOf",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"getApproved"`
 */
export const useReadErc721GetApproved = /*#__PURE__*/ createUseReadContract({
  abi: erc721Abi,
  functionName: "getApproved",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadErc721IsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: erc721Abi,
    functionName: "isApprovedForAll",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"name"`
 */
export const useReadErc721Name = /*#__PURE__*/ createUseReadContract({
  abi: erc721Abi,
  functionName: "name",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadErc721OwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: erc721Abi,
  functionName: "ownerOf",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc721Symbol = /*#__PURE__*/ createUseReadContract({
  abi: erc721Abi,
  functionName: "symbol",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"tokenByIndex"`
 */
export const useReadErc721TokenByIndex = /*#__PURE__*/ createUseReadContract({
  abi: erc721Abi,
  functionName: "tokenByIndex",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadErc721TokenUri = /*#__PURE__*/ createUseReadContract({
  abi: erc721Abi,
  functionName: "tokenURI",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc721TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc721Abi,
  functionName: "totalSupply",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721Abi}__
 */
export const useWriteErc721 = /*#__PURE__*/ createUseWriteContract({
  abi: erc721Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc721Approve = /*#__PURE__*/ createUseWriteContract({
  abi: erc721Abi,
  functionName: "approve",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteErc721SafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc721Abi,
    functionName: "safeTransferFrom",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteErc721SetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc721Abi,
    functionName: "setApprovalForAll",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc721TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc721Abi,
  functionName: "transferFrom",
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721Abi}__
 */
export const useSimulateErc721 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc721Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc721Approve = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc721Abi, functionName: "approve" }
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateErc721SafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc721Abi,
    functionName: "safeTransferFrom",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateErc721SetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc721Abi,
    functionName: "setApprovalForAll",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc721TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc721Abi,
    functionName: "transferFrom",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc721Abi}__
 */
export const useWatchErc721Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc721Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc721Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc721ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc721Abi,
    eventName: "Approval",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc721Abi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchErc721ApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc721Abi,
    eventName: "ApprovalForAll",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc721Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc721TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc721Abi,
    eventName: "Transfer",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link optimismMintableErc721FactoryAbi}__
 */
export const useReadOptimismMintableErc721Factory =
  /*#__PURE__*/ createUseReadContract({ abi: optimismMintableErc721FactoryAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link optimismMintableErc721FactoryAbi}__ and `functionName` set to `"BRIDGE"`
 */
export const useReadOptimismMintableErc721FactoryBridge =
  /*#__PURE__*/ createUseReadContract({
    abi: optimismMintableErc721FactoryAbi,
    functionName: "BRIDGE",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link optimismMintableErc721FactoryAbi}__ and `functionName` set to `"REMOTE_CHAIN_ID"`
 */
export const useReadOptimismMintableErc721FactoryRemoteChainId =
  /*#__PURE__*/ createUseReadContract({
    abi: optimismMintableErc721FactoryAbi,
    functionName: "REMOTE_CHAIN_ID",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link optimismMintableErc721FactoryAbi}__ and `functionName` set to `"isOptimismMintableERC721"`
 */
export const useReadOptimismMintableErc721FactoryIsOptimismMintableErc721 =
  /*#__PURE__*/ createUseReadContract({
    abi: optimismMintableErc721FactoryAbi,
    functionName: "isOptimismMintableERC721",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link optimismMintableErc721FactoryAbi}__ and `functionName` set to `"version"`
 */
export const useReadOptimismMintableErc721FactoryVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: optimismMintableErc721FactoryAbi,
    functionName: "version",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link optimismMintableErc721FactoryAbi}__
 */
export const useWriteOptimismMintableErc721Factory =
  /*#__PURE__*/ createUseWriteContract({
    abi: optimismMintableErc721FactoryAbi,
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link optimismMintableErc721FactoryAbi}__ and `functionName` set to `"createOptimismMintableERC721"`
 */
export const useWriteOptimismMintableErc721FactoryCreateOptimismMintableErc721 =
  /*#__PURE__*/ createUseWriteContract({
    abi: optimismMintableErc721FactoryAbi,
    functionName: "createOptimismMintableERC721",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link optimismMintableErc721FactoryAbi}__
 */
export const useSimulateOptimismMintableErc721Factory =
  /*#__PURE__*/ createUseSimulateContract({
    abi: optimismMintableErc721FactoryAbi,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link optimismMintableErc721FactoryAbi}__ and `functionName` set to `"createOptimismMintableERC721"`
 */
export const useSimulateOptimismMintableErc721FactoryCreateOptimismMintableErc721 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: optimismMintableErc721FactoryAbi,
    functionName: "createOptimismMintableERC721",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link optimismMintableErc721FactoryAbi}__
 */
export const useWatchOptimismMintableErc721FactoryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: optimismMintableErc721FactoryAbi,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link optimismMintableErc721FactoryAbi}__ and `eventName` set to `"OptimismMintableERC721Created"`
 */
export const useWatchOptimismMintableErc721FactoryOptimismMintableErc721CreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: optimismMintableErc721FactoryAbi,
    eventName: "OptimismMintableERC721Created",
  })
