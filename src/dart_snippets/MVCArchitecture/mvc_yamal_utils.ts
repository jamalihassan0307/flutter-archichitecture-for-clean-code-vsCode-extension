import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export class MVCYamalUtility {
  static requiredPackages: { [key: string]: string } = {
    dio: "^5.4.0",
  };

  public static updateMVCPubspecYaml(rootPath: string) {
    const pubspecPath = path.join(rootPath, "pubspec.yaml");

    if (fs.existsSync(pubspecPath)) {
      let pubspecContent = fs.readFileSync(pubspecPath, "utf-8");

      // Find the dependencies section
      const dependenciesMatch = pubspecContent.match(/dependencies:\s*\n/);
      if (dependenciesMatch) {
        const insertPosition =
          dependenciesMatch.index! + dependenciesMatch[0].length;

        // Add packages after the flutter: sdk entry
        for (const [pkg, version] of Object.entries(
          MVCYamalUtility.requiredPackages
        )) {
          if (!pubspecContent.includes(pkg + ":")) {
            const flutterSdkMatch = pubspecContent.match(/sdk:\s*flutter\s*\n/);
            if (flutterSdkMatch) {
              const position =
                flutterSdkMatch.index! + flutterSdkMatch[0].length;
              pubspecContent =
                pubspecContent.slice(0, position) +
                `  ${pkg}: ${version}\n` +
                pubspecContent.slice(position);
            }
          }
        }

        fs.writeFileSync(pubspecPath, pubspecContent);
        vscode.window.showInformationMessage(
          "pubspec.yaml updated with MVC required packages."
        );
      } else {
        vscode.window.showErrorMessage(
          "Could not find dependencies section in pubspec.yaml"
        );
      }
    } else {
      vscode.window.showErrorMessage("pubspec.yaml not found.");
    }
  }
}
