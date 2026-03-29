import emailjs from 'emailjs-com';

export async function handler(event, context) {
    const { name, email, message } = JSON.parse(event.body);

    const serviceID = process.env.EMAILJS_SERVICE_ID;
    const templateID = process.env.EMAILJS_TEMPLATE_ID;
    const userID = process.env.EMAILJS_PUBLIC_KEY;

    try {
        await emailjs.send(serviceID, templateID, { name, email, message }, userID);
        return { statusCode: 200, body: JSON.stringify({ success: true }) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ success: false, error }) };
    }
}