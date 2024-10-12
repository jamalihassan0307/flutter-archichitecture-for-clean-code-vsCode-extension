
export class api_helper {
public static  fileTemplates: { [key: string]: string } = {
api_helper :  `
 import 'dart:convert';
import 'dart:developer';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fpdart/fpdart.dart';
import 'package:http/http.dart';
import '../../../../src/res/strings.dart';
import '../common/providers/common_providers.dart';
import 'core.dart';

final StateProvider<ApiHelper> apiHelperProvider = StateProvider((ref) {
  final String? authToken = ref.watch(authTokenProvider);
  print("Auth Token: $authToken");
  return ApiHelper(authToken: authToken);
});

class ApiHelper {
  final String? _authToken;

  ApiHelper({required String? authToken}) : _authToken = authToken;

  final Duration _timeoutDuration = const Duration(seconds: 10);

  // Generic GET request
  Future<Either<Failure, Response>> getRequest({
    required String endpoint,
    bool requireAuth = true,
  }) async {
    Map<String, String> headers = {
      if (requireAuth) 'Authorization': 'Bearer $_authToken',
      'Content-Type': 'application/json',
    };

    if (requireAuth && (_authToken?.isEmpty ?? true)) {
      return Left(Failure(message: FailureMessage.authTokenEmpty));
    }

    log('REQUEST TO: $endpoint', name: LogLabel.httpGet);
    try {
      final response = await get(Uri.parse(endpoint), headers: headers)
          .timeout(_timeoutDuration);
      return Right(response);
    } catch (e, stackTrace) {
      return Left(
        Failure(
          message: FailureMessage.getRequestMessage,
          stackTrace: stackTrace,
        ),
      );
    }
  }

  // Generic POST request
  Future<Either<Failure, Response>> postRequest({
    required String endpoint,
    required dynamic data,
    bool requireAuth = true,
  }) async {
    Map<String, String> headers = {
      if (requireAuth) 'Authorization': 'Bearer $_authToken',
      'Content-Type': 'application/json',
    };

    if (requireAuth && (_authToken?.isEmpty ?? true)) {
      return Left(Failure(message: FailureMessage.authTokenEmpty));
    }

    log('REQUEST TO: $endpoint', name: LogLabel.httpPost);
    try {
      final response = await post(
        Uri.parse(endpoint),
        headers: headers,
        body: jsonEncode(data),
      ).timeout(_timeoutDuration);
      return Right(response);
    } catch (e, stackTrace) {
      return Left(
        Failure(
          message: FailureMessage.postRequestMessage,
          stackTrace: stackTrace,
        ),
      );
    }
  }

  // Generic PUT request
  Future<Either<Failure, Response>> putRequest({
    required String endpoint,
    required dynamic data,
    bool requireAuth = true,
  }) async {
    Map<String, String> headers = {
      if (requireAuth) 'Authorization': 'Bearer $_authToken',
      'Content-Type': 'application/json',
    };

    if (requireAuth && (_authToken?.isEmpty ?? true)) {
      return Left(Failure(message: FailureMessage.authTokenEmpty));
    }

    log('REQUEST TO: $endpoint', name: LogLabel.httpPut);
    try {
      final response = await put(
        Uri.parse(endpoint),
        headers: headers,
        body: jsonEncode(data),
      ).timeout(_timeoutDuration);
      return Right(response);
    } catch (e, stackTrace) {
      return Left(
        Failure(
          message: FailureMessage.putRequestMessage,
          stackTrace: stackTrace,
        ),
      );
    }
  }

  // Generic DELETE request
  Future<Either<Failure, Response>> deleteRequest({
    required String endpoint,
    required dynamic data,
    bool requireAuth = true,
  }) async {
    Map<String, String> headers = {
      if (requireAuth) 'Authorization': 'Bearer $_authToken',
      'Content-Type': 'application/json',
    };

    if (requireAuth && (_authToken?.isEmpty ?? true)) {
      return Left(Failure(message: FailureMessage.authTokenEmpty));
    }

    log('REQUEST TO: $endpoint', name: LogLabel.httpDelete);
    try {
      final response = await delete(
        Uri.parse(endpoint),
        headers: headers,
        body: jsonEncode(data),
      ).timeout(_timeoutDuration);
      return Right(response);
    } catch (e, stackTrace) {
      return Left(
        Failure(
          message: FailureMessage.deleteRequestMessage,
          stackTrace: stackTrace,
        ),
      );
    }
  }
}
`
};
}