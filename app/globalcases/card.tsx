import CasesChart from './chart'
import Image from 'next/image'

async function getGlobalCases() {
  try {
    const api_url = "https://disease.sh/v3/covid-19/all"
    const req = await fetch(api_url)
    const resp = await req.json()
    return resp;
  } catch (err) {
    console.error('error')
  }
}


const CardCases = async () => {
  const data = await getGlobalCases()
  const list_1 = [
    {
      icon: "/img/people.svg",
      name: "population",
      data: data.population
    },
    {
      icon: "/img/redvirus.svg",
      name: "today cases",
      data: data.todayCases 
    },
    {
      icon: "/img/redvirus.svg",
      name: "today deaths",
      data: data.todayDeaths
    },
  ]

  const list_2 = [
    {
      icon: "/img/greenvirus.svg",
      name: "total recovered",
      data: data.recovered
    },
    {
      icon: "/img/greenvirus.svg",
      name: "today recovered",
      data: data.todayRecovered
    },
    {
      icon: "/img/redvirus.svg",
      name: "active",
      data: data.active
    },
    {
      icon: "/img/ambervirus.svg",
      name: "tests",
      data: data.tests
    },
  ]

  return ( 
    <div>
      { data && 
      <div>

        <div className='-mx-4 flex flex-wrap'>
          {
            list_1.map((user, i) => (
              <div className='w-full px-4 md:w-1/2 lg:w-1/3' key={i}>
                <div className="bg-white p-4 flex items-center space-x-5 mb-4 md:mb-5 lg:mb-7 border border-line rounded-lg">
                  <div className='bg-lightgray p-4 rounded-full'>
                    <Image
                      src={user.icon}
                      width={26}
                      height={25}
                      alt="dot"
                    />
                  </div>
                  <div> 
                    <span className='capitalize text-sm font-medium text-darkgray'>{user.name ? user.name : "None"}</span>
                    <h3 className='text-lg font-bold'>{user.data ? user.data.toLocaleString("id-ID") : "-"}</h3>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        <CasesChart />
        
        <div className='-mx-4 flex flex-wrap'>
          {
            list_2.map((user, i) => (
              <div className='w-full px-4 md:w-1/2 lg:w-1/3' key={i}>
                <div className="bg-white p-4 flex items-center space-x-5 mb-4 md:mb-5 lg:mb-7 border border-line rounded-lg">
                  <div className='bg-lightgray p-4 rounded-full'>
                    <Image
                      src={user.icon}
                      width={26}
                      height={25}
                      alt="dot"
                    />
                  </div>
                  <div>
                    <span className='capitalize text-sm font-medium text-darkgray'>{user.name ? user.name : "None"}</span>
                    <h3 className='text-lg font-bold'>{user.data ? user.data.toLocaleString("id-ID") : "-"}</h3>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

      </div>
      }
    </div>
  );
}
export default CardCases;