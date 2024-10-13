export class Featurecontroller {
  public static fileTemplates: {
    [key: string]: (featureName: string) => string;
  } = {
    controller: (featureName: string) => `
    import 'package:careercenter_app/src/router/routes.dart';
    import 'package:flutter/material.dart';
    import 'package:flutter_riverpod/flutter_riverpod.dart';
    import 'package:go_router/go_router.dart';
    import 'package:loader_overlay/loader_overlay.dart';




// ########################  RiverPod-Providers ############################  //

//final userProvider = StateProvider<UserModel?>((ref) => null);

final ${featureName.toLowerCase()}ControllerProvider = StateNotifierProvider<${featureName}Controller, ${featureName}State>(
  (ref) => ${featureName}Controller(
      ${featureName.toLowerCase()}Repository: ref.read(${featureName.toLowerCase()}RepositoryProvider), ref: ref),
);
// ############################## -END- ##################################### //
        class ${featureName}Controller extends StateNotifier<${featureName}State>{
          final ${featureName}Repository _${featureName.toLowerCase()}Repository;
  final Ref _ref;
  ${featureName}Controller({required ${featureName}Repository ${featureName.toLowerCase()}Repository, required Ref ref})
      : _${featureName.toLowerCase()}Repository = ${featureName.toLowerCase()}Repository,
        _ref = ref,
        super(const ${featureName}State(
            isLoading: false, isObserver: true, isAuthenticated: false));
              // ##########################   Objects  ################################## //

  // ########################   All-Methods-Calls  ########################## //
        }
      `,
  };
}
