 import '../../../../src/theme/widget_theme/text_theme.dart';
import 'package:flutter/material.dart';
import 'color_scheme.dart';
import 'widget_theme/tab_bar_theme.ts';

class AppTheme {
  AppTheme._();

  factory AppTheme() {
    return instance;
  }

  static final AppTheme instance = AppTheme._();

  ThemeData get theme => ThemeData(
        useMaterial3: true,
        textTheme: appTextTheme,
        tabBarTheme: tabBarTheme,
        dividerTheme: DividerThemeData(
          color: appColorScheme.outlineVariant.withOpacity(0.1),
        ),
        splashColor: Colors.transparent,
        colorScheme: appColorScheme,
      );
}

