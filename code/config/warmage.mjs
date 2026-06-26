export function initialize() {
	if ( !game.settings.get("mage-hand-press-core", "warmage").customization ) return;
	Object.assign(CONFIG.DND5E.featureTypes.class.subtypes, featureTypes.class);
}

/* -------------------------------------------- */
/*  System Config Changes                       */
/* -------------------------------------------- */

/** @inheritDoc */
export const featureTypes = {
	class: {
		arcaneInitiation: "MageHandPress.Warmage.ArcaneInitiation",
		strategem: "MageHandPress.Warmage.Strategem",
		warmageTrick: "MageHandPress.Warmage.WarmageTrick"
	}
};

