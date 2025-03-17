import { Job } from "../models/job.model.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY);

// admin post krega job
const plans = [
    {
        plan_id: "price_1R2WCB07fH0EZfsYoTcDrnG8",
        plan_name: "standard",
        duration: "month",
    },
    {
        plan_id: "price_1R2WF407fH0EZfsYsKeGyVld",
        plan_name: "standard",
        duration: "year",
    },
]
export const payWithStrip = async (req, res) => {
    try {
        const { plan_name, duration } = req.body;
        const plan = plans.find((_plan)=>_plan.plan_name === plan_name && _plan.duration === duration)
        if(!plan){
            return res.status(400).json({
                message: "Plan not found.",
            });
        }
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: plan.plan_id,
                    quantity: 1
                }
            ],
            success_url: `http://localhost:5173/premium/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: "http://localhost:5173/fail",
            customer_email: "testshubham@gmail.com"
            
        })
        res.status(200).json({session})

    } catch (error) {
        console.log(error);
    }
}

export const savePayment = async (req, res) => {
    try {
        const { session_id } = req.body;
        const session = await stripe.checkout.sessions.retrieve(session_id)

        if (session.payment_status === "paid") {
            return res.json({ success: true, email: session.customer_email });
          } else {
            return res.status(400).json({ success: false, message: "Payment not verified" });
          }

    } catch (error) {
        console.log(error);
    }
}