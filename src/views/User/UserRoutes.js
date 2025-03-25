import  {EgretLoadable} from "../../egret";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { ConstantsList } from "../../appConfig";
const User = EgretLoadable({
  loader: () => import("./User")
});
const ViewComponent = withTranslation()(User);

const UserRoutes = [
  {
    path:  ConstantsList.ROOT_PATH+"user_manager/user",
    exact: true,
    component: ViewComponent
  }
];

export default UserRoutes;
