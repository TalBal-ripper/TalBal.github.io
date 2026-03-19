/*:
*
* @plugindesc Ritter's Event Spawner v1.4
*
* @author Ritter
*
* @help
*
* Spawns events on the game map using templates from a separate map
* while reusing unspawned events to help prevent performance loss
* over time. No more erased/null event clutter bogging down your
* performance!
*
* This spawner should drastically improve performance when used
* properly, if you spawn too many events (ex: 1000+) without ever
* unspawning them you will likely see performance loss, this spawner
* is designed to reuse events that are unspawned so be sure to manage
* the number of active events you have on your map at once.
*
* If you encounter any problems or incompatibilities be sure to post about
* it on the store page!
*
* Please consider taking a moment to give 5 Stars on Itch ★★★★★
* Thank you!
*
* --------------------------------------------------------------------------------
*
* Script calls:
*
* Ritter.spawnEvent(mapId, eventId, x, y, save)
*
* mapId = the Id of the map which holds the event you want to spawn.
* eventId = the Id of the event on the map specified in mapId.
* x = x coordinate to place the event on the game map.
* y = y coordinate to place the event on the game map.
* save = true to save event and respawn it when you re-enter map.
* save = false to use the event as a temporary event which goes away
*        on map change. You can leave out save from script call to not
* 		 save the event.
*
* Example script call:
* Ritter.spawnEvent(42, 15, 8, 16, true)
* 
* Would spawn event 15 from map 42 on the game map at 8,16 coordinates
* and save the event data to automatically be respawned upon re-entering
* the map.
*
* Example script call two:
* Ritter.spawnEvent(42, 15, 8, 16)
*
* Would spawn event 15 from map 42 on the game map at 8,16 coordinates
* as a temporary event that goes away on map change. 
*
* -----------------------------------------------------------------------
*
* Ritter.spawnEventRegion(mapId, eventId, regions, save)
*
* mapId = the Id of the map which holds the event you want to spawn.
* eventId = the Id of the event on the map specified in mapId.
* regions = regionId(s) to place the spawned event on randomly.
*           to use multiple regionIds to randomly pick from list them
*           like this [4,8,15,16,23,42]
* save = true to save event and respawn it when you re-enter map.
* save = false to use the event as a temporary event which goes away
*        on map change.
*
* Example script call:
* Ritter.spawnEventRegion(4, 8, 15, true)
*
* Would spawn event 8 from map 4 on a random tile marked with regionId 15
* and save the events data to be automatically respawned upon re-entering
* the map.
*
* Example script call with array of regions:
* Ritter.spawnEventRegion(4, 8, [15,16,23,42])
*
* Would spawn event 8 from map 4 on a random tile marked with any of the 
* regionIds 15,16,23,42 as a temporary event that isn't saved.
*
* -----------------------------------------------------------------------
*
* Ritter.transformEvent(eventId, mapId, spawnId)
*
* eventId = id of the event on game map to transform.
* mapId = spawn map id that has template event.
* spawnId = id of event on spawn map to use as template.
*
* Example Script call:
*
* Ritter.transformEvent(1010, 4, 8)
*
* Would transform event 1010 into event 8 from map 4.
*
* -----------------------------------------------------------------------
*
* Ritter.unspawnEvent(eventId, removeSave)
*
* eventId = the Id of the event on the map to unspawn.
* removeSave = true to remove the event from saved events.
* removeSave = false to keep the event on save list to respawn up re-entering
* 			   the map. Leave removeSave empty to keep saved event.
*
* Example script call:
* Ritter.unspawnEvent(1000, true)
*
* Would unspawn event 1000 from the game map and delete the saved event data.
*
* Example script call two:
* Ritter.unspawnEvent(1000)
*
* Would unspawn event 1000 from the game map.
*
*
* Ritter.unspawnAll(removeSave)
*
* removeSave = true to delete saved event data.
* 			   leave empty to retain saved event data.
*
* Unspawns all spawned events on the map.
*
* -----------------------------------------------------------------------
*
* Ritter.restoreUnspawnedEvent(eventId)
*
* Restores an unspawned saved event using its eventId to the game map.
*
* Ritter.restoreUnspawnedEvent("name")
*
* Restores an unspawned saved event using its name to the game map.
*
* Ritter.restoreUnspawnedEvent(x, y)
*
* Restores an unspawned event that was last unspawned on tile x, y.
*
* $gameMap._lastSpawnEventId
*
* Returns the Id of the most recently spawned event.
*
* -----------------------------------------------------------------------
*
* Boundary System Script calls:  // Separate plugin required!
* 								 // Requires Ritter_BoundarySystem.js
*								 // Place Ritter_BoundarySystem.js above
* 								 // this plugin in plugin manager.
*
* This is an advanced plugin, be sure to read this section carefully to
* fully understand how to use this neat extension of the spawner!
*
* Ritter.Boundary.createSpawnerBoundary(width, height, thickness, name, eventId, expandBy, maxEvents, centerx, centery)
*
* width = total width of boundary.
*
* height = total height of boundary.
*
* thickness = the number of tiles thick the boundary is.
*
* name = the "name" of your boundary.
*
* eventId = 0 for game player, the id of any event for a boundary on an event, or -1 if using centerx, centery.
*
* expandBy = the number of tiles the boundary expands by in the direction the player is moving,
*			 this allows for increased probability of events spawning in front of the player as
*			 opposed to spawning on sides and back equally.
*
* maxEvents = the maximum number of events a boundary is allowed to spawn, this prevents the boundary
*			  from spawning an unlimited number of events and creating event clutter.
*
* centerx = leave these out if you're creating a boundary on player or event. set to x location if creating
*			boundary on x,y coordinates on map.
*
* centery = leave these out if you're creating a boundary on player or event. set to y location if creating
*			boundary on x,y coordinates on map.
*
* Example Script calls:
*
* Ritter.Boundary.createSpawnerBoundary(10, 10, 1, "spawn", 0, 2, 30)
*
* This would create a boundary of 10 tiles width and height around the game player with 1 thickness which is
* named "spawn", the boundary will expand by 2 tiles in the direction the player is moving and have a maximum
* of 30 events it can spawn.
*
* Ritter.Boundary.createSpawnerBoundary(13, 13, 1, "unspawn", 0, 0, 0)
*
* This would create a boundary of 13 tiles width and height around the game player with 1 thickness which is
* named "unspawn", the boundary will not expand in the direction the player is moving and will not be able
* to spawn any events.
*
* Ritter.Boundary.createSpawnerBoundary(4, 4, 2, "eventBoundary", 50, 0, 5)
*
* This would create a boundary of 4 tiles width and height around event 50 with 2 thickness which is named
* "eventBoundary", the boundary will not expand and is limited to spawning 5 events maximum at a time.
*
* Ritter.Boundary.createBoundary(5, 5, 1, "xyBoundary", -1, 0, 20, 50, 50)
*
* This would create a boundary of 5 tiles width and height around coordinates 50,50 on the game map which is
* named "xyBoundary", the boundary will not expand and is limited to spawning 20 events at a time.
*
* -----------------------------------------------------------------------
*
* Ritter.spawnEventOnBoundary(mapId, eventId, regions, boundaryName)
*
* mapId = The mapId of the spawn map which holds your template/source event to be copied to game map.
*
* eventId = The eventId of the template/source event to be copied to the game map.
*
* regions = The region Ids to use for spawning events on. List as an array to use multiple regionIds. [1, 2, 3]
*
* boundaryName = the "name" you gave your boundary that you wish to spawn on.
*
* -----------------------------------------------------------------------
*
* Ritter.spawnEventInBoundary(mapId, eventId, regions, boundaryName)
*
* mapId = The mapId of the spawn map which holds your template/source event to be copied to game map.
*
* eventId = The eventId of the template/source event to be copied to the game map.
*
* regions = The region Ids to use for spawning events on. List as an array to use multiple regionIds. [1, 2, 3]
*
* boundaryName = the "name" you gave your boundary that you wish to spawn on.
* 
* --------------------------------------------------------------------------------
* 
* Ritter.spawnFillInBoundary(mapId, eventId, regions, boundaryName)
*
* mapId = The mapId of the spawn map which holds your template/source event to be copied to the game map.
*
* eventId = The eventId of the template/source event to be copied to the game map.
*
* regions = The region Ids to use for spawning events on. List as an array to use multiple regionIds. [1, 2, 3]
*
* boundaryName = the "name" you gave your boundary that you wish to spawn on.
*
* -----------------------------------------------------------------------
* 
* Ritter.spawnFillOnBoundary(mapId, eventId, regions, boundaryName)
*
* mapId = The mapId of the spawn map which holds your template/source event to be copied to the game map.
*
* eventId = The eventId of the template/source event to be copied to the game map.
*
* regions = The region Ids to use for spawning events on. List as an array to use multiple regionIds. [1, 2, 3]
*
* boundaryName = the "name" you gave your boundary that you wish to spawn on.
*
* -----------------------------------------------------------------------
*
* Ritter.unspawnEventOnBoundary(boundaryName)
*
* boundaryName = the "name" you assigned to the boundary you wish to use for unspawnEventOnBoundary.
*
*
* Example Script Calls using boundaries created above:
*
* Ritter.spawnEventOnBoundary(4, 8, [15, 16], "spawn")
*
* This would spawn event 8 from map 4 on a random tile marked with regionIds 15 or 16 that pass through the boundary
* named "spawn".
*
* Ritter.unspawnEventOnBoundary("unspawn")
*
* This would unspawn any events located on the boundary "unspawn".
*
* -----------------------------------------------------------------------
*
* Suggested common event setup for spawning / unspawning on/in a boundary.
*
* Create a common event that runs parallel and tie it to a switch, so that when you enable the switch
* the spawn event functions get called.
*
* First common event:
*
* Script: Ritter.spawnEventOnBoundary(mapId, eventId, regions, boundaryName)
* Wait: 30-60 frames. (Suggested to use 30-40 frame wait minimum)
*
* Second common event:
*
* Ritter.unspawnEventOnBoundary(boundaryName)
* Wait: 10 frames. (Suggested 5 frame wait per thickness of unspawn boundary)
*				   (5 frames * thickness)
*				   (Suggested 2 thickness for unspawn boundaries)
*
* --------------------------------------------------------------------------------
* 
* Terms of Use:
* Can be used in Commercial and Non-Commercial games if purchased.
* Personal edits are allowed for use in your game,
* don't claim credit for this plugin.
* Don't post this plugin elsewhere, modified or otherwise.
* Don't remove my name from Author.
* I am not liable for any problems you may encounter while
* using this plugin, though I may, or may not, be available
* for support on RPG Maker Forums or my itch.io page for this plugin.
* I will not support edits to the code.
* Please consider crediting me in your games credits as: Craig "Ritter" Barger
*
*
* --------------------------------------------------------------------------------
*
* Version log:
*
* 1.0: Released Plugin.
* 1.1: Fixed crash/incompatibility issue with Chrono Engine
* 1.2: Added two new methods for restoring unspawned saved events.
*	   Added calls to fill boundaries with events with a single call.
* 1.3: Fixed a bug which prevented the user from adding more than 3 or 4 preload maps.
* 1.4: Fixed an incompatibility with Altimit Movement plugin.
*
* --------------------------------------------------------------------------------
*
* @param Spawn Events Starting Id
* @type number
* @default 1000
* @desc The ID Number to use as the first spawn event ID.
*
* @param Preload Spawn Maps
* @type string
* @desc Optional- list spawn maps to preload. Separate with spaces.
* Example: 4 8 15 16 23 42
* 
* @param ----------------------------------
* @desc Don't look in here!
*
* @param MOG Chrono Engine Compatibility
*
* @param ----------------------------------
* @desc Don't look in here!
*
* @param Chrono Engine Tool Offset
* @type number
* @default 2000
* @desc The Starting EventId to use for Chrono Engine Tool Events.
* Tool events clash with spawn events, give a lot of room.
*
*
*/

