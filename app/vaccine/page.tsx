"use client"
import React, { useState, useEffect } from "react";
import Container from "@/components/container";
import Image from "next/image";
import GlobalVaccineStats from "./globalstats";

interface Data {
 [date: string]: number 
}

interface lastDataObj {
  date: string,
  vaccine: string,
}

const Vaccine = () => {
  const [data, setData] = useState<Data | null>(null);
  const [lastData, setLastData] = useState<lastDataObj>({date: "", vaccine: ""})
  useEffect(() => {
    async function getVaccine() {
      try {
        const api_url = "https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=all&fullData=false"
        const req = await fetch(api_url);
        const resp = await req.json();
        setData(resp);
        
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }
    getVaccine();
  }, []);

  useEffect(() => {
    if(data) {
      const date = Object.keys(data)
      const vaccine = Object.values(data)
      setLastData({date: date.slice(-1).toString(), vaccine: vaccine.slice(-1).toString()})
    }
  }, [data, lastData])

  return (
    <div className="bg-lightgray py-6 md:py-10 lg:py-12 ">
      <Container>
        <h1 className="text-2xl font-bold">Vaccine</h1>
        <div className="bg-white p-4 mb-4 md:mb-5 lg:mb-7 border border-line rounded-lg w-full">

          <div className='flex items-center space-x-5' >
            <div className='bg-lightgray p-4 rounded-full'>
              <Image
                src={'/img/ambervirus.svg'}
                width={26}
                height={25}
                alt="dot"
              />
            </div>
            <div>
              <span className='capitalize text-sm font-medium text-darkgray'>Global Vaccine Coverage - {lastData.date ? lastData.date : "-"}</span>
              <h3 className='text-lg font-bold'>{lastData.vaccine ? Number(lastData.vaccine).toLocaleString("id-ID") : "-"}</h3>
            </div>
          </div>

          <GlobalVaccineStats data={data ? [{ data: data }] : []}/>
        </div>
      </Container>
    </div>
  )
}

export default Vaccine;