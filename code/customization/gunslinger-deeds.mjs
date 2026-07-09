import { firearmEras } from "../config/gunslinger.mjs";

export function initialize() {
	Hooks.on("dnd5e.initializeItemSource", setGunslingerDeeds);
}

/* -------------------------------------------- */
/*  Data Preparation                            */
/* -------------------------------------------- */

/**
 * Modify 2014 Risk to add additional deeds based on eras.
 * @param {Item5e} item
 * @param {object} data
 * @param {object} options
 */
function setGunslingerDeeds(item, data, options) {
	if ( (data.type !== "feat") || (data.system?.identifier !== "risk")
		|| (data.system?.source?.rules !== "2014") ) return;

	const advancementData = foundry.utils.getType(data.system.advancement) === "Array"
		? data.system.advancement : Object.values(data.system.advancement);
	const chooseFeaturesAdvancement = advancementData.find(a => a.type === "ItemChoice");
	if ( !chooseFeaturesAdvancement ) return;

	for ( const era of game.settings.get("mage-hand-press-core", "gunslinger").eras ) {
		for ( const uuid of firearmEras[era]?.deeds ?? [] ) {
			chooseFeaturesAdvancement.configuration.pool.push({ uuid });
		}
	}
}

