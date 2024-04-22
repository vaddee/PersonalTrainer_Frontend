import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Training from "./Training"; // Make sure the file path is correct


export default function Customer() { // hyvaksyy data props
    const [customers, setCustomers] = useState([{ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''}]);
    const URL = 'https://customerrestservice-personaltraining.rahtiapp.fi/api/customers';

    const [colDefs, setColDefs] = useState([
        { field: 'firstname' },
        { field: 'lastname' },
        { field: 'streetaddress' },
        { field: 'postcode' },
        { field: 'city' },
        { field: 'email' },
        { field: 'phone' }
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

    return (
        <div className="ag-theme-material" style={{ height: 400, width: '100%' }}>
            <AgGridReact
                rowData={customers}
                columnDefs={colDefs}
            />
            
        </div>
    );
}
