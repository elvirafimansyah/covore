import React, { useState, useEffect, SetStateAction, use } from "react";
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
import NotFound from "@/components/notfound";

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
}
interface countryFlag {
  countryInfo: {
    flag: string;
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

const CountryVaccineStats: React.FC<countryVaccine> = ({ value }) => {
  const [countryVaccineData, setCountryVaccineData] = useState<CountryVaccineData | null>(null);
  const [countryFlag, setCountryFlag] = useState<countryFlag | null>(null)
  const [notFound, setNotFound] = useState<boolean>(false);
  useEffect(() => {
    async function getCountryVaccine() {
      try {
        const api_url = `https://disease.sh/v3/covid-19/vaccine/coverage/countries/${value}?lastdays=30&fullData=false`
        const req = await fetch(api_url);
        const resp = await req.json();
        setCountryVaccineData(resp);
      } catch (err) {
        setNotFound(true);
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
        setNotFound(true);
        console.error('Error fetching data:', err);
      }
    }


    getCountryVaccine();
    getCountryFlag();

  }, [value, countryVaccineData])



  if (!countryVaccineData || !countryFlag) {
    return <div className="flex flex-col space-y-3">
      <Skeleton className="h-[300px] w-full rounded-xl" />
      <div className="space-y-2 flex justify-center text-center items-center">
        <Skeleton className="h-4 w-[250px] " />
      </div>
    </div>;
  }

  const labels = countryVaccineData.timeline ? Object.keys(countryVaccineData.timeline) : []

  return (
    <>
      {countryVaccineData && countryVaccineData.timeline && countryFlag && !notFound ?
        <>
          <div className="flex space-x-2 items-center mb-2">
            {countryFlag?.countryInfo?.flag ? (
              <img src={countryFlag.countryInfo.flag} width={22} alt="Flag" />
            ) : (
              <span>No Flag Available</span>
            )}

            <span className="font-semibold">{countryVaccineData.country ? countryVaccineData.country : "-"} </span>
          </div>
          <Line
            options={options}
            data={
              {
                labels,
                datasets: [
                  {
                    label: "Recent Vaccine Coverage",
                    data: countryVaccineData.timeline ? Object.values(countryVaccineData.timeline) : [],
                    borderColor: '#000',
                    backgroundColor: '#FACC15',
                  },
                ],
              }
            }
          />
        </> :
        <NotFound
          title="No Results Found"
          description="No results match the filter criteria. Remove filter or clear all filters to show results"
        />
      }
    </>
  );
}
export default CountryVaccineStats;