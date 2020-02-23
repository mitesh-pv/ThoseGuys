import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';

import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';

import IconButton from '@material-ui/core/IconButton';
import axios from "axios"
import config from "./../../../config/development";
import Cookies from 'js-cookie';


import Config from "./../../../config/development"

export default class ReviewModal extends React.Component {
    constructor(props) {
        super(props)
        this.state={
        }
    }
    componentWillMount(){
       
    }

    handleClose = () => {
        this.props.handleModalCallback(null,false)
    }
    handleApprove=()=>{
        let url=`${config.apiUrl}/admin/action`;
        let body=this.props.insuranceDetails;
        body.status="a";
        
        console.log(body,url)
        axios.post(url,body,{headers:config.apiHeader})
        .then(resp=>{
            console.log(resp)
        })
        .catch(err=>{
            console.log(err)
        })
        
        this.props.handleModalCallback(this.props.insuranceDetails,false)
    }
    handleReject=()=>{
        let url=`${config.apiUrl}/admin/action`;
        let body=this.props.insuranceDetails;
        body.status="r";
        console.log(body,url)
        axios.post(url,body,{headers:config.apiHeader})
        .then(resp=>{
            console.log(resp)
        })
        .catch(err=>{
            console.log(err)
        })
        
        this.props.handleModalCallback(this.props.insuranceDetails,false)
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <Dialog open={this.props.showModal} onClose={this.handleClose} >
                    <DialogContent
                        style={{ height: "300px", width: "550px" }}>
                        <div style={{marginBottom:"1%"}}>
                            <Typography
                                variant="h6"
                                color="textSecondary">
                                    <span style={{fontWeight:600}}>
                                Insurance Type :</span>
                                 {this.props.insuranceDetails.insuranceType}
                            </Typography>
                        </div>
                        <div style={{marginBottom:"1%"}}>
                            <Typography
                                variant="h6"
                                color="textSecondary">
                                      <span style={{fontWeight:600}}>                                
                                Name :</span>
                                 {this.props.insuranceDetails.name}
                            </Typography>
                        </div>
                        <div style={{marginBottom:"1%"}}>
                            <Typography
                                variant="h6"
                                color="textSecondary">
                                     <span style={{fontWeight:600}}>                                  
                                Cost :</span>
                                 {this.props.insuranceDetails.price}
                            </Typography>
                        </div>
                        <div style={{marginBottom:"1%"}}>
                            <Typography
                                variant="h6"
                                color="textSecondary">
                                    <span style={{fontWeight:600}}>IMEI :</span>
                                 {this.props.insuranceDetails.imeiNumber}
                            </Typography>
                        </div>
                        <div style={{marginBottom:"1%"}}>
                            <Typography
                                variant="h6"
                                color="textSecondary">
                                    <span style={{fontWeight:600}}>Mobile Number :</span>
                                 {this.props.insuranceDetails.mobileNumber}
                            </Typography>
                        </div>
                        <div style={{marginBottom:"1%"}}>
                            <Typography
                                variant="h6"
                                color="textSecondary">
                           <span style={{fontWeight:600}}>
                                Bill Number :</span>
                                 {this.props.insuranceDetails.billNumber}
                            </Typography>
                        </div>
                        <div style={{marginBottom:"1%"}}>
                            <Typography
                                variant="h6"
                                color="textSecondary">
                                    <span style={{fontWeight:600}}>Date Of Purchase :</span>
                                 {this.props.insuranceDetails.dateOfPurchase}
                            </Typography>
                        </div>
                        {this.props.costOfInsurance.length>5?
                        <div>
                        <div style={{marginBottom:"1%"}}>
                            <Typography
                                variant="h6"
                                color="textSecondary">
                                    <span style={{fontWeight:600}}>Cost From Bill :</span>
                                 {this.props.costOfInsurance}
                            </Typography>
                        </div>
                        <div style={{marginBottom:"1%"}}>
                            {this.props.insuranceDetails.price==this.props.costOfInsurance?
                            <span style={{color:"green"}}>
                            Matches</span>:<span style={{color:"red"}}>Not matching</span>}
                        </div>
                        </div>
                        :null}
                    </DialogContent>
                    <DialogActions>
                    <IconButton onClick={this.handleApprove}>
                        <Check/>
                    </IconButton>
                       <IconButton>
                           <Close  onClick={this.handleReject}/>
                       </IconButton>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }
}