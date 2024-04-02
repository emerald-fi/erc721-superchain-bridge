import { Card } from "@/components/ui/card"
import { FormMintERC721 } from "@/components/forms/form-mint-erc721"

export default function MintPage() {
  return (
    <div className="container relative mt-20 flex h-full w-full flex-col items-center justify-center px-4">
      <Card className="w-full max-w-full p-10 lg:max-w-lg">
        <FormMintERC721 />
      </Card>
    </div>
  )
}
