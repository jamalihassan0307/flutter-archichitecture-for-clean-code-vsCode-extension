import { routes } from "../../../NextWayArchitecture/src/router/routes";

export class route {
  public static fileTemplates: { [key: string]: string } = {
    routes: ` 
import 'package:flutter/material.dart';
import '../../configs/routes/routes_name.dart';

class Routes {
  static Route<dynamic> generateRoute(RouteSettings settings) {
    switch (settings.name) {
      case RoutesName.splash:
        return MaterialPageRoute(
            builder: (BuildContext context) => const Splash());

      default:
        return MaterialPageRoute(builder: (_) {
          return const Scaffold(
            body: Center(
              child: Text('No route defined'),
            ),
          );
        });
    }
  }
}

class Splash extends StatelessWidget {
  const Splash({super.key});

  @override
  Widget build(BuildContext context) {
    return Container();
  }
}

`,
  };
}
