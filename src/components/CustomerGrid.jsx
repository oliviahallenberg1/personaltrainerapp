import { AgGridReact } from "ag-grid-react"
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import { useState, useEffect } from "react"
import { Button } from "@mui/material";
import AddCustomer from "./AddCustomer";


export default function CustomerGrid() {

    //state-muuttujat
    const [customers, setCustomers] = useState([]);
    const columns = [
        { field: 'firstname' },
        { field: 'lastname' },
        { field: 'streetaddress' },
        { field: 'postcode' },
        { field: 'city' },
        { field: 'email' },
        { field: 'phone' },

    ]
    useEffect(() => getCustomers(), [])

    const REST_URL = 'https://traineeapp.azurewebsites.net/api/customers';

    const getCustomers = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                console.log("responsedata " + responseData.content);
                setCustomers(responseData.content);
            })
            .catch(error => {
                console.log(error)
            });
    }

    return (
        <>
            <div className="ag-theme-material"
                style={{ height: '600px', width: '100%', margin: 'auto' }}>
                <AddCustomer AddCustomer={AddCustomer} />

                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}>
                </AgGridReact>
            </div>
        </>
    )
}