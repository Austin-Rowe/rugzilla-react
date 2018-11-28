const cartChangeItemQuantity = (cart, action) => {
  //Find key of item in array that has same key
  const matchingKey = cart.findIndex( item => item.key === action.item.key);
  //Copy cart array for modification
  let newCartArray = cart.slice();

  newCartArray[matchingKey].quantity = action.quantity;

  return newCart;
}

export default cartChangeItemQuantity;