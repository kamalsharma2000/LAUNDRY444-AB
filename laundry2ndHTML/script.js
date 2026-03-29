// script.js
document.addEventListener("DOMContentLoaded", function () {

    // ------------- CART ----------------
    let cart = [];

    function updateCart() {
        const list = document.getElementById("cartItems");
        list.innerHTML = "";

        let total = 0;
        cart.forEach(item => {
            const li = document.createElement("li");
            li.innerText = `${item.name} - ₹${item.price}`;
            list.appendChild(li);
            total += item.price;
        });

        document.getElementById("totalAmount").innerText = total;
        document.getElementById("para").style.display = cart.length === 0 ? "block" : "none";
    }

    function resetCart() {
        cart = [];
        updateCart();
        document.querySelectorAll(".btn1").forEach(btn => {
            btn.innerHTML = 'Add to Cart <ion-icon name="add-circle-outline"></ion-icon>';
            btn.classList.remove("added");
        });
    }

    document.querySelectorAll(".btn1").forEach(btn => {
        btn.addEventListener("click", function () {
            const name = btn.getAttribute("data-name");
            const price = parseInt(btn.getAttribute("data-price"));

            if (!btn.classList.contains("added")) {
                cart.push({ name, price });
                btn.classList.add("added");
                btn.innerHTML = 'Remove from Cart <ion-icon name="remove-circle-outline"></ion-icon>';
            } else {
                cart = cart.filter(item => item.name !== name);
                btn.classList.remove("added");
                btn.innerHTML = 'Add to Cart <ion-icon name="add-circle-outline"></ion-icon>';
            }

            updateCart();
        });
    });

    // ------------- SEND EMAIL ----------------
    async function sendEmail() {
        const data = {
            name: document.getElementById('userName').value,
            email: document.getElementById('email').value,
            mobile: document.getElementById('mobile').value,
            message: document.getElementById('message') ? document.getElementById('message').value : ""
        };

        try {
            const response = await fetch('/.netlify/functions/sendEmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.message) {
                alert('Email sent successfully!');
                document.getElementById('bookingForm').reset();
                resetCart();
            } else {
                alert('Error sending email: ' + (result.error || 'Unknown error'));
            }
        } catch (err) {
            console.error(err);
            alert('Error connecting to server!');
        }
    }

    // ------------- FORM VALIDATION & SUBMIT ----------------
    const form = document.getElementById("bookingForm");
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (cart.length === 0) {
            alert("Please select at least one item");
            return;
        }

        const name = document.getElementById("userName").value.trim();
        const email = document.getElementById("email").value.trim();
        const mobile = document.getElementById("mobile").value.trim();

        if (!name || !email || !mobile) {
            alert("All fields are required");
            return;
        }

        // Email pattern
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Please enter a valid email address");
            return;
        }

        // Mobile pattern
        if (!/^[6-9]\d{9}$/.test(mobile)) {
            alert("Please enter a valid mobile number");
            return;
        }

        // Everything ok → send email
        sendEmail();
    });

    // ------------- SUBSCRIBE FORM ----------------
    const subscribeForm = document.getElementById("sbform");
    if (subscribeForm) {
        subscribeForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("fullName2").value.trim();
            const email = document.getElementById("Email2").value.trim();

            if (!name) { alert("Please enter your name"); return; }
            if (!email) { alert("Please enter your email"); return; }
            if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,3}$/.test(email)) {
                alert("Enter a valid email address");
                return;
            }

            alert("Thanks for subscribing!");
            this.reset();
        });
    }

});