import { createContext, useContext, useReducer } from "react";
import { cartReducer } from "./CartReducer";

const Cart = createContext();

const CartContext = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer,[]);
  return (
    <Cart.Provider value={{cart, dispatch}}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default CartContext;