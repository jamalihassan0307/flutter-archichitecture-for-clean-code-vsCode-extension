
export class color_scheme {
public static  fileTemplates: { [key: string]: string } = {
color_scheme :  ` import 'package:flutter/material.dart';

ColorScheme get appColorScheme => const ColorScheme(
      brightness: Brightness.light,
      primary: Color(0xFF558AF0),
      onPrimary: Colors.white,
      primaryContainer: Color(0xffF0F5FA),
      onPrimaryContainer: Color(0xff121223),
      secondary: Color(0xff525FE1),
      onSecondary: Colors.white,
      outline: Color(0xFFF9F9F9),
      outlineVariant: Color(0xFF858C95),
      tertiary: Colors.amber,
      onTertiary: Colors.white,
      error: Colors.red,
      onError: Colors.red,
      surface: Colors.white,
      onSurface: Colors.black,
    );

}`
};
 }

