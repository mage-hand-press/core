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
