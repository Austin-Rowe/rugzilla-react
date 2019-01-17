import React, { Component } from 'react';
import {Jumbotron, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Spinner from '../../stylingComponents/Spinner';
import {connect} from 'react-redux';
import { Helmet } from 'react-helmet';

import './PaymentConfirmation.css';

class PaymentConfirmation extends Component{
    constructor(props){
        super(props);

        this.state = {
            loading: true,
            confirmationNumber: ''
        }
    }

    componentDidUpdate(prevProps){
        const {orderData} = this.props;
        if(orderData !== prevProps.orderData){
            const orderItems = orderData.purchaseCart.map(item => ({quantity: item.quantity, UPC: item.item.key}));
            const paypalInfo = orderData.payPalRes;
            const customerInfo = orderData.customerInfo;
            const orderObj = {
                orderItems,
                paypalInfo,
                customerInfo
            };

            fetch('http://18.188.129.119:8000/confirm-payment',{
                method: 'post', 
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderObj)
            })
            .then(res => {
                return res.json()
            })
            .then(resObj => {
                this.setState({loading: false, confirmationNumber: resObj.confirmationNumber});
            })
            .catch(err => console.log(err))
        }
    }

    render(){

        if(this.state.loading){
            return(
                <React.Fragment>
                    <Helmet>
                        <title>Waiting...</title>
                    </Helmet>
                    <div id="awaiting-confirmation">
                        <Spinner loadingMessage='Awaiting Confirmation...' />
                    </div>
                </React.Fragment>
            )
        }
        return(
            <React.Fragment>
                <Helmet>
                    <title>Order Confirmed</title>
                </Helmet>
                <Jumbotron id="order-confirmation-jumbotron">
                    <h1>Thanks {this.props.orderData.customerInfo.firstName}, we really appreciate your business!</h1>
                    <h3>Your confirmation # is {this.state.confirmationNumber}</h3>
                    <Link to="/" >
                        <Button bsStyle="primary" bsSize="large" id="go-home-button">Return to Homepage</Button>
                    </Link>
                </Jumbotron>
            </React.Fragment>
             
        )
    }
}

const mapStateToProps = state => ({
    orderData: state.orderData
});

export default connect(mapStateToProps)(PaymentConfirmation);