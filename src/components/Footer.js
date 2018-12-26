import React from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {SocialIcon} from 'react-social-icons';

import './Footer.css';

const Footer = () => {
    return(
        <Grid id="footer-body">
            <Row>
                <Col sm={1} md={3}></Col>
                <Col sm={3} md={2} className="footer-col">
                    <h4>Contact Us</h4>
                    <p>accounts@ourDomain.com</p>
                    <p>(205)-807-4715</p>
                    <p>1917 2nd Ave N <br /> Bessemer, AL <br /> 35021</p>
                </Col>
                <Col sm={4} md={2} className="footer-col">
                    <h4>Connect With Us</h4>
                    <SocialIcon url="http://www.facebook.com/unitedtextileshome/" className="social-icon"/>
                    <SocialIcon url="http://www.instagram.com/unitedtextiles1917/?hl=en" className="social-icon"/>
                </Col>                                
                <Col sm={3} md={2} className="footer-col">
                    <h4>About Us</h4>
                    <Link to="/" className="footer-link">
                        <p>Our History</p>
                    </Link>
                    <Link to="/" className="footer-link">
                        <p>Retail Locations</p>
                    </Link>
                    <Link to="/" className="footer-link">
                        <p>Pricing Structure</p>
                    </Link>
                    <Link to="/" className="footer-link">
                        <p>Wholesale Options</p>
                    </Link>
                </Col>
                <Col sm={1} md={3}></Col>
            </Row>
        </Grid>
    )
}

export default Footer;



{/*  */}