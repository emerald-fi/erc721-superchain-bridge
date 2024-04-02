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
        The "name" and "symbol" fields will be automatically populated using the
        original Ethereum L1 NFT collection name and symbol.{" "}
        <span className="font-bold">
          The fields can be updated, but it's highly recommended to use the same
          name and symbol to avoid confusion for holders.
        </span>
      </p>
      <h4 className="text-2xl font-bold">
        Step 2. Verify Collection Provenance
      </h4>
      <p className="">
        <span className="font-bold">
          Verifying the collection provenance is a crucial step in the process.
        </span>{" "}
        This step ensures that the collection is authentic and the "official"
        collection. Giving holders confidence that the collection is legitimate.
      </p>
      <img
        className="rounded-xl"
        src="/images/verification-cast.png"
        alt="Provenance Verification Example"
      />
      <p className="text-xs">
        <LinkComponent
          className="link"
          href="https://warpcast.com/kames/0x1a34f541"
        >
          Example of a Provenance Verification
        </LinkComponent>
      </p>
      <p className="">
        Since the Optimism <span className="font-bold">L1ERC721Bridge</span> and{" "}
        <span className="font-bold">OptimismERC721Factory</span> smart contracts
        are open and permissionless, anyone can create a new Superchain L2
        ERC721 collection from an L1 Ethereum ERC721 collection.{" "}
        <span className="italic">
          That's why it's important to verify the collection provenance to
          ensure the collection is authentic.
        </span>
      </p>
      <p className="font-bold">Potential Verification Methods:</p>
      <ul className="my-4 list-inside list-decimal pl-5">
        <li>Ethereum Attestation Station</li>

        <li>Twitter Post</li>

        <li>Farcaster Post</li>

        <li>Github Gist</li>

        <li>Other</li>
      </ul>
      <p>
        A signature/attestation from the original ERC721 collection deployer
        being the strongest form of provenance verification. But if a
        creator/team is unable to access the original private keys that deployed
        the smart contract, a public statement will also work.
      </p>
      <p>
        <LinkComponent
          className="link"
          href="https://warpcast.com/~/channel/emerald"
        >
          Click here
        </LinkComponent>{" "}
        to verify using the Ethereum Attestation Station.
      </p>

      <h4 className="text-2xl font-bold">
        Step 3. Update the Emerald Superchain NFT token list
      </h4>
      <p>
        The final step is to add the new NFT collection to the Emerald
        Superchain NFT token list. The token list is a JSON file that contains
        all the verified L2 NFT collections that are available on the Based
        Bridge application.
      </p>
      <p>
        <LinkComponent
          className="link"
          href="https://github.com/emerald-fi/erc721-superchain-bridge/blob/main/packages/token-list/src/default-token-list.json"
        >
          Emerald NFT Superchain Token List
        </LinkComponent>
      </p>
      <p>
        The testnet token list has a complete example using the Emerald NFT
        collection. You can use this as a reference when adding your collection
        to the mainnet token list.
      </p>
      <p>
        <LinkComponent
          className="link"
          href="https://github.com/emerald-fi/erc721-superchain-bridge/blob/main/packages/token-list/src/testnet-token-list.json"
        >
          Testnet Emerald NFT Superchain Token List
        </LinkComponent>
      </p>
      <h3 className="text-xl font-bold">Technical User</h3>
      <p>
        If you are a technical user and would like to add a new L2 NFT
        collection to the Emerald Superchain NFT token list, you can submit a
        pull request to the Github repository.
      </p>
      <ol className="list-decimal pl-8">
        <li>
          Fork the{" "}
          <LinkComponent
            className="link"
            href="https://github.com/emerald-fi/erc721-superchain-bridge"
          >
            {" "}
            Emerald Superchain NFT token list repository
          </LinkComponent>
          .
        </li>
        <li>Add the new L2 NFT collection to the token list.</li>
        <li>Submit a pull request to the main repository.</li>
        <li>
          The Emerald team will review the pull request and merge it into the
          main repository.
        </li>
      </ol>
      <h3 className="text-xl font-bold">Non-Technical User</h3>
      <p>
        If you are a non-technical user and would like to add a new L2 NFT
        collection to the Emerald Superchain NFT token list, you can reach out
        to the Emerald team directly via Telegram.
      </p>
      <p className="">
        <LinkComponent className="link" href="https://t.me/emeraldfi">
          Emerald Telegram Channel
        </LinkComponent>
      </p>
      <p>
        We'll help you get everything setup and added to the Emerald Superchain
        NFT token list. You just need to provide the necessary information and
        we'll take care of the rest.
      </p>

      <h3 className="text-2xl font-bold">Support</h3>

      <p className="">
        If you have any questions, need assistance, or are non-technical, you
        can join the Emerald Telegram channel and we'll help you get everything
        setup.
      </p>

      <p className="">
        <LinkComponent className="link" href="https://t.me/emeraldfi">
          Emerald Telegram Channel
        </LinkComponent>
      </p>

      <p className="">Or reach out to us in the Emerald Farcaster channel.</p>

      <p className="">
        <LinkComponent
          className="link"
          href="https://warpcast.com/~/channel/emerald"
        >
          Emerald Farcaster Channel
        </LinkComponent>
      </p>
    </ContentPage>
  )
}
