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
    context.subscriptions.push(featurecmd);
    context.subscriptions.push(disposable);
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