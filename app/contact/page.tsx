import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";
import { CONTACT_EMAIL, MAIL } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact",
  description:
    "How to reach Universal Studios Hotels — to list a property, correct an entry, request removal, or ask about staying near the Bedford site.",
  path: "/contact",
  keywords: ["contact Universal Studios Hotels", "list your property Bedford"],
});

export default function Page() {
  return (
    <LegalPage
      title="Contact"
      path="/contact"
      updated="2026-10-02"
      intro="One address, read by a person. There is no ticket system and no contact form to fight with."
    >
      <p>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>

      <h2>Listing a property</h2>
      <p>
        <a href={MAIL.listing}>Email us</a> with the address, the type of
        accommodation, a few photographs and your rates. We work out the
        distance to the site and check the entry before it appears. Listing is
        free and there is nothing to pay at any stage.
      </p>

      <h2>Correcting or removing an entry</h2>
      <p>
        If you run a listed property and something is wrong — or you would
        rather not be listed at all — <a href={MAIL.enquiry}>tell us</a> and we
        will fix or remove it. We do not need a reason.
      </p>

      <h2>Questions about staying near the site</h2>
      <p>
        Try the <a href="/faq">questions page</a> and the{" "}
        <a href="/blog">guides</a> first, since they cover most of it. If the
        answer is not there, <a href={MAIL.enquiry}>ask</a>.
      </p>

      <h2>What we cannot help with</h2>
      <ul>
        <li>
          Bookings. We do not take them, hold them or cancel them — that is
          between you and the property or Booking.com.
        </li>
        <li>
          Anything official about the Universal development. We have no
          connection to it and no inside information.
        </li>
        <li>Tickets. None are on sale and we do not sell them.</li>
      </ul>
    </LegalPage>
  );
}
