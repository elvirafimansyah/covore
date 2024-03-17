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

interface countryVaccine {
  value: string;
  submit: boolean;
  setSubmit: void;
}
interface countryFlag {
  countryInfo: {
    flag: string
  }
}

interface CountryVaccineData {
  country: string;
  timeline: { [date: string]: number }
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: false,
      text: 'Country Vaccine Coverage',
    },
  },
};

const CountryVaccineStats: React.FC<countryVaccine> = ({ value, submit }) => {
  const [countryVaccineData, setCountryVaccineData] = useState<CountryVaccineData | null>(null);
  const [countryFlag, setCountryFlag] = useState<countryFlag | null>(null)

  useEffect(() => {
    async function getCountryVaccine() {
      try {
        const api_url = `https://disease.sh/v3/covid-19/vaccine/coverage/countries/${value}?lastdays=30&fullData=false`
        const req = await fetch(api_url);
        const resp = await req.json();
        setCountryVaccineData(resp);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }
    async function getCountryFlag() {
      try {
        const api_url = `https://disease.sh/v3/covid-19/countries/${value}?strict=true`
        const req = await fetch(api_url);
        const resp = await req.json();
        setCountryFlag(resp);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }
    if(submit) {
      getCountryVaccine();
      getCountryFlag();
    }
  })


  if (!countryVaccineData) {
    return <div className="flex flex-col space-y-3">
      <Skeleton className="h-[300px] w-full rounded-xl" />
      <div className="space-y-2 flex justify-center text-center items-center">
        <Skeleton className="h-4 w-[250px] " />
      </div>
    </div>;
  }
  const labels = Object.keys(countryVaccineData.timeline);
  return (
    <>
      {
        submit ?
          <>
            <div className="flex space-x-2">
              <img src={countryFlag?.countryInfo.flag ? countryFlag?.countryInfo.flag : "-"} width={22} alt="none" />
              <span className="font-semibold">{countryVaccineData.country ? countryVaccineData.country : "-"}</span>
            </div>
            <Line options={options} data={
              {
                labels,
                datasets: [
                  {
                    label: "Cases",
                    data: Object.values(countryVaccineData.timeline),
                    borderColor: '#000',
                    backgroundColor: '#FACC15',
                  },
                ],
              }
            }
            />
          </> : null
      }
    </>

  );
}
export default CountryVaccineStats;