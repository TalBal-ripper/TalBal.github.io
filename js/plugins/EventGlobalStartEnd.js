/*:
 * @plugindesc Полное отключение кнопок при начале события и управление в бою, магазинах и крафте
 */

(function () {
  var eventActive = false;
  var battleActive = false;
  var shopActive = false;
  var synthesisActive = false;
  var inEquipScene = false;
  var numberInputActive = false;

  function EVENT_START(eventId, mapId, trigger) {
    if (
      window.Eli &&
      Eli.MobileControls &&
      typeof Eli.MobileControls.removeButtonsFromScene === "function"
    ) {
      eventActive = true;

      // Полностью удаляем кнопки со сцены
      Eli.MobileControls.removeButtonsFromScene();

      // Дополнительно скрываем контейнер
      var container = Eli.MobileControls.getDiv();
      if (container) {
        container.style.display = "none";
      }

      // Деактивируем все кнопки
      Eli.MobileControls.buttonList.forEach(function (button) {
        if (button.deactivate) {
          button.deactivate();
        }
        if (button.resetInput) {
          button.resetInput();
        }
      });
    }
  }

  function EVENT_END(eventId, mapId, trigger) {
    if (
      window.Eli &&
      Eli.MobileControls &&
      typeof Eli.MobileControls.addButtonsOnScene === "function"
    ) {
      eventActive = false;

      // Показываем контейнер обратно только если не в бою, не в магазине, не в крафте, не в экипировке и не вводим число
      if (
        !battleActive &&
        !shopActive &&
        !synthesisActive &&
        !inEquipScene &&
        !numberInputActive
      ) {
        var container = Eli.MobileControls.getDiv();
        if (container) {
          container.style.display = "";
        }

        // Возвращаем кнопки на сцену
        Eli.MobileControls.addButtonsOnScene();
      }
    }
  }

  function BATTLE_START() {
    if (
      window.Eli &&
      Eli.MobileControls &&
      typeof Eli.MobileControls.addButtonsOnScene === "function"
    ) {
      battleActive = true;

      // Показываем контейнер
      var container = Eli.MobileControls.getDiv();
      if (container) {
        container.style.display = "";
      }

      // Возвращаем кнопки на сцену
      Eli.MobileControls.addButtonsOnScene();
    }
  }

  function BATTLE_END() {
    if (
      window.Eli &&
      Eli.MobileControls &&
      typeof Eli.MobileControls.removeButtonsFromScene === "function"
    ) {
      battleActive = false;

      // Полностью удаляем кнопки со сцены
      Eli.MobileControls.removeButtonsFromScene();

      // Дополнительно скрываем контейнер
      var container = Eli.MobileControls.getDiv();
      if (container) {
        container.style.display = "none";
      }

      // Деактивируем все кнопки
      Eli.MobileControls.buttonList.forEach(function (button) {
        if (button.deactivate) {
          button.deactivate();
        }
        if (button.resetInput) {
          button.resetInput();
        }
      });
    }
  }

  function SHOP_START() {
    if (
      window.Eli &&
      Eli.MobileControls &&
      typeof Eli.MobileControls.addButtonsOnScene === "function"
    ) {
      shopActive = true;

      // Показываем контейнер только если не вводим число
      if (!numberInputActive) {
        var container = Eli.MobileControls.getDiv();
        if (container) {
          container.style.display = "";
        }

        // Возвращаем кнопки на сцену
        Eli.MobileControls.addButtonsOnScene();
      }
    }
  }

  function SHOP_END() {
    if (
      window.Eli &&
      Eli.MobileControls &&
      typeof Eli.MobileControls.removeButtonsFromScene === "function"
    ) {
      shopActive = false;

      // Не скрываем кнопки если переходим в экипировку или вводим число
      if (!inEquipScene && !numberInputActive) {
        // Полностью удаляем кнопки со сцены
        Eli.MobileControls.removeButtonsFromScene();

        // Дополнительно скрываем контейнер
        var container = Eli.MobileControls.getDiv();
        if (container) {
          container.style.display = "none";
        }

        // Деактивируем все кнопки
        Eli.MobileControls.buttonList.forEach(function (button) {
          if (button.deactivate) {
            button.deactivate();
          }
          if (button.resetInput) {
            button.resetInput();
          }
        });
      }
    }
  }

  function SYNTHESIS_START() {
    if (
      window.Eli &&
      Eli.MobileControls &&
      typeof Eli.MobileControls.addButtonsOnScene === "function"
    ) {
      synthesisActive = true;

      // Показываем контейнер только если не вводим число
      if (!numberInputActive) {
        var container = Eli.MobileControls.getDiv();
        if (container) {
          container.style.display = "";
        }

        // Возвращаем кнопки на сцену
        Eli.MobileControls.addButtonsOnScene();
      }
    }
  }

  function SYNTHESIS_END() {
    if (
      window.Eli &&
      Eli.MobileControls &&
      typeof Eli.MobileControls.removeButtonsFromScene === "function"
    ) {
      synthesisActive = false;

      // Не скрываем кнопки если вводим число
      if (!numberInputActive) {
        // Полностью удаляем кнопки со сцены
        Eli.MobileControls.removeButtonsFromScene();

        // Дополнительно скрываем контейнер
        var container = Eli.MobileControls.getDiv();
        if (container) {
          container.style.display = "none";
        }

        // Деактивируем все кнопки
        Eli.MobileControls.buttonList.forEach(function (button) {
          if (button.deactivate) {
            button.deactivate();
          }
          if (button.resetInput) {
            button.resetInput();
          }
        });
      }
    }
  }

  function NUMBER_INPUT_START() {
    if (
      window.Eli &&
      Eli.MobileControls &&
      typeof Eli.MobileControls.addButtonsOnScene === "function"
    ) {
      numberInputActive = true;

      // ПОКАЗЫВАЕМ контейнер
      var container = Eli.MobileControls.getDiv();
      if (container) {
        container.style.display = "";
      }

      // ПОКАЗЫВАЕМ кнопки на сцене
      Eli.MobileControls.addButtonsOnScene();
    }
  }

  function NUMBER_INPUT_END() {
    if (
      window.Eli &&
      Eli.MobileControls &&
      typeof Eli.MobileControls.removeButtonsFromScene === "function"
    ) {
      numberInputActive = false;

      // СКРЫВАЕМ кнопки после ввода числа
      Eli.MobileControls.removeButtonsFromScene();

      var container = Eli.MobileControls.getDiv();
      if (container) {
        container.style.display = "none";
      }

      // Деактивируем все кнопки
      Eli.MobileControls.buttonList.forEach(function (button) {
        if (button.deactivate) {
          button.deactivate();
        }
        if (button.resetInput) {
          button.resetInput();
        }
      });
    }
  }

  function ENSURE_BUTTONS_VISIBLE() {
    // Принудительно показываем кнопки, если мы в магазине/крафте/бою/экипировке ИЛИ вводим число
    if (
      shopActive ||
      synthesisActive ||
      battleActive ||
      inEquipScene ||
      numberInputActive
    ) {
      if (
        window.Eli &&
        Eli.MobileControls &&
        typeof Eli.MobileControls.addButtonsOnScene === "function"
      ) {
        var container = Eli.MobileControls.getDiv();
        if (container && container.style.display === "none") {
          container.style.display = "";
          Eli.MobileControls.addButtonsOnScene();
        }
      }
    }
  }

  var _setup = Game_Interpreter.prototype.setup;
  Game_Interpreter.prototype.setup = function (list, eventId) {
    _setup.call(this, list, eventId);

    if (!(this._eventId > 0)) return;

    var event = $gameMap.event(this._eventId);

    if (!(event instanceof Game_Event)) return;

    var trigger = event._trigger;
    if (trigger === 0 || trigger === 1 || trigger === 2 || trigger === 3) {
      this.__globalHook = true;
      this.__triggerType = trigger;

      EVENT_START(this._eventId, $gameMap.mapId(), trigger);
    }
  };

  var _clear = Game_Interpreter.prototype.clear;
  Game_Interpreter.prototype.clear = function () {
    if (this.__globalHook) {
      EVENT_END(this._eventId, $gameMap.mapId(), this.__triggerType);
    }

    this.__globalHook = false;
    this.__triggerType = null;

    _clear.call(this);
  };

  // Дополнительный хук на команду Erase Event
  var _command214 = Game_Interpreter.prototype.command214;
  Game_Interpreter.prototype.command214 = function () {
    var result = _command214.call(this);

    // Принудительно вызываем EVENT_END при удалении события
    if (this.__globalHook) {
      EVENT_END(this._eventId, $gameMap.mapId(), this.__triggerType);
      this.__globalHook = false;
      this.__triggerType = null;
    }

    return result;
  };

  // Хук на обновление карты для проверки активных событий
  var _Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function () {
    _Scene_Map_update.call(this);

    // Проверяем, есть ли активные события
    if (
      eventActive &&
      !$gameMap.isEventRunning() &&
      !battleActive &&
      !shopActive &&
      !synthesisActive &&
      !inEquipScene &&
      !numberInputActive
    ) {
      eventActive = false;

      var container =
        window.Eli && Eli.MobileControls ? Eli.MobileControls.getDiv() : null;
      if (container) {
        container.style.display = "";
      }

      if (
        window.Eli &&
        Eli.MobileControls &&
        Eli.MobileControls.addButtonsOnScene
      ) {
        Eli.MobileControls.addButtonsOnScene();
      }
    }
  };

  // Хук на начало битвы
  var _Scene_Battle_start = Scene_Battle.prototype.start;
  Scene_Battle.prototype.start = function () {
    _Scene_Battle_start.call(this);
    BATTLE_START();
  };

  // Хук на окончание битвы
  var _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
  Scene_Battle.prototype.terminate = function () {
    BATTLE_END();
    _Scene_Battle_terminate.call(this);
  };

  // Хук на начало сцены магазина
  var _Scene_Shop_start = Scene_Shop.prototype.start;
  Scene_Shop.prototype.start = function () {
    _Scene_Shop_start.call(this);
    SHOP_START();
  };

  // Хук на окончание сцены магазина
  var _Scene_Shop_terminate = Scene_Shop.prototype.terminate;
  Scene_Shop.prototype.terminate = function () {
    SHOP_END();
    _Scene_Shop_terminate.call(this);
  };

  // Хук на обновление сцены магазина для отслеживания переключений команд
  var _Scene_Shop_update = Scene_Shop.prototype.update;
  Scene_Shop.prototype.update = function () {
    _Scene_Shop_update.call(this);
    // Проверяем кнопки при каждом обновлении магазина
    if (shopActive || numberInputActive) {
      ENSURE_BUTTONS_VISIBLE();
    }
  };

  // Хук на команды магазина (для YEP_ShopMenuCore)
  if (Window_ShopCommand.prototype.callOkHandler) {
    var _Window_ShopCommand_callOkHandler =
      Window_ShopCommand.prototype.callOkHandler;
    Window_ShopCommand.prototype.callOkHandler = function () {
      _Window_ShopCommand_callOkHandler.call(this);
      // Убедимся что кнопки видны после смены команды
      setTimeout(ENSURE_BUTTONS_VISIBLE, 50);
    };
  }

  // Хук на команду экипировки в магазине
  if (Scene_Shop.prototype.commandEquip) {
    var _Scene_Shop_commandEquip = Scene_Shop.prototype.commandEquip;
    Scene_Shop.prototype.commandEquip = function () {
      inEquipScene = true;
      _Scene_Shop_commandEquip.call(this);
    };
  }

  // Хук на Window_ShopNumber (окно ввода количества в магазине)
  var _Window_ShopNumber_show = Window_ShopNumber.prototype.show;
  Window_ShopNumber.prototype.show = function () {
    _Window_ShopNumber_show.call(this);
    NUMBER_INPUT_START();
  };

  var _Window_ShopNumber_hide = Window_ShopNumber.prototype.hide;
  Window_ShopNumber.prototype.hide = function () {
    _Window_ShopNumber_hide.call(this);
    NUMBER_INPUT_END();
  };

  // Хук на начало сцены экипировки
  var _Scene_Equip_create = Scene_Equip.prototype.create;
  Scene_Equip.prototype.create = function () {
    _Scene_Equip_create.call(this);
    if (shopActive || inEquipScene) {
      ENSURE_BUTTONS_VISIBLE();
    }
  };

  // Хук на окончание сцены экипировки
  var _Scene_Equip_popScene = Scene_Equip.prototype.popScene;
  Scene_Equip.prototype.popScene = function () {
    _Scene_Equip_popScene.call(this);
    // Если возвращаемся в магазин, сохраняем кнопки
    if (shopActive) {
      inEquipScene = false;
      setTimeout(ENSURE_BUTTONS_VISIBLE, 100);
    } else {
      inEquipScene = false;
    }
  };

  // Хук на обновление сцены экипировки
  var _Scene_Equip_update = Scene_Equip.prototype.update;
  Scene_Equip.prototype.update = function () {
    _Scene_Equip_update.call(this);
    // Постоянно проверяем кнопки в экипировке
    if (shopActive || inEquipScene || numberInputActive) {
      ENSURE_BUTTONS_VISIBLE();
    }
  };

  // Хук на начало сцены крафта (Item Synthesis)
  if (typeof Scene_Synthesis !== "undefined") {
    var _Scene_Synthesis_start = Scene_Synthesis.prototype.start;
    Scene_Synthesis.prototype.start = function () {
      if (_Scene_Synthesis_start) {
        _Scene_Synthesis_start.call(this);
      }
      SYNTHESIS_START();
    };

    // Хук на окончание сцены крафта
    var _Scene_Synthesis_terminate = Scene_Synthesis.prototype.terminate;
    Scene_Synthesis.prototype.terminate = function () {
      SYNTHESIS_END();
      if (_Scene_Synthesis_terminate) {
        _Scene_Synthesis_terminate.call(this);
      }
    };

    // Хук на обновление сцены крафта
    var _Scene_Synthesis_update = Scene_Synthesis.prototype.update;
    Scene_Synthesis.prototype.update = function () {
      if (_Scene_Synthesis_update) {
        _Scene_Synthesis_update.call(this);
      }
      if (synthesisActive || numberInputActive) {
        ENSURE_BUTTONS_VISIBLE();
      }
    };

    // Хук на Window_SynthesisNumber (окно ввода количества в крафте)
    if (typeof Window_SynthesisNumber !== "undefined") {
      var _Window_SynthesisNumber_show = Window_SynthesisNumber.prototype.show;
      Window_SynthesisNumber.prototype.show = function () {
        _Window_SynthesisNumber_show.call(this);
        NUMBER_INPUT_START();
      };

      var _Window_SynthesisNumber_hide = Window_SynthesisNumber.prototype.hide;
      Window_SynthesisNumber.prototype.hide = function () {
        _Window_SynthesisNumber_hide.call(this);
        NUMBER_INPUT_END();
      };
    }
  }

  window.MobileButtons = {
    hide() {
      if (window.Eli && Eli.MobileControls) {
        Eli.MobileControls.removeButtonsFromScene();

        var container = Eli.MobileControls.getDiv();
        if (container) container.style.display = "none";

        Eli.MobileControls.buttonList.forEach(function (button) {
          if (button.deactivate) button.deactivate();
          if (button.resetInput) button.resetInput();
        });
      }
    },

    show() {
      if (window.Eli && Eli.MobileControls) {
        var container = Eli.MobileControls.getDiv();
        if (container) container.style.display = "";

        Eli.MobileControls.addButtonsOnScene();
      }
    },
  };
})();
