export function initialize() {
	if ( !game.settings.get("mage-hand-press-core", "gunslinger").customization ) return;
	Object.assign(CONFIG.DND5E.featureTypes.class.subtypes, featureTypes.class);
	Object.assign(CONFIG.DND5E.weaponMasteries, weaponMasteries);

	if ( game.settings.get("dnd5e", "rulesVersion") === "modern" ) {
		Object.assign(CONFIG.DND5E.consumableTypes.ammo.subtypes, consumableTypesModern.ammo);
		Object.assign(CONFIG.DND5E.itemProperties, itemPropertiesModern);
		validPropertiesModern.weapon.forEach(p => CONFIG.DND5E.validProperties.weapon.add(p));
		Object.assign(CONFIG.DND5E.weaponIds, weaponIdsModern);
	} else {
		Object.assign(CONFIG.DND5E.consumableTypes.ammo.subtypes, consumableTypesLegacy.ammo);
		Object.assign(CONFIG.DND5E.itemProperties, itemPropertiesLegacy);
		validPropertiesLegacy.weapon.forEach(p => CONFIG.DND5E.validProperties.weapon.add(p));
		Object.assign(CONFIG.DND5E.weaponIds, weaponIdsLegacy);
		Object.assign(CONFIG.DND5E.weaponProficiencies, weaponProficiencies);
		Object.assign(CONFIG.DND5E.weaponProficienciesMap, weaponProficienciesMap);
		Object.assign(CONFIG.DND5E.weaponTypeMap, weaponTypeMap);
		Object.assign(CONFIG.DND5E.weaponTypes, weaponTypes); // TODO: Insert into order after ranged
	}
}

/* -------------------------------------------- */
/*  System Config Changes                       */
/* -------------------------------------------- */

/** @inheritDoc */
export const consumableTypesLegacy = {
	ammo: {
		blunderbussShot: "MageHandPress.Ammunition.BlunderbussShot",
		dragonBullet: "MageHandPress.Ammunition.BulletDragon",
		grenade: "MageHandPress.Ammunition.Grenade",
		harpoon: "MageHandPress.Ammunition.Harpoon",
		musketBall: "MageHandPress.Ammunition.MusketBall",
		rocket: "MageHandPress.Ammunition.Rocket",
		shell: "MageHandPress.Ammunition.Shell"
	}
};

/* -------------------------------------------- */

