import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
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
}));
