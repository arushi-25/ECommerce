const CartModel = require('./../models/cart_model');

const CartController = {
    getCartForUser: async function (req, res) {
        try {
            const user = req.params.user;
            const foundCart = await CartModel.findOne({ user: user });

            if (!foundCart) {
                return res.json({ success: false, data: [] });
            }
            return res.json({ success: true, data: foundCart.items });
        } catch (error) {
            console.error('Error fetching cart:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },

    addToCart: async function (req, res) {
        try {
            const { product, user, quantity } = req.body;
            const foundCart = await CartModel.findOne({ user: user });

            if (!foundCart) {
                const newCart = new CartModel({ user: user });
                newCart.items.push({
                    product: product,
                    quantity: quantity,
                });

                await newCart.save();
                return res.json({ success: true, data: newCart, message: 'Product Added To Cart' });
            }

            const updatedCart = await CartModel.findOneAndUpdate(
                { user: user },
                { $push: { items: { product: product, quantity: quantity } } },
                { new: true }
            );
            return res.json({ success: true, data: updatedCart, message: 'Product Added To Cart' });
        } catch (error) {
            console.error('Error adding to cart:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },

    removeFromCart: async function (req, res) {
        try {
            const { user, product } = req.body;
            const updatedCart = await CartModel.findOneAndUpdate(
                { user: user },
                { $pull: { items: { product: product } } },
                { new: true }
            );

            if (!updatedCart) {
                return res.status(404).json({ success: false, message: 'Cart not found' });
            }

            return res.json({ success: true, data: updatedCart, message: 'Product removed from cart' });
        } catch (error) {
            console.error('Error removing from cart:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },
};

module.exports = CartController;
