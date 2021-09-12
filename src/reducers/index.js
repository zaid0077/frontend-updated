import loggedReducer from "./isLogged";
import dashboardReducer from "./dashboard";
import { combineReducers } from "redux"

const allReducers = combineReducers({
    userDetails: loggedReducer,
    dashboardData: dashboardReducer
})


export default allReducers