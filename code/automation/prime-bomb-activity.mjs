import PrimeBombUsageDialog from "../applications/prime-bomb-usage-dialog.mjs";

/**
 * Special version of enchant activity for priming bombs.
 */
export class PrimeBombActivity extends dnd5e.documents.activity.EnchantActivity {
	/* -------------------------------------------- */
	/*  Model Configuration                         */
	/* -------------------------------------------- */

	/** @inheritDoc */
	static metadata = Object.freeze(
		foundry.utils.mergeObject(super.metadata, {
			type: "mage-hand-press-core.primeBomb",
			img: "modules/mage-hand-press-core/assets/svg/prime-bomb.svg",
			title: "MageHandPress.Alchemist.PrimeBomb.Title",
			hint: "MageHandPress.Alchemist.PrimeBomb.Hint",
			like: "enchant",
			usage: {
				dialog: PrimeBombUsageDialog
			}
		}, { inplace: false })
	);

	/* -------------------------------------------- */
	/*  Properties                                  */
	/* -------------------------------------------- */

	/**
	 * List of bomb formula items on the actor.
	 * @type {Item5e[]}
	 */
	get bombFormulae() {
		return this.actor.itemTypes.feat
			?.filter(i => (i.system.type.value === "enchantment") && (i.system.type.subtype === "bombFormula")) ?? [];
	}

	/* -------------------------------------------- */
	/*  Activation                                  */
	/* -------------------------------------------- */

	/** @inheritDoc */
	_prepareUsageConfig(config) {
		config = super._prepareUsageConfig(config);
		config.hasConsumption = true;
		if ( (this.item.system.type.value === "enchantment") && (this.item.system.type.subtype === "bombFormula") ) {
			config.bomb ??= {};
			config.bomb.formula = this.item.identifier;
		}
		return config;
	}

	/* -------------------------------------------- */

	/** @inheritDoc */
	async _prepareUsageUpdates(config, options={}) {
		const updates = await super._prepareUsageUpdates(config, options);
		if ( updates === false ) return updates;
		const { returnErrors } = options;
		const newErrors = [];
		const oldErrors = Array.isArray(updates) ? updates : null;

		const bombItem = Array.from(this.actor.identifiedItems.get("bomb", { type: "weapon" }) ?? [])
			.find(i => (i.system.quantity > 0) && !i.flags["mage-hand-press-core"]?.primedBomb);
		if ( bombItem && !oldErrors ) {
			// Consume quantity of bomb item
			updates.item.push({ _id: bombItem.id, "system.quantity": bombItem.system.quantity - 1 });

			// Create new bomb item to be enchanted
			config.bomb ??= {};
			const clone = bombItem.clone({
				_id: foundry.utils.randomID(),
				"flags.mage-hand-press-core.primedBomb": { ...config.bomb },
				"system.quantity": 1
			}, { keepId: true });
			if ( await this.primeBomb(clone, config.bomb) === false ) {
				newErrors.push(new dnd5e.dataModels.activity.ConsumptionError(
					_loc("MageHandPress.Alchemist.PrimeBomb.Warning.MissingEnchant")
				));
			} else {
				config.bomb.item = clone._id;
				updates.create.push(clone.toObject());
			}

			// Consume reagents
			if ( config.bomb.reagents > 0 ) {
				const reagentItem = this.actor.identifiedItems.get("reagent", { type: "feat" })?.first();
				if ( (reagentItem?.system.uses?.value ?? 0) < config.bomb.reagents ) {
					const pr = dnd5e.utils.getPluralRules();
					newErrors.push(new dnd5e.dataModels.activity.ConsumptionError(
						_loc(`DND5E.CONSUMPTION.Warning.${reagentItem?.system.uses?.value ? "NotEnough" : "None"}`, {
							available: dnd5e.utils.formatNumber(reagentItem?.system.uses?.value),
							cost: dnd5e.utils.formatNumber(config.bomb.reagents),
							type: _loc(`MageHandPress.Alchemist.PrimeBomb.Reagent.${pr.select(config.bomb.reagents)}`).toLowerCase()
						})
					));
				} else {
					updates.item.push({
						_id: reagentItem.id, "system.uses.spent": reagentItem.system.uses.spent + config.bomb.reagents
					});
				}
			}
		} else if ( !bombItem ) {
			newErrors.push(new dnd5e.dataModels.activity.ConsumptionError(
				_loc("MageHandPress.Alchemist.PrimeBomb.Warning.NoBombs", { actor: this.actor.name })
			));
		}

		if ( !returnErrors ) newErrors.forEach(err => ui.notifications.error(err.message, { console: false }));
		if ( oldErrors ) return returnErrors ? oldErrors.concat(newErrors) : false;
		return newErrors.length ? returnErrors ? newErrors : false : updates;
	}

	/* -------------------------------------------- */

	/** @inheritDoc */
	_requiresConfigurationDialog(config) {
		const reagent = this.actor.identifiedItems.get("reagent", { type: "feat" })?.first();
		const selectFormula = (config.bomb?.formula !== this.item.identifier) && (this.bombFormulae.length > 1);
		return super._requiresConfigurationDialog(config) || selectFormula || (reagent?.system.uses?.value > 0);
	}

