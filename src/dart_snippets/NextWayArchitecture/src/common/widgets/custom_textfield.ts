export class custom_textfield {
public static  fileTemplates: { [key: string]: string } = {
custom_textfield :  ` import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../constants/global_variables.t';

class CustomTextField extends StatelessWidget {
  final String? hintText;
  final TextEditingController? controller;
  final void Function(String)? onChanged;
  final Widget? suffixIcon;
  final List<TextInputFormatter>? textInputFormatter;
  final bool isVisibleText;
  final Color? fillColor;
  final FormFieldValidator<String>? validator;
  final double? width;
  final TextStyle? hintStyle;
  final TextStyle? suffixStyle;
  final IconData? iconData;
  final int maxLines;
  final TextInputType? keyboardType;
  final bool? readOnly;
  final bool? obscureText;

  const CustomTextField({
    super.key,
    this.iconData,
    this.controller,
    this.textInputFormatter,
    this.suffixStyle,
    this.hintText,
    this.fillColor,
    this.isVisibleText = false,
    this.readOnly = false,
    this.hintStyle,
    this.suffixIcon,
    this.maxLines = 1,
    this.keyboardType,
    this.width,
    this.onChanged,
    this.obscureText = false,
    this.validator,
  });

  @override
  build(BuildContext context) {
    return TextFormField(
      validator: validator,
      inputFormatters: textInputFormatter,
      autovalidateMode: AutovalidateMode.onUserInteraction,
      onChanged: onChanged,
      controller: controller,
      keyboardType: keyboardType,
      maxLines: maxLines,
      readOnly: readOnly!,
      obscureText: obscureText!,
      obscuringCharacter: '●',
      style: textTheme(context).bodyMedium,
      decoration: InputDecoration(
        hintText: hintText,
        hintStyle: hintStyle ??
            textTheme(context)
                .bodyMedium
                ?.copyWith(color: colorScheme(context).outlineVariant),
        fillColor: Colors.transparent,
        contentPadding: EdgeInsets.all(20),
        suffixIcon: suffixIcon,
        suffixStyle: suffixStyle,
        prefixIcon: iconData != null ? Icon(iconData) : null,
        enabledBorder: OutlineInputBorder(
            borderSide: BorderSide(
                color: colorScheme(context).primaryContainer, width: 1),
            borderRadius: BorderRadius.circular(18)),
        focusedBorder: OutlineInputBorder(
            borderSide: BorderSide(
                color: colorScheme(context).primaryContainer, width: 1),
            borderRadius: BorderRadius.circular(18)),
        errorBorder: OutlineInputBorder(
            borderSide: BorderSide(
              color: colorScheme(context).error,
              width: 1,
            ),
            borderRadius: BorderRadius.circular(18)),
        focusedErrorBorder: OutlineInputBorder(
            borderSide: BorderSide(
              color: colorScheme(context).error,
              width: 1,
            ),
            borderRadius: BorderRadius.circular(18)),
        filled: true,
        border: const OutlineInputBorder(borderSide: BorderSide.none),
      ),
    );
  }


}`
};
 }

