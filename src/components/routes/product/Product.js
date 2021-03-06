import React, { Component } from 'react';
import { Grid,Row,Col,Badge,Label,Button } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';


import './Product.css';





class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            maxQuantity: false
        }
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    increment(){
        if(this.state.quantity < this.props.item.availableQuantity && this.state.quantity === (parseInt(this.props.item.availableQuantity) - 1)){
            this.setState(state => ({
                quantity: state.quantity + 1,
                maxQuantity: true
            }))
        } else if(this.state.quantity < this.props.item.availableQuantity){
            this.setState(state => ({
                quantity: state.quantity + 1
            }))
        }
        
    }

    decrement(){
        if(this.state.quantity > 1 && this.state.maxQuantity){
            this.setState( state => ({
                quantity: state.quantity - 1,
                maxQuantity: false
            }));
        } else if(this.state.quantity > 1){
            this.setState(state => ({
                quantity: state.quantity -1
            }))
        } else {
            return;
        }
        
    }

    addToCart(){
        function cartActionCreator(quantity, item, maxQuantity){
            return {
                type: "ADD_TO_CART",
                quantity: quantity,
                item: item,
                maxQuantity: maxQuantity
            }
        }
        const cartAction = cartActionCreator(this.state.quantity, this.props.item, this.state.maxQuantity);
        this.props.dispatch(cartAction);
    }

    render() {
        const {images, item} = this.props;
        const {manufacturer, collection, sizeCategory, description} = item;
        return(
            <Row>
                <Col sm={6}>
                    <ImageGallery showPlayButton={false} showFullscreenButton={false} items={images}/>
                </Col>
                <Col sm={6}>
                    <h1>{manufacturer} {collection} {sizeCategory}</h1> 
                    <div><Label bsStyle="success" className="cart-quantity-button add" onClick={this.increment} >+</Label> <Badge>{this.state.quantity}</Badge> <Label bsStyle="danger" className="cart-quantity-button remove" onClick={this.decrement}>-</Label> <Button bsStyle="primary" onClick={this.addToCart} >Add to Cart</Button></div>
                    {this.state.maxQuantity ? <p className="max-quantity-indicator">* Max Available Quantity</p> : null}
                    <p className="cart-item-description">{description}</p>
                </Col>
            </Row>
        )
    }
}



class ProductPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            item: {},
            images: []
        }
    }

    componentDidMount(){
        const {data, match} = this.props;
        const product = data.find(item => item.key === match.params.key);
        const images = product.images.map(item => ({
            original: 'https://s3.us-east-2.amazonaws.com/rugzilla/copiedImages' + item,
            thumbnail: 'https://s3.us-east-2.amazonaws.com/rugzilla/copiedImages' + item
        }));
        this.setState({
            item: product,
            images: images
        });
    }


    render(){
        const { item } = this.state;
        return(
            <React.Fragment>
                <Helmet>
                    <title>{item.manufacturer + ' ' + item.collection}</title>
                </Helmet>
                <Grid>
                    <Product item={item} images={this.state.images} dispatch={this.props.dispatch} />
                    {/* RELATED PRODUCTS
                    <Row>
                        <h1 id="related-products-label">Related Products</h1>
                        <Col sm={6}  md={3}>
                            <Thumbnail src="https://placeimg.com/1000/480/any" alt="242x200">
                                <h3>Thumbnail label</h3>
                                <p>Description</p>
                                <p>
                                <Button bsStyle="primary">Button</Button>
                                </p>
                            </Thumbnail>
                        </Col>
                    </Row> */}
                </Grid>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    data: state.data,
    cart: state.cart
});


export default connect(mapStateToProps)(ProductPage);