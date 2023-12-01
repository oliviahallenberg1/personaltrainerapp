import { AgGridReact } from "ag-grid-react"
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import { useState, useEffect } from "react"
import { Button } from "@mui/material";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import { CSVLink } from "react-csv";
import { Snackbar } from "@mui/material";


export default function CustomerGrid() {

    //state-muuttujat
    const [customers, setCustomers] = useState([]);
    const columns = [
        { field: 'firstname', sortable: true, filter: true },
        { field: 'lastname', sortable: true, filter: true },
        { field: 'streetaddress', sortable: true, filter: true },
        { field: 'postcode', sortable: true, filter: true },
        { field: 'city', sortable: true, filter: true },
        { field: 'email', sortable: true, filter: true },
        { field: 'phone', sortable: true, filter: true },
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

    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

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
                        setMsg('Customer was deleted succesfully');
                        setOpen(true);
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
                <AddCustomer AddCustomer={AddCustomer} getCustomers={getCustomers} setMsg={setMsg} setOpen={setOpen}/>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}>
                </AgGridReact>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message={msg} >
                </Snackbar>
                <CSVLink data={exportData}
                    filename={"customers.csv"}
                >Export</CSVLink>
            </div>
        </>
    )
}