var Imported = Imported || {};
Imported.Ritter_EventSpawner = true;

var Ritter = Ritter || {};
Ritter.Params = Ritter.Params || {};
Ritter._SpawnMaps = Ritter._SpawnMaps || [];
Ritter._mapRegionData = [];
Ritter._spawnOnEvents = false;

var parameters = PluginManager.parameters('Ritter_EventSpawner');
Ritter.Params.FirstId = Number(parameters["Spawn Events Starting Id"]);
Ritter.Params.preloadMaps = String(parameters["Preload Spawn Maps"]);
if (Ritter.Params.preloadMaps) {
	Ritter.Params.preloadMaps = Ritter.Params.preloadMaps.split(' ');
	for (var i = 0; i < Ritter.Params.preloadMaps.length; i++) {
		Ritter.Params.preloadMaps[i] = Number(Ritter.Params.preloadMaps[i]);
	}
}
Ritter.Params.MogToolId = Number(parameters["Chrono Engine Tool Offset"]);

(function() {
	
// Data Stuff

Ritter_Game_Map_Setup_Spawn = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    Ritter_Game_Map_Setup_Spawn.call(this,mapId);
	Ritter.getRegionData();
	if (Imported.MOG_ChronoEngine) this._events[Ritter.Params.MogToolId - 1] = undefined;
	if (Ritter._SpawnMaps.length == 0 && Ritter.Params.preloadMaps.length > 0) {
		var mapIds = Ritter.Params.preloadMaps;
		for (let i = 0; i < Ritter.Params.preloadMaps.length; i++) {
			var map = '$SpawnMap%1'.format(mapIds[i]);
			var object = window[map];
			Ritter._SpawnMaps.push(Ritter.Params.preloadMaps[i]);
			DataManager.extractMetadata(object);
			array = object.events;
			if (Array.isArray(array)) {
				for (var j = 1; j < array.length; j++) {
					var data = array[j];
					if (data && data.note !== undefined) {
						DataManager.extractMetadata(data);
					}
				}
			}
		}
	}
};

Ritter.getRegionData = function(refresh = false) {
	mapId = $gameMap._mapId;
	if (refresh === true) delete Ritter._mapRegionData[mapId];
	if (!Ritter._mapRegionData[mapId]) Ritter._mapRegionData[mapId] = [];
	for (let x = 0, w = $gameMap.width(); x < w; x++) {
		for (let y = 0, h = $gameMap.height(); y < h; y++) {
			if (!Ritter._mapRegionData[mapId][$gameMap.regionId(x,y)]) {
				Ritter._mapRegionData[mapId][$gameMap.regionId(x,y)] = [];
			}
			Ritter._mapRegionData[mapId][$gameMap.regionId(x,y)].push([x,y]);
		}
	}
};
	
DataManager.preloadMaps = function () {
	if (!Ritter.Params.preloadMaps) return;
	var mapIds = Ritter.Params.preloadMaps;
	
	for (var i = 0; i < Ritter.Params.preloadMaps.length; i++) {
		var filename = 'Map%1.json'.format(mapIds[i].padZero(3));
		this.loadDataFile('$SpawnMap%1'.format(mapIds[i]), filename);
	}
};

Ritter_DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    Ritter_DataManager_createGameObjects.call(this);
	try {
		this.preloadMaps();
	} catch (error) {
		console.error(error);
	}
};

