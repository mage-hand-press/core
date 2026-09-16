export default class SettingsConfig extends dnd5e.applications.settings.BaseSettingsConfig {

	/** @override */
	static DEFAULT_OPTIONS = {
		namespace: "mage-hand-press-core",
		setting: null
	};

	/* -------------------------------------------- */
	/*  Properties                                  */
	/* -------------------------------------------- */

	/** @override */
	get title() {
		return _loc(game.settings.menus.get(`${this.options.namespace}.${this.options.setting}Dialog`)?.label ?? "");
	}

	/* -------------------------------------------- */
	/*  Rendering                                   */
	/* -------------------------------------------- */

	/** @inheritDoc */
	async _preparePartContext(partId, context, options) {
		context = await super._preparePartContext(partId, context, options);
		const data = game.settings.get(this.options.namespace, this.options.setting);
		context.fields.push(...data.generateFields(data._source, { prefix: `${this.options.setting}.` }));
		return context;
	}

	/* -------------------------------------------- */
	/*  Factory Methods                             */
	/* -------------------------------------------- */

	/**
	 * Create a version of this config for a specific setting.
	 * @param {string} setting  Name of a setting which has a type that extends BaseSettingData.
	 * @returns {typeof SettingsConfig}
	 */
	static for(setting) {
		return class ExtendedSettingsConfig extends SettingsConfig {
			static DEFAULT_OPTIONS = { setting };
		};
	}
}
