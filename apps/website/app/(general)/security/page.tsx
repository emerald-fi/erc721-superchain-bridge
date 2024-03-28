import { ContentPage } from "@/components/layout/content-page"
import { LinkComponent } from "@/components/shared/link-component"

export default function SecurityPage() {
  return (
    <ContentPage
      emoji="🔐"
      contentTitle="Security"
      contentSubtitle="Everything You Need To Know"
    >
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
      <p className="">
        The smart contracts are open source and can be reviewed by anyone. And
        have been developed and audited by the Optimism team.
      </p>
      <h3 className="text-3xl font-bold">Rollup Centric</h3>
      <p className="">
        The Based Bridge application is rollup centric, meaning that the
        application is designed to work with rollups like Optimism and Base
        using the native messaging and relayer system.
      </p>
      <p className="">
        No additional smart contracts or third-party systems are required to
        bridge tokens between Ethereum and the Superchain.
      </p>
      <p className="font-bold">It's as close to the metal as you can get.</p>
      <h3 className="text-3xl font-bold">Always Have An Exit Strategy</h3>
      <p className="">
        Based Bridge is a permissionless and Open Source application.
      </p>
      <p className="">
        Users are free to bridge tokens to and from the Superchain at any time.
        We do our best to display every available collection that can be bridged
        - even the ones not listed in the Emerald NFT Superchain token list. We
        want the application to be as open and permissionless as possible, but
        we also want to protect users from phishing attempts and scams.
      </p>
      <p className="">
        The development team (District Labs) has no intentions of being a
        middleman or custodian of user funds or tokens. And will never require
        users to deposit funds or tokens into the application.
      </p>
      <p className="font-bold">
        We just want to build a great experience for the users of the
        Superchain.
      </p>
      <p className=""></p>
      <h3 className="text-3xl font-bold">Emerald Services</h3>
      <p className="">
        To make the experience of bridging tokens between Ethereum and the
        Superchain as seamless as possible, we have developed multiple
        supporting services/schemas:
      </p>
      <ul className="my-4 list-inside list-decimal pl-5">
        <li>Event Caching (Ponder)</li>
        <li>NFT Token List (Uniswap Token List Fork)</li>
      </ul>
      <p className="">
        District Labs, Inc. manages these services and will continue to support
        them as long as the Based Bridge is operational. However, these
        third-party systems can be replaced or removed at any time by a
        third-party team.
      </p>
      <p className="">
        These services are not required to bridge tokens between Ethereum and
        the Superchain, but they do make the experience better.
      </p>
      <p className="font-bold">
        We encourage other teams to use the Open Source code and develop their
        own services to support the Superchain ecosystem.
      </p>
      <h3 className="text-3xl font-bold">Third-Party Services</h3>
      <p className="">
        The Alchemy API is used to fetch ERC721 token metadata.
      </p>
      <p className="">
        We trust the Alchemy team to provide accurate and up-to-date token
        metadata. But ultimately does not alter the core functionality of the
        Based Bridge application.
      </p>
      <h3 className="text-3xl font-bold">Have Questions?</h3>
      <p className="">
        If you have any questions, need assistance, or are non-technical, you
        can join the Emerald Telegram channel and we'll help you get everything
        figured out.
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
