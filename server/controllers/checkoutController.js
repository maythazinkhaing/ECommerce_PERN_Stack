const pool = require("../config/db");
const dotenv = require("dotenv").config();
const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
DOMAIN = "http://localhost:3000";

const checkout = async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      user_id: req.body.user_id,
      cart: JSON.stringify(req.body.cartItems),
    },
  });
  console.log(req.body.cartItems);
  const line_items = req.body.cartItems?.map((item) => {
    return {
      price_data: {
        currency: "mmk",
        product_data: {
          name: item.product_name,
          metadata: {
            id: item.product_id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: {
      allowed_countries: ["MM", "TH"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 2500 * 100,
            currency: "MMK",
          },
          display_name: "A One-day Delivery",
          delivery_estimate: {
            minimum: {
              unit: "hour",
              value: 1,
            },
            maximum: {
              unit: "hour",
              value: 2,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },

    line_items,
    mode: "payment",
    customer: customer.id,
    success_url: `${DOMAIN}/checkout-success`,
    cancel_url: `${DOMAIN}/cart`,
  });

  res.send({ url: session.url });
};

//Webhooks

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_6082b63e4c06b4b20b67b6a68b72f9570a682a54920f7135623a5c2681e7f204";

const handleWebhook = (request, response) => {
  const sig = request.headers["stripe-signature"];

  let event;
  let data;
  let eventType;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    //console.log("Webhook verified!");
    data = event.data.object;
    eventType = event.type;
  } catch (err) {
    // console.log(`Webhook Error: ${err.message}`);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (eventType === "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then((customer) => {
        console.log(customer);
        console.log("data : ", data);
      })
      .catch((err) => console.log(err));
  }

  // Handle the event

  // Return a 200 response to acknowledge receipt of the event
  response.send();
};

module.exports = { checkout, handleWebhook };
