import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { MVCYamalUtility } from "./mvc_yamal_utils";

export class MVCManager {
  static fileTemplates = {
    app_exceptions: `
class AppExceptions implements Exception {
  final _message;
  final _prefix;

  AppExceptions([this._message, this._prefix]);

  String toString() {
    return '$_prefix$_message';
  }
}

class InternetException extends AppExceptions {
  InternetException([String? message]) : super(message, 'No internet');
}

class RequestTimeOut extends AppExceptions {
  RequestTimeOut([String? message]) : super(message, 'Request Time out');
}

class ServerException extends AppExceptions {
  ServerException([String? message]) : super(message, 'Internal server error');
}

class InvalidUrlException extends AppExceptions {
  InvalidUrlException([String? message]) : super(message, 'Invalid Url');
}

class FetchDataException extends AppExceptions {
  FetchDataException([String? message]) : super(message, '');
}`,

    network_api_services: `
import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:dio/dio.dart' as dio;
import '../app_exceptions/app_exceptions.dart';
import 'api_store.dart';
import 'base_api_services.dart';

class NetworkApiServices extends BaseApiServices {
  @override
  Future<dynamic> getApi(String url) async {
    if (kDebugMode) {
      print(url);
    }

    dynamic responseJson;
    try {
      final response =
          await httpClient().get(url).timeout(const Duration(seconds: 20));
      responseJson = returnResponse(response);
    } on SocketException {
      throw InternetException('');
    } on RequestTimeOut {
      throw RequestTimeOut('');
    }
    print(responseJson);
    return responseJson;
  }

  @override
  Future<dynamic> postApi(String url, var data) async {
    if (kDebugMode) {
      print(url);
      print(data);
    }

    dynamic responseJson;
    try {
      final response = await httpClient()
          .post(url, data: data)
          .timeout(const Duration(seconds: 10));
      responseJson = returnResponse(response);
    } on SocketException {
      throw InternetException('');
    } on RequestTimeOut {
      throw RequestTimeOut('');
    }
    if (kDebugMode) {
      print(responseJson);
    }
    return responseJson;
  }

  @override
  Future<dynamic> putApi(String url, var data) async {
    if (kDebugMode) {
      print(url);
      print(data);
    }

    dynamic responseJson;
    try {
      final response = await httpClient()
          .put(url, data: data)
          .timeout(const Duration(seconds: 20));
      responseJson = returnResponse(response);
    } on SocketException {
      throw InternetException('');
    } on RequestTimeOut {
      throw RequestTimeOut('');
    }
    if (kDebugMode) {
      print(responseJson);
    }
    return responseJson;
  }

  @override
  Future<dynamic> deleteApi(String url) async {
    if (kDebugMode) {
      print(url);
    }

    dynamic responseJson;
    try {
      final response =
          await httpClient().delete(url).timeout(const Duration(seconds: 20));
      responseJson = returnResponse(response);
    } on SocketException {
      throw InternetException('');
    } on RequestTimeOut {
      throw RequestTimeOut('');
    }
    print(responseJson);
    return responseJson;
  }

  dynamic returnResponse(dio.Response response) {
    switch (response.statusCode) {
      case 200:
        dynamic responseJson = response;
        return responseJson;
      case 400:
        dynamic responseJson = response;
        return responseJson;
      default:
        throw FetchDataException(
            'Error occurred while communicating with server ' +
                response.statusCode.toString());
    }
  }
}`,

    api_store: `
import 'package:dio/dio.dart';
import '../../core/constants/static_variables.dart';

Dio httpClient() {
  final options = BaseOptions(
      baseUrl: StaticVariables.url,
      headers: {"Content-Type": "application/json", ...getAuthHeader()});

  return Dio(options);
}

Dio httpClientNoToken() {
  final options = BaseOptions(baseUrl: StaticVariables.url, headers: {
    "Content-Type": "application/json",
  });

  return Dio(options);
}

Dio httpFormDataClient() {
  final options = BaseOptions(
      baseUrl: StaticVariables.url,
      headers: {"Content-Type": "multipart/form-data", ...getAuthHeader()});
  return Dio(options);
}

Dio httpSignup() {
  final options = BaseOptions(baseUrl: StaticVariables.url, headers: {
    "Content-Type": "multipart/form-data",
  });
  return Dio(options);
}

Map<String, String> getAuthHeader() {
  return {
    "Authorization": "Bearer \${StaticVariables.tokenid}",
  };
}`,

    base_api_services: `
abstract class BaseApiServices {
  Future<dynamic> getApi(String url);
  Future<dynamic> postApi(String url, dynamic data);
  Future<dynamic> putApi(String url, dynamic data);
  Future<dynamic> deleteApi(String url);
}`,

    api_response: `
import 'status.dart';

class ApiResponse<T> {
  Status? status;
  T? data;
  String? message;

  ApiResponse(this.status, this.data, this.message);

  ApiResponse.loading() : status = Status.LOADING;
  ApiResponse.completed(this.data) : status = Status.COMPLETED;
  ApiResponse.error(this.message) : status = Status.ERROR;

  @override
  String toString() {
    return "Status : $status  Message : $message  Data: $data";
  }
}`,

    status: `
enum Status { LOADING, COMPLETED, ERROR }`,

    static_variables: `
class StaticVariables {
  static String url = 'YOUR_API_BASE_URL';
  static String tokenid = '';
}`,

    main: `
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'MVC Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('MVC Demo'),
        centerTitle: true,
      ),
      body: Container(
        padding: const EdgeInsets.all(20),
        width: double.infinity,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Colors.blue.shade100,
                borderRadius: BorderRadius.circular(10),
                boxShadow: [
                  BoxShadow(
                    color: Colors.grey.withOpacity(0.5),
                    spreadRadius: 2,
                    blurRadius: 5,
                    offset: const Offset(0, 3),
                  ),
                ],
              ),
              child: const Column(
                children: [
                  Icon(Icons.check_circle_outline, size: 50, color: Colors.blue),
                  SizedBox(height: 20),
                  Text(
                    'MVC Structure Created Successfully!',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}`,
  };

