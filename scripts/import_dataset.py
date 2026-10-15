#!/usr/bin/env python3
"""Import extracted Kaggle datasets into Xenopedia's local browser data."""

import argparse
import csv
import html
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import quote

PROJECT_ROOT = Path(__file__).resolve().parents[1]
OUTPUT_FILE = PROJECT_ROOT / "assets" / "imported-data.js"

DATASETS = {
    "ben10": {
        "name": "Ben 10 Aliens",
        "url": "https://www.kaggle.com/datasets/asucse2021/ben-10-aliens",
        "license": "CC0: Public Domain (Kaggle metadata; check rights to underlying franchise artwork)",
        "universe": "ben-10",
    },
    "pokemon": {
        "name": "Pokemon Image Dataset",
        "url": "https://www.kaggle.com/datasets/vishalsubbiah/pokemon-images-and-types",
        "license": "CC BY 4.0 (Kaggle metadata; check rights to underlying franchise artwork)",
        "universe": "pokemon",
    },
    "dragonball": {
        "name": "Top 15 Anime Male Characters",
        "url": "https://www.kaggle.com/datasets/tarundalal/top-15-anime-main-charcters",
        "license": "CC0: Public Domain (Kaggle metadata; check rights to underlying franchise artwork)",
        "universe": "dragon-ball",
    },
    "starwars": {
        "name": "Star Wars Characters",
        "url": "https://www.kaggle.com/datasets/adamridene/star-wars-characters",
        "license": "Apache 2.0 (Kaggle metadata; check rights to underlying franchise artwork)",
        "universe": "star-wars",
    },
}

IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp"}


def image_sort_key(path):
    return (
        tuple(
            (0, int(part)) if part.isdigit() else (1, part.casefold())
            for part in re.split(r"(\d+)", path.name)
        ),
        path.as_posix().casefold(),
    )


def slugify(value):
    value = re.sub(r"[^a-z0-9]+", "-", str(value).casefold()).strip("-")
    return value or "unknown-entry"


def normalize(value):
    return re.sub(r"[^a-z0-9]", "", str(value).casefold())


def web_path(path):
    try:
        return quote(path.resolve().relative_to(PROJECT_ROOT.resolve()).as_posix(), safe="/")
    except ValueError as exc:
        raise ValueError(
            f"Dataset images must be inside the project so the local site can serve them: {path}"
        ) from exc


def first_image(directory):
    images = sorted(
        (path for path in directory.rglob("*") if path.is_file() and path.suffix.casefold() in IMAGE_EXTENSIONS),
        key=image_sort_key,
    )
    return images[0] if images else None


def make_source(dataset_key, source_record):
    metadata = DATASETS[dataset_key]
    return {
        "datasetName": metadata["name"],
        "datasetUrl": metadata["url"],
        "license": metadata["license"],
        "recordId": source_record,
        "importedAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "verificationStatus": "dataset-imported; canon not independently verified",
    }


def make_entry(dataset_key, name, source_record, image=None, **fields):
    metadata = DATASETS[dataset_key]
    entry = {
        "id": slugify(name),
        "name": html.escape(str(name).strip(), quote=False),
        "universeId": metadata["universe"],
        "type": "creature" if dataset_key == "pokemon" else ("alien" if dataset_key == "ben10" else "character"),
        "source": metadata["name"],
        "sources": [make_source(dataset_key, source_record)],
        "importedFromDataset": dataset_key,
        "species": html.escape(str(name).strip(), quote=False),
        "summary": f"Imported from {metadata['name']}.",
        "description": "Further details are not documented in the imported dataset.",
        "viewCount": 0,
        "comparisonCount": 0,
        "addedAt": datetime.now(timezone.utc).date().isoformat(),
        "attributes": {},
    }
    if image:
        entry["image"] = web_path(image)
    entry.update(fields)
    return entry


