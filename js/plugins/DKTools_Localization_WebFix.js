/*:
 * @plugindesc v1.0.0 Fix for DKTools_Localization on web/GitHub Pages (no Stamp.json required)
 * @author WebFix Patch
 *
 * @help
 * Place this plugin AFTER DKTools and DKTools_Localization in the plugin list.
 *
 * Problem:
 *   In browser (GitHub Pages, local server), DKTools.IO.Directory.exists()
 *   always returns false because it requires either NW.js or a Stamp.json file.
 *   This causes DKTools_Localization to fail looking for "locales/en.json"
 *   instead of scanning the "locales/en/" directory.
 *
 * Fix:
 *   Replaces DKTools.Localization._loadData() with a version that uses
 *   fetch() to load JSON files directly, bypassing the broken exists() check.
 *   Also patches DKTools.IO.normalizePath to never produce backslashes in browser.
 */

(function () {
  "use strict";
  console.log(
    "WebFix loading...",
    typeof DKTools,
    typeof DKTools?.Localization,
  );
  if (Utils.isNwjs()) {
    // NW.js works fine natively — do nothing
    return;
  }

  // -------------------------------------------------------------------------
  // Patch 1: normalizePath — always use forward slashes in browser
  // -------------------------------------------------------------------------
  const _origNormalize = DKTools.IO.normalizePath.bind(DKTools.IO);
  DKTools.IO.normalizePath = function (path, reverseSlash) {
    const result = _origNormalize(path, reverseSlash);
    return result.replace(/\\/g, "/");
  };

  // -------------------------------------------------------------------------
  // Patch 2: Replace _loadData with a fetch-based implementation
  // -------------------------------------------------------------------------
  DKTools.Localization._loadData = async function (locale) {
    // Build a clean forward-slash path: e.g. "locales/en"
    const folder = (DKTools.Localization._dataPath + locale).replace(
      /\\/g,
      "/",
    );
    const data = {};

    /**
     * Try to load a single JSON file via fetch.
     * Returns parsed object/array or null on failure.
     */
    const fetchJson = async (url) => {
      try {
        const resp = await fetch(url);
        if (!resp.ok) return null;
        return await resp.json();
      } catch (e) {
        return null;
      }
    };

    /**
     * Merge one JSON file's data into the accumulator.
     */
    const mergeFileData = (fileData, fileName) => {
      if (Array.isArray(fileData)) {
        // Strip extension from fileName for the key
        const key = fileName.replace(/\.json$/i, "");
        data[key] = fileData;
      } else if (fileData && typeof fileData === "object") {
        Object.keys(fileData).forEach((k) => {
          if (data[k] === undefined) {
            data[k] = fileData[k];
          }
        });
      }
    };

    // ------------------------------------------------------------------
    // Step 1: Try loading from directory via Stamp.json index
    //         (MODE_NWJS_STAMP — if Stamp.json exists and is loaded)
    // ------------------------------------------------------------------
    let loadedFromStamp = false;

    if (DKTools.IO.mode === DKTools.IO.MODE_NWJS_STAMP) {
      const dir = new DKTools.IO.Directory(folder);
      if (dir.exists()) {
        const result = await dir.getJsonFilesAsync();
        if (
          result.status === DKTools.IO.OK &&
          result.data &&
          result.data.length > 0
        ) {
          await Promise.all(
            result.data.map(async (file) => {
              const r = await file.loadJsonAsync();
              if (r.status === DKTools.IO.OK) {
                mergeFileData(r.data, file.getFullName());
              }
            }),
          );
          loadedFromStamp = true;
        }
      }
    }

    if (loadedFromStamp) {
      return data;
    }

    // ------------------------------------------------------------------
    // Step 2: Pure fetch strategy.
    //   2a) Try fetching a locales/<locale>/index.json listing file
    //       (some projects provide this for browser support)
    //   2b) Try fetching individual well-known JSON files
    //   2c) Fall back to fetching locales/<locale>.json (single-file mode)
    // ------------------------------------------------------------------

    // 2a) Try directory index file
    const indexUrl = folder + "/index.json";
    const indexData = await fetchJson(indexUrl);

    if (Array.isArray(indexData)) {
      // index.json is a list of filenames: ["main.json", "battle.json", ...]
      const results = await Promise.all(
        indexData.map(async (filename) => {
          const fileData = await fetchJson(folder + "/" + filename);
          return { filename, fileData };
        }),
      );
      results.forEach(({ filename, fileData }) => {
        if (fileData !== null) mergeFileData(fileData, filename);
      });

      if (Object.keys(data).length > 0) return data;
    } else if (indexData && typeof indexData === "object") {
      // index.json itself contains the translation data
      mergeFileData(indexData, "index.json");
      if (Object.keys(data).length > 0) return data;
    }

    // 2b) Try fetching the most common localization JSON filenames.
    //     RPG Maker MZ projects generated by DKTools_Localization
    //     typically put all keys in a single file named after the locale
    //     or split into these common files:
    const commonFiles = [
      "main.json",
      "database.json",
      "battle.json",
      "menu.json",
      "system.json",
      "messages.json",
      locale + ".json", // e.g. en.json inside the en/ folder
    ];

    const dirResults = await Promise.all(
      commonFiles.map(async (filename) => {
        const fileData = await fetchJson(folder + "/" + filename);
        return { filename, fileData };
      }),
    );

    dirResults.forEach(({ filename, fileData }) => {
      if (fileData !== null) mergeFileData(fileData, filename);
    });

    if (Object.keys(data).length > 0) return data;

    // 2c) Single-file fallback: locales/<locale>.json  (e.g. locales/en.json)
    const singleFileUrl = folder + ".json";
    const singleData = await fetchJson(singleFileUrl);

    if (singleData !== null) {
      mergeFileData(singleData, locale + ".json");
      return data;
    }

    // Nothing worked
    throw new Error(
      `[DKTools_Localization_WebFix] Could not load localization data for locale "${locale}". ` +
        `Tried directory "${folder}/" (with index.json and common filenames) and single file "${singleFileUrl}". ` +
        `If your locale files are in a subdirectory, make sure one of the following exists: ` +
        `"${folder}/index.json" (listing filenames), any of [${commonFiles.join(", ")}] inside that folder, ` +
        `or a single file "${singleFileUrl}".`,
    );
  };

  console.log(
    "[DKTools_Localization_WebFix] Web fetch patch applied successfully.",
  );
})();
