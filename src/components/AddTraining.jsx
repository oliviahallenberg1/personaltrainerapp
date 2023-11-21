import { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function AddTraining(props) {

    //states
    const [training, setTraining] = useState({ date: '', duration: '', activity: '' })

    const [open, setOpen] = useState(false);

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



    const REST_URL = 'https://traineeapp.azurewebsites.net/api/trainings'
    const addTraining = (training) => {
        //REST API call
        fetch(REST_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
            .then(response => {
                if (response.ok) {
                    props.getTrainings();
                    //    setMsg('Training was added succesfully')
                    //  setOpen(true)
                } else
                    alert('Something went wrong while adding training')
            })
            .catch(error => console.log(error))
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}
                        adapterLocale="de">
                        <DatePicker
                            name="date"
                            format="DD.MM.YYYY"
                            value={training.date}
                            onChange={changeDate} />
                    </LocalizationProvider>
                    <TextField
                        label="Duration in minutes"
                        name="duration"
                        value={training.duration}
                        onChange={handleInputChange}
                    ></TextField> <TextField
                        label="Activity"
                        name="activity"
                        value={training.activity}
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
