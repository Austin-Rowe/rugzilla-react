import React, { Component } from 'react';
import { Grid,Row,Col,Button,Badge,Label } from 'react-bootstrap';
import {Link} from 'react-router-dom';

import PaypalButton from './paypal/PaypalButton';
import './Payment.css'





class Payment extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Grid>
                <Row id="payment">
                    <Col sm={4} id="cart-col">
                    <h1 id='cart-col-head'>Your Items</h1>
                        <Row className="cart-col-item">
                            <Col xs={3} sm={5}>
                                <img className="cart-item-img" src="http://images.repzio.com/productimages/175/AKINAK-05IVBE_lg.jpg" alt="Akina-Rug" />
                            </Col>
                            <Col xs={9} sm={7}>
                                <h4>Loloi Akina 5x8</h4>
                                <h4><sup>$</sup>1<sup>95</sup> each</h4>
                                <div>
                                    <Label bsStyle="success" className="cart-quantity-button add" >+</Label>  
                                    <Badge>1</Badge>  
                                    <Label bsStyle="danger" className="cart-quantity-button remove" >-</Label>
                                    <Button bsStyle="danger" className="remove-all-button">Remove</Button>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col id="info-col" sm={4}>
                        <h1>Your Info</h1>
                        <p id="info">John Doe <br/> 5861 Whitewood Circle <br/> Hoover, AL <br/> 35244 <br/> doeballer@gmail.com <br/> 2058074715</p>
                        <Link to="/customerInfoForm">
                            <Button id="edit-info-button" bsStyle="primary">Edit Info</Button>
                        </Link>
                    </Col>
                    <Col id="pay-col" sm={4}>
                        <h1>Your Total</h1>
                        <h2 id="price"><sup>$</sup>1,200<sup>95</sup></h2>
                        <h3 id="shipping-cost">with<br/>Free Shipping!</h3>
                        <PaypalButton />
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default Payment;