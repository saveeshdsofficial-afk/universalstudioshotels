import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { PropertyTypes } from "@/components/PropertyTypes";
import { ClosestListings } from "@/components/ClosestListings";
import { ListingsExplorer } from "@/components/ListingsExplorer";
import { ValueProps } from "@/components/ValueProps";
import { ProviderCta } from "@/components/ProviderCta";
import { Faq } from "@/components/Faq";
import { SiteFooter } from "@/components/SiteFooter";

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <Hero />
        <PropertyTypes />
        <ClosestListings />
        <ListingsExplorer />
        <ValueProps />
        <ProviderCta />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