DataManager.loadSpawnMap = function(mapId, eventId, x, y, save) {
	var filename = 'Map%1.json'.format(mapId.padZero(3));
	this.loadDataFile('$SpawnMap%1'.format(mapId), filename);
	var url = 'data/Map%1.json'.format(mapId.padZero(3))
	var map = new XMLHttpRequest();
	map.open('GET', url);
	map.onload = function() {
		if (!this._retries) this._retries = 0;
		this._retries += 1;
		console.log("Retry: " + this._retries);
		if (!window['$SpawnMap%1'.format(mapId)]) return DataManager.loadSpawnMap(mapId, eventId, x, y, save);
		DataManager.extractMetadata(window['$SpawnMap%1'.format(mapId)]);
		Ritter._SpawnMaps.push(mapId);
		$gameMap.spawnEvent(mapId, eventId, x, y, save);
	};
	map.onerror = function() { throw new Error('Failed to load: ' + url); };
	map.send();
};

// End data stuff

Ritter.spawnEvent = function(mapId, eventId, x, y, save) {
	if (!SceneManager._scene === 'Scene_Map') return;
	if (!Ritter.canSpawnOn(x, y)) return;
	if (!Ritter._SpawnMaps.contains(mapId)) {
		DataManager.loadSpawnMap(mapId, eventId, x, y, save);
	} else {
		$gameMap.spawnEvent(mapId, eventId, x, y, save);
	}
};

