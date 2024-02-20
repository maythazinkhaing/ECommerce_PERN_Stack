import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import Lottie from "lottie-react";
import cartAnimation from "../assets/cart.json";
import { useState, useEffect } from "react";
import { getProductsDetails } from "util/productAPI";
import useCartAPI from "util/cartAPI";
import { Loading } from "components";
import CheckoutButton from "components/CheckoutButton";

const Cart = () => {
  const { getCartItems, addToCart, decreaseInCart } = useCartAPI();
  const { auth, cart, setCart } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [item, setItem] = useState([]);

  const { id, accessToken } = auth.user || {};

  const localCart = localStorage.getItem("cart");
  const cartData = localCart ? JSON.parse(localCart) : { cart: [] };
  const { cart: cartItems = [] } = cartData;

  const fetchLocalCart = async () => {
    try {
      const productIds = cartItems.map((item) => item.product_id);
      const productDetails = await getProductsDetails(productIds);
      console.log("product Detail", productDetails);

      const combinedData = cartItems.map((cartItem) => {
        const matchingProductDetail = productDetails.find((productDetail) =>
          matchItems(cartItem, productDetail)
        );

        if (matchingProductDetail) {
          return {
            ...cartItem,
            ...matchingProductDetail,
          };
        } else {
          return {
            ...cartItem,
          };
        }
      });
      console.log("Combined Data", combinedData);
      setItem(combinedData || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCartAPI = async () => {
    try {
      //get cart item from database
      const cartItems = await getCartItems(id, accessToken);
      const productIds = cartItems.map((item) => item.product_id);

      //get item detail from database
      const productDetails = await getProductsDetails(productIds);
      //console.log("product Detail", productDetails);

      const combinedData = cartItems.map((cartItem) => {
        const matchingProductDetail = productDetails.find((productDetail) =>
          matchItems(cartItem, productDetail)
        );

        if (matchingProductDetail) {
          return {
            ...cartItem,
            ...matchingProductDetail,
          };
        } else {
          return {
            ...cartItem,
          };
        }
      });
      //console.log("Combined Data", combinedData);
      setItem(combinedData || []);
    } catch (error) {
      console.log(error);
    }
  };

  const matchItems = (cartItem, productDetail) => {
    return cartItem.product_id === productDetail.product_id;
  };

  useEffect(() => {
    if (!auth.user) {
      fetchLocalCart();
    } else {
      fetchCartAPI();
    }
    // eslint-disable-next-line
  }, [auth.user]);

  const handleDecrease = async (data) => {
    setIsLoading(true);
    if (!auth.user) {
      const updatedCart = cart
        .map((item) =>
          item.product_id === data.product_id && item.quantity > 0
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
      localStorage.setItem("cart", JSON.stringify({ cart: updatedCart }));
      setCart(updatedCart);
    } else {
      await decreaseInCart(id, data.product_id, 1, accessToken);
    }

    setTimeout(() => {
      window.location.reload();
      setIsLoading(false);
    }, 800);
  };

  const handleIncrease = async (data) => {
    setIsLoading(true);
    if (!auth.user) {
      const updatedCart = cart.map((item) =>
        item.product_id === data.product_id && item.quantity < data.qty_instock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      localStorage.setItem("cart", JSON.stringify({ cart: updatedCart }));
      setCart(updatedCart);
    } else {
      await addToCart(id, data.product_id, 1, accessToken);
    }
    setTimeout(() => {
      window.location.reload();
      setIsLoading(false);
    }, 800);
  };

  useEffect(() => {
    const newTotal = item?.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );

    setTotal(newTotal);
  }, [cart, item, setCart]);

  return (
    <div className="cart_container">
      <h1>shopping cart</h1>
      {item?.length === 0 ? (
        <div className="cart_emptySection">
          <h3>your cart is currently empty!</h3>
          <div className="w-48">
            <Lottie animationData={cartAnimation} />
          </div>
          <Link to="/menu" className="button">
            continue shopping
          </Link>
        </div>
      ) : (
        <>
          {isLoading && <Loading />}
          <div className="cart_sections">
            <div className="col-span-3">
              {item?.map((product) => (
                <div
                  className="flex justify-between p-5"
                  key={product.product_id}
                >
                  <div className="flex gap-3 items-start">
                    {" "}
                    <img
                      src={product.picture_path}
                      alt="img"
                      className="h-[120px] w-[120px] object-cover rounded"
                    />
                    <div className="grid grid-rows-4 gap-1 text-left text-xs">
                      <h2 className="row-span-2 md:row-span-1">
                        {product.product_name}
                      </h2>
                      <h3 className=" text-red-600 md:row-span-2 ">
                        MMK {product.price.toLocaleString("en-us")}
                      </h3>

                      <div className="counter ">
                        <span>
                          <button onClick={() => handleDecrease(product)}>
                            -
                          </button>
                        </span>

                        <h3>{product.quantity}</h3>

                        <span>
                          <button
                            onClick={() => handleIncrease(product)}
                            className={`${
                              product.qty_instock <= product.quantity &&
                              "opacity-50"
                            }`}
                            disabled={product.qty_instock <= product.quantity}
                          >
                            {" "}
                            +{" "}
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:flex  md:flex-row gap-2">
                    <span className="font-base text-center text-xs  text-black">
                      SUBTOTAL :
                    </span>
                    <h3 className="md:text-sm text-xs text-red-600 ">
                      {" "}
                      MMK{" "}
                      {(product.price * product.quantity).toLocaleString(
                        "en-US"
                      )}{" "}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart_summarySection ">
              <h2 className="header mb-4">Summary</h2>
              <div className="body">
                <h3>Item(s) SubTotal</h3>
                <h3>
                  {" "}
                  <span className="text-xs">MMK</span>{" "}
                  {total.toLocaleString("en-us")}
                </h3>
              </div>
              <div className="body">
                <h3>Delivery Fee</h3>
                <h3>
                  {" "}
                  <span className="text-xs">MMK</span> 2,500
                </h3>
              </div>
              <div className="body border-y border-black my-3">
                <h2 className="header">total</h2>
                <h3 className="font-medium">
                  <span className="text-xs">MMK</span>{" "}
                  {(total + 2500).toLocaleString("en-US")}
                </h3>
              </div>
              <div className="flex flex-col items-center text-center mt-8 gap-5">
                <CheckoutButton
                  cartItems={item.map((item) => ({
                    product_id: item.product_id,
                    cart_id: item.cart_id,
                    product_name: item.product_name,
                    price: item.price,
                    quantity: item.quantity,
                  }))}
                />
                <Link to="/menu" className="clearButton customShadow">
                  continue shopping
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
