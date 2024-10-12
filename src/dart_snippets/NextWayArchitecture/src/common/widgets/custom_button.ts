export class custom_button {
public static  fileTemplates: { [key: string]: string } = {
custom_button :  ` import '../../../../generated/locales.g.dart';
import '../../../../src/common/constants/global_variables.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class CustomButton extends StatelessWidget {
  final VoidCallback onPressed;
  final String text;
  final bool isIcon;
  final Color? bgClr;
  final Color? txtClr;
  final bool isBorder;
  const CustomButton({
    super.key,
    this.isIcon = false,
    this.bgClr,
    this.txtClr,
    this.isBorder = false,
    required this.onPressed,
    this.text = LocaleKeys.button_next,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: MediaQuery.of(context).size.width * 0.9,
      height: 50,
      child: TextButton(
        onPressed: onPressed,
        style: TextButton.styleFrom(
          backgroundColor: bgClr ?? colorScheme(context).primary,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
            side: isBorder
                ? BorderSide(color: colorScheme(context).primary)
                : BorderSide.none,
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            if (isIcon)
              Icon(
                Icons.send,
                color: colorScheme(context).surface,
              ),
            const SizedBox(
              width: 10,
            ),
            Flexible(
              child: Text(
                text.tr,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: textTheme(context).bodyLarge?.copyWith(
                    color: txtClr ?? colorScheme(context).onPrimary,
                    fontWeight: FontWeight.w700),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

}`
};
 }


