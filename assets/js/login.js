const validateLoginForm = (formData) => {

    if (formData.get('email') == "") {
        alert("Please Enter Your Email");
    } else if (!validateEmail(formData.get('email'))) {
        alert("Please Enter Correct Email Address");
    } else if (formData.get('password') == "") {
        alert("Please Enter Your Password");
    } else {
        return true;
    }
    return false;
}


// Event Listener : Login Form.
document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    // FormData Object
    const formData = new FormData(e.target);

    // Validating Form.
    if (validateLoginForm(formData)) {
        console.log("Login Now")

        // Request New User Creation.
        fetch('/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: formData.get('email'),
                password: formData.get('password'),
            })
        }).then(data => {
            return data.json()
        }).then(data => {
            console.log(data);
            if (data.url) {
                window.location.href = data.url;
            }
            alert(data.message)
        }).catch(err => {
            console.log(err);
        });
    }
});