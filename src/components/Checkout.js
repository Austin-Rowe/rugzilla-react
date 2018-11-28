import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Button, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';


import './Checkout.css';

class Checkout extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            street: '',
            city: '',
            state: '',
            zipCode: ''
        }

        this.customerInputToState = this.customerInputToState.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount(){
        const cartCount = this.props.cart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0)
        const reducer = (accumulator, current) => accumulator + (current.item.price * current.quantity);
        const cartDollarTotal = this.props.cart.reduce(reducer, 0);
        const cartTotal = cartDollarTotal + (cartCount*95/100);
        this.setState({
            total: cartTotal
        })
    }

    customerInputToState(field){
        const name = field.target.name;
        const input = field.target.value;
        this.setState({
            [name]: input
        })
    }

    submitForm(){
        
    }

    render() {
        const {firstName, lastName, email, phoneNumber, street, city, zipCode} = this.state;
        let states = [
            'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'
        ];
        const stateOptions = states.map(state => <option value={state}>{state}</option>)
        
        return ( 
            <form id="checkout">
                <FormGroup>
                    <h1>Contact Info</h1>
                    <FormControl
                        type="text"
                        value={firstName}
                        placeholder="First Name"
                        name="firstName"
                        onChange={this.customerInputToState}
                    />
                    <FormControl
                        className="input-field"
                        type="text"
                        value={lastName}
                        placeholder="Last Name"
                        name="lastName"
                        onChange={this.customerInputToState}
                    />
                    <FormControl
                        className="input-field"
                        type="email"
                        value={email}
                        placeholder="Email"
                        name="email"
                        onChange={this.customerInputToState}
                    />
                    <FormControl
                        className="input-field"
                        type="text"
                        value={phoneNumber}
                        placeholder="Phone Number"
                        name="phoneNumber"
                        onChange={this.customerInputToState}
                    />
                    <HelpBlock style={{fontSize: "12px"}}>*Phone number is optional, and will only ever be used if we can not contact you by email.</HelpBlock>
                </FormGroup>
                <FormGroup>
                    <h1>Shipping Address</h1>
                    <FormControl
                        type="text"
                        value={street}
                        placeholder="Street"
                        name="street"
                        onChange={this.customerInputToState}
                    />
                    <FormControl
                        className="input-field"
                        type="text"
                        value={city}
                        placeholder="City"
                        name="city"
                        onChange={this.customerInputToState}
                    />
                    <FormControl className="input-field" componentClass="select" placeholder="State" name="state" onChange={this.customerInputToState} >
                        <option value="select">State</option>
                        {stateOptions}
                    </FormControl>
                    <FormControl
                        className="input-field"
                        type="text"
                        value={zipCode}
                        placeholder="Zip Code"
                        name="zipCode"
                        onChange={this.customerInputToState}
                    />
                </FormGroup>
                <Button bsStyle="primary" id="submit-button" onClick={this.submitForm}>Submit</Button>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    cart: state.cart
})

export default connect(mapStateToProps)(Checkout);