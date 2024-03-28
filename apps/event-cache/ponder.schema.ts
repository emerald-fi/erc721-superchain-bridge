import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  OptimismMintableERC20: p.createTable({
    id: p.string(),
    chainId: p.int(),
    blockNumber: p.bigint(),
    localToken: p.string(),
    localName: p.string(),
    localSymbol: p.string(),
    remoteToken: p.string(),
    remoteName: p.string(),
    remoteSymbol: p.string(),
    deployer: p.string(),
  }),
}));
