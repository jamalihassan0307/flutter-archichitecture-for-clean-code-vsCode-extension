Here’s the updated `README.md` based on the new functionality provided by your VS Code extension:

---

# Flutter Architecture Generator for Clean Code

Flutter Architecture Generator for Clean Code is a Visual Studio Code extension that helps developers quickly scaffold a Flutter project with a clean architecture using pre-defined templates. It creates essential files and folders with boilerplate code and updates the `pubspec.yaml` with the required dependencies.

## Features

### 1. Generate Architecture

The extension allows you to generate a well-organized Flutter project structure based on a clean architecture pattern. It supports the following folder and file structure:

```bash
-- lib
    |-- main.dart
    |-- firebase_options.dart
    |-- generated
        |-- locales.g.dart
    |-- src
        |-- common
            |-- constants
                |-- app_constant.dart
                |-- global_variables.dart
                |-- image_paths.dart
                |-- static_data.dart
            |-- services
                |-- language
                    |-- language_services.dart
            |-- utils
                |-- custom_snackbar.dart
                |-- custom_snakbar.dart
                |-- shared_pref_helper.dart
                |-- validation.dart
            |-- widgets
                |-- custom_button.dart
                |-- custom_textfield.dart
        |-- core
            |-- api_helper.dart
            |-- failure.dart
            |-- type_def.dart
        |-- res
            |-- api_endpoints.dart
            |-- strings.dart
        |-- router
            |-- error_route.dart
            |-- route_transition.dart
            |-- routes.dart
        |-- theme
            |-- app_theme.dart
            |-- color_scheme.dart
            |-- widget_theme
                |-- tab_bar_theme.dart
                |-- text_theme.dart
```

The generated structure promotes modularity and reusability, which enhances project scalability and maintainability.

### 2. Automatic Dependency Management

When you generate the project structure, the extension also updates your `pubspec.yaml` file with essential dependencies for Flutter development. The following packages are added:

```yaml
dependencies:
  google_fonts: ^6.2.1
  provider: ^6.1.2
  device_preview: ^1.2.0
  flutter_svg: ^2.0.10+1
  flutter_riverpod: ^2.0.0
  image_picker: ^1.1.2
  go_router: ^14.2.2
  # url_launcher: ^6.3.0
  get: ^4.6.6
  loader_overlay: ^4.0.1
  fpdart: ^1.1.0
  firebase_core: ^3.3.0
  shared_preferences: ^2.3.2
```

These dependencies enable a variety of functionality, such as Firebase integration, authentication, state management, routing, UI utilities, and more.

### 3. Boilerplate Code Templates

This extension provides pre-defined code templates for various commonly used files like:

- `main.dart`
- `firebase_options.dart`
- **Constants** (e.g., `app_constant.dart`, `global_variables.dart`)
- **Services** (e.g., `language_services.dart`)
- **Utilities** (e.g., `custom_snackbar.dart`, `shared_pref_helper.dart`)
- **Widgets** (e.g., `custom_button.dart`, `custom_textfield.dart`)
- **Core Files** (e.g., `api_helper.dart`, `failure.dart`)
- **Router** (e.g., `error_route.dart`, `routes.dart`)
- **Theme** (e.g., `app_theme.dart`, `color_scheme.dart`, `text_theme.dart`)

### 4. Easy Setup

To use the extension:

1. Open your Flutter project in Visual Studio Code.
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS).
3. Type `Flutter: Create NextWay's Architecture` and press Enter.
4. The extension will create the folder and file structure and update the `pubspec.yaml` file with the necessary dependencies.

### 5. Pre-configured File Templates

The generated files come with pre-configured code templates that are ready to use, making it easy to start working on your project without worrying about the initial setup.

## Installation

You can install this extension from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/).

Alternatively, you can clone this repository and install the extension manually using the following commands:

```bash
git clone https://github.com/jamalihassan0307/flutter-architecture-generator.git
cd flutter-architecture-generator
vsce package
code --install-extension flutter-architecture-generator-0.0.1.vsix
```

## Contribution

Contributions are welcome! Feel free to fork this repository, make improvements, and submit pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
