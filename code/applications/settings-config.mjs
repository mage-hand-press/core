export default class SettingsConfig extends dnd5e.applications.settings.BaseSettingsConfig {

	/** @override */
	static DEFAULT_OPTIONS = {
		form: {
			handler: SettingsConfig.#onCommitChanges
		},
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
	/*  Event Listeners and Handlers                */
	/* -------------------------------------------- */

	// TODO: Remove this whole method once dnd5e 6.0 is available
	/** @override */
	static async #onCommitChanges(event, form, formData) {
		let requiresClientReload = false;
		let requiresWorldReload = false;
		for ( const [key, value] of Object.entries(foundry.utils.expandObject(formData.object)) ) {
			const setting = game.settings.settings.get(`${this.options.namespace}.${key}`);
			const current = game.settings.get(this.options.namespace, key, { document: true });
			const prior = current?._source?.value ?? current;
			const updated = await game.settings.set(this.options.namespace, key, value, { document: true });
			if ( prior === (updated?._source?.value ?? updated) ) continue;
			requiresClientReload ||= (setting.scope !== "world") && setting.requiresReload;
			requiresWorldReload ||= (setting.scope === "world") && setting.requiresReload;
		}
		if ( requiresClientReload || requiresWorldReload ) {
			return foundry.applications.settings.SettingsConfig.reloadConfirm({ world: requiresWorldReload });
		}
	}

	/* -------------------------------------------- */
	/*  Factory Methods                             */
	/* -------------------------------------------- */

	/**
	 * Create a version of this config for a specific setting.
	 * @param {string} setting - Name of a setting which has a type that extends BaseSettingData.
	 * @returns {typeof SettingsConfig}
	 */
	static for(setting) {
		return class ExtendedSettingsConfig extends SettingsConfig {
			static DEFAULT_OPTIONS = { setting };
		}
	}
}
