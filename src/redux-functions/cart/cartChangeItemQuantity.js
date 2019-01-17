const cartChangeItemQuantity = (cart, action) => {
    //Find key of item in array that has same key
    const matchingKey = cart.findIndex( item => item.item.key === action.itemKey);
    //Copy cart array for modification
    let newCartArray = cart.slice();
    
    if(matchingKey >= 0){
        if(newCartArray[matchingKey].maxQuantity === false && newCartArray[matchingKey].item.availableQuantity > action.quantity){
            newCartArray[matchingKey].quantity = action.quantity;
        } else if(parseInt(newCartArray[matchingKey].item.availableQuantity) === action.quantity){
            newCartArray[matchingKey].quantity = action.quantity;
            newCartArray[matchingKey].maxQuantity = true;
        } else if(newCartArray[matchingKey].maxQuantity === true && newCartArray[matchingKey].item.availableQuantity > action.quantity){
            newCartArray[matchingKey].quantity = action.quantity;
            newCartArray[matchingKey].maxQuantity = false;
        }
    }
  
  
    return newCartArray;
}
  
export default cartChangeItemQuantity;