import { readFile } from "node:fs/promises";
import Path from "path";
import { extractPack } from "@foundryvtt/foundryvtt-cli";
import { cleanPackEntry } from "./clean.mjs";

/**
 * Extract the contents of compendium packs to JSON files.
 * @param {string} [packName] - Name of pack to extract. If none provided, all packs will be unpacked.
 * @param {string} [entryName] - Name of a specific entry to extract.
 * @param {object} [options={}]
 * @param {object} [config={}]
 *
 * - `npm build:json - Extract all compendium NEDB files into JSON files.
 * - `npm build:json -- classes` - Only extract the contents of the specified compendium.
 * - `npm build:json -- classes Barbarian` - Only extract a single item from the specified compendium.
 */
export default async function unpackDB(packName, entryName, options={}, config={}) {
	entryName = entryName?.toLowerCase();

	// Load system.json.
	const manifest = JSON.parse(await readFile(`./${config.project?.type ?? "module"}.json`, { encoding: "utf8" }));

	// Determine which source packs to process.
	const packs = manifest.packs.filter(p => !packName || p.name === packName);

	for ( const packInfo of packs ) {
		const dest = Path.join(config?.sources ?? "packs/_source", packInfo.name);

		await extractPack(packInfo.path, dest, {
			clean: true,
			folders: true,
			expandAdventures: true,
			log: true,
			omitVolatile: true,
			transformEntry: entry => {
				if ( entryName && (entryName !== entry.name.toLowerCase()) ) return false;
				cleanPackEntry(entry, { userId: config.project?.userId });
			},
			yaml: true,
			yamlOptions: { lineWidth: 100 }
		});
	}
}
