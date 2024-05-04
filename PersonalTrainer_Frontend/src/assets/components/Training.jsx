import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from "dayjs";
import { Button, Snackbar } from "@mui/material";
import { CSVLink } from "react-csv";
import DeleteIcon from '@mui/icons-material/Delete'; // delete iconi


export default function Training() {
    const [trainings, setTrainings] = useState([]);

    const URL = 'https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings';
    const URLdelete = 'https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings/';
    var combineURL = "";

    const [colDefs, setColDefs] = useState([
        { field: 'customer.firstname', headerName: 'First Name', sortable: true, filter: true, floatingFilter: true },
        { field: 'customer.lastname', headerName: 'Last Name', sortable: true, filter: true, floatingFilter: true },
        { field: 'date', valueFormatter: params => dayjs(params.value).format('DD.MM.YYYY HH:mm'), headerName: 'Training Date', sortable: true, filter: true, floatingFilter: true },
        { field: 'duration', headerName: 'Duration', sortable: true, filter: true, floatingFilter: true },
        { field: 'activity', headerName: 'Activity', sortable: true, filter: true, floatingFilter: true },
        {
            
                cellRenderer: (params) => (
                    <Button
                        size="small"
                        color="error"
                        onClick={() => deleteTraining(params)}
                        startIcon={<DeleteIcon style={{fontSize: 20}}/>} // Use DeleteIcon as start icon
                    >
                        
                    </Button>
                )
            },
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
                setTrainings(data);
            })
            .catch(err => console.error(err));
    }

    const deleteTraining = (params) => {
        if (window.confirm("Are you sure you want to delete this training?")) {
            combineURL = (URLdelete + params.data.id)
            fetch(combineURL, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        window.alert("training deleted");
                        getTrainings();
                    } else {
                        window.alert("NOT WORKING");
                    }
                })
                .catch(err => console.error(err));
        }
    }

    const headers = [
        { label: 'First Name', key: 'customer.firstname' },
        { label: 'Last Name', key: 'customer.lastname' },
        { label: 'Training Date', key: 'date' },
        { label: 'Duration', key: 'duration' },
        { label: 'Activity', key: 'activity' }
    ];

    return (
        <div>
            <div className="ag-theme-material" style={{ height: 700, width: '100%' }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={colDefs}
                    
                />
            </div>
            <CSVLink data={trainings} headers={headers}>Export to CSV</CSVLink>
        </div>
    );
}
