import { firearmEras } from "../config/gunslinger.mjs";
import BaseSettingData from "./base-setting.mjs";

const { BooleanField, SetField, StringField } = foundry.data.fields;

export default class GunslingerSettingData extends BaseSettingData {

	/** @override */
	static LOCALIZATION_PREFIXES = ["MageHandPress.Setting.Gunslinger"];

	/* -------------------------------------------- */

	/** @override */
	static defineSchema() {
		return {
			customization: new BooleanField({ initial: true }),
			eras: new SetField(new StringField(), { initial: ["renaissance", "industrialAge", "modern", "futuristic"] }),
			mankillerOverkill: new BooleanField({ initial: true })
		}
	}

	/* -------------------------------------------- */
	/*  Helpers                                     */
	/* -------------------------------------------- */

	/** @override */
	customizeField(field, data) {
		if ( field.name === "eras" ) {
			data.options = Object.entries(firearmEras).map(([value, { label }]) => ({ value, label: _loc(label) }));
		}
	}
}
