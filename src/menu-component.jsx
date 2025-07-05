import { lazy } from "react";

export const TabComponents = {
  AuthLogin: lazy(() => import("./views/Login")),
  ManageUsers: lazy(() => import("./views/ManageUsers")),
  AuthRegister: lazy(() => import("./views/Register")),
  DashboardDefault: lazy(() => import("./views/Dashboard/Default")),
  ManageModelPage: lazy(() => import("./views/ManageModel")),
  DefaultPage: lazy(() => import("./views/default")),
  ManageModelPageDetails: lazy(() => import("./views/ManageModelDetails")),
  ManageCodeSys: lazy(() => import("./views/ManageCodeSys")),
  ManageModelDetails: lazy(() => import("./views/ManageRouteSet")),
  ManageOperation: lazy(() => import("./views/ManageOperation")),
  ManageOperationDetails: lazy(() => import("./views/ManageOperationDetails")),
  ManageRouteSetPage: lazy(() => import("./views/ManageRouteSet")),
  ManageRouteSetDetails: lazy(() => import("./views/ManageRouteSetDetails")),
  ManageMachinePage: lazy(() => import("./views/ManageMachine")),
  ManageMachineDetails: lazy(() => import("./views/ManageMachineDetails")),
  ManageMenu: lazy(() => import("./views/ManageMenu")),
};
