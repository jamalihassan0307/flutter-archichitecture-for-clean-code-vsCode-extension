
export class language_services {
  public static  fileTemplates: { [key: string]: string } = {
    language_services:  `
    

import 'dart:ui';
import '../../../../generated/locales.g.ts';

class LanguageServices {
  LanguageServices._();
  static final LanguageServices instance = LanguageServices._();

  factory LanguageServices() {
    return instance;
  }

  Locale onLanguageSelected(String selectedLanguage) {
    switch (selectedLanguage.toLowerCase()) {
      case LocaleKeys.languages_english:
        return const Locale('en', 'US');
      // case LocaleKeys.languages_portuguese:
      //   return const Locale('pt', 'PT');
      default:
        return const Locale('en', 'US');
    }
  }
}

}`
 };
}
 



