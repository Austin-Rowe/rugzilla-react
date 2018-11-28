import React, { Component } from 'react';
import { Image,Grid,Row,Col,Badge,Label,Button } from 'react-bootstrap';
import { connect } from 'react-redux';


import samp1 from '../images/Samp1.jpg';
import './Cart.css';





class CartItem extends Component {
    constructor(props) {
        super(props);
        state = {
            quantity: props.cartItem.quantity
        }

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    increment(){
        const cartItemIncrementer = (quantity, itemKey)=> {
            return {
                type: "INCREMENT",
                quantity: quantity + 1,
                itemKey: itemKey
            }
        }

        const cartAction = cartItemIncrementer(this.state.quantity, this.props.cartItem.key);
        this.props.dispatch(cartAction);
    };

    decrement(){
        if(this.state.quantity >= 1){
            const cartItemDecrementer = (quantity, itemKey)=> {
                return {
                    type: "DECREMENT",
                    quantity: quantity - 1,
                    itemKey: itemKey
                }
            }
            
            const cartAction = cartItemDecrementer(this.state.quantity, this.props.cartItem.key);
            this.props.dispatch(cartAction);
        }
        
    };

    removeItem(){
        window.alert("You must build the functionality to remove an item entirely from the cart!");
    };

    render() { 
        const item = this.props.cartItem;
        return (
            <Row className="cartitem">
                <Col sm={6}>
                    <Image src={item.images[0]} alt="Product" responsive className="cart-image" />
                </Col>
                <Col sm={6} className="cart-item-text">
                    <h3>{item.manufacturer} {item.collection} {item.sizeCategory}</h3>
                    <div>
                        <Label bsStyle="success" className="cart-quantity-button add" onClick={this.increment}>+</Label>  
                        <Badge>{this.state.quantity}</Badge>  
                        <Label bsStyle="danger" className="cart-quantity-button remove" onClick={this.decrement}>-</Label>
                        <Button bsStyle="danger" className="remove-all-button" onClick={this.removeItem}>Remove Item</Button>
                    </div>
                    <p className="cart-item-description">{item.description}</p>
                </Col>
            </Row>
        );
    }
}

function Cart(props){
    const cartItems = props.cart.map( cartItem =>
        <CartItem cartItem={cartItem.item} dispatch={props.dispatch} />
    )
    return(
        <Grid id="cart">
            {cartItems}
        </Grid>
    );
}
 




/* class Cart extends Component {
    constructor(props) {
        super(props);

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.clearCart = this.clearCart.bind(this);
    }

    increment(){
        this.props.dispatch({ type: 'INCREMENT' });
    };

    decrement(){
        this.props.dispatch({ type: 'DECREMENT' });
    };

    clearCart(){
        this.props.dispatch({ type: 'CLEARCART'});
    };

    render() {
        return(
            
        )
    }
} */

const mapStateToProps = state => ({
    cartCount: state.cartCount,
    cart: state.cart
});

export default connect(mapStateToProps)(Cart);