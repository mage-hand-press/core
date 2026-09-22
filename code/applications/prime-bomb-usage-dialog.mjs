const { StringField } = foundry.data.fields;

/**
 * Dialog for configuring the usage of a prime bomb activity.
 */
export default class PrimeBombUsageDialog extends dnd5e.applications.activity.EnchantUsageDialog {

	/** @inheritDoc */
	static PARTS = {
		...super.PARTS,
		creation: {
			template: "modules/mage-hand-press-core/templates/prime-bomb-usage-creation.hbs"
		}
	};

	/* -------------------------------------------- */
	/*  Rendering                                   */
	/* -------------------------------------------- */

	/** @inheritDoc */
	async _prepareCreationContext(context, options) {
		context = await super._prepareCreationContext(context, options);

		const bombFormulae = this.activity.bombFormulae;
		if ( bombFormulae.length && this._shouldDisplay("create.bombFormulae") ) {
			context.hasCreation = true;
			context.bombFormula = {
				field: new StringField({ label: _loc("MageHandPress.Alchemist.BombFormula") }),
				name: "bomb.formula",
				value: this.config.bomb?.formula,
				options: [
					{ value: "", label: _loc("MageHandPress.Alchemist.PrimeBomb.NoFormula"), rule: true },
					...bombFormulae.map(i => ({ value: i.identifier, label: i.name }))
				]
			};
		}

		// TODO: Optionally add reagent dice
		// const reagent = this.actor.identifiedItems.get("reagent", { type: "feat" })?.first();

		return context;
	}
}
