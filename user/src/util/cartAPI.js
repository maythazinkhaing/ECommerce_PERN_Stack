import useAxiosPrivate from "hook/useAxiosPrivate";

const ADD_TO_CART = "cart/add";
const GET_CART_ITEMS = "cart/cartItems";
const DECREASE_IN_CART = "cart/decrease";

const useCartAPI = () => {
  const useAxios = useAxiosPrivate();

  const addToCart = async (user_id, product_id, quantity, accessToken) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    };
    try {
      const response = await useAxios.post(
        ADD_TO_CART,
        {
          user_id,
          product_id,
          quantity,
        },
        config
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseInCart = async (user_id, product_id, quantity, accessToken) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    };
    try {
      const response = await useAxios.post(
        DECREASE_IN_CART,
        {
          user_id,
          product_id,
          quantity,
        },
        config
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCartItems = async (user_id, accessToken) => {
    console.log(user_id);
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    };
    try {
      const response = await useAxios.get(
        `${GET_CART_ITEMS}/${user_id}`,
        config
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    addToCart,
    getCartItems,
    decreaseInCart,
  };
};

export default useCartAPI;