/** @inheritDoc */
export const consumableTypesModern = {
	ammo: {
		cannonball: "MageHandPress.Ammunition.Cannonball",
		flare: "MageHandPress.Ammunition.Flare",
		grenade: "MageHandPress.Ammunition.Grenade",
		shell: "MageHandPress.Ammunition.Shell",
		shot: "MageHandPress.Ammunition.Shot"
	}
};

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
export const weaponIdsLegacy = {
	antiMaterialRifle: "Compendium.mage-hand-press-core.equipment14.Item.mhpAntiMaterialR",
	antimatterCarbine: "Compendium.mage-hand-press-core.equipment14.Item.mhpAntimatterCa1",
	assaultRifle: "Compendium.mage-hand-press-core.equipment14.Item.mhpAssaultRifle1",
	assaultShotgun: "Compendium.mage-hand-press-core.equipment14.Item.mhpAssaultShotgu",
	aviaRaSunstaff: "Compendium.mage-hand-press-core.equipment14.Item.mhpAviaRaSunsta1",
	binaryGun: "Compendium.mage-hand-press-core.equipment14.Item.mhpBinaryGun0000",
	blitzCannon: "Compendium.mage-hand-press-core.equipment14.Item.mhpBlitzCannon01",
	blunderbuss: "Compendium.mage-hand-press-core.equipment14.Item.mhpBlunderbuss01",
	briefcaseGun: "Compendium.mage-hand-press-core.equipment14.Item.mhpBriefcaseGun0",
	concussionRifle: "Compendium.mage-hand-press-core.equipment14.Item.mhpConcussionRi1",
	diodeBeam: "Compendium.mage-hand-press-core.equipment14.Item.mhpDiodeBeam0000",
	doubleBarrelShotgun: "Compendium.mage-hand-press-core.equipment14.Item.mhpDoubleBarrel1",
	doubleHandgun: "Compendium.mage-hand-press-core.equipment14.Item.mhpDoubleHandgun",
	dragonRifle: "Compendium.mage-hand-press-core.equipment14.Item.mhpDragonRifle00",
	ducksFoot: "Compendium.mage-hand-press-core.equipment14.Item.mhpDucksFoot0000",
	experimentalCarbine: "Compendium.mage-hand-press-core.equipment14.Item.mhpExperimentalC",
	explosiveMagnum: "Compendium.mage-hand-press-core.equipment14.Item.mhpMagnumExplosi",
	flintlock: "Compendium.mage-hand-press-core.equipment14.Item.mhpFlintlock0000",
	fusionEmitter: "Compendium.mage-hand-press-core.equipment14.Item.mhpFusionEmitter",
	gatlingGun: "Compendium.mage-hand-press-core.equipment14.Item.mhpGatlingGun001",
	grenadeLauncher: "Compendium.mage-hand-press-core.equipment14.Item.mhpGrenadeLaunc1",
	handgun: "Compendium.mage-hand-press-core.equipment14.Item.mhpHandgun000001",
	hardlightBallista: "Compendium.mage-hand-press-core.equipment14.Item.mhpHardlightBall",
	harpoonGun: "Compendium.mage-hand-press-core.equipment14.Item.mhpHarpoonGun000",
	huntingRifle: "Compendium.mage-hand-press-core.equipment14.Item.mhpHuntingRifle1",
	hyperBlitzCannon: "Compendium.mage-hand-press-core.equipment14.Item.mhpHyperBlitzCan",
	ionCannon: "Compendium.mage-hand-press-core.equipment14.Item.mhpIonCannon0001",
	lightCannon: "Compendium.mage-hand-press-core.equipment14.Item.mhpLightCannon00",
	linearAccelerator: "Compendium.mage-hand-press-core.equipment14.Item.mhpLinearAcceler",
	magnum: "Compendium.mage-hand-press-core.equipment14.Item.mhpMagnum0000001",
	magnus: "Compendium.mage-hand-press-core.equipment14.Item.mhpMagnus0000001",
	multiRocketLauncher: "Compendium.mage-hand-press-core.equipment14.Item.mhpMultiRocketLa",
	musket: "Compendium.mage-hand-press-core.equipment14.Item.mhpMusket0000000",
	parlorGun: "Compendium.mage-hand-press-core.equipment14.Item.mhpParlorGun0001",
	phaser: "Compendium.mage-hand-press-core.equipment14.Item.mhpPhaser0000001",
	plasmaLauncher: "Compendium.mage-hand-press-core.equipment14.Item.mhpPlasmaLaunch1",
	psionicHelm: "Compendium.mage-hand-press-core.equipment14.Item.mhpPsionicHelm00",
	pumpShotgun: "Compendium.mage-hand-press-core.equipment14.Item.mhpPumpShotgun01",
	quadrupleBarrelShotgun: "Compendium.mage-hand-press-core.equipment14.Item.mhpQuadrupleBarr",
	recGun: "Compendium.mage-hand-press-core.equipment14.Item.mhpRECGun0000001",
	repeater: "Compendium.mage-hand-press-core.equipment14.Item.mhpRepeater00001",
	revolver: "Compendium.mage-hand-press-core.equipment14.Item.mhpRevolver00001",
	revolvingGrenadeLauncher: "Compendium.mage-hand-press-core.equipment14.Item.mhpRevolvingGren",
	rocketLauncher: "Compendium.mage-hand-press-core.equipment14.Item.mhpRocketLaunche",
	singularityEmitter: "Compendium.mage-hand-press-core.equipment14.Item.mhpSingularityEm",
	sniperRifle: "Compendium.mage-hand-press-core.equipment14.Item.mhpSniperRifle01",
	standardCarbine: "Compendium.mage-hand-press-core.equipment14.Item.mhpStandardCarb1",
	submachineGun: "Compendium.mage-hand-press-core.equipment14.Item.mhpSubmachineGu1",
	swarmPistol: "Compendium.mage-hand-press-core.equipment14.Item.mhpSwarmPistol01",
	volcanic: "Compendium.mage-hand-press-core.equipment14.Item.mhpVolcanic00000",
	volleyGun: "Compendium.mage-hand-press-core.equipment14.Item.mhpVolleyGun0000"
};

