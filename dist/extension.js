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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(__webpack_require__(1));
const fs = __importStar(__webpack_require__(2));
const path = __importStar(__webpack_require__(3));
const ImportsManager_1 = __webpack_require__(4);
const yamal_utils_1 = __webpack_require__(8);
const feature_utils_1 = __webpack_require__(9);
const importsManager_1 = __webpack_require__(10);
const mvvm_yamal_utils_1 = __webpack_require__(28);
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
const firebase_options_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/firebase_options'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const app_constant_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/common/constants/app_constant'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const global_variables_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/common/constants/global_variables'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const image_paths_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/common/constants/image_paths'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const static_data_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/common/constants/static_data'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const language_services_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/common/services/language/language_services'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const custom_snackbar_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/common/utils/custom_snackbar'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const custom_snakbar_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/common/utils/custom_snakbar'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const shared_pref_helper_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/common/utils/shared_pref_helper'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const validation_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/common/utils/validation'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const custom_button_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/common/widgets/custom_button'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const custom_textfield_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/common/widgets/custom_textfield'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const failure_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/core/failure'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const type_def_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/core/type_def'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const strings_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/res/strings'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const error_route_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/router/error_route'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const route_transition_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/router/route_transition'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const routes_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/router/routes'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const tab_bar_theme_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/theme/widget_theme/tab_bar_theme'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const text_theme_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/theme/widget_theme/text_theme'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const app_theme_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/theme/app_theme'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const color_scheme_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/theme/color_scheme'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const api_helper_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/core/api_helper'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const locales_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/generated/locales'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const api_endpoints_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/res/api_endpoints'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const yamal_utils_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/utils/yamal_utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const feature_utils_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/utils/feature_utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const main_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/main'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const feature_controller_1 = __webpack_require__(5);
const feature_state_1 = __webpack_require__(6);
const feature_repository_1 = __webpack_require__(7);
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
/* 6 */
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
/* 7 */
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
/* 8 */
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
        flutter_riverpod: "^2.0.0",
        image_picker: "^1.1.2",
        go_router: "^14.2.2",
        loader_overlay: "^4.0.1",
        fpdart: "^1.1.0",
        firebase_core: "^3.3.0",
        shared_preferences: "^2.3.2",
        get: "^4.6.6",
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
/* 9 */
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FeatureUtils = void 0;
const vscode = __importStar(__webpack_require__(1));
const fs = __importStar(__webpack_require__(2));
const path = __importStar(__webpack_require__(3));
const feature_controller_1 = __webpack_require__(5);
const feature_state_1 = __webpack_require__(6);
const feature_repository_1 = __webpack_require__(7);
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
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImportsManagerMvvm = void 0;
const app_url_1 = __webpack_require__(11);
const color_1 = __webpack_require__(12);
const internet_exception_widget_1 = __webpack_require__(13);
const loading_widget_1 = __webpack_require__(14);
const network_image_widget_1 = __webpack_require__(15);
const round_button_1 = __webpack_require__(16);
const extensions_1 = __webpack_require__(17);
const routes_1 = __webpack_require__(18);
const routes_name_1 = __webpack_require__(19);
const utils_1 = __webpack_require__(20);
const app_exceptions_1 = __webpack_require__(21);
const base_api_services_1 = __webpack_require__(22);
const network_api_services_1 = __webpack_require__(23);
const api_response_1 = __webpack_require__(24);
const status_1 = __webpack_require__(25);
const generated_plugin_registrant_1 = __webpack_require__(26);
const main_1 = __webpack_require__(27);
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
/* 11 */
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
/* 12 */
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
/* 13 */
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
                  'We’re unable to show results.Please check your data connection.',
                  textAlign: TextAlign.center,
                   maxLines: 3,
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
/* 14 */
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
/* 15 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.network_image_widget = void 0;
class network_image_widget {
    static fileTemplates = {
        network_image_widget: ` 

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'loading_widget.dart';

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
/* 16 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.round_button = void 0;
class round_button {
    static fileTemplates = {
        round_button: ` 
import 'package:flutter/material.dart';
import '../color/color.dart';



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
/* 17 */
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
/* 18 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.route = void 0;
class route {
    static fileTemplates = {
        routes: ` 
import 'package:flutter/material.dart';
import '../../configs/routes/routes_name.dart';

class Routes {
  static Route<dynamic> generateRoute(RouteSettings settings) {
    switch (settings.name) {
      case RoutesName.splash:
        return MaterialPageRoute(
            builder: (BuildContext context) => const Splash());

      default:
        return MaterialPageRoute(builder: (_) {
          return const Scaffold(
            body: Center(
              child: Text('No route defined'),
            ),
          );
        });
    }
  }
}

class Splash extends StatelessWidget {
  const Splash({super.key});

  @override
  Widget build(BuildContext context) {
    return Container();
  }
}

`,
    };
}
exports.route = route;


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.routes_name = void 0;
class routes_name {
    static fileTemplates = {
        routes_name: ` 
class RoutesName {

  static const String splash = 'splash' ;

}
`,
    };
}
exports.routes_name = routes_name;


/***/ }),
/* 20 */
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
/* 21 */
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
/* 22 */
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
/* 23 */
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
/* 24 */
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
    return "Status : $status  Message : $message  Data: $data" ;
  }


}
`,
    };
}
exports.api_response = api_response;


/***/ }),
/* 25 */
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
/* 26 */
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
/* 27 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Main = void 0;
class Main {
    static fileTemplates = {
        main: ` 
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
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
      providers: const [
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
/* 28 */
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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