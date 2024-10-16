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
const ImportsManager_1 = __webpack_require__(4);
const yamal_utils_1 = __webpack_require__(39);
const feature_utils_1 = __webpack_require__(40);
const importsManager_1 = __webpack_require__(41);
const mvvm_yamal_utils_1 = __webpack_require__(59);
function activate(context) {
    let disposable = vscode.commands.registerCommand("flutter-archichitecture.createNextWaysArchitecture", async () => {
        const fileTemplates = {
            ...ImportsManager_1.ImportsManager.Main.fileTemplates,
            ...ImportsManager_1.ImportsManager.firebase_options.fileTemplates,
            ...ImportsManager_1.ImportsManager.locales.fileTemplates,
            ...ImportsManager_1.ImportsManager.app_constant.fileTemplates,
            ...ImportsManager_1.ImportsManager.global_variables.fileTemplates,
            ...ImportsManager_1.ImportsManager.image_paths.fileTemplates,
            ...ImportsManager_1.ImportsManager.static_data.fileTemplates,
            ...ImportsManager_1.ImportsManager.language_services.fileTemplates,
            ...ImportsManager_1.ImportsManager.custom_snackbar.fileTemplates,
            ...ImportsManager_1.ImportsManager.custom_snakbar.fileTemplates,
            ...ImportsManager_1.ImportsManager.shared_pref_helper.fileTemplates,
            ...ImportsManager_1.ImportsManager.validation.fileTemplates,
            ...ImportsManager_1.ImportsManager.custom_button.fileTemplates,
            ...ImportsManager_1.ImportsManager.custom_textfield.fileTemplates,
            ...ImportsManager_1.ImportsManager.api_endpoints.fileTemplates,
            ...ImportsManager_1.ImportsManager.failure.fileTemplates,
            ...ImportsManager_1.ImportsManager.type_def.fileTemplates,
            ...ImportsManager_1.ImportsManager.api_helper.fileTemplates,
            ...ImportsManager_1.ImportsManager.strings.fileTemplates,
            ...ImportsManager_1.ImportsManager.error_route.fileTemplates,
            ...ImportsManager_1.ImportsManager.route_transition.fileTemplates,
            ...ImportsManager_1.ImportsManager.routes.fileTemplates,
            ...ImportsManager_1.ImportsManager.tab_bar_theme.fileTemplates,
            ...ImportsManager_1.ImportsManager.text_theme.fileTemplates,
            ...ImportsManager_1.ImportsManager.app_theme.fileTemplates,
            ...ImportsManager_1.ImportsManager.color_scheme.fileTemplates,
        };
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage("No workspace folder found.");
            return;
        }
        const rootPath = workspaceFolders[0].uri.fsPath;
        const architecture = {
            lib: [
                { files: ["main.dart"] },
                { files: ["firebase_options.dart"] },
                { folder: "generated", files: ["locales.g.dart"] },
                { folder: "src", files: [] },
                { folder: "src/common", files: [] },
                {
                    folder: "src/common/constants",
                    files: [
                        "app_constant.dart",
                        "global_variables.dart",
                        "image_paths.dart",
                        "static_data.dart",
                    ],
                },
                { folder: "src/common/providers", files: [] },
                {
                    folder: "src/common/services/language",
                    files: ["language_services.dart"],
                },
                {
                    folder: "src/common/utils",
                    files: [
                        "custom_snackbar.dart",
                        "custom_snakbar.dart",
                        "shared_pref_helper.dart",
                        "validation.dart",
                    ],
                },
                {
                    folder: "src/common/widgets",
                    files: ["custom_button.dart", "custom_textfield.dart"],
                },
                { folder: "src/features", files: [] },
                {
                    folder: "src/core",
                    files: ["api_helper.dart", "failure.dart", "type_def.dart"],
                },
                { folder: "src/models", files: [] },
                { folder: "src/res", files: ["api_endpoints.dart", "strings.dart"] },
                {
                    folder: "src/router",
                    files: ["error_route.dart", "route_transition.dart", "routes.dart"],
                },
                {
                    folder: "src/theme/widget_theme",
                    files: ["tab_bar_theme.dart", "text_theme.dart"],
                },
                {
                    folder: "src/theme",
                    files: ["app_theme.dart", "color_scheme.dart"],
                },
            ],
        };
        // Generate architecture files and folders
        for (const folder of architecture.lib) {
            const folderPath = folder.folder
                ? path.join(rootPath, "lib", folder.folder)
                : path.join(rootPath, "lib");
            fs.mkdirSync(folderPath, { recursive: true });
            for (const file of folder.files) {
                const fileName = file.split(".")[0];
                const fileContent = fileTemplates[fileName];
                const filePath = path.join(folderPath, file);
                fs.writeFileSync(filePath, fileContent, { flag: "wx" });
            }
        }
        // Call to update pubspec.yaml
        yamal_utils_1.YamalUtility.updatePubspecYaml(rootPath);
        vscode.window.showInformationMessage("Flutter architecture with Dart files created successfully!");
    });
    //##########################################################################
    //##########################################################################
    //####################     F E A T U R E S     #############################
    //##########################################################################
    //##########################################################################
    let featurecmd = vscode.commands.registerCommand("flutter-architecture.createFeature", async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage("No workspace folder found.");
            return;
        }
        const rootPath = workspaceFolders[0].uri.fsPath;
        const featureName = await feature_utils_1.FeatureUtils.getFeatureName();
        if (featureName) {
            feature_utils_1.FeatureUtils.createFeatureStructure(rootPath, featureName);
        }
        else {
            vscode.window.showErrorMessage("Feature name is required.");
        }
    });
    //##########################################################################
    //##########################################################################
    //####################          M V V M        #############################
    //##########################################################################
    //##########################################################################
    let mvvm = vscode.commands.registerCommand("flutter-archichitecture.createMVVMArchitecture", async () => {
        const fileTemplates = {
            ...importsManager_1.ImportsManagerMvvm.Main.fileTemplates,
            ...importsManager_1.ImportsManagerMvvm.generated_plugin_registrant.fileTemplates,
            ...importsManager_1.ImportsManagerMvvm.app_url.fileTemplates,
            ...importsManager_1.ImportsManagerMvvm.exceptions.fileTemplates,
            ...importsManager_1.ImportsManagerMvvm.utils.fileTemplates,
            ...importsManager_1.ImportsManagerMvvm.color.fileTemplates,
            ...importsManager_1.ImportsManagerMvvm.internet_exception_widget.fileTemplates,
            ...importsManager_1.ImportsManagerMvvm.loading_widget.fileTemplates,
            ...importsManager_1.ImportsManagerMvvm.app_exceptions.fileTemplates,
            ...importsManager_1.ImportsManagerMvvm.network_image_widget.fileTemplates,
            ...importsManager_1.ImportsManagerMvvm.round_button.fileTemplates,
            ...importsManager_1.ImportsManagerMvvm.routes_name.fileTemplates,
            ...importsManager_1.ImportsManagerMvvm.route.fileTemplates,
            ...importsManager_1.ImportsManagerMvvm.base_api_services.fileTemplates,
            ...importsManager_1.ImportsManagerMvvm.network_api_services.fileTemplates,
            ...importsManager_1.ImportsManagerMvvm.api_response.fileTemplates,
            ...importsManager_1.ImportsManagerMvvm.status.fileTemplates,
        };
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage("No workspace folder found.");
            return;
        }
        const rootPath = workspaceFolders[0].uri.fsPath;
        const architecture = {
            lib: [
                { files: ["main.dart"] },
                { files: ["generated_plugin_registrant.dart"] },
                {
                    folder: "configs",
                    files: ["app_url.dart", "exceptions.dart", "utils.dart"],
                },
                { folder: "configs/color", files: ["color.dart"] },
                {
                    folder: "configs/componets",
                    files: [
                        "internet_exception_widget.dart",
                        "loading_widget.dart",
                        "network_image_widget.dart",
                        "round_button.dart",
                    ],
                },
                {
                    folder: "configs/routes",
                    files: ["routes_name.dart", "routes.dart"],
                },
                {
                    folder: "configs/validator",
                    files: [],
                },
                {
                    folder: "data",
                    files: ["app_exceptions.dart"],
                },
                {
                    folder: "data/network",
                    files: ["base_api_services.dart", "network_api_services.dart"],
                },
                {
                    folder: "data/response",
                    files: ["api_response.dart", "status.dart"],
                },
                {
                    folder: "data/models",
                    files: [],
                },
                {
                    folder: "data/repository",
                    files: [],
                },
                {
                    folder: "data/view",
                    files: [],
                },
                {
                    folder: "data/view_model",
                    files: [],
                },
            ],
        };
        // Generate architecture files and folders
        for (const folder of architecture.lib) {
            const folderPath = folder.folder
                ? path.join(rootPath, "lib", folder.folder)
                : path.join(rootPath, "lib");
            fs.mkdirSync(folderPath, { recursive: true });
            for (const file of folder.files) {
                const fileName = file.split(".")[0];
                const fileContent = fileTemplates[fileName];
                const filePath = path.join(folderPath, file);
                fs.writeFileSync(filePath, fileContent, { flag: "wx" });
            }
        }
        // Call to update pubspec.yaml
        mvvm_yamal_utils_1.MvvmYamalUtility.updateMvvmPubspecYaml(rootPath);
        vscode.window.showInformationMessage("Flutter architecture with Dart files created successfully!");
    });
    context.subscriptions.push(featurecmd);
    context.subscriptions.push(disposable);
    context.subscriptions.push(mvvm);
}
function deactivate() {
    console.debug("Flutter Architecture Generator: Deactivated");
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

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImportsManager = void 0;
const firebase_options_1 = __webpack_require__(5);
const app_constant_1 = __webpack_require__(6);
const global_variables_1 = __webpack_require__(7);
const image_paths_1 = __webpack_require__(8);
const static_data_1 = __webpack_require__(9);
const language_services_1 = __webpack_require__(10);
const custom_snackbar_1 = __webpack_require__(11);
const custom_snakbar_1 = __webpack_require__(12);
const shared_pref_helper_1 = __webpack_require__(13);
const validation_1 = __webpack_require__(14);
const custom_button_1 = __webpack_require__(15);
const custom_textfield_1 = __webpack_require__(16);
const failure_1 = __webpack_require__(17);
const type_def_1 = __webpack_require__(18);
const strings_1 = __webpack_require__(19);
const error_route_1 = __webpack_require__(20);
const route_transition_1 = __webpack_require__(21);
const routes_1 = __webpack_require__(22);
const tab_bar_theme_1 = __webpack_require__(23);
const text_theme_1 = __webpack_require__(24);
const app_theme_1 = __webpack_require__(25);
const color_scheme_1 = __webpack_require__(26);
const api_helper_1 = __webpack_require__(27);
const locales_1 = __webpack_require__(28);
const api_endpoints_1 = __webpack_require__(29);
const yamal_utils_1 = __webpack_require__(30);
const feature_utils_1 = __webpack_require__(31);
const main_1 = __webpack_require__(35);
const feature_controller_1 = __webpack_require__(36);
const feature_state_1 = __webpack_require__(37);
const feature_repository_1 = __webpack_require__(38);
exports.ImportsManager = {
    firebase_options: firebase_options_1.firebase_options,
    Main: main_1.Main,
    app_constant: app_constant_1.app_constant,
    global_variables: global_variables_1.global_variables,
    image_paths: image_paths_1.image_paths,
    static_data: static_data_1.static_data,
    language_services: language_services_1.language_services,
    custom_snackbar: custom_snackbar_1.custom_snackbar,
    custom_snakbar: custom_snakbar_1.custom_snakbar,
    shared_pref_helper: shared_pref_helper_1.shared_pref_helper,
    validation: validation_1.validation,
    custom_button: custom_button_1.custom_button,
    custom_textfield: custom_textfield_1.custom_textfield,
    failure: failure_1.failure,
    type_def: type_def_1.type_def,
    strings: strings_1.strings,
    error_route: error_route_1.error_route,
    route_transition: route_transition_1.route_transition,
    routes: routes_1.routes,
    tab_bar_theme: tab_bar_theme_1.tab_bar_theme,
    text_theme: text_theme_1.text_theme,
    app_theme: app_theme_1.app_theme,
    color_scheme: color_scheme_1.color_scheme,
    api_helper: api_helper_1.api_helper,
    locales: locales_1.locales,
    api_endpoints: api_endpoints_1.api_endpoints,
    Featurecontroller: feature_controller_1.Featurecontroller,
    FeatureState: feature_state_1.FeatureState,
    FeatureRepository: feature_repository_1.FeatureRepository,
    YamalUtility: yamal_utils_1.YamalUtility,
    FeatureUtils: feature_utils_1.FeatureUtils,
};


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.firebase_options = void 0;
class firebase_options {
    static fileTemplates = {
        firebase_options: `
import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for macos - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      case TargetPlatform.windows:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for windows - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      case TargetPlatform.linux:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for linux - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: '',
    appId: '',
    messagingSenderId: '',
    projectId: '',
    authDomain: '',
    storageBucket: '',
    measurementId: '',
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: '',
    appId: '',
    messagingSenderId: '',
    projectId: 
    '',
    storageBucket: '',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: '',
    appId: '',
    messagingSenderId: '',
    projectId: '',
    storageBucket: '',
    iosBundleId: '',
  );
}
   `
    };
}
exports.firebase_options = firebase_options;


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.app_constant = void 0;
class app_constant {
    static fileTemplates = {
        app_constant: ` 
 //const baseUrl = 'https://  com/api';`
    };
}
exports.app_constant = app_constant;


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.global_variables = void 0;
class global_variables {
    static fileTemplates = {
        global_variables: ` 
 import 'package:flutter/material.dart';

ColorScheme colorScheme(context) => Theme.of(context).colorScheme;

TextTheme textTheme(context) => Theme.of(context).textTheme;

final scaffoldMessengerKey = GlobalKey<ScaffoldMessengerState>();

const String languageText = 'language';
const String isFirstTimeText = 'isFirstTime';
const String isIndividualText = 'isIndividual';
const String isLoggedInText = 'isLoggedIn';
const String isFormFilledText = 'isFormFilled';
const String isFormFilledIndexText = 'isFormFilledIndex';
const String tokenText = 'tokenText';
const String isUserInterestSelectedText = "isUserInterestSelected";
const String addressText = "address";
const String coordinatesLatitudeText = "coordinatesLatitude";
const String coordinatesLongitudeText = "coordinatesLongitude";`
    };
}
exports.global_variables = global_variables;


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.image_paths = void 0;
class image_paths {
    static fileTemplates = {
        image_paths: ` class ImagePaths {
  static const mapIcon = 'assets/icons/map_location.svg';
  
}`
    };
}
exports.image_paths = image_paths;


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.static_data = void 0;
class static_data {
    static fileTemplates = {
        static_data: ` 
      
  class StaticData {
  static bool isFirstTime = true;
  static bool isLoggedIn = false;
  static String token = '';
  static bool isIndividual = true;
  static bool isFormFilled = false;
  static bool isUserInterestSelected = false;
  static int formIndex = 0;
  static String language = '';
  static int dashboardStartingIndex = 0;
  static bool pricingPackageChoosen = false;

  static String address = '';


}`
    };
}
exports.static_data = static_data;


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.language_services = void 0;
class language_services {
    static fileTemplates = {
        language_services: `
    

import 'dart:ui';
import '../../../../generated/locales.g.dart';

class LanguageServices {
  LanguageServices._();
  static final LanguageServices instance = LanguageServices._();

  factory LanguageServices() {
    return instance;
  }

  Locale onLanguageSelected(String selectedLanguage) {
    switch (selectedLanguage.toLowerCase()) {
      case LocaleKeys.english_languages:
        return const Locale('en', 'US');
      // case LocaleKeys.languages_portuguese:
      //   return const Locale('pt', 'PT');
      default:
        return const Locale('en', 'US');
    }
  }


}`
    };
}
exports.language_services = language_services;


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.custom_snackbar = void 0;
class custom_snackbar {
    static fileTemplates = {
        custom_snackbar: ` 
import '../../../../src/common/constants/global_variables.dart';
import '../../../../src/theme/app_theme.dart';
import 'package:flutter/material.dart';

void showSnackbar({
  VoidCallback? onPressed,
  required String message,
  IconData? icon,
  Color? backgroundColor,
  String? label,
  bool isError = false,
  bool closeButton = false,
  double overflowThreshold = 1.0,
  bool longActionLabel = false,
  bool floatingType = true,
  bool longLength = false,
}) {
  final appTheme = AppTheme.instance.theme;
  final SnackBarAction? snackBarAction = label != null
      ? SnackBarAction(
          label: longActionLabel ? "" : label,
          onPressed: onPressed ?? () {},
        )
      : null;

  final snackBar = SnackBar(
    content: Row(
      children: [
        Icon(
          isError
              ? icon ?? Icons.warning_amber_rounded
              : Icons.done_all_rounded,
          size: 25,
          color: appTheme.colorScheme.surface,
        ),
        const SizedBox(width: 8),
        Flexible(
          child: Text(
            message,
            textAlign: TextAlign.start,
            style: appTheme.textTheme.bodyMedium?.copyWith(
              color: appTheme.colorScheme.surface,
            ),
          ),
        ),
      ],
    ),
    showCloseIcon: closeButton,
    closeIconColor: appTheme.colorScheme.surface,
    behavior: floatingType ? SnackBarBehavior.floating : SnackBarBehavior.fixed,
    action: snackBarAction,
    duration: Duration(milliseconds: !longLength ? 800 : 2000),
    backgroundColor: isError
        ? appTheme.colorScheme.error
        : backgroundColor ?? const Color(0xFF424242),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(10),
    ),
    actionOverflowThreshold: overflowThreshold,
  );

  scaffoldMessengerKey.currentState?.showSnackBar(snackBar);


}`
    };
}
exports.custom_snackbar = custom_snackbar;


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.custom_snakbar = void 0;
class custom_snakbar {
    static fileTemplates = {
        custom_snakbar: ` 
import 'package:flutter/material.dart';

enum SnackbarType { error, info, success }

class CustomSnackbar {
  static void showSnackbar({
    required BuildContext context,
    required String message,
    SnackbarType type = SnackbarType.info,
    Duration duration = const Duration(seconds: 3),
  }) {
    Color backgroundColor;
    IconData icon;

    switch (type) {
      case SnackbarType.error:
        backgroundColor = Colors.red;
        icon = Icons.error;
        break;
      case SnackbarType.info:
        backgroundColor = Colors.blue;
        icon = Icons.info;
        break;
      case SnackbarType.success:
        backgroundColor = Colors.green;
        icon = Icons.check_circle;
        break;
    }

    final snackBar = SnackBar(
      content: Row(
        children: [
          Icon(icon, color: Colors.white),
          const SizedBox(width: 8.0),
          Expanded(
            child: Text(
              message,
              style: const TextStyle(color: Colors.white),
            ),
          ),
        ],
      ),
      backgroundColor: backgroundColor,
      duration: duration,
      behavior: SnackBarBehavior.floating,
    );
    ScaffoldMessenger.of(context).clearSnackBars();
    ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }

}`
    };
}
exports.custom_snakbar = custom_snakbar;


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.shared_pref_helper = void 0;
class shared_pref_helper {
    static fileTemplates = {
        shared_pref_helper: ` import '../../../../src/common/constants/global_variables.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';
 import '../../../src/common/constants/static_data.dart';


class SharedPrefHelper {
  static late SharedPreferences _prefs;

  static getInitialValue() async {
    _prefs = await SharedPreferences.getInstance();
    StaticData.language = await getString(languageText) ?? '';
    StaticData.isFirstTime = await getBool(isFirstTimeText) ?? true;
    StaticData.isIndividual = await getBool(isIndividualText) ?? true;
    StaticData.isLoggedIn = await getBool(isLoggedInText) ?? false;
    StaticData.isFormFilled = await getBool(isFormFilledText) ?? false;
    StaticData.isUserInterestSelected =
        await getBool(isUserInterestSelectedText) ?? false;
    StaticData.formIndex = await getInt(isFormFilledIndexText) ?? 0;
    StaticData.token = await getString(tokenText) ?? '';
    StaticData.address = await getString(addressText) ?? '';
  
  }

  // Save a string value
  static saveString(String key, String value) async {
    await _prefs.setString(key, value);
  }

  // Retrieve a string value
  static getString(String key) async {
    return _prefs.getString(key);
  }


  

  // Save a boolean value
  static saveBool(String key, bool value) async {
    await _prefs.setBool(key, value);
  }

  // Retrieve a boolean value
  static getBool(String key) async {
    return _prefs.getBool(key);
  }

  // Save an integer value
  static saveInt(String key, int value) async {
    await _prefs.setInt(key, value);
  }

  // Retrieve an integer value
  static getInt(String key) async {
    return _prefs.getInt(key);
  }

  // Save a double value
  static saveDouble(String key, double value) async {
    await _prefs.setDouble(key, value);
  }

  // Retrieve a double value
  static getDouble(String key) async {
    return _prefs.getDouble(key);
  }

  // Remove a value
  static remove(String key) async {
    await _prefs.remove(key);
  }

  // Clear all values
  static clearAll() async {
    await _prefs.clear();
  }


}`
    };
}
exports.shared_pref_helper = shared_pref_helper;


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validation = void 0;
class validation {
    static fileTemplates = {
        validation: ` import '../../../../generated/locales.g.dart';
import 'package:get/get.dart';

class Validation {
  // static String? fieldValidation(String? value, String field) {
  //   if (value == null || value.isEmpty) {
  //     return '$/{LocaleKeys.validation_please_fill.tr/} $field';
  //   }
  //   return null;
  // }

  // static String? emaiValidation(String? value) {
  //   String pattern = r'^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,4}$';
  //   RegExp regex = RegExp(pattern);
  //   if (!regex.hasMatch(value!.trim())) {
  //     return LocaleKeys.validation_please_enter_a_valid_email.tr;
  //   }
  //   return null;
  // }

  // static String? usernameValidation(String? value) {
  //   if (value == null || value.isEmpty) {
  //     return LocaleKeys.validation_please_enter_some_text.tr;
  //   }
  //   if (value.length < 3) {
  //     return LocaleKeys
  //         .validation_username_must_be_at_least_3_characters_long.tr;
  //   }
  //   if (value.length > 20) {
  //     return LocaleKeys.validation_username_must_not_exceed_20_characters.tr;
  //   }
  //   if (!RegExp(r'^[a-zA-Z0-9._]+$').hasMatch(value)) {
  //     return LocaleKeys
  //         .validation_username_can_only_contain_letters_numbers_periods_and_underscores
  //         .tr;
  //   }
  //   return null;
  // }

  // static String? passwordValidation(String? value) {
  //   if (value == null || value.isEmpty) {
  //     return LocaleKeys.validation_please_enter_a_password.tr;
  //   }
  //   if (value.length < 6) {
  //     return LocaleKeys.validation_password_is_too_weak.tr;
  //   }
  //   // if (!value.contains(RegExp(r'[A-Z]'))) {
  //   //   return 'Password must contain at least one uppercase letter';
  //   // }
  //   // if (!value.contains(RegExp(r'[a-z]'))) {
  //   //   return 'Password must contain at least one lowercase letter';
  //   // }
  //   // if (!value.contains(RegExp(r'[0-9]'))) {
  //   //   return 'Password must contain at least one digit';
  //   // }
  //   // if (!value.contains(RegExp(r'[!@#$%^&*(),.?":{}|<>]'))) {
  //   //   return 'Password must contain at least one special character';
  //   // }
  //   return null;
  // }

  // static String? confirmPasswordValidation(String? value, String password) {
  //   String? passwordError = passwordValidation(password);
  //   if (passwordError != null) {
  //     return passwordError;
  //   }

  //   if (value == null || value.isEmpty) {
  //     return LocaleKeys.validation_please_confirm_your_password.tr;
  //   }
  //   if (value != password) {
  //     return LocaleKeys.validation_passwords_dont_match.tr;
  //   }
  //   return null;
  // }

  // static String? phoneNumberValidation(String? value) {
  //   if (value == null || value.isEmpty) {
  //     return LocaleKeys.validation_please_enter_a_phone_number.tr;
  //   }
  //   // RegExp regex = RegExp(r'^\+\d{1,3}\d{10,14}$');
  //   RegExp regex = RegExp(r'^\d{10,12}$');
  //   if (!regex.hasMatch(value)) {
  //     return LocaleKeys.validation_please_enter_a_valid_phone_number.tr;
  //   }
  //   return null;
  // } // static String? fieldValidation(String? value, String field) {
  //   if (value == null || value.isEmpty) {
  //     return '$/{LocaleKeys.validation_please_fill.tr/} $field';
  //   }
  //   return null;
  // }

  // static String? emaiValidation(String? value) {
  //   String pattern = r'^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,4}$';
  //   RegExp regex = RegExp(pattern);
  //   if (!regex.hasMatch(value!.trim())) {
  //     return LocaleKeys.validation_please_enter_a_valid_email.tr;
  //   }
  //   return null;
  // }

  // static String? usernameValidation(String? value) {
  //   if (value == null || value.isEmpty) {
  //     return LocaleKeys.validation_please_enter_some_text.tr;
  //   }
  //   if (value.length < 3) {
  //     return LocaleKeys
  //         .validation_username_must_be_at_least_3_characters_long.tr;
  //   }
  //   if (value.length > 20) {
  //     return LocaleKeys.validation_username_must_not_exceed_20_characters.tr;
  //   }
  //   if (!RegExp(r'^[a-zA-Z0-9._]+$').hasMatch(value)) {
  //     return LocaleKeys
  //         .validation_username_can_only_contain_letters_numbers_periods_and_underscores
  //         .tr;
  //   }
  //   return null;
  // }

  // static String? passwordValidation(String? value) {
  //   if (value == null || value.isEmpty) {
  //     return LocaleKeys.validation_please_enter_a_password.tr;
  //   }
  //   if (value.length < 6) {
  //     return LocaleKeys.validation_password_is_too_weak.tr;
  //   }
  //   // if (!value.contains(RegExp(r'[A-Z]'))) {
  //   //   return 'Password must contain at least one uppercase letter';
  //   // }
  //   // if (!value.contains(RegExp(r'[a-z]'))) {
  //   //   return 'Password must contain at least one lowercase letter';
  //   // }
  //   // if (!value.contains(RegExp(r'[0-9]'))) {
  //   //   return 'Password must contain at least one digit';
  //   // }
  //   // if (!value.contains(RegExp(r'[!@#$%^&*(),.?":{}|<>]'))) {
  //   //   return 'Password must contain at least one special character';
  //   // }
  //   return null;
  // }

  // static String? confirmPasswordValidation(String? value, String password) {
  //   String? passwordError = passwordValidation(password);
  //   if (passwordError != null) {
  //     return passwordError;
  //   }

  //   if (value == null || value.isEmpty) {
  //     return LocaleKeys.validation_please_confirm_your_password.tr;
  //   }
  //   if (value != password) {
  //     return LocaleKeys.validation_passwords_dont_match.tr;
  //   }
  //   return null;
  // }

  // static String? phoneNumberValidation(String? value) {
  //   if (value == null || value.isEmpty) {
  //     return LocaleKeys.validation_please_enter_a_phone_number.tr;
  //   }
  //   // RegExp regex = RegExp(r'^\+\d{1,3}\d{10,14}$');
  //   RegExp regex = RegExp(r'^\d{10,12}$');
  //   if (!regex.hasMatch(value)) {
  //     return LocaleKeys.validation_please_enter_a_valid_phone_number.tr;
  //   }
  //   return null;
  // }


}`,
    };
}
exports.validation = validation;


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.custom_button = void 0;
class custom_button {
    static fileTemplates = {
        custom_button: ` import '../../../../generated/locales.g.dart';
import '../../../../src/common/constants/global_variables.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class CustomButton extends StatelessWidget {
  final VoidCallback onPressed;
  final String text;
  final bool isIcon;
  final Color? bgClr;
  final Color? txtClr;
  final bool isBorder;
  const CustomButton({
    super.key,
    this.isIcon = false,
    this.bgClr,
    this.txtClr,
    this.isBorder = false,
    required this.onPressed,
    // this.text = "Next",
    this.text = "LocaleKeys.button_next",
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: MediaQuery.of(context).size.width * 0.9,
      height: 50,
      child: TextButton(
        onPressed: onPressed,
        style: TextButton.styleFrom(
          backgroundColor: bgClr ?? colorScheme(context).primary,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
            side: isBorder
                ? BorderSide(color: colorScheme(context).primary)
                : BorderSide.none,
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            if (isIcon)
              Icon(
                Icons.send,
                color: colorScheme(context).surface,
              ),
            const SizedBox(
              width: 10,
            ),
            Flexible(
              child: Text(
                text.tr,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: textTheme(context).bodyLarge?.copyWith(
                    color: txtClr ?? colorScheme(context).onPrimary,
                    fontWeight: FontWeight.w700),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

`,
    };
}
exports.custom_button = custom_button;


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.custom_textfield = void 0;
class custom_textfield {
    static fileTemplates = {
        custom_textfield: ` 
    import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../src/common/constants/global_variables.dart';

class CustomTextField extends StatelessWidget {
  final String? hintText;
  final TextEditingController? controller;
  final void Function(String)? onChanged;
  final Widget? suffixIcon;
  final List<TextInputFormatter>? textInputFormatter;
  final bool isVisibleText;
  final Color? fillColor;
  final FormFieldValidator<String>? validator;
  final double? width;
  final TextStyle? hintStyle;
  final TextStyle? suffixStyle;
  final IconData? iconData;
  final int maxLines;
  final TextInputType? keyboardType;
  final bool? readOnly;
  final bool? obscureText;

  const CustomTextField({
    super.key,
    this.iconData,
    this.controller,
    this.textInputFormatter,
    this.suffixStyle,
    this.hintText,
    this.fillColor,
    this.isVisibleText = false,
    this.readOnly = false,
    this.hintStyle,
    this.suffixIcon,
    this.maxLines = 1,
    this.keyboardType,
    this.width,
    this.onChanged,
    this.obscureText = false,
    this.validator,
  });

  @override
  build(BuildContext context) {
    return TextFormField(
      validator: validator,
      inputFormatters: textInputFormatter,
      autovalidateMode: AutovalidateMode.onUserInteraction,
      onChanged: onChanged,
      controller: controller,
      keyboardType: keyboardType,
      maxLines: maxLines,
      readOnly: readOnly!,
      obscureText: obscureText!,
      obscuringCharacter: '●',
      style: textTheme(context).bodyMedium,
      decoration: InputDecoration(
        hintText: hintText,
        hintStyle: hintStyle ??
            textTheme(context)
                .bodyMedium
                ?.copyWith(color: colorScheme(context).outlineVariant),
        fillColor: Colors.transparent,
        contentPadding: EdgeInsets.all(20),
        suffixIcon: suffixIcon,
        suffixStyle: suffixStyle,
        prefixIcon: iconData != null ? Icon(iconData) : null,
        enabledBorder: OutlineInputBorder(
            borderSide: BorderSide(
                color: colorScheme(context).primaryContainer, width: 1),
            borderRadius: BorderRadius.circular(18)),
        focusedBorder: OutlineInputBorder(
            borderSide: BorderSide(
                color: colorScheme(context).primaryContainer, width: 1),
            borderRadius: BorderRadius.circular(18)),
        errorBorder: OutlineInputBorder(
            borderSide: BorderSide(
              color: colorScheme(context).error,
              width: 1,
            ),
            borderRadius: BorderRadius.circular(18)),
        focusedErrorBorder: OutlineInputBorder(
            borderSide: BorderSide(
              color: colorScheme(context).error,
              width: 1,
            ),
            borderRadius: BorderRadius.circular(18)),
        filled: true,
        border: const OutlineInputBorder(borderSide: BorderSide.none),
      ),
    );
  }


}`,
    };
}
exports.custom_textfield = custom_textfield;


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.failure = void 0;
class failure {
    static fileTemplates = {
        failure: ` 
class Failure {
  final String message;
  final StackTrace stackTrace;

  Failure({
    required this.message,
    this.stackTrace = StackTrace.empty,
  });


}`
    };
}
exports.failure = failure;


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.type_def = void 0;
class type_def {
    static fileTemplates = {
        type_def: ` import '../../../../src/core/failure.dart';
import 'package:fpdart/fpdart.dart';

typedef FutureEither<T> = Future<Either<Failure, T>>;
typedef FutureVoid = Future<void>;


`,
    };
}
exports.type_def = type_def;


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.strings = void 0;
class strings {
    static fileTemplates = {
        strings: ` class AppStrings {
  static const appName = "Riverpod app template";
}

class FailureMessage {
  static const getRequestMessage = "GET REQUEST FAILED";
  static const postRequestMessage = "POST REQUEST FAILED";
  static const putRequestMessage = "PUT REQUEST FAILED";
  static const deleteRequestMessage = "DELETE REQUEST FAILED";

  static const jsonParsingFailed = "FAILED TO PARSE JSON RESPONSE";

  static const authTokenEmpty = "AUTH TOKEN EMPTY";

  static const failedToParseJson = "Failed to Parse JSON Data";
}

class SnackBarMessages {
  static const productLoadSuccess = "Products Loaded Successfully";
  static const productLoadFailed = "Failed To Load Products";
}

class LogLabel {
  static const product = "PRODUCT";
  static const auth = "AUTH";
  static const httpGet = "HTTP/GET";
  static const httpPost = "HTTP/POST";
  static const httpPut = "HTTP/PUT";
  static const httpDelete = "HTTP/DELETE";
}

`
    };
}
exports.strings = strings;


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.error_route = void 0;
class error_route {
    static fileTemplates = {
        error_route: ` import 'package:flutter/material.dart';

class ErrorPage extends StatelessWidget {
  const ErrorPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text('ErrorPage router'),
      ),
    );
  }
}

`
    };
}
exports.error_route = error_route;


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.route_transition = void 0;
class route_transition {
    static fileTemplates = {
        route_transition: ` import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

CustomTransitionPage buildPageWithDefaultTransition<T>({
  required BuildContext context,
  required GoRouterState state,
  required Widget child,
}) {
  return CustomTransitionPage<T>(
    key: state.pageKey,
    child: child,
    transitionsBuilder: (context, animation, secondaryAnimation, child) =>
        SlideTransition(
      position: Tween<Offset>(
        begin: const Offset(1.0, 0.0),
        end: Offset.zero,
      ).animate(animation),
      child: child,
    ),
  );
}

CustomTransitionPage buildPageWithFadeTransition<T>({
  required BuildContext context,
  required GoRouterState state,
  required Widget child,
}) {
  return CustomTransitionPage<T>(
    key: state.pageKey,
    child: child,
    transitionsBuilder: (context, animation, secondaryAnimation, child) =>
        FadeTransition(
      opacity: animation,
      child: child,
    ),
  );
}

`
    };
}
exports.route_transition = route_transition;


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.routes = void 0;
class routes {
    static fileTemplates = {
        routes: `
import 'package:course_tracker/src/router/error_route.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class MyAppRouter {
  static final router = GoRouter(
    initialLocation: '/',
    routes: [
      
      // GoRoute(
      //   name: AppRoute.signin,
      //   path: '/signin',
      //   pageBuilder: (context, state) => buildPageWithFadeTransition<void>(
      //       context: context, state: state, child: const SignInPage()),
      // ),
      // GoRoute(
      //   name: AppRoute.signup,
      //   path: '/signup',
      //   pageBuilder: (context, state) => buildPageWithFadeTransition<void>(
      //       context: context, state: state, child: const SignUpPage()),
      // ),
     
    ],
    errorPageBuilder: (context, state) {
      return const MaterialPage(child: ErrorPage());
    },
  );
  static void clearAndNavigate(BuildContext context, String name) {
    while (context.canPop() == true) {
      context.pop();
    }
    context.pushReplacementNamed(name);
  }
}

class AppRoute {
  
  //auth
  static const String signin = 'signin';
  static const String signup = 'signup';
  
}

`,
    };
}
exports.routes = routes;


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tab_bar_theme = void 0;
class tab_bar_theme {
    static fileTemplates = {
        tab_bar_theme: ` import '../../../../src/theme/color_scheme.dart';
import '../../../../src/theme/widget_theme/text_theme.dart';
import 'package:flutter/material.dart';

TabBarTheme get tabBarTheme => TabBarTheme(
      labelStyle: appTextTheme.bodyLarge?.copyWith(
          color: appColorScheme.surface, fontWeight: FontWeight.w400),
      unselectedLabelStyle: appTextTheme.bodyLarge?.copyWith(
          color: appColorScheme.onPrimary.withOpacity(0.7),
          fontWeight: FontWeight.w400),
      indicatorSize: TabBarIndicatorSize.label,
      indicatorColor: Colors.transparent,
    );

`
    };
}
exports.tab_bar_theme = tab_bar_theme;


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.text_theme = void 0;
class text_theme {
    static fileTemplates = {
        text_theme: ` import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

TextTheme get appTextTheme => TextTheme(
      displayLarge: GoogleFonts.poppins(
        fontSize: 57.0,
        fontWeight: FontWeight.w400,
        letterSpacing: -0.25,
      ),
      displayMedium: GoogleFonts.poppins(
        fontSize: 45.0,
        fontWeight: FontWeight.w400,
      ),
      displaySmall: GoogleFonts.poppins(
        fontSize: 36.0,
        fontWeight: FontWeight.w400,
      ),
      headlineLarge: GoogleFonts.poppins(
        fontSize: 32.0,
        fontWeight: FontWeight.w400,
      ),
      headlineMedium: GoogleFonts.poppins(
        fontSize: 22.0,
        fontWeight: FontWeight.w400,
      ),
      headlineSmall: GoogleFonts.poppins(
        fontSize: 20.0,
        fontWeight: FontWeight.bold,
      ),
      titleLarge: GoogleFonts.poppins(
        fontSize: 22.0,
        fontWeight: FontWeight.w500,
      ),
      titleMedium: GoogleFonts.poppins(
        fontSize: 18.0,
        fontWeight: FontWeight.w500,
        letterSpacing: 0.15,
      ),
      titleSmall: GoogleFonts.poppins(
        fontSize: 16.0,
        fontWeight: FontWeight.w500,
        letterSpacing: 0.1,
      ),
      bodyLarge: GoogleFonts.poppins(
        fontSize: 14.0,
        fontWeight: FontWeight.w400,
        letterSpacing: 0.5,
      ),
      bodyMedium: GoogleFonts.poppins(
        fontSize: 14.0,
        fontWeight: FontWeight.w400,
        letterSpacing: 0.25,
      ),
      bodySmall: GoogleFonts.poppins(
        fontSize: 12.0,
        fontWeight: FontWeight.w400,
        letterSpacing: 0.4,
      ),
      labelLarge: GoogleFonts.poppins(
        fontSize: 14.0,
        fontWeight: FontWeight.w500,
        letterSpacing: 1.25,
      ),
      labelMedium: GoogleFonts.poppins(
        fontSize: 12.0,
        fontWeight: FontWeight.w500,
        letterSpacing: 1.25,
      ),
      labelSmall: GoogleFonts.poppins(
        fontSize: 11.0,
        fontWeight: FontWeight.w500,
        letterSpacing: 1.5,
      ),
    );

`,
    };
}
exports.text_theme = text_theme;


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.app_theme = void 0;
class app_theme {
    static fileTemplates = {
        app_theme: ` 
import '../../../../src/theme/widget_theme/tab_bar_theme.dart';

import '../../../../src/theme/widget_theme/text_theme.dart';
import 'package:flutter/material.dart';
import 'color_scheme.dart';

class AppTheme {
  AppTheme._();

  factory AppTheme() {
    return instance;
  }

  static final AppTheme instance = AppTheme._();

  ThemeData get theme => ThemeData(
        useMaterial3: true,
        textTheme: appTextTheme,
        tabBarTheme: tabBarTheme,
        dividerTheme: DividerThemeData(
          color: appColorScheme.outlineVariant.withOpacity(0.1),
        ),
        splashColor: Colors.transparent,
        colorScheme: appColorScheme,
      );

  }
`,
    };
}
exports.app_theme = app_theme;


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.color_scheme = void 0;
class color_scheme {
    static fileTemplates = {
        color_scheme: ` import 'package:flutter/material.dart';

ColorScheme get appColorScheme => const ColorScheme(
      brightness: Brightness.light,
      primary: Color(0xFF558AF0),
      onPrimary: Colors.white,
      primaryContainer: Color(0xffF0F5FA),
      onPrimaryContainer: Color(0xff121223),
      secondary: Color(0xff525FE1),
      onSecondary: Colors.white,
      outline: Color(0xFFF9F9F9),
      outlineVariant: Color(0xFF858C95),
      tertiary: Colors.amber,
      onTertiary: Colors.white,
      error: Colors.red,
      onError: Colors.red,
      surface: Colors.white,
      onSurface: Colors.black,
    );

`,
    };
}
exports.color_scheme = color_scheme;


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.api_helper = void 0;
class api_helper {
    static fileTemplates = {
        api_helper: `
 import 'dart:convert';
import 'dart:developer';
import 'package:http/http.dart';
import 'package:http/http.dart' as http;
import 'package:get/get_connect/http/src/response/response.dart';

import '../../../../src/core/failure.dart';
import 'package:fpdart/fpdart.dart';
import '../../../../src/res/strings.dart';

// final StateProvider<ApiHelper> apiHelperProvider = StateProvider((ref) {
//   final String? authToken = ref.watch(authTokenProvider);
//   print("Auth Token: $authToken");
//   return ApiHelper(authToken: authToken);
// });

class ApiHelper {
  final String? _authToken;

  ApiHelper({required String? authToken}) : _authToken = authToken;

  final Duration _timeoutDuration = const Duration(seconds: 10);

  // Generic GET request
  Future<Either<Failure, http.Response>> getRequest({
    required String endpoint,
    bool requireAuth = true,
  }) async {
    Map<String, String> headers = {
      if (requireAuth) 'Authorization': 'Bearer $_authToken',
      'Content-Type': 'application/json',
    };

    if (requireAuth && (_authToken?.isEmpty ?? true)) {
      return Left(Failure(message: FailureMessage.authTokenEmpty));
    }

    log('REQUEST TO: $endpoint', name: LogLabel.httpGet);
    try {
      final response = await get(Uri.parse(endpoint), headers: headers)
          .timeout(_timeoutDuration);
      return Right(response);
    } catch (e, stackTrace) {
      return Left(
        Failure(
          message: FailureMessage.getRequestMessage,
          stackTrace: stackTrace,
        ),
      );
    }
  }

  // Generic POST request
  Future<Either<Failure, http.Response>> postRequest({
    required String endpoint,
    required dynamic data,
    bool requireAuth = true,
  }) async {
    Map<String, String> headers = {
      if (requireAuth) 'Authorization': 'Bearer $_authToken',
      'Content-Type': 'application/json',
    };

    if (requireAuth && (_authToken?.isEmpty ?? true)) {
      return Left(Failure(message: FailureMessage.authTokenEmpty));
    }

    log('REQUEST TO: $endpoint', name: LogLabel.httpPost);
    try {
      final response = await post(
        Uri.parse(endpoint),
        headers: headers,
        body: jsonEncode(data),
      ).timeout(_timeoutDuration);
      return Right(response);
    } catch (e, stackTrace) {
      return Left(
        Failure(
          message: FailureMessage.postRequestMessage,
          stackTrace: stackTrace,
        ),
      );
    }
  }

  // Generic PUT request
  Future<Either<Failure, http.Response>> putRequest({
    required String endpoint,
    required dynamic data,
    bool requireAuth = true,
  }) async {
    Map<String, String> headers = {
      if (requireAuth) 'Authorization': 'Bearer $_authToken',
      'Content-Type': 'application/json',
    };

    if (requireAuth && (_authToken?.isEmpty ?? true)) {
      return Left(Failure(message: FailureMessage.authTokenEmpty));
    }

    log('REQUEST TO: $endpoint', name: LogLabel.httpPut);
    try {
      final response = await put(
        Uri.parse(endpoint),
        headers: headers,
        body: jsonEncode(data),
      ).timeout(_timeoutDuration);
      return Right(response);
    } catch (e, stackTrace) {
      return Left(
        Failure(
          message: FailureMessage.putRequestMessage,
          stackTrace: stackTrace,
        ),
      );
    }
  }

  // Generic DELETE request
  Future<Either<Failure, http.Response>> deleteRequest({
    required String endpoint,
    required dynamic data,
    bool requireAuth = true,
  }) async {
    Map<String, String> headers = {
      if (requireAuth) 'Authorization': 'Bearer $_authToken',
      'Content-Type': 'application/json',
    };

    if (requireAuth && (_authToken?.isEmpty ?? true)) {
      return Left(Failure(message: FailureMessage.authTokenEmpty));
    }

    log('REQUEST TO: $endpoint', name: LogLabel.httpDelete);
    try {
      final response = await delete(
        Uri.parse(endpoint),
        headers: headers,
        body: jsonEncode(data),
      ).timeout(_timeoutDuration);
      return Right(response);
    } catch (e, stackTrace) {
      return Left(
        Failure(
          message: FailureMessage.deleteRequestMessage,
          stackTrace: stackTrace,
        ),
      );
    }
  }
}

`,
    };
}
exports.api_helper = api_helper;


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.locales = void 0;
class locales {
    static fileTemplates = {
        locales: ` 
class AppTranslation {
  static Map<String, Map<String, String>> translations = {
    'en_US': Locales.en_US,
    // 'es_ES': Locales.es_ES,
    // 'fr_FR': Locales.fr_FR,
    // 'hi_IN': Locales.hi_IN,
    // 'hy_AM': Locales.hy_AM,
    // 'it_IT': Locales.it_IT,
    // 'pt_PT': Locales.pt_PT,
    // 'ru_RU': Locales.ru_RU,
    // 'zh_CN': Locales.zh_CN,
  };
}

class LocaleKeys {
  LocaleKeys._();
  static const english_languages = 'english_languages';
}

class Locales {
  static const en_US = {
    'english_languages': 'English',
  };
}

`
    };
}
exports.locales = locales;


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.api_endpoints = void 0;
class api_endpoints {
    static fileTemplates = {
        api_endpoints: ` class ApiEndpoints {
  static const baseUrl = 'https://.com/api/';
  static const baseImageUrl = 'https://.com/';

  static const signUp = baseUrl + 'sign-up';
  static const signIn = baseUrl + 'sign-in';

  // ***************************** USER ********************************
  static const getUser = baseUrl + 'get-user';

  
  static getImageWithUrl(String image) {
    return baseImageUrl + image;
  }
}

`
    };
}
exports.api_endpoints = api_endpoints;


/***/ }),
/* 30 */
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
exports.YamalUtility = void 0;
const vscode = __importStar(__webpack_require__(1));
const fs = __importStar(__webpack_require__(2));
const path = __importStar(__webpack_require__(3));
class YamalUtility {
    static requiredPackages = {
        google_fonts: "^6.2.1",
        provider: "^6.1.2",
        device_preview: "^1.2.0",
        flutter_svg: "^2.0.10+1",
        google_maps_flutter: "^2.0.6",
        flutter_riverpod: "^2.0.0",
        image_picker: "^1.1.2",
        animated_toggle_switch: "^0.8.2",
        intl: "^0.19.0",
        step_progress_indicator: "^1.0.2",
        go_router: "^14.2.2",
        file_picker: "^8.0.6",
        dotted_border: "^2.1.0",
        like_button: "^2.0.5",
        url_launcher: "^6.3.0",
        dotted_decoration: "^2.0.0",
        get: "^4.6.6",
        loader_overlay: "^4.0.1",
        fpdart: "^1.1.0",
        google_sign_in: "^6.2.1",
        firebase_auth: "^5.1.4",
        firebase_core: "^3.3.0",
        flutter_animate: "^4.5.0",
        sign_in_with_apple: "^6.1.1",
        http: "^1.2.2",
        shared_preferences: "^2.3.2",
        country_code_picker: "^3.0.0",
    };
    static updatePubspecYaml(rootPath) {
        const pubspecPath = path.join(rootPath, "pubspec.yaml");
        if (fs.existsSync(pubspecPath)) {
            let pubspecContent = fs.readFileSync(pubspecPath, "utf-8");
            for (const [pkg, version] of Object.entries(YamalUtility.requiredPackages)) {
                if (!pubspecContent.includes(pkg)) {
                    pubspecContent += `\n  ${pkg}: ${version}`;
                }
            }
            fs.writeFileSync(pubspecPath, pubspecContent);
            vscode.window.showInformationMessage("pubspec.yaml updated with required packages.");
        }
        else {
            vscode.window.showErrorMessage("pubspec.yaml not found.");
        }
    }
}
exports.YamalUtility = YamalUtility;


