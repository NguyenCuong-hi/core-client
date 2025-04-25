import { lazy } from "react";
import ManageOperation from "views/ManageOperation";

export const TabComponents = {
  DashboardDefault: lazy(() => import("../src/views/Dashboard/Default")),
  ManageModelPage: lazy(() => import("../src/views/ManageModel")),
  DefaultPage: lazy(() => import("../src/views/default")),
  ManageModelPageDetails: lazy(() => import("../src/views/ManageModelDetails")),
  ManageCodeSys: lazy(() => import("../src/views/ManageCodeSys")),
  ManageModelDetails: lazy(() => import("../src/views/ManageRouteSet")),
  ManageOperation: lazy(() => import("../src/views/ManageOperation")),
  ManageOperationDetails: lazy(() => import("../src/views/ManageOperationDetails")),
};
