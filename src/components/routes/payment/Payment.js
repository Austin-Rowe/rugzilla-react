import React, { Component } from 'react';
import { Grid,Row,Col,Button,Badge,Label,Jumbotron } from 'react-bootstrap';
import {Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import PaypalButton from '../../paypal/PaypalButton';
import './Payment.css'


const CartItem = (props) => {
    function increment(){
        const cartItemIncrementer = (quantity, itemKey)=> ({
            type: "INCREMENT",
            quantity: quantity + 1,
            itemKey: itemKey
        })

        const cartAction = cartItemIncrementer(props.cartItem.quantity, props.cartItem.item.key);
        props.dispatch(cartAction);
    };

    function decrement(){
        if(props.cartItem.quantity >= 1){
            const cartItemDecrementer = (quantity, itemKey)=> ({
                type: "DECREMENT",
                quantity: quantity - 1,
                itemKey: itemKey
            })
            
            const cartAction = cartItemDecrementer(props.cartItem.quantity, props.cartItem.item.key);
            props.dispatch(cartAction);
        }
        
    };

    function removeFromCart(){
        const cartItemRemove = itemKey => ({
            type: "REMOVEFROMCART",
            itemKey: itemKey
        })

        const cartAction = cartItemRemove(props.cartItem.item.key);
        props.dispatch(cartAction);
    };
    
    
    const {cartItem} = props;
    const {item} = cartItem;
    
    return(
        <Row className="cart-col-item">
            <Col xs={3} sm={5}>
                <img className="cart-item-img" src={item.images[0]} alt={item.collection} />
            </Col>
            <Col xs={9} sm={7}>
                <h4>{item.manufacturer} {item.collection} {item.sizeCategory}</h4>
                <h4><sup>$</sup>{item.price}<sup>95</sup> each</h4>
                <div>
                    <Label bsStyle="success" className="cart-quantity-button add" onClick={increment}>+</Label>  
                    <Badge>{cartItem.quantity}</Badge>  
                    <Label bsStyle="danger" className="cart-quantity-button remove" onClick={decrement}>-</Label>
                    <Button bsStyle="danger" className="remove-all-button" onClick={removeFromCart}>Remove</Button>
                </div>
            </Col>
        </Row>
    )
}


class Payment extends Component{
    constructor(props){
        super(props);
        this.state={
            paymentSuccessful: false
        }
    }

    render(){
        const cartItems = this.props.cart.map(cartItem => <CartItem cartItem={cartItem} dispatch={this.props.dispatch}/>);
        const {customerInfo} = this.props;
        const cartCount = this.props.cart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0)
        const reducer = (accumulator, current) => accumulator + (current.item.price * current.quantity);
        const cartDollarTotal = this.props.cart.reduce(reducer, 0);
        const cartTotal = cartDollarTotal + (cartCount*95/100);
        const client = {
            sandbox: "AVs_AY19sM-9EkTmunOiYdmxmqGYMxuOi7dB9nRusGx4MpIZ9mn3vHtxs76R7uShG2juynPzEbVCq3Pc",
            production: ""
        }
        const onSuccess = (payment) => {
            const paymentData = {
                payPalRes: payment,
                purchaseCart: this.props.cart,
                customerInfo: this.props.customerInfo
            };
            this.setState({
                paymentSuccessful: true
            });
            this.props.dispatch({type:'PAYPALSUCCESS', data: paymentData});
        }

        if(this.state.paymentSuccessful){
            return(
                <Redirect push to="/confirmation" />
            )
        }

        if(cartItems.length > 0 && !this.state.paymentSuccessful){
            return(
                <Grid>
                    <Row id="payment">
                        <Col sm={4} id="cart-col">
                        <h1 id='cart-col-head'>Your Items</h1>
                            {cartItems}
                        </Col>
                        <Col id="info-col" sm={4}>
                            <h1>Your Info</h1>
                            <p id="info">{customerInfo.firstName} {customerInfo.lastName} <br/> {customerInfo.street} <br/> {customerInfo.city}, {customerInfo.state} <br/> {customerInfo.zipCode} <br/> {customerInfo.email} <br/> {customerInfo.phoneNumber}</p>
                            <Link to="/customerInfoForm">
                                <Button id="edit-info-button" bsStyle="primary">Edit Info</Button>
                            </Link>
                        </Col>
                        <Col id="pay-col" sm={4}>
                            <h1>Your Total</h1>
                            <h2 id="price"><sup>$</sup>{cartTotal.toFixed(2)}</h2>
                            <h3 id="shipping-cost">with<br/>Free Shipping!</h3>
                            <PaypalButton
                                client={client}
                                env={'sandbox'}
                                commit={true}
                                currency={'USD'}
                                total={cartTotal}
                                onSuccess={onSuccess}
                                shipping={1}
                            />
                        </Col>
                    </Row>
                </Grid>
            )
        }
        return(
            <Jumbotron id="empty-cart-jumbotron">
                <h1>Your cart seems to be empty.</h1>
                <h3>You should go fill it up!</h3>
                <Link to="/" >
                    <Button bsStyle="primary" bsSize="large">Return to Products!</Button>
                </Link>
            </Jumbotron>
        )
    }
}

const mapStateToProps = state => ({
    cart: state.cart,
    customerInfo: state.customerInfo
})

export default connect(mapStateToProps)(Payment);