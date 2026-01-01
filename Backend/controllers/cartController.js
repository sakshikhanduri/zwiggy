// import User from '../models/UserModel.js';

// //add items to cart 
// const addToCart = async (req, res) => {
//     try {
//         let userData = await User.findById(req.body.userId);
//         let cartData = await userData.cartData;
//         if (!cartData[req.body.itemId]) {
//             cartData[req.body.itemId] = 1;
//         } else {
//             cartData[req.body.itemId] = cartData[req.body.itemId] + 1;
//         }
//         await User.findByIdAndUpdate(req.body.userId, { cartData });
//         res.json({ success: true, message: 'Added to cart' });
//     } catch (error) {  
//         console.log(error);
//         res.json({ success: false, message: 'Error' });
//     }
// }

// //remove items from cart 
// const removeFromCart = async (req, res) => {
//     try {
//         let userData = await User.findById(req.body.userId);
//         let cartData = await userData.cartData;
//         if (cartData[req.body.itemId] > 0) {
//             cartData[req.body.itemId] = cartData[req.body.itemId] - 1;
//         }
//         await User.findByIdAndUpdate(req.body.userId, { cartData })
//         res.json({ success: true, message: 'Removed from cart' })
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: 'Error' })

//     }
// }

// //fetch user cart data
// const getCart = async (req, res) => {
//     try {
//         let userData = await User.findById(req.body.userId)
//         let cartData = await userData.cartData;
//         res.json({ success: true, cartData })
//     } catch (error) {
//         console.log(error);

//         res.json({ success: false, message: 'Error' })
//     }
// }

// export { addToCart, removeFromCart, getCart };



import User from '../models/UserModel.js';

// ➕ ADD TO CART
const addToCart = async (req, res) => {
    try {
        const userId = req.userId; // ✅ from auth middleware
        const { itemId } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const cartData = user.cartData || {};

        cartData[itemId] = (cartData[itemId] || 0) + 1;

        user.cartData = cartData;
        await user.save();

        res.json({ success: true, message: "Added to cart" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false });
    }
};

// ➖ REMOVE FROM CART
const removeFromCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { itemId } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false });
        }

        const cartData = user.cartData || {};

        if (cartData[itemId] > 1) {
            cartData[itemId] -= 1;
        } else {
            delete cartData[itemId];
        }

        user.cartData = cartData;
        await user.save();

        res.json({ success: true, message: "Removed from cart" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false });
    }
};

// 🛒 GET CART
const getCart = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            cartData: user.cartData || {}
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false });
    }
};

export { addToCart, removeFromCart, getCart };
