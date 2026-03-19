/*:
 * @plugindesc Скрывает отображение MP в интерфейсе v1.0
 * @author MiznK
 *
 * @help Этот плагин полностью скрывает MP из интерфейса игры.
 */

(function () {
  // Убираем MP из окна статуса в меню
  Window_Base.prototype.drawActorMp = function (actor, x, y, width) {
    // Пустая функция - ничего не рисуем
  };

  // Убираем MP из боевого интерфейса
  Window_BattleStatus.prototype.drawGaugeAreaWithTp = function (rect, actor) {
    this.drawActorHp(actor, rect.x + 100, rect.y, 108);
    this.drawActorTp(actor, rect.x + 223, rect.y, 96);
    // Убрали строку drawActorMp
  };

  Window_BattleStatus.prototype.drawGaugeAreaWithoutTp = function (
    rect,
    actor,
  ) {
    this.drawActorHp(actor, rect.x + 0, rect.y, 201);
    // Убрали строку drawActorMp
  };

  // Убираем MP из детального окна статуса
  Window_Status.prototype.drawBasicInfo = function (x, y) {
    var lineHeight = this.lineHeight();
    this.drawActorLevel(this._actor, x, y + lineHeight * 0);
    this.drawActorIcons(this._actor, x, y + lineHeight * 1);
    this.drawActorHp(this._actor, x, y + lineHeight * 2);
    // Убрали drawActorMp
    this.drawActorTp(this._actor, x, y + lineHeight * 3);
  };
})();
