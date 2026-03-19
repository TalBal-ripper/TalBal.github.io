//=========================================================
// Cae_CustomFacePos.js
//=========================================================
 
/*:
 * @plugindesc Provides ability to change whether facesets are displayed on the left or right in message windows.
 * @author Caethyril
 *
 * @help Plugin Commands:
 *   ShowFaceOnRight - changes the face location to the right side of the message
 *   ShowFaceOnLeft  - resets the face location to default
 *
 * Compatibility: <untested>
 *   This plugin overrides the newLineX() and drawMessageFace() functions
 *    of the Window_Message class.
 */
 
(function() {
 
  var Cae_FaceOnRight = false
 
  var Cae_pluginCommandInterpreter = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Cae_pluginCommandInterpreter.call(this, command, args);
    switch (command) {
      case 'ShowFaceOnRight':
        Cae_FaceOnRight = true;
        break;
      case 'ShowFaceOnLeft':
        Cae_FaceOnRight = false;
        break;
    };
  };
 
  Window_Message.prototype.newLineX = function() {
    return $gameMessage.faceName() === '' || Cae_FaceOnRight ? 0 : 168;
  };
 
  Window_Message.prototype.drawMessageFace = function() {
    this.drawFace($gameMessage.faceName(), $gameMessage.faceIndex(), Cae_FaceOnRight ? (this.width - this.standardPadding() * 2 - Window_Base._faceWidth) : 0, 0);
  };
 
})();