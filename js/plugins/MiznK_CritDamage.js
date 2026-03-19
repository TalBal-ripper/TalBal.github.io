/*:
 * @plugindesc Переопределение урона от крита
 * @author MiznK
 *
 * @param critMultiplier
 * @text Множитель крита
 * @desc Множитель урона при критическом ударе
 * @type number
 * @decimals 1
 * @default 2
 *
 * @help1
 * Крит = обычный урон + (множитель * удача атакующего)
 */
(function () {
  var parameters = PluginManager.parameters("MiznK_CritDamage");
  var critMultiplier = Number(parameters["critMultiplier"] || 1);

  Game_Action.prototype.applyCritical = function (damage) {
    var user = this.subject();
    return damage + critMultiplier * user.luk;
  };
})();
