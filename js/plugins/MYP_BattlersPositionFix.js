/*:
 * @plugindesc Настройка позиции персонажей в бою
 * @author Pheonix KageDesu | Pavel Sotnikov | MiznK
 *
 * @help
 *
 * @param ActorMarginX
 * @type string
 * @default 0
 * @desc Смещение персонажа по X
 *
 * @param ActorMarginY
 * @type string
 * @default 15
 * @desc Смещение персонажа по Y
 *
 * @param EnemyMarginX
 * @type string
 * @default 20
 * @desc Смещение врага по X
 *
 * @param EnemyMarginY
 * @type string
 * @default 70
 * @desc Смещение врага по Y (положительное число = ниже)
 *
 */
(function () {
  var parameters = PluginManager.parameters("MYP_BattlersPositionFix");
  var actorXMargin = Number(parameters["ActorMarginX"] || 0);
  var actorYMargin = Number(parameters["ActorMarginY"] || 0);
  var enemyXMargin = Number(parameters["EnemyMarginX"] || 0);
  var enemyYMargin = Number(parameters["EnemyMarginY"] || 0);

  // Для акторов - изменяем домашнюю позицию
  var alias_Sprite_Actor_setHome = Sprite_Actor.prototype.setHome;
  Sprite_Actor.prototype.setHome = function (x, y) {
    alias_Sprite_Actor_setHome.call(this, x + actorXMargin, y + actorYMargin);
  };

  // Для врагов - изменяем домашнюю позицию при установке баттлера
  var alias_Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
  Sprite_Enemy.prototype.setBattler = function (battler) {
    alias_Sprite_Enemy_setBattler.call(this, battler);
    if (battler) {
      this._homeX = battler.screenX() + enemyXMargin;
      this._homeY = battler.screenY() + enemyYMargin;
    }
  };
})();