/***/ }),
/* 31 */
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
exports.FeatureUtils = void 0;
const vscode = __importStar(__webpack_require__(1));
const fs = __importStar(__webpack_require__(2));
const path = __importStar(__webpack_require__(3));
const feature_controller_1 = __webpack_require__(32);
const feature_state_1 = __webpack_require__(33);
const feature_repository_1 = __webpack_require__(34);
class FeatureUtils {
    // Function to get the feature name from the user input
    static async getFeatureName() {
        const featureName = await vscode.window.showInputBox({
            placeHolder: "Enter the name of the feature (e.g., Auth)",
            prompt: "Create new feature folder",
        });
        return featureName;
    }
    // Function to create the folder structure for a given feature
    static createFeatureStructure(rootPath, featureName) {
        if (!featureName) {
            vscode.window.showErrorMessage("Feature name cannot be empty.");
            return;
        }
        const featurePath = path.join(rootPath, "lib", "src", "features", featureName.toLowerCase());
        // Define folder structure inside the feature folder
        const folders = ["controllers", "pages", "repository", "models"];
        // Create the folders
        folders.forEach((folder) => {
            const folderPath = path.join(featurePath, folder);
            fs.mkdirSync(folderPath, { recursive: true });
        });
        // Generate file paths for the files inside the feature
        const controllerFilePath = path.join(featurePath, "controllers", `${featureName.toLowerCase()}_controller.dart`);
        const stateFilePath = path.join(featurePath, "controllers", `${featureName.toLowerCase()}_state.dart`);
        const repositoryFilePath = path.join(featurePath, "repository", `${featureName.toLowerCase()}_repository.dart`);
        // Fetch the file content from FeatureFileTemplates
        const controllerContent = feature_controller_1.Featurecontroller.fileTemplates.controller(featureName);
        const stateContent = feature_state_1.FeatureState.fileTemplates.state(featureName);
        const repositoryContent = feature_repository_1.FeatureRepository.fileTemplates.repository(featureName);
        // Write content to the respective files
        fs.writeFileSync(controllerFilePath, controllerContent);
        fs.writeFileSync(stateFilePath, stateContent);
        fs.writeFileSync(repositoryFilePath, repositoryContent);
        vscode.window.showInformationMessage(`Feature "${capitalize(featureName)}" created successfully!`);
    }
}
exports.FeatureUtils = FeatureUtils;
// Utility function to capitalize the first letter of a string
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Featurecontroller = void 0;
class Featurecontroller {
    static fileTemplates = {
        controller: (featureName) => `
// import 'dart:developer';

// import '../../../common/constants/global_variables.dart';
// import '../../../common/constants/static_data.dart';
// import '../../../common/utils/custom_snakbar.dart';
// import '../../../common/utils/shared_pref_helper.dart';
import '../../../features/${featureName.toLowerCase()}/controllers/${featureName.toLowerCase()}_state.dart';
import '../../../features/${featureName.toLowerCase()}/repository/${featureName.toLowerCase()}_repository.dart';
// import '../../../router/routes.dart';
// import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
// import 'package:go_router/go_router.dart';
// import 'package:loader_overlay/loader_overlay.dart';


// ########################  RiverPod-Providers ############################  //

//final userProvider = StateProvider<UserModel?>((ref) => null);

// final ${featureName.toLowerCase()}ControllerProvider = StateNotifierProvider<${featureName}Controller, ${featureName}State>(
//   (ref) => ${featureName}Controller(
//       ${featureName.toLowerCase()}Repository: ref.read(${featureName.toLowerCase()}RepositoryProvider), ref: ref),
// );
// ############################## -END- ##################################### //
        class ${featureName}Controller extends StateNotifier<${featureName}State>{
          final ${featureName}Repository _${featureName.toLowerCase()}Repository;
  final Ref _ref;
  ${featureName}Controller({required ${featureName}Repository ${featureName.toLowerCase()}Repository, required Ref ref})
      : _${featureName.toLowerCase()}Repository = ${featureName.toLowerCase()}Repository,
        _ref = ref,
        super(const ${featureName}State(
            isLoading: false, isObserver: true, isAuthenticated: false));
              // ##########################   Objects  ################################## //

  // ########################   All-Methods-Calls  ########################## //

  //   Future<UserModel?> getUserData(BuildContext context) async {
  //   try {
  //     final user = await _${featureName.toLowerCase()}Repository.getData();
  //     return user.fold((failure) {
  //       CustomSnackbar.showSnackbar(
  //         context: context,
  //         message: failure.message,
  //         type: SnackbarType.error,
  //       );
  //       return null;
  //     }, (userModel) {
  //       _ref.read(userProvider.notifier).update((state) => userModel);

  //       return userModel;
  //     });
  //   } catch (error) {
  //     CustomSnackbar.showSnackbar(
  //       context: context,
  //       message: error.toString(),
  //       type: SnackbarType.error,
  //     );
  //     return null;
  //   }
  // }

        }
      `,
    };
}
exports.Featurecontroller = Featurecontroller;


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FeatureState = void 0;
class FeatureState {
    static fileTemplates = {
        state: (featureName) => `
        class ${featureName}State {
            final bool isLoading;
  final bool isObserver;
  final bool isAuthenticated;

  const ${featureName}State({
    required this.isLoading,
    required this.isObserver,
    required this.isAuthenticated,
  });

  ${featureName}State copyWith({
    bool? isLoading,
    bool? isObserver,
    bool? isAuthenticated,
  }) {
    return ${featureName}State(
      isLoading: isLoading ?? this.isLoading,
      isObserver: isObserver ?? this.isObserver,
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
    );
  }
        }
      `,
    };
}
exports.FeatureState = FeatureState;


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FeatureRepository = void 0;
class FeatureRepository {
    static fileTemplates = {
        repository: (featureName) => `

// import 'dart:convert';
// import 'dart:developer';
// import 'dart:io';
import '../../../core/api_helper.dart';
// import '../../../core/failure.dart';
// import '../../../core/type_def.dart';
// import '../../../res/api_endpoints.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
// import 'package:fpdart/fpdart.dart';
// import '../../../common/constants/static_data.dart';

//     final ${featureName.toLowerCase()}RepositoryProvider = Provider(
//   (ref) => ${featureName}Repository(
//       apiHelper: ref.read(apiHelperProvider),
//       ${featureName.toLowerCase()}: ref.read(${featureName.toLowerCase()}Provider),
//       googleSignIn: ref.read(googleSignInProvider),
//       ref: ref),
// );
        class ${featureName}Repository {
           ${featureName}Repository({
   
    required ApiHelper apiHelper,
    required Ref ref,
  }) ;
         // Stream<User?> get authStateChange => _auth.authStateChanges();

         // ########################   All-Methods-Calls  ########################## //

         // *************************   Sign In Google  **************************** //
        //  FutureEither signInWithGoogle(bool isFromLogin) async {
        //    try {
        //      UserCredential userCredential;
        //      if (kIsWeb) {
        //        log('kIsWeb run ...');
        //        GoogleAuthProvider googleProvider = GoogleAuthProvider();
        //        googleProvider
        //            .addScope('https://www.googleapis.com/auth/contacts.readonly');
        //        userCredential = await _auth.signInWithPopup(googleProvider);
        //      } else {
        //        log('else kIsWeb run ...');
       
        //        final GoogleSignInAccount? googleUser = await _googleSignIn.signIn();
       
        //        final googleAuth = await googleUser?.authentication;
       
        //        final credential = GoogleAuthProvider.credential(
        //          accessToken: googleAuth?.accessToken,
        //          idToken: googleAuth?.idToken,
        //        );
       
        //        if (isFromLogin) {
        //          userCredential = await _auth.signInWithCredential(credential);
        //        } else {
        //          userCredential =
        //              await _auth.currentUser!.linkWithCredential(credential);
        //        }
        //      }
       
        //      return right(true);
        //    } on FirebaseException catch (e) {
        //      throw e.message!;
        //    } catch (e) {
        //      return left(Failure(message: e.toString()));
        //    }
        //  }
  //        // ******************   Sign Up With Email and Password  ********************* //

  // FutureEither<UserModel> signUpWithEmailPassword({
  //   required String name,
  //   required String username,
  //   required String email,
  //   required String password,
  //   required String phone,
  // }) async {
  //   try {
  //     final result = await _apiHelper.postRequest(
  //         endpoint: ApiEndpoints.signUp,
  //         requireAuth: false,
  //         data: {
  //           'name': name,
  //           
  //         });

  //     return result.fold(
  //       (failure) => Left(failure),
  //       (response) {
  //         final responseBody = json.decode(response.body);

  //         if (response.statusCode == 200 && responseBody.containsKey('user')) {
  //           final userData = responseBody['user'];
  //           final userModel = UserModel.fromJson(userData);
  //           return Right(userModel); // Success response
  //         } else {
  //           String errorMessage = responseBody['error'] ?? 'Unexpected error';
  //           return Left(Failure(message: errorMessage));
  //         }
  //       },
  //     );
  //   } catch (e) {
  //     log('Sign-up error: $e');
  //     return Left(
  //         Failure(message: 'Network error occurred, please try again later.'));
  //   }
  // }
  //   // ***************************   Log Out  *********************************** //
  // void logOut() async {
  //   // Handle logout logic, maybe clearing tokens or notifying the server
  // }
           }
      `,
        // Add other template types if needed
    };
}
exports.FeatureRepository = FeatureRepository;


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Main = void 0;
class Main {
    static fileTemplates = {
        main: `
// Main file template with a placeholder for fileName
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:provider/provider.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart' as riverpod;
import 'package:loader_overlay/loader_overlay.dart';
import 'package:device_preview/device_preview.dart';

import '../../../../firebase_options.dart';
import '../../../../src/common/constants/global_variables.dart';
import '../../../../src/router/routes.dart';
import '../../../../src/theme/app_theme.dart';
import '../../../../generated/locales.g.dart';
import '../../../../src/common/utils/shared_pref_helper.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  await SharedPrefHelper.getInitialValue();
  runApp(
    riverpod.ProviderScope(
      child: MultiProvider(
        providers: [
          // ChangeNotifierProvider(create: (_) => LocationProvider()),
        ],
        child: const MyApp(),
      ),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GlobalLoaderOverlay(
      child: Listener(
        onPointerDown: (_) {
          FocusScopeNode currentFocus = FocusScope.of(context);
          if (!currentFocus.hasPrimaryFocus) {
            currentFocus.focusedChild?.unfocus();
          }
        },
        child: GetMaterialApp.router(
          debugShowCheckedModeBanner: false,
          translationsKeys: AppTranslation.translations,
          fallbackLocale: const Locale('en', 'US'),
          builder: DevicePreview.appBuilder,
          theme: AppTheme.instance.theme,
          routeInformationParser: MyAppRouter.router.routeInformationParser,
          routerDelegate: MyAppRouter.router.routerDelegate,
          routeInformationProvider: MyAppRouter.router.routeInformationProvider,
          scaffoldMessengerKey: scaffoldMessengerKey,
        ),
      ),
    );
  }
}
    `,
    };
}
exports.Main = Main;


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Featurecontroller = void 0;
class Featurecontroller {
    static fileTemplates = {
        controller: (featureName) => `
// import 'dart:developer';

// import '../../../common/constants/global_variables.dart';
// import '../../../common/constants/static_data.dart';
// import '../../../common/utils/custom_snakbar.dart';
// import '../../../common/utils/shared_pref_helper.dart';
import '../../../features/${featureName.toLowerCase()}/controllers/${featureName.toLowerCase()}_state.dart';
import '../../../features/${featureName.toLowerCase()}/repository/${featureName.toLowerCase()}_repository.dart';
// import '../../../router/routes.dart';
// import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
// import 'package:go_router/go_router.dart';
// import 'package:loader_overlay/loader_overlay.dart';


// ########################  RiverPod-Providers ############################  //

//final userProvider = StateProvider<UserModel?>((ref) => null);

// final ${featureName.toLowerCase()}ControllerProvider = StateNotifierProvider<${featureName}Controller, ${featureName}State>(
//   (ref) => ${featureName}Controller(
//       ${featureName.toLowerCase()}Repository: ref.read(${featureName.toLowerCase()}RepositoryProvider), ref: ref),
// );
// ############################## -END- ##################################### //
        class ${featureName}Controller extends StateNotifier<${featureName}State>{
          final ${featureName}Repository _${featureName.toLowerCase()}Repository;
  final Ref _ref;
  ${featureName}Controller({required ${featureName}Repository ${featureName.toLowerCase()}Repository, required Ref ref})
      : _${featureName.toLowerCase()}Repository = ${featureName.toLowerCase()}Repository,
        _ref = ref,
        super(const ${featureName}State(
            isLoading: false, isObserver: true, isAuthenticated: false));
              // ##########################   Objects  ################################## //

  // ########################   All-Methods-Calls  ########################## //

  //   Future<UserModel?> getUserData(BuildContext context) async {
  //   try {
  //     final user = await _${featureName.toLowerCase()}Repository.getData();
  //     return user.fold((failure) {
  //       CustomSnackbar.showSnackbar(
  //         context: context,
  //         message: failure.message,
  //         type: SnackbarType.error,
  //       );
  //       return null;
  //     }, (userModel) {
  //       _ref.read(userProvider.notifier).update((state) => userModel);

  //       return userModel;
  //     });
  //   } catch (error) {
  //     CustomSnackbar.showSnackbar(
  //       context: context,
  //       message: error.toString(),
  //       type: SnackbarType.error,
  //     );
  //     return null;
  //   }
  // }

        }
      `,
    };
}
exports.Featurecontroller = Featurecontroller;


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FeatureState = void 0;
class FeatureState {
    static fileTemplates = {
        state: (featureName) => `
        class ${featureName}State {
            final bool isLoading;
  final bool isObserver;
  final bool isAuthenticated;

  const ${featureName}State({
    required this.isLoading,
    required this.isObserver,
    required this.isAuthenticated,
  });

  ${featureName}State copyWith({
    bool? isLoading,
    bool? isObserver,
    bool? isAuthenticated,
  }) {
    return ${featureName}State(
      isLoading: isLoading ?? this.isLoading,
      isObserver: isObserver ?? this.isObserver,
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
    );
  }
        }
      `,
    };
}
exports.FeatureState = FeatureState;


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FeatureRepository = void 0;
class FeatureRepository {
    static fileTemplates = {
        repository: (featureName) => `

// import 'dart:convert';
// import 'dart:developer';
// import 'dart:io';
import '../../../core/api_helper.dart';
// import '../../../core/failure.dart';
// import '../../../core/type_def.dart';
// import '../../../res/api_endpoints.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
// import 'package:fpdart/fpdart.dart';
// import '../../../common/constants/static_data.dart';

//     final ${featureName.toLowerCase()}RepositoryProvider = Provider(
//   (ref) => ${featureName}Repository(
//       apiHelper: ref.read(apiHelperProvider),
//       ${featureName.toLowerCase()}: ref.read(${featureName.toLowerCase()}Provider),
//       googleSignIn: ref.read(googleSignInProvider),
//       ref: ref),
// );
        class ${featureName}Repository {
           ${featureName}Repository({
   
    required ApiHelper apiHelper,
    required Ref ref,
  }) ;
         // Stream<User?> get authStateChange => _auth.authStateChanges();

         // ########################   All-Methods-Calls  ########################## //

         // *************************   Sign In Google  **************************** //
        //  FutureEither signInWithGoogle(bool isFromLogin) async {
        //    try {
        //      UserCredential userCredential;
        //      if (kIsWeb) {
        //        log('kIsWeb run ...');
        //        GoogleAuthProvider googleProvider = GoogleAuthProvider();
        //        googleProvider
        //            .addScope('https://www.googleapis.com/auth/contacts.readonly');
        //        userCredential = await _auth.signInWithPopup(googleProvider);
        //      } else {
        //        log('else kIsWeb run ...');
       
        //        final GoogleSignInAccount? googleUser = await _googleSignIn.signIn();
       
        //        final googleAuth = await googleUser?.authentication;
       
        //        final credential = GoogleAuthProvider.credential(
        //          accessToken: googleAuth?.accessToken,
        //          idToken: googleAuth?.idToken,
        //        );
       
        //        if (isFromLogin) {
        //          userCredential = await _auth.signInWithCredential(credential);
        //        } else {
        //          userCredential =
        //              await _auth.currentUser!.linkWithCredential(credential);
        //        }
        //      }
       
        //      return right(true);
        //    } on FirebaseException catch (e) {
        //      throw e.message!;
        //    } catch (e) {
        //      return left(Failure(message: e.toString()));
        //    }
        //  }
  //        // ******************   Sign Up With Email and Password  ********************* //

  // FutureEither<UserModel> signUpWithEmailPassword({
  //   required String name,
  //   required String username,
  //   required String email,
  //   required String password,
  //   required String phone,
  // }) async {
  //   try {
  //     final result = await _apiHelper.postRequest(
  //         endpoint: ApiEndpoints.signUp,
  //         requireAuth: false,
  //         data: {
  //           'name': name,
  //           
  //         });

  //     return result.fold(
  //       (failure) => Left(failure),
  //       (response) {
  //         final responseBody = json.decode(response.body);

  //         if (response.statusCode == 200 && responseBody.containsKey('user')) {
  //           final userData = responseBody['user'];
  //           final userModel = UserModel.fromJson(userData);
  //           return Right(userModel); // Success response
  //         } else {
  //           String errorMessage = responseBody['error'] ?? 'Unexpected error';
  //           return Left(Failure(message: errorMessage));
  //         }
  //       },
  //     );
  //   } catch (e) {
  //     log('Sign-up error: $e');
  //     return Left(
  //         Failure(message: 'Network error occurred, please try again later.'));
  //   }
  // }
  //   // ***************************   Log Out  *********************************** //
  // void logOut() async {
  //   // Handle logout logic, maybe clearing tokens or notifying the server
  // }
           }
      `,
        // Add other template types if needed
    };
}
exports.FeatureRepository = FeatureRepository;


