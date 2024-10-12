export class static_data {
    public static  fileTemplates: { [key: string]: string } = {
      static_data:  ` 
      
  class StaticData {
  static bool isFirstTime = true;
  static bool isLoggedIn = false;
  static String token = '';
  static bool isIndividual = true;
  static bool isFormFilled = false;
  static bool isUserInterestSelected = false;
  static int formIndex = 0;
  static String language = '';
  static int dashboardStartingIndex = 0;
  static bool pricingPackageChoosen = false;

  static String address = '';


}`
   };
  }
   




