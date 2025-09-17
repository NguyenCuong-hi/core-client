// third party
import { combineReducers } from 'redux';

// project import
import customizationReducer from './customizationReducer';
import tabReducer from './tabsReducer';
import selectedRow from './selectedRowSlice';
import statusReducer from './statusReducer';

// ==============================|| REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  tab: tabReducer,
  selectedRow: selectedRow,
  statusReducer: statusReducer
});

export default reducer;
