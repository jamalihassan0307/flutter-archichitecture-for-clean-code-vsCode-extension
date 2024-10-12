
export class routes {
public static  fileTemplates: { [key: string]: string } = {
routes :  ` import '../../../../src/features/auth/pages/sign_in_page.dart';
import '../../../../src/features/auth/pages/sign_up_page.dart';

class MyAppRouter {
  static final router = GoRouter(
    initialLocation: '/',
    routes: [
      
      GoRoute(
        name: AppRoute.signin,
        path: '/signin',
        pageBuilder: (context, state) => buildPageWithFadeTransition<void>(
            context: context, state: state, child: const SignInPage()),
      ),
      GoRoute(
        name: AppRoute.signup,
        path: '/signup',
        pageBuilder: (context, state) => buildPageWithFadeTransition<void>(
            context: context, state: state, child: const SignUpPage()),
      ),
     
    ],
    errorPageBuilder: (context, state) {
      return const MaterialPage(child: ErrorPage());
    },
  );
  static void clearAndNavigate(BuildContext context, String name) {
    while (context.canPop() == true) {
      context.pop();
    }
    context.pushReplacementNamed(name);
  }
}

class AppRoute {
  
  //auth
  static const String signin = 'signin';
  static const String signup = 'signup';
  
}

`
};
 }

