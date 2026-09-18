import BaseSettingData from "./base-setting.mjs";

const { BooleanField } = foundry.data.fields;

export default class AlchemistSettingData extends BaseSettingData {

	/** @override */
	static LOCALIZATION_PREFIXES = ["MageHandPress.Setting.Alchemist"];

	/* -------------------------------------------- */

	/** @override */
	static defineSchema() {
		return {
			customization: new BooleanField({ initial: true })
		};
	}

	/* -------------------------------------------- */
	/*  Helpers                                     */
	/* -------------------------------------------- */

	/** @override */
	customizeField(field, data) {

	}
}