	/* -------------------------------------------- */

	/** @inheritDoc */
	_finalizeMessageConfig(usageConfig, messageConfig, results) {
		super._finalizeMessageConfig(usageConfig, messageConfig, results);

		// Store selected bomb formula & reagent count in message flag
		if ( usageConfig.bomb?.formula ) foundry.utils.setProperty(
			messageConfig, "data.flags.mage-hand-press-core.bomb.formula", usageConfig.bomb.formula
		);
		if ( usageConfig.bomb?.reagents ) foundry.utils.setProperty(
			messageConfig, "data.flags.mage-hand-press-core.bomb.reagents", usageConfig.bomb.reagents
		);
	}

	/* -------------------------------------------- */

	/**
	 * Add new properties to message.
	 * @param {ActivityMessageConfiguration} messageConfig  Configuration info for the created message.
	 */
	preCreateUsageMessage(messageConfig) {
		const bomb = foundry.utils.getProperty(messageConfig.data, "flags.mage-hand-press-core.bomb");
		if ( !bomb ) return;
		const properties = foundry.utils.getProperty(messageConfig.data, "system.properties") ?? [];
		if ( bomb.formula ) {
			const formulaItem = this.actor.identifiedItems.get(bomb.formula)?.first();
			if ( formulaItem ) properties.push({ type: "text", text: formulaItem.name });
		}
		if ( bomb.reagents ) {
			const pr = dnd5e.utils.getPluralRules();
			const reagents = `MageHandPress.Alchemist.PrimeBomb.Reagent.${pr.select(bomb.reagents)}`;
			properties.push({ type: "text", text: `${dnd5e.utils.formatNumber(bomb.reagents)} ${_loc(reagents)}` });
		}
		foundry.utils.setProperty(messageConfig.data, "system.properties", properties);
	}

	/* -------------------------------------------- */

	/** @override */
	onRenderChatCard(message, element) {}

	/* -------------------------------------------- */

	/** @override */
	async _triggerSubsequentActions(config, results) {
		const createdItem = this.actor.items.get(results.updates.create?.[0]?._id);
		createdItem?.use();
	}

	/* -------------------------------------------- */
	/*  Event Listeners and Handlers                */
	/* -------------------------------------------- */

	/** @inheritDoc */
	_prepareConsumeResourceUsageConfig(event, message) {
		const config = super._prepareConsumeResourceUsageConfig(event, message);
		config.bomb = message.flags["mage-hand-press-core"]?.bomb ?? {};
		return config;
	}

	/* -------------------------------------------- */
	/*  Helpers                                     */
	/* -------------------------------------------- */

	/**
	 * Find the Prime Bomb enchantment for the provided formula, defaulting to this one if none is found.
	 * @param {string} [formula]  Identifier of the item containing the formula to use.
	 * @returns {PrimeBombActivity}
	 */
	getFormulaEnchantment(formula) {
		const item = this.actor.identifiedItems.get(formula || "bombs", { type: "feat" })?.first();
		return item?.system.activities.getByType("mage-hand-press-core.primeBomb")[0] ?? this;
	}

	/* -------------------------------------------- */

	/**
	 * Apply a bomb formula and reagents to a bomb.
	 * @param {object} item  In-memory version of bomb being primed.
	 * @param {object} [config={}]
	 * @param {string} [config.formula]   Formula being applied.
	 * @returns {false|void}
	 */
	async primeBomb(item, { formula }={}) {
		const activity = this.getFormulaEnchantment(formula);
		const profile = activity.effects[0];
		const effect = await profile?.getEffect();
		if ( !effect ) return false;

		const enchantmentData = effect.clone(foundry.utils.mergeObject({
			"flags.dnd5e": { enchantmentProfile: profile.id },
			system: {
				origin: {
					activity: activity.uuid,
					profile: profile.id
				}
			},
			disabled: false,
			transfer: true
		}, this.getAppliedEffectChanges(effect, { target: item }))).toObject();
		enchantmentData.system.changes =
			await ActiveEffect.implementation.forApplication(enchantmentData.system.changes, activity, item);

		if ( Hooks.call("dnd5e.preApplyEnchantment", item, enchantmentData, { activity }) === false ) return null;

		const enchantment = item.effects.get(item.updateSource({ effects: [enchantmentData] })?.effects?.[0]?._id);

		// Remove default attack & save activities
		for ( const a of item.system.activities.getByTypes("attack", "save") ) {
			item.updateSource({ [`system.activities.${a.id}`]: _del });
		}

		// Manually handler riders
		const operations = await enchantment.system
			.collectRiders({ dnd5e: { enchantmentProfile: profile._id, activityId: activity.id } });
		for ( const operation of operations ) {
			if ( (operation.action === "update") && (operation.documentName === "Item") ) {
				const update = operation.updates[0];
				delete update._id;
				item.updateSource(update);
			} else if ( (operation.action === "create") && (operation.documentName === "ActiveEffect") ) {
				item.updateSource({ effects: operation.data });
			}
		}

		Hooks.callAll("dnd5e.applyEnchantment", item, enchantment, { activity });
	}
}
