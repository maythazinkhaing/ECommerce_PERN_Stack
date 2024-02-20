//import { useState } from "react";
import { TbShoppingBagPlus } from "react-icons/tb";
import { useStateContext } from "../context/ContextProvider";
import useCartAPI from "util/cartAPI";
import { useState, useEffect } from "react";

const MenuCard = ({ data }) => {
  const { setCart, cart, auth } = useStateContext();
  const { id, accessToken } = auth.user || {};
  const { getCartItems, addToCart } = useCartAPI();

  const fetchCartAPI = async () => {
    try {
      const cartItems = await getCartItems(id, accessToken);

      setCart(cartItems);
    } catch (error) {
      console.log(error);
    }
  };

  //ADD TO CART
  const addItem = async (data) => {
    if (!auth.user) {
      let cartDataString = localStorage.getItem("cart");
      let cartData = cartDataString ? JSON.parse(cartDataString) : { cart: [] };
      const { cart: exitingCart = [] } = cartData;
      const existProduct = exitingCart.findIndex(
        (item) => item.product_id === data.product_id
      );

      if (existProduct >= 0) {
        const updatedCart = exitingCart.map((item, index) =>
          index === existProduct
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        localStorage.setItem("cart", JSON.stringify({ cart: updatedCart }));

        setCart(updatedCart);
      } else {
        const updatedCart = [
          ...exitingCart,
          {
            product_id: data.product_id,

            quantity: 1,
          },
        ];

        localStorage.setItem("cart", JSON.stringify({ cart: updatedCart }));

        setCart(updatedCart);
      }
    } else {
      try {
        const cartData = await addToCart(id, data.product_id, 1, accessToken);

        fetchCartAPI();
      } catch (error) {
        console.log("ERROR ADDING ITEM TO CART!");
      }
    }
  };

  //Check Sufficient Stocks
  const isInsufficientStock =
    data.qty_instock <=
    (cart || []).reduce(
      (acc, item) =>
        item.product_id === data.product_id ? acc + item.quantity : acc,
      0
    ); //Check Sufficient Stocks
  useEffect(() => {
    if (!auth.user) {
      const cartDataString = localStorage.getItem("cart");
      const cartData = cartDataString
        ? JSON.parse(cartDataString)
        : { cart: [] };
      setCart(cartData.cart);
    } else {
      fetchCartAPI();
    }
  }, [setCart]);
  return (
    <div className="w-full h-[297px] bg-white rounded-md shadow-slate-300 drop-shadow-md cursor-pointer">
      <img
        src={data.picture_path}
        alt="img"
        className="h-[195px] w-full object-cover rounded-t-md"
      />

      <div className="p-2">
        <div className="h-8 mb-2">
          <h3 className="text-xs font-medium ">{data.product_name}</h3>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs  font-light mb-2">{data.price} MMK</h3>
            <h4
              className={`${
                data.qty_instock <= 0 || isInsufficientStock
                  ? "bg-rose-200"
                  : "bg-emerald-100"
              } px-1 py-[2px]  text-[9px] rounded-sm text-center`}
            >
              {data.qty_instock <= 0 || isInsufficientStock
                ? "Out of Stock"
                : "Instock"}
            </h4>
          </div>

          <button
            className={`mr-2 p-2 rounded-full shadow-sm shadow-slate-300  ${
              data.qty_instock <= 0 || isInsufficientStock
                ? "opacity-50"
                : "hover:bg-Linen"
            }`}
            onClick={() => {
              if (!isInsufficientStock) {
                // console.log("data :" + data.qty_instock);
                // console.log("cart :" + cart.quantity);

                addItem(data);
              }
            }}
            disabled={data.qty_instock <= 0}
          >
            <TbShoppingBagPlus className="text-md text-center" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
