import React from "react";
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

async function getHistorical() {
  try {
    const api_url = "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
    const req = await fetch(api_url)
    const resp = await req.json()
    return resp;
  } catch (err) {
    console.error('error')
  }
}

const Stats = async () => {
  const all_cases = await getHistorical()
  const cases = all_cases.cases;
  const labels = Object.keys(cases); 
  return (
    <>
      <Line options={options} data={
        {
          labels,
          datasets: [
            {
              label: "Cases",
              data: cases,
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