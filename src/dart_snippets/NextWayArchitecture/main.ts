export class Main {
  public static fileTemplates: { [key: string]: string } = {
    main: `
// Main file template with a placeholder for fileName
// import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart' as riverpod;

import '../../../../src/common/utils/shared_pref_helper.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  // await Firebase.initializeApp(
  //   options: DefaultFirebaseOptions.currentPlatform,
  // );
  await SharedPrefHelper.getInitialValue();
  runApp(
    riverpod.ProviderScope(
      child: MultiProvider(
        providers: [
          // ChangeNotifierProvider(create: (_) => LocationProvider()),
        ],
        child: const MyApp(),
      ),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Container(),
    );
  }
}

    `,
  };
}
