import { AgGridReact } from "ag-grid-react"
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import { useState, useEffect } from "react"
import dayjs from "dayjs"
import AddTraining from "./AddTraining"

export default function TrainingGrid() {


    //state-muuttujat
    const [training, setTraining] = useState([]);
    const columns = [
        { field: 'date', headerName: 'Date', valueGetter: (params) => dayjs(params.data.date).format('DD.MM.YYYY') },
        { field: 'duration', headerName: 'Duration in minutes' },
        { field: 'activity' },
        // { field: 'customer.id', headerName: 'customer' },

    ]
    useEffect(() => getTrainings(), [])
    // ei toimi vielä
    const REST_URL = `https://traineeapp.azurewebsites.net/api/trainings`;
   // const URL_FOR_CUSTOMERS = `https://traineeapp.azurewebsites.net/api/customers/id/trainings`

    const getTrainings = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                console.log("responsedata " + responseData.content);
                setTraining(responseData.content);
            })
            .catch(error => {
                console.log(error)
            });
    }

    // const getCustomers = () => {
    //     fetch(`https://traineeapp.azurewebsites.net/api/customers/${id}/trainings`)
    //         .then(response => response.json())
    //         .then(responseData => {
    //             console.log("responsedata " + responseData.content);
    //             setTraining(responseData.content);
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         });
    // }
    // useEffect(() => getCustomers(), [])

    return (
        <>
            <div className="ag-theme-material"
                style={{ height: '600px', width: '100%', margin: 'auto' }}>
               <AddTraining AddTraining={AddTraining} getTrainings={getTrainings} />
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