/***/ }),
/* 39 */
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
exports.YamalUtility = void 0;
const vscode = __importStar(__webpack_require__(1));
const fs = __importStar(__webpack_require__(2));
const path = __importStar(__webpack_require__(3));
class YamalUtility {
    static requiredPackages = {
        google_fonts: "^6.2.1",
        provider: "^6.1.2",
        device_preview: "^1.2.0",
        flutter_svg: "^2.0.10+1",
        google_maps_flutter: "^2.0.6",
        flutter_riverpod: "^2.0.0",
        image_picker: "^1.1.2",
        animated_toggle_switch: "^0.8.2",
        intl: "^0.19.0",
        step_progress_indicator: "^1.0.2",
        go_router: "^14.2.2",
        file_picker: "^8.0.6",
        dotted_border: "^2.1.0",
        like_button: "^2.0.5",
        url_launcher: "^6.3.0",
        dotted_decoration: "^2.0.0",
        get: "^4.6.6",
        loader_overlay: "^4.0.1",
        fpdart: "^1.1.0",
        google_sign_in: "^6.2.1",
        firebase_auth: "^5.1.4",
        firebase_core: "^3.3.0",
        flutter_animate: "^4.5.0",
        sign_in_with_apple: "^6.1.1",
        http: "^1.2.2",
        shared_preferences: "^2.3.2",
        country_code_picker: "^3.0.0",
    };
    static updatePubspecYaml(rootPath) {
        const pubspecPath = path.join(rootPath, "pubspec.yaml");
        if (fs.existsSync(pubspecPath)) {
            let pubspecContent = fs.readFileSync(pubspecPath, "utf-8");
            for (const [pkg, version] of Object.entries(YamalUtility.requiredPackages)) {
                if (!pubspecContent.includes(pkg)) {
                    pubspecContent += `\n  ${pkg}: ${version}`;
                }
            }
            fs.writeFileSync(pubspecPath, pubspecContent);
            vscode.window.showInformationMessage("pubspec.yaml updated with required packages.");
        }
        else {
            vscode.window.showErrorMessage("pubspec.yaml not found.");
        }
    }
}
exports.YamalUtility = YamalUtility;


