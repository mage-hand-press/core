/**
 * Initialize Warmage spellcasting.
 */
export function initialize() {
	if ( !game.settings.get("mage-hand-press-core", "warmage").customization ) return;

	dnd5e.dataModels.spellcasting.SpellcastingModel.TYPES.warmage = WarmageSpellcasting;

	CONFIG.DND5E.spellcasting.warmage = {
		label: "MageHandPress.Warmage.Spellcasting",
		img: "icons/magic/light/hand-sparks-smoke-green.webp",
		order: 30,
		type: "slotless",
		progression: {
			warmage: {
				label: "MageHandPress.Warmage.Spellcasting"
			}
		}
	};
}
