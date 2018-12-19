import React, { Component } from 'react';
import {BrowserRouter as Router,Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './components/routes/home/Home';
import Cart from './components/routes/cart/Cart';
import ProductPage from './components/routes/product/Product';
import CustomerInfoForm from './components/routes/customerInfo/CustomerInfoForm';
import Payment from './components/routes/payment/Payment';
import PaymentConfirmation from './components/routes/paymentConfirmation/PaymentConfirmation';
import cartReturner from './redux-functions/cart/cartReturner';
import cartChangeItemQuantity from './redux-functions/cart/cartChangeItemQuantity';
import removeFromCart from './redux-functions/cart/removeFromCart';
import addFilterParam from './redux-functions/product-filter/addFilterParam';
import removeFilterParam from './redux-functions/product-filter/removeFilterParam';
import modifyAppliedFilters from './redux-functions/product-filter/modifyAppliedFilters';
import sortByPrice from './redux-functions/product-sort/sortByPrice';
import modifyPriceSort from './redux-functions/product-sort/modifySortByPriceObj';

function saveCartToLocalStorage(state){
  try{
    const serializedCart = JSON.stringify(state.cart);
    localStorage.setItem('cart', serializedCart)
  } catch(e) {
    console.log(e);
  }
}

function loadCartFromLocalStorage(){
  try{
    const serializedCart = localStorage.getItem('cart');
    return serializedCart === null ?  [] : JSON.parse(serializedCart);
  } catch(e){
    console.log(e);
    return [];
  }
}

const persistedCart = loadCartFromLocalStorage();

function saveCustomerInfoToLocalStorage(state){
  try{
    const serializedCustomerInfo = JSON.stringify(state.customerInfo);
    localStorage.setItem('customerInfo', serializedCustomerInfo)
  } catch(e) {
    console.log(e);
  }
}

function loadCustomerInfoFromLocalStorage(){
  try{
    const serializedCustomerInfo = localStorage.getItem('customerInfo');
    return serializedCustomerInfo === null ?  {
      firstName: '', lastName: '', email: '', phoneNumber: '', street: '', city: '', state: '', zipCode: ''
    } : JSON.parse(serializedCustomerInfo);
  } catch(e){
    console.log(e);
    return { firstName: '', lastName: '', email: '', phoneNumber: '', street: '', city: '', state: '', zipCode: '' };
  }
}

const customerInfo = loadCustomerInfoFromLocalStorage();

function saveProductsToLocalStorage(state){
  try{
    const products = JSON.stringify(state.data);
    localStorage.setItem('products', products)
  } catch(e) {
    console.log(e);
  }
}

function loadProductsFromLocalStorage(){
  try{
    const products = localStorage.getItem('products');
    return products === null ?  [] : JSON.parse(products);
  } catch(e){
    console.log(e);
    return [];
  }
}

const products = loadProductsFromLocalStorage();

function persistOrderDataToLocalStorage(state){
  try{
    const orderData = JSON.stringify(state.orderData);
    localStorage.setItem('orderData', orderData)
  } catch(e) {
    console.log(e);
  }
}

function loadOrderDataFromLocalStorage(){
  try{
    const orderData = localStorage.getItem('orderData');
    return orderData === null ?  {purchaseCart:[]} : JSON.parse(orderData);
  } catch(e){
    console.log(e);
    return {purchaseCart:[]};
  }
}

const orderData = loadOrderDataFromLocalStorage();

const initialState = {
  cart: persistedCart,
  productsPerLoad: 4,
  data: products,
  appliedFilters: [],
  filteredData: [],
  visibleProducts: 1,
  sortByPrice: {
    lowToHigh: false,
    highToLow: false
  },
  customerInfo: customerInfo,
  orderData: orderData
};

function reducer(state = initialState, action){
  switch(action.type){
    case "LOADDATA": return {...state, data: action.data, filteredData: action.data};
    case "UPDATECUSTOMERINFO": return {...state, customerInfo: action.customerInfo};
    case "VIEWMORE": return {...state, visibleProducts: state.visibleProducts + 1 };
    case "ADDFILTERPARAM": return {...state, visibleProducts: 1, appliedFilters: modifyAppliedFilters(state.appliedFilters, action), filteredData: addFilterParam(state.filteredData, action) };
    case "REMOVEFILTERPARAM": return {...state, visibleProducts: 1, appliedFilters: modifyAppliedFilters(state.appliedFilters, action), filteredData: removeFilterParam(state.data, state.appliedFilters, state.sortByPrice) };
    case "SORTBYPRICE": return {...state, visibleProducts: 1, filteredData: sortByPrice(state.filteredData, action), sortByPrice: modifyPriceSort(state.sortByPrice, action) };
    case "CLEARFILTERS": return {...state, visibleProducts: 1, appliedFilters: [], filteredData: state.data};
    case "INCREMENT": return { ...state, cart: cartChangeItemQuantity(state.cart, action) };
    case "DECREMENT": return { ...state, cart: cartChangeItemQuantity(state.cart, action) };
    case "REMOVEFROMCART": return {...state, cart: removeFromCart(state.cart, action) };
    case "ADD_TO_CART": return { ...state, cart: cartReturner(state.cart, action)};
    case "PAYPALSUCCESS": return {...state, orderData: action.data};
    default: return state;
  }
}

const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  
);

store.subscribe(() => saveCartToLocalStorage(store.getState()));
store.subscribe(() => saveCustomerInfoToLocalStorage(store.getState()));
store.subscribe(() => saveProductsToLocalStorage(store.getState()));
store.subscribe(() => persistOrderDataToLocalStorage(store.getState()));


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <NavBar />
            <Route exact path="/" render={(props) => <Home {...props} loadMoreQuantity={3} />} />
            <Route path="/cart" component={Cart} />
            <Route path="/product/:key" component={ProductPage} />
            <Route path="/customerInfoForm" component={CustomerInfoForm} />
            <Route path="/payment" component={Payment} />
            <Route path="/confirmation" component={PaymentConfirmation} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;














