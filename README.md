# Xenopedia

Xenopedia is a fictional multiverse encyclopedia for extraterrestrial life, species, planets, and civilizations. The project is designed as a hackathon-ready research interface with a local fallback data model, searchable archive, comparison engine, colony simulator, knowledge graph, and ranking dashboard.

## Features

- Global search across aliens, planets, species, and universes
- Encyclopedia pages for 20+ canon-inspired entries
- Seven-universe explorer with immersive cards
- Alien comparison engine with live-updating profile similarity, data coverage, and a transparent ability-based power-points estimate
- Colony compatibility simulator with transparent rules
- Knowledge graph relationship view
- Rankings dashboard with demo activity data
- Illustrative space imagery in the homepage and universe explorer, plus original local alien-creature and planet artwork in article, universe, ranking, and planet views
- Local data fallback when external services are unavailable

## Images and licensing

The interface uses general space photographs hosted by Unsplash at `images.unsplash.com` and original SVG illustrations stored in `assets/illustrations/`. These are decorative visuals only and are not official artwork or likenesses from the represented franchises. All illustrations have descriptive alt text. Unsplash images are hidden automatically if the image host is unavailable; the cards retain their gradient fallback backgrounds. See the [Unsplash License](https://unsplash.com/license).

## Comparison scoring

The comparison controls update results as soon as either entry changes. Profile similarity compares six documented fields and excludes unknown values. The separate **Xenopedia power points** estimate awards up to 20 points for each capability category supported by an entry's listed abilities: offense, defense, mobility, energy/special powers, and utility. This score represents breadth of documented capabilities; it is not an official franchise measurement, canon power level, or guaranteed winner in a fight. Source-specific figures such as Pokémon battle stats or Dragon Ball power levels are not converted into cross-universe points.

## Run locally

Python is already available in this environment, so the app can be served without Node or package installation:

```bash
cd "c:\Users\ADARSH.K.S\Desktop\vs code"
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Project structure

- `index.html` — app shell and navigation
- `assets/app.js` — application logic and route rendering
- `assets/data.js` — shared seed model and data store
- `assets/styles.css` — visual design and responsive layout
- `scripts/import_dataset.py` — imports extracted Kaggle records and local image references
- `data/imports/` — folder for downloaded Kaggle files

## Supabase configuration

The app is intentionally built to run without Supabase credentials. If you later connect a real database, add a `.env` file with placeholders such as:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

The `assets/data.js` file acts as the fallback local database. A real Supabase-backed version should replace this with persistent queries and row-level security policies.

## Kaggle datasets and images

The importer supports the four requested Kaggle sources: [Ben 10 Aliens](https://www.kaggle.com/datasets/asucse2021/ben-10-aliens), [Pokémon Images and Types](https://www.kaggle.com/datasets/vishalsubbiah/pokemon-images-and-types), [Top 15 Anime Male Characters](https://www.kaggle.com/datasets/tarundalal/top-15-anime-main-charcters), and [Star Wars Characters](https://www.kaggle.com/datasets/adamridene/star-wars-characters). Follow [`data/imports/README.md`](data/imports/README.md) to download with Kaggle CLI and import the extracted folders. Downloaded files are kept in the Git-ignored `data/imports/kaggle/` directory. Imported records are merged by universe and name, and the chosen local dataset image appears in cards and entry pages with the original illustration as a fallback.

The Dragon Ball source covers several anime franchises; only Goku and Vegeta are imported from it. The importer stores source dataset/license/record metadata and records that canon was not independently verified.

Kaggle's dataset-level license field does not establish permission for underlying franchise artwork. Review applicable rights before publishing or redistributing dataset images. The project has not downloaded or imported any of the four Kaggle datasets unless you run the steps in the import guide locally; the existing sample files are synthetic examples, not source dataset records.

For static deployment, publish the generated `assets/imported-data.js` and only the image files you have confirmed you may redistribute; otherwise retain the local SVG fallbacks.

## Important limitations

- No live Kaggle or Supabase connection is configured in this local build. Kaggle records and images are imported locally from files you download.
- This is a fictional educational project and should not be treated as a real biological safety model.
- The ranking system uses demo data and is labeled as such within the UI.

## Deployment

This static app is already suitable for Vercel static hosting:

1. Push the project to a Git repository.
2. Import the folder into Vercel as a static site.
3. Ensure the build command is blank or omitted for static hosting.
4. Use the root folder as the app directory.
5. Publish the project with the default static output.

## Licenses and sourcing

When using real Kaggle datasets, verify the license before public deployment. The app stores source metadata, but it does not claim that any external dataset has been imported unless it has been verified in your environment.
