const cartChangeItemQuantity = (cart, action) => {
    //Find key of item in array that has same key
    const matchingKey = cart.findIndex( item => item.item.key === action.itemKey);
    //Copy cart array for modification
    let newCartArray = cart.slice();
    
    if(matchingKey >= 0){
        newCartArray[matchingKey].quantity = action.quantity;
    }
  
  
    return newCartArray;
}
  
export default cartChangeItemQuantity;