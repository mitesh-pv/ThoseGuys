import React from 'react';
import SignIn from './SignIn/SignIn';
import LoggedIn from './LoggedIn/LoggedIn';

import Cookies from 'js-cookie';
export default class App extends React.Component{

    constructor(props)
    {
        super(props)
        //based on cookie update isloggedIn flag
        console.log(Cookies.get("auth"))
        this.state={
            isLoggedIn:Cookies.get("auth")!=undefined?true:false
        }
    }
    updateSignIn=()=>{
        // Cookies.get("auth")
        // this.setState({
        //     isLoggedIn:Cookies.get("auth")!=undefined?true:false
        // })
    }
    render()
    {
        return(
            <div>
                  <SignIn
                    updateSignIn={()=>{this.updateSignIn()}}
                    />
                {/* {
                    !this.state.isLoggedIn ?
                    <SignIn
                    updateSignIn={()=>{this.updateSignIn()}}
                    />
                    :
                    <LoggedIn/>
                } */}
            </div>
        )
    }
}