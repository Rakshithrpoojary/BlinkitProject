import express from "express";
import cors from "cors";
import { router } from "./Routes/Userrouter.js";
import { accountrouter } from "./Routes/AccountRoutes.js";
import { categoryRouter } from "./Routes/CategoryRoutes.js";
import { subcatogaryrouter } from "./Routes/SubCatogaryRoutes.js";
import { productRouter } from "./Routes/ProductRoutes.js";
import cookieParser from "cookie-parser";
import Stripe from "stripe";
import { Usermodel } from "./Models/User.model.js";
const stripe = new Stripe(
  "sk_test_51QuyGxJ7IL7uDEG5B5QXfybR2Q5tn5lk9bs4O8MCObCr4ssaxZAZvhUNu8THrDmooa13eT9JXzyUOkBi4B3jbNKz009cFU4Yqj"
);
export const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.post(
  "/api/v1/users/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.WEBHOOK_SECREAT
      );

      if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const findUser = await Usermodel.findById(session.metadata.userId);
        findUser.Cartitems.map(({ productname, productimage }) =>
          findUser.Orders.push({
            ordername: productname,
            orderimage: productimage,
          })
        );
        findUser.Cartitems = [];
        await findUser.save();
      }

      res.status(200).send({ received: true });
    } catch (error) {
      res.status(400).send(`Webhook Error: ${error.message}`);
    }
  }
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use("/api/v1/users", router);
app.use("/api/v1/users", accountrouter);
app.use("/api/v1/users", categoryRouter);
app.use("/api/v1/users", subcatogaryrouter);
app.use("/api/v1/users", productRouter);

app.use((response) => {
  response.status(404).send("Page not found");
});
