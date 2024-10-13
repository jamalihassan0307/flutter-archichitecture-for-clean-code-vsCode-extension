
    

import 'dart:ui';
import '../../../../generated/locales.g.dart';

class LanguageServices {
  LanguageServices._();
  static final LanguageServices instance = LanguageServices._();

  factory LanguageServices() {
    return instance;
  }

  Locale onLanguageSelected(String selectedLanguage) {
    switch (selectedLanguage.toLowerCase()) {
      case LocaleKeys.english_languages:
        return const Locale('en', 'US');
      // case LocaleKeys.languages_portuguese:
      //   return const Locale('pt', 'PT');
      default:
        return const Locale('en', 'US');
    }
  }


}