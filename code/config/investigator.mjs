/**
 * Initialize Investigator configuration changes.
 */
export function initialize() {
	dnd5e.registry.spellLists.register(dnd5e.settings.rulesVersion === "legacy"
		? "Compendium.mage-hand-press-core.journal.JournalEntry.mhpInvestigato5e.JournalEntryPage.mhpInvestigatorS"
		: "Compendium.mage-hand-press-core.journal.JournalEntry.mhpInvestigat55e.JournalEntryPage.mhpInvestigatorS"
	);
}
