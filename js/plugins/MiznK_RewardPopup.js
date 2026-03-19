/*:
 * @plugindesc Выезжающая картинка поверх всего (включая Tint Screen)
 * @author MiznK
 *
 * @help
 * В событии через Script:
 *
 *   RewardPopup.show("relationship_gained")
 *   RewardPopup.show("relationship_unchanged")
 *
 * Картинки лежат в img/pictures/.
 * Выезжает сверху за 20 кадров, висит 2 сек, уезжает обратно.
 */

var RewardPopup = RewardPopup || {};

(function () {
  "use strict";

  var _sprite = null;
  var _frame = 0;
  var _phase = -1;
  var _startY = 0;
  var _targetY = 0;

  RewardPopup.show = function (name) {
    if (_sprite) {
      SceneManager._scene.removeChild(_sprite);
    }
    _sprite = new Sprite(ImageManager.loadPicture(name));
    _sprite.bitmap.addLoadListener(function (b) {
      _startY = -b.height;
      _targetY = 0;
      _sprite.y = _startY;
      _frame = 0;
      _phase = 0;
    });
    SceneManager._scene.addChild(_sprite);
  };

  var _Scene_Base_update = Scene_Base.prototype.update;
  Scene_Base.prototype.update = function () {
    _Scene_Base_update.call(this);
    if (!_sprite || _phase < 0) return;
    _frame++;
    if (_phase === 0) {
      _sprite.y = _startY + ((_targetY - _startY) * _frame) / 10;
      if (_frame >= 10) {
        _frame = 0;
        _phase = 1;
      }
    } else if (_phase === 1) {
      if (_frame >= 90) {
        _frame = 0;
        _phase = 2;
      }
    } else if (_phase === 2) {
      _sprite.y = _targetY + ((_startY - _targetY) * _frame) / 10;
      if (_frame >= 10) {
        SceneManager._scene.removeChild(_sprite);
        _sprite = null;
        _phase = -1;
      }
    }
  };
})();
