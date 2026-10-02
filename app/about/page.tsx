import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";
import { SITE, CONTACT_EMAIL } from "@/lib/site";
import { LISTINGS } from "@/lib/listings";

export const metadata = pageMeta({
  title: "About this directory",
  description:
    "Who runs Universal Studios Hotels, how properties get listed, how distances are measured, and what the site will and will not publish.",
  path: "/about",
  keywords: ["about Universal Studios Hotels", "independent Universal UK hotel guide"],
});

export default function Page() {
  return (
    <LegalPage
      title="About this directory"
      path="/about"
      updated="2026-10-02"
      intro="An independent list of places to stay within reach of the Universal development at Kempston Hardwick, Bedford — built for the people working on the project first, and visitors later."
    >
      <h2>Who runs it</h2>
      <p>
        {SITE.brand} is run independently and is not connected to Universal in
        any form. It is a small operation, not a booking platform and not a
        travel agency. Reach us at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>How a property gets listed</h2>
      <p>
        Two routes. Either an owner asks to be listed, or we add a nearby
        property we could verify from its operator&rsquo;s own published
        details. Listing is free and nobody can buy a position — see the{" "}
        <Link href="/affiliate-disclosure">affiliate disclosure</Link> for how
        the site does earn.
      </p>
      <p>
        There are {LISTINGS.length} properties on the list today, all hotels.
        That is not the intended end state; it is simply where the verifiable
        evidence stopped. Other accommodation types open up as owners add them.
      </p>

      <h2>How distance is worked out</h2>
      <p>
        We take the property&rsquo;s postcode, look up its coordinates in the
        national postcode data, and measure the straight line to the Kempston
        Hardwick site at 52.1046, −0.4936. It is not road mileage. The site has
        no public entrance yet, so there is no door to measure to — treat the
        figure as a way to rank one place against another, not as a journey.
      </p>

      <h2>What we will not publish</h2>
      <ul>
        <li>
          <strong>Nightly rates, room counts and amenity lists.</strong> They
          change constantly and we cannot verify them property by property.
          Printing a guess under a real business&rsquo;s name would misrepresent
          it. Ask the property.
        </li>
        <li>
          <strong>Photographs we do not have.</strong> Listing images are
          illustrations and are labelled as such, so a drawing cannot pass as a
          photo of a real building.
        </li>
        <li>
          <strong>Opening dates as fact.</strong> The development is years off
          and the published plans will change. Anything forward-looking here is
          written as an expectation.
        </li>
      </ul>

      <h2>Corrections and removals</h2>
      <p>
        If you run a listed property and would rather not appear, say so and we
        will take the entry down. If anything here is wrong, tell us and we will
        correct it — there is no process to go through, just{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>an email</a>.
      </p>
    </LegalPage>
  );
}
