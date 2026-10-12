import type { Metadata } from "next";
import CategoryShell, { Band, Lede } from "../_components/CategoryShell";
import { ARCHIVO, SOFT, MUTED, LINE } from "../_lib/site";

export const metadata: Metadata = {
  title: "Where to eat around Bedford",
  description:
    "How eating out works around the Bedfordshire park site: the Embankment, Bedford's Italian cooking, village pubs and the chains along the A421.",
};

/* Areas, not named restaurants. We have not eaten in or verified individual
   businesses, and a recommendation we cannot stand behind is worth nothing to
   a reader and unfair to the places left out. */
const AREAS = [
  { name: "The Embankment and the river", where: "Bedford town centre",
    what: "Pubs and terraces looking over the Great Ouse. The nicest place to eat outside in Bedford when the weather allows it, and walkable from the town-centre hotels." },
  { name: "The High Street and St Paul's Square", where: "Bedford town centre",
    what: "The densest run of restaurants in the area, from independents to the familiar chains, within a few minutes of each other." },
  { name: "Bedford's Italian kitchens", where: "Across the town",
    what: "Bedford has one of the largest Italian communities in Britain, the legacy of post-war recruitment to the brickworks. It shows in the delis, cafés and family restaurants, and it is the thing worth seeking out here." },
  { name: "Village pubs", where: "Elstow, Clapham, Kempston and the surrounding villages",
    what: "Within a few miles of the site in most directions. Generally a shorter drive than the town centre, and a better bet on a Sunday." },
  { name: "The A421 and retail parks", where: "South and east of Bedford",
    what: "Drive-through and chain restaurants along the main road, near the Kempston and Elstow hotels. Not an evening out, but open late and easy to park at." },
  { name: "Milton Keynes", where: "About 25 minutes by road",
    what: "A far bigger choice if nothing nearby appeals, with most of the national chains clustered together in the centre." },
];

export default function Food() {
  return (
    <CategoryShell
      slug="food"
      title="Where to eat"
      standfirst="Bedford punches above its weight on food, largely thanks to its Italian community. Here is how the area breaks down."
      img="/images/plan/where-to-eat.jpg"
      alt="A freshly baked pizza on a tray beside a stone oven"
    >
      <Band label="Eating around Bedford">
        <Lede>
          We have not named individual restaurants. We have not eaten in them, menus and owners change, and a
          recommendation we cannot stand behind helps nobody. What follows is where to point yourself; read the current
          reviews before you book.
        </Lede>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {AREAS.map((a) => (
            <article key={a.name} style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.4fr)", gap: 40, padding: "28px 0", borderTop: `1px solid ${LINE}` }}>
              <div>
                <h2 style={{ margin: 0, fontFamily: ARCHIVO, fontWeight: 700, fontSize: 24, lineHeight: 1.15, letterSpacing: "-0.03em" }}>{a.name}</h2>
                <span style={{ display: "block", marginTop: 6, fontSize: 13, color: MUTED }}>{a.where}</span>
              </div>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: SOFT }}>{a.what}</p>
            </article>
          ))}
        </div>
      </Band>

      <Band label="A practical note">
        <Lede>
          If you are staying at the Kempston or Elstow hotels you are on the edge of town, not in it. Bedford town
          centre is a ten-minute drive or a short taxi ride, and that is where the choice is. Book ahead at weekends —
          the town is smaller than the number of visitors it is about to get.
        </Lede>
      </Band>
    </CategoryShell>
  );
}
