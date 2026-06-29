const { Die, NumericTerm, OperatorTerm } = foundry.dice.terms;

export function initialize() {
	Hooks.on("dnd5e.preRollDamage", preRollDamage);
	Hooks.on("renderDamageRollConfigurationDialog", renderDamageRollConfigurationDialog);
	Hooks.on("dnd5e.buildDamageRollConfig", buildDamageRollConfig);
	Hooks.on("dnd5e.postDamageRollConfiguration", postDamageRollConfiguration);
}

/* -------------------------------------------- */

/**
 * Add flag indicating whether Warmage Edge should be used by default.
 * @param {DamageRollProcessConfiguration} config
 * @param {BasicRollDialogConfiguration} dialog
 * @param {BasicRollMessageConfiguration} message
 */
export function preRollDamage(process, dialog, message) {
	if ( !process.subject || !canUseWarmageEdge(process.subject.actor, process.subject.item) ) return;
	process.mageHandPress ??= {};
	process.mageHandPress.warmageEdge = { available: true, enabled: true };
}

/* -------------------------------------------- */

/**
 * Add the Warmage Edge toggle into the damage dialog.
 * @param {DamageRollConfigurationDialog} app
 * @param {DamageRollConfiguration} config
 * @param {FormDataExtended} formData
 * @param {number} index
 */
export function buildDamageRollConfig(app, config, formData, index) {
	if ( !app.config?.mageHandPress?.warmageEdge?.available || !formData ) return;
	const enabled = foundry.utils.getProperty(formData.object, "mageHandPress.warmageEdge.enabled") ?? false;
	foundry.utils.setProperty(app.config, "mageHandPress.warmageEdge.enabled", enabled);
}

/* -------------------------------------------- */

/**
 * Add the Warmage Edge toggle into the damage dialog.
 * @param {DamageRollConfigurationDialog} app
 * @param {HTMLElement} html
 * @param {ApplicationRenderContext} context
 * @param {HandlebarsRenderOptions} options
 */
export function renderDamageRollConfigurationDialog(app, html, context, options) {
	if ( !app.config?.mageHandPress?.warmageEdge?.available ) return;
	const configuration = html.querySelector('[data-application-part="configuration"]');
	const checkbox = configuration.querySelector('[name="mageHandPress.warmageEdge.enabled"]');
	if ( checkbox ) {
		checkbox.checked = !!app.config.mageHandPress.warmageEdge.enabled;
	} else {
		const element = new foundry.data.fields.BooleanField().toFormGroup(
			{ label: game.i18n.localize("MageHandPress.Warmage.WarmageEdge") },
			{
				input: dnd5e.applications.fields.createCheckboxInput,
				name: "mageHandPress.warmageEdge.enabled",
				value: app.config.mageHandPress.warmageEdge.enabled
			}
		);
		configuration.append(element);
	}
}

/* -------------------------------------------- */

/**
 * Modify damage roll based on whether Warmage Edge is being used.
 * @param {DamageRoll[]} rolls
 * @param {DamageRollProcessConfiguration} process
 * @param {BasicRollDialogConfiguration} dialog
 * @param {BasicRollMessageConfiguration} message
 */
export function postDamageRollConfiguration(rolls, process, dialog, message) {
	if ( !process.mageHandPress?.warmageEdge?.enabled || !rolls[0] || !process.subject.actor ) return;

	// Modify damage to include Warmage Edge
	const addModifier = !process.rolls[0].parts.find(p => p.includes("@mod") || p.includes("@abilities.int.mod"));
	applyWarmageEdge(rolls[0], { actor: process.subject.actor, addModifier, critical: process.critical });

	// Expend use of Warmage Edge item when in combat
	const edgeFeature = process.subject.actor.identifiedItems?.get("feat:warmage-edge")?.first();
	if ( edgeFeature && game.combat ) edgeFeature.update({ "system.uses.spent": edgeFeature.system.uses.spent + 1 });
}

/* -------------------------------------------- */

/**
 * Determine whether the player can use Warmage Edge with this damage roll.
 * @param {Actor5e} actor
 * @param {Item5e} spell
 * @returns {boolean}
 */
function canUseWarmageEdge(actor, spell) {
	// Actor must have Warmage's Edge feature and it must have uses
	const edgeFeature = actor.identifiedItems?.get("feat:warmage-edge")?.first();
	if ( !edgeFeature?.system.uses.value || (spell.type !== "spell") ) return false;

	// Item rolling damage must be a cantrip (unless player has House of Bishops subclass)
	if ( (spell.system.level !== 0) && !actor.identifiedItems?.get("subclass:house-bishops")?.size ) return false;

	// Spell must be marked as "Warmage", have the "Warmage" spellcasting method, or from the Warmage spell list
	if ( (spell.system.sourceItem !== "warmage") && (spell.system.method !== "warmage")
		&& !dnd5e.registry.spellLists.forSpell(spell._stats.compendiumSource)
			?.find(l => (l.metadata.identifier === "warmage") && (l.metadata.type === "class")) ) return false;

	return true;
}

/* -------------------------------------------- */

/**
 * Modify the provided roll to add Warmage Edge based on character's Warmage level.
 * @param {DamageRoll} roll
 * @param {object} options
 * @param {Actor5e} options.actor
 * @param {boolean} [options.addModifier=true]
 * @param {CriticalDamageConfiguration} [options.critical]
 */
function applyWarmageEdge(roll, { actor, addModifier=true, critical }) {
	if ( roll.options.warmageEdge ) return;

	// Add intelligence modifier bonus
	if ( addModifier ) roll.terms.push(
		new OperatorTerm({ operator: "+", options: { warmageEdge: true } }),
		new NumericTerm({ number: actor.system.abilities?.int?.mod ?? 0 })
	);

	// Add new dice
	const number = actor.system.scale?.warmage?.["bonus-dice"]?.value ?? 0;
	const rollTerm = roll.terms.find(t => t instanceof foundry.dice.terms.Die);
	if ( number && rollTerm ) roll.terms.push(
		new OperatorTerm({ operator: "+", options: { warmageEdge: true } }),
		new Die({ number, faces: rollTerm.faces, options: { warmageEdge: true } })
	);

	roll.options.warmageEdge = true;
	roll.configureDamage({ critical });
}