def markdown_text(path):
    text = path.read_text(encoding="utf-8", errors="replace")
    text = re.sub(r"!\[[^\]]*\]\([^)]*\)", "", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", text)
    text = re.sub(r"<[^>]*>", " ", text)
    text = re.sub(r"(?m)^\s{0,3}#{1,6}\s*", "", text)
    text = re.sub(r"[*_`>#]", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return html.escape(text, quote=False)


def import_ben10(root):
    records = []
    for description in sorted(
        (path for path in root.rglob("*") if path.is_file() and path.name.casefold() == "description.md"),
        key=lambda path: path.as_posix().casefold(),
    ):
        alien_dir = description.parent
        image = first_image(alien_dir)
        if not image:
            continue
        name = alien_dir.name.strip()
        content = markdown_text(description)
        records.append(
            make_entry(
                "ben10",
                name,
                description.relative_to(root).as_posix(),
                image,
                summary=content[:240] or "Imported Ben 10 alien image; description not provided.",
                description=content or "Not documented in the imported file.",
                attributes={"abilities": [], "datasetAttributes": {}},
            )
        )
    if not records:
        raise ValueError("No Ben 10 alien folders with both description.md and images were found.")
    return records


def normalized_row(row):
    return {normalize(key): value for key, value in row.items() if key is not None}


def read_csv(path):
    with path.open("r", encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        if not reader.fieldnames:
            raise ValueError(f"CSV has no header row: {path}")
        return reader.fieldnames, list(reader)


def find_pokemon_csv(root):
    candidates = []
    for path in root.rglob("*"):
        if not path.is_file() or path.suffix.casefold() != ".csv":
            continue
        headers, rows = read_csv(path)
        normalized_headers = {normalize(header) for header in headers}
        if normalized_headers.intersection({"name", "pokemon"}) and (
            normalized_headers.intersection({"type1", "type"})
        ):
            candidates.append((path, headers, rows))
    if not candidates:
        raise ValueError("No Pokémon CSV with a name and type column was found.")
    if len(candidates) > 1:
        preferred = [item for item in candidates if "pokemon" in item[0].stem.casefold()]
        if len(preferred) == 1:
            return preferred[0]
        raise ValueError(
            "Multiple Pokémon CSV files match. Pass the exact CSV file instead of the dataset folder."
        )
    return candidates[0]


def image_index(root):
    indexed = {}
    for image in root.rglob("*"):
        if image.is_file() and image.suffix.casefold() in IMAGE_EXTENSIONS:
            indexed.setdefault(normalize(image.stem), image)
    return indexed


def import_pokemon(root, explicit_csv=None):
    csv_path, headers, rows = (explicit_csv, *read_csv(explicit_csv)) if explicit_csv else find_pokemon_csv(root)
    print(f"Detected Pokemon CSV columns: {', '.join(headers)}")
    images = image_index(root)
    records = []
    for index, row in enumerate(rows, start=2):
        values = normalized_row(row)
        name = (values.get("name") or values.get("pokemon") or "").strip()
        if not name:
            continue
        image = images.get(normalize(name))
        type1 = values.get("type1") or values.get("type")
        type2 = values.get("type2")
        source_attributes = {
            html.escape(str(key), quote=False): html.escape(str(value).strip(), quote=False)
            for key, value in row.items()
            if key and value not in (None, "")
        }
        types = [
            html.escape(value.strip(), quote=False)
            for value in (type1, type2)
            if value and value.strip()
        ]
        records.append(
            make_entry(
                "pokemon",
                name,
                f"{csv_path.relative_to(root).as_posix()}#row-{index}",
                image,
                summary=f"Pokémon type: {' / '.join(types)}" if types else "Pokémon record imported from Kaggle.",
                species=html.escape(name, quote=False),
                attributes={
                    "types": types,
                    "abilities": [],
                    "datasetAttributes": source_attributes,
                },
            )
        )
    if not records:
        raise ValueError("The Pokémon CSV contained no rows with a name.")
    missing_images = sum(not record.get("image") for record in records)
    if missing_images:
        print(f"Notice: {missing_images} Pokémon records have no matching local image file.")
    return records


def import_dragonball(root):
    wanted = {"goku": "Goku", "vegeta": "Vegeta"}
    folders = [path for path in root.rglob("*") if path.is_dir()]
    records = []
    found = set()
    for folder in folders:
        key = normalize(folder.name)
        canonical = next(
            (name for alias, name in wanted.items() if key == alias or key.startswith(alias)),
            None,
        )
        if not canonical or canonical.casefold() in found:
            continue
        image = first_image(folder)
        if not image:
            continue
        records.append(
            make_entry(
                "dragonball",
                canonical,
                folder.relative_to(root).as_posix(),
                image,
            )
        )
        found.add(canonical.casefold())
    if not records:
        raise ValueError("No Goku or Vegeta character image folders were found in the anime dataset.")
    missing = sorted(set(name.casefold() for name in wanted.values()) - found)
    if missing:
        print(f"Notice: no image folder found for: {', '.join(missing)}")
    return records


def import_starwars(root):
    records_by_name = {}
    for folder in sorted((path for path in root.rglob("*") if path.is_dir()), key=lambda path: path.as_posix().casefold()):
        image = next(
            (
                path for path in sorted(
                    folder.iterdir(),
                    key=lambda path: image_sort_key(path) if path.is_file() else ((), path.name.casefold()),
                )
                if path.is_file() and path.suffix.casefold() in IMAGE_EXTENSIONS
            ),
            None,
        )
        if not image:
            continue
        key = normalize(folder.name)
        records_by_name.setdefault(
            key,
            make_entry(
                "starwars", folder.name.strip(), folder.relative_to(root).as_posix(), image
            ),
        )
    records = list(records_by_name.values())
    if not records:
        raise ValueError("No Star Wars character image folders were found.")
    return records


def load_dataset(path, dataset_key):
    if not path.exists():
        raise FileNotFoundError(f"Dataset path not found: {path}")
    if dataset_key == "pokemon" and path.is_file() and path.suffix.casefold() == ".csv":
        return import_pokemon(path.parent, path)
    if not path.is_dir():
        raise ValueError("Pass the extracted Kaggle dataset folder (or the Pokémon CSV inside it).")
    loaders = {
        "ben10": import_ben10,
        "pokemon": import_pokemon,
        "dragonball": import_dragonball,
        "starwars": import_starwars,
    }
    return loaders[dataset_key](path)


def merge_records(existing, incoming):
    by_key = {
        (record["universeId"], normalize(record["name"])): record
        for record in existing
    }
    added = 0
    updated = 0
    for record in incoming:
        key = (record["universeId"], normalize(record["name"]))
        current = by_key.get(key)
        if current is None:
            existing.append(record)
            by_key[key] = record
            added += 1
            continue

        for field, value in record.items():
            if field == "attributes":
                current["attributes"] = {**current.get("attributes", {}), **value}
            elif field == "sources":
                seen = {
                    (source.get("datasetUrl"), source.get("recordId"))
                    for source in current.get("sources", [])
                }
                current.setdefault("sources", []).extend(
                    source
                    for source in value
                    if (source.get("datasetUrl"), source.get("recordId")) not in seen
                )
            elif field == "summary" and current.get(field):
                continue
            elif field == "description" and current.get(field):
                continue
            else:
                current[field] = value
        updated += 1
    return added, updated


def read_existing_output():
    if not OUTPUT_FILE.exists():
        return []
    text = OUTPUT_FILE.read_text(encoding="utf-8")
    prefix = "window.XenopediaImportedEntries = "
    if not text.startswith(prefix):
        raise ValueError(f"Unexpected format in {OUTPUT_FILE}; refusing to overwrite it.")
    json_text = text[len(prefix):].strip()
    if json_text.endswith(";"):
        json_text = json_text[:-1]
    loaded = json.loads(json_text)
    if not isinstance(loaded, list):
        raise ValueError("Existing imported entries file does not contain a JSON array.")
    return loaded


def write_output(records):
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    serialized = json.dumps(records, ensure_ascii=False, indent=2)
    OUTPUT_FILE.write_text(
        f"window.XenopediaImportedEntries = {serialized};\n",
        encoding="utf-8",
    )


def import_dataset(path, dataset_key):
    incoming = load_dataset(path, dataset_key)
    existing = read_existing_output()
    added, updated = merge_records(existing, incoming)
    write_output(existing)
    summary = {
        "dataset": DATASETS[dataset_key]["name"],
        "source": DATASETS[dataset_key]["url"],
        "license": DATASETS[dataset_key]["license"],
        "records_detected": len(incoming),
        "records_added": added,
        "existing_records_updated": updated,
        "image_records": sum(bool(record.get("image")) for record in incoming),
        "generated_file": str(OUTPUT_FILE.relative_to(PROJECT_ROOT)),
        "downloaded_data_claimed": False,
    }
    print(json.dumps(summary, indent=2, ensure_ascii=True))
    return summary


def main():
    parser = argparse.ArgumentParser(
        description="Import extracted Kaggle records and local image references into Xenopedia."
    )
    parser.add_argument("path", type=Path, help="Extracted dataset directory; Pokémon CSV is also accepted")
    parser.add_argument("--dataset", required=True, choices=sorted(DATASETS))
    args = parser.parse_args()

    try:
        import_dataset(args.path.resolve(), args.dataset)
    except (FileNotFoundError, ValueError, OSError, csv.Error, json.JSONDecodeError) as exc:
        print(f"Import failed: {exc}", file=sys.stderr)
        raise SystemExit(1) from exc


if __name__ == "__main__":
    main()
