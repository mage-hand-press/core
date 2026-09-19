import { dynamoCastingProgression } from "../config/alchemist.mjs";

const { SingleLevelSpellcastingModel } = dnd5e.dataModels.spellcasting;

/**
 * Initialize Alchemist spellcasting.
 */
export function initialize() {
	if ( !game.settings.get("mage-hand-press-core", "alchemist").customization ) return;

	dnd5e.dataModels.spellcasting.SpellcastingModel.TYPES.dynamo = SingleLevelSpellcastingModel;

	CONFIG.DND5E.spellcasting.dynamo = {
		label: "MageHandPress.Alchemist.Dynamo.Label",
		type: "single",
		cantrips: false,
		prepares: true,
		order: 40,
		img: "icons/commodities/tech/engine-tech-thrust-jet-teal.webp",
		table: dynamoCastingProgression,
		progression: {
			dynamo: {
				label: "MageHandPress.Alchemist.Dynamo.Label"
			}
		}
	};

	Hooks.on("dnd5e.buildDynamoSpellcastingTable", buildDynamoSpellcastingTable);
}

/* -------------------------------------------- */
/*  Rendering                                   */
/* -------------------------------------------- */

/**
 * Customize the heading & adjust starting level for the dynamo spellcasting table.
 * @param {object} table
 * @param {Item5e} item
 * @param {SpellcastingDescription} spellcasting
 */
function buildDynamoSpellcastingTable(table, item, spellcasting) {
	if ( !table.headers?.length || !table.rows?.length ) return;

	// Adjust the header label
	table.headers[0][0].content = _loc("MageHandPress.Alchemist.Dynamo.SpellDynamos");

	// Modify starting level for table based on rules version
	if ( (item.system.source.rules === "2024")
		|| (!item.system.source.rules && (dnd5e.settings.rulesVersion === "modern")) ) table.rows[1] = null;
}
