// import { EgretLoadable } from "egret";
// import ConstantList from "../../appConfig";
// import { useTranslation, withTranslation, Trans } from 'react-i18next';

import { ConstantsList } from "../../appConfig";

// const ShiftWorkTable = EgretLoadable({
//   //loader: () => import("./BsTableExample")
//   loader: () => import("./ShiftWorkTable")
//   //loader: () => import("./AdazzleTable")
//   //loader: () => import("./React15TabulatorSample")
// });
// const ViewComponent = withTranslation()(ShiftWorkTable);

const ShiftWorkRouters = [
  {
    path:  ConstantsList.ROOT_PATH+"salary/shiftwork",
    exact: true,
    // component: ViewComponent
  }
];

export default ShiftWorkRouters;