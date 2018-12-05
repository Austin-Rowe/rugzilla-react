import React, { Component } from 'react';
import {BrowserRouter as Router,Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Cart from './components/Cart';
import ProductPage from './components/Product';
import CustomerInfoForm from './components/CustomerInfoForm';
import Payment from './components/Payment';
import data from './components/JSON/products.json';
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
    return undefined;
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
    return undefined;
  }
}

const customerInfo = loadCustomerInfoFromLocalStorage();

const initialState = {
  cart: persistedCart,
  productsPerLoad: 4,
  data,
  appliedFilters: [],
  filteredData: data,
  visibleProducts: 1,
  sortByPrice: {
    lowToHigh: false,
    highToLow: false
  },
  customerInfo: customerInfo
};

function reducer(state = initialState, action){
  switch(action.type){
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
    default: return state;
  }
}

const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  
);

store.subscribe(() => saveCartToLocalStorage(store.getState()));
store.subscribe(() => saveCustomerInfoToLocalStorage(store.getState()));


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
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;














