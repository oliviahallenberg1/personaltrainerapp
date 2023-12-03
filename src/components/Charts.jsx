// source for the chart 
// https://recharts.org/en-US/api/RadialBarChart

// source to group trainings by activity name
// https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects

import { useState, useEffect } from "react";
import { RadialBarChart, ResponsiveContainer } from "recharts";
import { RadialBar } from "recharts";
import { Legend, Tooltip } from "recharts";

export default function Charts() {

    const [trainings, setTrainings] = useState([]);

    const REST_URL = "https://traineeapp.azurewebsites.net/gettrainings";

    const getTrainings = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                console.log("responsedata " + responseData);
                const trainingsForChart = responseData.map((training, index) => ({
                    ...training,
                    id: training.id,
                    name: training.activity,
                    fill: getColor(index),
                    //    duration: training.duration
                }));

                // const groupedTrainings = groupBy(trainings, training => training.name);
                //  const groupedTrainings = _.groupBy(trainingsForChart, 'name');
                setTrainings(groupedTrainings);
                console.log("Trainings for chart: " + trainingsForChart);
                console.log("Grouped trainings " + groupedTrainings)
            })
            .catch(error => {
                console.log(error)
            });
    }

    // värit tilastotaulukkoon
    const getColor = (index) => {
        const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];
        return colors[index % colors.length];
    };

    useEffect(() => getTrainings(), []);

    return (
        <>
            <ResponsiveContainer width={730} height={500} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <RadialBarChart
                    innerRadius="20%"
                    outerRadius="100%"
                    data={trainings}
                    startAngle={180}
                    endAngle={0}
                >
                    <RadialBar minAngle={15}
                        label={{ fill: '#00000', position: 'middle' }}
                        background clockWise={true}
                        dataKey='duration'
                        fill={(_, index) => getColor(index)} />
                    <Legend
                        iconSize={10}
                        width={120}
                        height={140}
                        layout="vertical"
                        verticalAlign="right"
                        align="right"
                    />
                    <Tooltip />
                </RadialBarChart>
            </ResponsiveContainer>
        </>
    );
}
