import BaseSettingData from "./base-setting.mjs";

const { BooleanField } = foundry.data.fields;

export default class GunslingerSettingData extends BaseSettingData {

	/** @override */
	static LOCALIZATION_PREFIXES = ["MageHandPress.Setting.Gunslinger"];

	/* -------------------------------------------- */

	/** @override */
	static defineSchema() {
		return {
			customization: new BooleanField({ initial: true })
			// TODO: Era selection, include only base weapons & creeds from selected era
		}
	}
}
