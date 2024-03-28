import { expect, test } from "vitest";
import { type Address, erc721Abi } from "viem";
import { multicall } from "@wagmi/core";
import { optimismMintableErc721FactoryAbi } from "../config/abis/optimism-mintable-erc721-factory-abi.js";
import {
  l2ChainIds,
  l2ChainIdsTestnet,
  config,
  l1ChainIdsTestnet,
} from "../config/wagmi.js";
import { testnetTokenList, defaultTokenList } from "../index.js";

const OptimismMintableERC721FactoryAddress =
  "0x4200000000000000000000000000000000000017";

// Production token list

test("Tokens are valid ERC721s", async () => {
  const [names, symbols] = await Promise.all([
    // Fetch the name of all tokens in the default token list
    multicall(config, {
      contracts: defaultTokenList.tokens.map(({ address }) => ({
        address: address as Address,
        abi: erc721Abi,
        functionName: "name",
      })),
    }),
    // Fetch the symbol of all tokens in the default token list
    multicall(config, {
      contracts: defaultTokenList.tokens.map(({ address }) => ({
        address: address as Address,
        abi: erc721Abi,
        functionName: "symbol",
      })),
    }),
  ]);

  // Test if all tokens in the default token list have a valid name and symbol
  expect(
    [...names, ...symbols].every(
      ({ status, result }) =>
        status === "success" && typeof result === "string",
    ),
  ).toBe(true);
});

test("Bridged tokens are Optimism Mintable ERC721", async () => {
  const bridgedTokens = defaultTokenList.tokens
    .filter((token) => token.extensions?.bridgeInfo)
    .flatMap((token) => {
      if (!token.extensions?.bridgeInfo) return [];
      return Object.entries(token?.extensions?.bridgeInfo).map(
        ([chainId, { tokenAddress }]) => ({ chainId, tokenAddress }),
      );
    });

  // Filter the bridged tokens by the L2 chain IDs
  const bridgedTokensByL2ChainId = Object.fromEntries(
    l2ChainIds.map((chainId) => [
      chainId,
      bridgedTokens.filter(({ chainId: tokenChainId }) =>
        tokenChainId.includes(chainId.toString()),
      ),
    ]),
  );

  // Test if all bridged tokens in the default token list are Optimism Mintable ERC721s
  const isOptimismMintableErc721Responses = await Promise.all(
    Object.entries(bridgedTokensByL2ChainId).map(([chainId, tokens]) =>
      multicall(config, {
        chainId: Number(chainId),
        contracts: tokens.map(({ tokenAddress }) => ({
          address: OptimismMintableERC721FactoryAddress,
          abi: optimismMintableErc721FactoryAbi,
          functionName: "isOptimismMintableERC721",
          args: [tokenAddress as Address],
        })),
      }),
    ),
  );

  expect(
    isOptimismMintableErc721Responses.every((response) =>
      response.every(
        ({ status, result }) =>
          status === "success" &&
          typeof result === "boolean" &&
          result === true,
      ),
    ),
  ).toBe(true);
});

// Testnet token list

test("Tokens are valid ERC721s", async () => {
  const [names, symbols] = await Promise.all([
    // Fetch the name of all tokens in the default token list
    multicall(config, {
      chainId: l1ChainIdsTestnet[0],
      contracts: testnetTokenList.tokens.map(({ address }) => ({
        address: address as Address,
        abi: erc721Abi,
        functionName: "name",
      })),
    }),
    // Fetch the symbol of all tokens in the default token list
    multicall(config, {
      chainId: l1ChainIdsTestnet[0],
      contracts: testnetTokenList.tokens.map(({ address }) => ({
        address: address as Address,
        abi: erc721Abi,
        functionName: "symbol",
      })),
    }),
  ]);

  // Test if all tokens in the default token list have a valid name and symbol
  expect(
    [...names, ...symbols].every(
      ({ status, result }) =>
        status === "success" && typeof result === "string",
    ),
  ).toBe(true);
});

test("Bridged tokens are Optimism Mintable ERC721", async () => {
  const bridgedTokens = testnetTokenList.tokens
    .filter((token) => token.extensions?.bridgeInfo)
    .flatMap((token) => {
      if (!token.extensions?.bridgeInfo) return [];
      return Object.entries(token?.extensions?.bridgeInfo).map(
        ([chainId, { tokenAddress }]) => ({ chainId, tokenAddress }),
      );
    });

  // Filter the bridged tokens by the L2 chain IDs
  const bridgedTokensByL2ChainId = Object.fromEntries(
    l2ChainIdsTestnet.map((chainId) => [
      chainId,
      bridgedTokens.filter(({ chainId: tokenChainId }) =>
        tokenChainId.includes(chainId.toString()),
      ),
    ]),
  );

  // Test if all bridged tokens in the default token list are Optimism Mintable ERC721s
  const isOptimismMintableErc721Responses = await Promise.all(
    Object.entries(bridgedTokensByL2ChainId).map(([chainId, tokens]) =>
      multicall(config, {
        chainId: Number(chainId),
        contracts: tokens.map(({ tokenAddress }) => ({
          address: OptimismMintableERC721FactoryAddress,
          abi: optimismMintableErc721FactoryAbi,
          functionName: "isOptimismMintableERC721",
          args: [tokenAddress as Address],
        })),
      }),
    ),
  );

  expect(
    isOptimismMintableErc721Responses.every((response) =>
      response.every(
        ({ status, result }) =>
          status === "success" &&
          typeof result === "boolean" &&
          result === true,
      ),
    ),
  ).toBe(true);
});
