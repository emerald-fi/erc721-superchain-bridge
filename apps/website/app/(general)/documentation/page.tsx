import { ContentPage } from "@/components/layout/content-page"
import { LinkComponent } from "@/components/shared/link-component"

export default function DocumentationPage() {
  return (
    <ContentPage
      emoji="📚"
      contentTitle="Documentation"
      contentSubtitle={
        <>
          Create a new Superchain L2 NFT Connected to Ethereum L1 NFT Collection
        </>
      }
    >
      <p className="font-bold">
        Are you a creator of an NFT collection on Ethereum?
      </p>
      <p className="italic">
        Do you want to encourage holders of your collection to bridge the
        Superchain network?
      </p>
      <p className="">
        The Based Bridge application can help you create a new Superchain L2 NFT
        collection, that is connected to an original Ethereum L1 NFT collection.
        Allowing holders of the ERC721 collection, to easily bridge their NFTs
        to the Superchain network.
      </p>
      <p className="">
        Steps to getting a ERC721 Collection listed and verified on the Based
        Bridge application:
      </p>

      <ul className="my-4 list-inside list-disc pl-5">
        <li>
          Create a new L2 ERC721 smart contract on a destination L2 rollup(s).
        </li>
        <li>
          Verify the collection provenance using a cryptographic signature or
          social platform.
        </li>
        <li>
          Add the collection to the{" "}
          <LinkComponent
            href="https://github.com/emerald-fi/erc721-superchain-bridge/blob/main/packages/token-list/src/default-token-list.json"
            className="link font-bold"
          >
            Emerald Superchain NFT token list
          </LinkComponent>{" "}
          via a Github pull request or by contacting the Emerald team directly
          via Telegram or Farcaster.
        </li>
      </ul>
      <p className="">
        The process requires no coding experience and be completed in just a few
        minutes.
      </p>
      <h4 className="text-2xl font-bold">Step 1. Create New L2 NFT</h4>
      <p className="">
        <span className="font-bold">
          Creating a new L2 ERC721 smart contract is a simple process.
        </span>{" "}
        All that's required is copying and pasting the address of the original
        Ethereum L1 NFT collection into the{" "}
        <span className="font-bold">L1 NFT Address Ethereum</span> field on the{" "}
        <LinkComponent className="link" href="/create">
          Create New L2 NFT
        </LinkComponent>{" "}
        page.
      </p>
      <img src="/images/docs-create-collection.png" alt="Create New L2 NFT" />
      <p className="">
        The "name" and "symbol" will be automatically generated using the
        original Ethereum L1 NFT collection name and symbol.{" "}
        <span className="font-bold">
          It's highly recommended to use the same name and symbol to avoid
          confusion for holders.
        </span>
      </p>
      <h4 className="text-2xl font-bold">
        Step 2. Verify Collection Provenance
      </h4>
      <p className="">
        <span className="font-bold">
          Verifying the collection provenance is a crucial step in the process.
        </span>{" "}
        This step ensures that the collection is authentic and not a phishing
        attempt.
      </p>
      <p className="">
        Since the Optimism <span className="font-bold">L1ERC721Bridge</span> and{" "}
        <span className="font-bold">OptimismERC721Factory</span> smart contracts
        are open and permissionless, anyone can create a new Superchain L2
        ERC721 collection from an L1 Ethereum ERC721 collection. That's why it's
        important to verify the collection provenance to ensure the collection
        is authentic.
      </p>
      <h4 className="text-2xl font-bold">
        Step 3. Update the Emerald Superchain NFT token list
      </h4>
    </ContentPage>
  )
}
