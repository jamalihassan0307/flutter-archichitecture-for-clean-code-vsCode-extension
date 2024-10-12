/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(__webpack_require__(1));
const fs = __importStar(__webpack_require__(2));
const path = __importStar(__webpack_require__(3));
function activate(context) {
    let disposable = vscode.commands.registerCommand('flutter-archichitecture.createNextWaysArchitecture', async () => {
        const fileTemplates = {
            locales: `
    import 'package:flutter/material.dart';
    
    class locales extends StatelessWidget {
      @override
      Widget build(BuildContext context) {
        return MaterialApp(
          title: 'Flutter Demo',
          home: Scaffold(
            appBar: AppBar(
              title: Text('Flutter Architecture'),
            ),
            body: Center(
              child: Text('Hello, Flutter!'),
            ),
          ),
        );
      }
    }
      `
        };
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No workspace folder found.');
            return;
        }
        const rootPath = workspaceFolders[0].uri.fsPath;
        const architecture = {
            "lib": [
                { "folder": "generated", "files": ["locales.g.dart"] },
                { "folder": "src", "files": [] },
                { "folder": "src/common", "files": [] },
                { "folder": "src/common/constants", "files": ["app_constant.dart", "global_variables.dart", "image_paths.dart", "static_data.dart"] },
                { "folder": "src/common/providers", "files": ["common_providers.dart", "drop_down_provider.dart", "firebase_provider.dart"] },
                { "folder": "src/common/services/language", "files": ["language_services.dart"] },
                { "folder": "src/common/services/location", "files": ["location_helper.dart"] },
                { "folder": "src/common/utils", "files": ["custom_snackbar.dart", "custom_snakbar.dart", "shared_pref_helper.dart", "validation.dart"] },
                { "folder": "src/common/widgets", "files": [] },
                { "folder": "src/features", "files": [] },
                { "folder": "src/core", "files": [] },
                { "folder": "src/models", "files": [] },
                { "folder": "src/res", "files": [] },
                { "folder": "src/routes", "files": ["error_route.dart", "route_transition.dart", "routes.dart"] },
                { "folder": "src/theme/widget_theme", "files": ["tab_bar_theme.dart", "text_theme.dart"] },
                { "folder": "src/theme", "files": ["app_theme.dart", "color_scheme.dart"] }
            ]
        };
        for (const folder of architecture.lib) {
            const folderPath = path.join(rootPath, 'lib', folder.folder);
            fs.mkdirSync(folderPath, { recursive: true });
            for (const file of folder.files) {
                const fileName = file.split('.')[0];
                const fileContent = fileTemplates[fileName] || `// ${fileName} content`;
                const filePath = path.join(folderPath, file);
                fs.writeFileSync(filePath, fileContent, { flag: 'wx' });
            }
        }
        vscode.window.showInformationMessage('Flutter architecture with Dart files created successfully!');
    });
    context.subscriptions.push(disposable);
}
function deactivate() {
    console.debug('Flutter MVVM Generator: Deactivated');
}


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("path");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map