
import { combineReducers } from 'redux';
import loginReducer from '../views/login/loginReducer';

const rootReducer = combineReducers({
  auth: loginReducer,
});
export default rootReducer;
