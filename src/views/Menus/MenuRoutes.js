// import { EgretLoadable } from "egret";
// import ConstantList from "../../appConfig";
// import { useTranslation, withTranslation, Trans } from 'react-i18next';
// const Menu = EgretLoadable({
//   loader: () => import("./Menu")
// });

import { ConstantsList } from "../../appConfig";

// const ViewComponent = withTranslation()(Menu);
const MenuRoutes = [
  {
    path: ConstantsList.ROOT_PATH + "list/menu",
    exact: true,
    // component: ViewComponent
  }
];

export default MenuRoutes;
