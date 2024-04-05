import { createPublicClient, http } from 'viem';
import { mainnet, sepolia } from "viem/chains";


const mainnetPublicClient = createPublicClient({
  chain: mainnet,
  transport: http(process.env.PONDER_RPC_URL_1)
})

const sepoliaPublicClient = createPublicClient({
  chain: sepolia,
  transport: http(process.env.PONDER_RPC_URL_11155111)
})

export function getL1PublicClient(l2chainId: number) {
  if (l2chainId === 11155420 || l2chainId === 84532) {
    return sepoliaPublicClient;
  } else {
    return mainnetPublicClient;
  }
}