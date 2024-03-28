import { Card } from "@/components/ui/card"
import { FormCreateL2ERC721 } from "@/components/form-create-l2-erc721"

export default function CreatePage() {
  return (
    <div className="container relative mt-20 flex h-full w-full flex-col items-center justify-center px-4 sm:px-0">
      <Card className="w-full max-w-lg p-10">
        <FormCreateL2ERC721 />
      </Card>
    </div>
  )
}
