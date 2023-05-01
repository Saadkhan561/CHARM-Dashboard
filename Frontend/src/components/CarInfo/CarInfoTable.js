import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

import "./CarInfoTable.css";

export const CarInfoTable = ({ lastrecord }) => {
  const [globalFilter, setGlobalFilter] = useState(null);

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Last Drive Date</h5>
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
      <div className="datatable-crud-demo">
        <div className="card">
          {lastrecord && (
            <DataTable
              value={lastrecord}
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
              <Column field="id" header="Car ID" sortable style={{ minWidth: "12rem" }}></Column>
              <Column
                field="name"
                header="User Name"
                sortable
                style={{ minWidth: "12rem" }}
              ></Column>
              <Column
                field="make"
                header="Car Make"
                sortable
                style={{ minWidth: "12rem" }}
              ></Column>
              <Column
                field="model"
                header="Car Model"
                sortable
                style={{ minWidth: "12rem" }}
              ></Column>
              <Column
                field="time"
                header="Last Drive Date"
                sortable
                style={{ minWidth: "12rem" }}
              ></Column>
            </DataTable>
          )}
        </div>
      </div>
    </>
  );
};
