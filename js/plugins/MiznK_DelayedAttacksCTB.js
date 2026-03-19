/*:
 * @plugindesc Система отложенных атак
 * @author MiznK
 *
 * @param defaultAimingStateId
 * @text Cостояние Подготовка
 * @type state
 * @default 113
 *
 * @param defaultTargetedStateId
 * @text Состояние Под прицелом
 * @type state
 * @default 114
 *
 * @help
 * ============================================================================
 * Система отложенных атак для RPG Maker MV
 * ============================================================================
 *
 * Note-теги для навыков отложенной атаки:
 *
 * Базовый формат:
 * <Delayed Attack: Release 202>
 *  Где 202 - ID навыка, который будет вызван на следующем ходу
 *
 * С кастомными состояниями:
 * <Delayed Attack: Release 202, Aiming 103, Targeted 104>
 *  Где:
 *    202 - ID навыка, который будет вызван на следующем ходу
 *    103 - ID альтернативы состояния "Подготовка"
 *    104 - ID альтернативы состояния "Под прицелом"
 *
 * Note-теги для состояний прерывания (дезориентация, оглушение и т.д.):
 * <Delayed Attack Interrupt>
 *  При накладывании состояния с такой пометкой,отложенная атака будет прервана
 * ============================================================================
 * Примеры:
 *
 * 1. Простой снайперский выстрел:
 * <Delayed Attack: Release 301>
 *
 * 2. Магическая руна с уникальными состояниями:
 * <Delayed Attack: Release 302, Aiming 201, Targeted 202>
 *
 * ============================================================================
 */
