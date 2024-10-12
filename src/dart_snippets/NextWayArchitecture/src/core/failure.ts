export class failure {
public static  fileTemplates: { [key: string]: string } = {
failure :  ` 
class Failure {
  final String message;
  final StackTrace stackTrace;

  Failure({
    required this.message,
    this.stackTrace = StackTrace.empty,
  });
}

}`
};
 }
