/*
Title: Title links
Author: DKPlugins
Site: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Version: 2.0.0
Release: 08.10.2020
First release: 14.11.2018
*/

/*ru
Название: Ссылки На Титульном Экране
Автор: DKPlugins
Сайт: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Версия: 2.0.0
Релиз: 08.10.2020
Первый релиз: 14.11.2018
*/

/*:
 * @plugindesc v.2.0.0 Allows you to add graphic links to the title screen.
 * @author DKPlugins
 * @url https://dk-plugins.ru
 * @target MZ
 * @help

 ### Info about plugin ###
 Title: DK_Title_Links
 Author: DKPlugins
 Site: https://dk-plugins.ru
 Version: 2.0.0
 Release: 08.10.2020
 First release: 14.11.2018

 ###=========================================================================
 ## Compatibility
 ###=========================================================================
 RPG Maker MV: 1.5+
 RPG Maker MZ: 1.0+

 ###===========================================================================
 ## License and terms of use
 ###===========================================================================
 You can:
 -To use the plugin for your non-commercial projects
 -Change code of the plugin

 You cannot:
 -Delete or change any information about the plugin
 -Distribute the plugin and its modifications

 ## Commercial license ##
 To use the plugin in commercial projects, you must be my subscriber on patreon
 https://www.patreon.com/dkplugins

 ###=========================================================================
 ## Support
 ###=========================================================================
 Donate: https://dk-plugins.ru/donate
 Become a patron: https://www.patreon.com/dkplugins

 * @param buttons
 * @text Buttons
 * @desc Buttons
 * @type struct<Button>[]
 * @default []

 * @param fadeIn
 * @text Button appearance time
 * @desc Button appearance time (in frames). 0 - to disable.
 * @type number
 * @min 0
 * @default 0

*/

/*:ru
 * @plugindesc v.2.0.0 Позволяет добавить графические ссылки на титульный экран.
 * @author DKPlugins
 * @url https://dk-plugins.ru
 * @target MZ
 * @help

 ### Информация о плагине ###
 Название: DK_Title_Links
 Автор: DKPlugins
 Сайт: https://dk-plugins.ru
 Версия: 2.0.0
 Релиз: 08.10.2020
 Первый релиз: 14.11.2018

 ###=========================================================================
 ## Совместимость
 ###=========================================================================
 RPG Maker MV: 1.5+
 RPG Maker MZ: 1.0+

 ###===========================================================================
 ## Лицензия и правила использования плагина
 ###===========================================================================
 Вы можете:
 -Использовать плагин в некоммерческих проектах
 -Изменять код плагина

 Вы не можете:
 -Удалять или изменять любую информацию о плагине
 -Распространять плагин и его модификации

 ## Коммерческая лицензия ##
 Для использования плагина в коммерческих проектах необходимо быть моим подписчиком на патреоне
 https://www.patreon.com/dkplugins

 ###=========================================================================
 ## Поддержка
 ###=========================================================================
 Поддержать: https://dk-plugins.ru/donate
 Стать патроном: https://www.patreon.com/dkplugins

 * @param buttons
 * @text Кнопки
 * @desc Кнопки
 * @type struct<Button>[]
 * @default []

 * @param fadeIn
 * @text Время появления кнопки
 * @desc Время появления кнопки (в кадрах). 0 - для отключения.
 * @type number
 * @min 0
 * @default 0

*/

/*~struct~Button:

 * @param graphic
 * @text Graphic
 * @desc Button graphic
 * @type file
 * @dir img/system

 * @param link
 * @text Link
 * @desc Link

 * @param x
 * @text X
 * @desc The X coordinate. Calculated with Javascript.
 * @default 0

 * @param y
 * @text Y
 * @desc The Y coordinate. Calculated with Javascript.
 * @default 0

*/

