import Orders from "../models/Orders.js";
import User from "../models/UserModel.js";
import Razorpay from 'razorpay'
import crypto from 'crypto'

//var instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })
const getRazorpayInstance = () => {
    return new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });
};


//placing user order
const placeOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        const razorpay = getRazorpayInstance();

        const options = {
            amount: amount * 100, //paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);

        res.json({
            success: true,
            orderId: order.id,
            amount: order.amount
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false });
    }
};

const userOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await Orders.find({ userId })
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// const verifyOrder = async (req, res) => {
//     const { orderId, success } = req.body;
//     console.log(orderId, success);

//     try {
//         if (success == "true") {
//             await orderModel.findByIdAndUpdate(orderId, { payment: true });
//             res.json({ success: true, message: "Paid" })
//         } else {
//             await orderModel.findByIdAndDelete(orderId);
//             res.json({ success: false, message: "Not Paid" })
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error" })

//     }
// }


const verifyPayment = async (req, res) => {
    try {
        const {
            orderId,
            paymentId,
            signature,
            items,
            amount,
            address
        } = req.body;

        const userId = req.userId;

        const body = orderId + "|" + paymentId;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature !== signature) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed"
            });
        }

        const order = await Orders.create({
            userId,
            items,
            amount,
            address,
            payment: true,
            razorpayOrderId: orderId,
            razorpayPaymentId: paymentId
        });

        await User.findByIdAndUpdate(userId, { cartData: {} });

        res.status(201).json({
            success: true,
            message: "Payment verified & order created",
            order
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false });
    }
};



const listOrders = async (req, res) => {
    try {
        const orders = await Orders.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//api for updating order status
const updateStatus = async (req, res) => {
    try {
        const order = await Orders.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
        res.json({ success: true, message: 'Status updated' })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
export { placeOrder, userOrders, verifyPayment, listOrders, updateStatus }