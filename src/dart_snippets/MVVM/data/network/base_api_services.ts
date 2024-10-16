export class base_api_services {
  public static fileTemplates: { [key: string]: string } = {
    base_api_services: ` 
abstract class BaseApiServices {

  Future<dynamic> getGetApiResponse(String url);

  Future<dynamic> getPostApiResponse(String url , dynamic data);

}
`,
  };
}
