import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import styles from './Login.scss';
import axios from 'axios';
import Cookies from 'js-cookie';

import config from "./../../config/development"



export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      errorUsername: false,
      errorPassword: false,
      password: "",
      authenticated: Cookies.get("auth"),
      userLogin: true,
      adminLogin: false
    }
  }
  handleChangeUsername = (e) => {
    this.setState({
      username: e
    })
  }
  handleChangePassword = (e) => {
    this.setState({
      password: e
    })
  }
  handleAdminLogin = () => {
    this.setState({
      adminLogin: true,
      userLogin:false
    })
  }
  handleUserLogin = () => {
    this.setState({
      userLogin: true,
      adminLogin:false
    })
  }
  handleLogIn = () => {
    if (this.state.username.length == 0) {
      this.setState({
        errorUsername: true
      })
    }
    else {
      this.setState({
        errorUsername: false
      })
    }
    if (this.state.password.length == 0) {
      this.setState({
        errorPassword: true
      })
    }
    else {
      this.setState({
        errorPassword: false
      })
    }
    let body = {
      "username": this.state.username,
      "password": this.state.password
    }
    let url;
    if (this.state.userLogin) {
      url = `${config.apiUrl}/api/users/login`;
    }
    else {
      url = `${config.apiUrl}/admin/login`;
    }
    if (this.state.username.length > 0 && this.state.password.length > 0) {
      console.log(body)
      axios.post(url, body, { headers: config.apiHeader })
        .then(resp => {
          console.log(resp)
          let user;
          if (this.state.userLogin) {
             user = {
              auth: resp.data.token,
              name: resp.data.fullName,
              email: this.state.username,
              userType:"user"
            }
          }
          else {
            user = {
              auth: "admin",
              name: "admin",
              email: this.state.username,
              userType:"admin"
            }
          }
          Cookies.set("auth", JSON.stringify(user))
          if(this.state.userLogin)
          location.href = "http://localhost:9000/home/user/apply"
          else
          location.href = "http://localhost:9000/home/admin/pending"

        })
        .catch(err => {
          console.log(err)
          // alert("Failed to login")
        })
    }
    // this.props.updateSignIn(true);

  }
  render() {
    return (

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={styles.signInDiv}>

          <Avatar className={styles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
                </Typography>
          <div className={styles.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              value={this.state.username}
              error={this.state.errorUsername}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => { this.handleChangeUsername(e.target.value) }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={this.state.password}
              error={this.state.errorPassword}
              autoComplete="current-password"
              onChange={(e) => { this.handleChangePassword(e.target.value) }}
            />
            <FormControlLabel
              control={<Radio
                checked={this.state.userLogin}
                onClick={this.handleUserLogin}
                value="user" color="primary" />}
              label="User"
            />
            <FormControlLabel
              control={<Radio
                checked={this.state.adminLogin}
                onClick={this.handleAdminLogin}
                value="admin" color="primary" />}
              label="Admin"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.handleLogIn}
              className={styles.submit}
            >
              Login
                  </Button>
            <Grid container>
              <Grid item xs>
                Don't have an account?
                      <Link href="http://localhost:9000/signup" variant="body2">
                  Sign Up Here!
                      </Link>
              </Grid>
            </Grid>
          </div>
        </div>

      </Container>
    );
  }

}