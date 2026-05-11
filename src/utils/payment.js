import axios from "axios";
import config from "../config/config.js";

const payViaKhalti = async (data) => {
    const body = {
        return_url: config.khalti.returnUrl,
        website_url: config.khalti.apiUrl,
        amount: data.amount ,// paisa
        purchase_order_id: data.purchaseOrderId,
        purchase_order_name: data.purchaseOrderName,
        customer_info: data.customerInfo,
    };

    const response = await axios.post(
        config.khalti.apiUrl,
        body,
        {
            headers: {
                Authorization: `Key ${config.khalti.secretKey}`,
                "Content-Type": "application/json",
            },
        }
    );

    return response.data;
};

export { payViaKhalti };