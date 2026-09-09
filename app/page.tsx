import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { PropertyTypes } from "@/components/PropertyTypes";
import { ClosestListings } from "@/components/ClosestListings";
import { ListingsExplorer } from "@/components/ListingsExplorer";
import { ValueProps } from "@/components/ValueProps";
import { GuidesTeaser } from "@/components/GuidesTeaser";
import { ProviderCta } from "@/components/ProviderCta";
import { Faq } from "@/components/Faq";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { LISTINGS } from "@/lib/listings";
import { BASE_URL, faqLd } from "@/lib/seo";

/* The directory itself, so the listing set is legible to a crawler rather
   than locked behind client-side filtering. */
function listingsLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Hotels near the ${SITE.park} site`,
    numberOfItems: LISTINGS.length,
    itemListElement: LISTINGS.map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Hotel",
        name: l.name,
        description: l.blurb,
        ...(l.website ? { url: l.website } : {}),
        address: {
          "@type": "PostalAddress",
          addressLocality: l.town,
          postalCode: l.postcode,
          addressCountry: "GB",
        },
      },
    })),
  };
}

export default function Page() {
  return (
    <>
      <JsonLd data={faqLd(SITE.faq)} />
      <JsonLd data={listingsLd()} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${BASE_URL}/#webpage`,
          url: BASE_URL,
          name: `${SITE.brand} — hotels near the ${SITE.park} site`,
          isPartOf: { "@id": `${BASE_URL}/#website` },
          about: SITE.disclaimer,
        }}
      />
      <SiteHeader />
      <main id="top">
        <Hero />
        <PropertyTypes />
        <ClosestListings />
        <ListingsExplorer />
        <ValueProps />
        <GuidesTeaser />
        <ProviderCta />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
