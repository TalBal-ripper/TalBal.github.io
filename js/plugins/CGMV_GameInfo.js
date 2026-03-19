/*:
 * @plugindesc CGMV Game Info
 * @author Casper Gaming
 * @help
 * ==============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * http://caspergaming.com/dev/terms_of_use/
 * ==============================================================================
 * Become a Patron to get access to a demo for this plugin as well as beta plugins
 * https://www.patreon.com/CasperGamingRPGM
 * ==============================================================================
 * Version: 1.0
 * ------------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMV plugins.
 * Made for RPG Maker MV 1.6.0
 * ------------------------------------------------------------------------------
 * Description: This plugin provides the option of displaying some
 * info on the bottom of the title screen, such as website or
 * copyright info.
 * ------------------------------------------------------------------------------
 * Documentation:
 * Not needed.
 * 
 * @param Left Text
 * @desc Text shown on bottom left of title screen.
 *
 * @param Center Text
 * @desc Text shown on bottom center of title screen.
 *
 * @param Right Text
 * @desc Text shown on bottom right of title screen.
 *
 * @param Font Size
 * @type number
 * @min 1
 * @desc Font size for the text at bottom of title screen.
 * Default: 12
 * @default 12
 * 
 * @param Buttons
 * @type struct<Button>[]
 * @default []
 * @desc Set up clickable buttons here
*/
/*~struct~Button:
 * @param Image
 * @type file
 * @dir img/pictures
 * @default 
 * @desc The image file (stored in pictures folder) to use
 *
 * @param x
 * @type number
 * @min 0
 * @default 0
 * @desc The x coordinate to show the button
 *
 * @param y
 * @type number
 * @min 0
 * @default 0
 * @desc The y coordinate to show the button
 *
 * @param width
 * @type number
 * @min 1
 * @default 50
 * @desc The width of the button
 *
 * @param height
 * @type number
 * @min 1
 * @default 50
 * @desc The height of the button
 *
 * @param URL
 * @type text
 * @default 
 * @desc Enter in a website url which will be launched on click
 */
var Imported = Imported || {};
Imported.CGMV_GameInfo = true;

