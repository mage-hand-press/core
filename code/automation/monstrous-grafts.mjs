const { BooleanField, StringField } = foundry.data.fields;

const { CharacterActorSheet } = dnd5e.applications.actor;
const { formatNumber } = dnd5e.utils;

/**
 * Initialize Monstrous Grafts actor & item sheet rendering.
 */
export function initialize() {
	if ( game.settings.get("mage-hand-press-core", "monstrousGrafts") ) {
		Hooks.once("i18nInit", addGraftFlags);
		Hooks.on("preRenderCharacterActorSheet", preRenderCharacterActorSheet);
		Hooks.on("dnd5e.prepareSheetContext", prepareSheetContext);
		Hooks.on("renderCharacterActorSheet", renderCharacterActorSheet);
		Hooks.on("renderItemSheet5e", renderItemSheet5e);

		CharacterActorSheet.PARTS = {
			...CharacterActorSheet.PARTS,
			grafts: {
				container: { classes: ["tab-body"], id: "tabs" },
				template: "modules/mage-hand-press-core/templates/character-grafts.hbs",
				templates: [
					"systems/dnd5e/templates/inventory/inventory.hbs", "systems/dnd5e/templates/inventory/activity.hbs"
				],
				scrollable: [""]
			}
		};
		CharacterActorSheet.TABS = CharacterActorSheet.TABS.toSpliced(2, 0, {
			tab: "grafts", label: "MageHandPress.MonstrousGraft.Tab", icon: "fa-solid fa-user-injured",
			condition: doc => {
				if ( doc.getFlag("mage-hand-press-core", "showGrafts") ) return true;
				return !!doc.items.find(e => isGraft(e));
			}
		});
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
 * Add a tab to the character & NPC sheets to show grafts.
 * @param {CharacterActorSheet} sheet
 * @param {object} context
 * @param {object} options
 */
function preRenderCharacterActorSheet(sheet, context, options) {
	// Prepare the graft slots
	const flags = sheet.document.flags.dnd5e ?? {};
	context.graftSlots = Object.keys(CONFIG.MAGEHANDPRESS.graftBodySlots).reduce((obj, key) => {
		if ( key !== "any" ) obj[key] = {
			max: flags[`${key}GraftSlots`] ?? 1,
			occupied: 0,
			total: 0
		};
		return obj;
	}, {});

	// Move grafts from inventory to grafts tab, add additional context
	context.itemCategories.grafts ??= [];
	for ( const item of context.itemCategories.inventory ?? [] ) {
		if ( !isGraft(item) ) continue;
		context.itemCategories.grafts.push(item);
		const ctx = context.itemContext[item.id];
		const graftSlot = item.getFlag("mage-hand-press-core", "graftSlot") ?? {};
		const validSlot = graftSlot.valid ?? "any";
		ctx.groups.slot = validSlot === "any" ? (graftSlot.current ?? "arms") : validSlot;
		ctx.dataset["group-slot"] = ctx.groups.slot;
		const slot = context.graftSlots[ctx.groups.slot];
		if ( slot ) {
			slot.total++;
			if ( !graftSlot.free ) slot.occupied++;
		}
	}
	context.itemCategories.inventory = context.itemCategories.inventory.filter(i =>
		(i.type !== "equipment") || !isGraft(i)
	);

	// Check for any slots with too many grafts
	for ( const [key, slot] of Object.entries(context.graftSlots) ) {
		if ( slot.occupied > slot.max ) context.warnings.push({
			message: _loc("MageHandPress.MonstrousGraft.Warning.SlotFull", {
				slot: _loc(CONFIG.MAGEHANDPRESS.graftBodySlots[key].label)
			}),
			type: "warning"
		});
	}
}

/* -------------------------------------------- */

/**
 * Prepare rendering context for the grafts.
 * @param {CharacterActorSheet} sheet
 * @param {string} partId
 * @param {ApplicationRenderContext} context
 * @param {HandlebarsRenderOptions} options
 */
function prepareSheetContext(sheet, partId, context, options) {
	if ( partId !== "grafts" ) return;
	const Inventory = customElements.get(sheet.options.elements.inventory);
	const columns = Inventory.mapColumns(["roll", "formula", "charges", "controls"]);
	const sections = [
		{
			columns,
			id: "contents",
			label: "MageHandPress.MonstrousGraft.Grafts",
			order: 10,
			groups: { contents: "contents" },
			items: []
		},
		...Object.entries(CONFIG.MAGEHANDPRESS.graftBodySlots)
			.filter(([key]) => key !== "any")
			.map(([id, config], i) => ({
				columns, id, label: config.label, order: (i + 1) * 100, groups: { slot: id }
			}))
	];
	sections[0].items = [...context.itemCategories.grafts ?? []];
	context.sections = Inventory.prepareSections(sections);
	context.listControls = {
		label: "MageHandPress.MonstrousGraft.Search",
		list: "grafts",
		filters: [
			{ key: "action", label: "DND5E.Action" },
			{ key: "bonus", label: "DND5E.BonusAction" },
			{ key: "reaction", label: "DND5E.Reaction" }
		],
		sorting: [
			{ key: "a", label: "SIDEBAR.SortModeAlpha", dataset: { icon: "fa-solid fa-arrow-down-a-z" } },
			{ key: "m", label: "SIDEBAR.SortModeManual", dataset: { icon: "fa-solid fa-arrow-down-short-wide" } }
		],
		grouping: [
			{
				key: "slot",
				label: "MageHandPress.MonstrousGraft.GroupSlot",
				dataset: { icon: "fa-solid fa-layer-group", classes: "active" }
			},
			{
				key: "contents",
				label: "MageHandPress.MonstrousGraft.GroupSlot",
				dataset: { icon: "fa-solid fa-layer-group" }
			}
		]
	};
}

/* -------------------------------------------- */

/**
 * Add slot capacity to graft slots.
 * @param {CharacterActorSheet} sheet
 * @param {HTMLElement} element
 * @param {object} context
 * @param {object} options
 */
function renderCharacterActorSheet(sheet, element, context, options) {
	const slots = element.querySelectorAll('[data-application-part="grafts"] .items-section[data-group-slot]');
	for ( const slot of slots ) {
		const data = context.graftSlots?.[slot.dataset.groupSlot];
		if ( !data ) continue;
		const span = document.createElement("span");
		span.classList.add("slot-count");
		span.innerHTML = `
			<span class="occupied">${formatNumber(data.occupied)}</span>
			<span class="separator">/</span>
			<span class="max">${formatNumber(data.max)}</span>
		`;
		slot.querySelector(".items-header .item-name").append(span);
	}
}

/* -------------------------------------------- */

/**
 * Display graft options on equipment & weapon sheets.
 * @param {ItemSheet5e} app
 * @param {HTMLElement} html
 * @param {ApplicationRenderContext} context
 * @param {HandlebarsRenderOptions} options
 */
function renderItemSheet5e(app, html, context, options) {
	const item = app.document;
	if ( !isGraft(item) ) return;

	const fields = [];
	const graftSlot = item.flags["mage-hand-press-core"]?.graftSlot
		?? item.flags["mage-hand-press-dark-matter"]?.graftSlot ?? {};

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
				name: "flags.mage-hand-press-core.graftSlot.free",
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

/* -------------------------------------------- */
/*  Helpers                                     */
/* -------------------------------------------- */

/**
 * Is an item a monstrous or construct graft?
 * @param {Item5e} item
 * @returns {boolean}
 */
function isGraft(item) {
	const t = item.system.type?.value;
	return ((item.type === "equipment") && ((t === "constructGraft") || (t === "monstrousGraft")))
		|| ((item.type === "weapon") && item.flags["mage-hand-press-dark-matter"]?.graftSlot?.valid);
}
