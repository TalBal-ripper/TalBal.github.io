//=============================================================================
//  Burning Orca Plugins
//  BO_CustomShopsXL.js
//  Version: 2.1
//=============================================================================
var Imported = Imported || {};
Imported.BO_ShopsXL = true;

var BurningOrca = BurningOrca || {};
BurningOrca.Shops = BurningOrca.Shops || {};

/*~struct~ShopGoodPrice:
 * 
 * @param Type
 * @type select
 * @option None
 * @value None
 * @option Currency
 * @value Currency
 * @option Variable
 * @value Variable
 * @option Item
 * @value Item
 * @desc Determines the type of Id field of the custom price.
 * @default None
 * 
 * @param Id
 * @type number
 * @min 0
 * @desc Currency, Variable or Item Id. Currency 0 means gold. Custom currency description can be found in the help file.
 * @default 0
 * 
 * @param Amount
 * @type number
 * @min 0
 * @desc The custom price of the shop good. Keep 0 for variables to draw the amount from that variable.
 * @default 0
 */

/*~struct~SpecialGoodPrice:
 * 
 * @param Type
 * @type select
 * @option Currency
 * @value Currency
 * @option Variable
 * @value Variable
 * @option Item
 * @value Item
 * @desc Determines the type of Id field of the custom price.
 * @default Currency
 * 
 * @param Id
 * @type number
 * @min 0
 * @desc Currency, Variable or Item Id. Currency 0 means gold. Custom currency description can be found in the help file.
 * @default 0
 * 
 * @param Amount
 * @type number
 * @min 0
 * @desc The custom price of the shop good. Keep 0 for variables to draw the amount from that variable.
 * @default 0
 */

/*~struct~BuyGoodItem:
 * 
 * @param Item
 * @type item
 * @desc An item that can be bought from the shop.
 * @default 1
 * 
 * @param Custom Price
 * @type struct<ShopGoodPrice>
 * @desc The custom buying price of the shop good.
 * @default {"Type":"None","Id":"0","Amount":"0"}
 * 
 * @param Custom Selling Price
 * @type struct<ShopGoodPrice>
 * @desc The Custom Selling Price of the shop good.
 * @default {"Type":"None","Id":"0","Amount":"0"}
 * 
 * @param StockQuantityType
 * @text Type of stock quantity
 * @type select
 * @option Amount
 * @value Amount
 * @option Variable
 * @value Variable
 * @desc Choose whether the stock quantity is a number or the id of a variable storing the stock quantity.
 * @default Amount
 * 
 * @param StockQuantity
 * @text Stock Quantity
 * @type number
 * @min 0
 * @max 5000
 * @desc Maximum number of items of this kind that can be bought from the shop. Use 0 for endless stock.
 * @default 0
 * 
 * @param AvailabilityCond
 * @text Availability condition
 * @type note
 * @default true
 * @desc Enter any kind of javascript code here, that evaluates to a true/false to set the goods availability.
 */

/*~struct~BuyGoodWeapon:
 * 
 * @param Weapon
 * @type weapon
 * @desc A weapon that can be bought from the shop.
 * @default 1
 * 
 * @param Custom Price
 * @type struct<ShopGoodPrice>
 * @desc The custom buying price of the shop good.
 * @default {"Type":"None","Id":"0","Amount":"0"}
 * 
 * @param Custom Selling Price
 * @type struct<ShopGoodPrice>
 * @desc The Custom Selling Price of the shop good.
 * @default {"Type":"None","Id":"0","Amount":"0"}
 * 
 * @param StockQuantityType
 * @text Type of stock quantity
 * @type select
 * @option Amount
 * @value Amount
 * @option Variable
 * @value Variable
 * @desc Choose whether the stock quantity is a number or the id of a variable storing the stock quantity.
 * @default Amount
 * 
 * @param StockQuantity
 * @text Stock Quantity
 * @type number
 * @min 0
 * @max 99
 * @desc Maximum number of items of this kind that can be bought from the shop. Use 0 for endless stock.
 * @default 0
 * 
 * @param AvailabilityCond
 * @text Availability condition
 * @type note
 * @default true
 * @desc Enter any kind of javascript code here, that evaluates to a true/false to set the goods availability.
 */

/*~struct~BuyGoodArmor:
 * 
 * @param Armor
 * @type armor
 * @desc An armor that can be bought from the shop.
 * @default 1
 * 
 * @param Custom Price
 * @type struct<ShopGoodPrice>
 * @desc The custom buying price of the shop good.
 * @default {"Type":"None","Id":"0","Amount":"0"}
 * 
 * @param Custom Selling Price
 * @type struct<ShopGoodPrice>
 * @desc The Custom Selling Price of the shop good.
 * @default {"Type":"None","Id":"0","Amount":"0"}
 * 
 * @param StockQuantityType
 * @text Type of stock quantity
 * @type select
 * @option Amount
 * @value Amount
 * @option Variable
 * @value Variable
 * @desc Choose whether the stock quantity is a number or the id of a variable storing the stock quantity.
 * @default Amount
 * 
 * @param StockQuantity
 * @text Stock Quantity
 * @type number
 * @min 0
 * @max 99
 * @desc Maximum number of items of this kind that can be bought from the shop. Use 0 for endless stock.
 * @default 0
 * 
 * @param AvailabilityCond
 * @text Availability condition
 * @type note
 * @default true
 * @desc Enter any kind of javascript code here, that evaluates to a true/false to set the goods availability.
 */

/*~struct~BuyGoodSwitch:
 * 
 * @param Switch
 * @type switch
 * @desc A switch that can be bought from the shop.
 * @default 1
 * 
 * @param DisplayText
 * @text Display Text
 * @type text
 * @desc Here you can enter a different name to be displayed in shop for the switch. Keep blank to use the switches name.
 * 
 * @param Custom Price
 * @type struct<SpecialGoodPrice>
 * @desc The custom buying price of the shop good.
 * @default {"Type":"Currency","Id":"0","Amount":"0"}
 * 
 * @param Toggable
 * @type boolean
 * @desc Determines whether this switch can be toggled on/off after being bought
 * @default true
 * 
 * @param OnColor
 * @type text
 * @default #FFFFFF
 * @desc The color in which the switch should be displayed in the shop if turned on once purchased.
 * 
 * @param OffColor
 * @type text
 * @default #FFFFFF
 * @desc The color in which the switch should be displayed in the shop if turned off once purchased.
 * 
 * @param AvailabilityCond
 * @text Availability condition
 * @type note
 * @default true
 * @desc Enter any kind of javascript code here, that evaluates to a true/false to set the goods availability.
 */

/*~struct~BuyGoodCurrency:
 * 
 * @param Currency
 * @type number
 * @min 0
 * @desc The currency that can be bought from the shop. Use 0 for gold. Custom currency description can be found in the help file.
 * @default 0
 * 
 * @param Custom Price
 * @type struct<SpecialGoodPrice>
 * @desc The custom buying price of the shop good.
 * @default {"Type":"Currency","Id":"0","Amount":"0"}
 * 
 * @param AvailabilityCond
 * @text Availability condition
 * @type note
 * @default true
 * @desc Enter any kind of javascript code here, that evaluates to a true/false to set the goods availability.
 */

/*~struct~BuyableGoods:
 * @param Items
 * @type struct<BuyGoodItem>[]
 * @desc Collection of items that can be bought from this shop.
 * @default []
 * 
 * @param Weapons
 * @type struct<BuyGoodWeapon>[]
 * @desc Collection of weapons that can be bought from this shop.
 * @default []
 * 
 * @param Armor
 * @type struct<BuyGoodArmor>[]
 * @desc Collection of armors that can be bought from this shop.
 * @default []
 * 
 * @param Switches
 * @type struct<BuyGoodSwitch>[]
 * @desc Collection of switches that can be bought from this shop.
 * @default []
 * 
 * @param Currencies
 * @type struct<BuyGoodCurrency>[]
 * @desc Collection of currencies that can be bought from this shop.
 * @default []
 * 
 */

/*~struct~SellGoodItem:
 * 
 * @param Item
 * @type item
 * @desc An item that can be sold to the shop.
 * @default 1
 *
 * @param Custom Selling Price
 * @type struct<ShopGoodPrice>
 * @desc The Custom Selling Price of the shop good. No need to set if already done in buyable items.
 * @default {"Type":"None","Id":"0","Amount":"0"}
 */

/*~struct~SellGoodWeapon:
 * 
 * @param Weapon
 * @type weapon
 * @desc A weapon that can be sold to the shop.
 * @default 1
 *
 * @param Custom Selling Price
 * @type struct<ShopGoodPrice>
 * @desc The Custom Selling Price of the shop good. No need to set if already done in buyable weapons.
 * @default {"Type":"None","Id":"0","Amount":"0"}
 */

/*~struct~SellGoodArmor:
 * 
 * @param Armor
 * @type armor
 * @desc An armor that can be sold to the shop.
 * @default 1
 *
 * @param Custom Selling Price
 * @type struct<ShopGoodPrice>
 * @desc The Custom Selling Price of the shop good. No need to set if already done in buyable armor.
 * @default {"Type":"None","Id":"0","Amount":"0"}
 */

/*~struct~SellableGoods:
 * @param Items
 * @type struct<SellGoodItem>[]
 * @desc Collection of items.
 * @default []
 * @desc The items that can be sold to the shop
 * 
 * @param Weapons
 * @type struct<SellGoodWeapon>[]
 * @desc Collection of weapons.
 * @default []
 * @desc The weapons that can be sold to the shop
 * 
 * @param Armor
 * @type struct<SellGoodArmor>[]
 * @desc Collection of armors.
 * @default []
 * @desc The armor that can be sold to the shop
 */

/*~struct~Discount:
 * @param Condition
 * @type note
 * @desc Condition that must be fulfilled for the discount to be granted
 * @default true
 * 
 * @param Percentage
 * @type number
 * @min 0
 * @max 100
 * @desc Discount percentage granted
 * @default 0
 */

/*~struct~Shop:
 * @param Name
 * @type text
 * @desc The name of the shop.
 * 
 * @param ShopType
 * @text Shop Type
 * @type select
 * @option Sell and Buy
 * @value Sell And Buy
 * @option Buy Only
 * @value Buy Only
 * @option Sell Only
 * @value Sell Only
 * @option Trade
 * @value Trade
 * @desc The kind of shop.
 * @default Sell And Buy
 * 
 * @param Buyable Goods
 * @type struct<BuyableGoods>
 * @default {"Items":"[]", "Weapons":"[]", "Armor":"[]", "Switches":"[]", "Currencies":"[]"}
 * @desc The goods that can be bought from the shop
 * 
 * @param SellableGoodsEqualBuyableGoods
 * @text Accept only goods that can be bought
 * @type boolean
 * @on Yes
 * @off No
 * @default false
 * @desc Set whether the shop only let's you sell goods to the shop, which you can also buy from the shop.
 * 
 * @param Sellable Goods
 * @type struct<SellableGoods>
 * @default {"Items":"[]", "Weapons":"[]", "Armor":"[]"}
 * @desc The goods that can additionally be sold to the shop. Keep empty to enable all goods depending on the prev. parameter.
 * 
 * @param StockRefillOption
 * @text Stock refill option
 * @type select
 * @option Never
 * @value Never
 * @option After time
 * @value After time
 * @option Custom
 * @value Custom
 * @desc Option to determine when the shop refills it's stock.
 * @default Never
 * 
 * @param StockRefillSeconds
 * @text Stock refill seconds
 * @type number
 * @default 7200
 * @desc Amount of seconds after the shop refills it's stock. Used when option is 'After time'.
 * 
 * @param RefillStockCond
 * @text Stock refill condition
 * @type note
 * @desc Javascript code that determines when the stock should be refilled when option is 'Custom'.
 * @default false
 * 
 * @param StockRefillType
 * @text Stock Refill Type
 * @type select
 * @option Fill up stock
 * @value Fill up stock
 * @option Add additional stock
 * @desc Determines how the stock is refilled. Fill up fills to maximum, otherwise maximum as added to current stock.
 * @default Fill up stock
 * 
 * @param Discounts
 * @type struct<Discount>[]
 * @desc Define the discounts that are offered by the shop here.
 * @default []
 */

