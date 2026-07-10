export function initialize() {
	if ( !game.settings.get("mage-hand-press-core", "gunslinger").customization ) return;

	const isVersatile = Object.getOwnPropertyDescriptor(dnd5e.dataModels.item.WeaponData.prototype, "isVersatile").get;
	Object.defineProperty(dnd5e.dataModels.item.WeaponData.prototype, "isVersatile", {
		get() { return isVersatile.call(this) || this.properties.has("scatter"); },
		configurable: true,
		enumerable: false
	});

	super_getActionLabel = dnd5e.dataModels.activity.AttackActivityData.prototype.getActionLabel;
	dnd5e.dataModels.activity.AttackActivityData.prototype.getActionLabel = getActionLabel;

	Hooks.on("preRenderItemSheet5e", preRenderItemSheet);
	Hooks.on("renderItemSheet5e", renderItemSheet);
	Hooks.on("renderAttackRollConfigurationDialog", renderAttackRollConfigurationDialog);
}

/* -------------------------------------------- */
/*  Helpers                                     */
/* -------------------------------------------- */

let super_getActionLabel;

/**
 * Replace One-Handed and Two-Handed labels with Normal Range and Close Range.
 * @param {string} [attackMode]
 * @returns {string}
 */
function getActionLabel(attackMode) {
	let label = super_getActionLabel.call(this, attackMode);

	if ( attackMode && (this.item?.type === "weapon") && this.item.system.properties.has("scatter") ) {
		if ( attackMode === "oneHanded" ) {
			label = label.replace(_loc("DND5E.ATTACK.Mode.OneHanded"), _loc("MageHandPress.Gunslinger.Scatter.NormalRange"));
		} else if ( attackMode === "twoHanded" ) {
			label = label.replace(_loc("DND5E.ATTACK.Mode.TwoHanded"), _loc("MageHandPress.Gunslinger.Scatter.CloseRange"));
		}
	}

	return label;
}

/* -------------------------------------------- */
/*  Rendering                                   */
/* -------------------------------------------- */

/**
 * Disable versatile property if scatter property is set.
 * @param {ItemSheet5e} app
 * @param {ApplicationRenderContext} context
 * @param {HandlebarsRenderOptions} options
 */
function preRenderItemSheet(app, context, options) {
	if ( (app.document.type !== "weapon") || !app.document.system._source.properties.includes("scatter") ) return;
	context.properties.object.ver = true;
}

/* -------------------------------------------- */

/**
 * Disable versatile property if scatter property is set & rename versatile section.
 * @param {ItemSheet5e} app
 * @param {HTMLElement} html
 * @param {ApplicationRenderContext} context
 * @param {HandlebarsRenderOptions} options
 */
function renderItemSheet(app, html, context, options) {
	if ( app.document.type !== "weapon" ) return;

	// Disable Scatter checkbox
	const hasScatter = app.document.system._source.properties.includes("scatter");
	const hasVersatile = app.document.system._source.properties.includes("ver");
	const checkbox = html.querySelector(`dnd5e-checkbox[name="system.properties.${
		hasVersatile ? "scatter" : hasScatter ? "ver" : ""
	}"]`);
	if ( checkbox ) {
		checkbox.disabled = true;
		checkbox.dataset.tooltip = _loc(`MageHandPress.Gunslinger.Scatter.Hint${hasScatter ? "Versatile" : "Scatter"}`);
	}

	// Re-label Versatile section
	const legend = html.querySelector('fieldset:has([name="system.damage.versatile.custom.enabled"]) > legend');
	if ( legend && hasScatter ) legend.innerText = _loc("MageHandPress.Gunslinger.Scatter.Section");
}

/* -------------------------------------------- */

/**
 * Rename attack modes for scatter.
 * @param {AttackRollConfigurationDialog} app
 * @param {HTMLElement} html
 * @param {ApplicationRenderContext} context
 * @param {HandlebarsRenderOptions} options
 */
function renderAttackRollConfigurationDialog(app, html, context, options) {
	const item = app.config.subject?.item;
	if ( (item?.type !== "weapon") || !item.system.properties.has("scatter") ) return;

	const oneHanded = html.querySelector('[name="attackMode"] [value="oneHanded"]');
	const twoHanded = html.querySelector('[name="attackMode"] [value="twoHanded"]');
	if ( oneHanded ) oneHanded.innerText = _loc("MageHandPress.Gunslinger.Scatter.NormalRange");
	if ( twoHanded ) twoHanded.innerText = _loc("MageHandPress.Gunslinger.Scatter.CloseRange");
}
