import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import styles from "./Modal.scss";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import axios from "axios"
import config from "./../../../config/development";
import Cookies from 'js-cookie';
import FormData from 'form-data'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default class Modal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            checkPrice: "",
            finalPrice: "",
            showInsuranceForm: false,
            imeiNumber: "",
            mobileNumber: "",
            billNumber: "",
            purchaseDate: "2020-02-22",
            file: null,
            inputFile: null
        }
    }

    handleClose = () => {
        this.setState({
            finalPrice: ""
        })
        this.props.handleModalCallback(false)
    }
    handleChangePrice = (e) => {
        this.setState({
            checkPrice: e
        })
    }
    handleChangeUserName = (e) => {
        this.setState({
            name: e
        })
    }
    handleChangeImeiNumber = (e) => {
        this.setState({
            imeiNumber: e
        })
    }
    handleChangeMobileNumber = (e) => {
        this.setState({
            mobileNumber: e
        })
    }
    handleChangeBillNumber = (e) => {
        this.setState({
            billNumber: e
        })
    }
    handleCheckPrice = () => {
        let url = `${config.apiUrl}/calculatePolicyPrice/checkInsurancePrice`;
        let body = {
            "insuranceType": this.props.insuranceType,
            "mobilePrice": this.state.checkPrice
        }
        console.log(body)
        axios.post(url, body, { headers: config.apiHeader })
            .then(resp => {
                console.log(resp)
                this.setState({
                    finalPrice: resp.data,
                    showInsuranceForm: false
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    handleContinueInsurance = () => {
        this.setState({
            showInsuranceForm: true
        })
    }
    handleUploadFile = (e) => {
        console.log(e, e.File())
    }
    handlePayment = () => {
        let data = new FormData();
        data.append('file', this.state.inputFile);
        data.append("userID",JSON.parse(Cookies.get("auth")).email)
        console.log(data)
        let body = {
            "username": JSON.parse(Cookies.get("auth")).email,
            "fullName": JSON.parse(Cookies.get("auth")).name,
            "insuranceFormList": [{
                "name": JSON.parse(Cookies.get("auth")).name,
                "username": JSON.parse(Cookies.get("auth")).email,
                "price": this.state.finalPrice,
                "insuranceType": this.props.insuranceType,
                "imeiNumber": this.state.imeiNumber,
                "mobileNumber": this.state.mobileNumber,
                "billNumber": this.state.billNumber,
                "status": "p",
                "dateOfPurchase": this.state.purchaseDate
            }]
        }
        console.log("body", body)
        let url = `${config.apiUrl}/insurance/applyInsurance`
        let header=config.apiHeader;
        header.Authentication=JSON.parse(Cookies.get("auth")).auth
        
        axios.post(url, body, { headers: header })
            .then(resp => {
                console.log(resp.data)
                let fileUrl = `${config.apiUrl}/uploadFile`
                axios.post(fileUrl, data, { headers: header })
                    .then(res => {
                        console.log(res)
                        alert("Insurance Created")

                    })
                    .catch(err => {
                        console.log(err)
                    })

                // this.props.handleModalCallback(false)
            })
            .catch(err => {
                console.log(err)
                // alert("Failed to apply Insurance")
            })
        console.log("body", body, url)
    }
    handleChangePurchaseDate = e => {
        this.setState({
            purchaseDate: e.target.value
        })
    }
    handleFile = (file) => {
        this.setState({
            file: URL.createObjectURL(file),
            inputFile: file
        })
    }
    render() {
        return (
            <div>
                <Dialog
                    open={this.props.showModal} onClose={this.handleClose} TransitionComponent={Transition}>
                    <DialogContent
                        style={{ height: "600px", width: "550px" }}
                    >
                        <Card
                            style={{ height: "33%" }} >
                            <div style={{ display: "block" }}>
                                <div style={{ display: "flex" }}>
                                    <TextField
                                        style={{ marginLeft: "8%" }}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        id="CheckPrice"
                                        value={this.state.checkPrice}
                                        label="Check Price"
                                        type="number"
                                        name="CheckPrice"
                                        autoComplete="CheckPrice"
                                        autoFocus
                                        onChange={(e) => { this.handleChangePrice(e.target.value) }}
                                    />
                                    <div>
                                        <Button
                                            style={{ marginTop: "16%", height: "50px", width: "130%", marginLeft: "60%", marginRight: "10%" }}
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleCheckPrice}>Check Price</Button>
                                    </div>

                                </div>
                                {this.state.finalPrice ?
                                    <div style={{ display: "block", marginTop: "10%", width: "130%" }}>
                                        <Typography
                                            variant="h6"
                                            style={{ color: "green", position: "absolute", left: "23%", top: "17%" }}>
                                            Your final price for insurance is {this.state.finalPrice}</Typography>
                                        <Button
                                            style={{ position: "absolute", left: "41%", top: "25%", width: "21%", height: "7%" }}
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleContinueInsurance}>Continue</Button>

                                    </div>
                                    : null
                                }
                            </div>

                        </Card>
                        <Divider />
                        <Card style={{ marginTop: "2%" }}>
                            {this.state.showInsuranceForm ?
                                <div style={{ display: "block" }}>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            id="Name"
                                            value={JSON.parse(Cookies.get("auth")).name}
                                            label="Name"
                                            placeholder="Name"
                                            name="Name"
                                            onChange={(e) => { this.handleChangeUserName(e.target.value) }}
                                        />
                                        <TextField
                                            style={{ marginLeft: "7%" }}
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            id="Email"
                                            value={JSON.parse(Cookies.get("auth")).email}
                                            label="Email Number"
                                            name="Email"
                                        />
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            id="Insurance name"
                                            disabled
                                            value={this.props.insuranceName}
                                            label="Insurance Type"
                                            name="Insurance Name"
                                        />
                                        <TextField
                                            style={{ marginLeft: "7%" }}
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            id="Mobile"
                                            value={this.state.mobileNumber}
                                            label="Mobile Number"
                                            name="Mob"
                                            onChange={(e) => { this.handleChangeMobileNumber(e.target.value) }}
                                        />
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            id="IMEI"
                                            value={this.state.imeiNumber}
                                            label="IMEI Number"
                                            name="IMEI"
                                            onChange={(e) => { this.handleChangeImeiNumber(e.target.value) }}
                                        />

                                        <TextField
                                            style={{ marginLeft: "7%" }}
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            id="Bill"
                                            value={this.state.billNumber}
                                            label="Bill Number"
                                            name="Bill"
                                            onChange={(e) => { this.handleChangeBillNumber(e.target.value) }}
                                        />
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <TextField
                                            type="date"
                                            value={this.state.purchaseDate}
                                            onChange={this.handleChangePurchaseDate}
                                        />

                                        <input type="file"
                                            style={{ marginLeft: "3%", marginTop: "2%", maxWidth: "210px" }}
                                            accept="image/x-png,image/gif,image/jpeg"
                                            onChange={(e) => { this.handleFile(e.target.files[0]) }} />
                                        {
                                            this.state.file != null ?
                                                <img
                                                    style={{ height: "20px", width: "20px", marginTop: "2%" }}
                                                    src={this.state.file} />
                                                : null
                                        }
                                    </div>

                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <Button
                                            style={{ marginTop: "3%", marginBottom: "5%", width: "26%", height: "45px" }}
                                            onClick={this.handlePayment}
                                            variant="contained"
                                            color="primary"
                                        >
                                            Submit
                                    </Button>
                                    </div>
                                </div>

                                : null}
                        </Card>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}
