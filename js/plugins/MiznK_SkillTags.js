/*:
 * @plugindesc Система пользовательских тегов навыков
 * @author MiznK
 * @version 1.0.0
 * @description Добавляет систему пользовательских тегов для навыков с гибкой блокировкой.
 *
 * @help MiznK_SkillTags.js
 * ============================================================================
 * Система пользовательских тегов навыков
 * ============================================================================
 *
 * Этот плагин позволяет добавлять пользовательские теги к навыкам и
 * интегрируется с плагином Yanfly SelectionControl, переопределяя его
 * методы, чтобы тот обрабатывал эти пользовательские теги.
 * !!! Это значит что он требует наличия плагина Yanfly SelectionControl !!!
 *
 * ============================================================================
 * Пример
 * ============================================================================
 *
 * 1. Добавляем тег в Notes Навыков:
 *    <Tag: Targeted Attack>
 *    <Tag: My Custom Tag>
 *
 * 2. Блокируем использование навыка с заданным тегом на цель,
 *    у которой в Notes состояния/экипировки:
 *    <Cannot Select: Targeted Attack>
 *    <Cannot Select: My Custom Tag>
 *
 * Навыки могут иметь несколько тегов.
 */

(function () {
  "use strict";

  //=========================================================================
  // DataManager - Process Custom Tags
  //=========================================================================
  var _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
  DataManager.isDatabaseLoaded = function () {
    if (!_DataManager_isDatabaseLoaded.call(this)) return false;
    this.processCustomSkillTags($dataSkills);
    return true;
  };

  DataManager.processCustomSkillTags = function (group) {
    for (var n = 1; n < group.length; n++) {
      var obj = group[n];
      if (!obj) continue;

      obj.customTags = obj.customTags || [];
      var matches = obj.note.match(/<Tag:[ ](.*)>/gi);
      if (matches) {
        for (var i = 0; i < matches.length; i++) {
          var tag = matches[i].match(/<Tag:[ ](.*)>/i)[1].trim();
          obj.customTags.push(tag.toUpperCase());
        }
      }
    }
  };

  //=========================================================================
  // Game_Action - Custom Tag Check (после Selection Control)
  //=========================================================================
  var _Game_Action_checkAllSelectionConditions =
    Game_Action.prototype.checkAllSelectionConditions;
  Game_Action.prototype.checkAllSelectionConditions = function (user, target) {
    // Сначала все стандартные проверки Selection Control
    if (!_Game_Action_checkAllSelectionConditions.call(this, user, target)) {
      return false;
    }

    // Теперь проверяем кастомные теги
    return this.checkCustomTagConditions(target);
  };

  Game_Action.prototype.checkCustomTagConditions = function (target) {
    if (!this.item() || !this.item().customTags) return true;

    var states = target.states();
    for (var i = 0; i < states.length; i++) {
      var state = states[i];
      if (!state || !state.cannotSelect) continue;

      for (var j = 0; j < state.cannotSelect.length; j++) {
        var blockedTag = state.cannotSelect[j].toUpperCase();
        if (this.item().customTags.contains(blockedTag)) {
          return false; // Заблокировано кастомным тегом
        }
      }
    }

    return true;
  };
})();