(function () {
  "use strict";

  // Параметры плагина
  var parameters = PluginManager.parameters("MiznK_DelayedAttacksCTB");
  var DEFAULT_AIMING_STATE = Number(parameters["defaultAimingStateId"] || 113);
  var DEFAULT_TARGETED_STATE = Number(
    parameters["defaultTargetedStateId"] || 114,
  );

  //=============================================================================
  // Менеджер отложенных атак
  //=============================================================================

  var DelayedAttackManager = {
    // Кэш для парсинга note-тегов
    _cache: {},

    // Парсинг note-тега навыка
    parseSkillNote: function (skill) {
      if (this._cache[skill.id]) {
        return this._cache[skill.id];
      }

      var match = skill.note.match(
        /<Delayed\s*Attack\s*:\s*Release\s+(\d+)(?:\s*,\s*Aiming\s+(\d+))?(?:\s*,\s*Targeted\s+(\d+))?>/i,
      );

      if (match) {
        var data = {
          isDelayedAttack: true,
          releaseSkillId: Number(match[1]),
          aimingStateId: Number(match[2]) || DEFAULT_AIMING_STATE,
          targetedStateId: Number(match[3]) || DEFAULT_TARGETED_STATE,
        };
        this._cache[skill.id] = data;
        return data;
      }

      this._cache[skill.id] = { isDelayedAttack: false };
      return this._cache[skill.id];
    },

    // Проверка, является ли навык отложенной атакой
    isDelayedAttack: function (skill) {
      if (!DataManager.isSkill(skill)) return false;
      var data = this.parseSkillNote(skill);
      return data.isDelayedAttack;
    },

    // Применение состояния прицеливания
    applyAiming: function (user, target, setupSkill) {
      var data = this.parseSkillNote(setupSkill);
      if (!data.isDelayedAttack) return;

      // Очищаем предыдущую отложенную атаку, если есть
      if (user._delayedAttack) {
        this.removeAiming(user);
      }

      // Сохраняем данные в пользователе
      user._delayedAttack = {
        targetIndex: target.index(),
        targetIsActor: target.isActor(),
        releaseSkillId: data.releaseSkillId,
        aimingStateId: data.aimingStateId,
        targetedStateId: data.targetedStateId,
      };

      // Применяем состояния
      user.addState(data.aimingStateId);
      target.addState(data.targetedStateId);

      // Сохраняем ссылку на стрелка в цели
      if (!target._delayedAttackShooters) {
        target._delayedAttackShooters = [];
      }
      target._delayedAttackShooters.push({
        shooter: user,
        aimingStateId: data.aimingStateId,
      });
    },

    // Снятие состояния прицеливания
    removeAiming: function (user) {
      if (!user._delayedAttack) return;

      var target = this.getTarget(user);
      if (target) {
        // Убираем состояние с цели
        target.removeState(user._delayedAttack.targetedStateId);

        // Убираем ссылку на стрелка
        if (target._delayedAttackShooters) {
          target._delayedAttackShooters = target._delayedAttackShooters.filter(
            function (item) {
              return item.shooter !== user;
            },
          );
        }
      }

      // Убираем состояние прицеливания с самого пользователя
      user.removeState(user._delayedAttack.aimingStateId);

      // Очищаем данные
      user._delayedAttack = null;
    },

    // Получение цели
    getTarget: function (user) {
      if (!user._delayedAttack) return null;

      var targetIndex = user._delayedAttack.targetIndex;
      if (user._delayedAttack.targetIsActor) {
        return $gameParty.members()[targetIndex];
      } else {
        return $gameTroop.members()[targetIndex];
      }
    },

    // Проверка валидности цели
    isTargetValid: function (user) {
      var target = this.getTarget(user);
      return target && target.isAlive();
    },

    // Прерывание всех прицеливаний на цель
    interruptAimingAtTarget: function (target) {
      if (!target._delayedAttackShooters) return;

      target._delayedAttackShooters.forEach(function (item) {
        if (item.shooter && item.shooter.isStateAffected(item.aimingStateId)) {
          item.shooter.removeState(item.aimingStateId);
        }
      });

      target._delayedAttackShooters = [];
    },

    // Создание действия релиза
    createReleaseAction: function (user) {
      if (!user._delayedAttack) return null;

      var action = new Game_Action(user);
      action.setSkill(user._delayedAttack.releaseSkillId);

      // Устанавливаем цель более надежно
      var target = this.getTarget(user);
      if (target) {
        if (user.isActor()) {
          action._targetIndex = user._delayedAttack.targetIndex;
        } else {
          action._targetIndex = user._delayedAttack.targetIndex;
        }
        // Форсируем установку цели
        action.setTarget(user._delayedAttack.targetIndex);
      }

      return action;
    },
  };

  window.DelayedAttackManager = DelayedAttackManager;

  //=============================================================================
  // DataManager - обработка note-тегов состояний
  //=============================================================================

  var _DataManager_onLoad = DataManager.onLoad;
  DataManager.onLoad = function (object) {
    _DataManager_onLoad.call(this, object);
    if (object === $dataStates) {
      this.processDelayedAttackStateNotetags($dataStates);
    }
  };

  DataManager.processDelayedAttackStateNotetags = function (states) {
    for (var i = 1; i < states.length; i++) {
      var state = states[i];
      if (!state) continue;

      if (state.meta["Delayed Attack Interrupt"]) {
        state._isDelayedAttackInterrupt = true;
      }
      if (state.meta["Delayed Attack Escape"]) {
        state._isDelayedAttackEscape = true;
      }
    }
  };

  //=============================================================================
  // Game_Battler
  //=============================================================================

  var _Game_Battler_addState = Game_Battler.prototype.addState;
  Game_Battler.prototype.addState = function (stateId) {
    _Game_Battler_addState.call(this, stateId);

    var state = $dataStates[stateId];
    if (!state) return;

    // Проверка прерывания любых активных прицеливаний НА АТАКУЮЩЕМ
    if (state._isDelayedAttackInterrupt && this._delayedAttack) {
      if (this.isStateAffected(this._delayedAttack.aimingStateId)) {
        this.removeState(this._delayedAttack.aimingStateId);
      }
    }

    // Проверка ухода от прицеливания НА ЦЕЛИ
    if (state._isDelayedAttackEscape && this._delayedAttackShooters) {
      var target = this;
      this._delayedAttackShooters.forEach(function (item) {
        if (item.shooter && item.shooter.isStateAffected(item.aimingStateId)) {
          item.shooter.removeState(item.aimingStateId);
        }
      });
      this._delayedAttackShooters = [];
    }
  };

  var _Game_Battler_removeState = Game_Battler.prototype.removeState;
  Game_Battler.prototype.removeState = function (stateId) {
    // Проверяем, является ли это состоянием прицеливания
    if (this._delayedAttack && stateId === this._delayedAttack.aimingStateId) {
      // Очищаем данные БЕЗ повторного вызова removeState
      var target = DelayedAttackManager.getTarget(this);
      if (target) {
        _Game_Battler_removeState.call(
          target,
          this._delayedAttack.targetedStateId,
        );
        if (target._delayedAttackShooters) {
          var self = this;
          target._delayedAttackShooters = target._delayedAttackShooters.filter(
            function (item) {
              return item.shooter !== self;
            },
          );
        }
      }
      this._delayedAttack = null;
    }

    _Game_Battler_removeState.call(this, stateId);
  };

  var _Game_Battler_die = Game_Battler.prototype.die;
  Game_Battler.prototype.die = function () {
    if (this._delayedAttack) {
      DelayedAttackManager.removeAiming(this);
    }
    _Game_Battler_die.call(this);
    DelayedAttackManager.interruptAimingAtTarget(this);
  };

  var _Game_Battler_onAllActionsEnd = Game_Battler.prototype.onAllActionsEnd;
  Game_Battler.prototype.onAllActionsEnd = function () {
    _Game_Battler_onAllActionsEnd.call(this);

    // Снимаем состояние только после выполнения действия релиза
    if (this._delayedAttack && this._delayedAttackReleased) {
      this.removeState(this._delayedAttack.aimingStateId);
      this._delayedAttackReleased = false;
    }
  };

  //=============================================================================
  // Game_Action
  //=============================================================================

  var _Game_Action_apply = Game_Action.prototype.apply;
  Game_Action.prototype.apply = function (target) {
    var skill = this.item();
    var user = this.subject();

    // Проверяем, является ли это релизом отложенной атаки
    if (
      user._delayedAttack &&
      skill.id === user._delayedAttack.releaseSkillId
    ) {
      user._delayedAttackReleased = true;
    }

    // Проверяем, является ли это навыком установки отложенной атаки
    if (DelayedAttackManager.isDelayedAttack(skill)) {
      DelayedAttackManager.applyAiming(user, target, skill);

      // Минимальные визуальные эффекты
      if (skill.animationId > 0) {
        target.startAnimation(skill.animationId);
      }
      this.makeSuccess(target);

      // ВАЖНО: Применяем базовые эффекты для корректной работы Action Sequence
      var result = target.result();
      result.clear();
      result.used = true;
      result.success = true;

      // Обновляем состояние цели для визуального отображения
      target.startDamagePopup();

      return; // Предотвращаем двойное применение
    }

    _Game_Action_apply.call(this, target);
  };

  //=============================================================================
  // Game_Actor & Game_Enemy - автоматические действия
  //=============================================================================

  var _Game_Actor_makeActions = Game_Actor.prototype.makeActions;
  Game_Actor.prototype.makeActions = function () {
    // Проверяем сначала CTB
    if (
      BattleManager.isCTB() &&
      this._delayedAttack &&
      this.isStateAffected(this._delayedAttack.aimingStateId)
    ) {
      // В CTB обработка будет в startCTBInput
      return;
    }

    // Обычная логика для не-CTB систем
    if (
      !BattleManager.isCTB() &&
      this._delayedAttack &&
      this.isStateAffected(this._delayedAttack.aimingStateId)
    ) {
      if (!DelayedAttackManager.isTargetValid(this)) {
        this.removeState(this._delayedAttack.aimingStateId);
        _Game_Actor_makeActions.call(this);
        return;
      }

      this.clearActions();
      var action = DelayedAttackManager.createReleaseAction(this);
      if (action) {
        this._actions.push(action);
        this._forcedAction = true;
      }
    } else {
      _Game_Actor_makeActions.call(this);
    }
  };

  var _Game_Enemy_makeActions = Game_Enemy.prototype.makeActions;
  Game_Enemy.prototype.makeActions = function () {
    if (
      this._delayedAttack &&
      this.isStateAffected(this._delayedAttack.aimingStateId)
    ) {
      if (!DelayedAttackManager.isTargetValid(this)) {
        this.removeState(this._delayedAttack.aimingStateId);
        _Game_Enemy_makeActions.call(this);
        return;
      }

      this.clearActions();
      var action = DelayedAttackManager.createReleaseAction(this);
      if (action) {
        this._actions.push(action);
      }
    } else {
      _Game_Enemy_makeActions.call(this);
    }
  };

  //=============================================================================
  // Scene_Battle
  //=============================================================================

  var _Scene_Battle_isAnyInputWindowActive =
    Scene_Battle.prototype.isAnyInputWindowActive;
  Scene_Battle.prototype.isAnyInputWindowActive = function () {
    if (BattleManager.actor() && BattleManager.actor()._forcedAction) {
      BattleManager.actor()._forcedAction = false;
      this.selectNextCommand();
      return false;
    }
    return _Scene_Battle_isAnyInputWindowActive.call(this);
  };

  //=============================================================================
  // Очистка
  //=============================================================================

  var _Game_Battler_onBattleEnd = Game_Battler.prototype.onBattleEnd;
  Game_Battler.prototype.onBattleEnd = function () {
    _Game_Battler_onBattleEnd.call(this);
    this._delayedAttack = null;
    this._delayedAttackShooters = null;
    this._forcedAction = false;
    this._delayedAttackReleased = false;
  };

  var _Game_Battler_refresh = Game_Battler.prototype.refresh;
  Game_Battler.prototype.refresh = function () {
    _Game_Battler_refresh.call(this);

    // Очищаем данные, если нет состояния прицеливания
    if (
      this._delayedAttack &&
      !this.isStateAffected(this._delayedAttack.aimingStateId)
    ) {
      this._delayedAttack = null;
    }
  };

  //=============================================================================
  // Совместимость с CTB
  //=============================================================================

  if (Imported.YEP_X_BattleSysCTB) {
    // Переопределяем setupCTBCharge для обработки отложенных атак
    var _Game_Battler_setupCTBCharge = Game_Battler.prototype.setupCTBCharge;
    Game_Battler.prototype.setupCTBCharge = function () {
      // Если это отложенная атака на втором ходу
      if (
        this._delayedAttack &&
        this.isStateAffected(this._delayedAttack.aimingStateId)
      ) {
        // Проверяем валидность цели
        if (!DelayedAttackManager.isTargetValid(this)) {
          this.removeState(this._delayedAttack.aimingStateId);
          _Game_Battler_setupCTBCharge.call(this);
          return;
        }

        // Создаём действие релиза
        var action = DelayedAttackManager.createReleaseAction(this);
        if (action) {
          // Важно: устанавливаем действие правильно
          this.setAction(0, action);

          // Делаем навык мгновенным (без зарядки)
          this.setCTBCharging(false);
          this._ctbChargeMod = 0;
        } else {
          _Game_Battler_setupCTBCharge.call(this);
        }
      } else {
        _Game_Battler_setupCTBCharge.call(this);
      }
    };

    // Добавляем обработку в startCTBInput
    var _BattleManager_startCTBInput = BattleManager.startCTBInput;
    BattleManager.startCTBInput = function (battler) {
      // Если у battler есть отложенная атака и состояние прицеливания
      if (
        battler._delayedAttack &&
        battler.isStateAffected(battler._delayedAttack.aimingStateId)
      ) {
        // Проверяем валидность цели
        if (!DelayedAttackManager.isTargetValid(battler)) {
          battler.removeState(battler._delayedAttack.aimingStateId);
          _BattleManager_startCTBInput.call(this, battler);
          return;
        }

        // Принудительно создаем действие
        battler.clearActions();
        var action = DelayedAttackManager.createReleaseAction(battler);
        if (action) {
          battler.setAction(0, action);
        }

        // Пропускаем фазу выбора действий и сразу выполняем
        battler.setupCTBCharge();
        if (battler.isCTBCharging()) {
          this.setCTBPhase();
        } else {
          this.startCTBAction(battler);
        }
        return;
      }

      _BattleManager_startCTBInput.call(this, battler);
    };
  }
})();
