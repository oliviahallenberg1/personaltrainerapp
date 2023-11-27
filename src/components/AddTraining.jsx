import { useState, useEffect } from "react";
import { Button, TextField, MenuItem } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs"

export default function AddTraining(props) {

    //states
    const [training, setTraining] = useState({ date: '', duration: '', activity: '', customer: '' })
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);

    //fetch customers
    useEffect(() => {
        fetch('https://traineeapp.azurewebsites.net/getcustomers')
            .then(response => response.json())
            .then(responseData => {
                console.log("responsedata " + responseData);
                setCustomers(responseData);
            })
            .catch(error => {
                console.log(error)
            });
    }, []);

    const handleClose = (_, reason) => {
        if (reason != 'backdropClick') {
            setOpen(false);
        }
    }

    const handleInputChange = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value })
    }
    const changeDate = (date) => {
        setTraining({ ...training, date: date })
    }


    const handleSave = () => {
        // handleClose();
        addTraining(training);
        setOpen(false); // dialogin sulku
    }

    // Rest-url
    const REST_URL = 'https://traineeapp.azurewebsites.net/api/trainings'
    const addTraining = (training) => {

        // tehdään customerobjekti, jotta voidaan viitata customeriin customer linkissä myöhemmin
        const customerObject = customers.find(customer => customer.id === training.customer);
        // luodaan treeniobjetki, jotta saadaan
        // 1. päivämäärä haluttuun ISO-formattiin 
        // 2. customerin tiedot oikeaan muotoon
        const trainingObject = {
            date: dayjs(training.date).toISOString(),
            activity: training.activity,
            duration: training.duration,
            customer: `https://traineeapp.azurewebsites.net/api/customers/${customerObject.id}`
        };

        //REST API call
        fetch(REST_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trainingObject)
        })
            .then(response => {
                if (response.ok) {
                    console.log(response);
                    props.getTrainings();
                    //  setMsg('Training was added successfully')
                    //  setOpen(true)
                } else {
                    alert('Something went wrong while adding training');
                }
            })
            .catch(error => {
                console.error('Error adding training:', error);
                alert('Something went wrong while adding training');
            });
    }
    // return
    return (
        <>
            <Button onClick={() => setOpen(true)} variant="container">New training</Button>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>New training</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            name="date"
                            format="DD.MM.YYYY"
                            value={training.date}
                            onChange={changeDate}
                            margin="dense" />
                    </LocalizationProvider>
                    <br />
                    <TextField
                        label="Duration in minutes"
                        name="duration"
                        value={training.duration}
                        onChange={handleInputChange}
                        margin="dense"
                    ></TextField>   <br /> <TextField
                        label="Activity"
                        name="activity"
                        value={training.activity}
                        onChange={handleInputChange}
                        margin="dense"
                    ></TextField>   <br />
                    <TextField
                        select
                        label="Customer"
                        name="customer"
                        value={training.customer}
                        onChange={handleInputChange}
                        margin="dense"
                        sx={{ width: '200px' }} >
                        {customers.map(customer => (
                            <MenuItem key={customer.id} value={customer.id}>
                                {`${customer.firstname} ${customer.lastname}`}
                            </MenuItem>
                        ))}
                    </TextField>   <br />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
