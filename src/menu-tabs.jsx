import { lazy } from "react";

export const TabComponents = {
  DashboardDefault: lazy(() => import("../src/views/Dashboard/Default")),
  ManageModelPage: lazy(() => import("../src/views/ManageModel")),
  DefaultPage: lazy(() => import("../src/views/default")),
};
