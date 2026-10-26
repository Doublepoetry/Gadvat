# Contributing to Gadvat

Thanks for helping. All changes go through a pull request (PR) and are reviewed before they are merged.

## Quick start

1. **Fork** this repo (top-right on GitHub).
2. Make your change in your fork (edit in the browser or locally).
3. Open a **pull request** to `main` and fill in the checklist.
4. Automated checks run on your PR. Fix anything they flag.
5. The maintainer reviews, may ask questions, then merges. The site updates within a few minutes.

Not ready for a PR? [Open an issue](../../issues/new/choose) instead.

## Fort IDs

Every fort has an ID like `F001` in `data/forts.json`. Use it to find the fort and to name its content folder. New forts take the next free number.

## 1. Editing fort facts — `data/forts.json`

Each fort is one object. Edit only the fields you're fixing.

| Field | Required | Notes |
|---|---|---|
| `id` | yes | `F` + 3 digits, unique, never change existing ones |
| `name` | yes | Common English name |
| `name_marathi` | yes | Devanagari |
| `type` | yes | `Hill`, `Sea`, `Coastal` or `Land` |
| `type_marathi` | | e.g. `गिरिदुर्ग (Hill fort)` |
| `district`, `region` | yes | Current district name. A few forts are missing these — good first contribution |
| `latitude`, `longitude` | yes* | Decimal degrees, 4 decimals, inside Maharashtra. *Leave empty only if accuracy is `none` |
| `location_accuracy` | yes | `close` verified on the ground or satellite · `approx` within ~1 km · `rough` village-level · `none` unknown |
| `elevation_m` | | Metres, number only |
| `built_by_or_era` | | Short |
| `associated_with` | | People, events |
| `notes` | | One or two lines |
| `wikipedia_search`, `google_maps` | | URLs |

Keep the file valid JSON — the check will fail otherwise.

## 2. Adding content — `content/<fort-id>/`

Create a folder named after the fort ID, e.g. `content/F014/`:

```
content/F014/
  history.md          longer history, with a Sources section
  routes/
    from-pachad.md    one file per route
    from-pachad.gpx   optional GPS track
  maps/
    layout.jpg        sketches or plans of the fort
  photos/
    mahadarwaja.jpg
    photos.md         captions and credits
```

### History (`history.md`)
- Write in English or Marathi (or both).
- **Every claim needs a source** — a book, gazetteer, inscription, or a reliable link. List them under `## Sources`.
- No copying text from books or websites. Write it in your own words.

### Routes (`routes/*.md`)
Start each route file with:

```
Start: <base village>
Distance: <km one way>
Time to top: <hours>
Difficulty: easy | moderate | hard
Water: yes | no | seasonal
Last walked: <month year>
Season: <best months>
```

Then describe the route. **"Last walked" is required** — routes change, and an outdated route can put someone at risk.

### Photos and maps
- **Only your own work**, or work you have permission to share (say so in the PR).
- JPG or PNG, **max 1600 px on the long side, under 1 MB**.
- No identifiable faces without consent.
- Add a line per image in `photos.md`: `filename.jpg — caption — © your name`.

## What gets accepted

✅ Sourced facts, recent routes, original photos, corrections  
❌ Unsourced claims, copied text or images, promotion of tours or businesses, political content

## Licence

By contributing you agree your contribution is released under [MIT](LICENSE) (code) or [CC BY-SA 4.0](CONTENT-LICENSE.md) (data and content), and you'll be credited.
