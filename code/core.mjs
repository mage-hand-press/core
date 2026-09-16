import * as applications from "./applications/_module.mjs";
import * as automation from "./automation/_module.mjs";
import * as config from "./config/_module.mjs";
import * as customization from "./customization/_module.mjs";
import * as data from "./data/_module.mjs";
import * as redirects from "./redirects.mjs";
import * as settings from "./settings.mjs";
import * as spellcasting from "./spellcasting/_module.mjs";

Hooks.once("init", () => {
	const MODULE = game.modules.get("mage-hand-press-core");
	Object.assign(MODULE, { applications, automation, customization, data, spellcasting });

	redirects.initialize();
	settings.initialize();

	CONFIG.MAGEHANDPRESS ??= {};
	Object.assign(CONFIG.MAGEHANDPRESS, {
		graftBodySlots: config.General.graftBodySlots
	});
	config.General.initialize();
	config.Gunslinger.initialize();
	config.Warmage.initialize();

	customization.AuxiliaryLevels.initialize();
	customization.Firearms.initialize();
	customization.GunslingerDeeds.initialize();
	customization.ScatterProperty.initialize();
	customization.SpellTags.initialize();

	automation.MankillerOverkill.initialize();
	automation.MonstrousGrafts.initialize();
	automation.WarmageEdge.initialize();

	spellcasting.WarmageSpellcasting.initialize();

	foundry.applications.apps.DocumentSheetConfig.registerSheet(
		JournalEntry, "mage-hand-press-core", applications.MageHandPressJournalEntrySheet,
		{ label: "MageHandPress.Sheet.JournalEntry" }
	);
});

Hooks.once("i18nInit", () => {
	foundry.helpers.Localization.localizeDataModel(data.GunslingerSettingData);
	foundry.helpers.Localization.localizeDataModel(data.WarmageSettingData);
});

Hooks.on("renderCompendiumDirectory", (application, element, context, options) => {
	for ( const pack of game.packs ) {
		if ( !pack.metadata.flags?.["mage-hand-press-core"]?.invisible ) continue;
		const el = element.querySelector(`[data-pack="${pack.metadata.id}"]`);
		if ( el ) el.hidden = true;
	}
});

// TODO: Automatically set compendium browser filtering based on rules version