/***/ }),
/* 40 */
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
exports.FeatureUtils = void 0;
const vscode = __importStar(__webpack_require__(1));
const fs = __importStar(__webpack_require__(2));
const path = __importStar(__webpack_require__(3));
const feature_controller_1 = __webpack_require__(36);
const feature_state_1 = __webpack_require__(37);
const feature_repository_1 = __webpack_require__(38);
class FeatureUtils {
    // Function to get the feature name from the user input
    static async getFeatureName() {
        const featureName = await vscode.window.showInputBox({
            placeHolder: "Enter the name of the feature (e.g., Auth)",
            prompt: "Create new feature folder",
        });
        return featureName;
    }
    // Function to create the folder structure for a given feature
    static createFeatureStructure(rootPath, featureName) {
        if (!featureName) {
            vscode.window.showErrorMessage("Feature name cannot be empty.");
            return;
        }
        const featurePath = path.join(rootPath, "lib", "src", "features", featureName.toLowerCase());
        // Define folder structure inside the feature folder
        const folders = ["controllers", "pages", "repository", "models"];
        // Create the folders
        folders.forEach((folder) => {
            const folderPath = path.join(featurePath, folder);
            fs.mkdirSync(folderPath, { recursive: true });
        });
        // Generate file paths for the files inside the feature
        const controllerFilePath = path.join(featurePath, "controllers", `${featureName.toLowerCase()}_controller.dart`);
        const stateFilePath = path.join(featurePath, "controllers", `${featureName.toLowerCase()}_state.dart`);
        const repositoryFilePath = path.join(featurePath, "repository", `${featureName.toLowerCase()}_repository.dart`);
        // Fetch the file content from FeatureFileTemplates
        const controllerContent = feature_controller_1.Featurecontroller.fileTemplates.controller(featureName);
        const stateContent = feature_state_1.FeatureState.fileTemplates.state(featureName);
        const repositoryContent = feature_repository_1.FeatureRepository.fileTemplates.repository(featureName);
        // Write content to the respective files
        fs.writeFileSync(controllerFilePath, controllerContent);
        fs.writeFileSync(stateFilePath, stateContent);
        fs.writeFileSync(repositoryFilePath, repositoryContent);
        vscode.window.showInformationMessage(`Feature "${capitalize(featureName)}" created successfully!`);
    }
}
exports.FeatureUtils = FeatureUtils;
// Utility function to capitalize the first letter of a string
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImportsManagerMvvm = void 0;
const app_url_1 = __webpack_require__(42);
const color_1 = __webpack_require__(43);
const internet_exception_widget_1 = __webpack_require__(44);
const loading_widget_1 = __webpack_require__(45);
const network_image_widget_1 = __webpack_require__(46);
const round_button_1 = __webpack_require__(47);
const extensions_1 = __webpack_require__(48);
const routes_1 = __webpack_require__(49);
const routes_name_1 = __webpack_require__(50);
const utils_1 = __webpack_require__(51);
const app_exceptions_1 = __webpack_require__(52);
const base_api_services_1 = __webpack_require__(53);
const network_api_services_1 = __webpack_require__(54);
const api_response_1 = __webpack_require__(55);
const status_1 = __webpack_require__(56);
const generated_plugin_registrant_1 = __webpack_require__(57);
const main_1 = __webpack_require__(58);
exports.ImportsManagerMvvm = {
    Main: main_1.Main,
    generated_plugin_registrant: generated_plugin_registrant_1.generated_plugin_registrant,
    app_url: app_url_1.app_url,
    exceptions: extensions_1.exceptions,
    utils: utils_1.utils,
    color: color_1.color,
    internet_exception_widget: internet_exception_widget_1.internet_exception_widget,
    loading_widget: loading_widget_1.loading_widget,
    app_exceptions: app_exceptions_1.app_exceptions,
    network_image_widget: network_image_widget_1.network_image_widget,
    round_button: round_button_1.round_button,
    routes_name: routes_name_1.routes_name,
    route: routes_1.route,
    base_api_services: base_api_services_1.base_api_services,
    network_api_services: network_api_services_1.network_api_services,
    api_response: api_response_1.api_response,
    status: status_1.status,
};


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.app_url = void 0;
class app_url {
    static fileTemplates = {
        app_url: ` 
class AppUrl {


  // static var baseUrl = 'https://reqres.in' ;
  // static var moviesBaseUrl = 'https://dea91516-1da3-444b-ad94-c6d0c4dfab81.mock.pstmn.io/' ;

  // static var loginEndPint =  '$baseUrl/api/login' ;
 
}
`,
    };
}
exports.app_url = app_url;


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.color = void 0;
class color {
    static fileTemplates = {
        color: `
     import 'package:flutter/material.dart';

class AppColors {

  static const Color blackColor = Color(0x0ff00000);
  static const Color whiteColor = Color(0xFFFFFFFF);
  static const Color buttonColor = Colors.green;

}
`,
    };
}
exports.color = color;


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.internet_exception_widget = void 0;
class internet_exception_widget {
    static fileTemplates = {
        internet_exception_widget: ` 
import 'package:flutter/material.dart';


class InterNetExceptionWidget extends StatefulWidget {
  final VoidCallback onPress;
  const InterNetExceptionWidget({Key? key, required this.onPress})
      : super(key: key);

  @override
  State<InterNetExceptionWidget> createState() =>
      _InterNetExceptionWidgetState();
}

class _InterNetExceptionWidgetState extends State<InterNetExceptionWidget> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Column(
        children: [
          SizedBox(height: MediaQuery.of(context).size.height * .15),
          const Icon(
            Icons.cloud_off,
            color: Colors.red,
            size: 50,
          ),
          Padding(
            padding: const EdgeInsets.only(top: 30),
            child: Center(
              child: Text(
                  'We’re unable to show results.\nPlease check your data\nconnection.',
                  textAlign: TextAlign.center,
                  style: Theme.of(context)
                      .textTheme
                      .displayMedium!
                      .copyWith(fontSize: 20)),
            ),
          ),
          SizedBox(height: MediaQuery.of(context).size.height * .15),
          ElevatedButton(
            onPressed: widget.onPress,
            child: Center(
              child: Text(
                'RETRY',
                style: Theme.of(context)
                    .textTheme
                    .bodySmall,
              ),
            ),
          )
        ],
      ),
    );
  }
}

`,
    };
}
exports.internet_exception_widget = internet_exception_widget;


