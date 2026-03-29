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

    document.getElementById("para").style.display =
        cart.length === 0 ? "block" : "none";
}

////33
function resetCart() {
    cart = [];
    updateCart();

    document.querySelectorAll(".btn1").forEach(btn => {
        btn.innerHTML = 'Add to Cart <ion-icon name="add-circle-outline"></ion-icon>';
        btn.classList.remove("added");
    });
}


////4444
function sendMail() {

    const user_name = document.getElementById("userName").value;
    const user_email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;

    fetch("/.netlify/functions/sendEmail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_name: user_name,
            user_email: user_email,
            mobile: mobile
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);

        alert("Thanks! Your email has been sent successfully.");

        resetCart();

        document.getElementById("userName").value = "";
        document.getElementById("email").value = "";
        document.getElementById("mobile").value = "";
        document.getElementById("formMessage").value = "";

        let msg = document.getElementById("formMessage");
        msg.style.display = "block";
        msg.style.color = "green";
        msg.innerText = "Thanks for booking !";

        setTimeout(function () {
            msg.style.display = "none";
        }, 3000);
    })
    .catch(err => {
        console.error(err);
        alert("Error sending email !");
    });
}

///5555
function validateAndSend() {

    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    const name = document.getElementById("userName").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();

    if (!name || !email || !mobile) {
        alert("Fill all details");
        return;
    }

    sendMail(); //  only calls after validation
}

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("bookingForm");
    const username = document.getElementById("userName");
    const email = document.getElementById("email");
    const mobile = document.getElementById("mobile");
    const message = document.getElementById("formMessage");
    const cartList = document.getElementById("cartItems");

    // FORM SUBMIT
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        message.innerText = "";
        message.style.color = "red";

        if (cartList.children.length === 0) {
            alert("Please select at least one item");
            return;
        }

        if (
            username.value.trim() === "" &&
            email.value.trim() === "" &&
            mobile.value.trim() === ""
        ) {
            message.innerText = "All fields are required";
            return;
        }

        if (username.value.trim() === "") {
            message.innerText = "Please enter your username";
            return;
        }

        if (email.value.trim() === "") {
            message.innerText = "Please enter your email address";
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            message.innerText = "Please enter a valid email address";
            return;
        }

        if (mobile.value.trim() === "") {
            message.innerText = "Please enter your mobile number";
            return;
        }

        if (!/^[6-9]\d{9}$/.test(mobile.value)) {
            message.innerText = "Please enter a valid mobile number";
            return;
        }

        sendMail();
    });

    // BUTTON CLICK (CART)
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

});


// SUBSCRIBE FORM
const form = document.getElementById("sbform");
if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("fullName2").value.trim();
        const email = document.getElementById("Email2").value.trim();

        if (!name) { alert("Please enter your name"); return; }
        if (!email) { alert("Please enter your email"); return; }

        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!email.match(emailPattern)) { alert("Enter a valid email address"); return; }

        alert("Thanks for subscribing!");
        this.reset();
    });
}
