
export class error_route {
public static  fileTemplates: { [key: string]: string } = {
  error_route :  ` import 'package:flutter/material.dart';

class ErrorPage extends StatelessWidget {
  const ErrorPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text('ErrorPage router'),
      ),
    );
  }
}

}`
};
 }

