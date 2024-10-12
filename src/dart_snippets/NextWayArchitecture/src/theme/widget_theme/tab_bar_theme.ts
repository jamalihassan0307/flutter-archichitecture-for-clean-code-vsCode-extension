
export class tab_bar_theme {
public static  fileTemplates: { [key: string]: string } = {
tab_bar_theme :  ` import '../../../../src/theme/color_scheme.dart';
import '../../../../src/theme/widget_theme/text_theme.dart';
import 'package:flutter/material.dart';

TabBarTheme get tabBarTheme => TabBarTheme(
      labelStyle: appTextTheme.bodyLarge?.copyWith(
          color: appColorScheme.surface, fontWeight: FontWeight.w400),
      unselectedLabelStyle: appTextTheme.bodyLarge?.copyWith(
          color: appColorScheme.onPrimary.withOpacity(0.7),
          fontWeight: FontWeight.w400),
      indicatorSize: TabBarIndicatorSize.label,
      indicatorColor: Colors.transparent,
    );

}`
};
 }

