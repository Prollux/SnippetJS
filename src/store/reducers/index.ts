import { combineReducers } from "redux";
import panelReducer from './panelReducer'

const reducers = combineReducers({
    panels: panelReducer
})

export default reducers
