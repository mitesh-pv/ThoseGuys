import React from "react";
import axios from "axios";
import config from "./../../../config/development";
import Cookies from 'js-cookie';
import styles from "./../../Admin/PendingRequst/PendingRequest.scss"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default class AllRequest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allRequest: []
        }
    }
    componentWillMount() {
        let username = JSON.parse(Cookies.get("auth")).email;
        let url = `${config.apiUrl}/insurance/allRequest/${username}`;
        let header=config.apiHeader;
        header.Authentication=JSON.parse(Cookies.get("auth")).auth
        
        axios.get(url, { headers: header })
            .then(resp => {
                console.log(resp)
                this.setState({
                    allRequest: resp.data,
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    handlePay=(insurance)=>{
        location.href=`http://localhost:5000/payment/${insurance.price}`
    }
    render() {
        return (
            <div className={styles.wrap}>
                {
                    this.state.allRequest.map((insurance, key) => (
                        <Card className={styles.blocks}
                        style={{marginRight:"2%"}}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Type : {insurance.insuranceType}
                                </Typography>
                                <Typography className={styles.title} color="textSecondary" gutterBottom>
                                    Name : {insurance.name}
                                </Typography>
                                <Typography className={styles.pos} color="textSecondary">
                                    Cost : {insurance.price}
                                </Typography>
                                
                                <Typography className={styles.pos} color="textSecondary">
                                    Status : {insurance.status=="a"?"Approved":insurance.status=="p"?"Pending":"Rejected"}
                                </Typography>
                                
                                <CardActions
                                    className={styles.button}
                                >
                                    <Button size="small" color="primary"
                                    variant="contained"
                                    disabled={insurance.status=="a"?false:true}
                                        onClick={() => { this.handlePay(insurance) }}>Pay</Button>
                                </CardActions>
                            </CardContent>
                        </Card>
                    ))
                }
            </div>
        )
    }
}