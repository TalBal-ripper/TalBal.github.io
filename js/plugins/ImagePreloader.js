/*:
 * @plugindesc Позволяет предварительно загружать изображения и ждать их загрузки в событиях.
 * @author Claude
 *
 * @param Debug Mode
 * @desc Включить режим отладки для вывода сообщений о загрузке изображений в консоль
 * @type boolean
 * @default true
 *
 * @help
 * Этот плагин добавляет функции для предварительной загрузки изображений
 * и ожидания их загрузки перед продолжением выполнения событий.
 *
 * Команды плагина:
 * PreloadImage имя_файла - предварительно загрузить изображение
 * WaitForImages [количество_кадров] - ждать, пока все изображения не загрузятся и (опционально) пройдет указанное количество кадров
 *
 * Примеры:
 * PreloadImage Awake_1
 * PreloadImage Awake_2
 * WaitForImages - ждать только загрузки изображений
 * WaitForImages 160 - ждать загрузки изображений И минимум 160 кадров
 *
 * API для скриптов:
 * $gameImages.preloadImage("имя_файла") - предзагрузить изображение
 * $gameImages.waitForImages(this) - дождаться загрузки всех изображений
 * $gameImages.waitForImagesAndFrames(this, frames) - дождаться загрузки изображений и указанного количества кадров
 * $gameImages.isLoading() - проверить, загружаются ли сейчас изображения
 * $gameImages.getPendingImages() - получить список ожидающих загрузки изображений
 */

