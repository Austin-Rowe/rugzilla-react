const removeFromCart = (cart, action) => {
    //Find key of item in array that has same key
    const matchingKey = cart.findIndex( item => item.item.key === action.itemKey);
    //Copy cart array for modification
    let newCartArray = cart.slice();
    
    newCartArray.splice(matchingKey, 1);
  
  
    return newCartArray;
}
  
export default removeFromCart;