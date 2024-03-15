"use client"
import React from "react";
import Image from 'next/image';
import Stats from "./stats";

interface Case {
  cases?: number,
  deaths?: number,
}

interface CasesProps {
  cases?: Case[];
}

const CasesChart: React.FC<CasesProps> = ({ cases }) => {
  const list_cases = [
    {
      icon: "/img/ambervirus.svg",
      name: "cases",
      data: cases?.[0]?.cases || 0
    },
    {
      icon: "/img/blackvirus.svg",
      name: "deaths",
      data: cases?.[0]?.deaths || 0
    },
  ]

  return (
    <div className="bg-white p-4 mb-4 md:mb-5 lg:mb-7 border border-line rounded-lg w-full">
      <h2 className="text-lg font-semibold ">Total</h2>
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-7 space-y-4 sm:space-y-0 my-4">
        {list_cases.map((_, idx) => (
          <div className='flex items-center space-x-5' key={idx}>
            <div className='bg-lightgray p-4 rounded-full'>
              <Image
                src={_.icon}
                width={26}
                height={25}
                alt="dot"
              />
            </div>
            <div>
              <span className='capitalize text-sm font-medium text-darkgray'>{_.name ? _.name : "None"}</span>
              <h3 className='text-lg font-bold'>{_.data ? _.data.toLocaleString("id-ID") : "-"}</h3>
            </div>
          </div>
        ))}
      </div>
      <Stats />
      
    </div>

  );
}
export default CasesChart;