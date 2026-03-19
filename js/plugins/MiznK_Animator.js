//=============================================================================
// MiznK_Animator.js
//=============================================================================

/*:
 * @plugindesc Плагин для покадровой анимации (JPG).
 * @author MiznK
 *
 * @param PictureSlot
 * @desc ID picture слота для анимации
 * @type number
 * @default 19
 *
 * @param DefaultSpeedToEnd
 * @desc Скорость по умолчанию для движения к концу (игровых кадров на кадр анимации)
 * @type number
 * @default 2
 *
 * @param DefaultSpeedToStart
 * @desc Скорость по умолчанию для движения к началу (игровых кадров на кадр анимации)
 * @type number
 * @default 2
 *
 * @param DefaultCurveToEnd
 * @desc Кривая по умолчанию для движения к концу (Linear/L, FastEnd/F, SlowEnd/S)
 * @type select
 * @option Linear
 * @option FastEnd
 * @option SlowEnd
 * @default Linear
 *
 * @param DefaultCurveToStart
 * @desc Кривая по умолчанию для движения к началу (Linear/L, FastEnd/F, SlowEnd/S)
 * @type select
 * @option Linear
 * @option FastEnd
 * @option SlowEnd
 * @default Linear
 *
 * @param DefaultDelayAtStart
 * @desc Задержка по умолчанию на начальном ключевом кадре (в игровых кадрах)
 * @type number
 * @default 20
 *
 * @param DefaultDelayAtEnd
 * @desc Задержка по умолчанию на конечном ключевом кадре (в игровых кадрах)
 * @type number
 * @default 20
 *
 * @help
 * ============================================================================
 * MiznK_Animator
 * ============================================================================
 *
 * Плагин для создания плавных зацикленных анимаций из последовательности
 * JPG кадров. Режим работы: pingpong (туда-сюда).
 *
 * ============================================================================
 * Структура файлов:
 * ============================================================================
 *
 * img/pictures/animations/ИмяСцены/1.jpg
 * img/pictures/animations/ИмяСцены/2.jpg
 * img/pictures/animations/ИмяСцены/3.jpg
 * ...и т.д.
 *
 * Первый и последний кадры — ключевые (на них применяется задержка).
 *
 * ============================================================================
 * Скорость (Speed):
 * ============================================================================
 *
 * Speed = сколько игровых кадров показывается один кадр анимации.
 * Игра работает на 60 FPS.
 *
 *   Speed 1 = 60 FPS анимации (очень быстро)
 *   Speed 2 = 30 FPS анимации (нормально, рекомендуется)
 *   Speed 3 = 20 FPS анимации (медленно, слегка дёргано)
 *   Speed 4+ = ещё медленнее
 *
 * ============================================================================
 * Кривые (Curve):
 * ============================================================================
 *
 * Linear (L)  — все кадры показываются одинаковое время
 * FastEnd (F) — начало медленнее, конец быстрее
 * SlowEnd (S) — начало быстрее, конец медленнее
 *
 * Кривые умножают базовую скорость на коэффициент (0.5x — 1.5x).
 * Каждый кадр гарантированно получает минимум 1 тик.
 *
 * ============================================================================
 * Команды плагина:
 * ============================================================================
 *
 * Animator Load ИмяСцены НачальныйКадр КонечныйКадр
 *   - Загружает кадры и сразу показывает первый кадр.
 *
 * Animator Preload ИмяСцены НачальныйКадр КонечныйКадр
 *   - Загружает кадры без показа (для предзагрузки).
 *
 * Animator Clear
 *   - Полностью очищает аниматор и освобождает ресурсы.
 *
 * Animator Show
 *   - Показывает текущий кадр.
 *
 * Animator Hide
 *   - Скрывает анимацию.
 *
 * Animator Play
 *   - Запускает бесконечную анимацию.
 *
 * Animator Play Число
 *   - Запускает анимацию на указанное число проходов (туда-сюда = 1 проход).
 *
 * Animator Speed СкоростьТуда СкоростьОбратно
 *   - Устанавливает скорость смены кадров.
 *
 * Animator Curve КриваяТуда КриваяОбратно
 *   - Устанавливает кривые распределения времени.
 *   - Можно использовать алиасы: L, F, S вместо Linear, FastEnd, SlowEnd
 *
 * Animator DelayKeyFrame ЗадержкаНаСтарте ЗадержкаНаКонце
 *   - Устанавливает задержки на ключевых кадрах.
 *
 * Animator StopAtStart
 *   - Аниматор остановится на начальном кадре.
 *
 * Animator StopAtEnd
 *   - Аниматор остановится на конечном кадре.
 *
 * Animator ToStart
 *   - Мгновенно переносит на начальный кадр и останавливает.
 *
 * Animator ToEnd
 *   - Мгновенно переносит на конечный кадр и останавливает.
 *
 * Animator Wait НомерКадра
 *   - Ждать, пока аниматор дойдёт до указанного кадра.
 *
 * Animator Wait
 *   - Ждать окончания анимации (если запущена с ограничением проходов).
 *
 * Animator ChangePictureID SlotID
 *   - Изменить используемый picture слот.
 *
 * Animator Sound ИмяSE Громкость
 *   - Устанавливает SE, который будет воспроизводиться при возврате к началу.
 *   - Громкость опциональна (по умолчанию 100).
 *   - Сбрасывается при Load, Preload, Clear и Reset.
 *
 * ============================================================================
 */

