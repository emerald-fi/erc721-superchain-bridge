import { ContentPage } from "@/components/layout/content-page"
import { LinkComponent } from "@/components/shared/link-component"

export default function DocumentationPage() {
  return (
    <ContentPage
      emoji="📚"
      contentTitle="Documentation"
      contentSubtitle={
        <>
          Create a Superchain NFT and <br /> get listed + verified in Based
          Bridge
        </>
      }
    >
      <p>
        Based Bridge helps bridge ERC721 NFT collections from Ethereum to the
        Superchain network - striking a balance between open/permissionless with
        opinionated/curated.
      </p>
      <p>
        Anyone is able to create new Superchain NFT collection for an Ethereum
        NFT collection, but not every token will be included in the Emerald
        Superchain NFT token list or have "verified" status.
      </p>
      <h2>Why?</h2>
      <ol className="my-4 list-inside list-decimal pl-5">
        <li>
          We want to give users, holders and creators, access to permissionless
          tools.
        </li>
        <li>We want to limit phishing and scams on holders bridging.</li>
        <li>
          We want to give NFT creators control over their collections
          provenance.
        </li>
      </ol>
      <p>
        If you're reading this right now, you're probably an NFT collection
        creator and want to help users bridge to the "official" Superchain NFT
        collection. Below are the instructions for being included in the{" "}
        <strong>Emerald Superchain NFT token list</strong> and helping protect
        users from phishing attempts and scams.
      </p>
      <ol className="my-4 list-inside list-decimal pl-5">
        <li>
          <a href="https://bridge.emeraldfi.xyz/create">
            Create an Ethereum&lt;&gt;Superchain ERC721 Collection
          </a>
        </li>
        <li>
          Verify the NFT collection provenance via EAS, Farcaster, Twitter,
          etc...
        </li>
        <li>
          <a href="https://github.com/emerald-fi/based-bridge">
            Create a pull request on the Emerald Superchain NFT token list
          </a>
        </li>
      </ol>

      <h1 className="text-3xl font-bold">
        Creating an Ethereum&lt;&gt;Superchain NFT
      </h1>
      <p>
        Based Bridge uses the native ERC721 bridging smart contracts developed
        by Optimism:
      </p>
      <ul className="my-4 list-inside list-decimal pl-5">
        <li>
          <a href="https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/universal/OptimismMintableERC721.sol">
            OptimismMintableERC721
          </a>
        </li>
        <li>
          <a href="https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/universal/OptimismMintableERC721Factory.sol">
            OptimismMintableERC721Factory
          </a>
        </li>
      </ul>
      <p>
        The <code>OptimismMintableERC721Factory</code> function{" "}
        <code>createOptimismMintableERC721</code> must be called before users
        can start bridging mainnet ERC721 tokens, because a new ERC721 smart
        contract address, with minting authority granted to the{" "}
        <a href="https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L2/L2ERC721Bridge.sol">
          L2ERC721Bridge
        </a>{" "}
        must first be created on the respective rollup i.e. Base and/or
        Optimism.
      </p>
      <p>
        The <a href="https://bridge.emeraldfi.xyz">Based Bridge application</a>{" "}
        exposes this functionality, making it easy for anyone to create a{" "}
        <code>OptimismMintableERC721</code> smart contract, which points to the
        mainnet ERC721 collection using the{" "}
        <a href="https://github.com/ethereum/ercs/blob/master/ERCS/erc-681.md">
          EIP-681
        </a>{" "}
        standard.
      </p>
      <p>
        <a href="https://bridge.emeraldfi.xyz/create">
          https://bridge.emeraldfi.xyz/create
        </a>
      </p>
      <p>
        Once the <code>OptimismMintableERC721</code> has has been created, it
        will be indexed and made available in the interface if the user enters
        the mainnet address in the token selection modal.
      </p>
      <img
        src="/images/collection-get-started-1.png"
        alt="Token Selection Modal"
      />
      <p>
        After creating a new <code>OptimismMintableERC721</code> smart contract
        on Optimism and/or Base, it's highly recommended to "verify" the
        collection provenance and create a pull request that adds the new token
        to the Emerald Superchain NFT token list.
      </p>

      <h1 className="text-3xl font-bold">
        Verify ERC721 Collection Provenance
      </h1>
      <p>
        By default, the Optimism ERC721 bridge is open and permissionless:{" "}
        <em>
          anyone can create a Superchain ERC721 smart contract for an Ethereum
          ERC721 smart contract.
        </em>
      </p>
      <p>
        This is great if the original collection creator is unable or unwilling
        to verify the collection provenance, but can also be an issue if
        multiple versions of Superchain ERC721 versions are created, whether on
        purpose or by accident.
      </p>
      <p>
        To limit confusion, mistakes, and potential scams, collection creators
        can verify the provenance of the collection using any number of methods:
      </p>
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
        the smart contract, a public statement that can be made that references
        the "official" smart contract address can be supplied.
      </p>
      <p>
        Example of public statement to verify the collection provenance across
        chains:
      </p>
      <img
        src="/images/collection-get-started-2.png"
        alt="Provenance Verification Example"
      />
      <p>
        Collection verification is done on a case-by-case basis by the District
        Labs team.
      </p>

      <h1 className="text-3xl font-bold">Emerald Superchain NFT Token List</h1>
      <p>
        The Emerald Superchain NFT token list controls which collections are
        automatically displayed in the application interface. Being included in
        the list means it's easier for collection holders to bridge NFTs from
        Ethereum mainnet to the Superchain.
      </p>
      <img
        src="/images/collection-get-started-3.png"
        alt="Emerald Superchain NFT Token List"
      />
      <p>Below is an example of an entry in the token list.</p>
      <img
        src="/images/collection-get-started-4.png"
        alt="Emerald Superchain NFT Token List"
      />
      <p>
        At a minimum, the entry should include the mainnet collection{" "}
        <code>chainId</code>, <code>address</code>, <code>name</code>, and{" "}
        <code>logoURI</code> fields, plus the <code>bridgeInfo</code> object
        which contains pointer(s) to the <code>OptimismMintableERC721</code>{" "}
        smart contract address.
      </p>
      <p>How can your collection be included in the token list?</p>
      <p>Create a pull request on the Based Bridge application repo.</p>
      <h3 className="text-2xl font-bold">Technical Support</h3>
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
