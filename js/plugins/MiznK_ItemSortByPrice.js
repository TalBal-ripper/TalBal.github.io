/*:
 * @plugindesc Сортировка предметов по цене с приоритетом потребляемых
 * @author MiznK
 *
 * @help
 * Поместите ПОСЛЕ YEP_ItemCore в списке плагинов.
 *
 * Сортировка:
 * 1. Потребляемые предметы (consumable) всегда сверху
 * 2. Внутри групп - по цене (дорогие сначала)
 * 3. При одинаковой цене - по ID
 */

(function () {
  "use strict";

  Game_Party.prototype.independentItemSort = function (a, b) {
    // Проверяем consumable статус
    var aConsumable = DataManager.isItem(a) && a.consumable;
    var bConsumable = DataManager.isItem(b) && b.consumable;

    // Если один consumable, а другой нет - consumable идёт первым
    if (aConsumable && !bConsumable) return -1;
    if (!aConsumable && bConsumable) return 1;

    // Сортировка по цене
    var priceA = a.price || 0;
    var priceB = b.price || 0;

    // Если цены одинаковые - сортируем по ID
    if (priceA === priceB) {
      var idA = a.baseItemId ? a.baseItemId : a.id;
      var idB = b.baseItemId ? b.baseItemId : b.id;
      return idA - idB;
    }

    return priceB - priceA; // Дорогие сначала
  };
})();
