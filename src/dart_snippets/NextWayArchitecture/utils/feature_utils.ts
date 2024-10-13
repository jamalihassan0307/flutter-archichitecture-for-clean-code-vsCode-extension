import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as _ from "lodash";
import { Featurecontroller } from "../Features/controllers/feature_controller";
import { FeatureState } from "../Features/controllers/feature_state";
import { FeatureRepository } from "../Features/repository/feature_erpository";

export class FeatureUtils {
  // Function to get the feature name from the user input
  static async getFeatureName(): Promise<string | undefined> {
    const featureName = await vscode.window.showInputBox({
      placeHolder: "Enter the name of the feature (e.g., Auth)",
      prompt: "Create new feature folder",
    });
    return featureName;
  }

  // Function to create the folder structure for a given feature
  static createFeatureStructure(rootPath: string, featureName: string) {
    if (!featureName) {
      vscode.window.showErrorMessage("Feature name cannot be empty.");
      return;
    }

    const featurePath = path.join(
      rootPath,
      "lib",
      "src",
      "features",
      featureName.toLowerCase()
    );

    // Define folder structure inside the feature folder
    const folders = ["controllers", "pages", "repository", "models"];

    // Create the folders
    folders.forEach((folder) => {
      const folderPath = path.join(featurePath, folder);
      fs.mkdirSync(folderPath, { recursive: true });
    });

    // Generate file paths for the files inside the feature
    const controllerFilePath = path.join(
      featurePath,
      "controllers",
      `${featureName.toLowerCase()}_controller.dart`
    );
    const stateFilePath = path.join(
      featurePath,
      "controllers",
      `${featureName.toLowerCase()}_state.dart`
    );
    const repositoryFilePath = path.join(
      featurePath,
      "repository",
      `${featureName.toLowerCase()}_repository.dart`
    );

    // Fetch the file content from FeatureFileTemplates
    const controllerContent =
      Featurecontroller.fileTemplates.controller(featureName);
    const stateContent = FeatureState.fileTemplates.state(featureName);
    const repositoryContent =
      FeatureRepository.fileTemplates.repository(featureName);

    // Write content to the respective files
    fs.writeFileSync(controllerFilePath, controllerContent);
    fs.writeFileSync(stateFilePath, stateContent);
    fs.writeFileSync(repositoryFilePath, repositoryContent);

    vscode.window.showInformationMessage(
      `Feature "${capitalize(featureName)}" created successfully!`
    );
  }
}

// Utility function to capitalize the first letter of a string
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
