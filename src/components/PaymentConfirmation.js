import React, { Component } from 'react';
import {Jumbotron, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import './PaymentConfirmation.css';

class PaymentConfirmation extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
             <Jumbotron id="empty-cart-jumbotron">
                <h1>Thank you for ordering with United Textiles!</h1>
                <h3>Your confirmation # is 123456789</h3>
                <Link to="/" >
                    <Button bsStyle="primary" bsSize="large">Return to Homepage</Button>
                </Link>
            </Jumbotron>
        )
    }
}

export default PaymentConfirmation;