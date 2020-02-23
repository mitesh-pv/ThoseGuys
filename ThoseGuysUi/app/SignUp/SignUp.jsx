import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from './SignUp.scss';
import config from "./../../config/development"


export default class SignUp extends React.Component{
  
    constructor(props)
    {
      super(props);
      this.state={
        username:"",
        password:"",
        confirmPassword:"",
        name:"",
      }
    }
    handleChangeName=(e)=>{
        this.setState({
          name:e
        })
      }
    handleChangeUsername=(e)=>{
      this.setState({
        username:e
      })
    }
    handleChangePassword=(e)=>{
      this.setState({
        password:e
      })
    }
    handleChangeConfirmPassword=(e)=>{
        this.setState({
          confirmPassword:e
        })
      }
    handleSignIn=()=>{
      console.log("click", this.state)
      let body={
        "username":this.state.username,
        "password":this.state.password,
        "confirmPassword":this.state.confirmPassword,
        "fullName":this.state.name
      }
      const headers = {
        'Content-Type': 'application/json'
      }
      let url=`${config.apiUrl}/api/users/register`;
      console.log(body,url)
      axios.post(url,body,{headers:config.headers})
      .then(resp=>{
        console.log(resp)
        location.href="http://localhost:9000/login"
        
      })
      .catch(err=>{
        console.log(err)
      })
      // this.props.updateSignIn(true);
     
    }
    render()
    {
        return (
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={styles.paper}>
                <Avatar className={styles.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <div className={styles.form} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} >
                      <TextField
                        autoComplete="fname"
                        name="Name"
                        variant="outlined"
                        required
                        fullWidth
                        id="Name"
                        label="Name"
                        autoFocus
                        onChange={(e) => { this.handleChangeName(e.target.value) }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={(e) => { this.handleChangeUsername(e.target.value) }}
                
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => { this.handleChangePassword(e.target.value) }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="confirmPassword"
                        type="password"
                        id="confirmPassword"
                        autoComplete="confrim-password"
                        onChange={(e) => { this.handleChangeConfirmPassword(e.target.value) }}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={this.handleSignIn}
                    className={styles.submit}
                  >
                    Sign Up
                  </Button>
                  <Grid container justify="flex-end">
                    <Grid item>
                      <Link href="http://localhost:9000/login" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Container>
          );
    }
 
}