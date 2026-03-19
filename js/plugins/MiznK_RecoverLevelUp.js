//=============================================================================
// RecoverLevelUp.js
//=============================================================================

/*:
 * @plugindesc Добавляет восстановление HP при поднятии уровня
 * @author MiznK
 * @help RecoverLevelUp.js
 *
 * Этот плагин Добавляет восстановление HP (И MP) при поднятии уровня
 */

let _Game_Actor_levelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function () {
  _Game_Actor_levelUp.apply(this, arguments);
  this.recoverAll();
};
