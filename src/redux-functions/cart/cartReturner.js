const cartReturner = (cart, action) => {
  //Find key of item in array that has same key
  const matchingKey = cart.findIndex( item => item.item.key === action.item.key);
  //Copy cart array for modification
  let newCartArray = cart.slice();
  //Ensure new array isnt empty
  const arrayChecker = (array, index) => {
    if(index >= 0){
      array[index].quantity = array[index].quantity + action.quantity;
      return array;
    } else {
      return [...array, action]
    }
  }
  //Assign returned value to cart
  const newCart = arrayChecker(newCartArray, matchingKey);
  return newCart;
}

export default cartReturner;