/* -------------------------------------------- */

/** @inheritDoc */
export const weaponIdsModern = {
	antimatterCarbine: "Compendium.mage-hand-press-core.equipment24.Item.mhpAntimatterCar",
	antimatterPistol: "Compendium.mage-hand-press-core.equipment24.Item.mhpAntimatterPis",
	assaultRifle: "Compendium.mage-hand-press-core.equipment24.Item.mhpAssaultRifle0",
	aviaRaSunstaff: "Compendium.mage-hand-press-core.equipment24.Item.mhpAviaRaSunstaf",
	blitzCannon: "Compendium.mage-hand-press-core.equipment24.Item.mhpBlitzCannon00",
	blunderbuss: "Compendium.mage-hand-press-core.equipment24.Item.mhpBlunderbuss00",
	boltCaster: "Compendium.mage-hand-press-core.equipment24.Item.mhpBoltCaster000",
	cannon: "Compendium.mage-hand-press-core.equipment24.Item.mhpCannon0000000",
	concussionRifle: "Compendium.mage-hand-press-core.equipment24.Item.mhpConcussionRif",
	doubleBarrelShotgun: "Compendium.mage-hand-press-core.equipment24.Item.mhpDoubleBarrelS",
	duelingLaser: "Compendium.mage-hand-press-core.equipment24.Item.mhpDuelingLaser0",
	flareGun: "Compendium.mage-hand-press-core.equipment24.Item.mhpFlareGun00000",
	gatlingGun: "Compendium.mage-hand-press-core.equipment24.Item.mhpGatlingGun000",
	grenadeLauncher: "Compendium.mage-hand-press-core.equipment24.Item.mhpGrenadeLaunch",
	handgun: "Compendium.mage-hand-press-core.equipment24.Item.mhpHandgun000000",
	huntingRifle: "Compendium.mage-hand-press-core.equipment24.Item.mhpHuntingRifle0",
	ionCannon: "Compendium.mage-hand-press-core.equipment24.Item.mhpIonCannon0000",
	magnum: "Compendium.mage-hand-press-core.equipment24.Item.mhpMagnum0000000",
	magnus: "Compendium.mage-hand-press-core.equipment24.Item.mhpMagnus0000000",
	parlorGun: "Compendium.mage-hand-press-core.equipment24.Item.mhpParlorGun0000",
	phaser: "Compendium.mage-hand-press-core.equipment24.Item.mhpPhaser0000000",
	plasmaLauncher: "Compendium.mage-hand-press-core.equipment24.Item.mhpPlasmaLaunche",
	pumpShotgun: "Compendium.mage-hand-press-core.equipment24.Item.mhpPumpShotgun00",
	recGun: "Compendium.mage-hand-press-core.equipment24.Item.mhpRECGun0000000",
	repeater: "Compendium.mage-hand-press-core.equipment24.Item.mhpRepeater00000",
	revolver: "Compendium.mage-hand-press-core.equipment24.Item.mhpRevolver00000",
	sniperRifle: "Compendium.mage-hand-press-core.equipment24.Item.mhpSniperRifle00",
	standardCarbine: "Compendium.mage-hand-press-core.equipment24.Item.mhpStandardCarbi",
	submachineGun: "Compendium.mage-hand-press-core.equipment24.Item.mhpSubmachineGun",
	swarmPistol: "Compendium.mage-hand-press-core.equipment24.Item.mhpSwarmPistol00"
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
export const weaponProficiencies = {
	exo: "MageHandPress.Weapon.ExoticProficiency"
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