//=============================================================================
/*:
 * @plugindesc v2.0 Various functionality around shops (Extra Large Version). Define custom shops
 * via the plugin parameters.
 * @author BurningOrca 
 * 
 * @param Shops
 * @type struct<Shop>[]
 * 
 * @param StockQuantityText
 * @text Stock Quantity Text
 * @type text
 * @desc The text to be shown on the shop buy number input window for the stock quantity
 * @default Available Items:
 * 
 * @param InfinityText
 * @text Infinity Text
 * @type text
 * @desc Text that should be disabled for infinite amount of available stock items
 * @default ∞
 * 
 * @param SoldOutText
 * @text Sold out text
 * @type text
 * @desc Text to be displayed in the shops helpwindow, when it is completely sold out
 * @default Sold out
 * 
 * @param SwitchOnText
 * @text Switch on text
 * @type text
 * @default On
 * @desc The text to be displayed for a switch that is set to on
 * 
 * @param SwitchOffText
 * @text Switch off text
 * @type text
 * @default Off
 * @desc The text to be displayed for a switch that is set to off
 * 
 * @param DisplaySoldOutItems
 * @text Display sold out items in shop
 * @type boolean
 * @on Yes
 * @off No
 * @default true
 * 
 * @param GoldIcon
 * @text Gold Icon
 * @type number
 * @min 0
 * @default 313
 * @desc The icon that should be used by this plugin in for the gold currency. If 0 Yanfly's gold icon may be used as default.
 * 
 * @param Item Name Format
 * @type string
 * @desc Sets the item name format for the buy window. %1 is the name, %2 is the stock quantity.
 * @default %1(%2)
 * 
 * @param GroupItemsWithLimitedStock
 * @text Group Items with limited stock
 * @type boolean
 * @on Yes
 * @off No
 * @desc If set to no, the items sold in the shop are independent items (Requires YEP_ItemCore).
 * @default true
 * 
 * @param ShowInfiniteQuantityInBuyWindow
 * @text Show infinite stock in buy window
 * @type boolean
 * @on Yes
 * @off No
 * @desc Switch whether an item with infinite stock will show the stock quantity in the buy window. Switches and currency never show them.
 * @default true
 * 
 * @param UseYanflyEquipCommand
 * @text Use Equip Command in shop (requires YEP_ShopMenuCore)
 * @type boolean
 * @on Yes
 * @off No
 * @desc Set whether the equip command from YEP_ShopMenuCore plugin should be used by the custom shops
 *       from this plugin.
 * @default true
 * 
 * @param UseNPCDialogueShopEventCommand
 * @text Use Event Command in shop (requires NPCDialogueShop)
 * @type boolean
 * @on Yes
 * @off No
 * @desc Set whether the event command from NPCDialogueShop plugin should be used by the custom shops
 *       from this plugin.
 * @default true
 * 
 * @param StockQuantityDisplayType
 * @text Stock Quantity Display Type
 * @type select
 * @option Current Stock
 * @value Current Stock
 * @option Current Stock - Amount to be bought
 * @value Current Stock - Amount to be bought
 * @default Current Stock - Amount to be bought
 * @desc Determines what is shown as the stock quantity on the number window
 * 
 * @help
 * =============================================================================================================
 * Introduction
 * =============================================================================================================
 * This plugin allows you to define customized shops directly in the plugin parameters. These shops have
 * a bunch of advantages over regular shops, such as having limited stock and so on.
 * 
 * Important note:
 * This is a extended version of BO_CustomShops, but is not compatible with a save file that already used
 * BO_CustomShops. BO_CustomShopsXL also looses compatibility to YEP_MoreCurrencies and YEP_ConditionalShopPrices
 * as it does the more currencies thing itself, even it is inferior to Yanfly's version. With the introduction
 * of own more currencies it was also a bit of a problem to support conditional shop prices.
 * 
 * =============================================================================================================
 * Plugin Position
 * =============================================================================================================
 * Places this under almost every other shop plugin you are using.
 * 
 * =============================================================================================================
 * Compatibility
 * =============================================================================================================
 * These are the plugin compatibilities I know of:
 * - YEP_ItemCore
 * - YEP_ShopMenuCore
 * - NPCDialogueShop
 * 
 * =============================================================================================================
 * The plugin parameters
 * =============================================================================================================
 * 
 * Shops have the following attributes:
 * - Name: Name of the shop used to access the shop with the plugin commands.
 * - Shop Type: The type of the shop:
 *          o Buy and sell: You can buy items from the shop and can sell items to the shop.
 *          o Buy only:     You can only buy items from this shop.
 *          o Sell only:    You can only sell items to this shop.
 *          o Trade:        Like a buy only shop, with the addition, that the number window is allowed
 *                          to go negative. It's like a combines buy and sell window with the exception,
 *                          that the buying and selling price are equal.
 * - Buyable Goods: The goods that can be bought at the shop. It consists of:
 *          o Items:        An array of items that can be bought at the shop.
 *          o Weapons:      An array of weapons that can be bought at the shop.
 *          o Armor:        An array of armor that can be bought at the shop.
 *          o Switches:     An array of switches, that can be bought at the shop. And activate/deactivated at the shop.
 *          o Currencies:   An array of currencies, that can be bought at shop. For more details
 *                          about currencies have look further down in the help file.
 *                          
 *  - Accept only goods that can be bought: Boolean value to indicate whether all goods, that can be bought from this shop,
 *                                          should be added to the restrictive array of goods, that can be sold to the shop.
 *                                    
 *  - Sellable Goods: You can restrict the goods, that can be sold to the shop, by adding items, weapons and armor
 *                    to this collection. If the previous parameter is set to true all buyable goods except switches
 *                    and currencies are automatically added to this collection. If this collection is empty all goods
 *                    can be sold to the shop. This hasn't any effects on Trade Shops.
 *                    
 *   - Stock refill option: Option to determine when the shop refills it's stock. It can have the following values:
 *           o Never (default): Stock will never be refilled automatically. You can trigger refill with the plugin commands
 *                              described further down in the help file.
 *           o After time:      Stock will be refilled after the amount of seconds defined in the parameter "Stock refill seconds"
 *                              of playtime are passed.
 *           o Custom:          Stock will be refilled if the javascript code entered in the parameter "Stock refill condition"
 *                              evaluates to true.
 *                              
 *   - Stock Refill Type: Determines how the shop refills it's stock. It can have the following values:
 *           o Fill up stock:        The shop fills up the stock quantity of the available items until they are back at the maximum
 *                                   defined in the plugin parameters of the individual shop goods. Please note: Trade shops actually
 *                                   allow you to increase the available stock over the maximum by trading the items to the shop. However
 *                                   after a stock refill, it will be back at the maximum again. The additional stock may have been rotten
 *                                   or whatever. This is also the behaviour of the regular BO_CustomShops.
 *           o Add additional stock: The maximum stock defined in the plugin parameters of the invidual shop goods is added to the quantity,
 *                                   that is still available in the stock of the shop.
 *                                   
 *   - Discounts: The discounts the shop has to offer under certain conditions.
 *   
 *  Each item/weapon/armor, that can be bought from the shop has the following attributes:
 *    - Item/Weapon/Armor:      The id of the item in the database
 *    - Custom Price:           Custom buying price, that is specific for this shop. It has the following attributes:
 *
 *             o Type:  The type of custom price, with the following configurations:
 *
 *                      x None (default):   This shop good doesn't have a custom price.
 *                      x Currencies:       The custom price is a currency.
 *                      x Variable:         The custom price is depending on a variable.
 *                      x Item:             The custom price is an item. Independ items cannot be used here.
 *
 *             o Id:     The id of the currency, variable or item depending on the setting of the previous parameter.
 *             o Amount: The amount that has to be paid in order to optain the item. If this is 0 and the Type is set to
 *                       "Variable", then the amount will be taken from this variable. If this is non-zero and Type is set
 *                       to "Variable" the value of the variable must be greater or equal to this amount for the good to
 *                       be able to be bought.
 *
 *    - Custom Selling Price:   Selling price that is specific for this shop. It has the exact same configurations as the buying price.
 *    - Type of stock quantity: Here you can set whether the stock quantity is an amount or a variable id containing the amount.
 *    - Stock quantity:         The maximum amount of stock available at the shop or a variable id containing the maximum amount available at the shop.
 *    - Availability condition: Enter javascript code to determine whether this shop good is currently available in the shop.
 *    
 *  Currencies have almost the same plugin parameters. Except they don't have a selling price as they can never be sold and no stock quantity as
 *  it is always set to endless.
 *  
 *  Switches have the following attributes and always a stock quantity of 1:
 *    -  Switch:                 The id of the switch to be bought.
 *    -  Display Text:           A text that should be displayed for the switch in the shop instead of the switches database name.
 *    -  Custom Price:           Same as for items/weapons/armor.
 *    -  Toggable:               Boolean value. If set to false, switch will always be on after having been bought. Otherwise it can
 *                               be toggled on/off at the shop.
 *    -  OnColor:                The color in which the switch should be displayed in the shop if turned on once purchased.
 *    -  OffColor:               The color in which the switch should be displayed in the shop if turned off once purchased.
 *    -  Availability condition: Same as for items/weapons/armor.
 *    
 *  Discounts lower the prices of the available goods under certain conditions. Each discount has the following attributes:
 *    - Condition:               The condition that must be met for the discount to be offered.
 *    - Percentage:              The percentage of the original price granted as discount.
 *                               Discount percentages stack. They are multiplied with each other, e.g.
 *                               if the conditions for granting 10% and another 20% are met, the user pays
 *                               not 70%, but 72% of the original price, because the 20% are calculated on
 *                               the already by 10% reduced price. The new price is rounded down.
 *                               
 *  Each shop keeps track of how many items have been bought from it, sold to it and how often it has been visited. These attributes
 *  can be used for various conditons. They can be accessed e.g. like that:
 *         $gameShops["ShopName"]._nrOfVisits:           The number of items the shop has been visited. 
 *         $gameShops["ShopName"]._itemsBought[2]:       The number of the item with id 2, that have been bought at the shop.
 *                                                       Please note: Independend shop goods are not tracked with their base item id,
 *                                                       here. Same goes for _weaponsBought and _armorBought.
 *         $gameShops["ShopName"]._currencyBought[0]:    The amount of gold, that has been bought from the shop.
 *         $gameShops["ShopName"]._itemsSold[3]:         The number of the item with id 3, that has been sold to the shop.
 *                                                       Please note: Independend items are not tracked with their base item id.
 *                                                       Same goes for _weaponsSold and _armorSold.
 *         $gameShops["ShopName"]._totalShopGoodsBought: The total amount of shop goods, that have been bought from the shop.
 *                                                       Trading goods to the shop doesn't decrease this value.
 *       
 *  The further plugin parameters should have good explainations on their functionality. This is way I won't repeat them here.
 *  
 * =============================================================================================================
 * Note tags
 * =============================================================================================================
 * Items/Weapons/Armor may have the following note tags to set custom buying and selling prices that cound globally
 * for all shops:
 *      <CustomBuyPrice:[Type],[Id],[Amount]/>:        Sets the buying price for this item/weapon/armor globally.
 *      <CustomSellingPrice:[Type],[Id],[Amount]/>     Sets the selling price for this item/weapon/armor globally.
 *      
 *      Examples:
 *      <CustomBuyPrice:Currency,0,1000/>
 *      <CustomSellingPrice:Item,2,30/>
 *      
 * =============================================================================================================
 * Currencies
 * =============================================================================================================
 * This plugin has it's own implementation of more currencies. It is inferior to YEP_X_MoreCurrencies in the way,
 * that it only allows 1 kind of a currency per item/weapon/armor instead of multiple. It also technically can only
 * use gold, items and variables as currencies, but not weapons and armor.
 * But you can get around the limitation of having only gold, items and variables available by creating your own
 * extension plugins, that push further objects into the BurningOrca.Shops.Currencies Array.
 * Each object must provide the following functions:
 *      name:  Must return the text of the currency unit to be displayed in case icon = 0.
 *      icon:  Must return the icon id to display for the currency. Use 0 to use the currency name instead.
 *      get:   Must return the current amount of this currency available to the party.
 *      gain:  Function that receives an amount with which the available currency of the party will be increased.
 *      loose: Function that receives an amount with which the available currency of the party will be decreased.
 *      max:   The maximum amount the party can have of this currency.
 *      
 * With this plugin the array will contain only a single currency, which is gold and has id 0 whever Currency can
 * be used within the plugin parameters of this plugin.
 * 
 * Example for an extension:
 * BurningOrca.Shops.Currencies.push({ name:() => $dataWeapons[2].name, 
 *                                     icon:() => $dataWeapons[2].icon, 
 *                                     get:() => $gameParty.numItems($dataWeapons[2]), 
 *                                     gain:(amt) => $gameParty.gainItem($dataWeapons[2], amt, true), 
 *                                     loose:(amt) => $gameParty.gainItem($dataWeapons[2], -amt, true), 
 *                                     max:() => $gameParty.maxItems($dataWeapons[2])
 *                                   });
 *                                     
 * With this you can for example use Weapon Number 2 with Currency Id 1 as a currency.
 * Please note: Independend items/weapons/armor may still not be useable as a currency.
 * 
 * Be creative, use whatever you want as a currency. You just have to remember the order, where 0 is gold and 1 upto N
 * are your custom currencies.
 * 
 * ============================================================================
 * Plugin commands
 * ============================================================================
 * - OpenShop <ShopName>:                        Opens the shop processing scene for the shop with the specified name,
 *                                               e.g. OpenShop Groceries. Shop names may contain white space.
 * - CloseShop <Shopname>:                       Will remove the specified shop from the available shops.
 *                                               You do not need to use this command after using OpenShop.
 * - Refill<Kind>Stock "<Name>" <Id> <Quantity>: Refills the stock of a single shop good of
 *                                               the given kind, by the given quantity, but
 *                                               does not exceed the maximum if the refill option is set to "Fill up stock". 
 *                                               Does not work if independend items are not grouped together,
 *                                               e.g. RefillItemStock "Groceries" 2 1 will refill the stock quantity of
 *                                               item 2 in shop "Groceries" by 1.
 * - RefillShopStock <Name>:                     Refills the entire stock of the shop with the given name,
 *                                               e.g. RefillShopStock Groceries.
 * 
 * ============================================================================
 * Additional features
 * ============================================================================
 * - You can press page up and page down in the numbers window to change the amount by a 100.
 * - The information whether a switch has been bought is now stored in $gameShops._switchBought, so every shops
 *   that sells the same switch as another one, now knows if it has already been bought.
 * - If you setup two times the same item in one shop, it is now not combined in stock quantity anymore, but
 *   is treated as two seperate lines in the buy window. This means you do not need two identical items
 *   or Yanfly's proxy buy items in the database anymore to have two lines with different prices. However
 *   the two lines don't share their stock quantity. Each of them has it's individual stock quantity.
 *   
 * ============================================================================
 * Compatible MV Versions
 * ============================================================================
 * Developed using MV 1.6.2. Requires ES6 syntax. So any RPG Maker MV Version
 * that supports it can be used, although I recommend 1.6.2.
 * 
 * ============================================================================
 * History
 * ============================================================================
 * 1.0 First version.
 * 2.0 Removed some bugs. Reworked plugin code to be simpler, but have same functionality.
 * 2.1 Fixed Bugs in Sell Menu
 * 
 * ============================================================================
 * Terms of use
 * ============================================================================
 *    - Free to use for non-commercial and commercial use.
 *    - You do not need to credit me.
 */

