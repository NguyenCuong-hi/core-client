import  {EgretLoadable}  from "../../egret";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const Color = EgretLoadable({
  loader: () => import("./Color")
});

import { ConstantsList } from "../../appConfig";

const ViewComponent = withTranslation()(Color);
const ColorRoutes = [
  {
    path: ConstantsList.ROOT_PATH + "directory/color",
    exact: true,
    component: ViewComponent
  }
];

export default ColorRoutes;