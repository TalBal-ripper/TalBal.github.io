//=============================================================================
// EnemyChase.js
//=============================================================================

/*:
 * @plugindesc Преследование игрока врагами
 * @author MiznK
 *
 * @param chaseDistance
 * @text Chase Distance
 * @desc Distance in tiles when enemy starts chasing
 * @type number
 * @min 1
 * @max 10
 * @default 3
 *
 * @param chaseSpeed
 * @text Chase Speed
 * @desc Speed when chasing (1-6)
 * @type number
 * @min 1
 * @max 6
 * @default 4
 *
 * @help EnemyChase.js
 *
 * Добавляет систему преследования для врагов на карте.
 *
 * Использование:
 * 1. Создайте событие с автономным движением (маршрут)
 * 2. В заметках события (Note) напишите:
 *    - <chase> - использует параметры по умолчанию из плагина
 *    - <chase:5,5> - дистанция 5, скорость 5
 *    - <chase: 2, 3> - дистанция 2, скорость 3 (пробелы допускаются)
 * 3. Поставьте триггер "Касание события" для боя
 *
 * Враг будет патрулировать по маршруту, но при приближении игрока
 * начнет его преследовать.
 */

(() => {
  "use strict";

  const parameters = PluginManager.parameters("EnemyChase");
  const defaultChaseDistance = Number(parameters["chaseDistance"] || 3);
  const defaultChaseSpeed = Number(parameters["chaseSpeed"] || 4);

  // Расширяем Game_Event
  const _Game_Event_initialize = Game_Event.prototype.initialize;
  Game_Event.prototype.initialize = function (mapId, eventId) {
    _Game_Event_initialize.call(this, mapId, eventId);
    this._isChaseEnemy = false;
    this._chaseDistance = defaultChaseDistance;
    this._chaseSpeed = defaultChaseSpeed;

    if (this.event() && this.event().note) {
      this.parseChaseSettings();
    }

    this._isChasing = false;
    this._originalRoute = null;
    this._originalSpeed = this._moveSpeed;
  };

  Game_Event.prototype.parseChaseSettings = function () {
    const note = this.event().note;

    // Проверяем формат <chase:distance,speed>
    const customMatch = note.match(/<chase\s*:\s*(\d+)\s*,\s*(\d+)>/i);
    if (customMatch) {
      this._isChaseEnemy = true;
      this._chaseDistance = Number(customMatch[1]);
      this._chaseSpeed = Math.min(6, Math.max(1, Number(customMatch[2])));
      return;
    }

    // Проверяем простой формат <chase>
    if (note.includes("<chase>")) {
      this._isChaseEnemy = true;
      // Используем значения по умолчанию (уже установлены в initialize)
    }
  };

  const _Game_Event_update = Game_Event.prototype.update;
  Game_Event.prototype.update = function () {
    _Game_Event_update.call(this);
    if (this._isChaseEnemy) {
      this.updateChase();
    }
  };

  Game_Event.prototype.updateChase = function () {
    // Не обрабатываем удаленные/невидимые события
    if (this._erased || !this._characterName) {
      return;
    }

    const distance = $gameMap.distance(
      this.x,
      this.y,
      $gamePlayer.x,
      $gamePlayer.y,
    );

    if (distance <= this._chaseDistance && !this._isChasing) {
      this.startChasing();
    } else if (distance > this._chaseDistance && this._isChasing) {
      this.stopChasing();
    }
  };

  Game_Event.prototype.startChasing = function () {
    this._isChasing = true;

    // Сохраняем оригинальный маршрут
    this._originalRoute = this._moveRoute;
    this._originalRouteIndex = this._moveRouteIndex;

    // Показываем эмоцию - восклицательный знак
    if (!this.isBallonPlaying) {
      this.requestBalloon(1);
    }

    // Устанавливаем маршрут "идти к игроку"
    this.setMoveRoute({
      list: [
        { code: 10, indent: null }, // code 10 = MOVE TOWARD PLAYER
        { code: 0, indent: null },
      ], // Move toward Player + End
      repeat: true,
      skippable: false,
      wait: false,
    });

    this._moveRouteIndex = 0;
    // Увеличиваем скорость до индивидуальной настройки
    this.setMoveSpeed(this._chaseSpeed);
  };

  Game_Event.prototype.stopChasing = function () {
    this._isChasing = false;
    // Восстанавливаем оригинальный маршрут
    this._moveRoute = this._originalRoute;
    this._moveRouteIndex = this._originalRouteIndex || 0;
    // Восстанавливаем скорость
    this.setMoveSpeed(this._originalSpeed);
  };
})();
