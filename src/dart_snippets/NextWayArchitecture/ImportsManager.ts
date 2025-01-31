import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as _ from "lodash";
import { firebase_options } from "../../dart_snippets/NextWayArchitecture/firebase_options";
import { app_constant } from "../../dart_snippets/NextWayArchitecture/src/common/constants/app_constant";
import { global_variables } from "../../dart_snippets/NextWayArchitecture/src/common/constants/global_variables";
import { image_paths } from "../../dart_snippets/NextWayArchitecture/src/common/constants/image_paths";
import { static_data } from "../../dart_snippets/NextWayArchitecture/src/common/constants/static_data";
import { custom_snackbar } from "../../dart_snippets/NextWayArchitecture/src/common/utils/custom_snackbar";
import { custom_snakbar } from "../../dart_snippets/NextWayArchitecture/src/common/utils/custom_snakbar";
import { shared_pref_helper } from "../../dart_snippets/NextWayArchitecture/src/common/utils/shared_pref_helper";
import { validation } from "../../dart_snippets/NextWayArchitecture/src/common/utils/validation";
import { custom_button } from "../../dart_snippets/NextWayArchitecture/src/common/widgets/custom_button";
import { custom_textfield } from "../../dart_snippets/NextWayArchitecture/src/common/widgets/custom_textfield";
import { error_route } from "../../dart_snippets/NextWayArchitecture/src/router/error_route";
import { route_transition } from "../../dart_snippets/NextWayArchitecture/src/router/route_transition";
import { routes } from "../../dart_snippets/NextWayArchitecture/src/router/routes";
import { tab_bar_theme } from "../../dart_snippets/NextWayArchitecture/src/theme/widget_theme/tab_bar_theme";
import { text_theme } from "../../dart_snippets/NextWayArchitecture/src/theme/widget_theme/text_theme";
import { app_theme } from "../../dart_snippets/NextWayArchitecture/src/theme/app_theme";
import { color_scheme } from "../../dart_snippets/NextWayArchitecture/src/theme/color_scheme";
import { YamalUtility } from "../../dart_snippets/NextWayArchitecture/utils/yamal_utils";
import { FeatureUtils } from "../../dart_snippets/NextWayArchitecture/utils/feature_utils";
import { Main } from "../../dart_snippets/NextWayArchitecture/main";

import { Featurecontroller } from "./Features/controllers/feature_controller";
import { FeatureState } from "./Features/controllers/feature_state";
import { FeatureRepository } from "./Features/repository/feature_repository";

export const ImportsManager = {
  firebase_options,
  Main,
  app_constant,
  global_variables,
  image_paths,
  static_data,
  custom_snackbar,
  custom_snakbar,
  shared_pref_helper,
  validation,
  custom_button,
  custom_textfield,
  error_route,
  route_transition,
  routes,
  tab_bar_theme,
  text_theme,
  app_theme,
  color_scheme,
  Featurecontroller,
  FeatureState,
  FeatureRepository,
  YamalUtility,
  FeatureUtils,
};
