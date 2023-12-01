import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/en-gb';

const localizer = momentLocalizer(moment);

export default function TrainingCalendar() {

    const [trainings, setTrainings] = useState([]);

    const REST_URL = "https://traineeapp.azurewebsites.net/gettrainings";

    const getTrainings = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                // mapataan treeni niin, että kalenteri näyttää siitä activityn titlenä 
                const trainingsWithJsDate = responseData.map(training => ({
                    ...training,
                    id: training.id,
                    title: `${training.activity} | ${training.customer.firstname} ${training.customer.lastname}`,
                 
                    // puretaan treenin 'date' aloitusaikaan ja lopetusaikaan
                    // muunnetaan JSON-datan string-muodossa oleva data Date-muotoon
                    // jotta big-calendar pystyy lukemaan dataa
                    // ja annetaan se aloitusajaksi 
                    start: moment(training.date).toDate(),
                    // annetaan uusi aika 'end', treenin lopetusaika
                    // lopetusaika on treeninaloitus aika + treenin kesto
                    end: moment(training.date).add(training.duration, 'minutes').toDate(),
                }));
                console.log(trainingsWithJsDate);
                setTrainings(trainingsWithJsDate);
            })
            .catch(error => {
                console.log(error)
            });
    }

    useEffect(() => getTrainings(), []);


    const MyCalendar = () => (
        <div>
            <Calendar
                localizer={localizer}
                events={trainings}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 550, backgroundColor: 'white' }}
                
            />
        </div>
    );

    return <MyCalendar />;
}

