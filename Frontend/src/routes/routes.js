
import Logout from "pages/Logout/index";
import LastRecord from "pages/CarInfo/index";
import CarPage from "pages/CarTrends";
import Cars from "pages/Dashboard/Cars"

// @mui icons
import Icon from "@mui/material/Icon";
import Info from "pages/Dashboard/Info/index"


const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Cars />,
  },
  {
    key: "dashboard",
    route: "/dashboard/carinfo",
    component: <Info/>,
  },
  {
    type: "collapse",
    name: "Car Trends",
    key: "car",
    icon: <Icon fontSize="small">car_repair</Icon>,
    route: "/car",
    component: <CarPage />,
  },

  {
    type: "collapse",
    name: "Car Information",
    key: "cars-last-record",
    icon: <Icon fontSize="small">electric_car</Icon>,
    route: "/cars-last-record",
    component: <LastRecord />,
  },

  {
    type: "collapse",
    name: "Logout",
    key: "logout",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/logout",
    component: <Logout />,
    exact: true,
  },
];

export default routes;
