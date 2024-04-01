import { ponder } from "@/generated";
import { createPublicClient, erc721Abi, http } from 'viem';
import { mainnet, sepolia } from "viem/chains";


const mainnetPublicClient = createPublicClient({
  chain: mainnet,
  transport: http(process.env.PONDER_RPC_URL_1)
})

const sepoliaPublicClient = createPublicClient({
  chain: sepolia,
  transport: http(process.env.PONDER_RPC_URL_11155111)
})

function getL1PublicClient(l2chainId: number) {
  if (l2chainId === 11155420 || l2chainId === 84532) {
    return sepoliaPublicClient;
  } else {
    return mainnetPublicClient;
  }
}

ponder.on("OptimismMintableERC721Factory:OptimismMintableERC721Created", async ({ event, context }) => {
  const { OptimismMintableERC721 } = context.db;

  const tokenMetadata: {
    localName: string | undefined;
    localSymbol: string | undefined;
    remoteName: string | undefined;
    remoteSymbol: string | undefined;
  } = {
    localName: undefined,
    localSymbol: undefined,
    remoteName: undefined,
    remoteSymbol: undefined,
  }

  const [[localNameResult, localSymbolResult], [remoteNameResult, remoteSymbolResult]] = await Promise.all([
    context.client.multicall(
      {
        allowFailure: true,
        contracts: [
          {
            abi: erc721Abi,
            address: event.args.localToken,
            functionName: "name",
          },
          {
            abi: erc721Abi,
            address: event.args.localToken,
            functionName: "symbol",
          }
        ]
      }
    ),
    getL1PublicClient(context.network.chainId).multicall({
      allowFailure: true,
      contracts: [
        {
          abi: erc721Abi,
          address: event.args.remoteToken,
          functionName: "name",
        },
        {
          abi: erc721Abi,
          address: event.args.remoteToken,
          functionName: "symbol",
        }
      ]

    })
  ])

  if (localNameResult.status === "success") {
    tokenMetadata.localName = localNameResult.result.toString();
  }

  if (localSymbolResult.status === "success") {
    tokenMetadata.localSymbol = localSymbolResult.result.toString();
  }

  if (remoteNameResult.status === "success") {
    tokenMetadata.remoteName = remoteNameResult.result.toString();
  }

  if (remoteSymbolResult.status === "success") {
    tokenMetadata.remoteSymbol = remoteSymbolResult.result.toString();
  }

  const { localName, localSymbol, remoteName, remoteSymbol } = tokenMetadata
  await OptimismMintableERC721.create({
    id: `${context.network.chainId}:${event.args.localToken}`,
    data: {
      chainId: context.network.chainId,
      blockNumber: event.block.number,
      localToken: event.args.localToken,
      remoteToken: event.args.remoteToken,
      deployer: event.args.deployer,
      localName,
      localSymbol,
      remoteName,
      remoteSymbol
    },
  });
});