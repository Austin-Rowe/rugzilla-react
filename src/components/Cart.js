import React, { Component } from 'react';
import { Image,Grid,Row,Col,Badge,Label,Button,Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PaypalButton from './paypal/PaypalButton';


import Or from './stylingComponents/Or';
import './Cart.css';



class CartItem extends Component {
    constructor(props) {
        super(props);

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
    }

    increment(){
        const cartItemIncrementer = (quantity, itemKey)=> ({
            type: "INCREMENT",
            quantity: quantity + 1,
            itemKey: itemKey
        })

        const cartAction = cartItemIncrementer(this.props.cartItem.quantity, this.props.cartItem.item.key);
        this.props.dispatch(cartAction);
    };

    decrement(){
        if(this.props.cartItem.quantity >= 1){
            const cartItemDecrementer = (quantity, itemKey)=> ({
                type: "DECREMENT",
                quantity: quantity - 1,
                itemKey: itemKey
            })
            
            const cartAction = cartItemDecrementer(this.props.cartItem.quantity, this.props.cartItem.item.key);
            this.props.dispatch(cartAction);
        }
        
    };

    removeFromCart(){
        const cartItemRemove = itemKey => ({
            type: "REMOVEFROMCART",
            itemKey: itemKey
        })

        const cartAction = cartItemRemove(this.props.cartItem.item.key);
        this.props.dispatch(cartAction);
    };

    render() { 
        const item = this.props.cartItem.item;
        return (
            <Row className="cartitem">
                <Col sm={6}>
                    <Image src={item.images[0]} alt="Product" responsive className="cart-image" />
                </Col>
                <Col sm={6} className="cart-item-text">
                    <h3>{item.manufacturer} {item.collection} {item.sizeCategory}</h3>
                    <h2><sup>$</sup>{item.price}<sup>95</sup></h2>
                    <div>
                        <Label bsStyle="success" className="cart-quantity-button add" onClick={this.increment}>+</Label>  
                        <Badge>{this.props.cartItem.quantity}</Badge>  
                        <Label bsStyle="danger" className="cart-quantity-button remove" onClick={this.decrement}>-</Label>
                        <Button bsStyle="danger" className="remove-all-button" onClick={this.removeFromCart}>Remove</Button>
                    </div>
                    <p className="cart-item-description">{item.description}</p>
                </Col>
            </Row>
        );
    }
}

class Cart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            props,
        } = this;

        const cartCount = props.cart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0)
        const reducer = (accumulator, current) => accumulator + (current.item.price * current.quantity);
        const cartDollarTotal = props.cart.reduce(reducer, 0);
        const cartTotal = cartDollarTotal + (cartCount*95/100);
        const cartItems = props.cart.map( cartItem =>
            <CartItem cartItem={cartItem} dispatch={props.dispatch} key={cartItem.key} />
        )
        
        if(cartItems.length > 0){
            return(
                <Grid id="cart">
                    <Row>
                        <Col sm={6} id="cart-title">
                            <h1>Your Cart({cartCount} Items)</h1>
                        </Col>
                        <Col sm={6} id="total-summary">
                            <h3>Total: <sup>$</sup>{cartTotal.toFixed(2)}</h3>
                            <Link to="/customerInfoForm">
                                <Button bsStyle="primary" style={{
                                    width: "65%",
                                    height: "45px"
                                }}>Checkout</Button>
                            </Link>
                            <Or />
                            <Link to="/">
                                <Button bsStyle="primary" style={{
                                    width: "65%",
                                    height: "45px"
                                }}>Return to Items</Button>
                            </Link>
                            </Col>
                    </Row>
                    {cartItems}
                </Grid>
            );
        }
        return(
            <Jumbotron id="empty-cart-jumbotron">
                <h1>There's nothing in your cart. How disappointing!</h1>
                <h3>Lets see if we can change that!</h3>
                <Link to="/" >
                    <Button bsStyle="primary" bsSize="large">Return to Products!</Button>
                </Link>
            </Jumbotron>
        );
    }
}


const mapStateToProps = state => ({
    cart: state.cart
});

export default connect(mapStateToProps)(Cart);