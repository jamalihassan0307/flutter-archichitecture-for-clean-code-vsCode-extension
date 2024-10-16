export class Main {
  public static fileTemplates: { [key: string]: string } = {
    main: ` 
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import '../repository/auth_api/auth_http_api_repository.dart';
import '../repository/auth_api/auth_repository.dart';
import '../repository/home_api/home_http_api_repository.dart';
import '../repository/home_api/home_repository.dart';
import '../view_model/home/home_view_model.dart';
import '../view_model/login/login_view_model.dart';
import 'package:provider/provider.dart';

import 'configs/routes/routes.dart';
import 'configs/routes/routes_name.dart';


// creating an instance of GetIt
// GetIt is a package used for service locator or to manage dependency injection
GetIt getIt = GetIt.instance;

void main() {
  WidgetsFlutterBinding.ensureInitialized();
 // getIt.registerLazySingleton<HomeRepository>(() => HomeHttpApiRepository());
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        // initializing all the view model crated with Provider to used them across the app
     
        // ChangeNotifierProvider(
        //     create: (_) => HomeViewViewModel(homeRepository: getIt())),
      ],
      child: MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        // this is the initial route indicating from where our app will start
        initialRoute: RoutesName.splash,
        onGenerateRoute: Routes.generateRoute,
      ),
    );
  }
}

`,
  };
}
