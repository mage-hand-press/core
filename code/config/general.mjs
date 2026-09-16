/**
 * Initialize General configuration changes.
 */
export function initialize() {
	Object.assign(CONFIG.DND5E.itemProperties, itemProperties);
	validProperties.spell.forEach(p => CONFIG.DND5E.validProperties.spell.add(p));

	if ( game.settings.get("mage-hand-press-core", "auxiliaryLevels") ) {
		CONFIG.DND5E.itemProperties.auxiliary = { label: "MageHandPress.AuxiliaryLevel.Label" };
		CONFIG.DND5E.validProperties.class.add("auxiliary");
	}

	if ( game.settings.get("mage-hand-press-core", "monstrousGrafts") ) {
		Object.assign(CONFIG.DND5E.equipmentTypes, graftEquipmentTypes);
		Object.assign(CONFIG.DND5E.miscEquipmentTypes, graftMiscEquipmentTypes);
	}

	const craftsmanCustomization = false;
	const gunslingerCustomization = game.settings.get("mage-hand-press-core", "gunslinger").customization;
	const legacyRules = game.settings.get("dnd5e", "rulesVersion") === "legacy";
	const valdasActive = game.modules.get("mage-hand-press-valdas-spire-of-secrets")?.active;
	if ( (craftsmanCustomization || gunslingerCustomization || valdasActive) && legacyRules ) {
		Object.assign(CONFIG.DND5E.weaponProficiencies, weaponProficiencies);
		Object.assign(CONFIG.DND5E.weaponProficienciesMap, weaponProficienciesMap);
		Object.assign(CONFIG.DND5E.weaponTypeMap, weaponTypeMap);

		const weaponEntries = Object.entries(CONFIG.DND5E.weaponTypes);
		if ( craftsmanCustomization || valdasActive ) weaponEntries.splice(
			weaponEntries.findIndex(t => t[0] === "martialR") + 1, 0, ...Object.entries(weaponTypes)
		);
		for ( const d of Object.entries(weaponTypesFirearm) ) {
			let idx = weaponEntries.findIndex(t => t[0] === d[0].replace("Firearm", "R"));
			if ( idx === -1 ) idx = weaponEntries.findIndex(t => t[0] === "natural");
			else idx++;
			weaponEntries.splice(idx, 0, d);
		}
		CONFIG.DND5E.weaponTypes = Object.fromEntries(weaponEntries);
	}
}

/* -------------------------------------------- */
/*  General Config                              */
/* -------------------------------------------- */

/** @inheritDoc */
const itemProperties = {
	chronomancy: {
		label: "MageHandPress.Properties.Chronomancy",
		abbreviation: "MageHandPress.Properties.ChronomancyAbbr",
		icon: "",
		isTag: true
	}
};

/* -------------------------------------------- */

/** @inheritDoc */
const validProperties = {
	spell: ["chronomancy"]
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
	exoticMelee: "exo",
	exoticRanged: "exo",
	exoticFirearm: "exo"
};

/* -------------------------------------------- */

/** @inheritDoc */
export const weaponTypeMap = {
	simpleFirearm: "ranged",
	martialFirearm: "ranged",
	exoticMelee: "melee",
	exoticRanged: "ranged",
	exoticFirearm: "ranged"
};

/* -------------------------------------------- */

/** @inheritDoc */
export const weaponTypes = {
	exoticMelee: "MageHandPress.Weapon.ExoticMelee",
	exoticRanged: "MageHandPress.Weapon.ExoticRanged"
};

/* -------------------------------------------- */

/** @inheritDoc */
export const weaponTypesFirearm = {
	simpleFirearm: "MageHandPress.Weapon.FirearmSimple",
	martialFirearm: "MageHandPress.Weapon.FirearmMartial",
	exoticFirearm: "MageHandPress.Weapon.FirearmExotic"
};

/* -------------------------------------------- */
/*  Grafts Config                               */
/* -------------------------------------------- */

/**
 * Slots where grafts can be added to an actor.
 * @enum {{ label: string }}
 */
export const graftBodySlots = {
	any: {
		label: "MageHandPress.MonstrousGraft.Slot.Any"
	},
	arms: {
		label: "MageHandPress.MonstrousGraft.Slot.Arms"
	},
	external: {
		label: "MageHandPress.MonstrousGraft.Slot.External"
	},
	head: {
		label: "MageHandPress.MonstrousGraft.Slot.Head"
	},
	internal: {
		label: "MageHandPress.MonstrousGraft.Slot.Internal"
	},
	legs: {
		label: "MageHandPress.MonstrousGraft.Slot.Legs"
	}
};

/* -------------------------------------------- */

/** @inheritDoc */
const graftEquipmentTypes = {
	monstrousGraft: "MageHandPress.MonstrousGraft.Label"
};

/* -------------------------------------------- */

/** @inheritDoc */
export const graftMiscEquipmentTypes = {
	monstrousGraft: "MageHandPress.MonstrousGraft.Label"
};
