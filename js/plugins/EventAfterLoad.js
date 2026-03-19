/*:
 * @plugindesc Execute common events after any successful load (supports queue)
 * @author mrcopra
 *
 * @param Common Events
 * @type string
 * @desc IDs of common events, comma-separated, executed in order (e.g. 3,5,7)
 * @default 1
 *
 * @help Runs after load from Title, in-game Load, return-to-Title, etc.
 */
(function() {
  const params = PluginManager.parameters('EventAfterLoad');
  const list = String(params['Common Events'] || '1')
    .split(',')
    .map(s => Number(s.trim()))
    .filter(n => n > 0);

  const _Game_System_onAfterLoad = Game_System.prototype.onAfterLoad;
  Game_System.prototype.onAfterLoad = function() {
    if (_Game_System_onAfterLoad) _Game_System_onAfterLoad.call(this);
    if (list.length > 0) {
      $gameTemp._afterLoadCEQueue = (Array.isArray($gameTemp._afterLoadCEQueue) ? $gameTemp._afterLoadCEQueue : []).concat(list);
    }
  };

  const _Game_Map_update = Game_Map.prototype.update;
  Game_Map.prototype.update = function(sceneActive) {
    _Game_Map_update.call(this, sceneActive);
    const q = $gameTemp._afterLoadCEQueue;
    if (!this._interpreter.isRunning() && Array.isArray(q) && q.length > 0) {
      const id = q.shift();
      const ce = $dataCommonEvents[id];
      if (ce) this._interpreter.setup(ce.list, null);
    }
  };
})();

