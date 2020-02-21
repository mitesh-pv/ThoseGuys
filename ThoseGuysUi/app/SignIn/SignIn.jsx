import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import styles from './SignIn.scss';
import axios from 'axios';
import Cookies from 'js-cookie';



export default class App extends React.Component{
  
    constructor(props)
    {
      super(props);
      this.state={
        username:"",
        password:"",
        authenticated:Cookies.get("auth")
      }
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
    handleSignIn=()=>{
      console.log("click", this.state)
      let body={
        "username":this.state.username,
        "password":this.state.password
      }
      axios.post("http://198ab67a.ngrok.io/authenticate",body)
      .then(resp=>{
        console.log(resp)
        let c=resp.data.jwt;
        // Cookies.set({"auth":JSON.stringify(c)})
        this.setState({
          authenticated:Cookies.get("auth")
        })
        Cookies.set("auth",JSON.stringify(c))

   
        console.log(JSON.parse(Cookies.get().auth))
        location.href="http://localhost:9000/home/test"
        this.props.updateSignIn()
        // Cookies.remove("auth")
    
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
              <div className={styles.signInDiv}>

                <Avatar className={styles.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <div className={styles.form} noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    value={this.state.username}
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
                    autoComplete="current-password"
                    onChange={(e) => { this.handleChangePassword(e.target.value) }}
                  />
                  {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  /> */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={this.handleSignIn}
                    className={styles.submit}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                  </Grid>
                </div>
              </div>
        
            </Container>
          );
    }
 
}