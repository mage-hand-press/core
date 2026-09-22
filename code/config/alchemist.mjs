import { PrimeBombActivity } from "../automation/prime-bomb-activity.mjs";

/**
 * Initialize Alchemist configuration changes.
 */
export function initialize() {
	Object.assign(CONFIG.DND5E.activityTypes, activityTypes);
	if ( !game.settings.get("mage-hand-press-core", "alchemist").customization ) return;

	Object.assign(CONFIG.DND5E.featureTypes.class.subtypes, featureTypes.class);
	Object.assign(CONFIG.DND5E.featureTypes.enchantment.subtypes, featureTypes.enchantment);

	if ( dnd5e.settings.rulesVersion === "modern" ) {
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
const activityTypes = {
	"mage-hand-press-core.primeBomb": {
		documentClass: PrimeBombActivity,
		hidden: true
	}
};

/* -------------------------------------------- */

/** @inheritDoc */
const featureTypes = {
	class: {
		bombFormula: "MageHandPress.Alchemist.BombFormula",
		discovery: "MageHandPress.Alchemist.Discovery"
	},
	enchantment: {
		bombFormula: "MageHandPress.Alchemist.BombFormula"
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

/* -------------------------------------------- */
/*  Alchemist Config                            */
/* -------------------------------------------- */

/**
 * Spellcasting progression for Dynamo casting.
 * @type {SpellcastingTableSingle5e}
 */
export const dynamoCastingProgression = {
	2: { slots: 2, level: 1 },
	4: { slots: 3, level: 1 },
	7: { slots: 4, level: 2 },
	10: { slots: 5, level: 2 },
	13: { slots: 5, level: 3 },
	16: { slots: 6, level: 3 },
	19: { slots: 7, level: 4 }
};
