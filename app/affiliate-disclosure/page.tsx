import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";
import { SITE, CONTACT_EMAIL } from "@/lib/site";
import { AFFILIATE_LIVE } from "@/lib/affiliate";

export const metadata = pageMeta({
  title: "Affiliate disclosure",
  description:
    "How Universal Studios Hotels makes money, which links earn a commission, and why that never affects which properties are listed or the order they appear in.",
  path: "/affiliate-disclosure",
  keywords: ["affiliate disclosure", "how this site makes money"],
});

export default function Page() {
  return (
    <LegalPage
      title="Affiliate disclosure"
      path="/affiliate-disclosure"
      updated="2026-10-02"
      intro={
        AFFILIATE_LIVE
          ? "The short version: some links on this site earn us a commission, it costs you nothing extra, and it buys no property a place on the list."
          : "The short version: some links go to Booking.com and are set up to earn a commission, but that is not switched on yet — today they earn us nothing. Either way, no property can buy a place on the list."
      }
    >
      <h2>What earns us money</h2>
      <p>
        Every &ldquo;Check availability&rdquo; button on a listing goes to
        Booking.com.{" "}
        {AFFILIATE_LIVE
          ? "If you book after following one, Booking.com may pay us a commission. You pay exactly the same price as you would going to Booking.com directly."
          : "We are not currently enrolled in Booking.com's affiliate programme, so these links earn us nothing today. This page will stay accurate if that changes."}
      </p>
      <p>
        Links marked &ldquo;Visit official site&rdquo; go to the property&rsquo;s
        own website and earn us nothing at all.
      </p>

      <h2>What does not earn us money</h2>
      <ul>
        <li>No property pays to be listed. Listing is free.</li>
        <li>
          No property can pay for a higher position. The order is decided by
          straight-line distance from the Kempston Hardwick site, or
          alphabetically, and by nothing else.
        </li>
        <li>
          We take nothing from enquiries. If you contact a property directly, no
          money reaches us at any point.
        </li>
        <li>
          We do not accept payment to write about a property, or to leave one
          out.
        </li>
      </ul>

      <h2>Why a commission does not change the list</h2>
      <p>
        The ordering is computed, not chosen. Each property&rsquo;s distance is
        worked out from its postcode against the national postcode database, and
        the list sorts on that number. There is no editorial slot to sell and no
        field in the data that a payment could move.
      </p>
      <p>
        We also do not publish nightly rates, because we cannot verify them per
        property — so there is no price we could quietly skew toward a
        better-paying booking.
      </p>

      <h2>Your rights</h2>
      <p>
        Under UK consumer protection rules, commercial relationships like this
        have to be disclosed clearly rather than buried. That is why the note
        appears beside the links themselves and not only on this page. If you
        think any part of this site is unclear about it,{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>tell us</a> and we will fix it.
      </p>

      <h2>Independence</h2>
      <p>
        {SITE.brand} is not connected to, authorised by or endorsed by Universal
        Studios, Universal Destinations &amp; Experiences, or any company in the
        NBCUniversal group, and it is not an official Universal Studios website.
        The affiliate relationship described here is with Booking.com and with
        nobody else.
      </p>
    </LegalPage>
  );
}
