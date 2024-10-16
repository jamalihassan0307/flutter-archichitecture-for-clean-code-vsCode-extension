import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as _ from "lodash";

export class MvvmYamalUtility {
  static requiredPackages: { [key: string]: string } = {
    fluttertoast: "^8.2.4",
    http: "^1.2.0",
    another_flushbar: "^1.12.30",
    cached_network_image: "^3.3.1",
    get_it: "^7.6.7",
    provider: "^6.1.1",
    shared_preferences: "^2.2.2",
  };

  public static updateMvvmPubspecYaml(rootPath: string) {
    const pubspecPath = path.join(rootPath, "pubspec.yaml");

    if (fs.existsSync(pubspecPath)) {
      let pubspecContent = fs.readFileSync(pubspecPath, "utf-8");

      for (const [pkg, version] of Object.entries(
        MvvmYamalUtility.requiredPackages
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
