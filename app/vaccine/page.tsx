"use client"
import React, { useState, useEffect, FormEvent  } from "react";
import Container from "@/components/container";
import Image from "next/image";
import GlobalVaccineStats from "./globalstats";
import { FiSearch } from "react-icons/fi";
import { Skeleton } from "@/components/ui/skeleton"
import CountryVaccineStats from "./countrystats";
interface Data {
  [date: string]: number
}

interface lastDataObj {
  date: string;
  vaccine: string;
}

const Vaccine = () => {
  const [data, setData] = useState<Data | null>(null);
  const [lastData, setLastData] = useState<lastDataObj>({ date: "", vaccine: "" });
  const [inputValue, setInputValue] = useState<string>("indonesia");
  const [value, setValue] = useState<string>("indonesia");
  const [loading, setLoading] = useState<boolean>(true);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    setValue(inputValue)
  };

  useEffect(() => {
    async function getVaccine() {
      try {
        const api_url = "https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=all&fullData=false"
        const req = await fetch(api_url);
        const resp = await req.json();
        setData(resp);
        setLoading(false);

      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }
    getVaccine();
  }, []);

  useEffect(() => {
    if (data ) {
      const date = Object.keys(data)
      const vaccine = Object.values(data)
      setLastData({ date: date.slice(-1).toString(), vaccine: vaccine.slice(-1).toString() })
    }
  }, [data])

  return (
    <div className="bg-lightgray py-6 md:py-10 lg:py-12 ">
      <Container>
        <h1 className="text-2xl font-bold mb-4">Vaccine</h1>
        <div className="bg-white p-4 md:mb-5 lg:mb-7 border border-line rounded-lg w-full">
          <div className='flex items-center space-x-5 mb-4' >
            <div className='bg-lightgray p-4 rounded-full'>
              <Image
                src={'/img/ambervirus.svg'}
                width={26}
                height={25}
                alt="dot"
              />
            </div>
            <div>
              {
                loading ?
                  <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[15px] w-[200px] rounded-xl" />
                    <Skeleton className="h-[15px] w-[150px] rounded-xl " />
                  </div> :
                  <>
                    <span className='capitalize text-sm font-medium text-darkgray'>Global Vaccine Coverage - {lastData.date ? lastData.date : "-"}</span>
                    <h3 className='text-lg font-bold'>{lastData.vaccine ? Number(lastData.vaccine).toLocaleString("id-ID") : "-"}</h3>
                  </>
              }
            </div>
          </div>

          <GlobalVaccineStats data={data ? [{ data: data }] : []} />
        </div>

        <div className="bg-white border border-line rounded-lg ">
          <div className="p-5 flex flex-col md:flex-row md:justify-between space-y-2 md:space-y-0">
            <div>
              <h2 className="text-lg font-semibold">Country Vaccine Coverage</h2>
              <p className="text-gray-700 text-sm">Stay updated on vaccination rates worldwide</p>
            </div>
            <form className="w-full md:w-[300px] " onSubmit={handleSubmit}>
              <label className="mb-2 text-sm font-medium text-gray-800 sr-only ">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <FiSearch size="20" style={{ color: "#848484" }} />
                </div>
                <input type="search" className="block w-full px-4 py-3 ps-10 text-sm text-gray-800 border border-line rounded-lg bg-lightgray focus:border-gold focus:outline-none" placeholder="Search country...."  required value={inputValue} onChange={e => setInputValue(e.target.value)}/>
              </div>
              <button type='submit'></button>
            </form>
          </div>

          <div className="px-5 pb-5">
            <CountryVaccineStats value={value} />
          </div>
        </div>


      </Container>
    </div>
  )
}

export default Vaccine;