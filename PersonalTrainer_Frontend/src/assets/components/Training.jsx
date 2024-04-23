import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from "dayjs";

export default function Training() {
    const [trainings, setTrainings] = useState([{
        activity: '',
        date: '',
        duration: '',
        customer: {
            firstname: '',
            lastname: ''
        }
    }
       
    ]);
    

    const URL = 'https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings';
    

    const [colDefs, setColDefs] = useState([
        { field: 'customer.firstname', headerName: 'First Name', sortable: true, filter: true, floatingFilter: true },
        { field: 'customer.lastname', headerName: 'Last Name', sortable: true, filter: true, floatingFilter: true },
        { field: 'date', valueFormatter: params => dayjs(params.value).format('DD.MM.YYYY HH:mm'), headerName: 'Training Date', sortable: true, filter: true, floatingFilter: true },
        { field: 'duration', headerName: 'Duration', sortable: true, filter: true, floatingFilter: true },
        { field: 'activity', headerName: 'Activity', sortable: true, filter: true, floatingFilter: true }
    ]);
    

    useEffect(() => {
        getTrainings();
    }, []);

    const getTrainings = () => {
        fetch(URL, { method: 'GET' })
            .then(response => {
                if (response.ok)
                    return response.json();
                else
                    throw new Error('Failed to fetch');
            })
            .then(data => {
                 setTrainings(data); // Set received data directly
            })
            .catch(err => console.error(err));
    }

    return (
        <div className="ag-theme-material" style={{ height: 400, width: '100%' }}>
            <AgGridReact
                rowData={trainings}
                columnDefs={colDefs}
            />
        </div>
    );
}
