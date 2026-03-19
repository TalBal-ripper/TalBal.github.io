//=============================================================================
// Simple Time System - Умная система времени
// SimpleTimeSystem.js
// Version: 3.0.0
//=============================================================================

/*:
 * @plugindesc v3.0 Умная система времени с автоматическим отслеживанием
 * @author YourName
 *
 * @param Global Time Variable
 * @desc ID переменной для глобального времени (часы с начала игры)
 * @default 200
 *
 * @param Old Hour Variable
 * @desc ID переменной часа в старой системе (обычно 47)
 * @default 47
 *
 * @param Time Frozen Switch
 * @desc ID переключателя для остановки времени (0 = не используется)
 * @default 50
 *
 * @param New Day Common Event
 * @desc ID общего события, вызываемого при наступлении нового дня (0 = не используется)
 * @default 100
 *
 * @param Auto Update Switches
 * @desc Автоматически обновлять переключатели времени суток (true/false)
 * @default true
 *
 * @param Switch Night
 * @desc ID переключателя "Ночь" (0-6)
 * @default 2
 *
 * @param Switch Morning
 * @desc ID переключателя "Утро" (6-12)
 * @default 3
 *
 * @param Switch Day
 * @desc ID переключателя "День" (12-18)
 * @default 4
 *
 * @param Switch Evening
 * @desc ID переключателя "Вечер" (18-22)
 * @default 5
 *
 * @param Switch Late Evening
 * @desc ID переключателя "Поздний вечер" (22-24)
 * @default 6
 *
 * @help
 * ============================================================================
 * Умная система времени v3.0
 * ============================================================================
 *
 * Плагин автоматически отслеживает изменения переменной часа и фиксирует
 * прошедшее время в глобальной переменной.
 *
 * ============================================================================
 * Основные возможности
 * ============================================================================
 *
 * 1. АВТОМАТИЧЕСКОЕ ОТСЛЕЖИВАНИЕ ВРЕМЕНИ
 *    - Плагин следит за переменной 47 (час)
 *    - При изменении часа фиксирует прошедшее время
 *    - Умно обрабатывает переход через полночь
 *    - Вызывает событие "Новый день" при смене суток
 *
 * 2. ПЕРЕКЛЮЧАТЕЛИ ВРЕМЕНИ СУТОК
 *    - Автоматически обновляются при изменении часа
 *    - Всегда соответствуют текущему времени
 *    - Не нужно вызывать "Зацикливание времени"
 *
 * 3. ФУНКЦИИ "ПРОМОТАТЬ ДО"
 *    - TimeSystem skipToMorning   - до утра (6:00)
 *    - TimeSystem skipToDay        - до дня (12:00)
 *    - TimeSystem skipToEvening    - до вечера (18:00)
 *    - TimeSystem skipToNight      - до ночи (0:00)
 *
 * ============================================================================
 * Примеры использования
 * ============================================================================
 *
 * ПРОМОТАТЬ ВРЕМЯ ДО УТРА:
 * ◆ Команда плагина: TimeSystem skipToMorning
 *
 * ПРОМОТАТЬ ВРЕМЯ ДО ВЕЧЕРА:
 * ◆ Команда плагина: TimeSystem skipToEvening
 *
 * ДОБАВИТЬ ЧАСЫ (старый способ тоже работает):
 * ◆ Команда плагина: TimeSystem addHours 5
 *
 * УСТАНОВИТЬ КОНКРЕТНЫЙ ЧАС:
 * ◆ Команда плагина: TimeSystem setHour 14
 *
 * ОСТАНОВИТЬ ВРЕМЯ (для катсцен):
 * ◆ Команда плагина: TimeSystem freeze
 * ◆ [Ваша катсцена]
 * ◆ Команда плагина: TimeSystem unfreeze
 *
 * ОТЛАДКА:
 * ◆ Команда плагина: TimeSystem debug
 *
 * ============================================================================
 * Как работает отслеживание времени
 * ============================================================================
 *
 * ПРИМЕР 1: Утро → Вечер (через общее событие Цикл_Вечер)
 * - Было: 6:00 (утро)
 * - Стало: 19:00 (вечер)
 * - Плагин фиксирует: +13 часов
 * - Глобальное время увеличивается на 13
 *
 * ПРИМЕР 2: Вечер → Утро (через общее событие Цикл_Утро)
 * - Было: 19:00 (вечер)
 * - Стало: 6:00 (утро)
 * - Плагин понимает: прошли сутки!
 * - Фиксирует: +11 часов (19→24→6)
 * - Вызывает общее событие "Новый день"
 *
 * ПРИМЕР 3: Сон (добавление 8 часов)
 * - Было: 22:00
 * - Добавили: +8 часов
 * - Стало: 6:00 (следующего дня)
 * - Плагин вызывает "Новый день"
 *
 * ============================================================================
 * Общее событие "Новый день"
 * ============================================================================
 *
 * Создайте общее событие с ID 100 (или укажите другой в параметрах).
 * Это событие будет вызываться автоматически каждый раз, когда наступает
 * новый игровой день (переход через 0:00).
 *
 * В нем можно разместить:
 * - Восстановление ресурсов NPC
 * - Обновление квестов
 * - Появление новых событий
 * - Что угодно, что должно происходить раз в день
 *
 * ============================================================================
 * Скриптовые вызовы
 * ============================================================================
 *
 * TimeSystem.getGlobalTime()    // Получить глобальное время (часы)
 * TimeSystem.getHour()           // Получить текущий час (0-23)
 * TimeSystem.getDay()            // Получить текущий день
 * TimeSystem.addHours(5)         // Добавить 5 часов
 * TimeSystem.setHour(14)         // Установить 14:00
 * TimeSystem.skipToMorning()     // Промотать до утра
 * TimeSystem.skipToDay()         // Промотать до дня
 * TimeSystem.skipToEvening()     // Промотать до вечера
 * TimeSystem.skipToNight()       // Промотать до ночи
 * TimeSystem.isMorning()         // Проверка: утро?
 * TimeSystem.isDay()             // Проверка: день?
 * TimeSystem.isEvening()         // Проверка: вечер?
 * TimeSystem.isNight()           // Проверка: ночь?
 * TimeSystem.freeze()            // Остановить время
 * TimeSystem.unfreeze()          // Возобновить время
 *
 */