/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loading_widget = void 0;
class loading_widget {
    static fileTemplates = {
        loading_widget: ` 
    import 'dart:io' show Platform;

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

//custom loading widget, we will used this widget show user some action depending on it's need
// this widget is generic, we can change it and this change will appear across the app
class LoadingWidget extends StatelessWidget {
  final double size;
  const LoadingWidget({Key? key, this.size = 36.0}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: SizedBox(
        width: size,
        height: size,
        child: Platform.isIOS
            ? const CupertinoActivityIndicator(
          color: Colors.blue,
        )
            : const CircularProgressIndicator(
          strokeWidth: 2.0,
          color: Colors.blue,
        ),
      ),
    );
  }
}

`,
    };
}
exports.loading_widget = loading_widget;


/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.network_image_widget = void 0;
class network_image_widget {
    static fileTemplates = {
        network_image_widget: ` 

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'loading_widget.ts';

//custom network image widget, we will used this widget show images, also handled exceptions
// this widget is generic, we can change it and this change will appear across the app
class NetworkImageWidget extends StatelessWidget {
  final String imageUrl;
  final double width, height, borderRadius , iconSize;
  final BoxFit boxFit ;
  const NetworkImageWidget(
      {Key? key,
        required this.imageUrl,
        this.width = 40,
        this.height = 40,
        this.borderRadius = 18 ,
      this.iconSize = 20 ,
        this.boxFit = BoxFit.cover
      })
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return  ClipRRect(
      borderRadius: BorderRadius.circular(borderRadius),
      child: imageUrl == '' ?
      Container(
          width: width,
          height: height,
          decoration: BoxDecoration(
            color: Colors.grey.shade900,
            borderRadius: BorderRadius.circular(borderRadius),
          ),
          child:  Icon(Icons.person_outline , size: iconSize,)) :
      CachedNetworkImage(
        imageUrl: imageUrl,
        width: width,
        height: height,
        imageBuilder: (context, imageProvider) => Container(
          width: width,
          height: height,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(borderRadius),
            image: DecorationImage(
              image: imageProvider,
              fit: boxFit,
            ),
          ),
        ),
        placeholder: (context, url) => Container(
          width: width,
          height: height,
          decoration: BoxDecoration(
            color: Colors.grey.shade900,
            borderRadius: BorderRadius.circular(borderRadius),
          ),
          child: const Padding(
            padding: EdgeInsets.all(12.0),
            child: LoadingWidget(),
          ),
        ),
        errorWidget: (context, url, error) => Container(
            width: width,
            height: height,
            decoration: BoxDecoration(
              color: Colors.grey.shade900,
              borderRadius: BorderRadius.circular(13),
            ),
            child:  Icon(Icons.error_outline , size: iconSize,)),
      ),
    );
  }
}

`,
    };
}
exports.network_image_widget = network_image_widget;


