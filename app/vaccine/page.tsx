"use client"
import Container from "@/components/container";
import Image from "next/image";
import GlobalVaccineStats from "./globalstats";
const Vaccine = () => {
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
              <span className='capitalize text-sm font-medium text-darkgray'>Global Vaccine Coverage</span>
              <h3 className='text-lg font-bold'></h3>
            </div>
          </div>

          <h2 className="text-lg font-semibold ">Total</h2>
          <GlobalVaccineStats />
        </div>
      </Container>
    </div>
  )
}

export default Vaccine;