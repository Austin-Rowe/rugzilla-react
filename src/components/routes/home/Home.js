import React, { Component } from 'react';
import { Grid,Row,Col,Thumbnail,Button,Badge,Label,Panel,Checkbox } from 'react-bootstrap';
import { connect } from 'react-redux';
import Spinner from '../../stylingComponents/Spinner';
import './Home.css';
import { Helmet } from 'react-helmet';

class FilterOption extends Component {
    constructor(props) {
        super(props);
        this.state= {
            checked: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(){
        const filterType = this.props.filterType;
        const filterSelection = this.props.option;
        const isSelected = !this.state.checked;
        const productFilterModifier = (filterType, param, isSelected)=> {
            if(isSelected){
                return {
                    type: "EDITFILTERPARAMS",
                    filterType: filterType,
                    param: param,
                    isSelected: isSelected
                }
            } else {
                return {
                    type: "EDITFILTERPARAMS",
                    filterType: filterType,
                    param: param,
                    isSelected: isSelected
                }
            }
            
        };

        const filterAction = productFilterModifier(filterType, filterSelection, isSelected);
        this.props.dispatch(filterAction);

        this.setState(state =>({
            checked: !state.checked
        }));
    }

    render() {
        return(
            <Checkbox checked={this.state.checked} onChange={this.handleChange}>{this.props.option}</Checkbox>
        )
    }
}

function FilterOptions(props){ 
    let type = props.filterType; 
    let notUnique = [];
    props.data.map( obj => 
        notUnique.push(obj[type])    
    )
    const uniqueOptionsObj = new Set(notUnique);
    const uniqueOptionsArray = [...uniqueOptionsObj]
    const options = uniqueOptionsArray.map(option =>
        <FilterOption option={option} dispatch={props.dispatch} filterType={type} key={option} />   
    )
    return(
        <div className="filter-group">
            <h4 className="filter-group-title">{props.title}</h4>
            {options}
        </div>
    )  
}

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lowHighChecked: false,
            highLowChecked: false,
            filterOptions: [],
            filterExp: true
        }

        this.sortPriceLowHigh = this.sortPriceLowHigh.bind(this);
        this.sortPriceHighLow = this.sortPriceHighLow.bind(this);
        this.initFilterExp = this.initFilterExp.bind(this);
        this.toggleFilterExp = this.toggleFilterExp.bind(this);
    }

    toggleFilterExp(){
        this.setState(state => ({filterExp: !state.filterExp}))
    }

    initFilterExp(){
        this.setState({filterExp: window.innerWidth > 767})
    }

    componentDidMount(){
        this.initFilterExp();
        window.addEventListener("resize", this.initFilterExp);
        const filterOptionsArray = [
            {
                title: 'Size',
                filterType: 'sizeCategory'
            },
            {
                title: 'Material',
                filterType: 'material'
            },
            {
                title: 'Thickness',
                filterType: 'pileThickness'
            },
            {
                title: 'Construction',
                filterType: 'construction'
            }
        ];
        const filterOptions = filterOptionsArray.map(item => <FilterOptions title={item.title} filterType={item.filterType} data={this.props.data} dispatch={this.props.dispatch} key={item.filterType} />);
        this.setState({filterOptions: filterOptions});
    }

    componentDidUpdate(prevProps){
        if(prevProps.data !== this.props.data){
            const filterOptionsArray = [
                {
                    title: 'Size',
                    filterType: 'sizeCategory'
                },
                {
                    title: 'Material',
                    filterType: 'material'
                },
                {
                    title: 'Thickness',
                    filterType: 'pileThickness'
                },
                {
                    title: 'Construction',
                    filterType: 'construction'
                }
            ];
            const filterOptions = filterOptionsArray.map(item => <FilterOptions title={item.title} filterType={item.filterType} data={this.props.data} dispatch={this.props.dispatch} />);
            this.setState({filterOptions: filterOptions});
        }
    }

    sortPriceLowHigh(){
        if(!this.state.lowHighChecked){
            this.setState({
                lowHighChecked: true,
                highLowChecked: false
            })
            const sortAction = {
                type: "SORTBYPRICE",
                order: 'lowToHigh',
                selected: true
            }
            this.props.dispatch(sortAction);
        } else if(this.state.lowHighChecked){
            this.setState({
                lowHighChecked: false,
                highLowChecked: false
            })
            const sortAction = {
                type: "SORTBYPRICE",
                order: 'lowToHigh',
                selected: false
            }
            this.props.dispatch(sortAction);
        }
    }

    sortPriceHighLow(){
        
        if(!this.state.highLowChecked){
            this.setState({
                lowHighChecked: false,
                highLowChecked: true
            })
            const sortAction = {
                type: "SORTBYPRICE",
                order: 'highToLow',
                selected: true
            }
            this.props.dispatch(sortAction);
        } else if(this.state.highLowChecked){
            this.setState({
                lowHighChecked: false,
                highLowChecked: false
            })
            const sortAction = {
                type: "SORTBYPRICE",
                order: 'highToLow',
                selected: false
            }
            this.props.dispatch(sortAction);
        }
    }

    render() {
        return(
            <Col sm={3} md={2} xl={1} id="filter">
                <Panel expanded={this.state.filterExp} bsStyle="primary" onToggle={this.toggleFilterExp}>
                    <Panel.Heading>
                    <Panel.Title componentClass="h3" toggle id="filter-title">Filter & Sort</Panel.Title>
                    
                    </Panel.Heading>
                    <Panel.Body collapsible id="filter-body">
                        <div className="filter-group">
                            {this.state.filterOptions}
                        </div>
                        <div>
                            <h4>Sort By</h4>
                            <Checkbox checked={this.state.lowHighChecked} onChange={this.sortPriceLowHigh}>Price: Low to High</Checkbox>
                            <Checkbox checked={this.state.highLowChecked} onChange={this.sortPriceHighLow}>Price: High to Low</Checkbox>
                        </div>
                    </Panel.Body>
                </Panel>
            </Col>
        )
    }
}


