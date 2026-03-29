exports.handler = async (event) => {
  try {
    //  Safe parsing
    const data = event.body ? JSON.parse(event.body) : {};

    const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;

    // ❗ Check env variables
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing environment variables" })
      };
    }

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        template_params: data
      })
    });

    const result = await response.text(); //  better debugging

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Email sent successfully",
        emailjs_response: result
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };
  }
};