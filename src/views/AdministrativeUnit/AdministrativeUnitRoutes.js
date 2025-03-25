import EgretLoadable from "egret"
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { ConstantsList } from "../../appConfig";
const AdministrativeUnitTable = EgretLoadable({
  loader: () => import("./AdministrativeUnitTable")
});
const React15TabulatorSample = EgretLoadable({
	  loader: () => import("./React15TabulatorSample")
	});
const ViewComponent = withTranslation()(AdministrativeUnitTable);
const ViewTabuComponent = withTranslation()(React15TabulatorSample);

const administrativeUnitRoutes = [
  {
    path:  ConstantsList.ROOT_PATH+"dashboard/AdministrativeUnits",
    exact: true,
    component: ViewComponent
  },
  {
	    path:  ConstantsList.ROOT_PATH+"dashboard/TabuAdministrativeUnits",
	    exact: true,
	    component: ViewTabuComponent
  }  
];

export default administrativeUnitRoutes;
