import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function Customer() {
    const [customers, setCustomers] = useState([]);
    const URL = 'https://customerrestservice-personaltraining.rahtiapp.fi/api/customers';

    useEffect(() => {
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                setCustomers(data._embedded.customers); // Extract customers from the _embedded property
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []); 

    const colDefs = [
        { headerName: 'First Name', field: 'firstname' },
        { headerName: 'Last Name', field: 'lastname' }
    ];

    return (
        <div className="ag-theme-material" style={{ height: 400, width: '100%' }}>
            <AgGridReact
                rowData={customers}
                columnDefs={colDefs}
            />
        </div>
    );
}
