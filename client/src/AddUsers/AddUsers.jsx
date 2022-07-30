import React, { useState } from "react";
import {
  TextField,
  Box,
  Typography,
  Button,
  Alert,
  Snackbar,
  Container,
} from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
const AddUsers = ({ refreshData, refreshToggle }) => {
  const validationSchema = yup.object().shape({
    firstName: yup.string().required("First Name cannot be empty."),
    lastName: yup.string().required("Last Name cannot be empty."),
    age: yup.string().required("Enter valid age."),
    address: yup.string().required("Address cannot be empty."),
    bio: yup.string().required("Bio cannot be empty."),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      age: "",
      address: "",
      bio: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      // alert(JSON.stringify(values, null, 2));
      axios.post("http://localhost:3001/add-user", values).then((res) => {
        console.log(values);
      });
      resetForm();
      refreshToggle(!refreshData);
    },
  });
  return (
    <Container>
      <h1>Add User</h1>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "27ch" },
        }}
        onSubmit={formik.handleSubmit}
      >
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="First Name"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            id="outlined-textarea"
            label="Last Name"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            id="outlined-textarea"
            label="Age"
            type="number"
            name="age"
            value={formik.values.age}
            onChange={formik.handleChange}
            error={formik.touched.age && Boolean(formik.errors.age)}
            helperText={formik.touched.age && formik.errors.age}
          />
        </div>
        <div>
          <TextField
            id="outlined-multiline-static"
            label="Address"
            multiline
            fullWidth
            rows={4}
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
          <TextField
            id="outlined-multiline-static"
            label="Bio"
            multiline
            fullWidth
            rows={4}
            name="bio"
            value={formik.values.bio}
            onChange={formik.handleChange}
            error={formik.touched.bio && Boolean(formik.errors.bio)}
            helperText={formik.touched.bio && formik.errors.bio}
          />
        </div>
        <div>
          <Button variant="contained" type="submit">
            Add User
          </Button>
        </div>
      </Box>
    </Container>
  );
};

export default AddUsers;
