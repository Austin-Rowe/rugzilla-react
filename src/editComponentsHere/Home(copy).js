import React, { Component } from 'react';
import { Grid,Row,Col,Thumbnail,Button,Badge,Label,Panel,Checkbox,Pager } from 'react-bootstrap';
import { connect } from 'react-redux';


import samp2 from '../images/Samp2.jpg';
import './Home.css';

function FilterOptions(props){ 
    let type = props.filterType; 
    let notUnique = [];
    props.data.map( obj => 
        notUnique.push(obj[type])    
    )
    const uniqueOptionsObj = new Set(notUnique);
    const uniqueOptionsArray = [...uniqueOptionsObj]
    const options = uniqueOptionsArray.map(option =>
        <Checkbox>{option}</Checkbox>    
    )
    return(
        <div className="filter-group">
            <h4 className="filter-group-title">{props.title}</h4>
            {options}
        </div>
    )  
}
function Filter(props){
    return(
        <Col sm={3} md={2} xl={1} id="filter">
            <Panel expanded bsStyle="primary">
                <Panel.Heading>
                <Panel.Title componentClass="h3">Sort and Filter</Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                    <Button>Clear All</Button>
                    <div className="filter-group">
                        <FilterOptions title='Size' filterType='sizeCategory' data={props.data} />
                        <FilterOptions title='Material' filterType='material' data={props.data} />
                        <FilterOptions title='Thickness' filterType='pileThickness' data={props.data} />
                        <FilterOptions title='Construction' filterType='construction' data={props.data} />
                    </div>
                </Panel.Body>
            </Panel>
        </Col>
    )
}


class Product extends Component {
    constructor(props){
        super(props);
        this.state = {
            quantity: 1
        }
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }
    
    increment(e){
        e.preventDefault();
        this.setState({
            quantity: this.state.quantity + 1
        });
    }

    decrement(e){
        e.preventDefault();
        if(this.state.quantity > 1){
            this.setState({
                quantity: this.state.quantity - 1
            });
        } else {
            return;
        }
        
    }

    addToCart(e){
        e.preventDefault();
        function cartActionCreator(quantity, item){
            return {
                type: "ADD_TO_CART",
                quantity: quantity,
                item: item
            }
        }
        const cartAction = cartActionCreator(this.state.quantity, this.props.obj);
        this.props.dispatch(cartAction);
    }

    render() { 
        const obj = this.props.obj;
        return (
           <Col sm={6} md={4} lg={3}>
                <Thumbnail src={obj.images[0]} href="/product" alt="242x200">
                    <div className="card-text">
                        <h3>{obj.manufacturer} {obj.collection} {obj.sizeCategory}</h3>
                        <p className="card-description">{obj.description}</p>
                        <div>
                            <Label bsStyle="success" className="cart-quantity-button add" onClick={this.increment}>+</Label>  
                            <Badge>{this.state.quantity}</Badge>  
                            <Label bsStyle="danger" className="cart-quantity-button remove" onClick={this.decrement}>-</Label>
                            <Button bsStyle="primary" className="remove-all-button" onClick={this.addToCart}>Add to Cart</Button>
                        </div>
                    </div>
                </Thumbnail>
            </Col> 
        );
    }
}
 
//Make sure to have local state to these comps and then on addToCart pass that along with the type to the reducer
function Products(props){
    const productCards = props.data.map(obj => 
        <Product obj={obj} dispatch={props.dispatch} />
    )

    return(
        <Row>
            {productCards}
        </Row>
    )
}


function Home(props){
    return(
        <Grid fluid>
            <Row>
                <Filter data={props.data} />
                <Col sm={9} md={10} xl={11}>
                    <Products data={props.data} dispatch={props.dispatch}/>
                    <div id="pager">
                        <Button className="pager-comp" bsStyle="primary">Prev</Button>
                        <div className="pager-comp" id="page-numbers">
                            <Button>1</Button>
                            <Button>2</Button>
                            <Button>3</Button>
                            <Button bsStyle="primary">4</Button>
                            <Button>5</Button>
                        </div>
                        <Button className="pager-comp" bsStyle="primary">Next</Button>
                    </div>
                </Col>
            </Row>
        </Grid>

    )
}

const mapStateToProps = state => ({
    data: state.data
});

export default connect(mapStateToProps)(Home);


