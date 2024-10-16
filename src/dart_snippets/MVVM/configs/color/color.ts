export class color {
  public static fileTemplates: { [key: string]: string } = {
    color: `
     import 'package:flutter/material.dart';

class AppColors {

  static const Color blackColor = Color(0x0ff00000);
  static const Color whiteColor = Color(0xFFFFFFFF);
  static const Color buttonColor = Colors.green;

}
`,
  };
}
