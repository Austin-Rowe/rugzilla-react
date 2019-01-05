import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { Helmet } from 'react-helmet';


import './CustomerInfoForm.css';

class Checkout extends Component {
    constructor(props){
        super(props);
        this.state = {
            formIsInvalid: false,
            formData: this.props.customerInfo,
            formFieldValidity: {
                firstNameValid: '',
                lastNameValid: '',
                emailValid: '',
                phoneNumberValid: '',
                streetValid: '',
                cityValid: '',
                stateValid: '',
                zipCodeValid: '' 
            },
            goToPay: false
        }
        this.inputToState = this.inputToState.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    inputToState(field){
        const name = field.target.name;
        const input = field.target.value;
        if(name === 'state' && input === 'State'){
            this.setState(state => ({
                formData: {
                    ...state.formData,
                    [name]: ''
                }
            }))
        } else {
            this.setState(state => ({
                formData: {
                    ...state.formData,
                    [name]: input
                }
            }))
        }
    }

    submitForm(){
        const {formData} = this.state;
        const keys = Object.keys(formData);
        let validationBools = [];
        const reducer = (acc, currVal) => acc*currVal;
        keys.forEach(key => {
            if(key === 'email'){
                const validateEmail = (email) => {
                    var re = /\S+@\S+\.\S+/;
                    return re.test(email);
                }
                if(validateEmail(formData[key]) === false){
                    validationBools.push(false);
                } else if(validateEmail(formData[key]) === true){
                    validationBools.push(true);
                }
            } else {
                if(formData[key] === ''){
                    validationBools.push(false);
                } else if(formData[key] !== ''){
                    validationBools.push(true);
                }
            }
        })
        if(validationBools.reduce(reducer) === 1){
            const customerInfoAction = customerInfoObj => ({
                type: 'UPDATECUSTOMERINFO',
                customerInfo: customerInfoObj
            });

            const customerInfo = customerInfoAction(this.state.formData);

            this.props.dispatch(customerInfo);

            this.setState({goToPay: true});
        } else if(validationBools.reduce(reducer) === 0){
            keys.forEach(key => {
                if(formData[key] === ''){
                    this.setState(state => ({
                        formFieldValidity: {
                        ...state.formFieldValidity,
                        [`${key}Valid`]: 'invalid'
                    }
                }))
                    console.log('forEach ran with ' + key);
                }
                if(formData[key] !== ''){
                    if(key === 'email'){
                        const validateEmail = (email) => {
                            var re = /\S+@\S+\.\S+/;
                            return re.test(email);
                        }
                        if(validateEmail(formData[key]) === false){
                            this.setState(state => ({
                                formFieldValidity: {
                                    ...state.formFieldValidity,
                                    [`${key}Valid`]: 'invalid'
                                }
                            }))
                        } else if(validateEmail(formData[key]) === true){
                            this.setState(state => ({
                                formFieldValidity: {
                                    ...state.formFieldValidity,
                                    [`${key}Valid`]: ''
                                }
                            }))
                        }
                    } else {
                        this.setState(state => ({
                            formFieldValidity: {
                                ...state.formFieldValidity,
                                [`${key}Valid`]: ''
                            }
                        }))
                    }
                }
            })
            this.setState({
                formIsInvalid: true
            })
        }
    }


    render(){
        const {firstName, lastName, email, phoneNumber, street, city, state, zipCode} = this.state.formData;
        const {firstNameValid, lastNameValid, emailValid, phoneNumberValid, streetValid, cityValid, stateValid, zipCodeValid} = this.state.formFieldValidity;
        let states = [
            'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'
        ];
        const stateOptions = states.map(state => <option value={state}>{state}</option>);
        let invalidMessage;
        if(this.state.formIsInvalid){
            invalidMessage = <h5 style={{color: 'red'}}>One or more fields are invalid!</h5>
        }
        if(this.state.goToPay){
            return <Redirect to="/payment" />
        }
        return(
            <React.Fragment>
                <Helmet>
                    <title>Order Information</title>
                </Helmet>
                <form onSubmit={this.submitForm} id="form">
                    <label className="form-input-group"> <h3>Customer Contact</h3>
                        <input name="firstName" className={`form-input ${firstNameValid}`} type="text" value={firstName} onChange={this.inputToState} placeholder="First Name" />
                        <input name="lastName" className={`form-input ${lastNameValid}`} type="text" value={lastName} onChange={this.inputToState} placeholder="Last Name" />
                        <input name="email" className={`form-input ${emailValid}`} type="text" value={email} onChange={this.inputToState} placeholder="Email" />
                        <input name="phoneNumber" className={`form-input ${phoneNumberValid}`} type="text" value={phoneNumber} onChange={this.inputToState} placeholder="Phone Number" />
                    </label>
                    <label className="form-input-group"> <h3>Shipping Address</h3>
                        <input name="street" className={`form-input ${streetValid}`} type="text" value={street} onChange={this.inputToState} placeholder="Street" />
                        <input name="city" className={`form-input ${cityValid}`} type="text" value={city} onChange={this.inputToState} placeholder="City" />
                        {/* <input name="state" className="form-input" type="text" value={state} onChange={this.inputToState} placeholder="State" /> */}
                        <select className={`form-input ${stateValid}`} name="state" id="state-input" value={state} onChange={this.inputToState} >
                            <option>State</option>
                            {stateOptions}
                        </select>
                        <input name="zipCode" className={`form-input ${zipCodeValid}`} type="text" value={zipCode} onChange={this.inputToState} placeholder="Zip Code" />
                    </label>
                    <Button bsStyle="primary" id="submit-form" onClick={this.submitForm}>Submit</Button>
                    {invalidMessage}
                </form>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    customerInfo: state.customerInfo
})

export default connect(mapStateToProps)(Checkout);