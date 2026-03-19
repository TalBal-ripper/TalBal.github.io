//=============================================================================
// ChoiceWindowPosition.js
//=============================================================================

(function () {
  "use strict";

  // Сохраняем оригинальный метод
  var _Window_ChoiceList_updatePlacement =
    Window_ChoiceList.prototype.updatePlacement;

  Window_ChoiceList.prototype.updatePlacement = function () {
    // Вызываем оригинальный метод
    _Window_ChoiceList_updatePlacement.call(this);

    // Если есть кастомная позиция - применяем её
    if (
      typeof $dataSystem.customChoiceY !== "undefined" &&
      $dataSystem.customChoiceY !== null
    ) {
      this.y = $dataSystem.customChoiceY;
    }
  };
})();

// Глобальные функции для использования в событиях
window.setChoiceY = function (y) {
  $dataSystem.customChoiceY = y;
};

window.resetChoiceY = function () {
  $dataSystem.customChoiceY = null;
};