var CGMV = CGMV || {};
CGMV.GameInfo = CGMV.GameInfo || {};
CGMV.GameInfo.version = 1.0;
CGMV.GameInfo.parameters = PluginManager.parameters('CGMV_GameInfo');
CGMV.GameInfo.LeftText = CGMV.GameInfo.parameters["Left Text"] || "";
CGMV.GameInfo.CenterText = CGMV.GameInfo.parameters["Center Text"] || "";
CGMV.GameInfo.RightText = CGMV.GameInfo.parameters["Right Text"] || "";
CGMV.GameInfo.FontSize = Number(CGMV.GameInfo.parameters["Font Size"]) || 12;
CGMV.GameInfo.Buttons = JSON.parse(CGMV.GameInfo.parameters["Buttons"]);
//=============================================================================
// Scene_Title
//-----------------------------------------------------------------------------
// Modify the title scene to add additional text at bottom. Also handles map
// switching.
// added functions: drawCGMVInfo
// modified functions: createForeground
//=============================================================================
//-----------------------------------------------------------------------------
// Also add CGMV info text to foreground
//-----------------------------------------------------------------------------
var alias_CGMV_Title_createForeground = Scene_Title.prototype.createForeground;
Scene_Title.prototype.createForeground = function() {
    alias_CGMV_Title_createForeground.call(this);
	this.drawCGMVInfo();
    //this.CGMV_GameInfo_DrawSocialButtons();
};
//-----------------------------------------------------------------------------
// Draw CGMV info text
//-----------------------------------------------------------------------------
Scene_Title.prototype.drawCGMVInfo = function() {
	var x = 20;
    var y = Graphics.height - (28 + CGMV.GameInfo.FontSize);
    var maxWidth = Graphics.width - x * 2;
    this._gameTitleSprite.bitmap.outlineColor = 'black';
    this._gameTitleSprite.bitmap.outlineWidth = 2;
    this._gameTitleSprite.bitmap.fontSize = CGMV.GameInfo.FontSize;
	this._gameTitleSprite.bitmap.drawText(CGMV.GameInfo.LeftText, x, y, maxWidth, 48, 'left');
    this._gameTitleSprite.bitmap.drawText(CGMV.GameInfo.CenterText, x, y, maxWidth, 48, 'center');
	this._gameTitleSprite.bitmap.drawText(CGMV.GameInfo.RightText, x, y, maxWidth, 48, 'right');
};
//-----------------------------------------------------------------------------
// Draw CGMV social media / patreon / etc buttons
//-----------------------------------------------------------------------------
Scene_Title.prototype.CGMV_GameInfo_DrawSocialButtons = function() {
	let buttonArray = CGMV.GameInfo.Buttons;
	for(let i = 0; i < buttonArray.length; i++) {
		let buttonObject = JSON.parse(buttonArray[i]);
		let sprite = new Sprite_CGMV_GameInfo_Button(buttonObject["URL"]);
		sprite.bitmap = ImageManager.loadPicture(buttonObject["Image"]);
		sprite.move(buttonObject.x, buttonObject.y);
		sprite.bitmap.addLoadListener(this.CGMV_GameInfo_scaleSprite.bind(this, {"sprite": sprite, "width": buttonObject.width, "height": buttonObject.height}));
		sprite.opacity = 200;
		this.addChild(sprite);
	}
};
//-----------------------------------------------------------------------------
// Scale sprite after load
//-----------------------------------------------------------------------------
Scene_Title.prototype.CGMV_GameInfo_scaleSprite = function(args) {
	let sprite = args.sprite;
	sprite.scale.x = args.width / sprite.width;
	sprite.scale.y = args.height / sprite.height;
};
//=============================================================================
// Sprite_CGMV_GameInfo_Button
//-----------------------------------------------------------------------------
// Buttons for the title screen with mouse over behavior and click behavior
//=============================================================================
function Sprite_CGMV_GameInfo_Button() {
    this.initialize(...arguments);
}
Sprite_CGMV_GameInfo_Button.prototype = Object.create(Sprite_Clickable.prototype);
Sprite_CGMV_GameInfo_Button.prototype.constructor = Sprite_CGMV_GameInfo_Button;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
Sprite_CGMV_GameInfo_Button.prototype.initialize = function(url) {
	Sprite_Clickable.prototype.initialize.call(this);
	this._targetOpacity = 200;
	this._url = url;
	this._cursor = document.body.style.cursor;
};
//-----------------------------------------------------------------------------
// On destroy, turn cursor back to normal
//-----------------------------------------------------------------------------
Sprite_CGMV_GameInfo_Button.prototype.destroy = function() {
	document.body.style.cursor = this._cursor;
	Sprite_Clickable.prototype.destroy.call(this);
};
//-----------------------------------------------------------------------------
// Update
//-----------------------------------------------------------------------------
Sprite_CGMV_GameInfo_Button.prototype.update = function() {
	Sprite_Clickable.prototype.update.call(this);
	if(this.opacity !== this._targetOpacity) {
		this.updateOpacity();
	}
};
//-----------------------------------------------------------------------------
// Update the opacity of the sprite
//-----------------------------------------------------------------------------
Sprite_CGMV_GameInfo_Button.prototype.updateOpacity = function() {
	if(this.opacity < this._targetOpacity) {
		this.opacity += 5;
		if(this.opacity > this._targetOpacity) {
			this.opacity = this._targetOpacity;
		}
	} else {
		this.opacity -= 5;
		if(this.opacity < this._targetOpacity) {
			this.opacity = this._targetOpacity;
		}
	}
};
//-----------------------------------------------------------------------------
// If mouse over, change opacity to 255
//-----------------------------------------------------------------------------
Sprite_CGMV_GameInfo_Button.prototype.onMouseEnter = function() {
    this._targetOpacity = 255;
	this._cursor = document.body.style.cursor;
	document.body.style.cursor = "pointer";
};
//-----------------------------------------------------------------------------
// If not hovered, change opacity to 200
//-----------------------------------------------------------------------------
Sprite_CGMV_GameInfo_Button.prototype.onMouseExit = function() {
    this._targetOpacity = 200;
	document.body.style.cursor = this._cursor;
};
//-----------------------------------------------------------------------------
// Open URL when clicked
//-----------------------------------------------------------------------------
Sprite_CGMV_GameInfo_Button.prototype.onClick = function() {
	if(Utils.isNwjs()) {
		require('nw.gui').Shell.openExternal(this._url);
	} else {
		window.open(this._url);
	}
};