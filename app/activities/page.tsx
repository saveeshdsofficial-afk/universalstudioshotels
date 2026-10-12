import type { Metadata } from "next";
import CategoryShell, { Band, Lede } from "../_components/CategoryShell";
import { ARCHIVO, SOFT, MUTED, LINE } from "../_lib/site";

export const metadata: Metadata = {
  title: "What to do in Bedfordshire",
  description:
    "Days out within easy reach of the Bedfordshire park site: Woburn, the Shuttleworth Collection, the Great Ouse and the villages around Bedford.",
};

/* Places, not opening hours. Times and prices change and we have not verified
   them, so this page says where things are and what they are, and leaves the
   details to each operator. */
const PLACES = [
  { name: "Woburn Abbey and Safari Park", where: "Woburn, about 12 miles south-west",
    what: "A stately home and deer park with a drive-through safari park alongside it. The usual answer when someone asks for a full day out in Bedfordshire." },
  { name: "The Shuttleworth Collection", where: "Old Warden, about 9 miles east",
    what: "An aviation museum built around aircraft that still fly, with a swiss garden and a bird of prey centre on the same estate." },
  { name: "Priory Country Park", where: "Bedford, about 3 miles north",
    what: "Lakes, woodland and the Great Ouse on the edge of town. Free, open and good for an afternoon that costs nothing." },
  { name: "The Embankment and the Great Ouse", where: "Bedford town centre",
    what: "Victorian riverside gardens, the suspension bridge and a walk that runs for miles in either direction. The best thing in Bedford and it is free." },
  { name: "Elstow village", where: "Elstow, about a mile from the site",
    what: "A timber-framed Moot Hall, a Norman abbey church and the village John Bunyan grew up in — twenty minutes' detour on your way past." },
  { name: "The Forest of Marston Vale", where: "Marston Moretaine, about 4 miles west",
    what: "Reclaimed clay country turned into woodland and wetland, with a visitor centre and trails. The park site sits in the same landscape." },
];

export default function Activities() {
  return (
    <CategoryShell
      slug="activities"
      title="What to do"
      standfirst="The park is not built yet, so this is what Bedfordshire already offers — within half an hour of the site in most cases."
      img="/images/plan/what-to-do.jpg"
      alt="A rollercoaster track silhouetted against an evening sky"
    >
      <Band label="Days out near the site">
        <Lede>
          Everything below is real and open now. We have deliberately left out opening hours and ticket prices: they
          change with the season and we have not checked them property by property. Follow up with each place before you
          set off.
        </Lede>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {PLACES.map((p) => (
            <article key={p.name} style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.4fr)", gap: 40, padding: "28px 0", borderTop: `1px solid ${LINE}` }}>
              <div>
                <h2 style={{ margin: 0, fontFamily: ARCHIVO, fontWeight: 700, fontSize: 24, lineHeight: 1.15, letterSpacing: "-0.03em" }}>{p.name}</h2>
                <span style={{ display: "block", marginTop: 6, fontSize: 13, color: MUTED }}>{p.where}</span>
              </div>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: SOFT }}>{p.what}</p>
            </article>
          ))}
        </div>
      </Band>

      <Band label="If you only have a day">
        <Lede>
          Woburn or Shuttleworth will fill one on their own. If you would rather not pay for anything, the Embankment in
          Bedford and Priory Country Park join up into a long riverside walk, and Elstow is a short hop from the site on
          the way back.
        </Lede>
      </Band>
    </CategoryShell>
  );
}