/*~struct~Button:ru

 * @param graphic
 * @text Графика
 * @desc Графика кнопки
 * @type file
 * @dir img/system

 * @param link
 * @text Ссылка
 * @desc Ссылка

 * @param x
 * @text Координата X
 * @desc Координата X. Вычисляется с помощью Javascript.
 * @default 0

 * @param y
 * @text Координата Y
 * @desc Координата Y. Вычисляется с помощью Javascript.
 * @default 0

*/

'use strict';

var Imported = Imported || {};
Imported['DK_Title_Links'] = '2.0.0';

//===========================================================================
// Sprite_TitleLink
//===========================================================================

class Sprite_TitleLink extends Sprite_Button {

    initialize() {
        super.initialize.apply(this, arguments);
        this._fadeIn = Sprite_TitleLink.fadeIn;
        this.setClickHandler(this._openLink.bind(this));

        if (this._fadeIn > 0) {
            this.opacity = 0;
            this._fadeInSpeed = 255 / this._fadeIn;
        }
    }

    setupFrames() {}

    checkBitmap() {}

    updateOpacity() {}

    isMouseInside() {
        const touchPos = new Point(TouchInput.x, TouchInput.y);
        const localPos = this.worldTransform.applyInverse(touchPos);
        const rect = new Rectangle(
            -this.anchor.x * this.width,
            -this.anchor.y * this.height,
            this.width,
            this.height
        );

        return rect.contains(localPos.x, localPos.y);
    }

    isButtonTouched() {
        return this.isMouseInside();
    }

    isHovered() {
        return !TouchInput.isPressed() && this.isMouseInside();
    }

    updatePosition(x, y) {
        this.move(x + this.width * this.anchor.x, y + this.height * this.anchor.y);
    }

    updateFrame() {
        if (this._fadeIn > 0) {
            return;
        }

        if (this._touching || this._pressed) {
            this.opacity = 192;
            this.scale.set(0.98, 0.98);
        } else {
            this.opacity = 255;
            this.scale.set(1, 1);
        }
    }

    setLink(link) {
        this._link = link;
    }

    start(graphicName) {
        this.bitmap = ImageManager.loadSystem(graphicName);
    }

    update() {
        super.update.apply(this, arguments);

        if (this._fadeIn-- > 0) {
            this.opacity += this._fadeInSpeed;
        }
    }

    _openLink() {
        if (Utils.isNwjs()) {
            const nw = window.nw;

            if (nw) {
                nw.Shell.openExternal(this._link);
            } else {
                console.error(`Unable to open link: ${this._link}`);
            }
        } else {
            const newTab = window.open(this._link, '_blank');

            if (newTab) {
                newTab.focus();
            }
        }
    }

}

//===========================================================================
// initialize parameters
//===========================================================================

(function() {

    function parse(string) {
        try {
            return JSON.parse(string, function(key, value) {
                if (typeof string === 'number' || typeof string === 'boolean') {
                    return string;
                }

                try {
                    if (Array.isArray(value)) {
                        return value.map(val => parse(val));
                    }

                    return parse(value);
                } catch (e) {
                    return value;
                }
            });
        } catch(e) {
            return string;
        }
    }

    const parameters = PluginManager.parameters('DK_Title_Links');
    const buttons = parse(parameters.buttons);

    Sprite_TitleLink.fadeIn = parseInt(parameters.fadeIn) || 0;

    //===========================================================================
    // Scene_Title
    //===========================================================================

    const Title_Links_Scene_Title_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function() {
        Title_Links_Scene_Title_create.apply(this, arguments);
        this.createTitleLinks();
    };

    Scene_Title.prototype.createTitleLinks = function() {
        this._titleLinks = buttons.map((button) => {
            if (!button.graphic || !button.link) {
                return;
            }

            const sprite = new Sprite_TitleLink();

            sprite.anchor.set(0.5, 0.5);

            sprite.setLink(button.link);
            sprite.start(button.graphic);

            sprite.bitmap.addLoadListener(function() {
                const x = eval(button.x);
                const y = eval(button.y);

                this.updatePosition(x, y);
            }.bind(sprite));

            this.addChild(sprite);

            return sprite;
        });
    };

})();
