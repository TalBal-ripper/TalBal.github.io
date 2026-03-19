/*:
 * @plugindesc Масштабирует спрайты игроков и врагов и регулирует интервал между сопартийцами (совместимо с YEP Battle Engine Core / CTB)
 * @param Actor Scale
 * @type number
 * @min 0.1
 * @decimals 2
 * @default 2.0
 *
 * @param Enemy Scale
 * @type number
 * @min 0.1
 * @decimals 2
 * @default 2.0
 *
 * @param Actor Spacing
 * @text Интервал между спрайтами игроков
 * @type number
 * @min -999
 * @max 999
 * @default 48
 * @desc Чем больше значение — тем дальше стоят актёры друг от друга по оси X.
 *
 * @help
 * --- Использование ---
 * Поставьте плагин НИЖЕ YEP_BattleEngineCore и YEP_X_BattleSysCTB.
 *
 * Масштаб применяется после загрузки битмапов, чтобы Yanfly не перезаписал его.
 * Интервал изменяет горизонтальное расстояние между спрайтами актёров.
 *
 * --- Примечания ---
 * Если спрайты "плавают", попробуйте подправить якорь или позицию.
 * Для фронт- или сайд-вью работает одинаково.
 */

(function() {
  const params = PluginManager.parameters('ScalesBattleSprites');
  const actorScale = Number(params['Actor Scale'] || 1.0);
  const enemyScale = Number(params['Enemy Scale'] || 1.0);
  const actorSpacing = Number(params['Actor Spacing'] || 48);

  // --- Масштаб для актёров ---
  const _Sprite_Actor_createMainSprite = Sprite_Actor.prototype.createMainSprite;
  Sprite_Actor.prototype.createMainSprite = function() {
    _Sprite_Actor_createMainSprite.call(this);
    if (this._mainSprite) {
      this._mainSprite.scale.x = actorScale;
      this._mainSprite.scale.y = actorScale;
      this._mainSprite.anchor.y = 1.0; // якорь по ногам
    }
  };

  // --- Обновляем масштаб при смене спрайта ---
  const _Sprite_Actor_setBattler = Sprite_Actor.prototype.setBattler;
  Sprite_Actor.prototype.setBattler = function(battler) {
    _Sprite_Actor_setBattler.call(this, battler);
    if (this._mainSprite) {
      this._mainSprite.scale.x = actorScale;
      this._mainSprite.scale.y = actorScale;
      this._mainSprite.anchor.y = 1.0;
    }
  };

  // --- Масштаб врагов ---
  const _Sprite_Enemy_initBitmap = Sprite_Enemy.prototype.initBitmap;
  Sprite_Enemy.prototype.initBitmap = function() {
    _Sprite_Enemy_initBitmap.call(this);
    this.scale.x = enemyScale;
    this.scale.y = enemyScale;
    this.anchor.y = 1.0;
  };

  const _Sprite_Enemy_updateBitmap = Sprite_Enemy.prototype.updateBitmap;
  Sprite_Enemy.prototype.updateBitmap = function() {
    _Sprite_Enemy_updateBitmap.call(this);
    this.scale.x = enemyScale;
    this.scale.y = enemyScale;
    this.anchor.y = 1.0;
  };

  // --- Интервал между актёрами (по оси X) ---
  // Работает в любых системах, использующих стандартные координаты
  const _Sprite_Actor_setHome = Sprite_Actor.prototype.setHome;
  Sprite_Actor.prototype.setHome = function(x, y) {
    _Sprite_Actor_setHome.call(this, x, y);
    const index = this._actor && this._actor.index ? this._actor.index() : 0;
    // Чем больше индекс, тем больше смещение влево
    this._homeX += index * actorSpacing;
  };

})();