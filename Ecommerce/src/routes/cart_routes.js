const CartRoutes = require ('express').Router();
const CategoryController = require('../controllers/cart_controller');

CartRoutes.get("/:user", CategoryController.getCartForUser);
CartRoutes.post("/", CategoryController.addToCart);
CartRoutes.delete("/", CategoryController.removeFromCart);

module.exports = CartRoutes;