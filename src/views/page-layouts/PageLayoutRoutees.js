import { EgretLoadable } from "../../egret";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { ConstantsList } from "../../appConfig";
const LeftSidebarLayout = EgretLoadable({
  loader: () => import("./LeftSidebarCard")
});

const UserProfile = EgretLoadable({
  loader: () => import("./UserProfile")
});
const ViewComponent = withTranslation()(UserProfile);

const pageLayoutRoutes = [
  {
    path:  ConstantsList.ROOT_PATH+"page-layouts/Left-sidebar-card",
    component: LeftSidebarLayout
  },
  {
    path:  ConstantsList.ROOT_PATH+"page-layouts/user-profile",
    component: ViewComponent
  }
];

export default pageLayoutRoutes;
