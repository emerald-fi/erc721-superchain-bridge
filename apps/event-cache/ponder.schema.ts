import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  BridgedErcy721State: p.createEnum(["L1", "L2", "PENDING_TO_L1", "PENDING_TO_L2"]),
  OptimismMintableERC721: p.createTable({
    id: p.string(),
    chainId: p.int(),
    blockNumber: p.bigint(),
    localToken: p.string(),
    localName: p.string().optional(),
    localSymbol: p.string().optional(),
    remoteToken: p.string(),
    remoteName: p.string().optional(),
    remoteSymbol: p.string().optional(),
    deployer: p.string(),
  }),
  BridgedErc721: p.createTable({
    id: p.string(),
    state: p.enum("BridgedErcy721State"),
    l1ChainId: p.int(),
    l2ChainId: p.int(),
    l1Token: p.string(),
    l2Token: p.string(),
    tokenId: p.string(),
    timestamp: p.bigint(),
    owner: p.string(),
  }),
}));
