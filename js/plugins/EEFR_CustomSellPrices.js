/*:
 * ==============================================================================
 *  EEFR_CustomSellPrices.js
 * ==============================================================================
 * @plugindesc v1.1.1 A plugin for setting custom sell prices and modifying the default sell price.
 * @author FDSuprema - Ed Engine FR
 * ------------------------------------------------------------------------------
 *   
 * @param Sell Percentage
 * @desc The default sell percentage for all items without a custom sell cost. Default is 50 percent.
 * @default 50
 *  
 * @param Bonus Variable
 * @desc The game variable used to grant a bonus percentage to all sell prices. Default is 0, which means none.
 * @default 0 
 *  
 *  
 *  
 * ------------------------------------------------------------------------------
 * @help
 * #============================================================================#
 * # Ed Engine FR - Custom Sell Prices                                          #
 * #============================================================================#                                                          
 * # Website: http://oldorenia.wordpress.com                                    #
 * # Last update: 11/16/16                                                      #
 * # Version: 1.1.1                                                             #
 * #============================================================================#
 * # This plugin allows you to set the default sell percentage of items, armor, #
 * # and weapons as well as setting their sell price individually using a note  #
 * # tag.                                                                       #
 * #----------------------------------------------------------------------------#
 * # Instructions:                                                              #
 * # You can modify the default sell value of all items by modifying the        #
 * # parameter "Sell Percentage" provided with this plugin. This value changes  #
 * # the sell value by multiplying the item's cost by the percent provided.     #
 * # Eg. An item's cost is 200, and the Sell Percentage is 25, its sell price   #
 * # would be 50.                                                               #
 * # The parameter "Bonus Variable" can be modified to set a variable that      #
 * # holds a bonus percentage that is added to all sell costs. So if the        #
 * # parameter is set to 5, the value of Game Variable 5 will be used as a      #
 * # percent bonus to all sell values.                                          #
 * #----------------------------------------------------------------------------#
 * # Item, Weapon, and Armor Note Tags:                                         #
 * # <Sell Price: X>                                                            #
 * # Replace X with an integer value. This value will be used as the selling    #
 * # price for the item, that is, the shop will pay you X amount when you sell  #
 * # the item.                                                                  #
 * # <Sell Percent: X>                                                          #
 * # Replace X with an integer value. This value will be used as the percentage #
 * # to determine this item's selling price, overriding the default percentage  #
 * # set in the plugin parameters. This means that you will get X% of the price #
 * # that you would usually purchase the item for.                              #
 * # <No Sell Bonus>                                                            #
 * # When this tag is placed into an item, weapon, or armor piece, the item     #
 * # will ignore any value bonuses provided by the Bonus Variable or the Plugin #
 * # Command CustomSellBonus added by this plugin.                              #
 * #                                                                            #
 * # Note: The <Sell Price: X> is prioritized over the <Sell Percent: X> note   #
 * # tag. Meaning if both exist in the same notebox, the <Sell Price: X> value  #
 * # will be used when selling and the <Sell Percent: X> will not.              #
 * #----------------------------------------------------------------------------#
 * # Plugin Commands:                                                           #
 * # CustomSellBonus +X%, -X%, or =X%                                           #
 * # This plugin command will modify the gold amount an item sells for by X%.   #
 * # When you use +X% it adds +X to the current modifier. When you use -X%, it  #
 * # subtracts X% from the current modifier. And when you use =X%, it sets the  #
 * # modifier to X%.                                                            #
 * # Example 1: "CustomSellBonus =20%" sets the modifier to 20%, so if an item  #
 * # sells for 100 gold without the bonus, it will now sell for 120 gold.       #
 * #----------------------------------------------------------------------------#
 * # Final Notes:                                                               #
 * # The reason for having the plugin command bonus and the variable bonus is   #
 * # permanance. The variable will be saved, while the plugin command bonus     #
 * # will be discarded when the game is closed, regardless of if you saved the  #
 * # game.                                                                      #
 * #----------------------------------------------------------------------------#
 * # Changelog                                                                  #
 * # Version 1.1.0, 11/11/16: Removal of MVCommons requirement, optimization    #
 * # compatibility and optimization fixes with YEP Shop Menu Core, new notetag  #
 * # <Sell Percent: X> added, new notetag <No Sell Bonus> added, plugin command #
 * # CustomSellBonus added, new plugin parameter Bonus Variable added.          #
 * # Version 1.0.0, 11/1/15: Plugin released!                                   #
 * #----------------------------------------------------------------------------#
 * # Compatibility Notes:                                                       #
 * # Overwrites: Scene_Item.prototype.sellingPrice                              #
 * # Reason: Reworks how the selling price is calculated.                       #
 * #============================================================================#                                                                 
 */
