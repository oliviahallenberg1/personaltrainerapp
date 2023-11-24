import { AgGridReact } from "ag-grid-react"
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import { useState, useEffect } from "react"
import dayjs from "dayjs"
import AddTraining from "./AddTraining"
import { Button } from "@mui/material"


export default function TrainingGrid() {


    //state-muuttujat
    const [training, setTraining] = useState([]);
    const columns = [
        { field: 'date', headerName: 'Date', valueGetter: (params) => dayjs(params.data.date).format('DD.MM.YYYY') },
        { field: 'duration', headerName: 'Duration in minutes' },
        { field: 'activity' },
        {
            field: 'customer.id',
            headerName: 'Customer',
            valueGetter: (params) => {
                const customer = params.data.customer;
                if (customer && customer.firstname && customer.lastname) {
                    return `${customer.firstname} ${customer.lastname}`;
                } // jos customer tietoa ei löydy palauta tyhjä
                else {
                    return '';
                }
            }
        }, {
            cellRenderer: params =>
                <Button size="small"
                    color="error"
                    onClick={() => deleteTraining(params)}>
                    Delete
                </Button>,
            width: 120
        }
    ]
    useEffect(() => getTrainings(), [])

    //delete training
    const deleteTraining = (params) => {
        if (confirm("Please confirm action")) {
            console.log("params: ", `https://traineeapp.azurewebsites.net/trainings/${params.data.id}`)
            fetch(`https://traineeapp.azurewebsites.net/api/trainings/${params.data.id}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        getTrainings();
                        //    setMsg('Customer was deleted succesfully');
                        //       setOpen(true);
                    } else {
                        alert('Something went wrong!');
                    }
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }

    const REST_URL = "https://traineeapp.azurewebsites.net/gettrainings";

    const getTrainings = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                console.log("responsedata " + responseData);
                setTraining(responseData);
            })
            .catch(error => {
                console.log(error)
            });
    }

    return (
        <>
            <div className="ag-theme-material"
                style={{ height: '600px', width: '100%', margin: 'auto' }}>
                <AddTraining addTraining={AddTraining} getTrainings={getTrainings} />
                <AgGridReact
                    rowData={training}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}>
                </AgGridReact>
            </div>
        </>
    )
}