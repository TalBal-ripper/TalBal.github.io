(function() {
    // Функция для определения, используется ли мобильное устройство
    function isMobileDevice() {
        return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
    }

    // Задаем параметр для плагина
    var eliMobileControlsPlugin = PluginManager._scripts.find(function(script) {
        return script === "Eli_MobileControls";
    });

    if (eliMobileControlsPlugin) {
        var status = isMobileDevice(); 

        PluginManager.callCommand(this, 'true', 'Eli_MobileControls', status);
    }
})();


