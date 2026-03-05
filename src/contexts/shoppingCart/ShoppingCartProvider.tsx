import ShoppingCartContext from "./ShoppingCartContext";
import { useState, useEffect, useReducer } from "react";
import { CartItem } from "@/types/custom";
import useLocalStorage from "@/hooks/useLocalStorage";
import shoppingCartReducer, {
  addItem,
  removeItem,
  updateItem as updateCartItem,
  clearCart as clearCartItem,
} from "../../reducers/shoppingCartReducer";
import usePresistedReducer from "@/hooks/usePresistedReducer";
import useShoppingCartAction from "@/hooks/useShoppingCartAction";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import useApiData from "@/hooks/useApiData";
import { ShoppingCart } from "@/types/custom";

interface ShoppingCartProviderProps {
  children: React.ReactNode;
}

const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
  const [cartItems, dispatch] = usePresistedReducer(
    shoppingCartReducer,
    "shopping-cart",
    []
  );

  const { data: shoppingCartData, fetchData } = useApiData<ShoppingCart>(
    "http://localhost:5293/api/ShoppingCart",
    {
      autoFetch: false,
    }
  );

  const { token } = useSelector((state: RootState) => state.user);
  const { addToCart, removeFromCart, updateItem, clearCart, syncCart } =
    useShoppingCartAction(dispatch);

  useEffect(() => {
    if (token) {
      fetchData({
        overrideHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }, [token]);

  useEffect(() => {
    if (shoppingCartData) {
      console.log("购物车数据:", shoppingCartData);
      // 同步购物车
      syncCart(shoppingCartData.items);
    }
  }, [shoppingCartData]);

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateItem,
        clearCart,
        syncCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
