console.log("Search script");

const table_row = (row) => {
    console.log(row)
    let paymentMethodColor = "dark"
    let transactionTypeColor = "dark"
    let sign = '-';

    if (row.paymentMethod == 'Online') {
        paymentMethodColor = "success";
    } else if (row.paymentMethod == 'Cash') { 
        paymentMethodColor = "info";
    } else if (row.paymentMethod == 'Cheque') { 
        paymentMethodColor = "warning";
    }
    
    if (row.transactionType == 'Debit') {
        transactionTypeColor = 'danger';
        sign = '-'
    } else if (row.transactionType == 'Credit') { 
        transactionTypeColor = 'success'
        sign = '+'
    } else { 
        transactionTypeColor = 'dark'
    }



    return `<tr>
    <td class="align-middle text-center">
        <span
            class="text-secondary text-xs font-weight-bold">${row.srNo}</span>
    </td>
    <td>
        <div class="d-flex px-2 py-1">
            <div class="d-flex flex-column justify-content-center">
                <h6 class="mb-0 text-sm">${row.category}</h6>
            </div>
        </div>
    </td>
    <td>
        <p class="text-xs font-weight-bold mb-0 text-${transactionTypeColor}">${sign} ₹ ${row.amount} </p>
    </td>
    <td class="align-middle text-center">
        <span
            class="text-secondary text-xs font-weight-bold">${row.datetime}</span>
    </td>
    <td 
    style="min-width: 250px;"
    class="align-middle text-center">
        <span
            class="text-secondary text-xs font-weight-bold">${row.source}</span>
    </td>
    <td class="align-middle text-center text-sm">
        <span class="badge badge-sm bg-gradient-${paymentMethodColor}">${row.paymentMethod}</span>
    </td>
    <td class="align-middle text-center">
                                                                <span class="text-secondary text-xs font-weight-bold">
                                                                    ${row.recipientName}
                                                                </span>
                                                            </td>
                                                            <td class="align-middle text-center">
                                                                <span class="text-white badge badge-sm bg-gradient-${transactionTypeColor}">
                                                                    ${row.transactionType}
                                                                </span>
                                                            </td>
    
    <td class="align-middle">
        <a href="#editTransaction"
            class="badge badge-sm bg-gradient-info font-weight-bold text-xs"
            onclick="openEditModal('`+JSON.stringify(row).replace(/"/gi, "<>")+`')"
            data-toggle="tooltip" data-original-title="Edit user">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001"/>
              </svg>
        </a>
        <a href="javascript:;"
            class="badge badge-sm bg-gradient-danger font-weight-bold text-xs"
            id="deleteTransactionRecord"
            data-transactionid = '${row.id}'
            data-toggle="tooltip" data-original-title="Edit user">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
              </svg>
        </a>
    </td>
</tr>`
}



// Search Button Event Listener
document.getElementById("search_button").addEventListener('click', () => {
    const searchText = document.getElementById("search_input").value;
    console.log(searchText);

    // Request New User Creation.
    fetch(`/account/${window.location.href.split('/')[4].split('#')[0].split('?')[0]}/transaction/search`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            category: searchText,
        })
    }).then(data => {
        return data.json();
    }).then(data => {
        
        console.log(data);

        let table_rows = "";

        // Check if No record found..
        if (data.data.length == 0) {
            console.log(data.data)
            document.getElementById("table_body").innerHTML = `<tr style="display: 'flex'"><td class="text-center" colspan='8'>No Record Found</td></tr>`
        } else {
            data.data.forEach(element => {
                console.log(element)
                table_rows = table_rows + table_row(element);
            });
            document.getElementById("table_body").innerHTML = table_rows;
        }
    }).catch(err => {
        console.log(err)
    });
})