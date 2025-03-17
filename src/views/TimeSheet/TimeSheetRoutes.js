// // import { EgretLoadable } from "egret";
// import EgretLoadable from "../../../egret/components/EgretLoadable/EgretLoadable";
// import ConstantList from "../../appConfig";
// import { useTranslation, withTranslation, Trans } from 'react-i18next';
// const Agency = EgretLoadable({
//   loader: () => import("./TimeSheet")
// });

import { ConstantsList } from "../../appConfig";

// const ViewComponent = withTranslation()(Agency);
const CategoryRoutesRoutes = [
  {
    path: ConstantsList.ROOT_PATH + "directory/timesheet",
    exact: true,
    // component: ViewComponent
  }
];

export default CategoryRoutesRoutes;