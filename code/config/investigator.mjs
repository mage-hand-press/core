/**
 * Initialize Investigator configuration changes.
 */
export function initialize() {
	dnd5e.registry.spellLists.register(dnd5e.settings.rulesVersion === "legacy"
		? "Compendium.mage-hand-press-core.journal.JournalEntry.mhpInvestigato5e.JournalEntryPage.mhpInvestigatorS"
		: "Compendium.mage-hand-press-core.journal.JournalEntry.mhpInvestigat55e.JournalEntryPage.mhpInvestigatorS"
	);

	if ( !game.settings.get("mage-hand-press-core", "investigator").customization ) return;

	if ( dnd5e.settings.rulesVersion === "legacy" ) {
		Object.assign(CONFIG.DND5E.itemProperties, itemPropertiesLegacy);
		validPropertiesLegacy.spell.forEach(p => CONFIG.DND5E.validProperties.spell.add(p));
	}
}

/* -------------------------------------------- */
/*  General Config                              */
/* -------------------------------------------- */

/** @inheritDoc */
const itemPropertiesLegacy = {
	truenaming: {
		label: "MageHandPress.Properties.Truenaming",
		abbreviation: "MageHandPress.Properties.TruenamingAbbr",
		isTag: true
	}
};

/* -------------------------------------------- */

/** @inheritDoc */
const validPropertiesLegacy = {
	spell: ["truenaming"]
};
