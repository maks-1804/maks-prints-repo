export const fetchCart = () => {
  return dispatch => {
    const cart = dispatch(getCookie("cart"));
    dispatch(getCart((cart && JSON.parse(cart)) || []));
  };
};

export const updateCart = (itemId, qty) => {
  return (dispatch, getState) => {
    dispatch(setCart(itemId, qty));
    dispatch(setCookie("cart", JSON.stringify(getState().cart)))
  }
}
