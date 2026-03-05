import { Dispatch } from "react";
import {
  CartAction,
  addItem,
  removeItem,
  updateItem,
  clearCart,
  syncCart,
} from "../reducers/shoppingCartReducer";
import { CartItem } from "@/types/custom";
import useApiData from "./useApiData";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const useShoppingCartAction = (dispatch: Dispatch<CartAction>) => {
  const { data, fetchData: callApi } = useApiData<any>(
    "http://localhost:5293/api/ShoppingCart/items",
    { autoFetch: false }
  );
  const { token } = useSelector((s: RootState) => s.user);

  return {
    addToCart: async (item: CartItem) => {
      try {
        await callApi({
          overrideMethod: "POST",
          overrideHeaders: { Authorization: `Bearer ${token}` },
          overrideBody: item,
        });
        dispatch(addItem(item));
      } catch (err) {
        console.error("添加购物车失败:", err);
      }
    },
    removeFromCart: (index: number) => dispatch(removeItem(index)),
    updateItem: (index: number, newItem: CartItem) =>
      dispatch(updateItem(index, newItem)),
    clearCart: async () => {
      try {
        await callApi({
          overrideMethod: "DELETE",
          overrideHeaders: { Authorization: `Bearer ${token}` },
        });
        dispatch(clearCart());
      } catch (err) {
        console.error("清空购物车失败:", err);
      }
    },
    syncCart: (items: CartItem[]) => dispatch(syncCart(items)),
  };
};

export default useShoppingCartAction;
