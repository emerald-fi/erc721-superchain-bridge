import { ponder } from "@/generated";
import { base, mainnet, optimism, sepolia } from "viem/chains";

function getL1ChainId(l2ChainId: number) {
  if (l2ChainId in [base.id, optimism.id]) {
    return mainnet.id
  }

  return sepolia.id
}

ponder.on("L2ERC721Bridge:ERC721BridgeInitiated", async ({ event, context }) => {
  const { BridgedErc721 } = context.db;
  const chainId = context.network.chainId
  const timestamp = event.block.timestamp
  const { remoteToken: l1Token, localToken: l2Token, tokenId } = event.args
  const l1ChainId = getL1ChainId(chainId)
  const l2ChainId = chainId
  const id = `${l1ChainId}:${l1Token}:${tokenId}`

  const existingToken = await BridgedErc721.findUnique({
    id,
  });

  if (!existingToken || timestamp > existingToken.timestamp) {
    await BridgedErc721.upsert({
      id,
      update: {
        state: "PENDING_TO_L1",
        l2ChainId,
      },
      create: {
        state: "PENDING_TO_L1",
        l1ChainId,
        l2ChainId,
        l2Token,
        owner: event.args.to,
        l1Token,
        timestamp,
        tokenId: tokenId.toString(),
      }
    });
  }
});

ponder.on("L2ERC721Bridge:ERC721BridgeFinalized", async ({ event, context }) => {
  const { BridgedErc721 } = context.db;
  const chainId = context.network.chainId
  const timestamp = event.block.timestamp
  const { remoteToken: l1Token, localToken: l2Token, tokenId } = event.args
  const l1ChainId = getL1ChainId(chainId)
  const l2ChainId = chainId
  const id = `${l1ChainId}:${l1Token}:${tokenId}`

  const existingToken = await BridgedErc721.findUnique({
    id,
  });

  if (!existingToken || timestamp > existingToken.timestamp) {
    await BridgedErc721.upsert({
      id,
      update: {
        state: "L2",
        l2ChainId,
      },
      create: {
        state: "L2",
        l1ChainId,
        l2ChainId,
        l2Token,
        owner: event.args.to,
        l1Token,
        timestamp,
        tokenId: tokenId.toString(),
      }
    });
  }
});