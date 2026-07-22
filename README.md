# Part 107 Commercial — Study Site

FAA **Remote Pilot Certificate with sUAS rating** (Part 107) knowledge-test study kit.

## Live site

**https://luiscaro1.github.io/part107-study/**

| Page | Path |
|------|------|
| Home | `/` |
| Quiz Lab | `/quiz-app/` |
| Full ACS deck | `/slides/part107-full.html` |
| Quick review | `/slides/quick.html` |

## Local

```bash
# Open the site home
open index.html

# Or run the quiz app with a tiny local server
cd quiz-app && ./start.sh
# → http://127.0.0.1:8765
```

## Layout

| Path | What |
|------|------|
| `index.html` | GitHub Pages landing page |
| `slides/` | Full ACS deck (176 knowledge elements) + quick review |
| `quiz-app/` | Quiz lab with supplement figures |
| `quiz-viewer/` | One-off figure HTML pages |
| `extracted/` | Text extracts + high-yield figure images from FAA PDFs |
| `source/` | Official FAA PDFs (study guide, ACS, AC 107-2A, sample Qs) |
| `study-plan.md` | High-yield figures, traps, drill order |

## Exam map (ACS)

- **I Regulations** 15–25%
- **II Airspace** 15–25%
- **III Weather** 11–16%
- **IV Loading & Performance** 7–11%
- **V Operations** 35–45%

## Notes

- Study aid only — not a commercial product or official FAA material.
- FAA publications used here are U.S. government works.
- `source/testing_supplement.pdf` is gitignored (file >100MB). Download from FAA if needed; high-yield figures already live under `extracted/images/` and `quiz-app/images/`.
