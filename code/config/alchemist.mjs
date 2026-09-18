/**
 * Initialize Alchemist configuration changes.
 */
export function initialize() {
	if ( !game.settings.get("mage-hand-press-core", "alchemist").customization ) return;
	Object.assign(CONFIG.DND5E.featureTypes.class.subtypes, featureTypes.class);

	if ( game.settings.get("dnd5e", "rulesVersion") === "modern" ) {
		Object.assign(CONFIG.DND5E.itemProperties, itemPropertiesModern);
		validPropertiesModern.weapon.forEach(p => CONFIG.DND5E.validProperties.weapon.add(p));
	} else {
		Object.assign(CONFIG.DND5E.weaponIds, weaponIdsLegacy);
	}
}

/* -------------------------------------------- */
/*  System Config Changes                       */
/* -------------------------------------------- */

/** @inheritDoc */
const featureTypes = {
	class: {
		bombFormula: "MageHandPress.Alchemist.BombFormula",
		discovery: "MageHandPress.Alchemist.Discovery"
	}
};

/* -------------------------------------------- */

/** @inheritDoc */
const itemPropertiesModern = {
	destructible: {
		label: "MageHandPress.Properties.Destructible",
		reference: "Compendium.mage-hand-press-core.journal.JournalEntry.mhpEmbeds55e0000.JournalEntryPage.mhpDestructible0"
	},
	explode: {
		label: "MageHandPress.Properties.Explode",
		reference: "Compendium.mage-hand-press-core.journal.JournalEntry.mhpEmbeds55e0000.JournalEntryPage.mhpExplode000000"
	}
};

/* -------------------------------------------- */

/** @inheritDoc */
const validPropertiesModern = {
	weapon: ["destructible", "explode"]
};

/* -------------------------------------------- */

/** @inheritDoc */
const weaponIdsLegacy = {
	bomb: "Compendium.mage-hand-press-core.equipment14.Item.mhpWeapBomb00000"
};
