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
