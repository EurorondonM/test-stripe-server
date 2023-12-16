import express from "express";
import Stripe from "stripe";
import cors from "cors";

const publicKey =
  "pk_test_51ODTD4AWKgvi1dxbq0OKvsNQ8sy3BNYaDpGVp5iG989uCGAkHhs5UPf5B6SLfmNONAwBvr6qZOEPnXGUIjskbbbC002UTbBwXt";

const secretKey =
  "sk_test_51ODTD4AWKgvi1dxbYilbue50zgnORfdgN0IJVNcKhX28mMp0i8BLUczjVQsjWmLn2JtUKSHCHV9iqhVsSy6auK1P00n8GzUgz8";

const app = express();
const stripe = Stripe(secretKey, { apiVersion: "2023-10-16" });
const port = 3010;

app.use(cors());
// Manejador para opciones CORS
app.options("*", cors());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/", async (req, res) => {
  console.log("query recibida");
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 3000,
      currency: "usd",
      payment_method_types: ["card"],
    });
    const clientSecret = paymentIntent.client_secret;
    res.json({
      clientSecret,
    });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});
app.get("/", async (req, res) => {
  res.json("hola");
});
