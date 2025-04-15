// third party
import { combineReducers } from 'redux';

// project import
import customizationReducer from './customizationReducer';
import tabReducer from './tabsReducer';

// ==============================|| REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  tab: tabReducer
});

export default reducer;
