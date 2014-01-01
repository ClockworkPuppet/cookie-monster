/*jshint -W014*/

/**
 * Get the price of an object
 *
 * @return {Integer}
 */
CookieMonster.getPriceOf = function() {
	return this instanceof Game.Upgrade ? this.basePrice : this.price;
};

/**
 * Get the type of an object
 *
 * @return {String}
 */
CookieMonster.getTypeOf = function() {
	return this instanceof Game.Upgrade ? 'upgrade' : 'object';
};

/**
 * Get the true worth of an object
 *
 * @return {Integer}
 */
CookieMonster.getWorthOf = function() {
	return this.getType() === 'upgrade'
		? CookieMonster.callCached('getUpgradeWorth', [this])
		: CookieMonster.informations.bonus[this.id];
};

/**
 * Check if an object matches against a piece of text
 *
 * @param {String} matcher
 *
 * @return {Boolean}
 */
CookieMonster.matches = function(matcher) {
	if (!this.desc) {
		return false;
	}

	return this.desc.toLowerCase().indexOf(matcher.toLowerCase()) !== -1;
};

// Hook into the game
//////////////////////////////////////////////////////////////////////

Game.Object.prototype.getPrice = CookieMonster.getPriceOf;
Game.Object.prototype.getType  = CookieMonster.getTypeOf;
Game.Object.prototype.getWorth = CookieMonster.getWorthOf;
Game.Object.prototype.matches  = CookieMonster.matches;

Game.Upgrade.prototype.getPrice = CookieMonster.getPriceOf;
Game.Upgrade.prototype.getType  = CookieMonster.getTypeOf;
Game.Upgrade.prototype.getWorth = CookieMonster.getWorthOf;
Game.Upgrade.prototype.matches  = CookieMonster.matches;