import SettingsConfig from "./applications/settings-config.mjs";
import * as SettingsData from "./data/_module.mjs";

/**
 * Initialize settings.
 */
export function initialize() {
	// General
	game.settings.register("mage-hand-press-core", "auxiliaryLevels", {
		name: "MageHandPress.Setting.AuxiliaryLevels.name",
		hint: "MageHandPress.Setting.AuxiliaryLevels.hint",
		scope: "world",
		config: true,
		default: true,
		type: Boolean,
		requiresReload: true
	});

	game.settings.register("mage-hand-press-core", "firearmModifier", {
		name: "MageHandPress.Setting.FirearmModifier.name",
		hint: "MageHandPress.Setting.FirearmModifier.hint",
		scope: "world",
		config: true,
		default: true,
		type: Boolean,
		requiresReload: true
	});

	game.settings.register("mage-hand-press-core", "monstrousGrafts", {
		name: "MageHandPress.Setting.MonstrousGrafts.name",
		hint: "MageHandPress.Setting.MonstrousGrafts.hint",
		scope: "world",
		config: true,
		default: true,
		type: Boolean,
		requiresReload: true
	});

	// Alchemist
	game.settings.registerMenu("mage-hand-press-core", "alchemistDialog", {
		name: "MageHandPress.Setting.Alchemist.name",
		label: "MageHandPress.Setting.Alchemist.label",
		hint: "MageHandPress.Setting.Alchemist.hint",
		type: SettingsConfig.for("alchemist")
	});

	game.settings.register("mage-hand-press-core", "alchemist", {
		name: "MageHandPress.Setting.Alchemist.name",
		scope: "world",
		config: false,
		type: SettingsData.AlchemistSettingData,
		requiresReload: true
	});

	// Gunslinger
	game.settings.registerMenu("mage-hand-press-core", "gunslingerDialog", {
		name: "MageHandPress.Setting.Gunslinger.name",
		label: "MageHandPress.Setting.Gunslinger.label",
		hint: "MageHandPress.Setting.Gunslinger.hint",
		type: SettingsConfig.for("gunslinger")
	});

	game.settings.register("mage-hand-press-core", "gunslinger", {
		name: "MageHandPress.Setting.Gunslinger.name",
		scope: "world",
		config: false,
		type: SettingsData.GunslingerSettingData,
		requiresReload: true
	});

	// Investigator
	game.settings.registerMenu("mage-hand-press-core", "investigatorDialog", {
		name: "MageHandPress.Setting.Investigator.name",
		label: "MageHandPress.Setting.Investigator.label",
		hint: "MageHandPress.Setting.Investigator.hint",
		type: SettingsConfig.for("investigator")
	});

	game.settings.register("mage-hand-press-core", "investigator", {
		name: "MageHandPress.Setting.Investigator.name",
		scope: "world",
		config: false,
		type: SettingsData.InvestigatorSettingData,
		requiresReload: true
	});

	// Warmage
	game.settings.registerMenu("mage-hand-press-core", "warmageDialog", {
		name: "MageHandPress.Setting.Warmage.name",
		label: "MageHandPress.Setting.Warmage.label",
		hint: "MageHandPress.Setting.Warmage.hint",
		type: SettingsConfig.for("warmage")
	});

	game.settings.register("mage-hand-press-core", "warmage", {
		name: "MageHandPress.Setting.Warmage.name",
		scope: "world",
		config: false,
		type: SettingsData.WarmageSettingData,
		requiresReload: true
	});
}
