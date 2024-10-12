import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';
import { FirebaseOptions } from './dart_snippets/NextWayArchitecture/firebase_options';
import { AppFileTemplates } from './dart_snippets/NextWayArchitecture/main';
import { app_constant } from './dart_snippets/NextWayArchitecture/src/common/constants/app_constant';
import { global_variables } from './dart_snippets/NextWayArchitecture/src/common/constants/global_variables';
import { image_paths } from './dart_snippets/NextWayArchitecture/src/common/constants/image_paths';
import { static_data } from './dart_snippets/NextWayArchitecture/src/common/constants/static_data';
import { language_services } from './dart_snippets/NextWayArchitecture/src/common/services/language/language_services';
import { custom_snackbar } from './dart_snippets/NextWayArchitecture/src/common/utils/custom_snackbar';
import { custom_snakbar } from './dart_snippets/NextWayArchitecture/src/common/utils/custom_snakbar';
import { shared_preferences } from './dart_snippets/NextWayArchitecture/src/common/utils/shared_pref_helper';
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

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('flutter-architecture.createNextWaysArchitecture', async () => {
    
    // Get the project name (or class name) from the user
    let inputString = await vscode.window.showInputBox({
      prompt: 'Enter project name or class name',
      validateInput: (value) => {
        if (value.length === 0) {
          return 'Project name cannot be empty';
        }
        return null;
      },
    });

    if (!inputString) {
      vscode.window.showErrorMessage('Project name is required.');
      return;
    }

    // Process the project name (you can use Utils.processFileName if needed)
    let projectName = inputString.trim();
    console.debug(`Project Name: ${projectName}`);

    const fileTemplates: { [key: string]: string } = {
      ...AppFileTemplates.getMainFileContent,
      ...FirebaseOptions.fileTemplates,
      ...locales.fileTemplates,
      ...app_constant.fileTemplates,
      ...global_variables.fileTemplates,
      ...image_paths.fileTemplates,
      ...static_data.fileTemplates,
      ...language_services.fileTemplates,
      ...custom_snackbar.fileTemplates,
      ...custom_snakbar.fileTemplates,
      ...shared_preferences.fileTemplates,
      ...validation.fileTemplates,
      ...custom_button.fileTemplates,
      ...custom_textfield.fileTemplates,
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

      // ...AppFileTemplates.fileTemplates,
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
        { "folder": "src/common/utils", "files": ["custom_snackbar.dart", "shared_pref_helper.dart", "validation.dart"] },
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

    for (const folder of architecture.lib) {
      const folderPath = folder.folder ? path.join(rootPath, 'lib', folder.folder) : path.join(rootPath, 'lib');
      fs.mkdirSync(folderPath, { recursive: true });

      for (const file of folder.files) {
        const fileName = file.split('.')[0];
        let fileContent = fileTemplates[fileName] || `// ${fileName} content`;

        // Replace the project name placeholder in the file content
        fileContent = fileContent.replace(/__fileName__/g, projectName);

        const filePath = path.join(folderPath, file);
        fs.writeFileSync(filePath, fileContent, { flag: 'wx' });
      }
    }

    vscode.window.showInformationMessage(`Flutter architecture with Dart files for ${projectName} created successfully!`);
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {
  console.debug('Flutter Architecture Generator: Deactivated');
}