/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.round_button = void 0;
class round_button {
    static fileTemplates = {
        round_button: ` 
import 'package:flutter/material.dart';
import '../color/color.ts';



//custom round button component, we will used this widget show to show button
// this widget is generic, we can change it and this change will appear across the app
class RoundButton extends StatelessWidget {

  final String title ;
  final bool loading ;
  final VoidCallback onPress ;
  const RoundButton({Key? key ,
    required this.title,
    this.loading = false ,
     required this.onPress ,

  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onPress,
      child: Container(
        height: 40,
        width: 200,
        decoration: BoxDecoration(
          color: AppColors.buttonColor,
          borderRadius: BorderRadius.circular(10)
        ),
        child: Center(
            child:loading ? const CircularProgressIndicator(color: Colors.white,) :
            Text(title ,
              style: const TextStyle(color: AppColors.whiteColor),
            )),
      ),
    );
  }
}

`,
    };
}
exports.round_button = round_button;


/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exceptions = void 0;
class exceptions {
    static fileTemplates = {
        exceptions: ` 
    import 'package:flutter/material.dart';

extension MediaQueryValues on BuildContext {
  double get mediaQueryHeight => MediaQuery.sizeOf(this).height;
  double get mediaQueryWidth => MediaQuery.sizeOf(this).width ;
}


extension EmptySpace on num {
  SizedBox get height => SizedBox(height:toDouble());
  SizedBox get width => SizedBox(width:toDouble());
}
`,
    };
}
exports.exceptions = exceptions;


