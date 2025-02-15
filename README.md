<div align="center">
      <h1> <img src="https://img.icons8.com/color/48/000000/flutter.png" width="80px"><br/>Flutter Architecture Generator</h1>
      <h3>A Powerful VS Code Extension for Clean Flutter Architecture</h3>
</div>

<p align="center">
    <a href="https://marketplace.visualstudio.com/items?itemName=7jsscmp4zaio626xj6rxx77zhgeosa4yry5vhbr3hu7gcgt4k73q.flutter-archichitecture" target="_blank">
        <img alt="" src="https://img.shields.io/visual-studio-marketplace/v/7jsscmp4zaio626xj6rxx77zhgeosa4yry5vhbr3hu7gcgt4k73q.flutter-archichitecture?style=for-the-badge&logo=visualstudiocode&logoColor=white&label=VS%20Code%20Marketplace" style="vertical-align:center" />
    </a>
    <a href="https://github.com/jamalihassan0307" target="_blank">
        <img alt="" src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" style="vertical-align:center" />
    </a>
    <a href="https://www.linkedin.com/in/jamalihassan0307/" target="_blank">
        <img alt="" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" style="vertical-align:center" />
    </a>
</p>

# 📌 Overview

Flutter Architecture Generator is a VS Code extension that helps developers quickly scaffold Flutter projects with clean architecture patterns. It supports both NextWay Architecture and MVC patterns, providing pre-configured templates and essential dependencies.

# 🚀 Features

## NextWay Architecture

Generate a complete Flutter project structure with:

```bash
lib/
  ├── main.dart
  ├── src/
  │   ├── common/
  │   │   ├── constants/
  │   │   ├── services/
  │   │   ├── utils/
  │   │   └── widgets/
  │   ├── core/
  │   ├── features/
  │   ├── router/
  │   └── theme/
```

## MVVM Architecture

Create a modern MVVM structure with:

```bash
lib/
  ├── models/
  │   └── data_models/
  ├── views/
  │   ├── screens/
  │   └── widgets/
  ├── viewmodels/
  ├── services/
  │   ├── api/
  │   └── local/
  ├── utils/
  └── core/
      ├── constants/
      ├── theme/
      └── routes/
```

## MVC Architecture

Create a clean MVC structure with:

```bash
lib/
  ├── controllers/
  ├── models/
  ├── views/
  ├── core/
  │   ├── constants/
  │   ├── theme/
  │   └── routes/
  └── data/
      ├── network/
      └── app_exceptions/
```

## Feature Generator

Quickly scaffold new features with all necessary files:

```bash
lib/src/features/your_feature/
  ├── controllers/
  │   ├── your_feature_controller.dart
  │   └── your_feature_state.dart
  ├── models/
  ├── pages/
  └── repository/
      └── your_feature_repository.dart
```

# 🛠️ Tech Stack

![Flutter](https://img.shields.io/badge/Flutter-%2302569B.svg?style=for-the-badge&logo=Flutter&logoColor=white)
![Dart](https://img.shields.io/badge/dart-%230175C2.svg?style=for-the-badge&logo=dart&logoColor=white)
![VS Code](https://img.shields.io/badge/VS%20Code-%23007ACC.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

# 📦 Installation

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "flutter-archichitecture" Or "NextWay Architecture"
4. Click Install

Or install from [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=7jsscmp4zaio626xj6rxx77zhgeosa4yry5vhbr3hu7gcgt4k73q.flutter-archichitecture)

# 🎯 Usage

1. Open Command Palette (Ctrl+Shift+P)
2. Choose your architecture or feature:
   - Type "Create NextWay's Architecture" for NextWay pattern
   - Type "Create MVVM Architecture" for MVVM pattern
   - Type "Create MVC Architecture" for MVC pattern
   - Type "Create Feature" to generate a new feature structure
3. For feature generation:
   - Enter the feature name when prompted
   - The extension will create all necessary files with boilerplate code
4. The extension will:
   - Create the folder structure
   - Generate boilerplate files
   - Add required dependencies
   - Set up state management
   - Configure routing (if applicable)

# 📚 Included Dependencies

```yaml
dependencies:
  # UI & Styling
  google_fonts: ^6.2.1
  flutter_svg: ^2.0.10+1

  # State Management
  provider: ^6.1.2
  flutter_riverpod: ^2.0.0
  get: ^4.6.6

  # Navigation
  go_router: ^14.2.2

  # Networking
  dio: ^5.4.0

  # Utils
  device_preview: ^1.2.0
  image_picker: ^1.1.2
  loader_overlay: ^4.0.1
  fpdart: ^1.1.0

  # Storage
  shared_preferences: ^2.3.2

  # Firebase
  firebase_core: ^3.3.0
```

# 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

<p align="center">
  Made with ❤️ by <a href="https://github.com/jamalihassan0307">Jam ali Hassan</a>
</p>

# 💡 Key Benefits

- **Multiple Architecture Patterns**: Choose between NextWay, MVVM, or MVC based on your project needs
- **Feature-First Development**: Quickly scaffold new features with proper structure
- **Clean Architecture**: Promotes separation of concerns and maintainable code
- **Boilerplate Reduction**: Save time with pre-configured templates
- **Best Practices**: Follows Flutter/Dart coding standards
- **State Management**: Integrated solutions with Provider, Riverpod, and GetX
