export class Featurecontroller {
  public static fileTemplates: {
    [key: string]: (featureName: string) => string;
  } = {
    controller: (featureName: string) => `
// import 'dart:developer';

// import '../../../common/constants/global_variables.dart';
// import '../../../common/constants/static_data.dart';
// import '../../../common/utils/custom_snakbar.dart';
// import '../../../common/utils/shared_pref_helper.dart';
import '../../../features/${featureName.toLowerCase()}/controllers/${featureName.toLowerCase()}_state.dart';
import '../../../features/${featureName.toLowerCase()}/repository/${featureName.toLowerCase()}_repository.dart';
// import '../../../router/routes.dart';
// import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
// import 'package:go_router/go_router.dart';
// import 'package:loader_overlay/loader_overlay.dart';


// ########################  RiverPod-Providers ############################  //

//final userProvider = StateProvider<UserModel?>((ref) => null);

// final ${featureName.toLowerCase()}ControllerProvider = StateNotifierProvider<${featureName}Controller, ${featureName}State>(
//   (ref) => ${featureName}Controller(
//       ${featureName.toLowerCase()}Repository: ref.read(${featureName.toLowerCase()}RepositoryProvider), ref: ref),
// );
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

  //   Future<UserModel?> getUserData(BuildContext context) async {
  //   try {
  //     final user = await _${featureName.toLowerCase()}Repository.getData();
  //     return user.fold((failure) {
  //       CustomSnackbar.showSnackbar(
  //         context: context,
  //         message: failure.message,
  //         type: SnackbarType.error,
  //       );
  //       return null;
  //     }, (userModel) {
  //       _ref.read(userProvider.notifier).update((state) => userModel);

  //       return userModel;
  //     });
  //   } catch (error) {
  //     CustomSnackbar.showSnackbar(
  //       context: context,
  //       message: error.toString(),
  //       type: SnackbarType.error,
  //     );
  //     return null;
  //   }
  // }

        }
      `,
  };
}
