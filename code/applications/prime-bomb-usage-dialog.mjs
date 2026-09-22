const { NumberField, StringField } = foundry.data.fields;

/**
 * Dialog for configuring the usage of a prime bomb activity.
 */
export default class PrimeBombUsageDialog extends dnd5e.applications.activity.EnchantUsageDialog {

	/** @inheritDoc */
	static PARTS = {
		...super.PARTS,
		consumption: {
			template: "modules/mage-hand-press-core/templates/prime-bomb-usage-consumption.hbs"
		},
		creation: {
			template: "modules/mage-hand-press-core/templates/prime-bomb-usage-creation.hbs"
		}
	};

	/* -------------------------------------------- */
	/*  Rendering                                   */
	/* -------------------------------------------- */

	/** @inheritDoc */
	async _prepareConsumptionContext(context, options) {
		context = await super._prepareCreationContext(context, options);

		// Optionally add reagent dice
		const reagent = this.actor.identifiedItems.get("reagent", { type: "feat" })?.first();
		if ( (reagent?.system.uses?.value > 0) && this._shouldDisplay("consume.reagents") ) {
			context.hasConsumption = true;
			context.reagents = {
				field: new NumberField({
					min: 0, max: reagent.system.uses.value, integer: true, label: _loc("MageHandPress.Alchemist.Reagents")
				}),
				name: "bomb.reagents",
				value: this.config.bomb?.reagents ?? 0
			};
		}

		return context;
	}

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

		return context;
	}
}