Ritter.spawnEventRegion = function(mapId, eventId, regions, save) {
	if (!SceneManager._scene === 'Scene_Map') return;
	$gameMap.spawnEventRegion(mapId, eventId, regions, save);
};

Ritter.transformEvent = function(eventId, mapId, spawnId) {
	$gameMap.transformEvent(eventId, mapId, spawnId);
};

Ritter.unspawnEvent = function(eventId, removeSave) {
	if ($gameMap._unspawnList.contains(eventId)) return;
	$gameMap.unspawnEvent(eventId, removeSave);
};

Ritter.unspawnAll = function(removeSave = false) {
	$gameMap.unspawnAll(removeSave);
};

Ritter.restoreUnspawnedEvent = function(eventId, y) {
	if (eventId.constructor === String) {
		for (event in $gameMap._savedEvents[$gameMap._mapId]) { 
			if ($gameMap._savedEvents[$gameMap._mapId][event]._eventData.name == eventId) eventId = event;
		}
	} else {
		if (!!y) {
			x = eventId;
			for (event in $gameMap._savedEvents[$gameMap._mapId]) {
				if ($gameMap._savedEvents[$gameMap._mapId][event].x == x &&
					$gameMap._savedEvents[$gameMap._mapId][event].y == y) {
						eventId = event;
					}
			}
		}
	}
	$gameMap.restoreUnspawnedEvent(eventId);
};

Ritter_Game_Event_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
	Ritter_Game_Event_initialize.call(this, mapId, eventId);
	this._parentBoundary = "";
};

Game_Event.prototype.newData = function(event) {
	this._eventData = event;
	this.initialize(this._mapId, this._eventId);
	DataManager.extractMetadata(this.event());
	DataManager.extractMetadata(event);
};