/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.route = void 0;
class route {
    static fileTemplates = {
        routes: ` 
import 'package:flutter/material.dart';
import '../../configs/routes/routes_name.dart';
import '../../view/home/home_view.dart';
import '../../view/login/login_view.dart';
import '../../view/splash/splash_view.dart';

class Routes {

  // static Route<dynamic>  generateRoute(RouteSettings settings){

  //   switch(settings.name){
  //     case RoutesName.splash:
  //       return MaterialPageRoute(builder: (BuildContext context) => const SplashView());

   
  //     default:
  //       return MaterialPageRoute(builder: (_){
  //         return const Scaffold(
  //           body: Center(
  //             child: Text('No route defined'),
  //           ),
  //         );
  //       });

  //   }
  // }
}
`,
    };
}
exports.route = route;


/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.routes_name = void 0;
class routes_name {
    static fileTemplates = {
        routes_name: ` 
class RoutesName {

 // static const String splash = 'splash_view' ;

}
`,
    };
}
exports.routes_name = routes_name;


/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.utils = void 0;
class utils {
    static fileTemplates = {
        utils: ` 

import 'package:another_flushbar/flushbar.dart';
import 'package:another_flushbar/flushbar_route.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

class Utils {


  // we will use this function to shift focus from one text field to another text field
  // we are using to avoid duplications of code
  static void fieldFocusChange(BuildContext context , FocusNode current , FocusNode nextFocus){
    current.unfocus();
    FocusScope.of(context).requestFocus(nextFocus);
  }

  // generic toast message imported from toast package
  // we will utilise this for showing errors or success messages
  static toastMessage(String message){
    Fluttertoast.showToast(
        msg: message,
    backgroundColor: Colors.black,
      textColor: Colors.white,
    );
  }

  //imported this from flush bar package
  // we will utilise this for showing errors or success messages
  static void flushBarErrorMessage(String message, BuildContext context){
    showFlushbar(context: context,
        flushbar: Flushbar(
          forwardAnimationCurve:Curves.decelerate,
          margin: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
          padding: const EdgeInsets.all(15),
          message: message,
          duration: const Duration(seconds: 3),
          borderRadius: BorderRadius.circular(8),
          flushbarPosition: FlushbarPosition.TOP,
          backgroundColor: Colors.red,
          reverseAnimationCurve: Curves.easeInOut,
          positionOffset: 20,
          icon: const Icon(Icons.error , size: 28 , color: Colors.white,),
        )..show(context),

    );

  }


  // we will utilise this for showing errors or success messages
  static snackBar(String message, BuildContext context){
    return ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        backgroundColor: Colors.red,
        content: Text(message ))
    );
  }

}
`,
    };
}
exports.utils = utils;


