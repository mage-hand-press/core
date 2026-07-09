export function initialize() {
	Hooks.on("dnd5e.renderEmbeddedSpell", renderEmbeddedSpell);
}

/* -------------------------------------------- */
/*  Rendering                                   */
/* -------------------------------------------- */

const VALID_PROPERTIES = new Set(["renaissance"]);

/**
 * Add additional properties after spell tag when embedded.
 * @param {Item5e} item
 * @param {HTMLTemplateElement} template
 * @param {DocumentHTMLEmbedConfig} config
 * @param {EnrichmentOptions} options
 */
function renderEmbeddedSpell(item, template, config, options) {
	const spellProperties = Array.from(item.system.properties)
		.filter(p => VALID_PROPERTIES.has(p))
		.map(p => CONFIG.DND5E.itemProperties[p].label)
		.sort((lhs, rhs) => lhs.localeCompare(rhs, game.i18n.lang));
	if ( !spellProperties.length ) return;
	const tag = template.querySelector(".item-entry-tag");
	tag.append(` [${game.i18n.getListFormatter({ type: "unit" }).format(spellProperties)}]`);
}
