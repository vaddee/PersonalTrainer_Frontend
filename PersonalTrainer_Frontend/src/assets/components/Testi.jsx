import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
// Vanha TRAINING jos haluaa jatkaa t'st'.
export default function Training() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        getTrainings();
    }, []);

    const getTrainings = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings')
            .then(response => response.json())
            .then(data => {
                const fetchTrainings = data._embedded.trainings.map(training => {
                    return fetch(training._links.customer.href)
                        .then(response => response.json())
                        .then(customerData => {
                            return {
                                ...training,
                                firstname: customerData.firstname,
                                lastname: customerData.lastname
                            };
                        });
                });
    
                Promise.all(fetchTrainings)
                    .then(updatedTrainings => {
                        console.log("Updated trainings:", updatedTrainings); // Log updated trainings
                        setTrainings(updatedTrainings);
                    });
            })
            .catch(err => console.error(err));
    };

    const colDefs = [
        { field: 'firstname', headerName: 'First Name' },
        { field: 'lastname', headerName: 'Last Name' },
        { field: 'date', headerName: 'Date' },
        { field: 'duration', headerName: 'Duration' },
        { field: 'activity', headerName: 'Activity' }
    ];

    return (
        <div className="ag-theme-material" style={{ height: 400, width: '100%' }}>
            <AgGridReact
                rowData={trainings}
                columnDefs={colDefs}
            />
        </div>
    );
}
