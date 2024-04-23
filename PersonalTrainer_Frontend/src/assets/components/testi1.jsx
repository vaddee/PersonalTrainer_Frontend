import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from "dayjs";

export default function Training() {
    const [trainings, setTrainings] = useState([]);
    const [customers, setCustomers] = useState([]);

    const trainingUrl = 'https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings';
    const customerUrl = 'https://customerrestservice-personaltraining.rahtiapp.fi/api/customers';

    const [colDefs, setColDefs] = useState([
        { field: 'firstname', headerName: 'First Name', sortable: true, filter: true, floatingFilter: true },
        { field: 'lastname', headerName: 'Last Name', sortable: true, filter: true, floatingFilter: true },
        { field: 'date', valueFormatter: params => dayjs(params.value).format('DD.MM.YYYY HH:mm'), sortable: true, filter: true, floatingFilter: true },
        { field: 'duration', headerName: 'Duration', sortable: true, filter: true, floatingFilter: true },
        { field: 'activity', headerName: 'Activity', sortable: true, filter: true, floatingFilter: true }
    ]);

    useEffect(() => {
        getTrainings();
    }, []);

    const getTrainings = () => {


        /* originaali fetch(trainingUrl, { method: 'GET' })
            .then(response => {
                if (response.ok)
                    return response.json();
                else
                    throw new Error('Failed to fetch');
            })
            .then(data => {
                 setTrainings(data._embedded.trainings); 

               
            })
            .catch(err => console.error(err)); */
        fetch(trainingUrl)
            .then(response => response.json())
            .then(trainingData => {
                const trainingsArray = trainingData._embedded.trainings;

                // Fetch customer data
                fetch(customerUrl)
                    .then(response => response.json())
                    .then(customerData => {
                        const customersArray = customerData._embedded.customers.map(customer => ({
                            firstname: customer.firstname,
                            lastname: customer.lastname
                        }));

                        // Now you have both trainingData and extracted customerData
                        console.log('Training Data:', trainingsArray);
                        console.log('Customer Data:', customersArray);

                        // Set the trainings state with the extracted array
                        setTrainings(trainingsArray);
                        // Set the customers state with the extracted array
                        setCustomers(customersArray);
                    });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
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
