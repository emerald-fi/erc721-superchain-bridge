import { multicall } from "@wagmi/core";
import { erc721Abi, type Address } from "viem";
import { expect, test } from "vitest";
import { optimismMintableErc721FactoryAbi } from "../config/abis/optimism-mintable-erc721-factory-abi.js";
import {
  config,
  l1ChainIdsTestnet,
  l2ChainIds,
  l2ChainIdsTestnet,
} from "../config/wagmi.js";
import { defaultTokenList, testnetTokenList } from "../index.js";

const OptimismMintableERC721FactoryAddress =
  "0x4200000000000000000000000000000000000017";

// Production token list

test("Tokens are valid ERC721s", async () => {

  // Removes ENS addresses from the default token list,
  // since they don't have a name or symbol
  const ENSMainnetAddress = "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85";
  const filteredTokens = defaultTokenList.tokens.filter(
    ({ address }) => address !== ENSMainnetAddress,
  );
  const [names, symbols] = await Promise.all([
    // Fetch the name of all tokens in the default token list
    multicall(config, {
      contracts: filteredTokens.map(({ address }) => ({
        address: address as Address,
        abi: erc721Abi,
        functionName: "name",
      })),
    }),
    // Fetch the symbol of all tokens in the default token list
    multicall(config, {
      contracts: filteredTokens.map(({ address }) => ({
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
