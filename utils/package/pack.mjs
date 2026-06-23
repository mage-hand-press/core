import { compilePack } from "@foundryvtt/foundryvtt-cli";
import { readdir, readFile } from "node:fs/promises";
import Path from "path";
import { cleanPackEntry } from "./clean.mjs";

/**
 * Compile the source JSON files into compendium packs.
 * @param {string} [packName] - Name of pack to compile. If none provided, all packs will be packed.
 * @param {object} [options={}]
 * @param {object} [config={}]
 *
 * - `npm run build:db` - Compile all JSON files into their LevelDB files.
 * - `npm run build:db -- classes` - Only compile the specified pack.
 */
export default async function packDB(packName, options={}, config={}) {
	const PACK_SRC = config?.sources ?? "packs/_source";

	// Load system.json.
	const manifest = JSON.parse(await readFile(`./${config.project?.type ?? "module"}.json`, { encoding: "utf8" }));

	// Determine which source folders to process
	let folders;
	try {
		folders = (await readdir(PACK_SRC, { withFileTypes: true })).filter(file =>
			file.isDirectory() && ( !packName || (packName === file.name) )
		);
	} catch(err) {
		console.error(err.message);
		return;
	}

	for ( const folder of folders ) {
		const src = Path.join(PACK_SRC, folder.name);
		const dest = manifest?.packs?.find(p => p.name === folder.name)?.path ?? Path.join("packs/", folder.name);
		await compilePack(src, dest, {
			log: true,
			recursive: true,
			transformEntry: data => cleanPackEntry(data, { userId: config.project?.userId }),
			yaml: true
		});
	}
}
