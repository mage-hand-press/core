import BaseSettingData from "./base-setting.mjs";

const { BooleanField } = foundry.data.fields;

export default class WarmageSettingData extends BaseSettingData {

	/** @override */
	static LOCALIZATION_PREFIXES = ["MageHandPress.Setting.Warmage"];

	/* -------------------------------------------- */

	/** @override */
	static defineSchema() {
		return {
			customization: new BooleanField({ initial: true }),
			warmageEdge: new BooleanField({ initial: true })
		}
	}
}