// #+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=#
// # You shouldn't edit stuff beyond this point unless you know what you're doing,#
// # cause if you do something wrong, you might break everything. Which is bad.   #
// # Unless you like breaking stuff, in which case by all means, edit away.       #
// #+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=#

//Set the "Imported" module up and set this Plugin to true.
var Imported = Imported || {};
Imported.EEFR_CustomSellPrices = true;
//Define the Ed Engine FR Module and all Sub-Modules
var EdEngineFR = EdEngineFR || {};
EdEngineFR.Config = EdEngineFR.Config || {};
EdEngineFR.Temp = EdEngineFR.Temp || {};
EdEngineFR.CustomSellPrices = {};


//Setup the plugin parameters.
EdEngineFR.Parameters = PluginManager.parameters('EEFR_CustomSellPrices');
EdEngineFR.Config.DefaultSellPercent = 
	Number(EdEngineFR.Parameters['Sell Percentage'] || 50);
EdEngineFR.Config.CSP_BonusVariable = 
	Number(EdEngineFR.Parameters['Bonus Variable'] || 0);

// Initialize the Temp values used in this plugin.
EdEngineFR.Temp.CSP_CommandBonus = 0;
	
	

/*
#=============================================================================#
#  EdEngineFR.CustomSellPrices                                                #
#-----------------------------------------------------------------------------#
#  New Method: *.getItemTags()                                                #
#=============================================================================#
*/
EdEngineFR.CustomSellPrices.getItemTags = function(item) {
	// Grab the note data and split it up on a per line basis.
	var notedata = item.note.split(/[\r\n]+/);
	// Check the values to be set and see if they exist. If not, initialize them.
	if (item.sellPrice == null) {
		item.sellPrice = undefined;
	}
	if (item.sellPercent == null) {
		item.sellPercent = undefined;
	}
	if (item.noSellBonus == null)
		item.noSellBonus = false;
	// Run a for loop on the notedata, checking each line for note tags.
    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
	    // Check the <Sell Price: X> note tag.
		if (line.match(/<(?:sell price): (\w+)>/i)) {
        item.sellPrice = parseInt(RegExp.$1);
		// Check the <Sell Percent: X> note tag.
      } else if (line.match(/<(?:sell percent|sell percentage): (\w+)>/i)) {
        item.sellPercent = parseInt(RegExp.$1);
      } else if (line.match(/<(?:no sell bonus)>/i)) {
		item.noSellBonus = true;
	  }
    }
};

/*
#=============================================================================#
#  Game_Interperater                                                          #
#-----------------------------------------------------------------------------#
#  Overwrite method: *.pluginCommand()                                        #
#=============================================================================#
*/
// Alias the original plugin commands for compatibility.
EdEngineFR.CustomSellPrices.pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	// Toss the original contents of the method back in here.
    EdEngineFR.CustomSellPrices.pluginCommand.call(this, command, args);
	// Plugin Command CustomSellBonus +/-/=X%
	if (command === 'CustomSellBonus') {
		// Check the format of the argument.
		if (args[0].match(/([+=-]?)(\d+)%?/)) {
			// If the format is +X%, add the value to the current bonus.
			if (RegExp.$1 === '+') {
				EdEngineFR.Temp.CSP_CommandBonus += Number(RegExp.$2);
			// If the format is -X%, subtract the value to the current bonus.
			} else if (RegExp.$1 === '-') {
				EdEngineFR.Temp.CSP_CommandBonus -= Number(RegExp.$2);
			// If the format is =X%, set the current bonus to the value given.
			} else if ((RegExp.$1 === '=') || (RegExp.$1 === '')) {
				EdEngineFR.Temp.CSP_CommandBonus = Number(RegExp.$2);
			}
		}
	}
	
};

