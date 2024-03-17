"use client"

import React, { useState, useEffect, useRef } from "react";
import Container from "@/components/container";
import Pagination from "./pagination";
import NotFound from "@/components/notfound";
import { FiSearch } from "react-icons/fi";
import { Skeleton } from "@/components/ui/skeleton"

interface CountryData {
  country: string,
  countryInfo: {
    flag: string
  },
  cases: number,
  todayCases: number,
  deaths: number,
  todayDeaths: number,
  recovered: number,
}

const Dashboard = () => {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [filterCountries, setFilterCountries] = useState<CountryData[]>([])
  const [recentCountries, setRecentCountries] = useState<CountryData[]>([])
  const [value, setValue] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [curPage, setCurPage] = useState<number>(1)
  const filterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function getAllCountries() {
      try {
        const api_url = "https://disease.sh/v3/covid-19/countries/"
        const req = await fetch(api_url);
        const resp = await req.json();
        setCountries(resp);
        setLoading(false)
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }
    getAllCountries();
  }, []);

  const itemsPerPage = 50;
  const lastIndex = curPage * itemsPerPage
  const firstIndex = lastIndex - itemsPerPage
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(countries.length / itemsPerPage); i++) {
    pageNumbers.push(i)
  }
  const arrayPageNumber = pageNumbers.map((number) => number)
  const lastIndexNumber = arrayPageNumber[arrayPageNumber.length - 1]

  useEffect(() => {
    const paginationCountries = countries.slice(firstIndex, lastIndex);
    setRecentCountries(paginationCountries)
  }, [countries, firstIndex, lastIndex])

  useEffect(() => {
    const filteredData = recentCountries.filter(({ country }) => country.toLowerCase().trim().includes(value.toLowerCase().trim()))
    setFilterCountries(filteredData)
  }, [value, recentCountries])

  const handleChangePage = (number: number) => {
    setCurPage(number)
    filterRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleNextPage = () => {
    if (curPage !== lastIndexNumber) {
      setCurPage(curPage + 1)
      filterRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handlePrevPage = () => {
    if (curPage !== 1) {
      setCurPage(curPage - 1)
      filterRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!countries) return <div className="flex flex-col space-y-3">
    <Skeleton className="h-[300px] w-full rounded-xl" />
    <div className="space-y-2 flex justify-center text-center items-center">
      <Skeleton className="h-4 w-[250px] " />
    </div>
  </div>

  return (
    <div className="bg-lightgray py-8 md:py-12 lg:py-16 ">
      <Container>
        <div className="bg-white border border-line rounded-lg ">
          <div className="p-5 flex flex-col md:flex-row md:justify-between space-y-2 md:space-y-0">
            <div>
              <h2 className="text-lg font-semibold">Cases by Country</h2>
              <p className="text-gray-700 text-sm">Explore the latest data on cases by country</p>
            </div>
            <div className="w-full md:w-[300px] " ref={filterRef}>
              <label className="mb-2 text-sm font-medium text-gray-800 sr-only ">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <FiSearch size="20" style={{ color: "#848484" }} />
                </div>
                <input type="search" className="block w-full px-4 py-3 ps-10 text-sm text-gray-800 border border-line rounded-lg bg-lightgray focus:border-gold focus:outline-none" placeholder="Search country...." required onChange={(e) => setValue(e.target.value)} />
              </div>
            </div>
          </div>

          {loading ? 
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[300px] w-full rounded-xl" />
            <div className="space-y-2 flex justify-center text-center items-center">
              <Skeleton className="h-4 w-[250px] " />
            </div>
          </div> 
          : !filterCountries.length ? 
            <NotFound
              title="No Results Found"
              description="No results match the filter criteria. Remove filter or clear all filters to show results."
              size="2xl"
              size_md="3xl"
            /> :
            <div className="relative w-full overflow-auto">
              <table className="w-full text-sm text-left rtl:text-right font-normal  ">
                <thead className="bg-lightgray border-t border-b border-b-line border-t-line [&_tr]:border-b text-xs md:text-sm ">
                  <tr className="border-b transition-colors hover:bg-lightgray data-[state=selected]:bg-muted">
                    <th scope="col" className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                      Country
                    </th>
                    <th scope="col" className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                      Total Cases
                    </th>
                    <th scope="col" className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                      Today Cases
                    </th>
                    <th scope="col" className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                      Recovered
                    </th>
                    <th scope="col" className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                      Total Deaths
                    </th>
                    <th scope="col" className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                      Today Deaths
                    </th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {!filterCountries.length ? <div>notfound</div> : filterCountries.map((user, idx) => (
                    <tr className="border-b transition-colors hover:bg-lightgray data-[state=selected]:bg-muted" key={idx}>
                      <th scope="row" className="p-4 align-middle [&:has([role=checkbox])]:pr-0 flex items-center space-x-2">
                        <img src={user.countryInfo.flag} width={22} alt="none" />
                        <span className="font-semibold">{user.country}</span>
                      </th>
                      <th scope="row" className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-semibold">
                        {user.cases ? user.cases.toLocaleString("id-ID") : "-"}
                      </th>
                      <th scope="row" className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-semibold">
                        {user.todayCases ? user.todayCases.toLocaleString("id-ID") : "-"}
                      </th>
                      <th scope="row" className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-semibold">
                        {user.recovered ? user.recovered.toLocaleString("id-ID") : "-"}
                      </th>
                      <th scope="row" className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-semibold">
                        {user.deaths ? user.deaths.toLocaleString("id-ID") : "-"}
                      </th>
                      <th scope="row" className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-semibold">
                        {user.todayDeaths ? user.todayDeaths.toLocaleString("id-ID") : "-"}
                      </th>
                    </tr>
                  ))}

                </tbody>
              </table>
              <Pagination
                handleChangePage={handleChangePage}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                curPage={curPage}
                pageNumbers={pageNumbers} />
            </div>
          }

        </div>
      </Container>
    </div>
  );
}

export default Dashboard;