(function () {
  "use strict";

  // добавляем содержимое папки animations в исключения декодера
  var _Decrypter_checkImgIgnore = Decrypter.checkImgIgnore;
  Decrypter.checkImgIgnore = function (url) {
    if (url.indexOf("img/pictures/animations/") === 0) {
      return true;
    }
    return _Decrypter_checkImgIgnore.call(this, url);
  };

  var parameters = PluginManager.parameters("MiznK_Animator");
  var defaultSlot = Number(parameters["PictureSlot"] || 19);
  var defaultSpeedToEnd = Number(parameters["DefaultSpeedToEnd"] || 2);
  var defaultSpeedToStart = Number(parameters["DefaultSpeedToStart"] || 2);
  var defaultCurveToEnd = (
    parameters["DefaultCurveToEnd"] || "Linear"
  ).toLowerCase();
  var defaultCurveToStart = (
    parameters["DefaultCurveToStart"] || "Linear"
  ).toLowerCase();
  var defaultDelayAtStart = Number(parameters["DefaultDelayAtStart"] || 20);
  var defaultDelayAtEnd = Number(parameters["DefaultDelayAtEnd"] || 20);

  // --- Загрузка JPG из папки анимации ---
  ImageManager.loadAnimatorFrame = function (sceneName, frameIndex) {
    var folder = "img/pictures/animations/" + sceneName + "/";
    var url = folder + frameIndex + ".jpg";
    return this.loadNormalBitmap(url, 0);
  };

  var Animator = {
    _loaded: false,
    _playing: false,
    _visible: false,

    _slot: defaultSlot,

    _sceneName: "",
    _startFrame: 1,
    _endFrame: 1,
    _bitmaps: [],

    _currentFrameIndex: 0,
    _direction: 1,

    _speedToEnd: defaultSpeedToEnd,
    _speedToStart: defaultSpeedToStart,
    _curveToEnd: defaultCurveToEnd,
    _curveToStart: defaultCurveToStart,
    _delayAtStart: defaultDelayAtStart,
    _delayAtEnd: defaultDelayAtEnd,

    _playCount: -1,
    _stopAtStart: false,
    _stopAtEnd: false,

    _frameTimer: 0,
    _delayTimer: 0,

    _timingsToEnd: [],
    _timingsToStart: [],

    _waitForFrame: -1,
    _waitForEnd: false,

    _sprite: null,
    _pictureContainer: null,

    // Sound settings
    _soundName: "",
    _soundVolume: 100,

    reset: function () {
      this._loaded = false;
      this._playing = false;
      this._visible = false;
      this._sceneName = "";
      this._startFrame = 1;
      this._endFrame = 1;
      this._bitmaps = [];
      this._currentFrameIndex = 0;
      this._direction = 1;
      this._speedToEnd = defaultSpeedToEnd;
      this._speedToStart = defaultSpeedToStart;
      this._curveToEnd = defaultCurveToEnd;
      this._curveToStart = defaultCurveToStart;
      this._delayAtStart = defaultDelayAtStart;
      this._delayAtEnd = defaultDelayAtEnd;
      this._playCount = -1;
      this._stopAtStart = false;
      this._stopAtEnd = false;
      this._frameTimer = 0;
      this._delayTimer = 0;
      this._timingsToEnd = [];
      this._timingsToStart = [];
      this._waitForFrame = -1;
      this._waitForEnd = false;
      this._soundName = "";
      this._soundVolume = 100;
    },

    resetToDefaults: function () {
      this._playing = false;
      this._currentFrameIndex = 0;
      this._direction = 1;
      this._speedToEnd = defaultSpeedToEnd;
      this._speedToStart = defaultSpeedToStart;
      this._curveToEnd = defaultCurveToEnd;
      this._curveToStart = defaultCurveToStart;
      this._delayAtStart = defaultDelayAtStart;
      this._delayAtEnd = defaultDelayAtEnd;
      this._playCount = -1;
      this._stopAtStart = false;
      this._stopAtEnd = false;
      this._frameTimer = 0;
      this._delayTimer = 0;
      this._timingsToEnd = [];
      this._timingsToStart = [];
      this._waitForFrame = -1;
      this._waitForEnd = false;
      this._soundName = "";
      this._soundVolume = 100;
    },

    _loadFrames: function (sceneName, startFrame, endFrame) {
      this.clear();
      this.resetToDefaults();

      this._sceneName = sceneName;
      this._startFrame = startFrame;
      this._endFrame = endFrame;
      this._bitmaps = [];

      for (var i = startFrame; i <= endFrame; i++) {
        var bitmap = ImageManager.loadAnimatorFrame(sceneName, i);
        this._bitmaps.push(bitmap);
      }

      this._loaded = true;
      this._currentFrameIndex = 0;
      this._recalculateTimings();
      console.log(
        "MiznK_Animator: Loaded " +
          this._bitmaps.length +
          " frames from " +
          sceneName,
      );
    },

    load: function (sceneName, startFrame, endFrame) {
      this._loadFrames(sceneName, startFrame, endFrame);
      this.show();
    },

    preload: function (sceneName, startFrame, endFrame) {
      this._loadFrames(sceneName, startFrame, endFrame);
    },

    clear: function () {
      this.hide();
      this.reset();
      this._slot = defaultSlot;
    },

    _normalizeCurve: function (curve) {
      switch (curve.toLowerCase()) {
        case "f":
        case "fastend":
          return "fastend";
        case "s":
        case "slowend":
          return "slowend";
        case "l":
        case "linear":
        default:
          return "linear";
      }
    },

    _recalculateTimings: function () {
      var numFrames = this._bitmaps.length;
      if (numFrames <= 1) return;

      this._timingsToEnd = this._calculateTimings(
        numFrames,
        this._curveToEnd,
        this._speedToEnd,
      );
      this._timingsToStart = this._calculateTimings(
        numFrames,
        this._curveToStart,
        this._speedToStart,
      );
    },

    _calculateTimings: function (numFrames, curve, baseSpeed) {
      var timings = [];
      var normalizedCurve = this._normalizeCurve(curve);

      for (var i = 0; i < numFrames; i++) {
        var t = numFrames > 1 ? i / (numFrames - 1) : 0;
        var multiplier;

        switch (normalizedCurve) {
          case "fastend":
            // Начало медленнее (1.5x), конец быстрее (0.5x)
            multiplier = 1.5 - t;
            break;
          case "slowend":
            // Начало быстрее (0.5x), конец медленнее (1.5x)
            multiplier = 0.5 + t;
            break;
          case "linear":
          default:
            multiplier = 1;
            break;
        }

        var duration = Math.round(baseSpeed * multiplier);
        timings.push(Math.max(1, duration));
      }

      return timings;
    },

    _ensureSprite: function () {
      if (!this._pictureContainer) {
        var scene = SceneManager._scene;
        if (scene && scene._spriteset && scene._spriteset._pictureContainer) {
          this._pictureContainer = scene._spriteset._pictureContainer;
        } else {
          return false;
        }
      }

      if (!this._sprite) {
        this._sprite = new Sprite();
        this._sprite.anchor.x = 0;
        this._sprite.anchor.y = 0;
      }

      return true;
    },

    _addSpriteToScene: function () {
      if (!this._ensureSprite()) return;

      if (this._sprite.parent !== this._pictureContainer) {
        // Вставляем на позицию согласно слоту (slot 1 = index 0)
        var insertIndex = this._slot - 1;
        if (insertIndex < 0) insertIndex = 0;
        if (insertIndex >= this._pictureContainer.children.length) {
          this._pictureContainer.addChild(this._sprite);
        } else {
          this._pictureContainer.addChildAt(this._sprite, insertIndex);
        }
      }
    },

    _removeSpriteFromScene: function () {
      if (this._sprite && this._sprite.parent) {
        this._sprite.parent.removeChild(this._sprite);
      }
    },

    show: function () {
      if (!this._loaded) {
        console.warn("MiznK_Animator: Cannot show - no frames loaded");
        return;
      }

      this._visible = true;
      this._addSpriteToScene();
      this._showCurrentFrame();
    },

    hide: function () {
      this._visible = false;
      this._playing = false;
      this._removeSpriteFromScene();
    },

    _showCurrentFrame: function () {
      if (!this._loaded || !this._visible || !this._sprite) return;

      this._sprite.bitmap = this._bitmaps[this._currentFrameIndex];
      this._sprite.opacity = 255;
    },

    setSpeed: function (speedToEnd, speedToStart) {
      this._speedToEnd = speedToEnd;
      this._speedToStart = speedToStart;
      this._recalculateTimings();
    },

    setCurve: function (curveToEnd, curveToStart) {
      this._curveToEnd = this._normalizeCurve(curveToEnd);
      this._curveToStart = this._normalizeCurve(curveToStart);
      this._recalculateTimings();
    },

    setDelayKeyFrame: function (delayAtStart, delayAtEnd) {
      this._delayAtStart = delayAtStart;
      this._delayAtEnd = delayAtEnd;
    },

    play: function (count) {
      if (!this._loaded) {
        console.warn("MiznK_Animator: Cannot play - no frames loaded");
        return;
      }

      // Прыгаем к ближайшему ключевому кадру
      var lastIndex = this._bitmaps.length - 1;
      var distToStart = this._currentFrameIndex;
      var distToEnd = lastIndex - this._currentFrameIndex;

      if (distToStart <= distToEnd) {
        this._currentFrameIndex = 0;
        this._direction = 1;
      } else {
        this._currentFrameIndex = lastIndex;
        this._direction = -1;
      }

      // Сбрасываем состояние
      this._stopAtStart = false;
      this._stopAtEnd = false;
      this._frameTimer = 0;
      this._delayTimer = 0;

      if (!this._visible) {
        this.show();
      }

      // Устанавливаем счётчик проходов
      if (count === undefined || count === null || count < 0) {
        this._playCount = -1;
      } else {
        this._playCount = count;
      }

      this._playing = true;
      this._showCurrentFrame();
      this._applyKeyFrameDelay();
    },

    _jumpToNearestKeyFrame: function () {
      var lastIndex = this._bitmaps.length - 1;
      var distToStart = this._currentFrameIndex;
      var distToEnd = lastIndex - this._currentFrameIndex;

      if (distToStart <= distToEnd) {
        this._currentFrameIndex = 0;
        this._direction = 1;
      } else {
        this._currentFrameIndex = lastIndex;
        this._direction = -1;
      }

      this._frameTimer = 0;
      this._showCurrentFrame();
    },

    _applyKeyFrameDelay: function () {
      var lastIndex = this._bitmaps.length - 1;

      if (this._currentFrameIndex === 0) {
        this._delayTimer = this._delayAtStart;
      } else if (this._currentFrameIndex === lastIndex) {
        this._delayTimer = this._delayAtEnd;
      }
    },

    stopAtStart: function () {
      this._stopAtStart = true;
    },

    stopAtEnd: function () {
      this._stopAtEnd = true;
    },

    toStart: function () {
      if (!this._loaded) {
        console.warn("MiznK_Animator: Cannot toStart - no frames loaded");
        return;
      }

      this._playing = false;
      this._currentFrameIndex = 0;
      this._direction = 1;
      this._frameTimer = 0;
      this._delayTimer = 0;

      if (!this._visible) {
        this.show();
      } else {
        this._showCurrentFrame();
      }
    },

    toEnd: function () {
      if (!this._loaded) {
        console.warn("MiznK_Animator: Cannot toEnd - no frames loaded");
        return;
      }

      this._playing = false;
      this._currentFrameIndex = this._bitmaps.length - 1;
      this._direction = -1;
      this._frameTimer = 0;
      this._delayTimer = 0;

      if (!this._visible) {
        this.show();
      } else {
        this._showCurrentFrame();
      }
    },

    waitForFrame: function (frameId, interpreter) {
      this._waitForFrame = frameId - this._startFrame;
      interpreter.setWaitMode("miznk_animator");
    },

    waitForEnd: function (interpreter) {
      if (!this._playing) return;

      this._waitForEnd = true;
      interpreter.setWaitMode("miznk_animator");
    },

    changePictureId: function (slot) {
      this._slot = slot;
    },

    setSound: function (name, volume) {
      this._soundName = name;
      this._soundVolume = volume !== undefined ? volume : 100;
    },

    _playSoundIfSet: function () {
      if (this._soundName) {
        AudioManager.playSe({
          name: this._soundName,
          volume: this._soundVolume,
          pitch: 100,
          pan: 0,
        });
      }
    },

    update: function () {
      if (!this._playing || !this._visible) return;

      // Обработка задержки на ключевых кадрах
      if (this._delayTimer > 0) {
        this._delayTimer--;
        return;
      }

      // Обработка таймера текущего кадра
      this._frameTimer++;

      var timings =
        this._direction === 1 ? this._timingsToEnd : this._timingsToStart;
      var currentTiming = timings[this._currentFrameIndex] || this._speedToEnd;

      if (this._frameTimer >= currentTiming) {
        this._advanceFrame();
      }
    },

    _advanceFrame: function () {
      var lastIndex = this._bitmaps.length - 1;

      // Проверка остановки на ключевых кадрах
      if (this._currentFrameIndex === 0 && this._stopAtStart) {
        this._playing = false;
        this._stopAtStart = false;
        this._checkWaitComplete();
        return;
      }

      if (this._currentFrameIndex === lastIndex && this._stopAtEnd) {
        this._playing = false;
        this._stopAtEnd = false;
        this._checkWaitComplete();
        return;
      }

      // Переход к следующему кадру
      var nextIndex = this._currentFrameIndex + this._direction;

      // Проверка на звук при переходе с конца на начало
      // console.log(
      //   "direction:",
      //   this._direction,
      //   "nextIndex:",
      //   nextIndex,
      //   "lastIndex-1:",
      //   lastIndex - 1,
      // );
      // if (this._direction == -1 && nextIndex == lastIndex - 1) {
      //   this._playSoundIfSet();
      // }

      // Обработка границ (pingpong)
      if (nextIndex > lastIndex) {
        this._direction = -1;
        nextIndex = lastIndex - 1;
        if (nextIndex < 0) nextIndex = 0;
        console.log("Sound played");
        this._playSoundIfSet();
      } else if (nextIndex < 0) {
        this._direction = 1;
        nextIndex = 1;
        if (nextIndex > lastIndex) nextIndex = lastIndex;

        // Конец прохода — декрементируем только если не бесконечный режим
        if (this._playCount > 0) {
          this._playCount--;

          if (this._playCount === 0) {
            this._playing = false;
            this._currentFrameIndex = 0;
            this._showCurrentFrame();
            this._checkWaitComplete();
            return;
          }
        }
      }

      this._currentFrameIndex = nextIndex;
      this._frameTimer = 0;
      this._showCurrentFrame();

      this._checkWaitForFrame();
      this._applyKeyFrameDelay();
    },

    _checkWaitForFrame: function () {
      if (
        this._waitForFrame >= 0 &&
        this._currentFrameIndex === this._waitForFrame
      ) {
        this._waitForFrame = -1;
      }
    },

    _checkWaitComplete: function () {
      if (this._waitForEnd) {
        this._waitForEnd = false;
      }

      if (
        this._waitForFrame >= 0 &&
        this._currentFrameIndex === this._waitForFrame
      ) {
        this._waitForFrame = -1;
      }
    },

    isWaiting: function () {
      return this._waitForFrame >= 0 || this._waitForEnd;
    },

    onSceneChange: function () {
      this._pictureContainer = null;
      this._sprite = null;

      if (this._visible) {
        this._addSpriteToScene();
        this._showCurrentFrame();
      }
    },
  };

  window.MiznK_Animator = Animator;

  // --- Plugin Commands ---
  var _Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    if (command.toLowerCase() !== "animator") return;

    var subCommand = args[0] ? args[0].toLowerCase() : "";

    switch (subCommand) {
      case "load":
        Animator.load(args[1], Number(args[2]) || 1, Number(args[3]) || 1);
        break;

      case "preload":
        Animator.preload(args[1], Number(args[2]) || 1, Number(args[3]) || 1);
        break;

      case "clear":
        Animator.clear();
        break;

      case "show":
        Animator.show();
        break;

      case "hide":
        Animator.hide();
        break;

      case "play":
        var count = args[1] ? Number(args[1]) : -1;
        Animator.play(count);
        break;

      case "speed":
        var st = Number(args[1]) || defaultSpeedToEnd;
        var ss = Number(args[2]) || defaultSpeedToStart;
        Animator.setSpeed(st, ss);
        break;

      case "curve":
        var ct = args[1] || "linear";
        var cs = args[2] || "linear";
        Animator.setCurve(ct, cs);
        break;

      case "delaykeyframe":
        var ds = Number(args[1]) || defaultDelayAtStart;
        var de = Number(args[2]) || defaultDelayAtEnd;
        Animator.setDelayKeyFrame(ds, de);
        break;

      case "stopatstart":
        Animator.stopAtStart();
        break;

      case "stopatend":
        Animator.stopAtEnd();
        break;

      case "tostart":
        Animator.toStart();
        break;

      case "toend":
        Animator.toEnd();
        break;

      case "wait":
      case "await":
        if (args[1]) {
          Animator.waitForFrame(Number(args[1]), this);
        } else {
          Animator.waitForEnd(this);
        }
        break;

      case "changepictureid":
      case "changepictureids":
        var slot = Number(args[1]) || defaultSlot;
        Animator.changePictureId(slot);
        break;

      case "sound":
        var soundName = args[1] || "";
        var soundVolume = args[2] !== undefined ? Number(args[2]) : 100;
        Animator.setSound(soundName, soundVolume);
        break;
    }
  };

  // --- Wait Mode ---
  var _Game_Interpreter_updateWaitMode =
    Game_Interpreter.prototype.updateWaitMode;
  Game_Interpreter.prototype.updateWaitMode = function () {
    if (this._waitMode === "miznk_animator") {
      if (Animator.isWaiting()) return true;
      this._waitMode = "";
      return false;
    }
    return _Game_Interpreter_updateWaitMode.call(this);
  };

  // --- Scene Updates ---
  var _Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function () {
    _Scene_Map_update.call(this);
    Animator.update();
  };

  var _Scene_Battle_update = Scene_Battle.prototype.update;
  Scene_Battle.prototype.update = function () {
    _Scene_Battle_update.call(this);
    Animator.update();
  };

  var _Scene_Map_start = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function () {
    _Scene_Map_start.call(this);
    Animator.onSceneChange();
  };

  var _Scene_Battle_start = Scene_Battle.prototype.start;
  Scene_Battle.prototype.start = function () {
    _Scene_Battle_start.call(this);
    Animator.onSceneChange();
  };
})();
