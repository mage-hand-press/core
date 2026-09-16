const { SchemaField, StringField, TypedObjectField } = foundry.data.fields;

export default class WarmageSpellcasting extends dnd5e.dataModels.spellcasting.SpellcastingModel {
	/** @inheritDoc */
	static defineSchema() {
		return {
			...super.defineSchema(),
			progression: new TypedObjectField(new SchemaField({
				label: new StringField({ required: true, initial: () => _loc("DND5E.SPELLCASTING.Unlabeled") })
			}))
		};
	}

	/* -------------------------------------------- */

	/**
	 * Set up Warmage spellcasting in config.
	 */
	static initialize() {
		if ( !game.settings.get("mage-hand-press-core", "warmage").customization ) return;

		dnd5e.dataModels.spellcasting.SpellcastingModel.TYPES.warmage = WarmageSpellcasting;

		CONFIG.DND5E.spellcasting.warmage = {
			label: "MageHandPress.Warmage.Spellcasting",
			img: "icons/magic/light/hand-sparks-smoke-green.webp",
			order: 30,
			type: "warmage",
			progression: {
				warmage: {
					label: "MageHandPress.Warmage.Spellcasting"
				}
			}
		};
	}
}