Game_Map.prototype.spawnEvent = function(mapId, eventId, x, y, save) {
	if (!this._unspawnList) this._unspawnList = [];
	if (!this._spawnedList) this._spawnedList = [];
	var nextId = this.getFirstNullEvent();
	var mapData = window['$SpawnMap%1'.format(mapId)];
	var event = mapData.events[eventId];
	var event = JsonEx.makeDeepCopy(event);
	event.x = x;
	event.y = y;
	if (this._unspawnList.length > 0) {
		var spawnEvent = $gameMap._events[this._unspawnList[0]];
		event.id = this._unspawnList[0];
		$dataMap.events[this._unspawnList[0]] = event;
		spawnEvent.newData(event);
		this._spawnedList.push(this._unspawnList[0]);
		this._unspawnList.splice(0, 1);
	} else {
		event.id = nextId;
		$dataMap.events[nextId] = event;
		var spawnEvent = new Game_Event(this._mapId, nextId);
		spawnEvent.newData(event);
		this._events[nextId] = spawnEvent;
		this._spawnedList.push(nextId);
		SceneManager._scene._spriteset.spawnedEvent(spawnEvent);
	}
	this._lastSpawnEventId = spawnEvent._eventId;
	spawnEvent._spawnMap = mapId;
	spawnEvent._spawnId = eventId;
	if (save) this.saveEvent(spawnEvent._eventId, this._mapId);
};

Game_Map.prototype.transformEvent = function(eventId, mapId, spawnId) {
	var spawnEvent = $gameMap._events[eventId];
	var mapData = window['$SpawnMap%1'.format(mapId)];
	var event = mapData.events[spawnId];
	var event = JsonEx.makeDeepCopy(event);
	event.x = spawnEvent.x;
	event.y = spawnEvent.y;
	$dataMap.events[eventId] = event;
	spawnEvent.newData(event);
	if (!this._spawnedList.contains(eventId)) this._spawnedList.push(eventId);
	spawnEvent._spawnMap = mapId;
	spawnEvent._spawnId = spawnId;
	if (this._savedEvents[this._mapId][eventId]) this._savedEvents[this._mapId][eventId] = this.event(eventId);
};

Game_Map.prototype.spawnEventRegion = function(mapId, eventId, region, save = false) {
	if (!Array.isArray(region)) region = [region];
	coords = Ritter.getRandomTileInRegion(region);
	if (!coords) return;
	Ritter.spawnEvent(mapId, eventId, coords[0], coords[1], save);
};

Ritter.getRandomTileInRegion = function(regions) {
	mapId = $gameMap._mapId;
	var validTiles = [];
	for (let i = 0; i < Ritter._mapRegionData[mapId].length; i++) {
		if (regions.contains(i)) {
			for (let j = 0; j < Ritter._mapRegionData[mapId][i].length; j++) {
				if (!Ritter.canSpawnOn(Ritter._mapRegionData[mapId][i][j][0], Ritter._mapRegionData[mapId][i][j][1])) continue;
				validTiles.push(Ritter._mapRegionData[mapId][i][j]);
			}
		}
	}
	if (validTiles.length === 0) return console.log("Failed to find spawnable tile on regions");
	tile = Math.floor(Math.random() * validTiles.length);
	coords = validTiles[tile];
	return [coords[0], coords[1]];
};

Game_Map.prototype.getFirstNullEvent = function() {
	if ($dataMap.events.length < Ritter.Params.FirstId) $dataMap.events[Ritter.Params.FirstId] = undefined;
	for (i = Ritter.Params.FirstId; i <= $dataMap.events.length; i++) {
		if ($dataMap.events[i] === undefined && this._savedEvents[this._mapId][i] === undefined) return i;
	}
};

Game_Map.prototype.unspawnEvent = function(eventId, removeSave) {
	if (!this.event(eventId)) return;
	if (!this._unspawnList) this._unspawnList = [];
	mapId = this._mapId;
	index = this._spawnedList.indexOf(eventId);
	if (this._savedEvents[this._mapId][eventId] != this.event(eventId)) {
		this._unspawnList.push(eventId);
		this._unspawnList.sort(function(a, b) {
			return a - b;
		});
	}
	this._spawnedList.splice(index, 1);
	if (removeSave === true && this._savedEvents[this._mapId][eventId]) this.deleteSave(eventId);
	if (this._savedEvents[this._mapId][eventId] === this.event(eventId) && !removeSave) {
		this._savedEvents[this._mapId][eventId] = JsonEx.makeDeepCopy(this.event(eventId));
	}
	this.event(eventId).setPosition(-1, -1);
	this.eraseEvent(eventId);
	Ritter.resetSelfSwitches(eventId, mapId);
	if (!!this.event(eventId)._moveTarget) {
		this.event(eventId)._moveTarget = false;
	}
	if (!!this.event(eventId)._moveTargetX) {
		this.event(eventId)._moveTargetX = -1;
	}
	if (!!this.event(eventId)._moveTargetY) {
		this.event(eventId)._moveTargetY = -1;
	}
};

