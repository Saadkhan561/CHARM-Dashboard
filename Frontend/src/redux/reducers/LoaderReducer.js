import * as ActionTypes from "../actions/ActionTypes";

const INITIAL_STATE = {
  loader: false,
  trends_loader: false,
  duration_loader: false,
  last_record_loader: false,
  dashboard_duration_loader: false,

  dashboard_hourly_avg_rpm_loader: false,
  dashboard_hourly_avg_speed_loader: false,
  dashboard_hourly_avg_fuel_loader: false,
  dashboard_weekly_avg_rpm_loader: false,
  dashboard_weekly_avg_speed_loader: false,
  dashboard_weekly_avg_fuel_loader: false,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOADER_START":
      return { ...state, loader: true };
    case "LOADER_END":
      return { ...state, loader: false };
    case "DURATION_LOADER_START":
      return { ...state, duration_loader: true };
    case "DURATION_LOADER_END":
      return { ...state, duration_loader: false };
    case "TRENDS_LOADER_START":
      return { ...state, trends_loader: true };
    case "TRENDS_LOADER_END":
      return { ...state, trends_loader: false };
    case "CARS_LAST_RECORD_LOADER_START":
      return { ...state, last_record_loader: true };
    case "CARS_LAST_RECORD_LOADER_END":
      return { ...state, last_record_loader: false };

    case ActionTypes.DASHBOARD_HR_RPM_LOADER_START:
      return { ...state, dashboard_hourly_avg_rpm_loader: true };
    case ActionTypes.DASHBOARD_HR_RPM_LOADER_END:
      return { ...state, dashboard_hourly_avg_rpm_loader: false };

    case ActionTypes.DASHBOARD_HR_SPEED_LOADER_START:
      return { ...state, dashboard_hourly_avg_speed_loader: true };
    case ActionTypes.DASHBOARD_HR_SPEED_LOADER_END:
      return { ...state, dashboard_hourly_avg_speed_loader: false };

    case ActionTypes.DASHBOARD_HR_FUEL_LOADER_START:
      return { ...state, dashboard_hourly_avg_fuel_loader: true };
    case ActionTypes.DASHBOARD_HR_FUEL_LOADER_END:
      return { ...state, dashboard_hourly_avg_fuel_loader: false };

    case ActionTypes.DASHBOARD_WK_RPM_LOADER_START:
      return { ...state, dashboard_weekly_avg_rpm_loader: true };
    case ActionTypes.DASHBOARD_WK_RPM_LOADER_END:
      return { ...state, dashboard_weekly_avg_rpm_loader: false };

    case ActionTypes.DASHBOARD_WK_SPEED_LOADER_START:
      return { ...state, dashboard_weekly_avg_speed_loader: true };
    case ActionTypes.DASHBOARD_WK_SPEED_LOADER_END:
      return { ...state, dashboard_weekly_avg_speed_loader: false };

    case ActionTypes.DASHBOARD_WK_FUEL_LOADER_START:
      return { ...state, dashboard_weekly_avg_fuel_loader: true };
    case ActionTypes.DASHBOARD_WK_FUEL_LOADER_END:
      return { ...state, dashboard_weekly_avg_fuel_loader: false };
    default:
      return state;
  }
};
