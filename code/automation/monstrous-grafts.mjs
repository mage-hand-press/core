const { BooleanField, SetField, StringField } = foundry.data.fields;

export function initialize() {
	if ( game.settings.get("mage-hand-press-core", "monstrousGrafts") ) {
		Hooks.once("i18nInit", addGraftFlags);
		Hooks.on("renderItemSheet5e", renderGraftSheet);
	}
}

/* -------------------------------------------- */
/*  Configuration                               */
/* -------------------------------------------- */

/**
 * Add graft character flags.
 */
function addGraftFlags() {
	for ( const [key, slot] of Object.entries(CONFIG.MAGEHANDPRESS.graftBodySlots) ) {
		if ( key === "any" ) continue;
		CONFIG.DND5E.characterFlags[`${key}GraftSlots`] ??= {
			name: game.i18n.localize(slot.label),
			section: game.i18n.localize("MageHandPress.MonstrousGraft.SlotCount"),
			type: Number,
			placeholder: 1
		};
	}
}

/* -------------------------------------------- */
/*  Rendering                                   */
/* -------------------------------------------- */

/**
 * Display graft options on equipment & weapon sheets.
 * @param {ItemSheet5e} app
 * @param {HTMLElement} html
 * @param {ApplicationRenderContext} context
 * @param {HandlebarsRenderOptions} options
 */
function renderGraftSheet(app, html, context, options) {
	const item = app.document;
	if ( (item.type !== "equipment") && (item.type !== "weapon") ) return;

	const fields = [];

	const graftSlot = item.flags["mage-hand-press-core"]?.graftSlot
		?? item.flags["mage-hand-press-dark-matter"]?.graftSlot ?? {};
	const isGraft = (item.system.type.value === "monstrousGraft") || !!graftSlot.valid;
	if ( !isGraft ) return;

	const slotOptions = Object.entries(CONFIG.MAGEHANDPRESS.graftBodySlots)
		.map(([value, { label }]) => ({ value, label: game.i18n.localize(label) }));
	fields.push(
		new StringField({ required: true, blank: false }).toFormGroup({
			label: game.i18n.localize("MageHandPress.MonstrousGraft.FIELDS.valid.label")
		}, {
			name: "flags.mage-hand-press-core.graftSlot.valid",
			value: graftSlot.valid,
			options: slotOptions,
			disabled: !context.editable
		})
	);

	if ( item.isEmbedded ) {
		if ( graftSlot.valid === "any" ) fields.push(
			new StringField({ required: true, blank: false }).toFormGroup({
				label: game.i18n.localize("MageHandPress.MonstrousGraft.FIELDS.current.label")
			}, {
				name: "flags.mage-hand-press-core.graftSlot.current",
				value: graftSlot.current ?? "arms",
				options: slotOptions.filter(s => s.value !== "any"),
				disabled: !context.editable
			})
		);

		fields.push(
			new BooleanField().toFormGroup({
				label: game.i18n.localize("MageHandPress.MonstrousGraft.FIELDS.free.label"),
				hint: game.i18n.localize("MageHandPress.MonstrousGraft.FIELDS.free.hint")
			}, {
				name: "flags.mage-hand-press-corer.graftSlot.free",
				value: graftSlot.free,
				disabled: !context.editable,
				input: dnd5e.applications.fields.createCheckboxInput
			})
		);
	}

	if ( !fields.length ) return;

	const fieldset = document.createElement("fieldset");
	const legend = document.createElement("legend");
	legend.innerText = game.i18n.localize("MageHandPress.MonstrousGraft.Details");
	fieldset.replaceChildren(legend, ...fields);

	const insertAfter = html.querySelector("[data-application-part=details] fieldset");
	if ( insertAfter ) insertAfter.after(fieldset);
}
