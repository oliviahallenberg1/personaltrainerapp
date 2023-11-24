import { AgGridReact } from "ag-grid-react"
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import { useState, useEffect } from "react"
import { Button } from "@mui/material";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import { CSVLink } from "react-csv";


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
        {
            cellRenderer: params =>

                <EditCustomer params={params} customer={params.data} getCustomers={getCustomers} />
            ,
            width: 120
        },
        {
            cellRenderer: params =>
                <Button size="small"
                    color="error"
                    onClick={() => deleteCustomer(params)}>
                    Delete
                </Button>,
            width: 120
        }

    ]
    useEffect(() => getCustomers(), [])

    const REST_URL = 'https://traineeapp.azurewebsites.net/api/customers';

    // get all customers
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

    // delete customer
    const deleteCustomer = (params) => {
        if (confirm("Please confirm action")) {

            console.log("params: ", params.data.links[0].href)
            fetch(params.data.links[0].href, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        getCustomers();
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

    const exportData = customers.map(customer => ({
        Lastname: customer.lastname,
        Firstname: customer.firstname,
        Streetaddress: customer.streetaddress,
        Postalcode: customer.postcode,
        City: customer.city,
        email: customer.email,
        Phone: customer.phone
    }));

    return (
        <>
            <div className="ag-theme-material"
                style={{ height: '600px', width: '100%', margin: 'auto' }}>
                <AddCustomer AddCustomer={AddCustomer} getCustomers={getCustomers} />

                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}>
                </AgGridReact>
                <CSVLink data={exportData}
                    filename={"customers.csv"}
                >Export</CSVLink>
            </div>
        </>
    )
}