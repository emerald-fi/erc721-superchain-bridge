import { defaultTokenList, testnetTokenList } from "../index.js";
import { expect, test } from "vitest";
import {
  l1ChainIds,
  l1ChainIdsTestnet,
  l2ChainIds,
  l2ChainIdsTestnet,
} from "../config/wagmi.js";

// Production token list

test("Tokens belong to a valid l1 chain", () => {
  // Test if all tokens in the default token list belong to a valid l1 chain
  expect(
    defaultTokenList.tokens.every(({ chainId }) =>
      l1ChainIds.includes(chainId),
    ),
  ).toBe(true);

  // Test if all tokens in the testnet token list belong to a valid l1 chain
  expect(
    testnetTokenList.tokens.every(({ chainId }) =>
      l1ChainIdsTestnet.includes(chainId),
    ),
  ).toBe(true);
});

test("Bridged tokens belong to a valid l2 chain", () => {
  // Test if all bridged tokens in the default token list belong to a valid l2 chain
  expect(
    defaultTokenList.tokens.every((token) =>
      token.extensions?.bridgeInfo
        ? Object.keys(token.extensions.bridgeInfo).every((chainId) =>
            l2ChainIds.includes(Number(chainId)),
          )
        : true,
    ),
  ).toBe(true);

  // Test if all bridged tokens in the testnet token list belong to a valid l2 chain
  expect(
    testnetTokenList.tokens.every((token) =>
      token.extensions?.bridgeInfo
        ? Object.keys(token.extensions.bridgeInfo).every((chainId) =>
            l2ChainIdsTestnet.includes(Number(chainId)),
          )
        : true,
    ),
  ).toBe(true);
});

// Testnet token list

test("Tokens belong to a valid l1 chain", () => {
  // Test if all tokens in the testnet token list belong to a valid l1 chain
  expect(
    testnetTokenList.tokens.every(({ chainId }) =>
      l1ChainIdsTestnet.includes(chainId),
    ),
  ).toBe(true);
});

test("Bridged tokens belong to a valid l2 chain", () => {
  // Test if all bridged tokens in the testnet token list belong to a valid l2 chain
  expect(
    testnetTokenList.tokens.every((token) =>
      token.extensions?.bridgeInfo
        ? Object.keys(token.extensions.bridgeInfo).every((chainId) =>
            l2ChainIdsTestnet.includes(Number(chainId)),
          )
        : true,
    ),
  ).toBe(true);
});
