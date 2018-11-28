import React, { Component } from 'react';
import { Grid,Row,Col,Badge,Label,Button,Thumbnail } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { connect } from 'react-redux';


import './Product.css';




class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1
        }
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    increment(){
        this.setState({
            quantity: this.state.quantity + 1
        });
    }

    decrement(){
        if(this.state.quantity > 1){
            this.setState({
                quantity: this.state.quantity - 1
            });
        } else {
            return;
        }
        
    }

    addToCart(){
        function cartActionCreator(quantity, item){
            return {
                type: "ADD_TO_CART",
                quantity: quantity,
                item: item
            }
        }
        const cartAction = cartActionCreator(this.state.quantity, this.props.item);
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
        const product = data.find(item => item.key == match.params.key);
        const images = product.images.map(item => ({
            original: item,
            thumbnail: item
        }));
        this.setState({
            item: product,
            images: images
        });
    }


    render(){
        return(
            <Grid>
                <Product item={this.state.item} images={this.state.images} dispatch={this.props.dispatch} />
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
        )
    }
}

const mapStateToProps = state => ({
    data: state.data,
    cart: state.cart
});


export default connect(mapStateToProps)(ProductPage);