(function () {
  "use strict";

  var parameters = PluginManager.parameters("SimpleTimeSystem");
  var globalTimeVar = Number(parameters["Global Time Variable"] || 200);
  var oldHourVar = Number(parameters["Old Hour Variable"] || 47);
  var timeFrozenSwitch = Number(parameters["Time Frozen Switch"] || 50);
  var newDayCommonEvent = Number(parameters["New Day Common Event"] || 100);
  var autoUpdateSwitches =
    String(parameters["Auto Update Switches"] || "true") === "true";

  var SWITCH_NIGHT = Number(parameters["Switch Night"] || 2);
  var SWITCH_MORNING = Number(parameters["Switch Morning"] || 3);
  var SWITCH_DAY = Number(parameters["Switch Day"] || 4);
  var SWITCH_EVENING = Number(parameters["Switch Evening"] || 5);
  var SWITCH_LATE_EVENING = Number(parameters["Switch Late Evening"] || 6);

  // ============================================================================
  // Глобальный объект TimeSystem
  // ============================================================================

  window.TimeSystem = {
    _processingTimeChange: false, // Флаг для предотвращения рекурсии

    // Получить глобальное время (часы с начала игры)
    getGlobalTime: function () {
      return $gameVariables.value(globalTimeVar) || 0;
    },

    // Установить глобальное время
    setGlobalTime: function (hours) {
      hours = Math.max(0, Math.floor(hours));
      $gameVariables.setValue(globalTimeVar, hours);
    },

    // Получить текущий час (0-23)
    getHour: function () {
      return $gameVariables.value(oldHourVar) || 0;
    },

    // Получить текущий день
    getDay: function () {
      return Math.floor(this.getGlobalTime() / 24);
    },

    // Добавить часы к глобальному времени
    addHours: function (hours) {
      if (this._processingTimeChange) return; // Защита от рекурсии
      this._processingTimeChange = true;

      hours = Math.floor(Number(hours)) || 0;
      if (hours <= 0) {
        this._processingTimeChange = false;
        return;
      }

      var oldHour = this.getHour();
      var newHour = (oldHour + hours) % 24;
      var daysPassed = Math.floor((oldHour + hours) / 24);

      // Обновляем глобальное время
      var globalTime = this.getGlobalTime();
      this.setGlobalTime(globalTime + hours);

      // Обновляем переменную часа
      $gameVariables.setValue(oldHourVar, newHour);

      // Обновляем переключатели
      this.updateTimeSwitches(newHour);

      // Синхронизируем с Terrax (БЕЗ вызова SetDaynightCycle!)
      this.syncTerraxDirect(newHour);

      // Если прошли сутки - вызываем событие нового дня
      if (daysPassed > 0) {
        this.triggerNewDay();
      }

      /*console.log(
        "TimeSystem: +" +
          hours +
          " часов. Теперь " +
          newHour +
          ":00, день " +
          this.getDay(),
      );*/

      this._processingTimeChange = false;
    },

    // Установить конкретный час
    setHour: function (hour) {
      if (this._processingTimeChange) return; // Защита от рекурсии
      this._processingTimeChange = true;

      hour = Math.max(0, Math.min(23, Math.floor(hour)));

      var currentHour = this.getHour();
      var currentDay = this.getDay();

      // Вычисляем новое глобальное время
      var newGlobalTime = currentDay * 24 + hour;

      // Устанавливаем
      this.setGlobalTime(newGlobalTime);
      $gameVariables.setValue(oldHourVar, hour);

      // Обновляем переключатели
      this.updateTimeSwitches(hour);

      // Синхронизируем с Terrax (БЕЗ вызова SetDaynightCycle!)
      this.syncTerraxDirect(hour);

      //console.log("TimeSystem: Установлен час " + hour + ":00");

      this._processingTimeChange = false;
    },

    // Промотать до утра (6:00)
    skipToMorning: function () {
      this.skipToHour(6);
    },

    // Промотать до дня (12:00)
    skipToDay: function () {
      this.skipToHour(12);
    },

    // Промотать до вечера (18:00)
    skipToEvening: function () {
      this.skipToHour(18);
    },

    // Промотать до ночи (0:00)
    skipToNight: function () {
      this.skipToHour(0);
    },

    // Промотать до конкретного часа
    skipToHour: function (targetHour) {
      var currentHour = this.getHour();
      var hoursToAdd;

      if (targetHour > currentHour) {
        // Просто промотка вперед в этот же день
        hoursToAdd = targetHour - currentHour;
      } else if (targetHour < currentHour) {
        // Промотка на следующий день
        hoursToAdd = 24 - currentHour + targetHour;
      } else {
        // Уже нужный час
        return;
      }

      this.addHours(hoursToAdd);
      /*console.log(
        "TimeSystem: Промотано до " +
          targetHour +
          ":00 (+" +
          hoursToAdd +
          " часов)",
      );*/
    },

    // Обновление переключателей времени суток
    updateTimeSwitches: function (hour) {
      if (!autoUpdateSwitches) return;

      // Сбрасываем все переключатели
      $gameSwitches.setValue(SWITCH_NIGHT, false);
      $gameSwitches.setValue(SWITCH_MORNING, false);
      $gameSwitches.setValue(SWITCH_DAY, false);
      $gameSwitches.setValue(SWITCH_EVENING, false);
      $gameSwitches.setValue(SWITCH_LATE_EVENING, false);

      // Устанавливаем нужный переключатель
      if (hour >= 0 && hour < 6) {
        $gameSwitches.setValue(SWITCH_NIGHT, true);
      } else if (hour >= 6 && hour < 12) {
        $gameSwitches.setValue(SWITCH_MORNING, true);
      } else if (hour >= 12 && hour < 18) {
        $gameSwitches.setValue(SWITCH_DAY, true);
      } else if (hour >= 18 && hour < 22) {
        $gameSwitches.setValue(SWITCH_EVENING, true);
      } else {
        $gameSwitches.setValue(SWITCH_LATE_EVENING, true);
      }
    },

    // Синхронизация с Terrax Lighting (через SetDaynightCycle - может вызвать рекурсию!)
    syncTerrax: function (hour) {
      if ($gameVariables.SetDaynightCycle) {
        $gameVariables.SetDaynightCycle(hour);
        $gameVariables.SetDaynightTimer(0);
      }
    },

    // Прямая синхронизация с Terrax (БЕЗ вызова SetDaynightCycle)
    syncTerraxDirect: function (hour) {
      if ($gameVariables._Terrax_Lighting_DaynightCycle !== undefined) {
        $gameVariables._Terrax_Lighting_DaynightCycle = hour;
        $gameVariables._Terrax_Lighting_DaynightTimer = 0;
      }
    },

    // Вызов события нового дня
    triggerNewDay: function () {
      if (newDayCommonEvent > 0) {
        $gameTemp.reserveCommonEvent(newDayCommonEvent);
        /*console.log(
          'TimeSystem: Вызвано общее событие "Новый день" (ID: ' +
            newDayCommonEvent +
            ")",
        );*/
      }
    },

    // Проверки времени суток
    isNight: function () {
      var hour = this.getHour();
      return hour >= 0 && hour < 6;
    },

    isMorning: function () {
      var hour = this.getHour();
      return hour >= 6 && hour < 12;
    },

    isDay: function () {
      var hour = this.getHour();
      return hour >= 12 && hour < 18;
    },

    isEvening: function () {
      var hour = this.getHour();
      return hour >= 18 && hour < 24;
    },

    // Управление заморозкой времени
    isFrozen: function () {
      if (timeFrozenSwitch > 0) {
        return $gameSwitches.value(timeFrozenSwitch);
      }
      return false;
    },

    freeze: function () {
      if (timeFrozenSwitch > 0) {
        $gameSwitches.setValue(timeFrozenSwitch, true);
        //console.log("TimeSystem: Время остановлено");
      }
    },

    unfreeze: function () {
      if (timeFrozenSwitch > 0) {
        $gameSwitches.setValue(timeFrozenSwitch, false);
        //console.log("TimeSystem: Время возобновлено");
      }
    },

    // Отладка
    debug: function () {
      var hour = this.getHour();
      var timeOfDay = "Неизвестно";
      if (this.isNight()) timeOfDay = "Ночь";
      if (this.isMorning()) timeOfDay = "Утро";
      if (this.isDay()) timeOfDay = "День";
      if (this.isEvening()) timeOfDay = "Вечер";

      var info =
        "=== TIME SYSTEM DEBUG v3.0 ===\n" +
        "Глобальное время: " +
        this.getGlobalTime() +
        " часов\n" +
        "День: " +
        this.getDay() +
        "\n" +
        "Час: " +
        hour +
        ":00\n" +
        "Время суток: " +
        timeOfDay +
        "\n" +
        "Переменная " +
        oldHourVar +
        ": " +
        $gameVariables.value(oldHourVar) +
        "\n" +
        "\nПереключатели времени суток:\n" +
        "[" +
        SWITCH_NIGHT +
        "] Ночь: " +
        ($gameSwitches.value(SWITCH_NIGHT) ? "ВКЛ" : "ВЫКЛ") +
        "\n" +
        "[" +
        SWITCH_MORNING +
        "] Утро: " +
        ($gameSwitches.value(SWITCH_MORNING) ? "ВКЛ" : "ВЫКЛ") +
        "\n" +
        "[" +
        SWITCH_DAY +
        "] День: " +
        ($gameSwitches.value(SWITCH_DAY) ? "ВКЛ" : "ВЫКЛ") +
        "\n" +
        "[" +
        SWITCH_EVENING +
        "] Вечер: " +
        ($gameSwitches.value(SWITCH_EVENING) ? "ВКЛ" : "ВЫКЛ") +
        "\n" +
        "[" +
        SWITCH_LATE_EVENING +
        "] Поздний вечер: " +
        ($gameSwitches.value(SWITCH_LATE_EVENING) ? "ВКЛ" : "ВЫКЛ");

      //console.log(info);

      if (Graphics._errorPrinter) {
        Graphics._errorPrinter.innerHTML = Graphics._makeErrorHtml(
          "Time System Debug",
          info.replace(/\n/g, "<br>"),
        );
      }

      return info;
    },
  };

  // ============================================================================
  // Команды плагина
  // ============================================================================

  var _Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    // Обрабатываем команды TimeSystem
    if (command.toLowerCase() === "timesystem") {
      var subCommand = args[0] ? args[0].toLowerCase() : "";

      switch (subCommand) {
        case "addhours":
          var hours = Number(args[1]) || 1;
          TimeSystem.addHours(hours);
          break;

        case "sethour":
          var hour = Number(args[1]) || 0;
          TimeSystem.setHour(hour);
          break;

        case "skiptomorning":
          TimeSystem.skipToMorning();
          break;

        case "skiptoday":
          TimeSystem.skipToDay();
          break;

        case "skiptoevening":
          TimeSystem.skipToEvening();
          break;

        case "skiptonight":
          TimeSystem.skipToNight();
          break;

        case "freeze":
          TimeSystem.freeze();
          break;

        case "unfreeze":
          TimeSystem.unfreeze();
          break;

        case "debug":
          TimeSystem.debug();
          break;
      }
    }

    // Отслеживаем команды Terrax Lighting "Daynight hour"
    if (
      command.toLowerCase() === "daynight" &&
      args[0] &&
      args[0].toLowerCase() === "hour"
    ) {
      // Если уже обрабатываем изменение - пропускаем
      if (TimeSystem._processingTimeChange) {
        return;
      }

      TimeSystem._processingTimeChange = true;

      var oldHour = TimeSystem.getHour();
      var newHour = Number(args[1]) || 0;

      if (newHour !== oldHour) {
        // Вычисляем прошедшее время
        var hoursPassed;
        if (newHour > oldHour) {
          hoursPassed = newHour - oldHour;
        } else if (newHour < oldHour) {
          hoursPassed = 24 - oldHour + newHour;
        } else {
          TimeSystem._processingTimeChange = false;
          return;
        }

        // Обновляем глобальное время
        var globalTime = TimeSystem.getGlobalTime();
        TimeSystem.setGlobalTime(globalTime + hoursPassed);

        // Обновляем переменную 47
        $gameVariables.setValue(oldHourVar, newHour);

        // Обновляем переключатели
        TimeSystem.updateTimeSwitches(newHour);

        // Прямая синхронизация с Terrax (без SetDaynightCycle)
        TimeSystem.syncTerraxDirect(newHour);

        // Если прошли сутки
        if (newHour < oldHour) {
          TimeSystem.triggerNewDay();
        }

        /*console.log(
          "TimeSystem: Обнаружена команда Daynight hour " +
            newHour +
            ". +" +
            hoursPassed +
            " часов",
        );*/
      }

      TimeSystem._processingTimeChange = false;
    }
  };

  // ============================================================================
  // Перехват команд Terrax Lighting для отслеживания изменений
  // ============================================================================

  // Перехватываем SetDaynightCycle
  if (typeof Game_Variables.prototype.SetDaynightCycle !== "undefined") {
    var _Game_Variables_SetDaynightCycle =
      Game_Variables.prototype.SetDaynightCycle;
    Game_Variables.prototype.SetDaynightCycle = function (value) {
      // Если уже обрабатываем изменение времени - не создаем рекурсию
      if (TimeSystem._processingTimeChange) {
        _Game_Variables_SetDaynightCycle.call(this, value);
        return;
      }

      TimeSystem._processingTimeChange = true;

      var oldHour = this.GetDaynightCycle ? this.GetDaynightCycle() : 0;

      // Вызываем оригинальную функцию
      _Game_Variables_SetDaynightCycle.call(this, value);

      // Синхронизируем с нашей системой
      var newHour = value;

      // Обновляем переменную 47
      $gameVariables.setValue(oldHourVar, newHour);

      // Вычисляем прошедшее время
      var hoursPassed;
      if (newHour > oldHour) {
        hoursPassed = newHour - oldHour;
      } else if (newHour < oldHour) {
        hoursPassed = 24 - oldHour + newHour;
      } else {
        TimeSystem._processingTimeChange = false;
        return; // Час не изменился
      }

      // Обновляем глобальное время
      var globalTime = TimeSystem.getGlobalTime();
      TimeSystem.setGlobalTime(globalTime + hoursPassed);

      // Обновляем переключатели
      TimeSystem.updateTimeSwitches(newHour);

      // Если прошли сутки
      if (newHour < oldHour) {
        TimeSystem.triggerNewDay();
      }

      /*console.log(
        "TimeSystem: Обнаружена команда SetDaynightCycle(" +
          value +
          "). +" +
          hoursPassed +
          " часов",
      );*/

      TimeSystem._processingTimeChange = false;
    };
  }

  // ============================================================================
  // Автоматическое отслеживание изменений переменной часа
  // ============================================================================

  var _Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function () {
    _Scene_Map_update.call(this);
    this.updateTimeSystemTracking();
  };

  Scene_Map.prototype.updateTimeSystemTracking = function () {
    // Инициализация
    if (this._timeSystemLastHour === undefined) {
      this._timeSystemLastHour = TimeSystem.getHour();
      return;
    }

    // Если уже обрабатываем изменение - пропускаем
    if (TimeSystem._processingTimeChange) {
      return;
    }

    // Проверяем каждые 10 кадров (оптимизация)
    if (Graphics.frameCount % 10 !== 0) return;

    var currentHour = $gameVariables.value(oldHourVar);
    var lastHour = this._timeSystemLastHour;

    // Если час изменился
    if (currentHour !== lastHour) {
      TimeSystem._processingTimeChange = true;

      var hoursPassed;

      // Вычисляем сколько часов прошло
      if (currentHour > lastHour) {
        // Обычное движение вперед
        hoursPassed = currentHour - lastHour;
      } else {
        // Переход через полночь (например 22 -> 6)
        hoursPassed = 24 - lastHour + currentHour;
      }

      // Обновляем глобальное время
      var globalTime = TimeSystem.getGlobalTime();
      TimeSystem.setGlobalTime(globalTime + hoursPassed);

      // Обновляем переключатели
      TimeSystem.updateTimeSwitches(currentHour);

      // Прямая синхронизация с Terrax
      TimeSystem.syncTerraxDirect(currentHour);

      // Если прошли сутки (переход через 0)
      if (currentHour < lastHour) {
        TimeSystem.triggerNewDay();
      }

      /*console.log(
        "TimeSystem: Обнаружено изменение часа " +
          lastHour +
          " → " +
          currentHour +
          " (+" +
          hoursPassed +
          " часов)",
      );*/

      // Запоминаем новый час
      this._timeSystemLastHour = currentHour;

      TimeSystem._processingTimeChange = false;
    }
  };

  // ============================================================================
  // Инициализация при новой игре
  // ============================================================================

  var _DataManager_setupNewGame = DataManager.setupNewGame;
  DataManager.setupNewGame = function () {
    _DataManager_setupNewGame.call(this);

    // Синхронизируем глобальное время с текущим часом
    var currentHour = $gameVariables.value(oldHourVar) || 0;
    $gameVariables.setValue(globalTimeVar, currentHour);

    // Обновляем переключатели
    TimeSystem.updateTimeSwitches(currentHour);

    //console.log("TimeSystem v3.0: Инициализация. Час: " + currentHour);
  };

  // ============================================================================
  // Миграция старых сохранений
  // ============================================================================

  var _DataManager_loadGame = DataManager.loadGame;
  DataManager.loadGame = function (savefileId) {
    var result = _DataManager_loadGame.call(this, savefileId);

    if (result) {
      setTimeout(function () {
        TimeSystem.migrateOldSave();
      }, 100);
    }

    return result;
  };

  TimeSystem.migrateOldSave = function () {
    var globalTime = this.getGlobalTime();
    var oldHour = $gameVariables.value(oldHourVar);

    // Если глобальное время не установлено
    if (!globalTime || globalTime === 0) {
      //console.log("TimeSystem: Обнаружено старое сохранение. Миграция...");

      // Устанавливаем глобальное время равным текущему часу
      this.setGlobalTime(oldHour);

      //console.log("TimeSystem: Миграция завершена. Час: " + oldHour);
    }

    // Обновляем переключатели
    this.updateTimeSwitches(oldHour);

    // Синхронизируем с Terrax
    this.syncTerrax(oldHour);
  };

  // ============================================================================
  // Лог загрузки
  // ============================================================================

  /*console.log("=== TimeSystem v3.0 Loaded ===");
  console.log("Global Time Variable: " + globalTimeVar);
  console.log("Old Hour Variable: " + oldHourVar);
  console.log("New Day Event: " + newDayCommonEvent);
  console.log("================================");*/
})();
