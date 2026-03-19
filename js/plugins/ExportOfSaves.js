//=============================================================================
// ExportOfSaves
//=============================================================================
/*:
 * @plugindesc Allows importing and exporting save files for browser game versions.
 * @help This plugin provides functionality to import and export save files for browser game versions.
 * Possible plugin script calls:
 * - Chlor.SAVE.export();
 * - Chlor.SAVE.import();
 *
 *
 * @author Chlor
 * @version 1.0
 *
 * ----------------------------------------------------------------------------
 *
 * This plugin allows importing and exporting save files for browser game versions.
 *
 *
 * Possible plugin script calls:
 * Chlor.SAVE.export();
 * call the script of exporting save files
 * Chlor.SAVE.import();
 * this will open the filebrowser, select the saves.json file you import.
 *
 *
 * The plugin adds an export button at the very bottom, if you need to raise it, then follow these instructions:
 *
 * 1) Copy this.addCommand('import of Save', 'importSave');
 * 2) Delete function Window_TitleCommand.prototype.makeCommandList in this plugin
 * 3) Go to rpg_windows
 * 4) find Window_TitleCommand.prototype.makeCommandList
 * 5) Add copy of text from step 1 anywhere you want
 *
 * Good luck
 * ----------------------------------------------------------------------------
 */

//=============================================================================
// Scene_Menu - button of in-game menu
//=============================================================================
/*const Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        Window_MenuCommand_addOriginalCommands.call(this);
        this.addCommand('{Экспортировать сохранения}', 'exportOfSave', true);
    };

    const Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        Scene_Menu_createCommandWindow.call(this);
        this._commandWindow.setHandler('exportOfSave', this.commandExport.bind(this));
    };

    Scene_Menu.prototype.commandExport = function() {
        Chlor.SAVE.export();
        this._commandWindow.activate();
    } */
//=============================================================================
// End of Scene_Menu
//=============================================================================

//=============================================================================
// Scene_Title - button of main menu
//=============================================================================

const Scene_Title_createCommandWindow =
  Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function () {
  Scene_Title_createCommandWindow.call(this);
  this._commandWindow.setHandler(
    "exportSave",
    this.commandExportSave.bind(this),
  );
  this._commandWindow.setHandler(
    "importSave",
    this.commandImportSave.bind(this),
  );
};

Scene_Title.prototype.commandExportSave = function () {
  Chlor.SAVE.export();
  this._commandWindow.activate();
};

Scene_Title.prototype.commandImportSave = function () {
  Chlor.SAVE.import();
  this._commandWindow.activate();
};

//=============================================================================
// End of Scene_Title
//=============================================================================

(function ($, undefined) {
  "use strict";

  function Chlor_ExportOfSaves() {
    throw new Error("This is a static class");
  }

  Chlor_ExportOfSaves.savesImport = function (saves) {
    try {
      console.log("Starting import process...");
      console.log("Saves to import:", saves);

      let globalInfo = DataManager.loadGlobalInfo() || [];
      let importCount = 0;

      for (let slot in saves) {
        if (saves.hasOwnProperty(slot)) {
          let saveData = saves[slot];
          let slotNum = Number(slot);

          console.log("Importing slot:", slotNum);
          if (saveData.info) {
            globalInfo[slotNum] = saveData.info;
          }

          if (saveData.data) {
            StorageManager.save(slotNum, saveData.data);
            importCount++;
          }
        }
      }

      DataManager.saveGlobalInfo(globalInfo);

      console.log("Import completed. Total saves imported:", importCount);
      return importCount;
    } catch (error) {
      console.error("Error during import:", error);
      throw error;
    }
  };

  Chlor_ExportOfSaves.savesExport = function () {
    let saves = {};

    for (let i = 1; i <= 70; i++) {
      let info = DataManager.loadSavefileInfo(i);
      let data = StorageManager.load(i);

      if (info || data) {
        saves[i] = { info: info, data: data };
      }
    }
    return saves;
  };

  $.SAVE = {
    export: function () {
      let saveFiles = Chlor_ExportOfSaves.savesExport();

      if (typeof Android !== "undefined" && Object.keys(saveFiles).length > 0) {
        Android.saveToDownloads("saves.json", JSON.stringify(saveFiles));
        return window.alert("saves.json is saved in the Downloads folder");
      }

      if (Object.keys(saveFiles).length > 0) {
        let blob = new Blob([JSON.stringify(saveFiles, null, 2)], {
          type: "application/json",
        });
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "saves.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.alert("Saves exported successfully!");
      } else {
        window.alert("No saves to export");
      }
    },

    import: function () {
      if (typeof Android !== "undefined") {
        window.handleFilePickerResult = function (saveData) {
          try {
            let saves;
            if (typeof saveData === "string") {
              saves = JSON.parse(saveData);
            } else {
              saves = JSON.parse(JSON.stringify(saveData));
            }

            if (saves && typeof saves === "object") {
              let count = Chlor_ExportOfSaves.savesImport(saves);
              window.alert(
                "Import completed successfully! " +
                  count +
                  " save(s) imported. Please restart the game.",
              );
            } else {
              window.alert("Invalid file format saves.json");
            }
          } catch (error) {
            console.error("Parsing save error: ", error);
            window.alert("Error reading file: " + error.message);
          }
        };

        Android.openFilePicker();
      } else {
        let input = document.createElement("input");
        input.type = "file";
        input.accept = ".json,application/json";

        input.onchange = function (event) {
          let file = event.target.files[0];
          if (!file) {
            console.log("No file selected");
            return;
          }

          console.log("File selected:", file.name);

          let reader = new FileReader();
          reader.onload = function (e) {
            try {
              console.log("File loaded, parsing...");
              let saves = JSON.parse(e.target.result);

              console.log("Parsed saves:", saves);

              if (
                saves &&
                typeof saves === "object" &&
                Object.keys(saves).length > 0
              ) {
                let count = Chlor_ExportOfSaves.savesImport(saves);
                window.alert(
                  "Import completed successfully! " +
                    count +
                    " save(s) imported. Please reload the page to see changes.",
                );

                setTimeout(function () {
                  location.reload();
                }, 2000);
              } else {
                window.alert("Invalid file format or empty saves.json");
              }
            } catch (error) {
              console.error("Error during import:", error);
              window.alert("Error reading file: " + error.message);
            }
          };

          reader.onerror = function (error) {
            console.error("FileReader error:", error);
            window.alert("Error reading file");
          };

          reader.readAsText(file);
        };

        input.click();
      }
    },
  };
})(this.Chlor || (this.Chlor = {}));
