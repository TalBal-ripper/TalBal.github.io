//=============================================================================
// ChoiceUnderNoxControl
//=============================================================================
/*:
 *@plugindesc Контроль показа пунктов меню выбора
 *@author Noxmils
 *@help Условия для появления конкретного варианта выбора указываются в
 *начале текста самого варианта в квадратных скобках. Варианты без них
 *будут показаны без изменений.
 *
 *[s2] - переключатель 2 включен;
 *[!s2] - переключатель 2 выключен;
 *[v2=5] - переменная 2 равна 5;
 *[v2!=5] - переменная 2 не равна 5;
 *[v2>5] - переменная 2 больше, чем 5;
 *[v2!>5] - переменная 2 меньше или равна 5 (не больше);
 *[v2<5] - переменная 2 меньше, чем 5;
 *[v2!<5] - переменная 2 больше или равна 5 (не меньше).
 *
 *Во избежание конфликтов отключите выбор "По умолчанию" и "При отмене"
 *
 */

(function () {
  Game_Message.prototype.choices = function () {
    var choices = [];
    var GMC = $gameMessage._choices;
    for (var i = 0; i < GMC.length; i++) {
      if (GMC[i].slice(0, 2) == "[s") {
        var rightBracketPos = GMC[i].indexOf("]", 1);
        if ($gameSwitches.value(JSON.parse(GMC[i].slice(2, rightBracketPos)))) {
          choices.push(GMC[i].slice(rightBracketPos + 1));
        }
      } else if (GMC[i].slice(0, 3) == "[!s") {
        var rightBracketPos = GMC[i].indexOf("]", 1);
        if (
          !$gameSwitches.value(JSON.parse(GMC[i].slice(3, rightBracketPos)))
        ) {
          choices.push(GMC[i].slice(rightBracketPos + 1));
        }
      } else if (GMC[i].slice(0, 2) == "[v") {
        var rightBracketPos = GMC[i].indexOf("]", 1);
        var exclamationPos = GMC[i].indexOf("!", 1);
        if (GMC[i].indexOf("=", 1) != -1) {
          var mathPos = GMC[i].indexOf("=", 1);
          var mathMark = "equal";
        } else if (GMC[i].indexOf(">", 1) != -1) {
          var mathPos = GMC[i].indexOf(">", 1);
          var mathMark = "more";
        } else if (GMC[i].indexOf("<", 1) != -1) {
          var mathPos = GMC[i].indexOf("<", 1);
          var mathMark = "less";
        }
        if (exclamationPos != -1 && exclamationPos < rightBracketPos) {
          var varVal = $gameVariables.value(
            JSON.parse(GMC[i].slice(2, mathPos - 1)),
          );
        } else {
          var varVal = $gameVariables.value(
            JSON.parse(GMC[i].slice(2, mathPos)),
          );
        }
        if (
          varVal == JSON.parse(GMC[i].slice(mathPos + 1, rightBracketPos)) &&
          mathMark == "equal"
        ) {
          var d = true;
        } else if (
          varVal > JSON.parse(GMC[i].slice(mathPos + 1, rightBracketPos)) &&
          mathMark == "more"
        ) {
          var d = true;
        } else if (
          varVal < JSON.parse(GMC[i].slice(mathPos + 1, rightBracketPos)) &&
          mathMark == "less"
        ) {
          var d = true;
        } else {
          var d = false;
        }
        if ((exclamationPos == -1 && d) || (exclamationPos != -1 && !d)) {
          choices.push(GMC[i].slice(rightBracketPos + 1));
        }
      } else {
        choices.push(GMC[i]);
      }
    }
    return choices;
  };

  Game_Message.prototype.check = function (index) {
    var GMC = $gameMessage._choices;
    if (GMC[index].slice(0, 2) == "[s") {
      var rightBracketPos = GMC[index].indexOf("]", 1);
      return $gameSwitches.value(
        JSON.parse(GMC[index].slice(2, rightBracketPos)),
      );
    } else if (GMC[index].slice(0, 3) == "[!s") {
      var rightBracketPos = GMC[index].indexOf("]", 2);
      return !$gameSwitches.value(
        JSON.parse(GMC[index].slice(3, rightBracketPos)),
      );
    } else if (GMC[index].slice(0, 2) == "[v") {
      var rightBracketPos = GMC[index].indexOf("]", 1);
      var exclamationPos = GMC[index].indexOf("!", 1);
      if (GMC[index].indexOf("=", 1) != -1) {
        var mathPos = GMC[index].indexOf("=", 1);
        var mathMark = "equal";
      } else if (GMC[index].indexOf(">", 1) != -1) {
        var mathPos = GMC[index].indexOf(">", 1);
        var mathMark = "more";
      } else if (GMC[index].indexOf("<", 1) != -1) {
        var mathPos = GMC[index].indexOf("<", 1);
        var mathMark = "less";
      }
      if (exclamationPos != -1 && exclamationPos < rightBracketPos) {
        var varVal = $gameVariables.value(
          JSON.parse(GMC[index].slice(2, mathPos - 1)),
        );
      } else {
        var varVal = $gameVariables.value(
          JSON.parse(GMC[index].slice(2, mathPos)),
        );
      }
      if (
        varVal == JSON.parse(GMC[index].slice(mathPos + 1, rightBracketPos)) &&
        mathMark == "equal"
      ) {
        var d = true;
      } else if (
        varVal > JSON.parse(GMC[index].slice(mathPos + 1, rightBracketPos)) &&
        mathMark == "more"
      ) {
        var d = true;
      } else if (
        varVal < JSON.parse(GMC[index].slice(mathPos + 1, rightBracketPos)) &&
        mathMark == "less"
      ) {
        var d = true;
      } else {
        var d = false;
      }
      if ((exclamationPos == -1 && d) || (exclamationPos != -1 && !d)) {
        return true;
      }
    } else {
      return true;
    }
  };

  var _Game_Interpreter_setupChoices_Nox =
    Game_Interpreter.prototype.setupChoices;
  Game_Interpreter.prototype.setupChoices = function (params) {
    // Проверяем, есть ли синтаксис Nox [s...] или [v...] в выборах
    var hasNoxSyntax = params[0].some(function (choice) {
      return (
        choice.slice(0, 2) == "[s" ||
        choice.slice(0, 3) == "[!s" ||
        choice.slice(0, 2) == "[v"
      );
    });

    if (!hasNoxSyntax) {
      // Нет синтаксиса Nox — передаём другим плагинам
      _Game_Interpreter_setupChoices_Nox.call(this, params);
      return;
    }

    // Оригинальная логика Nox
    var choices = params[0].clone();
    var cancelType = params[1];
    var defaultType = params.length > 2 ? params[2] : 0;
    var positionType = params.length > 3 ? params[3] : 2;
    var background = params.length > 4 ? params[4] : 0;
    if (cancelType >= choices.length) {
      cancelType = -2;
    }
    $gameMessage.setChoices(choices, defaultType, cancelType);
    $gameMessage.setChoiceBackground(background);
    $gameMessage.setChoicePositionType(positionType);
    $gameMessage.setChoiceCallback(
      function (n) {
        for (var i = 0; i < $gameMessage._choices.length; i++) {
          if ($gameMessage.check(i) && n == 0) {
            this._branch[this._indent] = i;
            break;
          } else if ($gameMessage.check(i) && n > 0) {
            n--;
          }
        }
      }.bind(this),
    );
  };
})();
