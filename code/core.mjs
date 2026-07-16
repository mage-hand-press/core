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

	config.Gunslinger.initialize();
	config.Warmage.initialize();

	customization.Firearms.initialize();
	customization.GunslingerDeeds.initialize();
	customization.ScatterProperty.initialize();
	customization.SpellEmbeds.initialize();

	automation.MankillerOverkill.initialize();
	automation.WarmageEdge.initialize();

	spellcasting.WarmageSpellcasting.initialize();
});

Hooks.once("i18nInit", () => {
	foundry.helpers.Localization.localizeDataModel(data.GunslingerSettingData);
	foundry.helpers.Localization.localizeDataModel(data.WarmageSettingData);
});

// TODO: Automatically set compendium browser filtering based on rules version
