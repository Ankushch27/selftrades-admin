import { Paper } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router';
import { saveUser } from '../actions/authActions';
import { useAuthContext } from '../contexts/AuthContext';
import { api } from '../utils/constants';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(4, 0 ),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const { loginDispatch } = useAuthContext();
  const login = async (values, setSubmitting) => {
    try {
      let res = await api.post('/admin/login', {
        username: values.username,
        password: values.password,
      });
      const { token } = res.data.result;
      saveUser(loginDispatch, token);
      setSubmitting(false);
      history.replace('/user_details')
    } catch (error) {
      console.log('error', error.response.data.error);
      setSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Admin Login
        </Typography>
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={(values, { setSubmitting }) => {
            login(values, setSubmitting);
          }}>
          {({ isSubmitting }) => (
            <Form className={classes.form} autoComplete="off">
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Username"
                name="username"
                autoFocus
              />
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                className={classes.submit}>
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
}
