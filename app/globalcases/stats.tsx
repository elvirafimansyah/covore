import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface HistoricalData {
  cases: { [date: string]: number };
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: false,
      text: 'Chart Total Cases & Deaths',
    },
  },
};

const Stats =  () => {
  const [historicalData, setHistoricalData] = useState<HistoricalData | null>(null);
  useEffect(() => {
    async function getHistorical() {
      try {
        const api_url = "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
        const req = await fetch(api_url);
        const resp = await req.json();
        setHistoricalData(resp);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }
    getHistorical();
  }, []); 

  if (!historicalData) {
    return <div className="flex flex-col space-y-3">
      <Skeleton className="h-[300px] w-full rounded-xl" />
      <div className="space-y-2 flex justify-center text-center items-center">
        <Skeleton className="h-4 w-[250px] " />
      </div>
    </div>;
  }
  const labels = Object.keys(historicalData.cases);
  return (
    <>
      <Line options={options} data={
        {
          labels,
          datasets: [
            {
              label: "Cases",
              data: Object.values(historicalData.cases),
              borderColor: '#000',
              backgroundColor: '#FACC15',
            },
          ],
        }
      } />

    </>
  );
}
export default Stats;