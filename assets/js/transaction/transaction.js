const openEditModal = (jsonreplaceStringData) => {
    const jsonStringData = jsonreplaceStringData.replace(/<>/gi, '"');

    const row = JSON.parse(jsonStringData);
    console.log(row)
    document.getElementById('editCategory').value = row.category;
    document.getElementById('editAmount').value = row.amount;
    document.getElementById('editSource').value = row.source;
    document.getElementById('editDatetime').value = row.datetime;
    document.getElementById('editPaymentMethod').value = row.paymentMethod;
    document.getElementById('editRecipientName').value = row.recipientName;
    document.getElementById('editTransactionType').value = row.transactionType;
    document.getElementById('editTransactionId').value = row.id;
}


// Validate Add/Edit Transaction Form
const validateTransactionForm = (formData) => {
    console.log(formData.get('category'), formData.get('amount'), formData.get('source'), formData.get('datetime'), formData.get('paymentMethod'), formData.get('recipientName'), formData.get('transactionType'));
    if (formData.get('category') == "") {
        alert('Please Enter Transaction Category')
    } else if (formData.get('amount') == "") {
        alert("Please Enter Amount")
    } else if ( formData.get('amount') <= 0) {
        alert('Please Enter Correct Amount')
    } else if ( formData.get('source') == "") {
        alert('Please Provide Source/ Description.')
    } else if ( formData.get('datetime') == "") {
        alert('Please Provide Date and Time of Credit.')
    } else if ( formData.get('paymentMethod') == '') {
        alert('Please Select Payment Method')
    } else if ( formData.get('transactionType') == '') {
        alert('Please Select transactionType')
    } else {
        return true;
    }
    return false;
}

// Edit Transaction Form Submission
document.getElementById("editTransactionForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = Object.fromEntries(formData.entries());
    data.accountId = window.location.href.split('/')[4].split('#')[0]
    console.log(window.location.href.split('/')[4].split('#')[0])
    console.log(data.accountId)

    // if (validateTransactionForm(formData)) {
        console.log("Transaction Form Submission process Started");

        // Request New User Creation.
        fetch('/transaction/update', {
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
                window.location.href = window.location.href.split('#')[0]

            }
        }).catch(err => {
            console.log(err)
        });
    // }
});


// Add Transaction Form Submission
document.getElementById("transactionForm").addEventListener("submit", (e) => {
    e.preventDefault();

    console.log('formsubmits');

    // FormData Object
    const formData = new FormData(e.target);

    // Validating Form.
    // if (validateTransactionForm(formData)) {
        console.log("Transaction Form Submission process Started");

        // Request New User Creation.
        fetch('/transaction/add', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                accountId: window.location.href.split('/')[4].split('#')[0],
                category: formData.get('category'),
                amount: formData.get('amount'),
                source: formData.get('source'),
                datetime: formData.get('datetime'),
                paymentMethod: formData.get('paymentMethod'),
                recipientName: formData.get('recipientName'),
                transactionType: formData.get('transactionType')
            })
        }).then(data => {
            return data.json()
        }).then(data => {
            console.log(data);
            alert(data.message);
            if (data.type == 'success') {
                window.location.href = window.location.href.split('#')[0]
            }
        }).catch(err => {
            console.log(err)
        });
    // }
});


// Delete Expesne Method.
const deleteTransactionRecord = (transactionId) => {
    console.log('delete transaction started')
    console.log(transactionId)
    if (confirm("Are you sure you want to delete this record?")) {
        console.log("Transaction Deletion process started");

        const data = JSON.stringify({
            transactionId: transactionId,
            accountId: window.location.href.split('/')[4].split('#')[0].split('?')[0]
        });
        console.log(data);

        // Request Delete Transaction Record.
        fetch('/transaction/delete', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            body: data
        }).then(data => {
            return data.json()
        }).then(data => {
            console.log(data);
            alert(data.message);
            if (data.type == 'success') {
                window.location.href = window.location.href.split('#')[0]
            }
        }).catch(err => {
            console.log(err)
        });
    }
};

const back = () => {
    window.location.href = '/account/' + window.location.href.split('/')[4].split('#')[0];
}

const goTo = (pageNo) => {
    window.location.href = window.location.href.split('?')[0] + `?page=${pageNo}`;
}