BurningOrca.Shops.Parameters = PluginManager.parameters('BO_CustomShopsXL');
BurningOrca.Shops.StockQuantityText = BurningOrca.Shops.Parameters['StockQuantityText'];
BurningOrca.Shops.InfinityText = BurningOrca.Shops.Parameters['InfinityText'];
BurningOrca.Shops.SoldOutText = BurningOrca.Shops.Parameters['SoldOutText'];
BurningOrca.Shops.SwitchOnText = BurningOrca.Shops.Parameters['SwitchOnText'];
BurningOrca.Shops.SwitchOffText = BurningOrca.Shops.Parameters['SwitchOffText'];
BurningOrca.Shops.DisplaySoldOutItems = BurningOrca.Shops.Parameters['DisplaySoldOutItems'];
BurningOrca.Shops.DisplaySoldOutItems = eval(BurningOrca.Shops.DisplaySoldOutItems);
BurningOrca.Shops.GroupItemsWithLimitedStock = BurningOrca.Shops.Parameters['GroupItemsWithLimitedStock'];
BurningOrca.Shops.UseYanflyEquipCommand = eval(BurningOrca.Shops.Parameters['UseYanflyEquipCommand']);
BurningOrca.Shops.UseNPCDialogueShopEventCommand = eval(BurningOrca.Shops.Parameters['UseNPCDialogueShopEventCommand']);
BurningOrca.Shops.GroupItemsWithLimitedStock = eval(BurningOrca.Shops.GroupItemsWithLimitedStock);
BurningOrca.Shops.GoldIcon = Number(BurningOrca.Shops.Parameters['GoldIcon']);
BurningOrca.Shops.ItemNameFormat = BurningOrca.Shops.Parameters['Item Name Format'];
BurningOrca.Shops.ShowInfiniteQuantityInBuyWindow = BurningOrca.Shops.Parameters['ShowInfiniteQuantityInBuyWindow'];
BurningOrca.Shops.ShowInfiniteQuantityInBuyWindow = eval(BurningOrca.Shops.Parameters['ShowInfiniteQuantityInBuyWindow']);
BurningOrca.Shops.StockQuantityDisplayType = BurningOrca.Shops.Parameters['StockQuantityDisplayType'];

if( BurningOrca.Shops.GoldIcon === 0 && Imported.YEP_CoreEngine && Yanfly.Icon.Gold !== undefined )
{
    BurningOrca.Shops.GoldIcon = Yanfly.Icon.Gold;
}

$dataShops = null;
$gameShops = null;

BurningOrca.Shops.Currencies = [{ name:() => TextManager.currencyUnit, icon:() => BurningOrca.Shops.GoldIcon, get:() => $gameParty.gold(), gain: (amt) => $gameParty.gainGold(amt), loose: (amt) => $gameParty.loseGold(amt), max:() => $gameParty.maxGold()}];

//////////////////////////////////////////////////////////////////////////////////
// DataManager
//////////////////////////////////////////////////////////////////////////////////
/////////Edited by Chlor/////////
BurningOrca.Shops.isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function()
{
    if( !BurningOrca.Shops.isDatabaseLoaded.call(this) ) return false;
    if( !$dataShops)
    {
        $dataShops = new Data_Shops();
        for( let d of [$dataItems, $dataWeapons, $dataArmors] )
        {
            for( let i of d )
            {
                if( i && i.note.match(/<CustomBuyPrice:\s*(.*),\s*(\d+),\s*(\d+)\/>/i) )
                {
                    i.CustomPrice = {"Type":RegExp.$1, "Id":Number(RegExp.$2), "Amount":Number(RegExp.$3)};
                }
                if( i && i.note.match(/<CustomSellingPrice:\s*(.*),\s*(\d+),\s*(\d+)\/>/i) )
                {
                    i.CustomSellingPrice = {"Type":RegExp.$1, "Id":Number(RegExp.$2), "Amount":Number(RegExp.$3)};
                }
            }
        }
    }
    return true;
};

BurningOrca.Shops.createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() 
{
    BurningOrca.Shops.createGameObjects.call(this);
    $gameShops = new Game_Shops();
};

BurningOrca.Shops.makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() 
{
    var contents = BurningOrca.Shops.makeSaveContents.call(this);
    contents.gameShops = $gameShops ? $gameShops.getSaveData() : {};
    return contents;
};

BurningOrca.Shops.extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) 
{
    BurningOrca.Shops.extractSaveContents.call(this, contents);
    $gameShops = new Game_Shops();

    if( contents.gameShops )
    {
        $gameShops.applySaveData(contents.gameShops);
    }
};
/////////Edited by Chlor/////////

