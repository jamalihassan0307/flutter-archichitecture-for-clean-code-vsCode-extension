export class shared_pref_helper {
public static  fileTemplates: { [key: string]: string } = {
  shared_pref_helper :  ` import '../../../../src/common/constants/global_variables.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';
 import '../../../src/common/constants/static_data.dart';


class SharedPrefHelper {
  static late SharedPreferences _prefs;

  static getInitialValue() async {
    _prefs = await SharedPreferences.getInstance();
    StaticData.language = await getString(languageText) ?? '';
    StaticData.isFirstTime = await getBool(isFirstTimeText) ?? true;
    StaticData.isIndividual = await getBool(isIndividualText) ?? true;
    StaticData.isLoggedIn = await getBool(isLoggedInText) ?? false;
    StaticData.isFormFilled = await getBool(isFormFilledText) ?? false;
    StaticData.isUserInterestSelected =
        await getBool(isUserInterestSelectedText) ?? false;
    StaticData.formIndex = await getInt(isFormFilledIndexText) ?? 0;
    StaticData.token = await getString(tokenText) ?? '';
    StaticData.address = await getString(addressText) ?? '';
  
  }

  // Save a string value
  static saveString(String key, String value) async {
    await _prefs.setString(key, value);
  }

  // Retrieve a string value
  static getString(String key) async {
    return _prefs.getString(key);
  }

  // Save a boolean value
  static saveBool(String key, bool value) async {
    await _prefs.setBool(key, value);
  }

  // Retrieve a boolean value
  static getBool(String key) async {
    return _prefs.getBool(key);
  }

  // Save an integer value
  static saveInt(String key, int value) async {
    await _prefs.setInt(key, value);
  }

  // Retrieve an integer value
  static getInt(String key) async {
    return _prefs.getInt(key);
  }

  // Save a double value
  static saveDouble(String key, double value) async {
    await _prefs.setDouble(key, value);
  }

  // Retrieve a double value
  static getDouble(String key) async {
    return _prefs.getDouble(key);
  }

  // Remove a value
  static remove(String key) async {
    await _prefs.remove(key);
  }

  // Clear all values
  static clearAll() async {
    await _prefs.clear();
  }


}`
};
 }

