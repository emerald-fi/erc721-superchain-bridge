import { Card } from "@/components/ui/card"
import { FormCreateL2ERC721 } from "@/components/forms/form-create-l2-erc721"
import { LinkComponent } from "@/components/shared/link-component"

export default function CreatePage() {
  return (
    <div className="container relative mt-20 flex h-full w-full flex-col items-center justify-center px-4 pb-16 sm:px-0">
      <div className="w-full text-center">
        <h4 className="mb-4 text-2xl font-black sm:text-6xl">
          Create New L2 NFT
        </h4>
        <p className="mx-auto text-base leading-relaxed lg:w-3/4 xl:w-2/4">
          To start bridging NFT collections from Ethereum to the Superchain, a
          new L2 NFT must be created using the Optimism developed bridging and
          ERC721 smart contracts.
        </p>
      </div>
      <Card className="my-12 w-full max-w-lg p-10">
        <FormCreateL2ERC721 />
      </Card>
      <div className="w-full max-w-lg text-center">
        <p className="mb-4 text-xs">
          <span className="font-bold">
            We recommend only creating a new L2 NFT with the approval of the
            collection creator.
          </span>{" "}
          This ensures that the new L2 NFT can be properly associated with the
          original collection and third-party platforms, like OpenSea, can
          properly properly display the provenance.
        </p>
        <p className="text-xs">
          <LinkComponent href="/documentation" className="link font-bold">
            Learn more about getting a collection listed and verified.
          </LinkComponent>
        </p>
      </div>
    </div>
  )
}
