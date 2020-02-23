import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import Mobile from "./../../../icons/mobile";
import Modal from "../../Components/Modal/Modal"
import axios from "axios";
import config from "../../../config/development";
import IconButton from '@material-ui/core/IconButton';

import Cookies from 'js-cookie';
import Chat from '@material-ui/icons/Chat';

export default class Apply extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            allInsurance:[],
            showModal:false,
            insuranceType:"",
            insuranceName:"",
        }
       
    }
    componentWillMount(){
        let header=config.apiHeader;
        // console.log(JSON.parse(Cookies.get("Auth")))
        header.Authentication=JSON.parse(Cookies.get("auth")).auth
        console.log(header)
        axios.get(`${config.apiUrl}/insurance/all`,{headers:header})
        .then(resp=>{
            console.log(resp.data)
            this.setState({
                allInsurance:resp.data
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
    handleShowModal=(insurance)=>{
        this.setState({
            showModal:true,
            insuranceType:insurance.type,
            insuranceName:insurance.name
        })
    }
    handleModalCallback=(open)=>{
        this.setState({
            showModal:open
        })
    }
    handleChat=()=>{
        window.open("http://10.104.0.136:3000/", "_blank")
    }
    render(){
        return(
            <div className="container">
            <div style={{display:"flex"}}>
                {
            this.state.allInsurance.map((insurance,idx)=>{
                return(
                <Card 
                key={idx}
                style={{margin:20,alignContent:"center"}}
                >
            <CardActionArea>
              <CardMedia
              style={{minWidth:300}}
                title="insurance card"
              />
              <CardContent>
                  
                <Typography gutterBottom variant="h5" component="h2">
                  {insurance.name}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary"
              variant="contained"
              style={{marginLeft:"70%"}}
              onClick={()=>{this.handleShowModal(insurance)}}
              >
                Check
              </Button>
            </CardActions>
          </Card>
            )})
    }
    {
        this.state.showModal ?
        <Modal
        showModal={this.state.showModal}
        insuranceName={this.state.insuranceName}
        insuranceType={this.state.insuranceType}
        handleModalCallback={(open)=>{this.handleModalCallback(open)}}
        />:null
    }
            </div >  
            <div  style={{position:"absolute",top:"90%",right:"3%"}}>
                Chat here!
            <IconButton
            onClick={this.handleChat}
            target="_blank"
            ><Chat 
            style={{width:"50px",height:"50px"}}
            /></IconButton>
            </div>
            </div>
        )
    }
}