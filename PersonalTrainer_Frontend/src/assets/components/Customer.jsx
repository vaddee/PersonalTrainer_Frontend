import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Training from "./Training"; // Make sure the file path is correct
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";

import { Button, Snackbar } from "@mui/material";


export default function Customer() { // hyvaksyy data props
    const [customers, setCustomers] = useState([{ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' }]);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msgSnackbar, setMsgSnackbar] = useState("")
    const URL = 'https://customerrestservice-personaltraining.rahtiapp.fi/api/customers';

    const [colDefs, setColDefs] = useState([
        { field: 'firstname' },
        { field: 'lastname' },
        { field: 'streetaddress' },
        { field: 'postcode' },
        { field: 'city' },
        { field: 'email' },
        { field: 'phone' },
        {
            cellRenderer: (params) =>
                <EditCustomer updateCustomer={updateCustomer} params={params}/>
        },
        {
            cellRenderer: (params) =>
                <Button size="small" color="error" onClick={() => deleteCustomer(params)}>Delete</Button>, width: 120
        }
    ]);



    useEffect(() => {
        getCustomers();
    }, []);

    const getCustomers = () => {
        fetch(URL, { method: 'GET' })
            .then(response => {
                if (response.ok)
                    return response.json();
                else
                    throw new Error('Failed to fetch');
            })
            .then(data => {
                setCustomers(data._embedded.customers);


            })
            .catch(err => console.error(err));
    }

    // poistetaan customer
    const deleteCustomer = (params) => {
        //console.log(params.data);
        if (window.confirm("Are you sure?")) {
            console.log(params.data._links.customer.href);
            fetch(params.data._links.customer.href, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        //window.alert("customer deleted");
                        setMsgSnackbar("Delete ok");
                        setOpenSnackbar(true);
                        getCustomers();
                    }
                    else {
                        //window.alert("NOT WORKING")
                        setMsgSnackbar("Delete not ok");
                        setOpenSnackbar(true);
                    }
                })
                .catch(err => console.error(err)
                )
        }
    }

    //lisätäään customer -> AddCustomer.jsx
    const addCustomer = (customer) => {
        console.log("customer, add customer")
        fetch(URL, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(response => {
                console.log("response:" + response);
                if (response.ok) {
                    console.log("response ok");
                    return response.json;
                } else {
                    throw new Error('Datan vienti bäkkäriin ei onnistunut');
                }
            })
            .then(data => {
                console.log("parsed json:" + data);
                getCustomers();
            })
            .catch(err => console.error(err))
    }

    const updateCustomer = (URL, updateCustomer) => {
        console.log("customer, edit customer")
        fetch(URL, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(updateCustomer)
        })
        .then(response => {
            console.log("response:" + response);
            if (response.ok) {
                console.log("response ok");
                return response.json;
            } else {
                throw new Error('Datan vienti bäkkäriin ei onnistunut');
            }
        })
        .then(data => {
            console.log("parsed json:" + data);
            getCustomers();
        })
        .catch(err => console.error(err))
    }

    return (
        <div>
        <AddCustomer addCustomer={addCustomer}/>
        

        <div className="ag-theme-material" style={{ height: 400, width: '100%' }}>
            <AgGridReact
                rowData={customers}
                columnDefs={colDefs}
                pagination={true}
                paginationPageSize={8}>
            </AgGridReact>

            <Snackbar
                open={openSnackbar}
                message={msgSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
            >

            </Snackbar>

        </div>
        </div>
    );
}
