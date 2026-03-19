/*:
 * @plugindesc Простая контратака на навыки с тегами
 * @author MiznK
 * @version 1.4.0
 * @description Контратака срабатывает на навыки с тегом "Targeted Attack" и персонаж получает урон + контратакует.
 *
 * @help MiznK_CounterAttackSystem.js
 * ============================================================================
 * Простая система контратак с тегами для CTB
 * ============================================================================
 *
 * Требования:
 * - YEP_BattleEngineCore
 * - YEP_X_BattleSysCTB
 * - MiznK_SkillTags (система тегов)
 *
 * Как работает:
 * 1. Навык с тегом <Tag: Targeted Attack> может вызвать контратаку
 * 2. Персонаж ПОЛУЧАЕТ урон И контратакует (даже при промахе)
 * 3. Полностью заменяет стандартную систему контратак
 */

(() => {
  "use strict";

  // Проверяем наличие тега "Targeted Attack"
  Game_Action.prototype.hasTargetedAttackTag = function () {
    var item = this.item();
    if (!item) return false;
    if (!item.customTags) return false;
    return item.customTags.contains("TARGETED ATTACK");
  };

  // Инициализация
  var _BattleManager_initMembers = BattleManager.initMembers;
  BattleManager.initMembers = function () {
    _BattleManager_initMembers.call(this);
    this._pendingCounters = [];
  };

  // Переопределяем itemCnt чтобы возвращать шанс для навыков с тегом
  var _Game_Action_itemCnt = Game_Action.prototype.itemCnt;
  Game_Action.prototype.itemCnt = function (target) {
    if (this.hasTargetedAttackTag()) {
      // Для навыков с тегом проверяем условия
      if (!this.isPhysical()) return 0;
      if (!target.canMove()) return 0;
      return target.cnt; // Возвращаем шанс контратаки
    }
    // Для остальных навыков - блокируем контратаку
    return 0;
  };

  // Переопределяем invokeCounterAttack
  var _BattleManager_invokeCounterAttack = BattleManager.invokeCounterAttack;
  BattleManager.invokeCounterAttack = function (subject, target) {
    if (this._action && this._action.hasTargetedAttackTag()) {
      // Для навыков с тегом - сначала применяем урон
      this.invokeNormalAction(subject, target);

      // Проверяем, жива ли цель после урона
      if (target.isAlive()) {
        // Добавляем контратаку в очередь
        this._pendingCounters = this._pendingCounters || [];
        this._pendingCounters.push({
          subject: subject,
          target: target,
        });
      }
    } else {
      // Для остальных - стандартная контратака (но она не сработает из-за itemCnt = 0)
      _BattleManager_invokeCounterAttack.call(this, subject, target);
    }
  };

  // Добавляем обработку контратак в конец действия
  var _BattleManager_createFinishActions = BattleManager.createFinishActions;
  BattleManager.createFinishActions = function () {
    _BattleManager_createFinishActions.call(this);
    if (this._pendingCounters && this._pendingCounters.length > 0) {
      this._actionList.push(["PROCESS COUNTERS"]);
    }
  };

  // Обработка контратак
  var _BattleManager_processActionSequence =
    BattleManager.processActionSequence;
  BattleManager.processActionSequence = function (actionName, actionArgs) {
    if (actionName === "PROCESS COUNTERS") {
      return this.actionProcessCounters();
    }
    return _BattleManager_processActionSequence.call(
      this,
      actionName,
      actionArgs,
    );
  };

  BattleManager.actionProcessCounters = function () {
    if (!this._pendingCounters || this._pendingCounters.length === 0) {
      this._pendingCounters = [];
      return true;
    }

    var counter = this._pendingCounters.shift();
    if (!counter) return true;

    var subject = counter.subject;
    var target = counter.target;

    // Финальная проверка
    if (!target.isAlive() || !target.canMove()) {
      return this.actionProcessCounters();
    }

    // Показываем сообщение
    this._logWindow.displayCounter(target);
    this._logWindow.push("wait");

    // Создаём контратаку
    var action = new Game_Action(target);
    action.setAttack();
    action.setTarget(subject.index());

    this._logWindow.push("showAnimation", target, [subject], 1);
    this._logWindow.push("waitForAnimation");

    // Выполняем
    action.apply(subject);
    this._logWindow.displayActionResults(target, subject);

    if (subject.isDead()) {
      subject.performCollapse();
    }

    this._logWindow.push("wait");

    // Обрабатываем следующую контратаку
    return this.actionProcessCounters();
  };
})();
