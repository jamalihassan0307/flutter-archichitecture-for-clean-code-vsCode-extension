export class validation {
  public static fileTemplates: { [key: string]: string } = {
    validation: ` import '../../../../generated/locales.g.dart';
import 'package:get/get.dart';

class Validation {
  // static String? fieldValidation(String? value, String field) {
  //   if (value == null || value.isEmpty) {
  //     return '$/{LocaleKeys.validation_please_fill.tr/} $field';
  //   }
  //   return null;
  // }

  // static String? emaiValidation(String? value) {
  //   String pattern = r'^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,4}$';
  //   RegExp regex = RegExp(pattern);
  //   if (!regex.hasMatch(value!.trim())) {
  //     return LocaleKeys.validation_please_enter_a_valid_email.tr;
  //   }
  //   return null;
  // }

  // static String? usernameValidation(String? value) {
  //   if (value == null || value.isEmpty) {
  //     return LocaleKeys.validation_please_enter_some_text.tr;
  //   }
  //   if (value.length < 3) {
  //     return LocaleKeys
  //         .validation_username_must_be_at_least_3_characters_long.tr;
  //   }
  //   if (value.length > 20) {
  //     return LocaleKeys.validation_username_must_not_exceed_20_characters.tr;
  //   }
  //   if (!RegExp(r'^[a-zA-Z0-9._]+$').hasMatch(value)) {
  //     return LocaleKeys
  //         .validation_username_can_only_contain_letters_numbers_periods_and_underscores
  //         .tr;
  //   }
  //   return null;
  // }

  // static String? passwordValidation(String? value) {
  //   if (value == null || value.isEmpty) {
  //     return LocaleKeys.validation_please_enter_a_password.tr;
  //   }
  //   if (value.length < 6) {
  //     return LocaleKeys.validation_password_is_too_weak.tr;
  //   }
  //   // if (!value.contains(RegExp(r'[A-Z]'))) {
  //   //   return 'Password must contain at least one uppercase letter';
  //   // }
  //   // if (!value.contains(RegExp(r'[a-z]'))) {
  //   //   return 'Password must contain at least one lowercase letter';
  //   // }
  //   // if (!value.contains(RegExp(r'[0-9]'))) {
  //   //   return 'Password must contain at least one digit';
  //   // }
  //   // if (!value.contains(RegExp(r'[!@#$%^&*(),.?":{}|<>]'))) {
  //   //   return 'Password must contain at least one special character';
  //   // }
  //   return null;
  // }

  // static String? confirmPasswordValidation(String? value, String password) {
  //   String? passwordError = passwordValidation(password);
  //   if (passwordError != null) {
  //     return passwordError;
  //   }

  //   if (value == null || value.isEmpty) {
  //     return LocaleKeys.validation_please_confirm_your_password.tr;
  //   }
  //   if (value != password) {
  //     return LocaleKeys.validation_passwords_dont_match.tr;
  //   }
  //   return null;
  // }

  // static String? phoneNumberValidation(String? value) {
  //   if (value == null || value.isEmpty) {
  //     return LocaleKeys.validation_please_enter_a_phone_number.tr;
  //   }
  //   // RegExp regex = RegExp(r'^\+\d{1,3}\d{10,14}$');
  //   RegExp regex = RegExp(r'^\d{10,12}$');
  //   if (!regex.hasMatch(value)) {
  //     return LocaleKeys.validation_please_enter_a_valid_phone_number.tr;
  //   }
  //   return null;
  // } // static String? fieldValidation(String? value, String field) {
  //   if (value == null || value.isEmpty) {
  //     return '$/{LocaleKeys.validation_please_fill.tr/} $field';
  //   }
  //   return null;
  // }

  // static String? emaiValidation(String? value) {
  //   String pattern = r'^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,4}$';
  //   RegExp regex = RegExp(pattern);
  //   if (!regex.hasMatch(value!.trim())) {
  //     return LocaleKeys.validation_please_enter_a_valid_email.tr;
  //   }
  //   return null;
  // }

  // static String? usernameValidation(String? value) {
  //   if (value == null || value.isEmpty) {
  //     return LocaleKeys.validation_please_enter_some_text.tr;
  //   }
  //   if (value.length < 3) {
  //     return LocaleKeys
  //         .validation_username_must_be_at_least_3_characters_long.tr;
  //   }
  //   if (value.length > 20) {
  //     return LocaleKeys.validation_username_must_not_exceed_20_characters.tr;
  //   }
  //   if (!RegExp(r'^[a-zA-Z0-9._]+$').hasMatch(value)) {
  //     return LocaleKeys
  //         .validation_username_can_only_contain_letters_numbers_periods_and_underscores
  //         .tr;
  //   }
  //   return null;
  // }

  // static String? passwordValidation(String? value) {
  //   if (value == null || value.isEmpty) {
  //     return LocaleKeys.validation_please_enter_a_password.tr;
  //   }
  //   if (value.length < 6) {
  //     return LocaleKeys.validation_password_is_too_weak.tr;
  //   }
  //   // if (!value.contains(RegExp(r'[A-Z]'))) {
  //   //   return 'Password must contain at least one uppercase letter';
  //   // }
  //   // if (!value.contains(RegExp(r'[a-z]'))) {
  //   //   return 'Password must contain at least one lowercase letter';
  //   // }
  //   // if (!value.contains(RegExp(r'[0-9]'))) {
  //   //   return 'Password must contain at least one digit';
  //   // }
  //   // if (!value.contains(RegExp(r'[!@#$%^&*(),.?":{}|<>]'))) {
  //   //   return 'Password must contain at least one special character';
  //   // }
  //   return null;
  // }

  // static String? confirmPasswordValidation(String? value, String password) {
  //   String? passwordError = passwordValidation(password);
  //   if (passwordError != null) {
  //     return passwordError;
  //   }

  //   if (value == null || value.isEmpty) {
  //     return LocaleKeys.validation_please_confirm_your_password.tr;
  //   }
  //   if (value != password) {
  //     return LocaleKeys.validation_passwords_dont_match.tr;
  //   }
  //   return null;
  // }

  // static String? phoneNumberValidation(String? value) {
  //   if (value == null || value.isEmpty) {
  //     return LocaleKeys.validation_please_enter_a_phone_number.tr;
  //   }
  //   // RegExp regex = RegExp(r'^\+\d{1,3}\d{10,14}$');
  //   RegExp regex = RegExp(r'^\d{10,12}$');
  //   if (!regex.hasMatch(value)) {
  //     return LocaleKeys.validation_please_enter_a_valid_phone_number.tr;
  //   }
  //   return null;
  // }


}`,
  };
}
