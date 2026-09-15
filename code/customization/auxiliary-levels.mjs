/**
 * Initialize Auxiliary Levels support.
 */
export function initialize() {
	if ( !game.settings.get("mage-hand-press-core", "auxiliaryLevels") ) return;

	// Auxiliary levels should only show hit points for level 1
	Object.defineProperty(dnd5e.documents.advancement.HitPointsAdvancement.prototype, "levels", {
		get() {
			const isAuxiliaryLevel = this.item?.type === "class" && this.item?.system.properties?.has("auxiliary");
			return isAuxiliaryLevel ? [1] : Array.fromRange(CONFIG.DND5E.maxLevel + 1).slice(1);
		},
		configurable: true
	});

	Hooks.on("dnd5e.preAdvancementManagerRender", preAdvancementManagerRender);
	Hooks.on("preUpdateItem", preUpdateItem);
	Hooks.on("renderBaseActorSheet", renderBaseActorSheet);
}

/* -------------------------------------------- */
/*  Updates                                     */
/* -------------------------------------------- */

/**
 * Prevent selecting an auxiliary level without first having another class.
 * @param {AdvancementManager} application
 * @returns {false|void}
 */
function preAdvancementManagerRender(application) {
	if ( application.actor.system.details?.level > 0 ) return;
	const cls = application.steps.find(s => s.class?.item)?.class.item;
	if ( !cls.system.properties.has("auxiliary") ) return;
	ui.notifications.error("MageHandPress.AuxiliaryLevel.Warning.NotFirstClass", { localize: true });
	return false;
}

/* -------------------------------------------- */

/**
 * Prevent auxiliary levels from increasing past a single level.
 * @param {Item5e} item
 * @param {object} updates
 * @param {object} options
 * @returns {false|void}
 */
function preUpdateItem(item, updates, options) {
	if ( (item.type !== "class") || !item.system.properties.has("auxiliary") ) return;
	if ( updates.system?.levels > 1 ) {
		ui.notifications.error("MageHandPress.AuxiliaryLevel.Warning.OnlyOneLevel", { localize: true });
		return false;
	}
}

/* -------------------------------------------- */
/*  Rendering                                   */
/* -------------------------------------------- */

/**
 * Remove level indicator for auxiliary levels on actor sheet.
 * @param {ActorSheet5e} sheet
 * @param {object} context
 * @param {object} options
 */
function renderBaseActorSheet(sheet, context, options) {
	const classes = sheet.actor.itemTypes.class?.filter(i => i.system.properties.has("auxiliary"));
	for ( const cls of classes ) {
		const level = sheet.element.querySelector(`.class[data-item-id="${cls.id}"] .level`);
		level?.remove();
	}
}
