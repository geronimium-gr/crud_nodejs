import React, { useEffect, useState } from "react";
import {
  ButtonGroup,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import UpdateUser from "../UpdateUser/UpdateUser";

const ViewUsers = ({ refreshData, refreshToggle }) => {
  const [user, setUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [singleUser, setSingleUser] = useState([]);
  const [getTitle, setGetTitle] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 20, flex: 1 },
    {
      field: "firstName",
      headerName: "First Name",
      width: 20,
      flex: 1,
    },
    { field: "lastName", headerName: "Last Name", width: 20, flex: 1 },
    { field: "age", headerName: "Age", width: 20, flex: 1 },
    { field: "address", headerName: "Address", width: 50, flex: 2 },
    { field: "bio", headerName: "Bio", width: 50, flex: 2 },
    {
      field: "action",
      headerName: "Actions",
      width: 40,
      flex: 2,
      headerAlign: "center",
      renderCell: (cellVal) => {
        return (
          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="vertical contained button group"
          >
            <Button
              onClick={(event) => {
                const data = {
                  id: cellVal.row.id,
                  firstName: cellVal.row.firstName,
                  lastName: cellVal.row.lastName,
                  age: cellVal.row.age,
                  address: cellVal.row.address,
                  bio: cellVal.row.bio,
                };
                setSingleUser(data);
                toggleShow();
              }}
            >
              <EditIcon />
            </Button>
            <Button
              onClick={(event) => {
                const data = {
                  id: cellVal.row.id,
                  firstName: cellVal.row.firstName,
                  lastName: cellVal.row.lastName,
                };
                setGetTitle(data);
                toggleDelete();
              }}
            >
              <DeleteIcon />
            </Button>
          </ButtonGroup>
        );
      },
    },
  ];

  const toggleShow = () => {
    refreshToggle(!refreshData);
    setOpen((p) => !p);
  };
  const toggleDelete = () => setDeleteDialog((p) => !p);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3001/delete-user/${getTitle.id}`)
      .then(() => {
        toggleDelete();
        refreshToggle(!refreshData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios.get("http://localhost:3001/get-users").then((response) => {
      setUser(response.data);
    });
  }, [refreshData]);

  return (
    <div style={{ height: 400, padding: "45px" }}>
      <h1>Sample Node JS CRUD Application</h1>
      <DataGrid
        rows={user}
        columns={columns}
        getRowId={(row) => row.id}
        pageSize={10}
        rowsPerPageOptions={[10]}
        initialState={{
          sorting: {
            sortModel: [{ field: "id", sort: "asc" }],
          },
        }}
      ></DataGrid>

      <Dialog open={open} onClose={toggleShow}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <UpdateUser singleUser={singleUser} handleClose={toggleShow} />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleShow}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialog} onClose={toggleDelete}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Delete the following information? <br />
            <strong>
              Name: {getTitle.firstName} {getTitle.lastName}
            </strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>Delete</Button>
          <Button onClick={toggleDelete}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewUsers;
