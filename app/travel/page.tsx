import type { Metadata } from "next";
import CategoryShell, { Band, Lede } from "../_components/CategoryShell";
import { ARCHIVO, SOFT, MUTED, LINE } from "../_lib/site";

export const metadata: Metadata = {
  title: "How to reach the Bedfordshire park site",
  description:
    "Trains, roads and airports for Kempston Hardwick: Thameslink from St Pancras, the Marston Vale line, the A421 between the M1 and the A1.",
};

/* Routes, not timetables. Journey times and service patterns change; these
   describe the lines and roads themselves, which do not. */
const ROUTES = [
  { name: "Thameslink from London", via: "St Pancras International to Bedford",
    what: "The fastest services run into Bedford in under an hour, and the line continues south through the City to Gatwick. Bedford station is the northern end of it, so you cannot overshoot." },
  { name: "The Marston Vale line", via: "Bedford to Bletchley",
    what: "The local line that passes the site itself. Kempston Hardwick is a request stop on it, two stations out of Bedford. It is a quiet, infrequent line today — worth checking before you rely on it." },
  { name: "The A421", via: "Between the M1 and the A1",
    what: "A dual carriageway running east to west across the south of Bedford, linking junction 13 of the M1 to the A1 at Black Cat. The site sits beside it, and so do the two nearest hotels." },
  { name: "The M1", via: "Junction 13",
    what: "The obvious approach from the north or from London by car. Leave at 13 and head east on the A421." },
  { name: "The East Midlands Main Line", via: "From the north",
    what: "Bedford is on it, so Leicester, Derby, Nottingham and Sheffield all have direct trains without going via London." },
  { name: "London Luton Airport", via: "About 20 miles south",
    what: "The nearest airport by a distance, with a direct train north into Bedford. Stansted and Heathrow are both reachable but neither is quick." },
];

export default function Travel() {
  return (
    <CategoryShell
      slug="travel"
      title="How to get there"
      standfirst="The site sits beside the A421 and on the Marston Vale railway line, a few miles south of Bedford. Here is every way in."
      img="/images/plan/how-to-get-there.jpg"
      alt="A black cab waiting in traffic on a city street"
    >
      <Band label="Routes to the site">
        <Lede>
          The park has no public entrance yet, so none of this is a route to a gate — it is how you reach Kempston
          Hardwick and the hotels around it. We have left out timetables and journey times beyond the broadest terms,
          because those change and we have not verified them.
        </Lede>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {ROUTES.map((r) => (
            <article key={r.name} style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.4fr)", gap: 40, padding: "28px 0", borderTop: `1px solid ${LINE}` }}>
              <div>
                <h2 style={{ margin: 0, fontFamily: ARCHIVO, fontWeight: 700, fontSize: 24, lineHeight: 1.15, letterSpacing: "-0.03em" }}>{r.name}</h2>
                <span style={{ display: "block", marginTop: 6, fontSize: 13, color: MUTED }}>{r.via}</span>
              </div>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: SOFT }}>{r.what}</p>
            </article>
          ))}
        </div>
      </Band>

      <Band label="What has not been decided">
        <Lede>
          How visitors will actually arrive is one of the open questions about this project. Whether the Marston Vale
          line is upgraded, whether Kempston Hardwick gets a proper station, and what happens to the A421 have all been
          discussed and none has been confirmed. Treat anything you read about it, here included, as the current picture
          rather than the finished one.
        </Lede>
      </Band>
    </CategoryShell>
  );
}
