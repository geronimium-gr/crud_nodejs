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
const UpdateUser = ({ singleUser, handleClose }) => {
  const validationSchema = yup.object().shape({
    firstName: yup.string().required("First Name cannot be empty."),
    lastName: yup.string().required("Last Name cannot be empty."),
    age: yup.string().required("Enter valid age."),
    address: yup.string().required("Address cannot be empty."),
    bio: yup.string().required("Bio cannot be empty."),
  });

  const formik = useFormik({
    initialValues: {
      id: singleUser.id,
      firstName: singleUser.firstName,
      lastName: singleUser.lastName,
      age: singleUser.age,
      address: singleUser.address,
      bio: singleUser.bio,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      // alert(JSON.stringify(values, null, 2));
      axios.put("http://localhost:3001/update-user", values).then((res) => {
        console.log(values);
      });
      resetForm();
      handleClose();
    },
  });
  return (
    <Container component={"span"}>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="First Name"
            fullWidth
            name="firstName"
            margin="normal"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            id="outlined-textarea"
            label="Last Name"
            fullWidth
            name="lastName"
            margin="normal"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            id="outlined-textarea"
            label="Age"
            fullWidth
            type="number"
            name="age"
            margin="normal"
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
            rows={3}
            name="address"
            margin="normal"
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
            rows={3}
            name="bio"
            margin="normal"
            value={formik.values.bio}
            onChange={formik.handleChange}
            error={formik.touched.bio && Boolean(formik.errors.bio)}
            helperText={formik.touched.bio && formik.errors.bio}
          />
        </div>
        <div>
          <Button variant="contained" type="submit">
            Update User
          </Button>
        </div>
      </Box>
    </Container>
  );
};

export default UpdateUser;
