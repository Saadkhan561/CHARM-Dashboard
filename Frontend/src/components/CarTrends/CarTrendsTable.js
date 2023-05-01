import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

import "./CarTrendsTable.css";

//Redux
import { useDispatch, useSelector } from "react-redux";

// Trends
import ParamTrends from "components/Trends/ParamTrends";

import Grid from "@mui/material/Grid";

import CarMiniCard from "components/CarTrends/CarMiniCard";
import CarEmailUserCard from "components/CarTrends/CarEmailUserCard";
import { setSelectedCar } from "redux/actions/CarActions";

export const CarTrendsTable = ({ cardetails }) => {
  const dispatch = useDispatch();
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedrow, setSelectedRow] = useState({
    email: cardetails[0].email,
    id: cardetails[0].id,
    name: cardetails[0].name,
    make: cardetails[0].make,
    model: cardetails[0].model,
    year: cardetails[0].year,
  });
  const toast = useRef(null);
  const dt = useRef(null);
  const selectedItem = async (rowData) => {
    setSelectedRow({ ...rowData });
    await dispatch(setSelectedCar(rowData));
  };
  useEffect(async () => {
    setSelectedRow({
      email: cardetails[0].email,
      id: cardetails[0].id,
      name: cardetails[0].name,
      make: cardetails[0].make,
      model: cardetails[0].model,
      year: cardetails[0].year,
    });

    await dispatch(
      setSelectedCar({
        email: cardetails[0].email,
        id: cardetails[0].id,
        name: cardetails[0].name,
        make: cardetails[0].make,
        model: cardetails[0].model,
        year: cardetails[0].year,
      })
    );
  }, [cardetails]);
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-eye"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => selectedItem(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-4">Cars</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  return (
    <>
      <Toast ref={toast} />

      <div className="card">
        {cardetails && (
          <DataTable
            ref={dt}
            value={cardetails}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            globalFilter={globalFilter}
            header={header}
            responsiveLayout="scroll"
          >
            <Column field="email" header="Email" sortable style={{ minWidth: "12rem" }}></Column>
            <Column field="name" header="Name" sortable style={{ minWidth: "10rem" }}></Column>
            <Column field="make" header="Make" sortable style={{ minWidth: "10rem" }}></Column>
            <Column field="model" header="Model" sortable style={{ minWidth: "10rem" }}></Column>
            <Column field="year" header="Year" sortable style={{ minWidth: "10rem" }}></Column>

            <Column
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "8rem" }}
            ></Column>
          </DataTable>
        )}
      </div>

      <div className="datatable-crud-demo">
        {selectedrow?.id && (
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6} mb={1} mt={5}>
              <CarMiniCard car_info={selectedrow} />
            </Grid>
            <Grid item xs={12} lg={6} mb={1} mt={5}>
              <CarEmailUserCard
                number={4562112245947852}
                holder={selectedrow.name}
                expires={selectedrow.email}
              />
            </Grid>
          </Grid>
        )}
      </div>

      <ParamTrends />
    </>
  );
};
