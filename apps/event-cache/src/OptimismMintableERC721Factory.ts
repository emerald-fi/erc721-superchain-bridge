import { ponder } from "@/generated";
import { erc721Abi } from "viem";
import { getL1PublicClient } from "../clients";

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
    id: `${context.network.chainId}:${event.args.localToken}:${event.args.remoteToken}`,
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