/*
#=============================================================================#
#  EdEngineFR.CustomSellPrices                                                #
#-----------------------------------------------------------------------------#
#  New Method: *.getSellPrice()                                               #
#=============================================================================#
*/
EdEngineFR.CustomSellPrices.getSellPrice = function(item) {
	var priceTag = null;
	var sellPrice = null;
	//Yanfly Shop Core optimization. Its use of the same note-tag renders this method mostly un-needed.
	if (item.sellPrice != null) {
		return item.sellPrice;
	}
	//Yanfly Item Core individual items fail-safe.
	else if (Imported.YEP_ItemCore) {
		//Get the note tag value for the base items for all items and individual items.
		priceTag = EdEngineFR.CustomSellPrices.getItemTags(DataManager.getBaseItem(item));
	}
	//All other instances use this
	else {
		//Get the note tag value of any items, armor, and weapons.
		priceTag = EdEngineFR.CustomSellPrices.getItemTags(item);
	}
	//If the price note tag exists and provides the value, set the price to that.
	if (item.sellPrice != null) {
		sellPrice = item.sellPrice;
	}
	//If the sell percent note tag exists, determine the sellValue here.
	else if (item.sellPercent != null) {
		sellPrice = Math.floor((item.sellPercent / 100) * item.price);
	}
	//Set the price to return null if neither value exists.
	else {
		sellPrice = null;
	}
	return sellPrice;
};

/*
#=============================================================================#
#  EdEngineFR.CustomSellPrices                                                #
#-----------------------------------------------------------------------------#
#  New Method: *.applyBonusPercentages()                                      #
#=============================================================================#
*/

EdEngineFR.CustomSellPrices.applyBonusPercentages = function(sellPrice) {
	// First we initialize the variables use for this function.
	var gameVariableBonus = 0;
	var cmdBonus = 0;
	var tagBonus = 0;
	var bonus = 0;
	// Check if the bonus variable is used, if it's not, skip it.
	if (EdEngineFR.Config.CSP_BonusVariable != 0) {
		gameVariableBonus += $gameVariables.value(EdEngineFR.Config.CSP_BonusVariable);
	}
	// Check if the plugin command value has been modified. If not, skip it.
	if (EdEngineFR.Temp.CSP_CommandBonus != 0) {
		cmdBonus += EdEngineFR.Temp.CSP_CommandBonus;
	}
	// tagBonus += EdEngineFR.CustomSellPrices.bonusTagsCheck();
	bonus += Math.floor(((gameVariableBonus + cmdBonus + tagBonus) / 100) * sellPrice);
	return sellPrice + bonus;
};

/*
#=============================================================================#
#  Scene_Shop                                                                 #
#-----------------------------------------------------------------------------#
#  Overwriting: *.sellingPrice                                                #
#=============================================================================#
*/

EdEngineFR.CustomSellPrices.backupPriceCheck = Scene_Shop.prototype.sellingPrice;
Scene_Shop.prototype.sellingPrice = function() {
	// Check for a sell price note tag, and get the value inside it.
	var sellPrice = EdEngineFR.CustomSellPrices.getSellPrice(this._item);
	// If one exists use the price it contains.
	if (sellPrice != null) {
		if (!this._item.noSellBonus) {
			sellPrice = EdEngineFR.CustomSellPrices.applyBonusPercentages(sellPrice);
		}
		return sellPrice;
	}
	// If one does not exist, use the default percentage as defined in
	// the plugin parameters.
	else {
		var sellPercent = EdEngineFR.Config.DefaultSellPercent;
		sellPrice = Math.floor((sellPercent / 100) * this._item.price);
		if (!this._item.noSellBonus) {
			sellPrice = EdEngineFR.CustomSellPrices.applyBonusPercentages(sellPrice);
		}
		return sellPrice;
	}
};




