export function initialize() {
	if ( !game.settings.get("mage-hand-press-core", "gunslinger").mankillerOverkill ) return;
	super_processDamagePart = dnd5e.documents.activity.AttackActivity.prototype._processDamagePart;
	dnd5e.documents.activity.AttackActivity.prototype._processDamagePart = _processDamagePart;
}

/* -------------------------------------------- */

let super_processDamagePart;

function _processDamagePart(damage, rollConfig, rollData, index=0, options={}) {
	const roll = super_processDamagePart.call(this, damage, rollConfig, rollData, index, options);
	if ( !roll?.base ) return;

	// Mankiller feature applies only to firearms
	// TODO: In DnD5e 6.0, instead of just checking for presence of feature, check `canUse`
	const applyMankiller = this.actor?.identifiedItems?.get("feat:mankiller")?.size > 0 && (this.item.type === "weapon")
		&& (this.item.system.properties.has("fir") || this.item.system.type.value.endsWith("Firearm"));

	// Overkill feature applies to all ranged weapons
	// TODO: In DnD5e 6.0, instead of just checking for presence of feature, check `canUse`
	const applyOverkill = this.actor?.identifiedItems?.get("feat:overkill")?.size > 0 && (this.item.type === "weapon")
		&& (this.item.system.attackType === "ranged");

	if ( !applyMankiller && !applyOverkill ) return roll;

	// For both Mankiller & Overkill, add modifier if missing
	if ( !roll.parts.find(p => p.includes("@mod")) ) roll.parts.push("@mod");

	// For Overkill, add an extra 1d8 damage if modifier already included
	else if ( applyOverkill ) roll.parts.push("1d8");

	return roll;
}
