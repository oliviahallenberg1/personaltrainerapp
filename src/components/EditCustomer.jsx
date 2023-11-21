import { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



export default function EditCustomer(props) {

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
        updateCustomer(customer, props.customer.links[0].href);
        setOpen(false); // dialogin sulku
    }
    const handleClick = () => {
        setCustomer({ firstname: props.customer.firstname, lastname: props.customer.lastname, streetaddress: props.customer.streetaddress, postcode: props.customer.postcode, city: props.customer.city, email: props.customer.email, phone: props.customer.phone })
        setOpen(true);
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.ok) {
                    props.getCustomers();
                    //  setMsg('Information was saved succesfully')
                    setOpen(true)
                } else {
                    console.log(JSON.stringify(customer));
                    alert('Something went wrong while editing customers information')
                }
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            <Button onClick={handleClick} variant="container">Edit</Button>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>Edit Customer</DialogTitle>
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