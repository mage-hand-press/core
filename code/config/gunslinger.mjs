export function initialize() {
	if ( !game.settings.get("mage-hand-press-core", "gunslinger").customization ) return;
	Object.assign(CONFIG.DND5E.featureTypes.class.subtypes, featureTypes.class);
	Object.assign(CONFIG.DND5E.weaponMasteries, weaponMasteries);
	Object.assign(CONFIG.DND5E.weaponProficienciesMap, weaponProficienciesMap);
	Object.assign(CONFIG.DND5E.weaponTypeMap, weaponTypeMap);
	Object.assign(CONFIG.DND5E.weaponTypes, weaponTypes); // TODO: Insert into order after ranged

	if ( game.settings.get("dnd5e", "rulesVersion") === "modern" ) {
		Object.assign(CONFIG.DND5E.itemProperties, itemPropertiesModern);
		validPropertiesModern.weapon.forEach(p => CONFIG.DND5E.validProperties.weapon.add(p));
	} else {
		Object.assign(CONFIG.DND5E.itemProperties, itemPropertiesLegacy);
		validPropertiesLegacy.weapon.forEach(p => CONFIG.DND5E.validProperties.weapon.add(p));
	}
}

/* -------------------------------------------- */
/*  System Config Changes                       */
/* -------------------------------------------- */

/** @inheritDoc */
export const featureTypes = {
	class: {
		gunslingerDeed: "MageHandPress.Gunslinger.Deed"
	}
};

/* -------------------------------------------- */

/** @inheritDoc */
export const itemPropertiesLegacy = {
	automatic: {
		label: "MageHandPress.Properties.Automatic",
		reference: "Compendium.mage-hand-press-core.journal.JournalEntry.mhpEmbeds5e00000.JournalEntryPage.mhpAutomatic0000"
	},
	blaster: {
		label: "MageHandPress.Properties.Blaster",
		reference: "Compendium.mage-hand-press-core.journal.JournalEntry.mhpEmbeds5e00000.JournalEntryPage.mhpBlaster000000"
	},
	concealable: {
		label: "MageHandPress.Properties.Concealable",
		reference: "Compendium.mage-hand-press-core.journal.JournalEntry.mhpEmbeds5e00000.JournalEntryPage.mhpConcealable00"
	},
	dry: {
		label: "MageHandPress.Properties.Dry",
		reference: "Compendium.mage-hand-press-core.journal.JournalEntry.mhpEmbeds5e00000.JournalEntryPage.mhpDry0000000000"
	},
	explosive: {
		label: "MageHandPress.Properties.Explosive",
		reference: "Compendium.mage-hand-press-core.journal.JournalEntry.mhpEmbeds5e00000.JournalEntryPage.mhpExplosive0000"
	},
	foregrip: {
		label: "MageHandPress.Properties.Foregrip",
		reference: "Compendium.mage-hand-press-core.journal.JournalEntry.mhpEmbeds5e00000.JournalEntryPage.mhpForegrip00000"
	},
	heat: {
		label: "MageHandPress.Properties.Heat",
		reference: "Compendium.mage-hand-press-core.journal.JournalEntry.mhpEmbeds5e00000.JournalEntryPage.mhpHeat000000000"
	},
	misfire: {
		label: "MageHandPress.Properties.Misfire",
		reference: "Compendium.mage-hand-press-core.journal.JournalEntry.mhpEmbeds5e00000.JournalEntryPage.mhpMisfire000000"
	},
	mounted: {
		label: "MageHandPress.Properties.Mounted",
		reference: "Compendium.mage-hand-press-core.journal.JournalEntry.mhpEmbeds5e00000.JournalEntryPage.mhpMounted000000"
	},
	nonlethal: {
		label: "MageHandPress.Properties.Nonlethal",
		reference: "Compendium.mage-hand-press-core.journal.JournalEntry.mhpEmbeds5e00000.JournalEntryPage.mhpNonlethal0000"
	},
	overheat: {
		label: "MageHandPress.Properties.Overheat",
		reference: "Compendium.mage-hand-press-core.journal.JournalEntry.mhpEmbeds5e00000.JournalEntryPage.mhpOverheat00000"
	},
	scatter: {
		label: "MageHandPress.Properties.Scatter",
		reference: "Compendium.mage-hand-press-core.journal.JournalEntry.mhpEmbeds5e00000.JournalEntryPage.mhpScatter000000"
	},
	sighted: {
		label: "MageHandPress.Properties.Sighted",
		reference: "Compendium.mage-hand-press-core.journal.JournalEntry.mhpEmbeds5e00000.JournalEntryPage.mhpSighted000000"
	},
	twinshot: {
		label: "MageHandPress.Properties.Twinshot",
		reference: "Compendium.mage-hand-press-core.journal.JournalEntry.mhpEmbeds5e00000.JournalEntryPage.mhpTwinshot00000"
	}
};

