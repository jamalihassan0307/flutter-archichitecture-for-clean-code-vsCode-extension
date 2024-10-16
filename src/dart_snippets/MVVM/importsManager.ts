import { app_url } from "./configs/app_url";
import { color } from "./configs/color/color";
import { internet_exception_widget } from "./configs/components/internet_exception_widget";
import { loading_widget } from "./configs/components/loading_widget";
import { network_image_widget } from "./configs/components/network_image_widget";
import { round_button } from "./configs/components/round_button";
import { exceptions } from "./configs/extensions";
import { route } from "./configs/routes/routes";
import { routes_name } from "./configs/routes/routes_name";
import { utils } from "./configs/utils";
import { app_exceptions } from "./data/app_exceptions";
import { base_api_services } from "./data/network/base_api_services";
import { network_api_services } from "./data/network/network_api_services";
import { api_response } from "./data/response/api_response";
import { status } from "./data/response/status";
import { generated_plugin_registrant } from "./generated_plugin_registrant";
import { Main } from "./main";

export const ImportsManagerMvvm = {
  Main,
  generated_plugin_registrant,
  app_url,
  exceptions,
  utils,
  color,
  internet_exception_widget,
  loading_widget,
  app_exceptions,
  network_image_widget,
  round_button,
  routes_name,
  route,
  base_api_services,
  network_api_services,
  api_response,
  status,
};
