import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";
import {
  allOrders,
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  updateStatus,
  userOrders,
} from "../controllers/orderController.js";

const orderRoute = express.Router();
//admin features
orderRoute.post("/list", adminAuth, allOrders);
orderRoute.post("/status", adminAuth, updateStatus);

// payment features
orderRoute.post("/place", authUser, placeOrder);
orderRoute.post("/stripe", authUser, placeOrderStripe);
orderRoute.post("/razorpay", authUser, placeOrderRazorpay);

// user featuers
orderRoute.post("/userorders", authUser, userOrders);
export default orderRoute;
