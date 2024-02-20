import useAxiosPrivate from "hook/useAxiosPrivate";
import { useStateContext } from "context/ContextProvider";

const CHECKOUT_URL = "/stripe/create-checkout-session";

const CheckoutButton = ({ cartItems }) => {
  console.log(cartItems);
  const useAxios = useAxiosPrivate();
  const { auth } = useStateContext();
  const userID = auth.user.id;
  const accessToken = auth.accessToken;
  const handleCheckOut = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    };
    await useAxios
      .post(CHECKOUT_URL, { cartItems, user_id: userID }, config)
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <button
      className="button w-full customShadow"
      onClick={() => handleCheckOut()}
    >
      Check Out
    </button>
  );
};

export default CheckoutButton;
