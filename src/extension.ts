import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';
import { firebase_options } from './dart_snippets/NextWayArchitecture/firebase_options';
import { AppFileTemplates } from './dart_snippets/NextWayArchitecture/main';
import { app_constant } from './dart_snippets/NextWayArchitecture/src/common/constants/app_constant';
import { global_variables } from './dart_snippets/NextWayArchitecture/src/common/constants/global_variables';
import { image_paths } from './dart_snippets/NextWayArchitecture/src/common/constants/image_paths';
import { static_data } from './dart_snippets/NextWayArchitecture/src/common/constants/static_data';
import { language_services } from './dart_snippets/NextWayArchitecture/src/common/services/language/language_services';
import { custom_snackbar } from './dart_snippets/NextWayArchitecture/src/common/utils/custom_snackbar';
import { custom_snakbar } from './dart_snippets/NextWayArchitecture/src/common/utils/custom_snakbar';
import { shared_pref_helper } from './dart_snippets/NextWayArchitecture/src/common/utils/shared_pref_helper';
import { validation } from './dart_snippets/NextWayArchitecture/src/common/utils/validation';
import { custom_button } from './dart_snippets/NextWayArchitecture/src/common/widgets/custom_button';
import { custom_textfield } from './dart_snippets/NextWayArchitecture/src/common/widgets/custom_textfield';
import { failure } from './dart_snippets/NextWayArchitecture/src/core/failure';
import { type_def } from './dart_snippets/NextWayArchitecture/src/core/type_def';
import { strings } from './dart_snippets/NextWayArchitecture/src/res/strings';
import { error_route } from './dart_snippets/NextWayArchitecture/src/router/error_route';
import { route_transition } from './dart_snippets/NextWayArchitecture/src/router/route_transition';
import { routes } from './dart_snippets/NextWayArchitecture/src/router/routes';
import { tab_bar_theme } from './dart_snippets/NextWayArchitecture/src/theme/widget_theme/tab_bar_theme';
import { text_theme } from './dart_snippets/NextWayArchitecture/src/theme/widget_theme/text_theme';
import { app_theme } from './dart_snippets/NextWayArchitecture/src/theme/app_theme';
import { color_scheme } from './dart_snippets/NextWayArchitecture/src/theme/color_scheme';
import { api_helper } from './dart_snippets/NextWayArchitecture/src/core/api_helper';
import { locales } from './dart_snippets/NextWayArchitecture/generated/locales';
import { api_endpoints } from './dart_snippets/NextWayArchitecture/src/res/api_endpoints';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('flutter-archichitecture.createNextWaysArchitecture', async () => {
    
    const fileTemplates: { [key: string]: string } = {
      ...AppFileTemplates.fileTemplates,
      ...firebase_options.fileTemplates,
      ...locales.fileTemplates,
      ...app_constant.fileTemplates,
      ...global_variables.fileTemplates,
      ...image_paths.fileTemplates,
      ...static_data.fileTemplates,
      ...language_services.fileTemplates,
      ...custom_snackbar.fileTemplates,
      ...custom_snakbar.fileTemplates,
      ...shared_pref_helper.fileTemplates,
      ...validation.fileTemplates,
      ...custom_button.fileTemplates,
      ...custom_textfield.fileTemplates,
      ...api_endpoints.fileTemplates,
      ...failure.fileTemplates,
      ...type_def.fileTemplates,
      ...api_helper.fileTemplates,
      ...strings.fileTemplates,
      ...error_route.fileTemplates,
      ...route_transition.fileTemplates,
      ...routes.fileTemplates,
      ...tab_bar_theme.fileTemplates,
      ...text_theme.fileTemplates,
      ...app_theme.fileTemplates,
      ...color_scheme.fileTemplates,
    };

    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (!workspaceFolders) {
      vscode.window.showErrorMessage('No workspace folder found.');
      return;
    }

    const rootPath = workspaceFolders[0].uri.fsPath;

    const architecture = {
      "lib": [
        { "files": ["main.dart"] },
        { "files": ["firebase_options.dart"] },
        { "folder": "generated", "files": ["locales.g.dart"] },
        { "folder": "src", "files": [] },
        { "folder": "src/common", "files": [] },
        { "folder": "src/common/constants", "files": ["app_constant.dart", "global_variables.dart", "image_paths.dart", "static_data.dart"] },
        { "folder": "src/common/providers", "files": [] },
        { "folder": "src/common/services/language", "files": ["language_services.dart"] },
        { "folder": "src/common/utils", "files": ["custom_snackbar.dart", "custom_snakbar.dart","shared_pref_helper.dart", "validation.dart"] },
        { "folder": "src/common/widgets", "files": ["custom_button.dart","custom_textfield.dart"] },
        { "folder": "src/features", "files": [] },
        { "folder": "src/core", "files": ["api_helper.dart","failure.dart","type_def.dart"] },
        { "folder": "src/models", "files": [] },
        { "folder": "src/res", "files": ["api_endpoints.dart","strings.dart"] },
        { "folder": "src/router", "files": ["error_route.dart", "route_transition.dart", "routes.dart"] },
        { "folder": "src/theme/widget_theme", "files": ["tab_bar_theme.dart", "text_theme.dart"] },
        { "folder": "src/theme", "files": ["app_theme.dart", "color_scheme.dart"] }
      ]
    };
    
    // Generate architecture files and folders
    for (const folder of architecture.lib) {
      const folderPath = folder.folder ? path.join(rootPath, 'lib', folder.folder) : path.join(rootPath, 'lib');
      fs.mkdirSync(folderPath, { recursive: true });

      for (const file of folder.files) {
        const fileName = file.split('.')[0];
        const fileContent = fileTemplates[fileName];
        const filePath = path.join(folderPath, file);
        fs.writeFileSync(filePath, fileContent, { flag: 'wx' });
      }
    }

    // Call to update pubspec.yaml
    updatePubspecYaml(rootPath);

    vscode.window.showInformationMessage('Flutter architecture with Dart files created successfully!');
  });

  context.subscriptions.push(disposable);
}

