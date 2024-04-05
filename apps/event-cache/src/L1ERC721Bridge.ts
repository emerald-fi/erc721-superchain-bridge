import { ponder } from "@/generated";
import { base, baseSepolia, optimism, optimismSepolia } from "viem/chains";

function getL2ChainId(l1ContractAddress: string | null) {
  if (!l1ContractAddress) {
    throw new Error("Invalid l1 contract Address")
  }
  const l1ContractToChainId: Record<string, number> = {
    "0x5a7749f83b81B301cAb5f48EB8516B986DAef23D": optimism.id,
    "0x608d94945A64503E642E6370Ec598e519a2C1E53": base.id,
    "0xd83e03D576d23C9AEab8cC44Fa98d058D2176D1f": optimismSepolia.id,
    "0x21eFD066e581FA55Ef105170Cc04d74386a09190": baseSepolia.id

  }
  const l2ChainId = l1ContractToChainId?.[l1ContractAddress]
  if (!l2ChainId) {
    throw new Error("Invalid l1 contract Address: " + l1ContractAddress)
  }
  return l2ChainId
}


ponder.on("L1ERC721Bridge:ERC721BridgeInitiated", async ({ event, context }) => {
  const { BridgedErc721 } = context.db;
  const timestamp = event.block.timestamp
  const chainId = context.network.chainId
  const { localToken: l1Token, remoteToken: l2Token, tokenId, to } = event.args
  const l1ContractAddress = event.log.address
  const l1ChainId = chainId
  const l2ChainId = getL2ChainId(l1ContractAddress)
  const id = `${l1ChainId}:${l1Token}:${tokenId}`

  const existingBridgedToken = await BridgedErc721.findUnique({
    id,
  });

  // Only update the token if it is the most recent event
  if (!existingBridgedToken || timestamp > existingBridgedToken.timestamp) {
    await BridgedErc721.upsert({
      id,
      create: {
        state: "PENDING_TO_L2",
        l1ChainId,
        owner: to,
        l1Token,
        timestamp,
        l2Token,
        tokenId: tokenId.toString(),
        l2ChainId,
        txHash: event.log.transactionHash,
        txChainId: chainId
      },
      update: {
        state: "PENDING_TO_L2",
        txHash: event.log.transactionHash,
        txChainId: chainId
      }
    });
  }


});

ponder.on("L1ERC721Bridge:ERC721BridgeFinalized", async ({ event, context }) => {
  const { BridgedErc721 } = context.db;
  const timestamp = event.block.timestamp
  const chainId = context.network.chainId
  const l1ContractAddress = event.log.address
  const { localToken: l1Token, remoteToken: l2Token, tokenId, to } = event.args
  const l1ChainId = chainId
  const l2ChainId = getL2ChainId(l1ContractAddress)
  const id = `${l1ChainId}:${l1Token}:${tokenId}`

  const existingBridgedToken = await BridgedErc721.findUnique({
    id,
  });

  // Only update the token if it is the most recent event
  if (!existingBridgedToken || timestamp > existingBridgedToken.timestamp) {
    await BridgedErc721.upsert({
      id,
      create: {
        state: "L1",
        l1ChainId,
        owner: to,
        l1Token,
        timestamp,
        l2Token,
        tokenId: tokenId.toString(),
        l2ChainId,
        txHash: event.log.transactionHash,
        txChainId: chainId
      },
      update: {
        state: "L1",
        txHash: event.log.transactionHash,
        txChainId: chainId
      }
    });
  }
});