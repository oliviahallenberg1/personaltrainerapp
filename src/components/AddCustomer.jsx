import { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddCustomer() {

    //states
    const [customer, setCustomer] = useState({ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' })

    const [open, setOpen] = useState(false);

    const handleClose = (_, reason) => {
        if (reason != 'backdropClick') {
            setOpen(false);
        }
    }

    const handleInputChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    }

    const handleSave = () => {
        // handleClose();
        addCustomer(customer);
        setOpen(false); // dialogin sulku
    }

    const REST_URL = 'https://traineeapp.azurewebsites.net/api/customers'
    const addCustomer = (customer) => {
        //REST API call
        fetch(REST_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.ok) {
                    getCustomers();
                    setMsg('Customer was added succesfully')
                    setOpen(true)
                } else
                    alert('Something went wrong while adding customer')
            })
            .catch(error => console.log(error))
    }
    // return
    return (
        <>
            <Button onClick={() => setOpen(true)} variant="container">New Customer</Button>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>New Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Firstname"
                        name="firstname"
                        value={customer.firstname}
                        onChange={handleInputChange}
                    ></TextField>
                    <TextField
                        label="Lastname"
                        name="lastname"
                        value={customer.lastname}
                        onChange={handleInputChange}
                    ></TextField> <TextField
                        label="Streetaddress"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={handleInputChange}
                    ></TextField> <TextField
                        label="Postcode"
                        name="postcode"
                        value={customer.postcode}
                        onChange={handleInputChange}
                    ></TextField> <TextField
                        label="City"
                        name="city"
                        value={customer.city}
                        onChange={handleInputChange}
                    ></TextField> <TextField
                        label="Email"
                        name="email"
                        value={customer.email}
                        onChange={handleInputChange}
                    ></TextField> <TextField
                        label="Phone"
                        name="phone"
                        value={customer.phone}
                        onChange={handleInputChange}
                    ></TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
