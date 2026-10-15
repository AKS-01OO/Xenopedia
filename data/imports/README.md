# Kaggle dataset downloads

Download and extract the Kaggle datasets into the matching folders below. The
`kaggle/` directory is ignored by Git, so downloaded images and source files
remain local.

```powershell
kaggle datasets download -d asucse2021/ben-10-aliens -p data/imports/kaggle/ben10 --unzip
kaggle datasets download -d vishalsubbiah/pokemon-images-and-types -p data/imports/kaggle/pokemon --unzip
kaggle datasets download -d tarundalal/top-15-anime-main-charcters -p data/imports/kaggle/dragonball --unzip
kaggle datasets download -d adamridene/star-wars-characters -p data/imports/kaggle/starwars --unzip
```

The Kaggle CLI requires a Kaggle account and local API credentials. Import
datasets one at a time:

```powershell
python scripts/import_dataset.py data/imports/kaggle/ben10 --dataset ben10
python scripts/import_dataset.py data/imports/kaggle/pokemon --dataset pokemon
python scripts/import_dataset.py data/imports/kaggle/dragonball --dataset dragonball
python scripts/import_dataset.py data/imports/kaggle/starwars --dataset starwars
```

For Pokémon, the exact CSV file may be passed instead of its containing
directory if the archive includes multiple matching CSV files.

The importer updates `assets/imported-data.js`. The page loads those records
alongside the built-in seed entries, matching on universe and normalized name
so existing entries are enriched rather than duplicated. It selects a
deterministic first image from each character folder, matches Pokémon images
to CSV names, keeps only Goku and Vegeta from the mixed-anime dataset, and
preserves dataset URL/license/record provenance. Records without images use
the app's original local SVG fallback.

The listed Kaggle licenses describe the dataset uploads and do not necessarily
grant rights to the underlying Ben 10, Pokémon, Dragon Ball, or Star Wars
franchise artwork. Review image rights before deployment or redistribution.
