export class AppFileTemplates {
  public static fileTemplates: { [key: string]: string } = {
    main: `
// Main file template with a placeholder for fileName
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:provider/provider.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart' as riverpod;
import 'package:loader_overlay/loader_overlay.dart';
import 'package:device_preview/device_preview.dart';

import '../../../../firebase_options.dart';
import '../../../../src/common/constants/global_variables.dart';
import '../../../../src/router/routes.dart';
import '../../../../src/theme/app_theme.dart';
import '../../../../generated/locales.g.dart';
import '../../../../src/common/utils/shared_pref_helper.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
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
    return GlobalLoaderOverlay(
      child: Listener(
        onPointerDown: (_) {
          FocusScopeNode currentFocus = FocusScope.of(context);
          if (!currentFocus.hasPrimaryFocus) {
            currentFocus.focusedChild?.unfocus();
          }
        },
        child: GetMaterialApp.router(
          debugShowCheckedModeBanner: false,
          translationsKeys: AppTranslation.translations,
          fallbackLocale: const Locale('en', 'US'),
          builder: DevicePreview.appBuilder,
          theme: AppTheme.instance.theme,
          routeInformationParser: MyAppRouter.router.routeInformationParser,
          routerDelegate: MyAppRouter.router.routerDelegate,
          routeInformationProvider: MyAppRouter.router.routeInformationProvider,
          scaffoldMessengerKey: scaffoldMessengerKey,
        ),
      ),
    );
  }
}
    `,
  };

 
}
