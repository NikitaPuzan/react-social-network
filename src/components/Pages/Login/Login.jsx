import React from 'react';
import * as yup from 'yup'
import {Alert, Button, Checkbox, FormControlLabel, Grid, TextField} from "@mui/material";
import {connect} from "react-redux";
import {login} from "../../../redux/auth-reducer";
import { useFormik} from 'formik';
import {Navigate} from "react-router-dom";

const Login = ({login, isAuth}) => {

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validationSchema: yup.object({
      email: yup.string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
      password: yup.string('Enter your password')
        .min(6, 'Minimum 6 characters length')
        .max(18, 'Maximum 18 characters length')
        .required('Password is required'),
      rememberMe: yup.boolean()
    }),
    onSubmit: (values,formSubmit) => {
      login(values.email, values.password, values.rememberMe, formSubmit.setStatus)
      console.log(JSON.stringify(values, null, 2));
    }
  });

  let apiErrors
  if(formik.status) {
    apiErrors = formik.status.error.map((item, index) => <p key={index}>{item}</p>)
  }

  if(isAuth) return  <Navigate to={'/profile'} />

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="baseline"
      style={{minHeight: '50vh', padding: '100px 0'}}
    >
        <form onSubmit={formik.handleSubmit}
              style={{backgroundColor: 'white', padding: '40px 80px',
                      border:'1px solid black', borderRadius: '15px',
                      boxShadow:"0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"}}>
          <h2 style={{textAlign: 'center'}}>Sign In</h2>
          <Grid item sx={{margin: '10px 0'}}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item sx={{margin: '10px 0'}}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item sx={{margin: '10px 0'}}>
            <FormControlLabel onChange={formik.handleChange}
              control={
                <Checkbox id="rememberMe" name="rememberMe" />
              }
              label="Remember me"
            />
            {apiErrors && <Alert variant="filled" severity="error">{apiErrors}</Alert>}
          </Grid>
          <Grid item sx={{margin: '10px 100px', textAlign: 'center'}}>
            <Button color="primary" variant="contained" type="submit">
              Log in
            </Button>
          </Grid>
        </form>
    </Grid>
  )
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
})

export default  connect(mapStateToProps, {login} )(Login);