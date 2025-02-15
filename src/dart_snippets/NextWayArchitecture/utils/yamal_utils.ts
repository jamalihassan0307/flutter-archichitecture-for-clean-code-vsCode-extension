import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as _ from "lodash";

export class YamalUtility {
  static requiredPackages: { [key: string]: string } = {
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

  public static updatePubspecYaml(rootPath: string) {
    const pubspecPath = path.join(rootPath, "pubspec.yaml");

    if (fs.existsSync(pubspecPath)) {
      let pubspecContent = fs.readFileSync(pubspecPath, "utf-8");

      for (const [pkg, version] of Object.entries(
        YamalUtility.requiredPackages
      )) {
        if (!pubspecContent.includes(pkg)) {
          pubspecContent += `\n  ${pkg}: ${version}`;
        }
      }

      fs.writeFileSync(pubspecPath, pubspecContent);
      vscode.window.showInformationMessage(
        "pubspec.yaml updated with required packages."
      );
    } else {
      vscode.window.showErrorMessage("pubspec.yaml not found.");
    }
  }
}