Ritter.resetSelfSwitches = function(eventId, mapId) {
	letters = ['A', 'B', 'C', 'D'];
	letters.forEach((letter) => {
		let key = [mapId, eventId, letter];
		$gameSelfSwitches.setValue(key, false);
	});
}

Game_Map.prototype.unspawnAll = function(removeSave = false) {
	for (let i = Ritter.Params.FirstId; i < $dataMap.events.length; i++) {
		if ($gameMap._unspawnList.contains(i)) continue;
		Ritter.unspawnEvent(i, removeSave);
	}
};

Ritter.canSpawnOn = function(x, y, regions) {
	var region = $gameMap.regionId(x,y);
	if ($gameMap.eventsXy(x, y).length > 0 && !Ritter._spawnOnEvents) return false;
	if ($gamePlayer.x == x && $gamePlayer.y == y) return false;
	if (regions && !regions.contains(region)) return false;
	if (!$gameMap.isPassable(x,y)) return false;
	return true;
};

// Save Event Stuff

Game_Map.prototype.saveEvent = function(eventId, mapId) {
	if (!this._savedEvents) this._savedEvents = {};
	if (!this._savedEvents[this._mapId]) this._savedEvents[this._mapId] = [];
	this._savedEvents[this._mapId][eventId] = this.event(eventId);
};

Game_Map.prototype.deleteSave = function(eventId) {
	if (!this._savedEvents[this._mapId][eventId]) { console.log("No such eventId on the save list"); return; };
	$gameMap._unspawnList.push(eventId);
	delete this._savedEvents[this._mapId][eventId];
};

Game_Map.prototype.restoreSavedEvents = function() {
	for (var i = Ritter.Params.FirstId; i < this._savedEvents[this._mapId].length; i++) {
		if (!this._savedEvents[this._mapId][i]) continue;
		event = this._savedEvents[this._mapId][i];
		$dataMap.events[i] = JsonEx.makeDeepCopy(window['$SpawnMap%1'.format(event._spawnMap)].events[event._spawnId]);
		$dataMap.events[i].x = event._x;
		$dataMap.events[i].y = event._y;
		$dataMap.events[i].id = event._eventId;
		this._restoreSavedEvent(event);
	}
};



Game_Map.prototype.restoreUnspawnedEvent = function(eventId) {
	event = this._savedEvents[this._mapId][eventId];
	this._events[eventId] = this._savedEvents[this._mapId][eventId];
	this.event(eventId).setPosition(event.x, event.y);
	SceneManager._scene._spriteset.spawnedEvent(this.event(eventId));
	this._spawnedList.push(eventId);
};

Game_Map.prototype._restoreSavedEvent = function(savedEvent) {
	if (!this._unspawnList) this._unspawnList = [];
	if (!this._spawnedList) this._spawnedList = [];
	var nextId = savedEvent._eventId;
	var mapId = savedEvent._spawnMap;
	var spawnId = savedEvent._spawnId;
	var event = savedEvent._eventData;
	event.x = savedEvent.x;
	event.y = savedEvent.y;
	
	$dataMap.events[nextId] = event;
	savedEvent.newData(event);
	this._events[nextId] = savedEvent;
	this._spawnedList.push(nextId);	
	this._lastSpawnEventId = savedEvent._eventId;
}; 

// Event Setup Stuff

Ritter_Game_Map_setupEvents = Game_Map.prototype.setupEvents;
Game_Map.prototype.setupEvents = function() {
	if (!this._savedEvents) this._savedEvents = {};
	if (!this._savedEvents[this._mapId]) this._savedEvents[this._mapId] = [];
	
	Ritter_Game_Map_setupEvents.call(this);
	if (this._savedEvents[this._mapId].length > 0) this.restoreSavedEvents();
};

Game_Map.prototype.postSetup = function() {
	for (var i = Ritter.Params.FirstId; i < this._savedEvents[this._mapId].length; i++) {
		if (this._savedEvents[this._mapId][i] === undefined) continue;
		event = this._savedEvents[this._mapId][i];
		this._events[i] = event;
		this._spawnedList.push(i);
	}
};

