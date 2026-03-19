/*:
 * @target MZ
 * @plugindesc Деление опыта лидера на 5, синхронизация опыта и однократная смена классов с обновлением навыков при старте игры.
 * @author Dima
 */

(() => {
  const LEADER_ID = 1;
  const CHECK_CLASS_ID = 6;

  const CLASS_CHANGE_MAP = {
    1: 11, // лидер → 11
    3: 12, // актёр 3 → 12
    4: 14, // актёр 4 → 14
  };

  // ===== Делим опыт лидера (только при загрузке) =====
  function adjustLeaderExpOnLoad() {
    const leader = $gameActors.actor(LEADER_ID);
    if (leader && leader.isClass($dataClasses[CHECK_CLASS_ID])) {
      changeUlfa();
      const currentExp = leader.currentExp();
      const newExp = Math.floor(currentExp / 4);
      leader.changeExp(newExp, false);
      syncAllActorsToLeader();
      performOneTimeClassChange();
      deleteOldItems();
    }
  }

  function changeUlfa() {
    if (
      ($gameSystem.isQuestAdded(4) && !$gameSystem.isQuestCompleted(4)) ||
      ($gameSystem.isQuestAdded(7) && !$gameSystem.isQuestCompleted(7))
    ) {
      $gameParty.removeActor(3);
      $gameParty.addActor(8);
    }
  }

  function deleteOldItems() {
    $gameParty.loseItem($dataItems[7], $gameParty.numItems($dataItems[7]));
    const ids = [LEADER_ID, 3, 4];
    for (const id of ids) {
      const actor = $gameActors.actor(id);
      if (actor) actor.clearEquipments();
    }
    $gameParty._weapons = {};
    $gameParty._armors = {};
    //Эйрик
    $gameActors.actor(LEADER_ID).changeEquipById(1, 29);
    $gameActors.actor(LEADER_ID).changeEquipById(2, 24);
    $gameActors.actor(LEADER_ID).changeEquipById(3, 45);
    $gameActors.actor(LEADER_ID).changeEquipById(4, 44);
    //Ульфа
    $gameActors.actor(3).changeEquipById(1, 24);
    $gameActors.actor(3).changeEquipById(2, 26);
    $gameActors.actor(3).changeEquipById(3, 33);
    $gameActors.actor(3).changeEquipById(4, 32);
    //Рокси
    $gameActors.actor(4).changeEquipById(1, 36);
    $gameActors.actor(4).changeEquipById(2, 30);
    $gameActors.actor(4).changeEquipById(3, 39);
    $gameActors.actor(4).changeEquipById(4, 38);

    $gameParty.gainGold(200);
  }

  // ===== Синхронизация EXP всей партии =====
  function syncAllActorsToLeader() {
    const leader = $gameActors.actor(LEADER_ID);
    if (!leader) return;
    const leaderExp = leader.currentExp();
    for (let i = 1; i < $gameActors._data.length; i++) {
      const actor = $gameActors.actor(i);
      if (actor && actor.currentExp() !== leaderExp) {
        actor.changeExp(leaderExp, false);
      }
    }
  }

  // ===== Одноразовая смена классов =====
  function performOneTimeClassChange() {
    for (const actorId in CLASS_CHANGE_MAP) {
      const newClassId = CLASS_CHANGE_MAP[actorId];
      const actor = $gameActors.actor(Number(actorId));
      if (!actor) continue;

      const currentExp = actor.currentExp();

      // меняем класс
      actor.changeClass(newClassId, false);

      // полностью очищаем навыки
      actor._skills = [];

      // выставляем exp (пересчёт уровня)
      actor.changeExp(currentExp, false);

      const currentLevel = actor._level;
      const classData = $dataClasses[actor._classId];

      if (classData && classData.learnings) {
        classData.learnings.forEach((learning) => {
          if (learning.level <= currentLevel) {
            actor.learnSkill(learning.skillId);
          }
        });
      }

      actor.recoverAll();
    }
  }

  // ===== Новая игра =====
  const _DataManager_setupNewGame = DataManager.setupNewGame;
  DataManager.setupNewGame = function () {
    _DataManager_setupNewGame.call(this);
    adjustLeaderExpOnLoad();
  };

  // ===== Загрузка сохранения =====
  const _Game_System_onAfterLoad = Game_System.prototype.onAfterLoad;
  Game_System.prototype.onAfterLoad = function () {
    if (_Game_System_onAfterLoad) _Game_System_onAfterLoad.call(this);
    adjustLeaderExpOnLoad();
  };

  // ===== Телепортация =====
  const _Game_Player_performTransfer = Game_Player.prototype.performTransfer;
  Game_Player.prototype.performTransfer = function () {
    _Game_Player_performTransfer.call(this);
    syncAllActorsToLeader();
  };

  // ===== Добавление персонажа в партию =====
  const _Game_Party_addActor = Game_Party.prototype.addActor;
  Game_Party.prototype.addActor = function (actorId) {
    _Game_Party_addActor.call(this, actorId);
    syncAllActorsToLeader();
  };
})();