class Product extends Component {
    constructor(props){
        super(props);
        this.state = {
            quantity: 1,
            maxQuantiy: false
        }
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }
    
    increment(e){
        e.preventDefault();
        if(this.props.obj.availableQuantity > this.state.quantity && this.props.obj.availableQuantity - 1 === this.state.quantity ){
            this.setState({
                quantity: this.state.quantity + 1,
                maxQuantiy: true
            });
        } else if(this.props.obj.availableQuantity > this.state.quantity){
            this.setState({quantity: this.state.quantity + 1});
        }
        
    }

    decrement(e){
        e.preventDefault();
        if(this.state.quantity > 1 && this.props.obj.availableQuantity === this.state.quantity){
            this.setState({
                quantity: this.state.quantity - 1,
                maxQuantity: false
            });
        } else if(this.state.quantity > 1){
            this.setState({quantity: this.state.quantity - 1});
        }
    }

    addToCart(e){
        e.preventDefault();
        const cartActionCreator = (quantity, item, maxQuantity) => {
            return {
                type: "ADD_TO_CART",
                quantity: quantity,
                item: item,
                maxQuantity: maxQuantity
            }
        }
        const cartAction = cartActionCreator(this.state.quantity, this.props.obj, this.state.maxQuantity);
        this.props.dispatch(cartAction);
    }

    render() { 
        const obj = this.props.obj;
        return (
           <Col sm={6} md={4} lg={3}>
                <Thumbnail src={'https://s3.us-east-2.amazonaws.com/rugzilla/copiedImages' + obj.images[0]} href={'/product/'+obj.key}>
                    <div>
                        <h4>{obj.manufacturer} {obj.collection} {obj.sizeCategory}</h4>
                        <h3><sup>$</sup>{obj.price}<sup>95</sup></h3>
                        <ul>
                            <li>{obj.madeOf}</li>
                            <li>{obj.sizeTrue}</li>
                            <li>{obj.trueConstruction}</li>
                        </ul>
                        <div>
                            <div id="increment-button-group">
                                <Label bsStyle="success" className="cart-quantity-button add" onClick={this.increment}>+</Label>  
                                <Badge>{this.state.quantity}</Badge>  
                                <Label bsStyle="danger" className="cart-quantity-button remove" onClick={this.decrement}>-</Label>
                            </div>
                            <Button bsStyle="primary" className="remove-all-button" onClick={this.addToCart}>Add to Cart</Button>
                        </div>
                        {this.state.maxQuantiy ? <p className="max-quantity-indicator">* Max Available Quantity</p> : null}
                    </div>
                </Thumbnail>
            </Col> 
        );
    }
}
 
class Products extends Component {
    constructor(props) {
        super(props);
        this.loadMoreProducts = this.loadMoreProducts.bind(this);
    }

    loadMoreProducts(){
        const viewMore = {
            type: "VIEWMORE"
        }
        this.props.dispatch(viewMore);
    }

    render() {
        const filterForUniqueObjs = objArray => {
            let seen = {};
            return objArray.filter(obj => seen.hasOwnProperty(obj.key) ? false : seen[obj.key] = true)
        }
        
        let productCards = filterForUniqueObjs(this.props.filteredData).slice(0, this.props.visibleProducts).map(obj => 
            <Product obj={obj} dispatch={this.props.dispatch} key={obj.key} />
        )

        return(
            <Col sm={9} md={10} xl={11}>
                <Row>
                    {productCards}
                </Row>
                <div id="load-more">
                    <Button bsStyle="primary" bsSize="large" id="load-more-button" onClick={this.loadMoreProducts}>Load More</Button>
                </div>
            </Col>
        )
    }
}


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataForFilter: [],
            loading: true            
        }
    }

    componentDidMount(){
        fetch('http://18.188.129.119:8000/rugs')
        .then(res => {
            return res.json()
        })
        .then(resArr => {
            this.props.dispatch({type:'LOADDATA', data: resArr});
            this.setState({dataForFilter: resArr, loading: false});
        })
        .catch(err => console.log(err))
    }

    render() {
        const {
            props,
        } = this;

        if(this.state.loading){
            return(
                <Spinner loadingMessage='Loading...' />
            )
        }
        return(
            <React.Fragment>
                <Helmet>
                    <title>RUGZILLA</title>
                </Helmet>
                <Grid fluid>
                    <Row>
                        <Filter data={this.state.dataForFilter} dispatch={props.dispatch}/>
                        <Products filteredData={props.filteredData} visibleProducts={props.visibleProducts} dispatch={props.dispatch}/>
                    </Row>
                </Grid>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    filteredData: state.filteredData,
    data: state.data,
    visibleProducts: state.visibleProducts
});

export default connect(mapStateToProps)(Home);