(function() {
    // Параметры плагина
    var parameters = PluginManager.parameters('ImagePreloader');
    var debugMode = parameters['Debug Mode'] === 'true';
    
    // Глобальное хранилище для отслеживания загрузки изображений
    var $imagePreloader = {
        // Список загружаемых изображений
        pending: {},
        
        // Список интерпретаторов, ожидающих загрузки изображений
        waitingInterpreters: [],
        
        // Флаг, указывающий, загружаются ли сейчас изображения
        isLoading: false,
        
        // Хранит информацию о счетчиках кадров для интерпретаторов
        frameCounters: {},
        
        // Вывод отладочной информации
        log: function(message) {
            if (debugMode) {
                console.log('[ImagePreloader] ' + message);
            }
        },
        
        // Добавить изображение в очередь загрузки
        addImage: function(filename) {
            if (this.pending[filename]) {
                return; // Уже загружается
            }
            
            this.isLoading = true;
            this.pending[filename] = true;
            this.log('Начата загрузка изображения: ' + filename);
            
            // Загружаем изображение
            var bitmap = ImageManager.loadPicture(filename);
            
            // Если изображение не готово, добавляем обработчик загрузки
            if (!bitmap.isReady()) {
                // Используем однократный обработчик для предотвращения дублирования
                bitmap.addLoadListener(this.createLoadHandler(filename).bind(this));
            } else {
                // Изображение уже загружено
                this.log('Изображение уже загружено: ' + filename);
                delete this.pending[filename];
                this.checkAllLoaded();
            }
        },
        
        // Создает обработчик загрузки, привязанный к конкретному файлу
        createLoadHandler: function(filename) {
            // Возвращаем функцию, которая будет вызвана при загрузке
            return function() {
                this.log('Изображение загружено: ' + filename);
                delete this.pending[filename];
                this.checkAllLoaded();
            }.bind(this); // Привязываем контекст this
        },
        
        // Проверяет, загружены ли все изображения
        checkAllLoaded: function() {
            var pendingCount = Object.keys(this.pending).length;
            
            if (pendingCount > 0) {
                this.log('Осталось загрузить изображений: ' + pendingCount);
                return;
            }
            
            // Все изображения загружены
            this.isLoading = false;
            
            // Проверяем все ожидающие интерпретаторы
            var count = this.waitingInterpreters.length;
            var continuedCount = 0;
            
            for (var i = this.waitingInterpreters.length - 1; i >= 0; i--) {
                var interpreter = this.waitingInterpreters[i];
                var interpreterId = interpreter._eventId || 'common';
                
                // Если интерпретатор ждет только загрузки изображений (без счетчика кадров)
                if (!this.frameCounters[interpreterId]) {
                    this.waitingInterpreters.splice(i, 1);
                    interpreter._waitMode = '';
                    continuedCount++;
                }
            }
            
            if (continuedCount > 0) {
                this.log('Все изображения загружены. Разблокировано ' + continuedCount + ' событий без ожидания кадров.');
            }
        },
        
        // Обновляет счетчики кадров для интерпретаторов
        updateFrameCounters: function() {
            var interpretersToRelease = [];
            
            // Проходимся по всем ожидающим интерпретаторам
            for (var i = 0; i < this.waitingInterpreters.length; i++) {
                var interpreter = this.waitingInterpreters[i];
                var interpreterId = interpreter._eventId || 'common';
                
                // Если у интерпретатора есть счетчик кадров
                if (this.frameCounters[interpreterId]) {
                    // Уменьшаем счетчик
                    this.frameCounters[interpreterId].framesLeft--;
                    
                    // Если счетчик достиг нуля и изображения загружены
                    if (this.frameCounters[interpreterId].framesLeft <= 0 && !this.isLoading) {
                        interpretersToRelease.push({index: i, id: interpreterId});
                        this.log('Ожидание кадров для события ' + interpreterId + ' завершено');
                    }
                }
            }
            
            // Освобождаем интерпретаторы, начиная с конца массива
            for (var j = interpretersToRelease.length - 1; j >= 0; j--) {
                var releaseInfo = interpretersToRelease[j];
                this.waitingInterpreters[releaseInfo.index]._waitMode = '';
                this.waitingInterpreters.splice(releaseInfo.index, 1);
                delete this.frameCounters[releaseInfo.id];
            }
            
            if (interpretersToRelease.length > 0) {
                this.log('Разблокировано событий после ожидания кадров: ' + interpretersToRelease.length);
            }
        },
        
        // Добавляет интерпретатор в список ожидания изображений
        addWaitingInterpreter: function(interpreter) {
            if (!this.isLoading) {
                this.log('Нет загружаемых изображений, пропускаем ожидание');
                return false;
            }
            
            var interpreterId = interpreter._eventId || 'common';
            this.log('Добавление интерпретатора ' + interpreterId + ' в список ожидания изображений');
            this.waitingInterpreters.push(interpreter);
            interpreter._waitMode = 'image_loading';
            return true;
        },
        
        // Добавляет интерпретатор в список ожидания изображений и кадров
        addWaitingInterpreterWithFrames: function(interpreter, frames) {
            var interpreterId = interpreter._eventId || 'common';
            
            // Если нет загружаемых изображений и не нужно ждать кадры, сразу пропускаем
            if (!this.isLoading && (!frames || frames <= 0)) {
                this.log('Нет загружаемых изображений и кадров для ожидания, пропускаем');
                return false;
            }
            
            // Создаем счетчик кадров для этого интерпретатора
            if (frames && frames > 0) {
                this.frameCounters[interpreterId] = {
                    framesLeft: frames
                };
                this.log('Добавление интерпретатора ' + interpreterId + ' в ожидание ' + frames + ' кадров');
            }
            
            this.waitingInterpreters.push(interpreter);
            interpreter._waitMode = 'image_loading';
            return true;
        }
    };
    
    // Глобальный доступ к функциям загрузчика
    window.$gameImages = {
        preloadImage: function(filename) {
            $imagePreloader.addImage(filename);
        },
        
        waitForImages: function(interpreter) {
            return $imagePreloader.addWaitingInterpreter(interpreter);
        },
        
        waitForImagesAndFrames: function(interpreter, frames) {
            return $imagePreloader.addWaitingInterpreterWithFrames(interpreter, frames);
        },
        
        isLoading: function() {
            return $imagePreloader.isLoading;
        },
        
        getPendingImages: function() {
            return Object.keys($imagePreloader.pending);
        }
    };
    
    //================================================================
    // Переопределения методов Game_Interpreter
    //================================================================
    
    // Оригинальный метод
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    
    // Переопределенный метод для поддержки команд плагина
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        
        if (command === 'PreloadImage') {
            var filename = args[0];
            $imagePreloader.addImage(filename);
        } 
        else if (command === 'WaitForImages') {
            // Проверяем, есть ли аргумент с количеством кадров
            var frames = parseInt(args[0]);
            
            if (!isNaN(frames) && frames > 0) {
                $imagePreloader.log('Команда WaitForImages с ' + frames + ' кадрами');
                $imagePreloader.addWaitingInterpreterWithFrames(this, frames);
            } else {
                $imagePreloader.log('Команда WaitForImages: ожидание только загрузки изображений');
                $imagePreloader.addWaitingInterpreter(this);
            }
        }
    };
    
    // Оригинальный метод обновления интерпретатора
    var _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    
    // Переопределяем метод обновления режима ожидания
    Game_Interpreter.prototype.updateWaitMode = function() {
        // Проверяем наш собственный режим ожидания
        if (this._waitMode === 'image_loading') {
            var interpreterId = this._eventId || 'common';
            
            // Проверка на наличие счетчика кадров
            var hasFrameCounter = $imagePreloader.frameCounters[interpreterId];
            
            // Если есть счетчик кадров или еще идет загрузка, продолжаем ждать
            if (hasFrameCounter || $imagePreloader.isLoading) {
                return true;
            } 
            // Иначе сбрасываем режим ожидания
            else {
                this._waitMode = '';
            }
        }
        
        // Вызываем оригинальный метод для других режимов ожидания
        return _Game_Interpreter_updateWaitMode.call(this);
    };
    
    //================================================================
    // Обновление счетчиков кадров
    //================================================================
    
    // Оригинальная функция обновления карты
    var _Scene_Map_update = Scene_Map.prototype.update;
    
    // Переопределяем для обновления счетчиков кадров
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        
        // Обновляем счетчики кадров
        $imagePreloader.updateFrameCounters();
    };
})();