export class FeatureState {
  public static fileTemplates: {
    [key: string]: (featureName: string) => string;
  } = {
    state: (featureName: string) => `
        class ${featureName}State {
            final bool isLoading;
  final bool isObserver;
  final bool isAuthenticated;

  const ${featureName}State({
    required this.isLoading,
    required this.isObserver,
    required this.isAuthenticated,
  });

  ${featureName}State copyWith({
    bool? isLoading,
    bool? isObserver,
    bool? isAuthenticated,
  }) {
    return ${featureName}State(
      isLoading: isLoading ?? this.isLoading,
      isObserver: isObserver ?? this.isObserver,
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
    );
  }
        }
      `,
  };
}
