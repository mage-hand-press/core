import SettingsConfig from "./applications/settings-config.mjs";
import * as SettingsData from "./data/_module.mjs";

export function initialize() {
	// General
	game.settings.register("mage-hand-press-core", "firearmModifier", {
		name: "MageHandPress.Setting.FirearmModifier.name",
		hint: "MageHandPress.Setting.FirearmModifier.hint",
		scope: "world",
		config: true,
		default: true,
		type: Boolean,
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
