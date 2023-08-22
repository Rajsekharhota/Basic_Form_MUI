import React, { useState, useEffect } from "react";
import DepartmentListComponent from "./DepartmentList";
import "./Styles.css";

import { DataGrid } from "@mui/x-data-grid";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const NextPage: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);
  const departmentData = [
    {
      department: "customer_service",
      sub_departments: ["support", "customer success", "customer enquiry"],
    },
    {
      department: "design",
      sub_departments: [
        "graphic design",
        "product design",
        "web design",
        "UX design",
      ],
    },
  ];

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="main-container">
      <div>
        <h2>Filters</h2>
        <DepartmentListComponent data={departmentData} />
      </div>
      <div
        style={{
          height: "100%",
          width: "100%",
          margin: "auto",
        }}
      >
        <DataGrid
          rows={data}
          autoHeight
          rowHeight={60}
          getRowClassName={(params) => `super-app-theme--${params.row.id}`}
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: "primary.light",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
          columns={[
            { field: "id", headerName: "ID", width: 90 },
            { field: "title", headerName: "Title", width: 300 },
            { field: "body", headerName: "Body", width: 500 },
            { field: "userId", headerName: "User ID", width: 120 },
          ]}
        />
      </div>
    </div>
  );
};

export default NextPage;
