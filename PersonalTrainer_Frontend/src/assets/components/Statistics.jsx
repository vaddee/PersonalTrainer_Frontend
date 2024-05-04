import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Statistics = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchActivityData();
    }, []);

    const fetchActivityData = () => {
        
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings')
            .then(response => response.json())
            .then(data => {
                
                const formattedData = processData(data);
                setData(formattedData);
            })
            .catch(error => {
                console.error('Error fetching activity data:', error);
            });
    }

    const processData = (data) => {
        
        const activityMap = {};
        data.forEach(training => {
            const activity = training.activity;
            const duration = training.duration;
            if (activityMap[activity]) {
                activityMap[activity] += duration;
            } else {
                activityMap[activity] = duration;
            }
        });
        
        const formattedData = Object.keys(activityMap).map(activity => ({
            activity: activity,
            duration: activityMap[activity]
        }));
        return formattedData;
    }

    return (
        <div style={{ width: '50%', height: 700 }}>
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="activity" />
                    <YAxis label={{ value: 'Duration (mins)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="duration" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Statistics;