/***/ }),
/* 52 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.app_exceptions = void 0;
class app_exceptions {
    static fileTemplates = {
        app_exceptions: `
 class AppException implements Exception {

   // ignore: prefer_typing_uninitialized_variables
   final _message;
   // ignore: prefer_typing_uninitialized_variables
   final _prefix;

   AppException([this._message , this._prefix]);

  @override
  String toString(){
    return '$_message$_prefix' ;
  }

}


class FetchDataException extends AppException {

  FetchDataException([String? message]) : super(message,'Error During Communication');
}


class BadRequestException extends AppException {

  BadRequestException([String? message]) : super(message, 'Invalid request');
}


class UnauthorisedException extends AppException {

  UnauthorisedException([String? message]) : super(message,'Unauthorised request');
}


class InvalidInputException extends AppException {

  InvalidInputException([String? message]) : super(message, 'Invalid Input');
}


class NoInternetException extends AppException {

  NoInternetException([String? message]) : super(message,'No Internet Connection');
}

`,
    };
}
exports.app_exceptions = app_exceptions;


/***/ }),
/* 53 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.base_api_services = void 0;
class base_api_services {
    static fileTemplates = {
        base_api_services: ` 
abstract class BaseApiServices {

  Future<dynamic> getGetApiResponse(String url);

  Future<dynamic> getPostApiResponse(String url , dynamic data);

}
`,
    };
}
exports.base_api_services = base_api_services;


/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.network_api_services = void 0;
class network_api_services {
    static fileTemplates = {
        network_api_services: ` 
import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart';
import '../../data/app_exceptions.dart';
import '../../data/network/base_api_services.dart';
import 'package:http/http.dart' as http;

class NetworkApiService implements BaseApiServices {
  @override
  Future getGetApiResponse(String url) async {
    if (kDebugMode) {
      print(url);
    }
    dynamic responseJson;
    try {
      final response =
          await http.get(Uri.parse(url)).timeout(const Duration(seconds: 20));
      responseJson = returnResponse(response);
    } on SocketException {
      throw NoInternetException('');
    } on TimeoutException {
      throw FetchDataException('Network Request time out');
    }

    if (kDebugMode) {
      print(responseJson);
    }
    return responseJson;
  }

  @override
  Future getPostApiResponse(String url, dynamic data) async {
    if (kDebugMode) {
      print(url);
      print(data);
    }

    dynamic responseJson;
    try {
      Response response = await post(Uri.parse(url), body: data)
          .timeout(const Duration(seconds: 10));

      responseJson = returnResponse(response);
    } on SocketException {
      throw NoInternetException('No Internet Connection');
    } on TimeoutException {
      throw FetchDataException('Network Request time out');
    }

    if (kDebugMode) {
      print(responseJson);
    }
    return responseJson;
  }

  dynamic returnResponse(http.Response response) {
    if (kDebugMode) {
      print(response.statusCode);
    }

    switch (response.statusCode) {
      case 200:
        dynamic responseJson = jsonDecode(response.body);
        return responseJson;
      case 400:
        throw BadRequestException(response.body.toString());
      case 500:
      case 404:
        throw UnauthorisedException(response.body.toString());
      default:
        throw FetchDataException(
            'Error occured while communicating with server');
    }
  }
}

`,
    };
}
exports.network_api_services = network_api_services;


/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.api_response = void 0;
class api_response {
    static fileTemplates = {
        api_response: ` 
import '../../data/response/status.dart';
class ApiResponse<T> {

  Status? status ;
  T? data ;
  String? message ;

  ApiResponse(this.status , this.data, this.message);

  ApiResponse.notStarted() : status = Status.notStarted ;

  ApiResponse.loading() : status = Status.loading ;

  ApiResponse.completed(this.data) : status = Status.completed ;

  ApiResponse.error(this.message) : status = Status.error ;


  @override
  String toString(){
    return "Status : $status \n Message : $message \n Data: $data" ;
  }


}
`,
    };
}
exports.api_response = api_response;


/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.status = void 0;
class status {
    static fileTemplates = {
        status: ` 
enum Status { notStarted,loading, completed, error}
`,
    };
}
exports.status = status;


/***/ }),
/* 57 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generated_plugin_registrant = void 0;
class generated_plugin_registrant {
    static fileTemplates = {
        generated_plugin_registrant: ` //
// Generated file. Do not edit.
//

// ignore_for_file: directives_ordering
// ignore_for_file: lines_longer_than_80_chars
// ignore_for_file: depend_on_referenced_packages

import 'package:fluttertoast/fluttertoast_web.dart';
import 'package:shared_preferences_web/shared_preferences_web.dart';

import 'package:flutter_web_plugins/flutter_web_plugins.dart';

// ignore: public_member_api_docs
void registerPlugins(Registrar registrar) {
  FluttertoastWebPlugin.registerWith(registrar);
  SharedPreferencesPlugin.registerWith(registrar);
  registrar.registerMessageHandler();
}

`,
    };
}
exports.generated_plugin_registrant = generated_plugin_registrant;


/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Main = void 0;
class Main {
    static fileTemplates = {
        main: ` 
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import '../repository/auth_api/auth_http_api_repository.dart';
import '../repository/auth_api/auth_repository.dart';
import '../repository/home_api/home_http_api_repository.dart';
import '../repository/home_api/home_repository.dart';
import '../view_model/home/home_view_model.dart';
import '../view_model/login/login_view_model.dart';
import 'package:provider/provider.dart';

import 'configs/routes/routes.dart';
import 'configs/routes/routes_name.dart';


// creating an instance of GetIt
// GetIt is a package used for service locator or to manage dependency injection
GetIt getIt = GetIt.instance;

void main() {
  WidgetsFlutterBinding.ensureInitialized();
 // getIt.registerLazySingleton<HomeRepository>(() => HomeHttpApiRepository());
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        // initializing all the view model crated with Provider to used them across the app
     
        // ChangeNotifierProvider(
        //     create: (_) => HomeViewViewModel(homeRepository: getIt())),
      ],
      child: MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        // this is the initial route indicating from where our app will start
        initialRoute: RoutesName.splash,
        onGenerateRoute: Routes.generateRoute,
      ),
    );
  }
}

`,
    };
}
exports.Main = Main;


/***/ }),
/* 59 */
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
exports.MvvmYamalUtility = void 0;
const vscode = __importStar(__webpack_require__(1));
const fs = __importStar(__webpack_require__(2));
const path = __importStar(__webpack_require__(3));
class MvvmYamalUtility {
    static requiredPackages = {
        fluttertoast: "^8.2.4",
        http: "^1.2.0",
        another_flushbar: "^1.12.30",
        cached_network_image: "^3.3.1",
        get_it: "^7.6.7",
        provider: "^6.1.1",
        shared_preferences: "^2.2.2",
    };
    static updateMvvmPubspecYaml(rootPath) {
        const pubspecPath = path.join(rootPath, "pubspec.yaml");
        if (fs.existsSync(pubspecPath)) {
            let pubspecContent = fs.readFileSync(pubspecPath, "utf-8");
            for (const [pkg, version] of Object.entries(MvvmYamalUtility.requiredPackages)) {
                if (!pubspecContent.includes(pkg)) {
                    pubspecContent += `\n  ${pkg}: ${version}`;
                }
            }
            fs.writeFileSync(pubspecPath, pubspecContent);
            vscode.window.showInformationMessage("pubspec.yaml updated with required packages.");
        }
        else {
            vscode.window.showErrorMessage("pubspec.yaml not found.");
        }
    }
}
exports.MvvmYamalUtility = MvvmYamalUtility;


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