Ritter_Game_Player_reserveTransfer = Game_Player.prototype.reserveTransfer;
Game_Player.prototype.reserveTransfer = function(mapId, x, y, d, fadeType) {
	if (!$gameMap._savedEvents) $gameMap._savedEvents = {};
	if (!$gameMap._savedEvents[$gameMap._mapId]) $gameMap._savedEvents[$gameMap._mapId] = [];
	if ($gameMap._savedEvents[$gameMap._mapId].length > 0) $gameMap.updateSavedEvents();
	if (!$gameMap._unspawnList) $gameMap._unspawnList = [];
	if ($gameMap._unspawnList.length > 0) $gameMap._unspawnList = [];
	if (!$gameMap._spawnedList) $gameMap._spawnedList = [];
	if ($gameMap._spawnedList.length > 0) $gameMap._spawnedList = [];
	if (Imported.Ritter_BoundarySystem) Ritter.clearBoundaryEvents();
	
	Ritter_Game_Player_reserveTransfer.call(this,mapId, x, y, d, fadeType);
};

Game_Map.prototype.updateSavedEvents = function() {
	map = $gameMap;
	for (var i = Ritter.Params.FirstId; i < map._savedEvents[map._mapId].length; i++) {
		if (map._savedEvents[map._mapId][i] === undefined) continue;
		if (map.event(i).x === -1) continue;
		saveData = JsonEx.makeDeepCopy(map.event(i));
		map._savedEvents[map._mapId][i] = saveData;
	}
};

// Sprite stuff

Spriteset_Map.prototype.spawnedEvent = function(event) {
	if (!this._characterSprites) return;
	var eventSprite = new Sprite_Character(event);
	this._characterSprites.push(eventSprite);
	this._tilemap.addChild(eventSprite);
	return;
};

// Recreate $dataMap.events entries upon scene change

Ritter_Spriteset_Map_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
    if ($gameMap._spawnedList.length > 0) {
			Ritter.recreateDatamapEvents();
	}
	if (!$gameMap._events[Ritter.Params.MogToolId - 1] && Imported.MOG_ChronoEngine) $gameMap._events[Ritter.Params.MogToolId - 1] = undefined;
	Ritter_Spriteset_Map_createCharacters.call(this);
};

Ritter.recreateDatamapEvents = function() {
	end = $gameMap._spawnedList.length + $gameMap._unspawnList.length + Ritter.Params.FirstId;
	for (let i = Ritter.Params.FirstId; i < end; i++) {
		if (!$gameMap._events[i]) continue;
		$dataMap.events[i] = $gameMap._events[i]._eventData;
		$dataMap.events[i].x = $gameMap._events[i].x;
		$dataMap.events[i].y = $gameMap._events[i].y;
	}
};

// Boundary System Compatibility
// Requires a separate plugin to use these functions.

