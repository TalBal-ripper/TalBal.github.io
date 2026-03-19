//=============================================================================
// SyncIndependentItems.js
//=============================================================================

/*:
 * @plugindesc v1.0 Синхронизирует independent items с базой данных при загрузке сейва.
 * @author MiznK
 *
 * @param Sync Icon
 * @type boolean
 * @on YES
 * @off NO
 * @desc Синхронизировать иконку?
 * @default true
 *
 * @param Sync Description
 * @type boolean
 * @on YES
 * @off NO
 * @desc Синхронизировать описание?
 * @default true
 *
 * @param Sync Price
 * @type boolean
 * @on YES
 * @off NO
 * @desc Синхронизировать цену?
 * @default true
 *
 * @param Sync Animation
 * @type boolean
 * @on YES
 * @off NO
 * @desc Синхронизировать анимацию?
 * @default true
 *
 * @param Sync Parameters
 * @type boolean
 * @on YES
 * @off NO
 * @desc Синхронизировать параметры оружия/брони? (Осторожно с random variance)
 * @default false
 *
 * @param Sync Traits
 * @type boolean
 * @on YES
 * @off NO
 * @desc Синхронизировать traits?
 * @default true
 *
 * @param Sync Effects
 * @type boolean
 * @on YES
 * @off NO
 * @desc Синхронизировать effects (для предметов)?
 * @default true
 *
 * @param Sync Note
 * @type boolean
 * @on YES
 * @off NO
 * @desc Синхронизировать notetag? (Только если Midgame Note Parsing включен)
 * @default false
 *
 * @help
 * ============================================================================
 * Описание
 * ============================================================================
 *
 * Этот плагин решает проблему с YEP_ItemCore, когда independent items
 * сохраняют свои данные в сейве и не обновляются при изменении базы данных.
 *
 * При загрузке сейва плагин автоматически синхронизирует выбранные поля
 * всех independent items с их базовыми версиями из базы данных.
 *
 * ============================================================================
 * Важно
 * ============================================================================
 *
 * - Размещайте этот плагин ПОСЛЕ YEP_ItemCore
 *
 * - Sync Parameters по умолчанию выключен, потому что YEP_ItemCore
 *   использует random variance для параметров. Если включить, все
 *   рандомные бонусы будут сброшены на базовые значения.
 *
 * - Если у вас есть плагины, которые модифицируют конкретные экземпляры
 *   предметов (например, система улучшений), соответствующие поля
 *   будут перезаписаны базовыми значениями.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * v1.0 - Релиз
 *
 */
//=============================================================================

(function () {
  var parameters = PluginManager.parameters("SyncIndependentItems");
  var syncIcon = String(parameters["Sync Icon"] || "true") === "true";
  var syncDescription =
    String(parameters["Sync Description"] || "true") === "true";
  var syncPrice = String(parameters["Sync Price"] || "true") === "true";
  var syncAnimation = String(parameters["Sync Animation"] || "true") === "true";
  var syncParameters =
    String(parameters["Sync Parameters"] || "false") === "true";
  var syncTraits = String(parameters["Sync Traits"] || "true") === "true";
  var syncEffects = String(parameters["Sync Effects"] || "true") === "true";
  var syncNote = String(parameters["Sync Note"] || "false") === "true";

  var _DataManager_extractSaveContents = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function (contents) {
    _DataManager_extractSaveContents.call(this, contents);
    this.syncIndependentItemsWithDatabase();
  };

  DataManager.syncIndependentItemsWithDatabase = function () {
    this.syncIndependentContainer(this._independentItems, $dataItems, "item");
    this.syncIndependentContainer(
      this._independentWeapons,
      $dataWeapons,
      "weapon",
    );
    this.syncIndependentContainer(
      this._independentArmors,
      $dataArmors,
      "armor",
    );
  };

  DataManager.syncIndependentContainer = function (container, database, type) {
    if (!container) return;

    for (var i = 0; i < container.length; i++) {
      var item = container[i];
      if (!item || !item.baseItemId) continue;

      var baseItem = database[item.baseItemId];
      if (!baseItem) continue;

      this.syncItemFields(item, baseItem, type);
    }
  };

  DataManager.syncItemFields = function (item, baseItem, type) {
    // Иконка
    if (syncIcon) {
      item.iconIndex = baseItem.iconIndex;
      item.baseItemIconIndex = baseItem.iconIndex;
    }

    // Описание
    if (syncDescription) {
      item.description = baseItem.description;
    }

    // Цена
    if (syncPrice) {
      item.price = baseItem.price;
      item.baseItemPrice = baseItem.price;
    }

    // Анимация
    if (syncAnimation) {
      item.animationId = baseItem.animationId;
    }

    // Note (только если включено)
    if (syncNote) {
      item.note = baseItem.note;
    }

    // Общие поля для всех типов
    item.meta = JsonEx.makeDeepCopy(baseItem.meta);

    // Поля специфичные для типа
    if (type === "item") {
      this.syncItemSpecificFields(item, baseItem);
    } else {
      this.syncEquipSpecificFields(item, baseItem, type);
    }
  };

  DataManager.syncItemSpecificFields = function (item, baseItem) {
    // Тип предмета
    item.itypeId = baseItem.itypeId;
    item.consumable = baseItem.consumable;
    item.scope = baseItem.scope;
    item.occasion = baseItem.occasion;
    item.speed = baseItem.speed;
    item.successRate = baseItem.successRate;
    item.repeats = baseItem.repeats;
    item.tpGain = baseItem.tpGain;
    item.hitType = baseItem.hitType;
    item.damage = JsonEx.makeDeepCopy(baseItem.damage);

    // Effects
    if (syncEffects) {
      item.effects = JsonEx.makeDeepCopy(baseItem.effects);
    }
  };

  DataManager.syncEquipSpecificFields = function (item, baseItem, type) {
    // Тип экипировки
    item.etypeId = baseItem.etypeId;

    // Параметры (осторожно - сбросит random variance)
    if (syncParameters) {
      item.params = baseItem.params.slice();
    }

    // Traits
    if (syncTraits) {
      item.traits = JsonEx.makeDeepCopy(baseItem.traits);
    }

    // Специфичные для оружия
    if (type === "weapon") {
      item.wtypeId = baseItem.wtypeId;
    }

    // Специфичные для брони
    if (type === "armor") {
      item.atypeId = baseItem.atypeId;
    }
  };
})();
