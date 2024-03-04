document.getElementById("edit_button").addEventListener("click", () => {
    console.log('submit hide');
    document.getElementById("submitDiv").classList.remove("display-none");
    document.getElementById("edit_button").disabled = true;
    document.getElementById("accountName").readOnly = false;
    document.getElementById("accountType").disabled = false;
    document.getElementById("accountNumber").readOnly = false;
    document.getElementById("accountHolder").readOnly = false;
    document.getElementById("accountDescription").readOnly = false;
    document.getElementById("bankName").readOnly = false;
    
});


// Validate Add/Edit Account Form
const validateAccountForm = (formData) => {
    console.log(formData.get('accountName'), formData.get('accountType'), formData.get('accountNumber'), formData.get('bankName'), formData.get('accountHolder'), formData.get('accountDescription'));
    console.log(formData.get('accountNumber').length)
    if (formData.get('accountName') == "") {
        alert('Please Enter Account Name')
    } else if (formData.get('accountType') == "") {
        alert("Please Select Account Type")
    } else if (formData.get('accountNumber') == "") {
        alert('Please Enter Account Number');
    } else if ( formData.get('accountNumber') < 99999999) {
        alert('Please Enter Correct Account No.')
    } else if (formData.get('accountHolder') == "") {
        alert('Please Enter Account Holder Name')
    } else if (formData.get('accountType') == "") {
        alert("Please Select Account Type")
    }  else if ( formData.get('accountdescription') == "") {
        alert('Please Provide Account Description')
    } else {
        return true;
    }
    return false;
}

// Updation from submit
document.getElementById("accountEditForm").addEventListener("submit", (e) => {
    e.preventDefault();
    console.log('submitstart')

    const formData = new FormData(e.target);
    let data = Object.fromEntries(formData.entries());
    console.log(data);
    console.log("typeof => ", data)

    // if (validateAccountForm(formData)) {
        console.log("Account Form process Started");

        // Request UPDATE User Creation.
        fetch(`/account/${window.location.href.split('/')[4]}/update`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(data => {
            return data.json()
        }).then(data => {
            console.log(data);
            alert(data.message);
            if (data.type == 'success') {
                // window.location.reload();
                document.getElementById("submitDiv").classList.add("display-none");
                document.getElementById("edit_button").disabled = false;
                document.getElementById("accountName").readOnly = true;
                document.getElementById("accountType").disabled = true;
                document.getElementById("accountNumber").readOnly = true;
                document.getElementById("accountHolder").readOnly = true;
                document.getElementById("accountDescription").readOnly = true;
                document.getElementById("bankName").readOnly = true;
            }
        }).catch(err => {
            console.log(err);
        });
    // }

})

console.log('ashishsadfsd');

const deleteAccountRecord = (accountId) => {
    console.log('delete account started')
    console.log(accountId)
    if (confirm("Are you sure you want to delete this record?")) {
        console.log("Account Deletion process started");

        // Request Delete account Record.
        fetch(`/account/${accountId}/delete`, {
            method: 'DELETE',
        }).then(data => {
            return data.json()
        }).then(data => {
            console.log(data);
            alert(data.message);
            if (data.type == 'success') {
                window.location.reload();
            }
        }).catch(err => {
            console.log(err)
        });
    }
};

const redirectTo = (route) => {
    console.log("/account/"+window.location.href.split('/')[4].split('#')[0]+"/transaction")
    window.location.href = "/account/"+window.location.href.split('/')[4].split('#')[0]+"/transaction";
}