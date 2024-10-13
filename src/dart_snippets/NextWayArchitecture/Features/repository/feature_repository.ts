export class FeatureRepository {
  public static fileTemplates: {
    [key: string]: (featureName: string) => string;
  } = {
    repository: (featureName: string) => `

// import 'dart:convert';
// import 'dart:developer';
// import 'dart:io';
import '../../../core/api_helper.dart';
// import '../../../core/failure.dart';
// import '../../../core/type_def.dart';
// import '../../../res/api_endpoints.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
// import 'package:fpdart/fpdart.dart';
// import '../../../common/constants/static_data.dart';

//     final ${featureName.toLowerCase()}RepositoryProvider = Provider(
//   (ref) => ${featureName}Repository(
//       apiHelper: ref.read(apiHelperProvider),
//       ${featureName.toLowerCase()}: ref.read(${featureName.toLowerCase()}Provider),
//       googleSignIn: ref.read(googleSignInProvider),
//       ref: ref),
// );
        class ${featureName}Repository {
           ${featureName}Repository({
   
    required ApiHelper apiHelper,
    required Ref ref,
  }) ;
         // Stream<User?> get authStateChange => _auth.authStateChanges();

         // ########################   All-Methods-Calls  ########################## //

         // *************************   Sign In Google  **************************** //
        //  FutureEither signInWithGoogle(bool isFromLogin) async {
        //    try {
        //      UserCredential userCredential;
        //      if (kIsWeb) {
        //        log('kIsWeb run ...');
        //        GoogleAuthProvider googleProvider = GoogleAuthProvider();
        //        googleProvider
        //            .addScope('https://www.googleapis.com/auth/contacts.readonly');
        //        userCredential = await _auth.signInWithPopup(googleProvider);
        //      } else {
        //        log('else kIsWeb run ...');
       
        //        final GoogleSignInAccount? googleUser = await _googleSignIn.signIn();
       
        //        final googleAuth = await googleUser?.authentication;
       
        //        final credential = GoogleAuthProvider.credential(
        //          accessToken: googleAuth?.accessToken,
        //          idToken: googleAuth?.idToken,
        //        );
       
        //        if (isFromLogin) {
        //          userCredential = await _auth.signInWithCredential(credential);
        //        } else {
        //          userCredential =
        //              await _auth.currentUser!.linkWithCredential(credential);
        //        }
        //      }
       
        //      return right(true);
        //    } on FirebaseException catch (e) {
        //      throw e.message!;
        //    } catch (e) {
        //      return left(Failure(message: e.toString()));
        //    }
        //  }
  //        // ******************   Sign Up With Email and Password  ********************* //

  // FutureEither<UserModel> signUpWithEmailPassword({
  //   required String name,
  //   required String username,
  //   required String email,
  //   required String password,
  //   required String phone,
  // }) async {
  //   try {
  //     final result = await _apiHelper.postRequest(
  //         endpoint: ApiEndpoints.signUp,
  //         requireAuth: false,
  //         data: {
  //           'name': name,
  //           
  //         });

  //     return result.fold(
  //       (failure) => Left(failure),
  //       (response) {
  //         final responseBody = json.decode(response.body);

  //         if (response.statusCode == 200 && responseBody.containsKey('user')) {
  //           final userData = responseBody['user'];
  //           final userModel = UserModel.fromJson(userData);
  //           return Right(userModel); // Success response
  //         } else {
  //           String errorMessage = responseBody['error'] ?? 'Unexpected error';
  //           return Left(Failure(message: errorMessage));
  //         }
  //       },
  //     );
  //   } catch (e) {
  //     log('Sign-up error: $e');
  //     return Left(
  //         Failure(message: 'Network error occurred, please try again later.'));
  //   }
  // }
  //   // ***************************   Log Out  *********************************** //
  // void logOut() async {
  //   // Handle logout logic, maybe clearing tokens or notifying the server
  // }
           }
      `,
    // Add other template types if needed
  };
}
