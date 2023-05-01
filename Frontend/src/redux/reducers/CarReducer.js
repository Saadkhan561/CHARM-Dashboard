import * as ActionTypes from "../actions/ActionTypes";

const INITIAL_STATE = {
  duration: {},
  selectedCarInfo: {},
  trendData: {},
  cardetails: {},
  last_record: {},
  selectedDashboardCarInfo: {},
  dashboard_hourly_avg_rpm: {},
  dashboard_weekly_avg_rpm: {},
  dashboard_hourly_avg_speed: {},
  dashboard_weekly_avg_speed: {},
  dashboard_hourly_avg_fuel: {},
  dashboard_weekly_avg_fuel: {},
};
const CarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.SET_SELECTED_CAR:
      return {
        ...state,
        selectedCarInfo: action.payload,
      };
    case ActionTypes.CAR_TRENDS:
      return {
        ...state,
        trendData: action.payload,
      };

    case ActionTypes.CAR_DETAILS:
      return {
        ...state,
        cardetails: action.payload,
        duration: action.duration,
      };
    case ActionTypes.CARS_LAST_RECORD:
      return {
        ...state,
        last_record: action.payload,
      };
    //Dashboard
    case ActionTypes.SET_DASHBOARD_SELECTED_CAR:
      return {
        ...state,
        selectedDashboardCarInfo: action.payload,
      };
    case ActionTypes.HOURLY_AVG_RPM:
      return {
        ...state,
        dashboard_hourly_avg_rpm: action.payload,
      };

    case ActionTypes.HOURLY_AVG_SPEED:
      return {
        ...state,
        dashboard_hourly_avg_speed: action.payload,
      };

    case ActionTypes.HOURLY_AVG_FUEL:
      return {
        ...state,
        dashboard_hourly_avg_fuel: action.payload,
      };
    case ActionTypes.WEEKLY_AVG_RPM:
      return {
        ...state,
        dashboard_weekly_avg_rpm: action.payload,
      };

    case ActionTypes.WEEKLY_AVG_SPEED:
      return {
        ...state,
        dashboard_weekly_avg_speed: action.payload,
      };

    case ActionTypes.WEEKLY_AVG_FUEL:
      return {
        ...state,
        dashboard_weekly_avg_fuel: action.payload,
      };
    default:
      return state;
  }
};

export default CarReducer;
