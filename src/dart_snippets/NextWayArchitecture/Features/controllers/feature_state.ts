export class FeatureState {
  public static fileTemplates: {
    [key: string]: (featureName: string) => string;
  } = {
    state: (featureName: string) => `
        class ${featureName}State {
          // TODO: Add ${featureName} state management logic
        }
      `,
  };
}
