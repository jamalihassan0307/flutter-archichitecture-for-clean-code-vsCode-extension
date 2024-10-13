 class ApiEndpoints {
  static const baseUrl = 'https://.com/api/';
  static const baseImageUrl = 'https://.com/';

  static const signUp = baseUrl + 'sign-up';
  static const signIn = baseUrl + 'sign-in';

  // ***************************** USER ********************************
  static const getUser = baseUrl + 'get-user';

  
  static getImageWithUrl(String image) {
    return baseImageUrl + image;
  }
}