///////////////////////////////////////////////////////////////////////////////////
// Data_Shops
///////////////////////////////////////////////////////////////////////////////////
class Data_Shops extends Object
{
    constructor()
    {
        super();
        let shops = BurningOrca.Shops.Parameters["Shops"];
        if( shops !== undefined && shops !== "" )
        {
            shops = JSON.parse(shops);

            for( let i = 0; i < shops.length; i++ )
            {
                let paramShop = JSON.parse(shops[i]);
                this[paramShop.Name] = new Data_Shop(paramShop);
            }
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////
// Data_Shop
///////////////////////////////////////////////////////////////////////////////////
class Data_Shop extends Object
{
    constructor(paramShop)
    {
        super();
        this.Name = paramShop.Name;
        this.ShopType = paramShop.ShopType;
        this.StockRefillOption = paramShop.StockRefillOption;
        this.StockRefillSeconds = Number(paramShop.StockRefillSeconds);
        this.RefillStockCond = JSON.parse(paramShop.RefillStockCond);
        this.StockRefillType = paramShop.StockRefillType;

        this._allBuyableGoods = [];
        this._allSellableGoods = [];

        let buyableGoods = JSON.parse(paramShop["Buyable Goods"]);

        if( buyableGoods.Items !== "" )
        {
            let goods = JSON.parse(buyableGoods.Items);
            for( let i = 0; i < goods.length; i++ )
            {
                let item = JSON.parse(goods[i]);
                this._allBuyableGoods.push(new Data_ShopGood(item, 'Item'));
            }
        }
        if( buyableGoods.Weapons !== "" )
        {
            let goods = JSON.parse(buyableGoods.Weapons);
            for( let i = 0; i < goods.length; i++ )
            {
                let item = JSON.parse(goods[i]);
                this._allBuyableGoods.push(new Data_ShopGood(item, 'Weapon'));
            }
        }
        if( buyableGoods.Armor !== "" )
        {
            let goods = JSON.parse(buyableGoods.Armor);
            for( let i = 0; i < goods.length; i++ )
            {
                let item = JSON.parse(goods[i]);
                this._allBuyableGoods.push(new Data_ShopGood(item, 'Armor'));
            }
        }
        if( buyableGoods.Switches !== "" )
        {
            let goods = JSON.parse(buyableGoods.Switches);
            for( let i = 0; i < goods.length; i++ )
            {
                let item = JSON.parse(goods[i]);
                this._allBuyableGoods.push(new Data_ShopGood(item, 'Switch'));
            }
        }

        if( buyableGoods.Currencies !== "" )
        {
            let goods = JSON.parse(buyableGoods.Currencies);
            for( let i = 0; i < goods.length; i++ )
            {
                let item = JSON.parse(goods[i]);
                this._allBuyableGoods.push(new Data_ShopGood(item, 'Currency'));
            }
        }

        if( eval(paramShop.SellableGoodsEqualBuyableGoods) )
        {
            for( let i = 0; i < this._allBuyableGoods.length; i++ )
            {
                if( this._allBuyableGoods[i].kind !== "Switch" && this._allBuyableGoods[i].kind !== "Currency" )
                {
                    let matchingGoods = this._allSellableGoods.filter((good) => good.kind == this._allBuyableGoods[i].kind && good.id == this._allBuyableGoods[i].id);
                    if( matchingGoods.length == 0 )
                    {
                        this._allSellableGoods.push(new Data_SellGood(this._allBuyableGoods[i].kind, Number(this._allBuyableGoods[i].id), this._allBuyableGoods[i].SellingPrice));
                    }
                }
            }
        }

        let sellableGoods = JSON.parse(paramShop["Sellable Goods"]);
        if( sellableGoods.Items !== "" )
        {
            let goods = JSON.parse(sellableGoods.Items);
            for( let i = 0; i < goods.length; i++ )
            {
                let item = JSON.parse(goods[i]);
                let customPrice = JSON.parse(item['Custom Selling Price']);

                let matchingGoods = this._allSellableGoods.filter((good) => good.kind == 'Item' && good.id == item.Item);
                if( matchingGoods.length == 1 )
                {
                    if( customPrice.Type !== "None" )
                    {
                        matchingGoods[0].SetSellingPrice(customPrice);
                    }
                }
                else
                {
                    this._allSellableGoods.push(new Data_SellGood('Item',item.Item, customPrice));
                }
            }
        }
        if( sellableGoods.Weapons !== "" )
        {
            let goods = JSON.parse(sellableGoods.Weapons);
            for( let i = 0; i < goods.length; i++ )
            {
                let item = JSON.parse(goods[i]);
                let customPrice = JSON.parse(item['Custom Selling Price']);

                let matchingGoods = this._allSellableGoods.filter((good) => good.kind == 'Weapon' && good.id == item.Weapon);
                if( matchingGoods.length == 1 )
                {
                    if( customPrice.Type !== "None" )
                    {
                        matchingGoods[0].SetSellingPrice(customPrice);
                    }
                }
                else
                {
                    this._allSellableGoods.push(new Data_SellGood('Weapon',item.Weapon, customPrice));
                }
            }
        }
        if( sellableGoods.Armor !== "" )
        {
            let goods = JSON.parse(sellableGoods.Armor);
            for( let i = 0; i < goods.length; i++ )
            {
                let item = JSON.parse(goods[i]);
                let customPrice = JSON.parse(item['Custom Selling Price']);

                let matchingGoods = this._allSellableGoods.filter((good) => good.kind == 'Armor' && good.id == item.Armor);
                if( matchingGoods.length == 1 )
                {
                    if( customPrice.Type !== "None" )
                    {
                        matchingGoods[0].SetSellingPrice(customPrice);
                    }
                }
                else
                {
                    this._allSellableGoods.push(new Data_SellGood('Armor',item.Armor, customPrice));
                }
            }
        }

        this._discounts = [];
        if( paramShop.Discounts !== "" )
        {
            let discounts = JSON.parse(paramShop.Discounts);
            for( let i = 0; i < discounts.length; i++ )
            {
                let discount = JSON.parse(discounts[i]);
                this._discounts.push(new Data_ShopDiscount(discount));
            }
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////
// Data_ShopGood
///////////////////////////////////////////////////////////////////////////////////
class Data_ShopGood extends Object
{
    constructor(paramShopGood, kind)
    {
        super();
        this.kind = kind;

        switch( this.kind )
        {
            case "Item":
                this.id = Number(paramShopGood.Item);
                this.name = $dataItems[this.id].name;
                break;
            case "Weapon":
                this.id = Number(paramShopGood.Weapon);
                this.name = $dataWeapons[this.id].name;
                break;
            case "Armor":
                this.id = Number(paramShopGood.Armor);
                this.name = $dataArmors[this.id].name;
                break;
            case "Switch":
                this.id = Number(paramShopGood.Switch);
                if( paramShopGood.DisplayText === "" )
                {
                    this.name = $dataSystem.switches[this.id];
                }
                else
                {
                    this.name = paramShopGood.DisplayText;
                }
                break;
            case "Currency":
                this.id = Number(paramShopGood.Currency);
                this.name = BurningOrca.Shops.Currencies[this.id].name();
                break;
            default:
                throw new Error("Kind of shop good defined in the plugin parameters unknown!");
        }

        if( this.kind === 'Switch' )
        {
            this.OnColor = paramShopGood.OnColor;
            this.OffColor = paramShopGood.OffColor;
            this.StockQuantity = 1;
            this.StockQuantityType = "Amount";
            this.isToggable = eval(paramShopGood.Toggable);
        }
        else if( this.kind === 'Currency' )
        {
            this.StockQuantity = 0;
            this.StockQuantityType = "Amount";
        }
        else
        {
            this.StockQuantityType = paramShopGood.StockQuantityType;
            this.StockQuantity = Number(paramShopGood.StockQuantity);
            this.SellingPrice = JSON.parse(paramShopGood["Custom Selling Price"]);
            this.SellingPrice.Id = Number(this.SellingPrice.Id),
            this.SellingPrice.Amount = Number(this.SellingPrice.Amount);
        }

        this.AvailabilityCond = JSON.parse(paramShopGood.AvailabilityCond);
        this.BuyPrice = JSON.parse(paramShopGood["Custom Price"]);
        this.BuyPrice.Id = Number(this.BuyPrice.Id),
        this.BuyPrice.Amount = Number(this.BuyPrice.Amount);
    }

    isIndependentAndHasLimitedStock()
    {
       if( !Imported.YEP_ItemCore ) return false;
       if( this.StockQuantity <= 0 ) return false;

       let dataObj = null;

       switch( this.kind )
       {
           case 'Item':
               dataObj = $dataItems[this.id];
               break;
           case 'Weapon':
               dataObj = $dataWeapons[this.id];
               break;
           case 'Armor':
               dataObj = $dataArmors[this.id].id;
               break;
           default:
               return false;
       }

       if( dataObj.proxyBuy ) return false;
       return DataManager.isIndependent(dataObj);
    }
}

///////////////////////////////////////////////////////////////////////////////////
// Data_SellGood
///////////////////////////////////////////////////////////////////////////////////
class Data_SellGood extends Object
{
    constructor(kind, id, sellingPrice)
    {
        super();
        this.kind = kind;
        this.id = Number(id);

        switch( this.kind )
        {
            case "Item":
                this.name = $dataItems[this.id].name;
                break;
            case "Weapon":
                this.name = $dataWeapons[this.id].name;
                break;
            case "Armor":
                this.name = $dataArmors[this.id].name;
                break;
            default:
                throw new Error("Kind of selling good defined in the plugin parameters unknown!");
        }

        this.SellingPrice = sellingPrice;
        this.SellingPrice.Id = Number(this.SellingPrice.Id);
        this.SellingPrice.Amount = Number(this.SellingPrice.Amount);
    }

    SetSellingPrice(sellingPrice)
    {
        this.SellingPrice = sellingPrice;
        this.SellingPrice.Id = Number(this.SellingPrice.Id);
        this.SellingPrice.Amount = Number(this.SellingPrice.Amount);
    }
}

///////////////////////////////////////////////////////////////////////////////////
// Data_ShopDiscount
///////////////////////////////////////////////////////////////////////////////////
class Data_ShopDiscount extends Object
{
    constructor(paramDiscount)
    {
        super();
        this._condition = JSON.parse(paramDiscount.Condition);
        this._percentage = paramDiscount.Percentage;
    }
}

///////////////////////////////////////////////////////////////////////////////////
// Game_Shops
///////////////////////////////////////////////////////////////////////////////////
function Game_Shops()
{
    this.initialize.apply(this, arguments);
}

Game_Shops.prototype = Object.create(Object.prototype);
Game_Shops.prototype.constructor = Game_Shops;

Game_Shops.prototype.initialize = function()
{
    this._switchBought = {};
}
/////////Edited by Chlor/////////
Game_Shops.prototype.getSaveData = function()
{
    let save = {};
    for (let id in this)
    {
        if (this[id] && this[id]._stock) // сохраняем только остатки
        {
            save[id] = { _stock: this[id]._stock };
        }
    }
    return save;
};

Game_Shops.prototype.applySaveData = function(data)
{
    for (let id in data)
    {
        if (this[id])
        {
            this[id]._stock = data[id]._stock;
        }
    }
};
/////////Edited by Chlor/////////

Game_Shops.prototype.getShop = function(shopName)
{
    if( this[shopName] === undefined )
    {
        this[shopName] = new Game_Shop($dataShops[shopName]);
    }
    return this[shopName];
}

Game_Shops.prototype.deleteShop = function(shopName)
{
    if( this[shopName] !== undefined )
    {
        delete this[shopName];
    }
}

///////////////////////////////////////////////////////////////////////////////////
// Game_Shop
///////////////////////////////////////////////////////////////////////////////////
function Game_Shop()
{
    this.initialize.apply(this, arguments);
}

Game_Shop.prototype = Object.create(Object.prototype);
Game_Shop.prototype.constructor = Game_Shop;

Game_Shop.prototype.initialize = function(dataShop)
{
    this.Name                         = dataShop.Name;
    this.ShopType                     = dataShop.ShopType;
    this.SellOnlyGoodsThatCanBeBought = dataShop.SellOnlyGoodsThatCanBeBought;
    this.StockRefillOption            = dataShop.StockRefillOption;
    this.StockRefillSeconds           = dataShop.StockRefillSeconds;
    this.RefillStockCond              = dataShop.RefillStockCond;
    this._discounts                   = dataShop._discounts;
    this.StockRefillType              = dataShop.StockRefillType;
    this._allSellableGoods            = dataShop._allSellableGoods;

    this._totalShopGoodsBought = 0;
    this._itemsBought = {};
    this._weaponsBought = {};
    this._armorBought = {};
    this._currencyBought = {};
    this._itemsSold = {};
    this._weaponsSold = {};
    this._armorSold = {};
    this._nrOfVisits = 0;

    this._allGoods = [];
    this.refillStock();
}

Game_Shop.prototype.refillStock = function()
{
    this.lastStockRefillTime = $gameSystem.playtime();

    this._allGoods = this._allGoods || [];
    let buyableGoods = $dataShops[this.Name]._allBuyableGoods;

    for( let i = 0; i < buyableGoods.length; i++ )
    {
        let quantityOnStock = 0;
        for( let g = 0; g < this._allGoods.length; g++ )
        {
            if( this._allGoods[g].goodId == i )
            {
                quantityOnStock += this._allGoods[g].StockQuantity;

                if( !BurningOrca.Shops.GroupItemsWithLimitedStock
                 && Imported.YEP_ItemCore
                 && buyableGoods[i].isIndependentAndHasLimitedStock()
                 && this._allGoods[g].StockQuantity == 0 )
                {
                    this._allGoods.splice(g, 1);
                    g--;
                }
            }
        }

        let refreshQuantity = 0;
        let s = 0;

        if( buyableGoods[i].StockQuantityType === "Amount" )
        {
            s = buyableGoods[i].StockQuantity;
            if( s === 0 )
                s = -1; // For endless stock
        }
        else
        {
            s = $gameVariables.value(buyableGoods[i].StockQuantity);
            if( s < 0 )
                s = -1; // For endless stock
        }

        if( s != -1 )
        {
            if( this.StockRefillType === "Fill up stock" )
            {
                refreshQuantity = s - quantityOnStock;
            }
            else
            {
                refreshQuantity = s;
            }
        }

        if( !BurningOrca.Shops.GroupItemsWithLimitedStock
         && Imported.YEP_ItemCore
         && buyableGoods[i].isIndependentAndHasLimitedStock() )
        {
            for( let q = 0; q < refreshQuantity; q++ )
            {
                this._allGoods.push(new Game_ShopGood(i, buyableGoods[i]));
            }
        }
        else
        {
            for( var g = 0; g < this._allGoods.length; g++ )
            {
                if( this._allGoods[g].goodId == i )
                {
                    this._allGoods[g].StockQuantity += refreshQuantity;
                    break;
                }
            }
            if( g == this._allGoods.length )
            {
                this._allGoods.push(new Game_ShopGood(i, buyableGoods[i]));
            }
        }
    }
}

Game_Shop.prototype.refillGood = function(kind, id, quantity)
{
    for( let i = 0; i < this._allGoods.length; i++ )
    {
        if( this._allGoods[i].kind.toLowerCase() == kind.toLowerCase()
         && this._allGoods[i].id == id )
        {
            let maxStockQuantity;

            let dataShopGood = $dataShops[this.Name]._allBuyableGoods[i];
            if( dataShopGood.StockQuantityType === "Amount" )
            {
                maxStockQuantity = dataShopGood.StockQuantity;
                if( maxStockQuantity === 0 )
                    maxStockQuantity = -1; // For endless stock
            }
            else
            {
                maxStockQuantity = $gameVariables.value(dataShopGood.StockQuantity);
                if( maxStockQuantity < 0 )
                    maxStockQuantity = -1; // For endless stock
            }

            if( maxStockQuantity >= 0 )
            {
                this._allGoods[i].StockQuantity += quantity;

                if( this.StockRefillType === "Fill up stock" )
                {
                    this._allGoods[i].StockQuantity = this._allGoods[i].StockQuantity.clamp(0, maxStockQuantity);
                }
                else
                {
                    this._allGoods[i].StockQuantity = Math.max(0, this._allGoods[i].StockQuantity);
                }
            }
            break;
        }
    }
}

Game_Shop.prototype.Open = function()
{
    if( this._nrOfVisits !== 0 )
    {
        if( this.StockRefillOption == "After time" && $gameSystem.playtime() - this.lastStockRefillTime >= this.StockRefillSeconds )
        {
            this.refillStock();
        }
        else if( this.StockRefillOption == "Custom" && eval(this.RefillStockCond) )
        {
            this.refillStock();
        }
    }
    this._nrOfVisits++;

    for( let g = 0; g < this._allGoods.length; g++ )
    {
        let kind = this._allGoods[g].kind;
        let id = this._allGoods[g].id;
        let discountFact = 1.0;
        for( let d = 0; d < this._discounts.length; d++ )
        {
            if( eval(this._discounts[d]._condition) )
            {
                discountFact *= (1.0 - this._discounts[d]._percentage / 100.0);
            }
        }
        if( discountFact != 1.0 )
        {
            this._allGoods[g].applyDiscount(discountFact);
        }
    }

    this._allGoods.sort(function(a, b) {
        var sortValue;
        if( a.goodId < 0 || b.goodId < 0 )
        {
            if( b.goodId == a.goodId )
            {
                return 0;
            }
            else if( b.goodId < 0 && a.goodId < 0 )
            {
                sortValue = Math.abs(a.goodId) - Math.abs(b.goodId);
            }
            else if( b.goodId < 0 )
            {
                return -1;
            }
            else
            {
                sortValue = 1;
            }
        }
        else
        {
            sortValue = a.goodId - b.goodId;
        }
        if( sortValue === 0 )
        {
            sortValue = b.price.Amount - a.price.Amount;
        }
        return sortValue;
    });
}

Game_Shop.prototype.removeIfIndependentItem = function(shopGood)
{
    if( !Imported.YEP_ItemCore ) return;

    let dataObj = null;

    switch( shopGood.kind )
    {
        case "Item":
            dataObj = $dataItems[shopGood.id];
            break;
        case "Weapon":
            dataObj = $dataWeapons[shopGood.id];
            break;
        case "Armor":
            dataObj = $dataArmors[shopGood.id];
            break;
    }

    if( dataObj 
     && DataManager.isIndependent(dataObj)
     && !$gameParty.hasItem(dataObj, true) )
    {
        DataManager.removeIndependentItem(dataObj);
    }
}

Game_Shop.prototype.getNumberBoughtOf = function(kind, id)
{
    if( kind === "Item" ) return this._itemsBought[id] || 0;
    else if( kind === "Weapon" ) return this._weaponsBought[id] || 0;
    else if( kind === "Armor" ) return this._armorBought[id] || 0;
    else if( kind === "Switch" ) return $gameShops._switchBought[id] || 0;
    else if( kind === "Currency" ) return this._currencyBought[id] || 0;
    else return null;
}

Game_Shop.prototype.loseStock = function(item, number)
{
    if( number > 0 )
    {
        this._totalShopGoodsBought += number;
    }

    switch( item.kind )
    {
        case "Item": 
        {
            this._itemsBought[item.id] = this._itemsBought[item.id] || 0;
            this._itemsBought[item.id] += number; 
            break;
        }
        case "Weapon":
        {
            this._weaponsBought[item.id] = this._weaponsBought[item.id] || 0;
            this._weaponsBought[item.id] += number; 
            break;
        }
        case "Armor":
        {
            this._armorBought[item.id] = this._armorBought[item.id] || 0;
            this._armorBought[item.id] += number; 
            break;
        }
        case "Switch":
        {
            $gameShops._switchBought[item.id] = $gameShops._switchBought[item.id] || 0;
            $gameShops._switchBought[item.id] = 1;
            $gameSwitches.setValue(item.id, true);
            break;
        }
        case "Currency":
        {
            this._currencyBought[item.id] = this._currencyBought[item.id] || 0;
            this._currencyBought[item.id] += number; 
            break;
        }
    }

    for( let i = 0; i < this._allGoods.length; i++ )
    {
        if( this._allGoods[i] == item )
        {
            if( this._allGoods[i].StockQuantity > 0
             || this._allGoods[i].StockQuantity == 0 && number < 0 )
            {
                this._allGoods[i].StockQuantity -= number;
            }
        }
    }
}

Game_Shop.prototype.getKind = function(item)
{
    if( DataManager.isItem(item) ) return "Item";
    else if( DataManager.isWeapon(item) ) return "Weapon";
    else if( DataManager.isArmor(item) ) return "Armor";
    return 'None';
}

Game_Shop.prototype.getId = function(item)
{

    if( item.baseItemId !== undefined ) return item.baseItemId;
    return item.id;
}

Game_Shop.prototype.isSellable = function(item)
{
    if( !item ) return true;
    if( this._allSellableGoods.length === 0 ) return true;

    let kind = this.getKind(item);
    let id = this.getId(item);

    for( let i = 0; i < this._allSellableGoods.length; i++ )
    {
        if( this._allSellableGoods[i].kind === kind
            && this._allSellableGoods[i].id === id )
        {
            return true;
        }
    }
    return false;
}

Game_Shop.prototype.getBuyableItem = function(item)
{
    let kind = this.getKind(item);

    for( let i = 0; i < this._allGoods.length; i++ )
    {
        if( this._allGoods[i].kind == kind
            && this._allGoods[i].id == item.id )
            return this._allGoods[i];
    }

    return null;
}

Game_Shop.prototype.getDefaultSellPrice = function(item) 
{
    let buyableItem = this.getBuyableItem(item);

    if( buyableItem !== null ) return buyableItem.sellingPrice;
    if( item.CustomSellingPrice !== undefined ) return item.CustomSellingPrice;
    if( item.sellPrice !== undefined ) return {"Type":"Currency", "Id":0, "Amount":item.sellPrice};
    return {"Type":"Currency", "Id":0, "Amount":Math.floor(item.price / 2)};
}

Game_Shop.prototype.getSellingPrice = function(item)
{
    let kind = this.getKind(item);
    let id = this.getId(item);

    for( let i = 0; i < this._allSellableGoods.length; i++ )
    {
        if( this._allSellableGoods[i].kind === kind
            && this._allSellableGoods[i].id === id )
        {
            switch( this._allSellableGoods[i].SellingPrice.Type )
            {
                case 'None':
                    return this.getDefaultSellPrice(item);
                case 'Currency':
                case 'Item':
                    return this._allSellableGoods[i].SellingPrice;
                case 'Variable':
                    return this._allSellableGoods[i].SellingPrice.Amount > 0 ? this._allSellableGoods[i].SellingPrice : {"Type":"Currency", "Id":0, "Amount":$gameVariables.value(this._allSellableGoods[i].Id)};
            }
        }
    }

    return this.getDefaultSellPrice(item);
}

Game_Shop.prototype.doSell = function(item, number)
{
    let price = this.getSellingPrice(item);

    switch( price.Type )
    {
        case 'Currency':
        {
            BurningOrca.Shops.Currencies[price.Id].gain(number * price.Amount);
            break;
        }
        case 'Item':
        {
            $gameParty.gainItem($dataItems[price.Id], number * price.Amount, true);
            break;
        }
        case 'Variable':
        {
            $gameVariables.setValue(price.Id, $gameVariables.value(price.Id) + number * price.Amount);
            break;
        }
    }

    $gameParty.loseItem(item, number, true);
    if( DataManager.isItem(item) )
    {
        this._itemsSold[item.id] = (this._itemsSold[item.id] || 0) + number;
    }
    else if( DataManager.isWeapon(item) )
    {
        this._weaponsSold[item.id] = (this._weaponsSold[item.id] || 0) + number;
    }
    else if( DataManager.isArmor(item) )
    {
        this._armorSold[item.id] = (this._armorSold[item.id] || 0) + number;
    }
}

Game_Shop.prototype.GetHelpDisplayString = function()
{
    let helpDisplayString = this.Name;
    let totalAvailQty = 0;

    for( var i = 0; i < this._allGoods.length; i++ )
    {
        if( this._allGoods[i].StockQuantity > 0 )
        {
            totalAvailQty += this._allGoods[i].StockQuantity;
        }
    }

    if( totalAvailQty === 0 )
    {
        helpDisplayString =  helpDisplayString + " (" + BurningOrca.Shops.SoldOutText + ")";
    }
    return helpDisplayString;
}

///////////////////////////////////////////////////////////////////////////////////
// Game_ShopGood
///////////////////////////////////////////////////////////////////////////////////
function Game_ShopGood()
{
    this.intialize.apply(this, arguments);
}

Game_ShopGood.prototype = Object.create(Object.prototype);
Game_ShopGood.prototype.constructor = Game_ShopGood;

Game_ShopGood.prototype.intialize = function()
{
    let goodId = Number(arguments[0]);
    let dataShopGood = arguments[1];

    this.goodId = goodId;
    this.id = dataShopGood.id;
    this.name = dataShopGood.name;
    this.kind = dataShopGood.kind;
    this.icon = 0;
    this.meta = {};
    this.description = "";

    if( dataShopGood.StockQuantityType === "Amount" )
    {
        this.StockQuantity = dataShopGood.StockQuantity;
        if( this.StockQuantity === 0 )
            this.StockQuantity = -1; // For endless stock
    }
    else
    {
        this.StockQuantity = $gameVariables.value(dataShopGood.StockQuantity);
        if( this.StockQuantity < 0 )
            this.StockQuantity = -1; // For endless stock
    }

    this.AvailabilityCond = dataShopGood.AvailabilityCond;

    if( this.kind === "Switch" )
    {
        this.OnColor = dataShopGood.OnColor;
        this.OffColor = dataShopGood.OffColor;
        this.isToggable =  dataShopGood.isToggable;
        this.StockQuantity -= ($gameShops._switchBought[this.id] || 0);
    }
    else if( this.kind === 'Currency' )
    {
        this.icon = BurningOrca.Shops.Currencies[this.id].icon();
    }
    else
    {
        this.icon = this.dataObject().iconIndex;
        this.meta = this.dataObject().meta;
        this.description = this.dataObject().description;
    }

    switch( dataShopGood.BuyPrice.Type )
    {
        case 'None':
        {
            if( this.dataObject().CustomPrice !== undefined )
            {
                this.price = this.dataObject().CustomPrice;
            }
            else
            {
                this.price = {"Type":"Currency", "Id":0, "Amount":this.dataObject().price};
            }
            break;
        }
        case 'Currency':
        {
            this.price = {"Type":"Currency", "Id":Number(dataShopGood.BuyPrice.Id), "Amount":Number(dataShopGood.BuyPrice.Amount)};
            break;
        }
        case 'Variable':
        {
            if( dataShopGood.BuyPrice.Id === 0 )
                throw new Error("Variable Buy price doesn't have variable id set!");
            if( dataShopGood.BuyPrice.Amount === 0 )
            {
                this.price = {"Type":"Currency", "Id":0, "Amount":$gameVariables.value(dataShopGood.BuyPrice.Id)};
            }
            else
            {
                this.price = {"Type":"Variable", "Id":Number(dataShopGood.BuyPrice.Id), "Amount":Number(dataShopGood.BuyPrice.Amount)};
            }
            break;
        }
        case 'Item':
        {
            if( dataShopGood.BuyPrice.Id === 0 )
                throw new Error("Item Buy price doesn't have variable id set!");
            this.price = {"Type":"Item", "Id":Number(dataShopGood.BuyPrice.Id), "Amount":Number(dataShopGood.BuyPrice.Amount)};
            break;
        }
    }

    if( dataShopGood.SellingPrice !== undefined )
    {
        switch( dataShopGood.SellingPrice.Type )
        {
            case 'None':
            {
                if( this.dataObject().CustomSellingPrice !== undefined )
                {
                    this.sellingPrice = this.dataObject().CustomSellingPrice;
                }
                else if( this.dataObject().sellPrice !== undefined )
                {
                    this.sellingPrice = {"Type":"Currency", "Id":0, "Amount":this.dataObject().sellPrice};
                }
                else
                {
                    this.sellingPrice = {"Type":"Currency", "Id":0, "Amount":Math.floor(this.dataObject().price / 2)};
                }
                break;
            }
            case 'Currency':
            {
                this.sellingPrice = {"Type":"Currency", "Id":Number(dataShopGood.SellingPrice.Id), "Amount":Number(dataShopGood.SellingPrice.Amount)};
                break;
            }
            case 'Variable':
            {
                if( dataShopGood.SellingPrice.Id === 0 )
                    throw new Error("Variable Buy price doesn't have variable id set!");
                if( dataShopGood.SellingPrice.Amount === 0 )
                {
                    this.sellingPrice = {"Type":"Currency", "Id":0, "Amount":$gameVariables.value(dataShopGood.SellingPrice.Id)};
                }
                else
                {
                    this.sellingPrice = {"Type":"Variable", "Id":Number(dataShopGood.SellingPrice.Id), "Amount":Number(dataShopGood.SellingPrice.Amount)};
                }
                break;
            }
            case 'Item':
            {
                if( dataShopGood.SellingPrice.Id === 0 )
                    throw new Error("Item Buy price doesn't have variable id set!");
                this.sellingPrice = {"Type":"Item", "Id":Number(dataShopGood.SellingPrice.Id), "Amount":Number(dataShopGood.SellingPrice.Amount)};
                break;
            }
        }
    }

    switch( this.price.Type )
    {
        case 'Currency':
            this.priceIcon    = BurningOrca.Shops.Currencies[this.price.Id].icon();
            this.currencyName = BurningOrca.Shops.Currencies[this.price.Id].name();
            break;
        case 'Variable':
            this.priceIcon = 0;
            this.currencyName = $dataSystem.variables[this.price.Id].replace(/\\I\[(\d+)\]/gi, function() {
                    this.priceIcon = arguments[1];
                    return '';
                }.bind(this));
            break;
        case 'Item':
            this.priceIcon    = $dataItems[this.price.Id].iconIndex;
            this.currencyName = $dataItems[this.price.Id].name;
            break;
    }

    if( !BurningOrca.Shops.GroupItemsWithLimitedStock
     && dataShopGood.isIndependentAndHasLimitedStock() )
    {
        this.makeIndepent();
    }

    this.originalPrice = JSON.parse(JSON.stringify(this.price));
}

Game_ShopGood.prototype.dataObject = function()
{
    if( this.kind === 'Item' ) return $dataItems[this.id].proxyBuy ? $dataItems[$dataItems[this.id].proxyBuy] : $dataItems[this.id];
    else if( this.kind === 'Weapon' ) return $dataWeapons[this.id].proxyBuy ? $dataWeapons[$dataWeapons[this.id].proxyBuy] : $dataWeapons[this.id];
    else if( this.kind === 'Armor' ) return $dataArmors[this.id].proxyBuy ? $dataArmors[$dataArmors[this.id].proxyBuy] : $dataArmors[this.id];
    else return null;
}

Game_ShopGood.prototype.applyDiscount = function(discFactor)
{
    if( this.originalPrice === undefined )
    {
        this.originalPrice = JSON.parse(JSON.stringify(this.price));
    }

    this.price.Amount = this.originalPrice.Amount * discFactor;
    this.price.Amount = Math.round(this.price.Amount);
}

Game_ShopGood.prototype.makeIndepent = function()
{
    let baseItem = this.dataObject();
    let newItem  = DataManager.registerNewItem(baseItem);

    this.id = newItem.id;
    this.StockQuantity = 1;
    
    var boost = 0.0;

    if (DataManager.isItem(baseItem)) 
    {
        for( var i = 0; i < newItem.effects.length; i++ )
        {
            var effect = newItem.effects[i];

            if( [Game_Action.EFFECT_RECOVER_HP, Game_Action.EFFECT_RECOVER_MP].contains(effect.code)
             && baseItem.effects.length >= i
             && baseItem.effects[i].code === effect.code )
            {
                var origEffect = baseItem.effects[i];
                if( origEffect.value1 !== 0 && effect.value1 > 0 )
                {
                    boost += (effect.value1 - origEffect.value1) / origEffect.value1;
                }
                if( origEffect.value2 !== 0 && effect.value2 > 0 )
                {
                    boost += (effect.value2 - origEffect.value2) / origEffect.value2;
                }
            }
        }
    }
    else
    {
        for( var i = 0; i < 8; ++i )
        {
            if( baseItem.params[i] !== 0 )
            {
                boost += (newItem.params[i] - baseItem.params[i]) / baseItem.params[i];
            }
        }
    }

    if( boost !== 0 )
    {
        this.price.Amount += (this.price.Amount * boost);
        this.price.Amount = Math.round(Math.max(this.price.Amount, 0));

        this.sellingPrice.Amount += (this.sellingPrice.Amount * boost);
        this.sellingPrice.Amount = Math.round(Math.max(this.sellingPrice.Amount, 0));

        if( newItem.sellPrice !== undefined )
        {
            newItem.sellPrice += (newItem.sellPrice * boost);
            newItem.sellPrice = Math.round(Math.max(newItem.sellPrice, 0));
        }
    }
}

Game_ShopGood.prototype.maxBuy = function()
{
    let item   = this.dataObject();
    let maxBuy = undefined;

    if( this.kind === 'Switch' )
    {
        maxBuy = 1;
    }
    else if( this.kind === 'Currency' )
    {
        maxBuy = BurningOrca.Shops.Currencies[this.id].max() - BurningOrca.Shops.Currencies[this.id].get();
    }
    else
    {
        maxBuy = $gameParty.maxItems(item) - $gameParty.numItems(item);
        if( this.StockQuantity >= 0 )
        {
            maxBuy = Math.min(this.StockQuantity, maxBuy);
        }
    }

    switch( this.price.Type )
    {
        case 'Currency':
            maxBuy = Math.min(maxBuy, Math.floor(BurningOrca.Shops.Currencies[this.price.Id].get() / this.price.Amount));
            break;
        case 'Variable':
            maxBuy = Math.min(maxBuy, Math.floor($gameVariables.value(this.price.Id) / this.price.Amount));
            break;
        case 'Item':
            maxBuy = Math.min(maxBuy, Math.floor($gameParty.numItems($dataItems[this.price.Id]) / this.price.Amount));
            break;
    }

    return maxBuy;
}

Game_ShopGood.prototype.possession = function()
{
    let item = this.dataObject();

    if( this.kind === 'Switch' )
        return 0;
    if( this.kind === 'Currency' )
        return BurningOrca.Shops.Currencies[this.id].get();
    return $gameParty.numItems(item);
}

Game_ShopGood.prototype.doBuy = function(number)
{
    switch( this.price.Type )
    {
        case 'Currency':
            BurningOrca.Shops.Currencies[this.price.Id].loose(this.price.Amount * number);
            break;
        case 'Variable':
            $gameVariables.setValue(this.price.Id, $gameVariables.value(this.price.Id) - this.price.Amount * number);
            break;
        case 'Item':
            $gameParty.gainItem($dataItems[this.price.Id], -this.price.Amount * number, true);
            break;
    }

    if( this.kind === 'Switch' )
    {
        // Done some in loseStock
    }
    else if( this.kind === 'Currency' )
    {
        BurningOrca.Shops.Currencies[this.id].gain(number);
    }
    else
    {
        $gameParty.gainItem(this.dataObject(), number);
    }
}

Game_ShopGood.prototype.isBuyable = function()
{
    let enabled = this.maxBuy() > 0;

    if( this.kind === 'Switch'
        && $gameTemp.getActiveShop().getNumberBoughtOf("Switch", this.id) === 1)
    {
        enabled = enabled && this.isToggable;
    }

    return enabled;
}

Game_ShopGood.prototype.buyingPrice = function()
{
    if( this.kind === 'Switch' && ($gameShops._switchBought[this.id] || 0) === 1 )
        this.StockQuantity = 0;

    if( this.StockQuantity > 0 || this.StockQuantity === -1 )
        return this.price.Amount;

    if( this.kind === 'Switch' )
        return $gameSwitches.value(this.id) ? BurningOrca.Shops.SwitchOnText : BurningOrca.Shops.SwitchOffText;

    return BurningOrca.Shops.SoldOutText;
}

///////////////////////////////////////////////////////////////////////////////////
// Game_Temp
///////////////////////////////////////////////////////////////////////////////////
BurningOrca.Shops.Game_Temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function()
{
    BurningOrca.Shops.Game_Temp_initialize.call(this);
    this._activeShop = null;
}

Game_Temp.prototype.setActiveShop = function(shop)
{
    this._activeShop = shop;
}

Game_Temp.prototype.getActiveShop = function(shop)
{
    return this._activeShop;
}

BurningOrca.Shops.pluginCommand =  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) 
{
    BurningOrca.Shops.pluginCommand.call(this, command, args);
    var shopName = "";
    if( command === "OpenShop" || command === "RefillShopStock" || command === "CloseShop" )
    {
        if( args.length > 1 ) shopName = args.join(' ');
        else shopName = args;
    }
    if( command === "OpenShop" )
    {
        let shop = $gameShops.getShop(shopName);
        if( shop ) $gameTemp.setActiveShop(shop);
        shop.Open();
        SceneManager.push(Scene_Shop);
        SceneManager.prepareNextScene(shop._allGoods, shop.ShopType === "Buy Only");
    }
    if( command === "RefillShopStock" )
    {
        let shop = $gameShops.getShop(shopName);
        shop.refillStock();
    }
    if( command === "CloseShop" )
    {
        $gameShops.deleteShop(shopName);
    }
    if( BurningOrca.Shops.GroupItemsWithLimitedStock )
    {
        if( args.length > 1
         && command === "RefillItemStock" || command === "RefillArmorStock" || command === "RefillWeaponStock" )
        {
            let kind = "";
            let shopName = "";
            let id = -1;
            let quantity = -1;

            command = command + ' ' + args.join(' ');

            if( command.match(/Refill(.*?)Stock[ ]\"(.*?)\"[ ](\d+)[ ](\d+)/gi) )
            {
                kind = RegExp.$1;
                shopName = RegExp.$2;
                id = Number(RegExp.$3);
                quantity = Number(RegExp.$4);
            }

            let shop = $gameShops.getShop(shopName);
            shop.refillGood(kind, id, quantity);
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////
// Scene_Shop
///////////////////////////////////////////////////////////////////////////////////
BurningOrca.Shops.popShopScene = Scene_Shop.prototype.popScene;
Scene_Shop.prototype.popScene = function()
{
    $gameTemp.setActiveShop(null);
    BurningOrca.Shops.popShopScene.call(this);
}

BurningOrca.Shops.Scene_Shop_createHelpWindow = Scene_Shop.prototype.createHelpWindow;
Scene_Shop.prototype.createHelpWindow = function()
{
    BurningOrca.Shops.Scene_Shop_createHelpWindow.call(this);
    if( $gameTemp.getActiveShop() )
    {
        this._helpWindow.setText($gameTemp.getActiveShop().GetHelpDisplayString());
    }
}

BurningOrca.Shops.Scene_Shop_maxBuy = Scene_Shop.prototype.maxBuy;
Scene_Shop.prototype.maxBuy = function() 
{
    if( $gameTemp.getActiveShop() !== null )
    {
        return this._item.maxBuy();
    }
    return BurningOrca.Shops.Scene_Shop_maxBuy.call(this);
}

BurningOrca.Shops.Scene_Shop_doBuy = Scene_Shop.prototype.doBuy;
Scene_Shop.prototype.doBuy = function(number) 
{
    if( $gameTemp.getActiveShop() )
    {
        this._item.doBuy(number);
        $gameTemp.getActiveShop().loseStock(this._item, number);
    }
    else
    {
        BurningOrca.Shops.Scene_Shop_doBuy.call(this, number);
    }
}

BurningOrca.Shops.Scene_Shop_doSell = Scene_Shop.prototype.doSell;
Scene_Shop.prototype.doSell = function(number) 
{
    if( $gameTemp.getActiveShop() )
    {
        $gameTemp.getActiveShop().doSell(this._item, number);
    }
    else
    {
        BurningOrca.Shops.Scene_Shop_doSell.call(this, number);
    }
}

BurningOrca.Shops.Scene_Shop_onBuyOk = Scene_Shop.prototype.onBuyOk;
Scene_Shop.prototype.onBuyOk = function() 
{
    this._item = this._buyWindow.item();
    if( $gameTemp.getActiveShop() && this._item.kind === 'Switch' )
    {
        if( $gameTemp.getActiveShop().getNumberBoughtOf('Switch', this._item.id) === 1 )
        {
            $gameSwitches.setValue(this._item.id, !$gameSwitches.value(this._item.id));
            this._buyWindow.refresh();
            this._buyWindow.activate();
            this._goldWindow.refresh();
            this._statusWindow.refresh();
        }
        else
        {
            BurningOrca.Shops.Scene_Shop_onBuyOk.call(this);
        }
    }
    else
    {
        BurningOrca.Shops.Scene_Shop_onBuyOk.call(this);
    }
}

BurningOrca.Shops.Scene_Shop_onBuyCancel = Scene_Shop.prototype.onBuyCancel;
Scene_Shop.prototype.onBuyCancel = function() 
{
    BurningOrca.Shops.Scene_Shop_onBuyCancel.call(this);
    if( this._helpWindow._text == ""
     && $gameTemp.getActiveShop() )
    {
        this._helpWindow.setText($gameTemp.getActiveShop().GetHelpDisplayString());
    }
    this._goldWindow.setActiveItemPrice(null);
};

BurningOrca.Shops.Scene_Shop_onSellCancel = Scene_Shop.prototype.onSellCancel;
Scene_Shop.prototype.onSellCancel = function() 
{
    BurningOrca.Shops.Scene_Shop_onSellCancel.call(this);
    if( this._helpWindow._text == ""
     && $gameTemp.getActiveShop() )
    {
        this._helpWindow.setText($gameTemp.getActiveShop().GetHelpDisplayString());
    }
    this._goldWindow.setActiveItemPrice(null);
};

BurningOrca.Shops.Scene_Shop_sellingPrice = Scene_Shop.prototype.sellingPrice;
Scene_Shop.prototype.sellingPrice = function() 
{
    if( $gameTemp.getActiveShop() )
    {
        return $gameTemp.getActiveShop().getSellingPrice(this._item).Amount;
    }
    else
    {
        return BurningOrca.Shops.Scene_Shop_sellingPrice.call(this);
    }
}

BurningOrca.Shops.createShopsCommandWindow = Scene_Shop.prototype.createCommandWindow;
Scene_Shop.prototype.createCommandWindow = function()
{
    BurningOrca.Shops.createShopsCommandWindow.call(this);
    if( Imported.YEP_ShopMenuCore && Imported.NPCDialogueShop )
    {
        Scene_Shop.prototype.setCommandWindowHandlers.call(this);
    }
}

if( Imported.YEP_ShopMenuCore 
 && Imported.NPCDialogueShop )
{
    BurningOrca.Shops.createShopScene = Scene_Shop.prototype.create;
    Scene_Shop.prototype.create = function() 
    {
        this.failSafeGoods();
        BurningOrca.Shops.createShopScene.call(this);
        this.createActorWindow();
        this._sellWindow.setStatusWindow(this._statusWindow);
    }
}

///////////////////////////////////////////////////////////////////////////////////
// Window_ShopCommand
///////////////////////////////////////////////////////////////////////////////////
BurningOrca.Shops.Window_ShopCommand_makeCommandList = Window_ShopCommand.prototype.makeCommandList;
Window_ShopCommand.prototype.makeCommandList = function() 
{
    var activeShop = $gameTemp.getActiveShop();
    if( !activeShop )
    {
        BurningOrca.Shops.Window_ShopCommand_makeCommandList.call(this);
    }
    else if( Imported.YEP_ShopMenuCore
          && !Imported.NPCDialogueShop  )
    {
        BurningOrca.Shops.Window_ShopCommand_makeCommandList.call(this);
    }
    else // Special treatment if both YEP_ShopMenuCore & NPCDialogueShop are installed as they are usually overwrite each others functionality.
    {
        if( activeShop.ShopType !== "Sell Only" )
        {
            if( activeShop.ShopType !== "Trade" )
            {
                this.addCommand(TextManager.buy, 'buy');
            }
            else
            {
                this.addCommand(TextManager.trade, 'buy');
            }
        }
        if( activeShop.ShopType !== "Buy Only" && activeShop.ShopType !== "Trade" )
        {
            this.addCommand(TextManager.sell, 'sell', !this._purchaseOnly);
        }
        if( Imported.YEP_ShopMenuCore 
         && BurningOrca.Shops.UseYanflyEquipCommand )
        {
            this.createCommand('Equip');
        }
        this.addCustomCommands();
        this.addCommand(TextManager.cancel, 'cancel');
    }
}

if( Imported.NPCDialogueShop ) // NPCDialogueShop limits maxItems to exactly 4 for some reason. However this will not work with my use plugin parameters.
{
    Window_ShopCommand.prototype.maxItems = function() 
    {
        return this._list.length;
    }
}

BurningOrca.Shops.Window_ShopCommand_addCustomCommands = Window_ShopCommand.prototype.addCustomCommands;
Window_ShopCommand.prototype.addCustomCommands = function() 
{
    if( BurningOrca.Shops.Window_ShopCommand_addCustomCommands !== undefined ) 
        BurningOrca.Shops.Window_ShopCommand_addCustomCommands.call(this);
    
    if( Imported.NPCDialogueShop
     && BurningOrca.Shops.UseNPCDialogueShopEventCommand )
    {
        var params = PluginManager.parameters('NPCDialogueShop');
        var commonEventName = params['Common Event Name'];
        this.addCommand(commonEventName, 'event');
    }
}


if( Imported.YEP_ShopMenuCore )
{
    BurningOrca.Shops.Window_ShopCommand_createCommand = Window_ShopCommand.prototype.createCommand;
    Window_ShopCommand.prototype.createCommand = function(command) 
    {
        if( $gameTemp.getActiveShop() !== null )
        {
            var activeShop = $gameTemp.getActiveShop();

            command = command.toUpperCase();
            if( ['CUSTOM', 'ORIGINAL'].contains(command) ) 
            {
                BurningOrca.Shops.Window_ShopCommand_createCommand.call(this, command);
            }
            else if( command === 'EQUIP' && BurningOrca.Shops.UseYanflyEquipCommand )
            {
                BurningOrca.Shops.Window_ShopCommand_createCommand.call(this, command);
            }
            else if( command === 'BUY' && activeShop.ShopType !== "Sell Only" )
            {
                if( activeShop.ShopType !== "Trade" )
                {
                    BurningOrca.Shops.Window_ShopCommand_createCommand.call(this, command);
                }
                else
                {
                    this.addCommand(TextManager.trade, 'buy');
                }
            }
            else if( command === 'SELL' && activeShop.ShopType !== "Buy Only" && activeShop.ShopType !== "Trade" )
            {
                BurningOrca.Shops.Window_ShopCommand_createCommand.call(this, command);
            }
            else if( !['BUY', 'SELL'].contains(command) )
            {
                BurningOrca.Shops.Window_ShopCommand_createCommand.call(this, command);
            }
        }
        else
        {
            BurningOrca.Shops.Window_ShopCommand_createCommand.call(this, command);
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////
// Window_ShopBuy
///////////////////////////////////////////////////////////////////////////////////
BurningOrca.Shops.Window_ShopBuy_makeItemList = Window_ShopBuy.prototype.makeItemList;
Window_ShopBuy.prototype.makeItemList = function()
{
    if( $gameTemp.getActiveShop() !== null )
    {
        this._data = [];
        this._price = [];

        this._shopGoods.forEach(function(goods) {
            if( BurningOrca.Shops.DisplaySoldOutItems || goods.kind === 'Switch' || goods.StockQuantity != 0 || $gameTemp.getActiveShop().ShopType === 'Trade' )
            {
                if( eval(goods.AvailabilityCond) )
                {
                    this._data.push(goods);
                    this._price.push(goods.price);
                }
            }
        }, this);
    }
    else
    {
        BurningOrca.Shops.Window_ShopBuy_makeItemList.call(this);
    }
}

BurningOrca.Shops.Window_ShopBuy_isEnabled = Window_ShopBuy.prototype.isEnabled;
Window_ShopBuy.prototype.isEnabled = function(item) 
{
    if( $gameTemp.getActiveShop() !== null )
    {
        return item.isBuyable()
            || ($gameTemp.getActiveShop().ShopType === 'Trade' && item.possession() > 0);
    }
    else
    {
        return BurningOrca.Shops.Window_ShopBuy_isEnabled.call(this, item);
    }
}

BurningOrca.Shops.Window_ShopBuy_price = Window_ShopBuy.prototype.price
Window_ShopBuy.prototype.price = function(item)
{
    if( $gameTemp.getActiveShop() !== null )
    {
        return item.buyingPrice();
    }
    else
    {
        return BurningOrca.Shops.Window_ShopBuy_price.call(this, item);
    }
}

BurningOrca.Shops.Window_ShopBuy_drawItem = Window_ShopBuy.prototype.drawItem;
Window_ShopBuy.prototype.drawItem = function(index) 
{
    if( $gameTemp.getActiveShop() === null )
    {
        BurningOrca.Shops.Window_ShopBuy_drawItem.call(this, index);
    }
    else
    {
        let item = this._data[index];
        let rect = this.itemRect(index);
        let priceWidth = 96;
        let cx = 0;

        rect.width -= this.textPadding();

        this.changePaintOpacity(this.isEnabled(item));
        if( item.kind === 'Switch' && $gameTemp.getActiveShop().getNumberBoughtOf('Switch', item.id) === 1 )
        {
            if( $gameSwitches.value(item.id) )
            {
                this.changeTextColor(item.OnColor);
            }
            else
            {
                this.changeTextColor(item.OffColor);
            }
        }

        if( item.icon )
        {
            cx = Window_Base._iconWidth;
            this.drawIcon(item.icon, rect.x, rect.y + 2);
        }
        if( (BurningOrca.Shops.ShowInfiniteQuantityInBuyWindow  || item.StockQuantity >= 0) && item.kind != 'Currency' && item.kind !== 'Switch' )
        {
            this.drawText(BurningOrca.Shops.ItemNameFormat.format(item.name, item.StockQuantity >= 0 ? item.StockQuantity : BurningOrca.Shops.InfinityText), rect.x + cx, rect.y, rect.width - priceWidth - cx);
        }
        else
        {
            this.drawText(item.name, rect.x + cx, rect.y, rect.width - priceWidth - cx);
        }
        this.resetTextColor();

        let price = this.price(item);

        if( Number.isNaN(Number(price)) )
        {
            this.drawText(price, rect.x + rect.width - priceWidth, rect.y, priceWidth, 'right');
        }
        else
        {
            BurningOrca.Shops.drawCurrencyValueAccordingToIcon(this, price, item.currencyName, item.priceIcon, rect.x, rect.y, rect.width);
        }

        this.changePaintOpacity(true);
    }
}

BurningOrca.Shops.Window_ShopBuy_updateHelp = Window_ShopBuy.prototype.updateHelp;
Window_ShopBuy.prototype.updateHelp = function() 
{
    BurningOrca.Shops.Window_ShopBuy_updateHelp.call(this);
    if( $gameTemp.getActiveShop() )
    {
        if( this.item() && this.item().kind !== 'Currency' && this.item().kind !== 'Switch' )
        {
            if( this._infoWindow ) this._infoWindow.setItem(this.item().dataObject());
        }
        if( this._helpWindow._text == "" )
        {
            this._helpWindow.setText($gameTemp.getActiveShop().GetHelpDisplayString());
        }
        if( SceneManager._scene._goldWindow ) 
        {
            if( this.item() )
            {
                SceneManager._scene._goldWindow.setActiveItemPrice(this.item().price);
            }
            else
            {
                SceneManager._scene._goldWindow.setActiveItemPrice(null);
            }
        }
    }
};

///////////////////////////////////////////////////////////////////////////////////
// Window_ShopSell
///////////////////////////////////////////////////////////////////////////////////
BurningOrca.Shops.Window_ShopSell_includes = Window_ShopSell.prototype.includes;
Window_ShopSell.prototype.includes = function(item) 
{
    if( $gameTemp.getActiveShop() )
    {
        return BurningOrca.Shops.Window_ShopSell_includes.call(this, item)
            && $gameTemp.getActiveShop().isSellable(item);
    }
    else
    {
        return BurningOrca.Shops.Window_ShopSell_includes.call(this, item);
    }
}

BurningOrca.Shops.Window_ShopSell_updateHelp = Window_ShopSell.prototype.updateHelp;
Window_ShopSell.prototype.updateHelp = function() 
{
    BurningOrca.Shops.Window_ShopSell_updateHelp.call(this);
    if( $gameTemp.getActiveShop() )
    {
        if( this._helpWindow._text == "" )
        {
            this._helpWindow.setText($gameTemp.getActiveShop().GetHelpDisplayString());
        }
        if( SceneManager._scene._goldWindow ) 
        {
            if( this.item() )
            {
                SceneManager._scene._goldWindow.setActiveItemPrice($gameTemp.getActiveShop().getSellingPrice(this.item()));
            }
            else
            {
                SceneManager._scene._goldWindow.setActiveItemPrice(null);
            }
        }
    }
};

BurningOrca.Shops.Window_ShopSell_isEnabled = Window_ShopSell.prototype.isEnabled;
Window_ShopSell.prototype.isEnabled = function(item) 
{
    if( $gameTemp.getActiveShop()
     && item )
    {
        if( Imported.YEP_ShopMenuCore && item.cannotSell ) return false;
        if( Imported.YEP_ShopMenuCore && item.canSell ) return true;
        return $gameTemp.getActiveShop().getSellingPrice(item).Amount > 0;
    }
    else
    {
         return BurningOrca.Shops.Window_ShopSell_isEnabled.call(this, item);
    }
}

///////////////////////////////////////////////////////////////////////////////////
// Window_ShopNumber
///////////////////////////////////////////////////////////////////////////////////
BurningOrca.Shops.Window_ShopNumber_setup = Window_ShopNumber.prototype.setup
Window_ShopNumber.prototype.setup = function(item, max, price) 
{
    BurningOrca.Shops.Window_ShopNumber_setup.call(this, item, max, price);
    if( max === 0 ) this._number = 0;
    if( $gameTemp.getActiveShop() && $gameTemp.getActiveShop().ShopType === 'Trade' )
    {
        this._price = this._item.price.Amount;
    }
}

BurningOrca.Shops.Window_ShopNumber_refresh = Window_ShopNumber.prototype.refresh
Window_ShopNumber.prototype.refresh = function() 
{
    if( $gameTemp.getActiveShop() )
    {
        if( this._item && this._item.goodId !== undefined )
        {
            this.contents.clear();
            this._index = 0;
            this.resetFontSettings();
            let cx = 0;
            if( this._item.icon !== 0 )
            {
                cx = Window_Base._iconWidth + 4;
                this.drawIcon(this._item.icon, 0, this.lineHeight() - 2);
            }
            this.drawText(this._item.name, cx, this.lineHeight(), this.contents.width);
            this.drawMultiplicationSign();
            this.drawNumber();
            this.drawTotalPrice();
        }
        else
        {
           BurningOrca.Shops.Window_ShopNumber_refresh.call(this);
        }

        if( SceneManager._scene._commandWindow.currentSymbol() !== 'sell' )
        {
            this.drawAvailableStock();
        }
    }
    else
    {
        BurningOrca.Shops.Window_ShopNumber_refresh.call(this);
    }
}

BurningOrca.Shops.Window_Gold_drawCurrencyValue = Window_Gold.prototype.drawCurrencyValue;
Window_ShopNumber.prototype.drawCurrencyValue = function(value, unit, x, y, width)
{
    if( $gameTemp.getActiveShop() && this._item )
    {
        if( this._item.goodId !== undefined )
        {
            BurningOrca.Shops.drawCurrencyValueAccordingToIcon(this, value, unit, this._item.priceIcon, x, y, width);
        }
        else
        {
            BurningOrca.Shops.drawCurrencyValue(this, $gameTemp.getActiveShop().getSellingPrice(this._item), value, unit, x, y, width);
        }
    }
    else
    {
        BurningOrca.Shops.Window_Gold_drawCurrencyValue.call(this, value, unit, x, y, width);
    }
}

if( Imported.YEP_ShopMenuCore )
{
    BurningOrca.Shops.Window_ShopNumber_getTotalCurrency = Window_ShopNumber.prototype.getTotalCurrency;
    Window_ShopNumber.prototype.getTotalCurrency = function() 
    {
        if( $gameTemp.getActiveShop() && this._item )
        {
            let price = null;
            if( this._item.goodId !== undefined )
            {
                price = this._item.price;
            }
            else
            {
                price = $gameTemp.getActiveShop().getSellingPrice(this._item);
            }

            return BurningOrca.Shops.getTotalCurrency(price);
        }
        else
        {
            return BurningOrca.Shops.Window_ShopNumber_getTotalCurrency.call(this);
        }
    }
}

Window_ShopNumber.prototype.drawAvailableStock = function()
{
    let stock = this._item.StockQuantity;
    let x = this.textPadding();
    let y = 0;
    let amountText = "";
    if( stock < 0 )
    {
        amountText = BurningOrca.Shops.InfinityText;
    }
    else if( BurningOrca.Shops.StockQuantityDisplayType === 'Current Stock' ) 
    {
        amountText = String(stock);
    }
    else
    {
       amountText = String(stock - this._number);
    }
    this.changeTextColor(this.systemColor());
    this.contents.drawText(BurningOrca.Shops.StockQuantityText, x, y, this.contents.width - this.textPadding() - this.textWidth(BurningOrca.Shops.InfinityText), this.lineHeight(), 'left');
    this.resetTextColor();
    this.contents.drawText(amountText, this.contents.width -  this.textPadding() - this.textWidth(BurningOrca.Shops.InfinityText), y, this.textWidth(BurningOrca.Shops.InfinityText), this.lineHeight(), 'right');
}

BurningOrca.Shops.Window_ShopNumber_maxDigits = Window_ShopNumber.prototype.maxDigits;
Window_ShopNumber.prototype.maxDigits = function() 
{
    if( this._item
      && $gameTemp.getActiveShop()
      && SceneManager._scene._commandWindow.currentSymbol() !== 'sell' )
    {
        digits = this._max == 0 ? 1 : Math.floor(Math.log10(this._max)) + 1;

        if( this._item.kind == 'Switch' )
        {
            return digits;   
        }
        else if( $gameTemp.getActiveShop().ShopType === 'Trade' )
        {
            if( this._item.kind == 'Currency' )
            {
                let value = BurningOrca.Shops.Currencies[this._item.id].get() / this._price;
                return Math.max(digits, value == 0 ? 1 : Math.floor(Math.log10(value) + 1));
            }
            else
            {
                let value = $gameParty.numItems(this._item.dataObject()) / this._price;
                return Math.max(digits, value == 0 ? 1 : Math.floor(Math.log10(value) + 1));
            }
        }
        else
        {
            return digits;
        }
    }
    else
    {
        return BurningOrca.Shops.Window_ShopNumber_maxDigits.call(this);
    }
};

BurningOrca.Shops.Window_ShopNumber_changeNumber = Window_ShopNumber.prototype.changeNumber;
Window_ShopNumber.prototype.changeNumber = function(amount) 
{
    if( $gameTemp.getActiveShop() 
     && $gameTemp.getActiveShop().ShopType === 'Trade'
     && this._item.kind !== 'Switch' ) 
    {
        var lastNumber = this._number;
        this._number = this._number + amount;
        if( this._number === 0 )
        {
            this._number += amount;
        }
        if( this._item.kind == 'Currency' )
        {
            this._number = this._number.clamp(-1 * BurningOrca.Shops.Currencies[this._item.id].get(), this._max);
        }
        else
        {
            this._number = this._number.clamp(-1 * $gameParty.numItems(this._item.dataObject()), this._max);
        }

        if( this._number === 0 && this._max !== 0 )
        {
            this._number -= amount;
            this._number = this._number.clamp(0, this._max);
        }

        if( this._number !== lastNumber ) 
        {
            SoundManager.playCursor();
            this.refresh();
        }
    }
    else
    {
        return BurningOrca.Shops.Window_ShopNumber_changeNumber.call(this, amount);
    }
}

if( Imported.YEP_ShopMenuCore )
{
    BurningOrca.Shops.Window_ShopNumber_cursorWidth = Window_ShopNumber.prototype.cursorWidth;
    Window_ShopNumber.prototype.cursorWidth = function() 
    {
        if( this._item
         && $gameTemp.getActiveShop()
         && SceneManager._scene._commandWindow.currentSymbol() !== 'sell' )
        {
            let digitWidth = 0;

            this.resetFontSettings();
            if( this._item.kind == 'Switch' )
            {
                digitWidth = this.textWidth('1');   
            }
            else if( this._item.kind == 'Currency' )
            {
                digitWidth = this.textWidth(BurningOrca.Shops.Currencies[this._item.id].max());
            }
            else
            {
                digitWidth = this.textWidth($gameParty.maxItems(this._item.dataObject()));
            }

            if( $gameTemp.getActiveShop().ShopType === 'Trade'
             && this._item.kind == 'Switch' )
            {
                digitWidth += this.textWidth('-');
            }

            return digitWidth + this.textPadding() * 2;
        }
        else
        {
            return BurningOrca.Shops.Window_ShopNumber_cursorWidth.call(this);
        }
    }
}

Window_ShopNumber.prototype.processNumberChange = function() 
{
    if (this.isOpenAndActive()) 
    {
        if (Input.isRepeated('right')) 
        {
            this.changeNumber(1);
        }
        if (Input.isRepeated('left')) 
        {
            this.changeNumber(-1);
        }
        if (Input.isRepeated('up')) 
        {
            this.changeNumber(10);
        }
        if (Input.isRepeated('down')) 
        {
            this.changeNumber(-10);
        }
        if (Input.isRepeated('pageup')) 
        {
            this.changeNumber(100);
        }
        if (Input.isRepeated('pagedown')) 
        {
            this.changeNumber(-100);
        }
    }
};

///////////////////////////////////////////////////////////////////////////////////
// Window_ShopCategory
///////////////////////////////////////////////////////////////////////////////////
if( Imported.YEP_ShopMenuCore )
{
    BurningOrca.Shops.Window_ShopCategory_updateHelp = Window_ShopCategory.prototype.updateHelp;
    Window_ShopCategory.prototype.updateHelp = function() 
    {
        BurningOrca.Shops.Window_ShopCategory_updateHelp.call(this);
        if( this._helpWindow._text == ""
         && $gameTemp.getActiveShop() )
        {
            this._helpWindow.setText($gameTemp.getActiveShop().GetHelpDisplayString());
        }
    };
}

///////////////////////////////////////////////////////////////////////////////////
// Window_ShopStatus
///////////////////////////////////////////////////////////////////////////////////
BurningOrca.Shops.Window_ShopStatus_drawPossession = Window_ShopStatus.prototype.drawPossession;
Window_ShopStatus.prototype.drawPossession = function(x, y) 
{
    if( $gameTemp.getActiveShop()
     && SceneManager._scene._commandWindow.currentSymbol() !== 'sell' )
    {
        if( this._possessionWindow )
        {
            this._possessionWindow.contents.clear();
            BurningOrca.Shops.drawPossession(this._possessionWindow, this._item, x, y);
        }
        else
        {
            BurningOrca.Shops.drawPossession(this, this._item, x, y);
        }
    }
    else
    {
        BurningOrca.Shops.Window_ShopStatus_drawPossession.call(this, x, y);
    }
};

BurningOrca.Shops.Window_ShopStatus_isEquipItem = Window_ShopStatus.prototype.isEquipItem;
Window_ShopStatus.prototype.isEquipItem = function() 
{
    if( $gameTemp.getActiveShop()
     && this._item
     && SceneManager._scene._commandWindow.currentSymbol() !== 'sell' )
    {
        return DataManager.isWeapon(this._item.dataObject()) || DataManager.isArmor(this._item.dataObject());
    }
    else
    {
        return BurningOrca.Shops.Window_ShopStatus_isEquipItem.call(this);
    }
}

if( Imported.YEP_ShopMenuCore )
{
    BurningOrca.Shops.Window_ShopStatus_drawActorData = Window_ShopStatus.prototype.drawActorData;
    Window_ShopStatus.prototype.drawActorData = function(actor) 
    {
        if( $gameTemp.getActiveShop() 
         && this._item  
         && SceneManager._scene._commandWindow.currentSymbol() !== 'sell')
        {
            var saveItem = this._item;
            this._item = this._item.dataObject();
            BurningOrca.Shops.Window_ShopStatus_drawActorData.call(this, actor);
            this._item = saveItem;
        }
        else
        {
            BurningOrca.Shops.Window_ShopStatus_drawActorData.call(this, actor);
        }
    }

    BurningOrca.Shops.Window_ShopStatus_drawDefaultData = Window_ShopStatus.prototype.drawDefaultData;
    Window_ShopStatus.prototype.drawDefaultData = function() 
    {
        if( $gameTemp.getActiveShop() 
         && this._item 
         && SceneManager._scene._commandWindow.currentSymbol() !== 'sell' )
        {
            var saveItem = this._item;
            this._item = this._item.dataObject();
            BurningOrca.Shops.Window_ShopStatus_drawDefaultData.call(this);
            this._item = saveItem;
        }
        else
        {
            BurningOrca.Shops.Window_ShopStatus_drawDefaultData.call(this);
        }
    }
}
else
{
    BurningOrca.Shops.Window_ShopStatus_drawEquipInfo = Window_ShopStatus.prototype.drawEquipInfo;
    Window_ShopStatus.prototype.drawEquipInfo = function(x,y) 
    {
        if( $gameTemp.getActiveShop() 
         && this._item  
         && SceneManager._scene._commandWindow.currentSymbol() !== 'sell')
        {
            var saveItem = this._item;
            this._item = this._item.dataObject();
            BurningOrca.Shops.Window_ShopStatus_drawEquipInfo.call(this,x,y);
            this._item = saveItem;
        }
        else
        {
            BurningOrca.Shops.Window_ShopStatus_drawEquipInfo.call(this,x,y);
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////
// Window_ItemCategory
///////////////////////////////////////////////////////////////////////////////////
BurningOrca.Shops.Window_ItemCategory_updateHelp = Window_ItemCategory.prototype.updateHelp;
Window_ItemCategory.prototype.updateHelp = function() 
{
    BurningOrca.Shops.Window_ItemCategory_updateHelp.call(this);
    if( this._helpWindow._text == ""
     && $gameTemp.getActiveShop() )
    {
        this._helpWindow.setText($gameTemp.getActiveShop().GetHelpDisplayString());
    }
};


///////////////////////////////////////////////////////////////////////////////////
// Window_Gold
///////////////////////////////////////////////////////////////////////////////////
BurningOrca.Shops.Window_Gold_initialize = Window_Gold.prototype.initialize;
Window_Gold.prototype.initialize = function(x, y)
{
    BurningOrca.Shops.Window_Gold_initialize.call(this, x, y);
    this._activeItemPrice = null;
}

Window_Gold.prototype.setActiveItemPrice = function(activeItemPrice)
{
    if( this._activeItemPrice !== activeItemPrice )
    {
        this._activeItemPrice = activeItemPrice;
        this.refresh();
    }
}

BurningOrca.Shops.Window_Gold_value = Window_Gold.prototype.value;
Window_Gold.prototype.value = function() 
{
    if( this._activeItemPrice )
    {
        return BurningOrca.Shops.getTotalCurrency(this._activeItemPrice);
    }
    else
    {
        return BurningOrca.Shops.Window_Gold_value.call(this);
    }
};

BurningOrca.Shops.Window_Gold_currencyUnit = Window_Gold.prototype.currencyUnit;
Window_Gold.prototype.currencyUnit = function() 
{
    if( this._activeItemPrice )
    {
        switch( this._activeItemPrice.Type )
        {
            case 'Currency':
                return BurningOrca.Shops.Currencies[this._activeItemPrice.Id].name();
            case 'Item':
                return $dataItems[this._activeItemPrice.Id].name;
            case 'Variable':
                return $dataSystem.variables[this._activeItemPrice.Id].replace(/\\I\[(\d+)\]/gi, '');;
        }
        return '';
    }
    else
    {
        return BurningOrca.Shops.Window_Gold_currencyUnit.call(this);
    }
};


BurningOrca.Shops.Window_Gold_drawCurrencyValue = Window_Gold.prototype.drawCurrencyValue;
Window_Gold.prototype.drawCurrencyValue = function(value, unit, x, y, width)
{
    if( this._activeItemPrice )
    {
        BurningOrca.Shops.drawCurrencyValue(this, this._activeItemPrice, value, unit, x, y, width);
    }
    else
    {
        BurningOrca.Shops.Window_Gold_drawCurrencyValue.call(this, value, unit, x, y, width);
    }
}

///////////////////////////////////////////////////////////////////////////////////
// Utility Functions
///////////////////////////////////////////////////////////////////////////////////
BurningOrca.Shops.drawPossession = function(window, item, x, y)
{
    let possession = 0;
    if( item.kind === 'Switch' )
    {
        possession = $gameShops._switchBought[item.id] || 0;
    }
    else if( item.kind === 'Currency' )
    {
        possession = BurningOrca.Shops.Currencies[item.id].get();
    }
    else if( Imported.YEP_ItemCore && DataManager.isIndependent(item.dataObject()) && item.dataObject().baseItemId === undefined )
    {
         let baseItem = DataManager.getBaseItem(item.dataObject());
         possession = $gameParty.numIndependentItems(baseItem);
    }
    else
    {
        possession = $gameParty.numItems(item.dataObject());
    }

    let width = window.contents.width - window.textPadding() - x;
    let possessionWidth = window.textWidth('0') * (possession == 0 ? 1 : (Math.floor(Math.log10(possession)) + 1));
    window.changeTextColor(window.systemColor());
    window.drawText(TextManager.possession, x, y, width - possessionWidth);
    window.resetTextColor();
    window.drawText(possession, x, y, width, 'right');
}

BurningOrca.Shops.drawCurrencyValue = function(window, activeItemPrice, value, unit, x, y, width)
{
    let priceIcon = 0;

    switch( activeItemPrice.Type )
    {
        case 'Currency':
            priceIcon = BurningOrca.Shops.Currencies[activeItemPrice.Id].icon();
            break;
        case 'Item':
            priceIcon = $dataItems[activeItemPrice.Id].iconIndex;
            break;
        case 'Variable':
            if( $dataSystem.variables[activeItemPrice.Id].match(/\\I\[(\d+)\]/gi) )
            {
                priceIcon = Number(RegExp.$1);
            }
            break;
    }

    BurningOrca.Shops.drawCurrencyValueAccordingToIcon(window, value, unit, priceIcon, x, y, width);
}

BurningOrca.Shops.drawCurrencyValueAccordingToIcon = function(window, value, unit, icon, x, y, width)
{
    window.resetTextColor();
    if( Imported.YEP_CoreEngine && Yanfly.Param.GoldFontSize !== undefined )
    {
        window.contents.fontSize = Yanfly.Param.GoldFontSize;
    }
    if( icon === 0 )
    {
        window.drawText(String(value) + " " + unit, x, y, width, 'right');
    }
    else
    {
        if( Imported["ShadowDragon EC"] )
        {
            value = window.stringToNumber(value);
            value = window.EasyCurrency(value);
        }
        window.drawIcon(icon, x + width - Window_Base._iconWidth, y + 2);
        window.drawText(value, x, y, width - Window_Base._iconWidth - 4, 'right');
    }
    window.resetFontSettings();
}

BurningOrca.Shops.getTotalCurrency = function(price)
{
    switch( price.Type )
    {
        case 'Currency':
            return BurningOrca.Shops.Currencies[price.Id].get();
        case 'Item':
            return $gameParty.numItems($dataItems[price.Id]);
        case 'Variable':
            return $gameVariables.value(price.Id);
    }
    return 0;
}

///////////////////////////////////////////////////////////////////////////////////
// TextManager
///////////////////////////////////////////////////////////////////////////////////
Object.defineProperty(TextManager, "trade", {
    get: function() {
        return 'Trade';
    }
});