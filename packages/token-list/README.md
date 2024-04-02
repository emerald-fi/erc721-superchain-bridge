# Embrace Superchain ERC721 Token List

The Emerald Superchain ERC721 Token List is a list of verified NFT contracts on the Superchain network.

## Adding A New ERC71 Token
The token list is display verified Superchain NFT contracts in the [Based Bridge Application](https://bridge.emeraldfi.xyz/).

The District Labs, Inc. team is responsible for maintaining the token list and adding new NFT contracts to the list.

But we welcome anyone to submit new NFT contracts to the list. To add a new token to the list, you need to open a pull request adding the NFT contract address from the L1 network and the corresponding bridged contract address on the L2 network to the token list.

[Superchain NFT Documentation](https://bridge.emeraldfi.xyz/documentation)

To be added to the token list, a public statement that can be linked to, using an official channel of the NFT project is required. This link will be added to the token list to verify the authenticity of the NFT contract.

## Example of a Token List Entry

Below is an example of a complete token list entry.

```json
{
    "chainId": 11155111,
    "address": "0xEd7AEda7069fD33D558ecD5D11b281359EfDb40e",
    "name": "Emerald",
    "symbol": "EMRLD",
    "logoURI": "https://raw.seadn.io/files/e50201ecff78ca6b8613c2bbe4eefb83.svg",
    "extensions": {
        "verification": "https://warpcast.com/kames/0x1a34f541",
        "bridgeInfo": {
            "84532": {
                "tokenAddress": "0x113054f9992ba521D1c4B985b449a4C301291806"
            },
            "11155420": {
                "tokenAddress": "0x79351CBCFDA3B78953f19b268396cFaa80fF2298"
            }
        }
    }
}
```

The `extensions` field contains the verification link and the bridge information for the token.

The `verification` link is the public statement from the NFT project that verifies the authenticity of the NFT contract.

The `bridgeInfo` object contains the chainId and the token address for the L2 network.


## Credit

This NFT token list standard is based on [Uniswap Token List](). The standard includes minor modifications to support NFT contracts and collection verification. 