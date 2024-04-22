import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function Training() {
    const [trainings, setTrainings] = useState([{date: '', duration: '', activity: '', customer: ''}]);

    const URL = 'https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings';

    const [colDefs, setColDefs] = useState([

        { field: 'customer', sortable: true, filter: true, floatingFilter: true },
        { field: 'date', sortable: true, filter: true, floatingFilter: true },
        { field: 'duration', sortable: true, filter: true, floatingFilter: true },
        { field: 'activity', sortable: true, filter: true, floatingFilter: true }
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
                 setTrainings(data._embedded.trainings); 

               
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
