console.log("Search script");

const table_row = (account) => {
    // let color = "dark"
    // if (account.PaymentMethod == 'Online') {
    //     color = "success";
    // } else if (account.PaymentMethod == 'Cash') { 
    //     color = "info";
    // } else if (account.PaymentMethod == 'Cheque') { 
    //     color = "Warning";
    // }

    return `<a class="col-xl-4 col-sm-6 mb-xl-0 mb-4 cursor-pointer" href = "/account/${account.id}">
    <div class="card mb-4 bg-gradient-dark text-white">
        <div class="card-body p-3">
            <div class="row align-self-center">
                <div class="col-6 align-self-center">
                    <div class="numbers">
                        <p class="align-self-center ml-2 mb-0 text-capitalize font-weight-bold">${account.accountName}
                        </p>
                        
                    </div>
                </div>
                <div class="col-6 text-end">
                    <div
                        class="bg-gradient-info info shadow text-center badge badge-xs text-xs border-radius-md">
                        ${account.accountType}
                    </div>
                </div>
            </div>
            <div class="p-2 my-2 text-dark text-bolder" style="background-color: #fff; border-radius: 10px;">${account.accountHolder}</div>
            <div class="row">
                <div class="col-6 align-self-center">
                    <div class="numbers align-self-center ">
                        <p class="ml-2 text-xs mb-0 text-capitalize font-weight-bold">Acc No.: ${account.accountNumber}
                        </p>
                    </div>
                </div>
                <div class="col-6 text-end">
                    <div
                        class="bg-gradient-secondary shadow text-center badge badge-xs text-xs border-radius-md">
                        ₹ ${account.currentBalance}
                    </div>
                </div>
            </div>
        </div>
    </div>
</a>`
}


// Search Event Listener.
document.getElementById("search_button").addEventListener('click', () => {
    const searchText = document.getElementById("search_input").value;
    console.log(searchText);

    // Request New User Creation.
    fetch('/account/search', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            accountName: searchText,
        })
    }).then(data => {
        return data.json()
    }).then(data => {
        
        // console.log(data);

        let table_rows = "";

        // Check if No record found..
        if (data.data.length == 0) {
            // console.log(data.data)   
            document.getElementById("account_container").innerHTML = `<h3>No Account</h3>`
        } else {
            data.data.forEach(element => {
                // console.log(element)
                table_rows = table_rows + table_row(element);
            });
            document.getElementById("account_container").innerHTML = table_rows;
        }
    }).catch(err => {
        console.log(err)
    });
})