// Function to update pubspec.yaml with required packages
function updatePubspecYaml(rootPath: string) {
  const requiredPackages: { [key: string]: string } = {
    "google_fonts": "^6.2.1",
    "provider": "^6.1.2",
    "device_preview": "^1.2.0",
    "flutter_svg": "^2.0.10+1",
    "google_maps_flutter": "^2.0.6",
    "flutter_riverpod": "^2.0.0",
    "image_picker": "^1.1.2",
    "animated_toggle_switch": "^0.8.2",
    "intl": "^0.19.0",
    "step_progress_indicator": "^1.0.2",
    "go_router": "^14.2.2",
    "file_picker": "^8.0.6",
    "dotted_border": "^2.1.0",
    "like_button": "^2.0.5",
    "url_launcher": "^6.3.0",
    "dotted_decoration": "^2.0.0",
    "get": "^4.6.6",
    "loader_overlay": "^4.0.1",
    "fpdart": "^1.1.0",
    "google_sign_in": "^6.2.1",
    "firebase_auth": "^5.1.4",
    "firebase_core": "^3.3.0",
    "flutter_animate": "^4.5.0",
    "sign_in_with_apple": "^6.1.1",
    "http": "^1.2.2",
    "shared_preferences": "^2.3.2",
    "country_code_picker": "^3.0.0"
  };

  const pubspecPath = path.join(rootPath, 'pubspec.yaml');
  
  if (fs.existsSync(pubspecPath)) {
    let pubspecContent = fs.readFileSync(pubspecPath, 'utf-8');

    for (const [pkg, version] of Object.entries(requiredPackages)) {
      if (!pubspecContent.includes(pkg)) {
        pubspecContent += `\n  ${pkg}: ${version}`;
      }
    }

    fs.writeFileSync(pubspecPath, pubspecContent);
    vscode.window.showInformationMessage('pubspec.yaml updated with required packages.');
  } else {
    vscode.window.showErrorMessage('pubspec.yaml not found.');
  }
}

export function deactivate() {
  console.debug('Flutter Architecture Generator: Deactivated');
}
