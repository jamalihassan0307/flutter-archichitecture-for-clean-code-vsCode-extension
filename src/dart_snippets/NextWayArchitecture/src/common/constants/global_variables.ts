

 export class global_variables {
  public static  fileTemplates: { [key: string]: string } = {
    global_variables:  ` 
 import 'package:flutter/material.dart';

ColorScheme colorScheme(context) => Theme.of(context).colorScheme;

TextTheme textTheme(context) => Theme.of(context).textTheme;

final scaffoldMessengerKey = GlobalKey<ScaffoldMessengerState>();


`
 };
}
 