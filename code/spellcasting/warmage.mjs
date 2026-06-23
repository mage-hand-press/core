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

	static initialize() {
		if ( !game.settings.get("mage-hand-press-core", "warmage").customization ) return;

		dnd5e.dataModels.spellcasting.SpellcastingModel.TYPES.warmage = WarmageSpellcasting;

		CONFIG.DND5E.spellcasting.warmage = {
			label: "MageHandPress.Warmage.Spellcasting",
			img: "",
			order: 30,
			type: "warmage",
			progression: {
				warmage: {
					label: "MageHandPress.Warmage.Spellcasting"
				}
			}
		};

		// TODO: Remove this hook when switching to DnD5e 5.2
		Hooks.on("dnd5e.buildWarmageSpellcastingTable", (table, item, spellcasting) => {
			table.headers = [[{ content: "" }]];
			table.cols = [];
			table.rows = [];
		});
	}

	// TODO: Remove these stub methods when switching to DnD5e 5.2
	computeProgression(progression, actor, cls, spellcasting, count) {}
	prepareSlots(spells, actor, progression) {}
}
