import { ponder } from "@/generated";
import { ERC721ABI } from "../abis/ERC721ABI";
import { createPublicClient, http } from 'viem'
import { mainnet } from "viem/chains";


ponder.on("OptimismMintableERC20Factory:OptimismMintableERC721Created", async ({ event, context }) => {
  const { OptimismMintableERC20 } = context.db;

  const tokenName = await context.client.readContract({
    abi: ERC721ABI,
    address: event.args.localToken,
    functionName: "name",
  });

  
  const tokenSymbol = await context.client.readContract({
    abi: ERC721ABI,
    address: event.args.localToken,
    functionName: "symbol",
  });

  const clientMainnet = createPublicClient({ 
    chain: mainnet,
    transport: http()
  })

  const remoteTokenName = await clientMainnet.readContract({
    abi: ERC721ABI,
    address: event.args.remoteToken,
    functionName: "name",
  });

  const remoteTokenSymbol = await clientMainnet.readContract({
    abi: ERC721ABI,
    address: event.args.remoteToken,
    functionName: "symbol",
  });

  await OptimismMintableERC20.create({
    id: event.args.localToken,
    data: {
      chainId: context.network.chainId,
      blockNumber: event.block.number,
      localToken: event.args.localToken,
      localName: tokenName as string,
      localSymbol:tokenSymbol as string,
      remoteToken: event.args.remoteToken,
      remoteName: remoteTokenName as string,
      remoteSymbol: remoteTokenSymbol as string,
      deployer: event.args.deployer,
    },
  });
});