  static createMVCStructure(rootPath: string) {
    const directories = [
      "lib/controllers",
      "lib/models",
      "lib/views",
      "lib/core",
      "lib/core/constants",
      "lib/core/theme",
      "lib/core/routes",
      "lib/data",
      "lib/data/network",
      "lib/data/app_exceptions",
    ];

    // Create directories
    directories.forEach((dir) => {
      const fullPath = path.join(rootPath, dir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
    });

    // Create files with templates
    const files = [
      {
        path: "lib/main.dart",
        content: this.fileTemplates.main,
      },
      {
        path: "lib/data/app_exceptions/app_exceptions.dart",
        content: this.fileTemplates.app_exceptions,
      },
      {
        path: "lib/data/network/network_api_services.dart",
        content: this.fileTemplates.network_api_services,
      },
      {
        path: "lib/data/network/api_store.dart",
        content: this.fileTemplates.api_store,
      },
      {
        path: "lib/data/network/base_api_services.dart",
        content: this.fileTemplates.base_api_services,
      },
      {
        path: "lib/data/network/api_response.dart",
        content: this.fileTemplates.api_response,
      },
      {
        path: "lib/data/network/status.dart",
        content: this.fileTemplates.status,
      },
      {
        path: "lib/core/constants/static_variables.dart",
        content: this.fileTemplates.static_variables,
      },
    ];

    files.forEach((file) => {
      const filePath = path.join(rootPath, file.path);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        fs.writeFileSync(filePath, file.content);
      }
    });

    // Update pubspec.yaml with required packages
    MVCYamalUtility.updateMVCPubspecYaml(rootPath);

    vscode.window.showInformationMessage(
      "MVC Architecture created successfully!"
    );
  }
}
