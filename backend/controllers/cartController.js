import userModel from "../models/userModel.js";

// add product to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (e) {
    console.log(e.message);
    res.json({ success: false, message: e.message });
  }
};
//  update user cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await userModel.findById(userId);

    let cartData = userData.cartData;
    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart Updated" });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: e.message });
  }
};
//get user cart data
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    if (!userData) {
      return res.json({ success: false, message: "User Not Found" });
    }
    res.json({
      success: true,
      cartData: cartData,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ success: false, message: e.message });
  }
};

export { addToCart, updateCart, getUserCart };
