/*:
 * @plugindesc Позволяет писать кастомный JS-код в навыках через <CustomCode>
 * user - тот кто использует навык
 * @help
 */

(function() {
    var _Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        _Game_Action_apply.call(this, target);

        var skill = this.item();
        if (skill) {
            var note = skill.note;
            var match = note.match(/<CustomCode>([\s\S]*?)<\/CustomCode>/i);
            if (match) {
                try {
                    var user = this.subject();
                    eval(match[1]);
                } catch (e) {
                    console.error("Ошибка в кастомном навыке:", e);
                }
            }
        }
    };
})();
