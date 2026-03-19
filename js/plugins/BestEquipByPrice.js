/*:
 * @target MV MZ
 * @plugindesc Заменяет кнопку "Лучшее" — теперь выбор идёт по цене предметов.
 *
 * @help
 * Этот плагин изменяет логику кнопки "Лучшее".
 * Теперь "лучший" предмет определяется по его цене (price).
 */

(() => {

    Game_Actor.prototype.optimizeEquipments = function() {
        const maxSlots = this.equipSlots().length;
        this.clearEquipments();
        for (let i = 0; i < maxSlots; i++) {
            if (this.isEquipChangeOk(i)) {
                this.changeEquip(i, this.bestEquipItem(i));
            }
        }
    };

    Game_Actor.prototype.bestEquipItem = function(slotId) {
        const etypeId = this.equipSlots()[slotId];
        const items = $gameParty.equipItems().filter(function(item) {
            return item.etypeId === etypeId && this.canEquip(item);
        }, this);

        let bestItem = null;
        let bestPrice = -Infinity;

        for (let i = 0; i < items.length; i++) {
            const price = items[i].price || 0;
            if (price > bestPrice) {
                bestPrice = price;
                bestItem = items[i];
            }
        }

        return bestItem;
    };

})();
