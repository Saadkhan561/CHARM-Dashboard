
// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "components/TimeLine/TimeLineItem";

function CarMiniCard(props) {
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <TimelineItem color="success" icon="timeline" title="Car ID" dateTime={props.car_info.id} />
        <TimelineItem
          color="error"
          icon="inventory_2"
          title="Car Make"
          dateTime={props.car_info.make}
        />
        <TimelineItem color="info" icon="date_range" title="Car Model" dateTime={props.car_info.model} />
        <TimelineItem
          color="warning"
          icon="ev_station"
          title="Car Year"
          dateTime={props.car_info.year}
          lastItem
        />
      </MDBox>
    </Card>
  );
}

export default  CarMiniCard;
