import React from "react"
import axios from "axios"

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import config from "./../../../config/development"
import styles from "./PendingRequest.scss";

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ReviewModal from "./../../Components/Modal/ReviewModal"
import Config from "./../../../config/development"
import Cookies from "js-cookie"
export default class PendingRequest extends React.Component {
    componentWillMount() {
        let url = `${config.apiUrl}/admin/pending`;
        axios.get(url, { headers: config.apiHeader })
            .then(resp => {
                console.log(resp)
                this.setState({
                    pendingRequest:resp.data,
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    constructor(props) {
        super(props)
        this.state = {
            pendingRequest:[],
            showReviewModal:false,
            insuranceDetails:{},
            costOfInsurance:""
        }
    }
    handleGetFileId=(insurance)=>{
        return new Promise(function(resolve,reject){
            
        let url=`${config.apiUrl}/getFileId/${insurance.username}`
            axios.get(url,{headers:config.apiHeader})
            .then(resp=>{
                // this.setState({
                //     fileId:resp.data
                // })
                console.log(resp)
                resolve(resp.data)
            
            })
            .catch(err=>{
                console.log(err)
                reject("")
            }) 
        })
    }
    handleShowReview=(insurance)=>{
        let url=`${config.apiUrl}/getFileId/${insurance.username}`
        axios.get(url,{headers:config.apiHeader})
        .then(resp=>{
            console.log(resp)
            let arr=resp.data.split("\n")
            this.setState({
                costOfInsurance:arr[0]
            })
        })
        .catch(err=>{
            console.log(err)
        })
        this.setState({
            showReviewModal:true,
            insuranceDetails:insurance
        })
    }
    handleModalCallback=(insurance,open)=>{
        if(insurance!=null)
        {
            let ins=this.state.pendingRequest.filter(ins=>ins.id!=insurance.id)
            console.log(ins,insurance.id,this.state.insuranceDetails)
            this.setState({
            pendingRequest:ins
            })
        }
        this.setState({
            showReviewModal:open
        })
    }
    render() {
        return (<div className={styles.wrap}>
            {
                this.state.pendingRequest.map((insurance,key)=>(
                    <Card className={styles.blocks}
                    style={{marginRight:"2%"}}
                    >
                    <CardContent>
                    <Typography variant="h5" component="h2">
                            Type : {insurance.insuranceType}
                 </Typography>
                        <Typography className={styles.title} color="textSecondary" gutterBottom>
                        Name : {insurance.name}
                    </Typography>
                        <Typography className={styles.pos} color="textSecondary">
                            Amt : {insurance.price}      
                </Typography>
                <CardActions
                className={styles.button}
                >
                    <Button size="small" color="primary"
                    onClick={()=>{this.handleShowReview(insurance)}}>Review</Button>
                </CardActions>
                    </CardContent>
                </Card>
                ))
            }
            {
                this.state.showReviewModal ?
                <ReviewModal
                showModal={this.state.showReviewModal}
                handleModalCallback={(open)=>{this.handleModalCallback(open)}}
                insuranceDetails={this.state.insuranceDetails}
                costOfInsurance={this.state.costOfInsurance}
                />
                :null
            }
          </div>)
    }
}