# LAUNDRY444-AB


#  Laundry Service Website

# Project Description

This is a responsive **Laundry Service Booking Website** where users can select services, add them to a cart, and book a service online.
The project also includes **secure email functionality** using Netlify Functions and EmailJS.

# Features :

 Add to Cart functionality
 Remove from Cart
 Booking form with validation
 Send booking details via email
 Secure EmailJS integration (using backend)
 Responsive design

# Technologies Used :

* HTML
* CSS
* JavaScript
* Netlify (for deployment & serverless functions)
* EmailJS (for sending emails securely)

# How to Deploy on Netlify  :

1. Push your project to GitHub
2. Go to Netlify
3. Click **“Add new site” → Import from Git**
4. Select your repository
5. Click **Deploy**

#  Environment Variables Setup :

After deployment, go to:

Site settings → Environment variables


Add the following:

EMAILJS_SERVICE_ID = your_service_id
EMAILJS_TEMPLATE_ID = your_template_id
EMAILJS_PUBLIC_KEY = your_public_key


 Then **redeploy your site**

#  Netlify Functions :

This project uses a serverless function:

        netlify/functions/sendEmail.js

 This function securely sends email using EmailJS API
 Keeps API keys hidden from frontend


#  Cart Functionality :

* Users can add laundry services to the cart
* Items can be removed from the cart
* Cart updates dynamically
* Booking is only allowed if at least one item is added



# Email Integration (Secure) :

* Form data is sent using `fetch()` to Netlify Function
* Netlify function calls EmailJS API
* No keys are exposed in frontend
* Email includes user details and booking info

# Important Notes :

EmailJS is NOT used in frontend (for security)

* All sensitive keys are stored in environment variables
* Always redeploy after updating environment variables

# Conclusion :

This project demonstrates:

* Frontend development (HTML, CSS, JS)
* Cart system logic
* Form validation
* Secure backend integration using Netlify Functions


---
