import { ContentPage } from "@/components/layout/content-page"

export default function FAQPage() {
  return (
    <ContentPage
      emoji="🙋‍♂️"
      contentTitle="F.A.Q"
      contentSubtitle="Answers for Questions You Might Have"
    >
      <h3 className="mt-8 text-3xl font-bold">What is Based Bridge?</h3>
      <p className="">
        Based Bridge is an application that allows you to bridge your NFTs from
        Ethereum to the Superchain -{" "}
        <span className="italic">and back again if needed</span>. Currently this
        includes support for the Optimism and Base rollups.
      </p>
      <h3 className="mt-8 text-3xl font-bold">What is the Superchain?</h3>
      <p className="">
        The Superchain is a network of Optimism based Layer 2 rollup that offers
        faster and cheaper transactions compared to Ethereum.
      </p>
      <h3 className="mt-8 text-3xl font-bold">
        What are the important security concerns?
      </h3>
      <p className="">
        Based Bridge uses the native Optimism ERC721 bridging smart contracts.
      </p>
      <p className="">
        The Based Bridge development team, District Labs, has reviewed the smart
        contracts, but we provide no additional security guarantees. We
        recommend that you only bridge to and from NFT collections that you
        trust.
      </p>
      <h3 className="mt-8 text-3xl font-bold">
        Can I bridge my NFT back to Ethereum?
      </h3>
      <p className="">
        <span className="font-bold">Yes!</span> You can bridge your NFT back to
        Ethereum by using the Based Bridge application. Simply select the NFT
        you want to bridge back to Ethereum and follow the same process as
        bridging to the Superchain.
      </p>
      <p className="font-bold">
        There is a 7 day waiting period before the NFT will be available on
        Ethereum mainnet.
      </p>
      <h3 className="mt-8 text-3xl font-bold">
        Can I recover my NFT if a rollup is shutdown?
      </h3>
      <p className="">
        <span className="font-bold">Absolutely!</span> Rollups are designed to
        be trustless and decentralized. If a rollup is shutdown, you can still
        recover your NFTs by submitting a transactions to Ethereum mainnet. All
        Optimism based rollups currently have a 7 day challenge period where you
        can submit a transaction to recover your NFTs.
      </p>
    </ContentPage>
  )
}
