

 export class global_variables {
  public static  fileTemplates: { [key: string]: string } = {
    global_variables:  ` 
 import 'package:flutter/material.dart';

ColorScheme colorScheme(context) => Theme.of(context).colorScheme;

TextTheme textTheme(context) => Theme.of(context).textTheme;

final scaffoldMessengerKey = GlobalKey<ScaffoldMessengerState>();

const String languageText = 'language';
const String isFirstTimeText = 'isFirstTime';
const String isIndividualText = 'isIndividual';
const String isLoggedInText = 'isLoggedIn';
const String isFormFilledText = 'isFormFilled';
const String isFormFilledIndexText = 'isFormFilledIndex';
const String tokenText = 'tokenText';
const String isUserInterestSelectedText = "isUserInterestSelected";
const String addressText = "address";
const String coordinatesLatitudeText = "coordinatesLatitude";
const String coordinatesLongitudeText = "coordinatesLongitude";`
 };
}
 