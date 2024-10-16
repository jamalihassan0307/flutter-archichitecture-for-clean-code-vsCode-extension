export class app_validator {
  public static fileTemplates: { [key: string]: string } = {
    app_validator: ` 
class AppValidator {

  static bool emailValidator(String email) {
    bool emailValid = RegExp(r'^.+@[a-zA-Z]+\.{1}[a-zA-Z]+(\.{0,1}[a-zA-Z]+)$')
        .hasMatch(email);
    return emailValid;
  }

}
`,
  };
}