if (Imported.Ritter_BoundarySystem) {
	
	Game_Map.prototype.spawnBoundaryEvent = function(mapId, eventId, x, y, boundaryName) {
	if (!SceneManager._scene === 'Scene_Map') return;
	if (!Ritter.canSpawnOn(x, y)) return;
		
	if (!this._unspawnList) this._unspawnList = [];
	if (!this._spawnedList) this._spawnedList = [];
	var nextId = this.getFirstNullEvent();
	var mapData = window['$SpawnMap%1'.format(mapId)];
	var event = mapData.events[eventId];
	var event = JsonEx.makeDeepCopy(event);
	event.x = x;
	event.y = y;
	if (this._unspawnList.length > 0) {
		var spawnEvent = $gameMap._events[this._unspawnList[0]];
		event.id = this._unspawnList[0];
		$dataMap.events[this._unspawnList[0]] = event;
		spawnEvent.newData(event);
		this._spawnedList.push(this._unspawnList[0]);
		this._unspawnList.splice(0, 1);
	} else {
		event.id = nextId;
		$dataMap.events[nextId] = event;
		var spawnEvent = new Game_Event(this._mapId, nextId);
		spawnEvent.newData(event);
		this._events[nextId] = spawnEvent;
		this._spawnedList.push(nextId);
		SceneManager._scene._spriteset.spawnedEvent(spawnEvent);
	}
	this._lastSpawnEventId = spawnEvent._eventId;
	spawnEvent._spawnMap = mapId;
	spawnEvent._spawnId = eventId;
	spawnEvent._parentBoundary = boundaryName;
	
	boundary = Ritter.Boundary.getBoundary(boundaryName);
	var boundaryIndex = Ritter.Boundary._boundaryType.indexOf(boundary);
	Ritter.Boundary._boundaryType[boundaryIndex].boundaryEvents.push(true);
}; 
	
	Ritter.spawnEventOnBoundary = function(mapId, eventId, regions, boundaryName) {
		boundary = Ritter.Boundary.getBoundary(boundaryName);
		if (!(boundary.boundaryEvents.length < boundary.maxEvents)) return;
		coords = Ritter.Boundary.randomRegionOnBoundary(regions, boundary);
		if (!coords) return;
		$gameMap.spawnBoundaryEvent(mapId, eventId, coords[0], coords[1], boundaryName);
	};
	
	Ritter.spawnEventInBoundary = function(mapId, eventId, regions, boundaryName) {
		boundary = Ritter.Boundary.getBoundary(boundaryName);
		if (!(boundary.boundaryEvents.length < boundary.maxEvents)) return;
		coords = Ritter.Boundary.randomRegionInBoundary(regions, boundary);
		if (!coords) return;
		$gameMap.spawnBoundaryEvent(mapId, eventId, coords[0], coords[1], boundaryName);
	};
	
	Ritter.spawnFillInBoundary = function(mapId, eventId, regions, boundaryName) {
		if (!Array.isArray(regions)) regions = [regions];
		boundary = Ritter.Boundary.getBoundary(boundaryName);
		tiles = Ritter.Boundary.getInBoundaryTiles(boundary);
	
		tiles.forEach((tile) => {
			if (!(tile[0] == $gamePlayer.x && tile[1] == $gamePlayer.y)
				&& (tile[0] >= 0 && tile[0] <= $dataMap.width - 1)
				&& (tile[1] >= 0 && tile[1] <= $dataMap.height - 1)
				&& !$gameMap.eventIdXy(tile[0], tile[1])
				&& boundary.boundaryEvents.length < boundary.maxEvents
				&& regions.contains($gameMap.regionId(tile[0], tile[1]))) {
				$gameMap.spawnBoundaryEvent(mapId, eventId, tile[0], tile[1], boundaryName);
			}
		});
	};

	Ritter.spawnFillOnBoundary = function(mapId, eventId, regions, boundaryName) {
		if (!Array.isArray(regions)) regions = [regions];
		boundary = Ritter.Boundary.getBoundary(boundaryName);
		tiles = Ritter.Boundary.getOnBoundaryTiles(boundary);
	
		tiles.forEach((tile) => {
			if (!(tile[0] == $gamePlayer.x && tile[1] == $gamePlayer.y)
				&& (tile[0] >= 0 && tile[0] <= $dataMap.width - 1)
				&& (tile[1] >= 0 && tile[1] <= $dataMap.height - 1)
				&& !$gameMap.eventIdXy(tile[0], tile[1])
				&& boundary.boundaryEvents.length < boundary.maxEvents
				&& regions.contains($gameMap.regionId(tile[0], tile[1]))) {
				$gameMap.spawnBoundaryEvent(mapId, eventId, tile[0], tile[1], boundaryName);
			}
		});
	};
	
	Ritter.unspawnEventOnBoundary = function(boundaryName) {
		boundary = Ritter.Boundary.getBoundary(boundaryName);
		tiles = Ritter.Boundary.getOnBoundaryTiles(boundary);
		var unspawned = [];
		for (let i = 0; i < tiles.length; i++) {
			let eventId = $gameMap.eventIdXy(tiles[i][0], tiles[i][1]);
			if (!$gameMap.event(eventId)) continue;
			if ($gameMap.event(eventId)._parentBoundary == "") continue;
			let eventBoundary = Ritter.Boundary.getBoundary($gameMap.event(eventId)._parentBoundary);
			let eventBoundaryIndex = Ritter.Boundary._boundaryType.indexOf(eventBoundary);
			if ($gameMap._spawnedList.contains(eventId)) {
				unspawned.push(eventId);
				Ritter.unspawnEvent(eventId);
				Ritter.Boundary._boundaryType[eventBoundaryIndex].boundaryEvents.splice(0, 1);
			}
		}
	};
	
	Ritter_Boundary_createBoundary = Ritter.Boundary.createBoundary;
	Ritter.Boundary.createSpawnerBoundary = function(width, height, thickness, name = '', eventId = -1, expandBy = 4, maxEvents, centerx = undefined, centery = undefined) {
		Ritter_Boundary_createBoundary.call(this, width, height, thickness, name, eventId, expandBy, centerx, centery);
		for (i = 0; i < this._boundaryType.length; i++) {
			if (this._boundaryType[i].name === name) {
				this._boundaryType[i].maxEvents = maxEvents;
				this._boundaryType[i].boundaryEvents = [];
			}
		}
	};
	
	Ritter.clearBoundaryEvents = function() {
		if (!Ritter.Boundary._boundaryType) return;
		for (let i = 0; i < Ritter.Boundary._boundaryType.length; i++) {
			Ritter.Boundary._boundaryType[i].boundaryEvents = [];
		}
	}
};

// Testing QPlus Compatibility.
// Not 100% on if this fix is proper, needs testing.

if (!!Imported.QPlus) {
	var Ritter_QPlus_mixinWait = QPlus.mixinWait;
	QPlus.mixinWait = function(into) {
		if (into._eventId >= Ritter.Params.FirstId) {
			return;
		} else {
			Ritter_QPlus_mixinWait.call(this, into);
		}
	};
}

})();