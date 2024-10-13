import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as _ from "lodash";
import { firebase_options } from "f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/firebase_options";
import { app_constant } from "f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/common/constants/app_constant";
import { global_variables } from "f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/common/constants/global_variables";
import { image_paths } from "f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/common/constants/image_paths";
import { static_data } from "f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/common/constants/static_data";
import { language_services } from "f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/common/services/language/language_services";
import { custom_snackbar } from "f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/common/utils/custom_snackbar";
import { custom_snakbar } from "f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/common/utils/custom_snakbar";
import { shared_pref_helper } from "f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/common/utils/shared_pref_helper";
import { validation } from "f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/common/utils/validation";
import { custom_button } from "f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/common/widgets/custom_button";
import { custom_textfield } from "f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/common/widgets/custom_textfield";
import { failure } from "f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/core/failure";
import { type_def } from "f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/core/type_def";
import { strings } from "f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/res/strings";
import { error_route } from "f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/router/error_route";
import { route_transition } from "f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/router/route_transition";
import { routes } from "f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/router/routes";
import { tab_bar_theme } from "f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/theme/widget_theme/tab_bar_theme";
import { text_theme } from "f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/theme/widget_theme/text_theme";
import { app_theme } from "f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/theme/app_theme";
import { color_scheme } from "f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/theme/color_scheme";
import { api_helper } from "f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/core/api_helper";
import { locales } from "f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/generated/locales";
import { api_endpoints } from "f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/src/res/api_endpoints";
import { YamalUtility } from "f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/utils/yamal_utils";
import { FeatureUtils } from "f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/utils/feature_utils";
import { Main } from "f:/extention/flutter-archichitecture/src/dart_snippets/NextWayArchitecture/main";
import { Featurecontroller } from "./Features/controllers/feature_controller";
import { FeatureState } from "./Features/controllers/feature_state";
import { FeatureRepository } from "./Features/repository/feature_erpository";

export const ImportsManager = {
  firebase_options,
  Main,
  app_constant,
  global_variables,
  image_paths,
  static_data,
  language_services,
  custom_snackbar,
  custom_snakbar,
  shared_pref_helper,
  validation,
  custom_button,
  custom_textfield,
  failure,
  type_def,
  strings,
  error_route,
  route_transition,
  routes,
  tab_bar_theme,
  text_theme,
  app_theme,
  color_scheme,
  api_helper,
  locales,
  api_endpoints,
  Featurecontroller,
  FeatureState,
  FeatureRepository,
  YamalUtility,
  FeatureUtils,
};
