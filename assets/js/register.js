console.log("ashish")

// Registration Form Validation
const validateForm = (formData) => {
    if (formData.get('name') == '') {
        alert("Please Enter Your Name...")
    } else if (!validateName(formData.get('name'))) {
        alert("Name must only contain letters.")
    } else if (formData.get('email') == "") {
        alert("Please Provide Your Email");
    } else if (!validateEmail(formData.get('email'))) {
        alert("Please Provide Correct Email Address");
    } else if (formData.get('password') == "") {
        alert("Please Provide Your Password");
    } else if (!validatePassword(formData.get('password'))) {
        alert("Please Ensure the Password matches the following requirements:\n1. Password must start with a letter.\n2. Password must be at least 8 characters long.");
    } else if (formData.get('password') != formData.get('confirmPassword')) {
        alert("Password doesn't match");
    } else {
        return true;
    }
    return false;
}

// Event Listener : Registration Form.
document.getElementById("registerForm").addEventListener("submit", (e) => {
    e.preventDefault();

    // FormData Object
    const formData = new FormData(e.target);

    // Validating Form.
    // if (validateForm(formData)) {
        console.log("Register Now")

        // Request New User Creation.
        fetch('/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password'),
                confirmPassword: formData.get('confirmPassword'),
            })
        }).then(data => data.json()).then(data => {
            console.log(data);
            alert(data.message)
            if ( data.type == 'success') {
                window.location.href = '/login'
            }
        }).catch(err => {
            console.log(err)
        });
    // }
})