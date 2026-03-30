const fetch = require("node-fetch");

exports.handler = async (event) => {

    if (event.httpMethod === "GET") {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Use POST request" })
        };
    }

    try {
        const { name, email, mobile, message } = JSON.parse(event.body);

        const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
        const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
        const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;
        console.log("ENV:", SERVICE_ID, TEMPLATE_ID, PRIVATE_KEY); // 

        const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                service_id: SERVICE_ID,
                template_id: TEMPLATE_ID,
                private_key: PRIVATE_KEY,
                template_params: { name, email, mobile, message }
            })
        });

        const text = await response.text();

        console.log("EmailJS response:", text); // 

        if (!response.ok) {
            throw new Error(text); // 
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Email sent successfully" })
        };

    } catch (err) {
        console.error("ERROR:", err.message); // 

        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message })
        };
    }
};
