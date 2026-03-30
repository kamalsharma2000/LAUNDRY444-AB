
const fetch = require("node-fetch");

exports.handler = async (event, context) => {

    if (event.httpMethod === "GET") {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Use POST request" })
        };
    }

    try {
        if (!event.body) {
            return { statusCode: 400, body: JSON.stringify({ error: "No body" }) };
        }

        const { name, email, mobile, message } = JSON.parse(event.body);

        const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
        const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
        const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;

        const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                service_id: SERVICE_ID,
                template_id: TEMPLATE_ID,
                user_id: PUBLIC_KEY,
                template_params: { name, email, mobile, message }
            })
        });

        const text = await response.text();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Email sent", response: text })
        };

    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message })
        };
    }
};