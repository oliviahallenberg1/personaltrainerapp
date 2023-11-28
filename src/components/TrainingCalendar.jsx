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
                // lisätään treenille lopetusaika
                const trainingsWithEndingTime = responseData.map(training => ({
                    ...training,
                    end: moment(training.date).add(training.duration, 'minutes').toISOString(),
                }));
                console.log(trainingsWithEndingTime);
                setTrainings(trainingsWithEndingTime);
            })
            .catch(error => {
                console.log(error)
            });
    }

    useEffect(() => getTrainings(), [])


    const EventComponent = ({ event }) => (
        <div>
            <div>{event.activity}</div>
            {event.customer && (
                <div>{`${event.customer.firstname} ${event.customer.lastname}`}</div>
            )}
        </div>
    );

    const MyCalendar = () => (
        <div>
            <Calendar
                localizer={localizer}
                events={trainings}
                startAccessor="date"
                endAccessor="end"
                style={{ height: 550 , backgroundColor: 'white'}}
                components={{
                    event: EventComponent,
                }}
            />
        </div>
    );

    return <MyCalendar />;
}
