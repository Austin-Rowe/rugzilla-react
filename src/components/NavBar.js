import React from 'react';
import { Navbar,Nav,Badge,Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './NavBar.css';
import logoimg from '../images/logo.png';
import cartimg from '../images/cart.png';


function NavBar(props){
    const cartCount = props.cart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0);
    return(
        <Navbar collapseOnSelect fluid>
            <Navbar.Header>
                <Link to="/">
                    <Image src={logoimg} className="fluid" />
                </Link>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight id="navlinks">
                    <Link to="/product">
                        Contact Us
                    </Link>
                    <Link to="/cart">
                        <Image src={cartimg} alt="cart" id="cartimg" />
                        <Badge>{cartCount}</Badge>
                    </Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

const mapStateToProps = (state) => ({
    cart: state.cart
})



export default connect(mapStateToProps)(NavBar);