// sendEmail.js

export async function handler(event, context) {
    // Handle GET requests safely
    if (event.httpMethod === "GET") {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "This function expects a POST request with JSON data.",
                info: "Use your booking form to trigger this function."
            }),
        };
    }

    try {
        // Ensure there is a body
        if (!event.body) {
            return { statusCode: 400, body: JSON.stringify({ error: "No JSON body received" }) };
        }

        // Parse data from frontend
        let { name, email, mobile, message } = JSON.parse(event.body);

        // Validate required fields
        if (!name || !email || !mobile) {
            return { statusCode: 400, body: JSON.stringify({ error: "Missing required fields: name, email, mobile" }) };
        }

        // Get environment variables
        const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
        const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
        const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;

        if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
            return { statusCode: 500, body: JSON.stringify({ error: "Missing EmailJS environment variables" }) };
        }

        // Send email via EmailJS API
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

        if (!response.ok) {
            // Return detailed error if EmailJS API fails
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: "EmailJS API failed", detail: text })
            };
        }

        // Success response
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Email sent successfully",
                emailjs_response: text
            })
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: "Server error", detail: error.message }) };
    }
}