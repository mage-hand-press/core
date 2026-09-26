import BaseSettingData from "./base-setting.mjs";

const { BooleanField } = foundry.data.fields;

export default class InvestigatorSettingData extends BaseSettingData {

	/** @override */
	static LOCALIZATION_PREFIXES = ["MageHandPress.Setting.Investigator"];

	/* -------------------------------------------- */

	/** @override */
	static defineSchema() {
		return {
			customization: new BooleanField({ initial: true })
		};
	}
}
