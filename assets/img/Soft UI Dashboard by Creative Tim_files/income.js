// Event Listener : Login Form.
const validateIncomeForm = (formData) => {
    console.log(formData.get('category'), formData.get('amount'), formData.get('source'), formData.get('datetime'), formData.get('payment_method'))
    if (formData.get('category') == "") {
        alert('Please Enter Income Category')
    } else if (formData.get('amount') == "") {
        alert("Please Enter Amount")
    } else if ( formData.get('amount') <= 0) {
        alert('Please Enter Correct Amount')
    } else if ( formData.get('source') == "") {
        alert('Please Provide Source/ Description.')
    } else if ( formData.get('datetime') == "") {
        alert('Please Provide Date and Time of Credit.')
    } else if ( formData.get('payment_method') == '') {
        alert('Please Select Payment Method')
    } else {
        return true;
    }
    return false;
}

console.log('income.js')
document.getElementById("incomeForm").addEventListener("submit", (e) => {
    e.preventDefault();

    console.log('formsubmits')
    // FormData Object
    const formData = new FormData(e.target);

    // Validating Form.
    if (validateIncomeForm(formData)) {
        console.log("Income Form Submission process Started")

        // Request New User Creation.
        fetch('/dashboard/add/income', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                category: formData.get('category'),
                amount: formData.get('amount'),
                source: formData.get('source'),
                datetime: formData.get('datetime'),
                payment_method: formData.get('payment_method'),
            })
        }).then(data => {
            return data.json()
        }).then(data => {
            console.log(data);
            alert(data.message)
        }).catch(err => {
            console.log(err)
        });
    }
});