/* -------------------------------------------- */

/** @inheritDoc */
export const validPropertiesLegacy = {
	weapon: [
		"automatic", "blaster", "concealable", "dry", "explosive", "foregrip", "heat",
		"misfire", "mounted", "nonlethal", "overheat", "scatter", "sighted", "twinshot"
	]
};

/* -------------------------------------------- */

/** @inheritDoc */
export const itemPropertiesModern = {
	blaster: {
		label: "MageHandPress.Properties.Blaster",
		reference: "Compendium.mage-hand-press-core.journal.JournalEntry.mhpEmbeds55e0000.JournalEntryPage.mhpBlaster000000"
	},
	cooldown: {
		label: "MageHandPress.Properties.Cooldown",
		reference: "Compendium.mage-hand-press-core.journal.JournalEntry.mhpEmbeds55e0000.JournalEntryPage.mhpCooldown00000"
	},
	recoil: {
		label: "MageHandPress.Properties.Recoil",
		reference: "Compendium.mage-hand-press-core.journal.JournalEntry.mhpEmbeds55e0000.JournalEntryPage.mhpRecoil0000000"
	}
};

/* -------------------------------------------- */

/** @inheritDoc */
export const validPropertiesModern = {
	weapon: ["blaster", "cooldown", "recoil"]
};

/* -------------------------------------------- */

/** @inheritDoc */
export const weaponMasteries = {
	automatic: {
		label: "MageHandPress.Mastery.Automatic",
		reference: "Compendium.mage-hand-press-core.journal.JournalEntry.mhpEmbeds55e0000.JournalEntryPage.mhpAutomatic0000"
	},
	bludgeon: {
		label: "MageHandPress.Mastery.Bludgeon",
		reference: "Compendium.mage-hand-press-core.journal.JournalEntry.mhpEmbeds55e0000.JournalEntryPage.mhpBludgeon00000"
	},
	explode: {
		label: "MageHandPress.Mastery.Explode",
		reference: "Compendium.mage-hand-press-core.journal.JournalEntry.mhpEmbeds55e0000.JournalEntryPage.mhpExplode000000"
	},
	jolt: {
		label: "MageHandPress.Mastery.Jolt",
		reference: "Compendium.mage-hand-press-core.journal.JournalEntry.mhpEmbeds55e0000.JournalEntryPage.mhpJolt000000000"
	},
	mounted: {
		label: "MageHandPress.Mastery.Mounted",
		reference: "Compendium.mage-hand-press-core.journal.JournalEntry.mhpEmbeds55e0000.JournalEntryPage.mhpMounted000000"
	},
	overheat: {
		label: "MageHandPress.Mastery.Overheat",
		reference: "Compendium.mage-hand-press-core.journal.JournalEntry.mhpEmbeds55e0000.JournalEntryPage.mhpOverheat00000"
	},
	scatter: {
		label: "MageHandPress.Mastery.Scatter",
		reference: "Compendium.mage-hand-press-core.journal.JournalEntry.mhpEmbeds55e0000.JournalEntryPage.mhpScatter000000"
	},
	sighted: {
		label: "MageHandPress.Mastery.Sighted",
		reference: "Compendium.mage-hand-press-core.journal.JournalEntry.mhpEmbeds55e0000.JournalEntryPage.mhpSighted000000"
	}
};

/* -------------------------------------------- */

/** @inheritDoc */
export const weaponProficienciesMap = {
	simpleFirearm: "sim",
	martialFirearm: "mar",
	exoticFirearm: "exo"
};

/* -------------------------------------------- */

/** @inheritDoc */
export const weaponTypeMap = {
	simpleFirearm: "ranged",
	martialFirearm: "ranged",
	exoticFirearm: "ranged"
};

/* -------------------------------------------- */

/** @inheritDoc */
export const weaponTypes = {
	simpleFirearm: "MageHandPress.Weapon.FirearmSimple",
	martialFirearm: "MageHandPress.Weapon.FirearmMartial",
	exoticFirearm: "MageHandPress.Weapon.FirearmExotic"
};
