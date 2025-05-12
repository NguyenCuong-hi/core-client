import { lazy } from "react";

export const TabComponents = {
  AuthLogin: lazy(() => import("../src/views/Login")),
  ManageUsers: lazy(() => import("../src/views/ManageUsers")),
  AuthRegister: lazy(() => import("../src/views/Register")),
  DashboardDefault: lazy(() => import("../src/views/Dashboard/Default")),
  ManageModelPage: lazy(() => import("../src/views/ManageModel")),
  DefaultPage: lazy(() => import("../src/views/default")),
  ManageModelPageDetails: lazy(() => import("../src/views/ManageModelDetails")),
  ManageCodeSys: lazy(() => import("../src/views/ManageCodeSys")),
  ManageModelDetails: lazy(() => import("../src/views/ManageRouteSet")),
  ManageOperation: lazy(() => import("../src/views/ManageOperation")),
  ManageOperationDetails: lazy(() => import("../src/views/ManageOperationDetails")),
  ManageRouteSetPage: lazy(() => import("../src/views/ManageRouteSet")),
  ManageRouteSetDetails: lazy(() => import("../src/views/ManageRouteSetDetails")),
  ManageMachinePage: lazy(() => import("../src/views/ManageMachine")),
  ManageMachineDetails: lazy(() => import("../src/views/ManageMachineDetails")),
};
