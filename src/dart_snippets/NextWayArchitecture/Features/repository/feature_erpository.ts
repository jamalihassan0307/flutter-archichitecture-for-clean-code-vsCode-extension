export class FeatureRepository {
  public static fileTemplates: {
    [key: string]: (featureName: string) => string;
  } = {
    repository: (featureName: string) => `
        class ${featureName}Repository {
          // TODO: Add ${featureName} repository logic
        }
      `,
    // Add other template types if needed
  };
}
