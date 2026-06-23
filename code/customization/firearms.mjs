export function initialize() {
	if ( !game.settings.get("mage-hand-press-core", "firearmModifier") ) return;
	super_processDamagePart = dnd5e.documents.activity.AttackActivity.prototype._processDamagePart;
	dnd5e.documents.activity.AttackActivity.prototype._processDamagePart = _processDamagePart;
}

/* -------------------------------------------- */

let super_processDamagePart;

function _processDamagePart(damage, rollConfig, rollData, index=0, options={}) {
	const roll = super_processDamagePart.bind(this)(damage, rollConfig, rollData, index, options);
	if ( roll && roll.base && (this.item.type === "weapon") && this.item.system.properties.has("fir") ) {
		roll.parts.findSplice(p => p.includes("@mod"));
	}
	return roll;
}
