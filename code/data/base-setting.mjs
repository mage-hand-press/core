const PATH = Symbol("path");
const SCHEMA = Symbol("schema");

export default class BaseSettingData extends foundry.abstract.DataModel {

	/* -------------------------------------------- */
	/*  Helpers                                     */
	/* -------------------------------------------- */

	/**
	 * Perform customization on field before it is displayed in the form.
	 * @param {DataField} field - Data field being added to the form.
	 * @param {object} data - Data passed to template to render the field in the form.
	 * @returns {false|void} - Return `false` to prevent field from rendering.
	 */
	customizeField(field, data) {}

	/* -------------------------------------------- */

	/**
	 * Recursively build up fields for behavior data models.
	 * @param {object} source - Source data for the activity behavior.
	 * @param {object} [options={}]
	 * @param {string} [options.prefix=""] - Prefix added before each field's name.
	 * @yields object
	 */
	*generateFields(source, { prefix="", ...options }={}) {
		for ( const field of Object.values(options[SCHEMA] ?? this.constructor.schema.fields) ) {
			const path = `${options[PATH] ?? ""}${field.name}`;
			if ( field.constructor.hasFormSupport ) {
				const data = { field, name: `${prefix}${path}`, value: foundry.utils.getProperty(source, path) };
				if ( field instanceof foundry.data.fields.BooleanField ) {
					data.input = dnd5e.applications.fields.createCheckboxInput;
				}
				if ( this.customizeField(field, data) !== false ) yield data;
			} else if ( field instanceof foundry.data.fields.SchemaField ) {
				yield* this.generateFields(source, { prefix, [PATH]: `${path}.`, [SCHEMA]: field.fields });
			}
		}
	}
}
