/** Part 107 / UAG practice bank — reasoned answers from FAA study materials (not an official key). */
window.PART107_QUESTIONS = [
  {
    id: "rwy13-pattern",
    topic: "Traffic pattern orientation",
    acs: "UA.V.A.K3",
    figure: 26,
    figureNote: "Figure 26, area 2 — Cooperstown",
    stem: "While monitoring the Cooperstown CTAF you hear an aircraft announce they are midfield left downwind to RWY 13. Where would the aircraft be relative to the runway?",
    choices: {
      A: "The aircraft is East.",
      B: "The aircraft is South.",
      C: "The aircraft is West.",
    },
    correct: "A",
    explain:
      "RWY 13 ≈ landing heading 130° (southeast). Face that landing direction: your left is the east side of the runway. Left downwind sits on that side, flying northwest (opposite the landing heading). Midfield = halfway along the strip, still east.",
    trap: "Downwind is opposite in heading, not necessarily south of the field. The question asks which side of the runway.",
    teach: "rwy13",
  },
  {
    id: 13,
    topic: "Authorization",
    acs: "UA.V.B.K6",
    figure: 26,
    figureNote: "Figure 26, area 4 — near JMS",
    stem: "You have been hired to inspect the tower under construction at 46.9N and 98.6W, near Jamestown Regional (JMS). What must you receive prior to flying your unmanned aircraft in this area?",
    choices: {
      A: "Authorization from the military.",
      B: "Authorization from ATC.",
      C: "Authorization from the National Park Service.",
    },
    correct: "B",
    explain:
      "JMS sits in controlled airspace (magenta Class E surface / near towered ops context on the chart). Part 107 requires ATC authorization before operating in controlled airspace (LAANC or DroneZone).",
    trap: "Nearby restricted/MOA airspace can distract you — this coordinate is about the airport’s controlled airspace, not NPS.",
  },
  {
    id: 8,
    topic: "Airspace — Class C shelf",
    acs: "UA.II.A.K1",
    figure: 23,
    figureNote: "Figure 23, area 3 — Savannah Class C shelf",
    stem: "What is the floor of the Savannah Class C airspace at the shelf area (outer circle)?",
    choices: {
      A: "1,300 feet AGL.",
      B: "1,300 feet MSL.",
      C: "1,700 feet MSL.",
    },
    correct: "B",
    explain:
      "Sectional airspace altitudes are MSL. The shelf label (e.g. 130/SFC style pairing) means the outer shelf floor is 1,300 ft MSL — not AGL.",
    trap: "AGL vs MSL is the #1 Part 107 chart trap.",
  },
  {
    id: 9,
    topic: "Chart hazards",
    acs: "UA.V.B.K6",
    figure: 20,
    figureNote: "Figure 20, area 3 — SE of ECG",
    stem: "With ATC authorization, you are operating your small unmanned aircraft approximately 4 SM southeast of Elizabeth City Regional Airport (ECG). What hazard is indicated to be in that area?",
    choices: {
      A: "High density military operations in the vicinity.",
      B: "Unmarked balloon on a cable up to 3,008 feet AGL.",
      C: "Unmarked balloon on a cable up to 3,008 feet MSL.",
    },
    correct: "C",
    explain:
      "Obstacle / balloon heights on sectionals are MSL. The caution notes an unmarked balloon on a cable — read MSL, not AGL.",
  },
  {
    id: 14,
    topic: "NOTAMs",
    acs: "UA.II.B.K5",
    figure: 20,
    figureNote: "Figure 20, area 5 — balloon caution",
    stem: "How would a remote PIC \"CHECK NOTAMS\" as noted in the CAUTION box regarding the unmarked balloon?",
    choices: {
      A: "By utilizing the B4UFLY mobile application.",
      B: "By contacting the FAA district office.",
      C: "By obtaining a briefing via an online source such as: 1800WXBrief.com.",
    },
    correct: "C",
    explain:
      "Official NOTAM briefings come through Flight Service / 1800WXBrief (or equivalent official briefing). B4UFLY helps airspace awareness but is not the cited way to “CHECK NOTAMS” in this caution context.",
  },
  {
    id: 5,
    topic: "Airport communications",
    acs: "UA.V.B.K6",
    figure: 22,
    figureNote: "Figure 22, area 2 — Coeur d'Alene",
    stem: "At Coeur D'Alene which frequency should be used as a Common Traffic Advisory Frequency (CTAF) to monitor airport traffic?",
    choices: {
      A: "122.05 MHz.",
      B: "135.075 MHz.",
      C: "122.8 MHz.",
    },
    correct: "C",
    explain:
      "CTAF is shown in the airport data block on the sectional (often after the elevation/runway length). For this sample item the CTAF is 122.8.",
  },
  {
    id: 10,
    topic: "MOA status",
    acs: "UA.II.A.K2",
    figure: 21,
    figureNote: "Figure 21 — Devil's Lake West MOA",
    stem: "You have been hired by a farmer to use your small UA to inspect his crops. The area that you are to survey is in the Devil's Lake West MOA, east of area 2. How would you find out if the MOA is active?",
    choices: {
      A: "Refer to the chart legend.",
      B: "This information is available in the Small UAS database.",
      C: "Refer to the Military Operations Directory.",
    },
    correct: "C",
    explain:
      "MOA times/status are not fully determined from the sectional legend alone. Use the Military Operations Directory / appropriate special-use airspace status sources (plus NOTAMs/briefing).",
  },
  {
    id: 30,
    topic: "Military Training Routes",
    acs: "UA.II.A.K2",
    figure: 59,
    figureNote: "Figure 59, area 2 — VR routes",
    stem: "The chart shows a gray line with \"VR1667, VR1617, VR1638, and VR1668.\" Could this area present a hazard to the operations of a small UA?",
    choices: {
      A: "No, all operations will be above 400 feet.",
      B: "Yes, this is a Military Training Route from the surface to 1,500 feet AGL.",
      C: "Yes, the defined route provides traffic separation to manned aircraft.",
    },
    correct: "B",
    explain:
      "VR routes are Military Training Routes. Four-digit VR routes typically operate up to 1,500 ft AGL (often from the surface). Your 400 ft Part 107 ceiling does not clear you of that hazard.",
    trap: "“I’m below 400” ≠ “I’m clear of MTRs.”",
  },
  {
    id: 25,
    topic: "METAR / station plot",
    acs: "UA.III.A.K2",
    figure: 12,
    figureNote: "Figure 12 — KMDW",
    stem: "What are the current conditions for Chicago Midway Airport (KMDW)?",
    choices: {
      A: "Sky 700 feet overcast, visibility 1-1/2SM, rain.",
      B: "Sky 7,000 feet overcast, visibility 1-1/2SM, heavy rain.",
      C: "Sky 700 feet overcast, visibility 11, occasionally 2SM, with rain.",
    },
    correct: "A",
    explain:
      "On station plots, ceiling values are typically in hundreds of feet (07 → 700). Visibility is statute miles. Match sky cover + visibility + weather symbols carefully.",
  },
  {
    id: 26,
    topic: "METAR / winds",
    acs: "UA.III.A.K2",
    figure: 12,
    figureNote: "Figure 12 — KJFK winds",
    stem: "The wind direction and velocity at KJFK is from",
    choices: {
      A: "180° true at 4 knots.",
      B: "180° magnetic at 4 knots.",
      C: "040° true at 18 knots.",
    },
    correct: "A",
    explain:
      "Station-plot winds are true direction the wind is FROM, with barb/speed encoding in knots. Don’t convert to magnetic for this read.",
  },
  {
    id: 7,
    topic: "Load factor",
    acs: "UA.IV.A.K1",
    figure: 2,
    figureNote: "Figure 2 — load factor chart",
    stem: "If an unmanned airplane weighs 33 pounds, what approximate weight would the airplane structure be required to support during a 30° banked turn while maintaining altitude?",
    choices: {
      A: "34 pounds.",
      B: "47 pounds.",
      C: "38 pounds.",
    },
    correct: "C",
    explain:
      "Read load factor for a 30° bank from Figure 2 (~1.15), then 33 × 1.15 ≈ 38 lb. Structure must support that effective weight.",
  },
  {
    id: 2,
    topic: "Regulations — Class C",
    acs: "UA.I.B.K16",
    figure: null,
    stem: "According to 14 CFR part 107, how may a remote pilot operate an unmanned aircraft in Class C airspace?",
    choices: {
      A: "The remote pilot must have prior authorization from the Air Traffic Control (ATC) facility having jurisdiction over that airspace.",
      B: "The remote pilot must monitor the Air Traffic Control (ATC) frequency from launch to recovery.",
      C: "The remote pilot must contact the Air Traffic Control (ATC) facility after launching the unmanned aircraft.",
    },
    correct: "A",
    explain:
      "Authorization is required before flight in Class B/C/D (and certain E). Monitoring or calling after launch is not enough.",
  },
  {
    id: 3,
    topic: "Regulations — PIC in Class C",
    acs: "UA.II.A.K1",
    figure: null,
    stem: "According to 14 CFR part 107 the remote pilot in command (PIC) of a small unmanned aircraft planning to operate within Class C airspace",
    choices: {
      A: "must use a visual observer.",
      B: "is required to file a flight plan.",
      C: "is required to receive ATC authorization.",
    },
    correct: "C",
    explain:
      "VO and flight plans are not the Part 107 requirement for Class C. ATC authorization is.",
  },
  {
    id: 1,
    topic: "Weather — air masses",
    acs: "UA.III.B.K1",
    figure: null,
    stem: "What are characteristics of a moist, unstable air mass?",
    choices: {
      A: "Turbulence and showery precipitation.",
      B: "Poor visibility and smooth air.",
      C: "Haze and smoke.",
    },
    correct: "A",
    explain:
      "Moist + unstable → convective activity: turbulence and showery precip. Stable moist air leans toward poor visibility/smooth.",
  },
  {
    id: 4,
    topic: "Density altitude / prop",
    acs: "UA.III.B.K1",
    figure: null,
    stem: "What effect does high density altitude have on the efficiency of a UA propeller?",
    choices: {
      A: "Propeller efficiency is increased.",
      B: "Propeller efficiency is decreased.",
      C: "Density altitude does not affect propeller efficiency.",
    },
    correct: "B",
    explain:
      "High density altitude = thinner air → less propeller (and rotor) efficiency / performance.",
  },
  {
    id: 6,
    topic: "Scanning",
    acs: "UA.I.B.K14",
    figure: null,
    stem: "Which technique should a remote pilot use to scan for traffic? A remote pilot should",
    choices: {
      A: "systematically focus on different segments of the sky for short intervals.",
      B: "concentrate on relative movement detected in the peripheral vision area.",
      C: "continuously scan the sky from right to left.",
    },
    correct: "A",
    explain:
      "Effective traffic scan uses short, systematic fixations on sky segments — not a continuous sweep or relying only on peripheral motion.",
  },
];
