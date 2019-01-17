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
                    <p>account@ourDomain.com</p>
                    <p>(205)-123-4567</p>
                    <p>111 Maple St<br /> Atlantis, UnderDaSea <br /> 12345</p>
                </Col>
                <Col sm={4} md={2} className="footer-col">
                    <h4>Connect With Us</h4>
                    <SocialIcon url="http://www.facebook.com" className="social-icon"/>
                    <SocialIcon url="http://www.instagram.com" className="social-icon"/>
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
