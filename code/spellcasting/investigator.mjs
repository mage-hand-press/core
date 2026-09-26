/**
 * Initialize Investigator spellcasting.
 */
export function initialize() {
	if ( !game.settings.get("mage-hand-press-core", "investigator").customization ) return;

	Object.assign(CONFIG.DND5E.spellcasting.ritual, {
		type: "slotless",
		progression: {
			ritualist: {
				label: "MageHandPress.Investigator.Spellcasting.Ritualist"
			}
		}
	});

	CONFIG.DND5E.spellcasting.pact.progression.occultist = {
		label: "MageHandPress.Investigator.Spellcasting.Occultist",
		divisor: 3
	};

	Hooks.on("dnd5e.computePactProgression", computePactProgression);
	Hooks.on("dnd5e.preparePactSlots", preparePactSlots);
}

/* -------------------------------------------- */
/*  Preparation                                 */
/* -------------------------------------------- */

/**
 * Determine whether the pact slot progression needs to be adjusted for 4th-level Occultist.
 * @param {object} progression
 * @param {Actor5e|void} actor
 * @param {Item5e} cls
 * @param {SpellcastingDescription} spellcasting
 * @param {number} count
 */
function computePactProgression(progression, actor, cls, spellcasting, count) {
	if ( (spellcasting.progression === "occultist") && (spellcasting.levels === 4) ) {
		progression.occultistAdjustment = true;
	}
}

/* -------------------------------------------- */

/**
 * Treat 4th-level Occultist as 3rd-level.
 * @param {object} spells
 * @param {Actor5e|void} actor
 * @param {object} progression
 */
function preparePactSlots(spells, actor, progression) {
	if ( progression.occultistAdjustment ) progression.pact--;
}
