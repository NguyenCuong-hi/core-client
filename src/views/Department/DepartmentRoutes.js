import  {EgretLoadable} from "../../egret";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { ConstantsList } from "../../appConfig";
const Department = EgretLoadable({
  loader: () => import("./Department")
});
const ViewComponent = withTranslation()(Department);

const departmentRoutes = [
  {
    path:  ConstantsList.ROOT_PATH+"list/department",
    exact: true,
    component: ViewComponent
  }
];

export default departmentRoutes;
