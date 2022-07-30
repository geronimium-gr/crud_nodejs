import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const ViewUsers = () => {
  const [user, setUser] = useState([]);

  const columns = [
    {
      field: "firstName",
      headerName: "First Name",
      width: 200,
      flex: 2,
    },
    { field: "lastName", headerName: "Last Name", width: 20, flex: 1 },
    { field: "age", headerName: "Age", width: 20, flex: 1 },
    { field: "address", headerName: "Address", width: 200, flex: 2 },
    { field: "bio", headerName: "Bio", width: 200, flex: 2 },
  ];

  useEffect(() => {
    axios.get("http://localhost:3001/get-users").then((response) => {
      setUser(response.data);
    });  
  }, []);

  return (
    <div style={{ height: 400, padding: "40px" }}>
      <h1>Sample Node JS CRUD Application</h1>
      <DataGrid
        rows={user}
        columns={columns}
        getRowId={(row) => row.id}
        pageSize={10}
        rowsPerPageOptions={[10]}
      ></DataGrid>
    </div>
  );
};

export default ViewUsers;
