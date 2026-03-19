//=============================================================================
// ArtSizeControl.js
//=============================================================================
/*:
 * @plugindesc Этот плагин позволит манипулировать размером изображения и показом арта персонажа.
 *
 * @author Klimber
 *
 * @help
 *
 * ReducePicture(pictureId, state). pictureId - идентефикатор изображения.
 * state - "что сделать с персонажем?", принимает 1 или 2. 1 - уменьшить, 2 - увеличить.
 *
 * ShowPicture(pictureId, emotion). pictureId - идентефикатор изображения.
 * emotion - "какую эмоцию должен изобразить перс?", принимает название эмоции:
 *  'angry', 'sad', 'surprised', 'surprised_easy', 'thinking', 'happy'.
 *
 * TERMS OF USE
 * Вы можете свободно использовать и модифицировать этот код. (А нахуй он нужен для чего-то другого?))
 * Сильно удивлюсь, если его будет использовать кто-то.
 *
 * COMPATIBILITY
 * Пока не обнаружены. Да и хз что это такое:).
 */

/*
state - аналог команды плагина, принимающий значение "что сделать с персонажем?"
1 - уменшить, 2 - увеличить.
name - указываеться перс над которым будут проходить операции
*/

//ставит флаг "затемнение", принимает true\false.
function Checker(check) {
  return { check: check };
}

//затемняет картинки, в зависимости от того, какой флаг стоит
function Tint(pictureId) {
  if (Checker.check == true) {
    $gameScreen.tintPicture(pictureId, [-40, -40, -40, 0], 10);
  } else if (Checker.check == false) {
    $gameScreen.tintPicture(pictureId, [0, 0, 0, 0], 10);
  }
}

//меняет плавно размер картинки по заранее установленным параметрам, ставит флаг затемнения.
function ReducePicture(pictureId, state, side) {
  if (side == "left") {
    if (state == 1) {
      Checker.check = true;
      Tint(pictureId);
      $gameScreen.movePicture(
        pictureId,
        0,
        $gameVariables.value(63),
        $gameVariables.value(64) + 15,
        $gameVariables.value(65) - 2,
        $gameVariables.value(66) - 2,
        255,
        0,
        10,
      );
    } else if (state == 2) {
      Checker.check = false;
      Tint(pictureId);
      $gameScreen.movePicture(
        pictureId,
        0,
        $gameVariables.value(63),
        $gameVariables.value(64),
        $gameVariables.value(65),
        $gameVariables.value(66),
        255,
        0,
        10,
      );
    }
  }

  if (side == "right") {
    if (state == 1) {
      Checker.check = true;
      Tint(pictureId);
      $gameScreen.movePicture(
        pictureId,
        0,
        $gameVariables.value(59),
        $gameVariables.value(60) + 15,
        $gameVariables.value(61) - 2,
        $gameVariables.value(62) - 2,
        255,
        0,
        10,
      );
    } else if (state == 2) {
      Checker.check = false;
      Tint(pictureId);
      $gameScreen.movePicture(
        pictureId,
        0,
        $gameVariables.value(59),
        $gameVariables.value(60),
        $gameVariables.value(61),
        $gameVariables.value(62),
        255,
        0,
        10,
      );
    }
  }
}

/*
if(pictureId == 1 && state == 1){
  Checker.check = true;
  Tint(pictureId);
  $gameScreen.movePicture(pictureId, 0, $gameVariables.value(63), $gameVariables.value(64) + 15, $gameVariables.value(65) - 2, $gameVariables.value(66) - 2, 255, 0, 10);
 }
 if(pictureId == 1 && state == 2){
  Checker.check = false;
  Tint(pictureId);
  $gameScreen.movePicture(pictureId, 0, $gameVariables.value(63), $gameVariables.value(64), $gameVariables.value(65), $gameVariables.value(66), 255, 0, 10);
 }
 if(pictureId == 2 && state == 1){
  Checker.check = true;
  Tint(pictureId);
  $gameScreen.movePicture(pictureId, 0, $gameVariables.value(59), $gameVariables.value(60) + 15, $gameVariables.value(61) - 2, $gameVariables.value(62) - 2, 255, 0, 10); // 800 35 98 98
 }
 if(pictureId == 2 && state == 2){
  Checker.check = false;
  Tint(pictureId);
  $gameScreen.movePicture(pictureId, 0, $gameVariables.value(59), $gameVariables.value(60), $gameVariables.value(61), $gameVariables.value(62), 255, 0, 10);
 }


*/

/*function ChangeReduceCompanion(x, y, scaleX, scaleY){

}*/

//меняет эмоцию перса, расположение и размер картинки зависит от флага затемнения. Само затемнение картинки тоже учитывается.
function ShowPicture(pictureId, emotion, name, x, y, scaleX, scaleY) {
  $gameScreen.showPicture(
    pictureId,
    name + emotion,
    0,
    x,
    y,
    scaleX,
    scaleY,
    255,
    0,
  );
  Tint(pictureId);
}

//сброс проверки + удаление картинок. Цикл удаляет все картинки, которые получит от remove.
function RemovePicture(remove) {
  $gameScreen.erasePicture(remove);
  return (Checker.check = false);
}

function ShowBackground(imageName) {
  if (ShowBackground._sprite) {
    ShowBackground._sprite.parent.removeChild(ShowBackground._sprite);
    ShowBackground._sprite.destroy(); // без параметров — только спрайт
    ShowBackground._sprite = null;
  }

  var bitmap = ImageManager.loadPicture(imageName);
  var sprite = new Sprite(bitmap);
  sprite.x = 0;
  sprite.y = 0;

  bitmap.addLoadListener(function () {
    sprite.scale.x = Graphics.width / bitmap.width;
    sprite.scale.y = Graphics.height / bitmap.height;
  });

  var spriteset = SceneManager._scene._spriteset;
  spriteset.addChildAt(sprite, 1);

  ShowBackground._sprite = sprite;
}

function RemoveBackground() {
  if (ShowBackground._sprite) {
    ShowBackground._sprite.parent.removeChild(ShowBackground._sprite);
    ShowBackground._sprite.destroy(); // без { texture: true, baseTexture: true }
    ShowBackground._sprite = null;
  }
}
