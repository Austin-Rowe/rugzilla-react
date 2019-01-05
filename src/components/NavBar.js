import React from 'react';
import { Badge,Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './NavBar.css';



function NavBar(props){
    const cartCount = props.cart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0);
    return(
        <div id="navBar">
            <Link to="/">
                <Image src="images/logo.png" className="fluid" />
            </Link>
            <Link to="/cart" id="cart-cluster">
                <Image src="images/cart.png" alt="cart" id="cartimg" />
                <Badge>{cartCount}</Badge>
            </Link>
        </div>
    );
}

const mapStateToProps = (state) => ({
    cart: state.cart
})



export default connect(mapStateToProps)(NavBar);

