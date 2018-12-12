import React, { Component } from 'react';
import {Jumbotron, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Spinner from '../../stylingComponents/Spinner';

import './PaymentConfirmation.css';

class PaymentConfirmation extends Component{
    constructor(props){
        super(props);

        this.state = {
            loading: true
        }
    }

    componentDidMount(){
        setTimeout(() => this.setState({loading: false}), 5000);
    }

    render(){

        if(this.state.loading){
            return(
                <Spinner loadingMessage='Awaiting Confirmation...' />
            )
        }
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