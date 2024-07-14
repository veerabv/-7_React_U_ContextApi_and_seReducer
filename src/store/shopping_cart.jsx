import { createContext, useReducer, useState } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({
  items: [],
  onAddToCart: () => {},
  onUpdateCartItemQuantity: () => {},
});

function shoppingCartReducer(state, action) {
  // console.log(action, state);
  switch (action.type) {
    case "ADD_ITEM":
      const addItems = [...state.items];

      const existingCartItemIndex = addItems.findIndex(
        (cartItem) => cartItem.id === action.payload
      );
      const existingCartItem = addItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        addItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find(
          (product) => product.id === action.payload
        );
        addItems.push({
          id: action.payload,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: addItems,
      };

    case "UPDATE_ITEM":
      const updatedItems = [...state.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === action.payload.id
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += action.payload.amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
  }
}
export default function CartContextProvider({ children }) {
  const [cartItems, cartItemsDispatch] = useReducer(shoppingCartReducer, {
    items: [],
  });

  function handleAddItemToCart(id) {
    cartItemsDispatch({ type: "ADD_ITEM", payload: id });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    cartItemsDispatch({
      type: "UPDATE_ITEM",
      payload: { id: productId, amount: amount },
    });
  }

  let cntxtValue = {
    items: cartItems.items,
    onAddToCart: handleAddItemToCart,
    onUpdateCartItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={cntxtValue}>{children}</CartContext.Provider>
  );
}
