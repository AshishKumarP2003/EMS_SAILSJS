const openEditModal = (jsonStringData) => {
    const row = JSON.parse(jsonStringData);
    console.log(row)
    document.getElementById('edit_category').value = row.Category;
    document.getElementById('edit_amount').value = row.Amount;
    document.getElementById('edit_source').value = row.Source;
    document.getElementById('edit_datetime').value = row.Datetime;
    document.getElementById('edit_payment_method').value = row.PaymentMethod;
    document.getElementById('edit_recipient_name').value = row.RecipientName;
    document.getElementById('edit_account_type').value = row.AccountType;
    document.getElementById('edit_account_id').value = row.AccountId;
}


// Validate Add/Edit Account Form
const validateAccountForm = (formData) => {
    console.log(formData.get('account_name'), formData.get('account_type'), formData.get('account_number'), formData.get('bank_name'), formData.get('opening_balance'), formData.get('account_description'));
    console.log(formData.get('account_number').length)
    if (formData.get('account_name') == "") {
        alert('Please Enter Account Name')
    } else if (formData.get('account_type') == "") {
        alert("Please Select Account Type")
    } else if (formData.get('account_number') == "") {
        alert('Please Enter Account Number');
    } else if ( formData.get('account_number') < 99999999) {
        alert('Please Enter Correct Account No.')
    } else if (formData.get('account_holder') == "") {
        alert('Please Enter Account Holder Name')
    }  else if ( formData.get('account_description') == "") {
        alert('Please Provide Account Description')
    } else {
        return true;
    }
    return false;
}



document.getElementById("accountForm").addEventListener("submit", (e) => {
    e.preventDefault();

    console.log('formsubmits');

    // FormData Object
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data)

    // Validating Form.
    // if (validateAccountForm(formData)) {
        console.log("account Form Submission process Started");

        // Request New Account Creation.
        fetch('/account/add', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(data => {
            return data.json();
        }).then(data => {
            console.log(data);
            alert(data.message);
            if (data.type == 'success') {
                window.location.href = '/account';
            }
        }).catch(err => {
            console.log(err);
        });
    // }
});