import { ContentPage } from "@/components/layout/content-page"
import { LinkComponent } from "@/components/shared/link-component"

export default function UserGuidePage() {
  return (
    <ContentPage
      emoji="🗺️"
      contentTitle="User Guide"
      contentSubtitle="Layer Up Your Collection on the Superchain"
    >
      <p className="">
        Ready to bring your Ethereum NFTs to the Superchain?{" "}
        <span className="font-bold">Let's get started!</span>
      </p>
      <p className="">
        The Based Bridge application allows you to bridge your NFTs from
        Ethereum to the Superchain -{" "}
        <span className="italic">and back again if needed</span>. The Superchain
        is a network of Optimism based Layer 2 rollup that offers faster and
        cheaper transactions compared to Ethereum.
      </p>
      <p className="">
        We recommend reviewing the{" "}
        <LinkComponent className="link" href="security">
          Security
        </LinkComponent>{" "}
        and{" "}
        <LinkComponent className="link" href="faq">
          FAQ
        </LinkComponent>{" "}
        pages before bridging your NFTs.
      </p>
      <h3 className="mt-8 text-3xl font-bold">Step 1: Connect Your Wallet</h3>
      <p className="">
        First, connect your wallet to the Based Bridge. We support Coinbase
        Wallet, Metamask, WalletConnect, and other popular wallets.
      </p>
      <h3 className="mt-8 text-3xl font-bold">Step 2: Select Your NFT</h3>
      <p className="">
        Choose the NFT you want to bring to the Superchain. The Based Bridge
        application uses the Emerald NFT Superchain token list to display
        trusted NFTs by default.
      </p>
      <p className="">
        But you can also enter the mainnet ERC721 contract address to see if
        your NFT is supported on a target chain. If it is, you can bridge it to
        the Superchain.
      </p>
      <p className="">
        <span className="font-bold">DISCLAIMER:</span>
        <br /> We recommend that you only bridge to and from NFT collections
        that you trust. The Based Bridge application is not responsible for any
        lost or stolen NFTs. Please make sure you understand the risks before
        bridging your NFTs.
      </p>
      <h3 className="mt-8 text-3xl font-bold">Step 3: Layer Up</h3>
      <p className="">
        Click the "Review Transaction" button to start the bridging process.
      </p>
      <p className="">
        After you confirm the transaction, your NFT will be bridged to the
        destination L2 rollup i.e. Optimism or Base. You will be provided with a
        transaction hash that you can use to track the status of your bridged
        NFT.
      </p>
      <p className="">
        <span className="font-bold">
          It can take a few minutes for the transaction to be confirmed on the
          destination chain.
        </span>
      </p>
      <h3 className="mt-8 text-3xl font-bold">Step 4: Enjoy</h3>
      <p className="">
        Congratulations! Your NFT is now on the Superchain. You can view your
        bridged NFT on a Superchain explorer.
      </p>
      <p className="">
        Enjoy faster and cheaper transactions on the Superchain! 🚀
      </p>
      <p className="">
        And be sure to be on the lookout for rewards and other incentives for
        bridging your NFTs.
      </p>
      <h3 className="text-2xl font-bold">How It Works</h3>
      <p className="">
        Based Bridge uses the native ERC721 bridging smart contracts developed
        by Optimism:
      </p>
      <ul className="my-4 list-inside list-decimal pl-5">
        <li>OptimismMintableERC721.</li>
        <li>OptimismMintableERC721Factory</li>
        <li>L1ERC721Bridge</li>
        <li>L2ERC721Bridge</li>
      </ul>
      <p className="">
        <span className="font-bold">
          There is no vendor lock-in hidden fees.
        </span>{" "}
        Users can move their NFTs between Ethereum and the Superchain at any
        point in time. And in the future, easily migrate collections between the
        Superchain network if needed.
      </p>
      <p className="">
        The application is Open Source and available on GitHub.
      </p>
      <p className="">
        Anyone is able to create a new Superchain NFT collection for a Ethereum
        NFT collection, but not every collection will be included in the Emerald
        Superchain NFT token list or be given the "verified" status.
      </p>
      <p className="">
        To get listed and verified in the frontend, the collection must be
        approved by the Based Bridged development team i.e. District Labs.
      </p>
    </ContentPage>
  )
}
