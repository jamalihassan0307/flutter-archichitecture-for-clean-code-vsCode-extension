import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as _ from "lodash";
import { ImportsManager } from "./dart_snippets/NextWayArchitecture/ImportsManager";
import { YamalUtility } from "./dart_snippets/NextWayArchitecture/utils/yamal_utils";
import { FeatureUtils } from "./dart_snippets/NextWayArchitecture/utils/feature_utils";
import { ImportsManagerMvvm } from "./dart_snippets/MVVM/importsManager";
import { MvvmYamalUtility } from "./dart_snippets/MVVM/mvvm_yamal_utils";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "flutter-archichitecture.createNextWaysArchitecture",
    async () => {
      const fileTemplates: { [key: string]: string } = {
        ...ImportsManager.Main.fileTemplates,
        ...ImportsManager.firebase_options.fileTemplates,
        ...ImportsManager.app_constant.fileTemplates,
        ...ImportsManager.global_variables.fileTemplates,
        ...ImportsManager.image_paths.fileTemplates,
        ...ImportsManager.static_data.fileTemplates,
        ...ImportsManager.custom_snackbar.fileTemplates,
        ...ImportsManager.custom_snakbar.fileTemplates,
        ...ImportsManager.shared_pref_helper.fileTemplates,
        ...ImportsManager.validation.fileTemplates,
        ...ImportsManager.custom_button.fileTemplates,
        ...ImportsManager.custom_textfield.fileTemplates,
        ...ImportsManager.error_route.fileTemplates,
        ...ImportsManager.route_transition.fileTemplates,
        ...ImportsManager.routes.fileTemplates,
        ...ImportsManager.tab_bar_theme.fileTemplates,
        ...ImportsManager.text_theme.fileTemplates,
        ...ImportsManager.app_theme.fileTemplates,
        ...ImportsManager.color_scheme.fileTemplates,
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
            files: [],
          },
          {
            folder: "src/common/utils",
            files: [
              "custom_snackbar.dart",
              "custom_snakbar.dart",
              "shared_pref_helper.dart",
            ],
          },
          {
            folder: "src/common/widgets",
            files: ["custom_button.dart", "custom_textfield.dart"],
          },
          { folder: "src/features", files: [] },

          { folder: "src/models", files: [] },
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
      YamalUtility.updatePubspecYaml(rootPath);

      vscode.window.showInformationMessage(
        "Flutter architecture with Dart files created successfully!"
      );
    }
  );
  //##########################################################################
  //##########################################################################
  //####################     F E A T U R E S     #############################
  //##########################################################################
  //##########################################################################

  let featurecmd = vscode.commands.registerCommand(
    "flutter-architecture.createFeature",
    async () => {
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders) {
        vscode.window.showErrorMessage("No workspace folder found.");
        return;
      }

      const rootPath = workspaceFolders[0].uri.fsPath;
      const featureName = await FeatureUtils.getFeatureName();

      if (featureName) {
        FeatureUtils.createFeatureStructure(rootPath, featureName);
      } else {
        vscode.window.showErrorMessage("Feature name is required.");
      }
    }
  );

  //##########################################################################
  //##########################################################################
  //####################          M V V M        #############################
  //##########################################################################
  //##########################################################################

  let mvvm = vscode.commands.registerCommand(
    "flutter-archichitecture.createMVVMArchitecture",
    async () => {
      const fileTemplates: { [key: string]: string } = {
        ...ImportsManagerMvvm.Main.fileTemplates,
        ...ImportsManagerMvvm.generated_plugin_registrant.fileTemplates,
        ...ImportsManagerMvvm.app_url.fileTemplates,
        ...ImportsManagerMvvm.exceptions.fileTemplates,
        ...ImportsManagerMvvm.utils.fileTemplates,
        ...ImportsManagerMvvm.color.fileTemplates,
        ...ImportsManagerMvvm.internet_exception_widget.fileTemplates,
        ...ImportsManagerMvvm.loading_widget.fileTemplates,
        ...ImportsManagerMvvm.app_exceptions.fileTemplates,
        ...ImportsManagerMvvm.network_image_widget.fileTemplates,
        ...ImportsManagerMvvm.round_button.fileTemplates,
        ...ImportsManagerMvvm.routes_name.fileTemplates,
        ...ImportsManagerMvvm.route.fileTemplates,
        ...ImportsManagerMvvm.base_api_services.fileTemplates,
        ...ImportsManagerMvvm.network_api_services.fileTemplates,
        ...ImportsManagerMvvm.api_response.fileTemplates,
        ...ImportsManagerMvvm.status.fileTemplates,
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
      MvvmYamalUtility.updateMvvmPubspecYaml(rootPath);

      vscode.window.showInformationMessage(
        "Flutter architecture with Dart files created successfully!"
      );
    }
  );

  context.subscriptions.push(featurecmd);
  context.subscriptions.push(disposable);
  context.subscriptions.push(mvvm);
}

export function deactivate() {
  console.debug("Flutter Architecture Generator: Deactivated");
}
