export function initialize() {
	dnd5e.registry.spellLists.register(game.settings.get("dnd5e", "rulesVersion") === "legacy"
		? "Compendium.mage-hand-press-core.journal.JournalEntry.mhpWarmage5e0000.JournalEntryPage.mhpWarmageSpellL"
		: "Compendium.mage-hand-press-core.journal.JournalEntry.mhpWarmage55e000.JournalEntryPage.mhpWarmageSpellL"
	);
	// TODO: Add support for including Wizard cantrips in Warmage list

	if ( !game.settings.get("mage-hand-press-core", "warmage").customization ) return;
	Object.assign(CONFIG.DND5E.featureTypes.class.subtypes, featureTypes.class);
}

/* -------------------------------------------- */
/*  System Config Changes                       */
/* -------------------------------------------- */

/** @inheritDoc */
const featureTypes = {
	class: {
		arcaneInitiation: "MageHandPress.Warmage.ArcaneInitiation",
		strategem: "MageHandPress.Warmage.Strategem",
		warmageTrick: "MageHandPress.Warmage.WarmageTrick"
	}
};

