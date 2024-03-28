import Image from "next/image"

import { Button } from "@/components/ui/button"
import { ContentPage } from "@/components/layout/content-page"
import { LinkComponent } from "@/components/shared/link-component"

export default function LayerUpPage() {
  return (
    <ContentPage
      emoji={
        <span className="bg-gradient-to-t from-emerald-300 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
          ❖
        </span>
      }
      contentTitle="Layer Up"
      contentSubtitle={
        <>
          <span>
            Bring Your Ethereum NFT <br /> Collection to the Superchain
          </span>
          <Image
            width={1456}
            height={590}
            src="/images/layer-up-hero.png"
            alt="logo"
            className="my-8 w-full rounded-3xl border-4 border-white shadow-2xl"
          />
        </>
      }
    >
      <p className="">
        Do you have an Ethereum NFT collection that you want to bring to the
        Superchain?
      </p>
      <p className="">
        <span className="font-bold">Now is the time to layer up.</span>
      </p>
      <h3 className="text-lg font-normal">
        Benefits of layering up you Ethereum NFT collection:
      </h3>
      <ol className="my-4 list-inside list-decimal pl-5">
        <li className="font-bold">
          Increase the collection transaction volume due to lower transaction
          fees.
        </li>
        <li>
          Tap into a growing user base and people onboarding from Coinbase.
        </li>
        <li className="font-bold">
          Participate in upcoming Optimism retro-active public goods.
        </li>
      </ol>
      <p className="">The process is simple. And the benefits numerous.</p>
      <p className="">
        If you manage a Ethereum NFT Collection follow the{" "}
        <LinkComponent className="link" href="collection-get-started">
          Documentation
        </LinkComponent>{" "}
        to bring your Ethereum NFT collection to the Superchain.
      </p>
      <h3 className="text-5xl font-bold">Why Layer Up?</h3>
      <p className="">
        <span className="font-bold">
          Ethereum is going through a transformation.
        </span>
      </p>
      <p className="">
        Each and every day, Ethereum continues to move towards a more scalable
        network. And it's no secret it's a rollup centric future, with the
        Superchain leading the way.
      </p>
      <p className="">
        <span className="font-bold">
          As builders it's our responsibility to help users transition to the
          Superchain.
        </span>
      </p>
      <div>
        <Image
          alt="logo"
          src="/images/layer-up-panel.png"
          width={2256}
          height={1294}
          className="my-8"
        />
      </div>
      <p className="">
        And that includes bringing Ethereum NFT collections to the Superchain.
        One day, in the not too distant future, Ethereum will be too expensive
        for the average user and day-to-day transactions.{" "}
        <span className="font-bold">
          Collections that don't layer up will be left behind.
        </span>
      </p>
      <p className="">
        Forever stuck on Ethereum mainnet.{" "}
        <span className="italic">But it doesn't have to be that way.</span>
      </p>
      <p className="">
        We have an a small window of time to{" "}
        <span className="font-bold">layer up</span> the Ethereum network and
        avoid the inevitable "state lock-in" that will occur when Ethereum
        mainnet becomes too expensive for the average user.
      </p>
      <p className="">
        Join us in the movement to layer up Ethereum into the Superchain.
      </p>
      <LinkComponent
        href="https://warpcast.com/~/channel/layer-up"
        className="mt-8"
      >
        <Button>Farcaster Layer UP Channel</Button>
      </LinkComponent>
    </ContentPage>
  )
}
