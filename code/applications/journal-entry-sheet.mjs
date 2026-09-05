/**
 * Custom journal entry sheet to support new styling.
 */
export default class MageHandPressJournalEntrySheet extends dnd5e.applications.journal.JournalEntrySheet5e {
	static DEFAULT_OPTIONS = {
		classes: ["mage-hand-press-journal"]
	};

	/* -------------------------------------------- */

	/** @inheritDoc */
	_initializeApplicationOptions(options) {
		options = super._initializeApplicationOptions(options);
		const cssClasses = options.document.getFlag("mage-hand-press-core", "cssClasses");
		if ( cssClasses?.length ) options.classes.push(...cssClasses);
		return options;
	}
}
