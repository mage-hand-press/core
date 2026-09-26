const { SchemaField, StringField, TypedObjectField } = foundry.data.fields;

export default class SlotlessSpellcasting extends dnd5e.dataModels.spellcasting.SpellcastingModel {
	/** @inheritDoc */
	static defineSchema() {
		return {
			...super.defineSchema(),
			progression: new TypedObjectField(new SchemaField({
				label: new StringField({ required: true, initial: () => _loc("DND5E.SPELLCASTING.Unlabeled") })
			}))
		};
	}
}
