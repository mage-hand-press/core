import * as applications from "./applications/_module.mjs";
import * as automation from "./automation/_module.mjs";
import * as config from "./config/_module.mjs";
import * as customization from "./customization/_module.mjs";
import * as data from "./data/_module.mjs";
import * as settings from "./settings.mjs";
import * as spellcasting from "./spellcasting/_module.mjs";

Hooks.once("init", () => {
	const MODULE = game.modules.get("mage-hand-press-core");
	Object.assign(MODULE, { applications, automation, customization, data, spellcasting });

	settings.initialize();

	config.Warmage.initialize();

	automation.WarmageEdge.initialize();
	customization.Firearms.initialize();
	spellcasting.WarmageSpellcasting.initialize();
});

Hooks.once("i18nInit", () => {
	foundry.helpers.Localization.localizeDataModel(data.WarmageSettingData);
});
