export function initialize() {
	if ( !game.settings.get("mage-hand-press-core", "auxiliaryLevels") ) return;
	CONFIG.DND5E.itemProperties.auxiliary = { label: "MageHandPress.AuxiliaryLevel.Label" };
	CONFIG.DND5E.validProperties.class.add("auxiliary");
}

/* -------------------------------------------- */

// TODO: Prevent auxiliary levels from increasing past a single level
