# Based Bridge - Native Superchain ERC721 Bridge

The Based Bridge application allows you to bridge your NFTs from Ethereum to the Superchain - and back again if needed. It uses the Optimism developed smart contracts to bridge the NFTs between the two networks.

- [L1ERC721Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/L1ERC721Bridge.sol)
- [L2ERC721Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L2/L2ERC721Bridge.sol)
- [OptimismMintableERC721](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/universal/OptimismMintableERC721.sol)
- [OptimismMintableERC721Factory](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/universal/OptimismMintableERC721Factory.sol)

Information about the deployment addresses can be found in the Optimism and Base documentation.

- https://docs.optimism.io/chain/addresses
- https://docs.base.org/base-contracts/

No third-party smart contracts are used in the bridging process. The bridge is fully decentralized and trustless using the native message and relayer system of the Superchain rollups.

# Project Structure

The project is structured as a monorepo with the following packages:

- [`apps/website`](/apps/website/) - The application for bridging ERC721 collections.
- [`apps/event-cache`](/apps/event-cache/) - [Ponder](https://ponder.sh/) indexer for ERC721 bridge events.
- [`packages/token-list`](/packages/token-list/) - Token list for verifying NFTs on the bridge.

# Supported Networks
The application currently supports Optimism and Base, but in the future will support other Optimism based rollups.

### Production

- Ethereum (L1)
- Optimism (L2)
- Base (L2)

### Testing

- Sepolia (L1)
- Optimism Sepolia (L2)
- Base Sepolia (L2)

# Verifying a new NFT contract
The native Superchain ERC721 bridge is open and permissionless.

However, the Base Bridge application has a token list that is used to verify new NFT contracts on the bridge. The District Labs, Inc. team is responsible for maintaining the token list and adding new NFT contracts to the list.

To verify a new NFT contract on the bridge, you need to open a pull request adding the NFT contract address from the L1 network and the corresponding bridged contract address on the L2 network to the token list.

The token list is located in the [`packages/token-list`](/packages/token-list/) package.

It's recommended to make a public statement that can be linked to, using an official channel of the NFT project. This link will be added to the token list to verify the authenticity of the NFT contract.

# Important Information

The new Superchain ERC721 smart contract has a few differences from the standard ERC721 contract. 

First, minting authority is controlled by the `L1ERC721Bridge` and `L2ERC721Bridge` contracts. These contracts are the only contract that can mint new tokens on the L2 network.

Second, the `tokenURI` metadata is stored on the L1 network and is accessed by the L2 network using EIP-681.

```solidity
// Creates a base URI in the format specified by EIP-681:
// https://eips.ethereum.org/EIPS/eip-681
baseTokenURI = string(
    abi.encodePacked(
        "ethereum:",
        Strings.toHexString(uint160(_remoteToken), 20),
        "@",
        Strings.toString(_remoteChainId),
        "/tokenURI?uint256="
    )
);
```

The `OptimismMintableERC721` smart contract uses EIP-681 to generate a reference to the mainnet storage object, which contains the original tokens' `tokenURI` metadata.