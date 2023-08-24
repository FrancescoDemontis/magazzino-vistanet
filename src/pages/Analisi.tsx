// Stats.jsx

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Analisi = () => {
    const [statsData, setStatsData] = useState([]);

    useEffect(() => {
        fetchStatsData();
    }, []);

    const fetchStatsData = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await fetch("https://magazzino-api.v-net.it/api/stats", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Accept": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Errore nella richiesta delle statistiche: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(data.stats); // Aggiungi questo log per verificare i dati ricevuti
            setStatsData(data.stats);
        } catch (error) {
            console.error("Errore durante il recupero delle statistiche:", error);
        }
    };

    return (
      
      
            <BarChart width={600} height={300} data={statsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="Numero di Richieste" />
            </BarChart>
     
        
    );
};

export default Analisi;
