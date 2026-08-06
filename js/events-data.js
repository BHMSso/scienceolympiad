// ============================================================
// EVENT LIST — single source of truth.
// To add/remove/rename an event next season, edit this array only —
// the Events page and the Event Resources page both read from it.
// `slug` is what resource uploads get tagged with in the admin panel.
// ============================================================
const DIVISIONS = [
  {
    code: "LS",
    name: "Life, Personal & Social Science",
    events: [
      { name: "Anatomy and Physiology", url: "https://www.soinc.org/anatomy-and-physiology-b" },
      { name: "Botany", url: "https://www.soinc.org/botany-b" },
      { name: "Disease Detectives", url: "https://www.soinc.org/disease-detectives-b" },
      { name: "Heredity", url: "https://www.soinc.org/heredity-b" },
      { name: "Water Quality", url: "https://www.soinc.org/water-quality-b" },
    ],
  },
  {
    code: "ESS",
    name: "Earth and Space Science",
    events: [
      { name: "Dynamic Planet", url: "https://www.soinc.org/dynamic-planet-b" },
      { name: "Meteorology", url: "https://www.soinc.org/meteorology-b" },
      { name: "Remote Sensing", url: "https://www.soinc.org/remote-sensing-b" },
      { name: "Rocks and Minerals", url: "https://www.soinc.org/rocks-and-minerals-b" },
      { name: "Solar System", url: "https://www.soinc.org/solar-system-b" },
    ],
  },
  {
    code: "PSC",
    name: "Physical Science & Chemistry",
    events: [
      { name: "Circuit Lab", url: "https://www.soinc.org/circuit-lab-b" },
      { name: "Crime Busters", url: "https://www.soinc.org/crime-busters-b" },
      { name: "Food Science", url: "https://www.soinc.org/food-science-b" },
      { name: "Hovercraft", url: "https://www.soinc.org/hovercraft-b" },
      { name: "Thermodynamics", url: "https://www.soinc.org/thermodynamics-b" },
    ],
  },
  {
    code: "TE",
    name: "Technology & Engineering",
    events: [
      { name: "Boomilever", url: "https://www.soinc.org/boomilever-b" },
      { name: "Elastic Launched Gliders", url: "https://www.soinc.org/elastic-launched-gliders-b" },
      { name: "Roller Coaster", url: "https://www.soinc.org/roller-coaster-b" },
      { name: "Scrambler", url: "https://www.soinc.org/scrambler-b-0" },
    ],
  },
  {
    code: "INS",
    name: "Inquiry & Nature of Science",
    events: [
      { name: "Codebusters", url: "https://www.soinc.org/codebusters-b" },
      { name: "Experimental Design", url: "https://www.soinc.org/experimental-design-b" },
      { name: "Ping-Pong Parachute", url: "https://www.soinc.org/ping-pong-parachute-b" },
      { name: "Write It Do It", url: "https://www.soinc.org/write-it-do-it-b" },
    ],
  },
];

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// Flattened list with codes + slugs, e.g. { code:"LS-01", slug:"anatomy-and-physiology", ... }
const ALL_EVENTS = DIVISIONS.flatMap((div) =>
  div.events.map((ev, i) => ({
    ...ev,
    division: div.name,
    divisionCode: div.code,
    code: `${div.code}-${String(i + 1).padStart(2, "0")}`,
    slug: slugify(ev.name),
  }))
);
