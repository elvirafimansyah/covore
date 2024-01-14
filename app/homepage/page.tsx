import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import Container from "@/components/container";
const HomePage = () => {
  return ( 
    <Container>
      <section className="py-10 md:py-16 lg:py-20 overflow-hidden">
        <div className="flex flex-col md:flex-row lg:items-center justify-between md:space-x-2 space-y-4 md:space-y-0">
          <div className="md:w-3/4 lg:w-1/2 space-y-3">
            <span className="uppercase text-gold font-semibold md:text-base lg:text-lg ">covid tracker</span>
            <h1 className="font-black text-5xl md:text-4xl lg:text-5xl ">Tracking the pandemic in your key locations.</h1>
            <p className="text-gray-700 text-base md:text-sm lg:text-base">Observing and keeping tabs on the ongoing pandemic specifically in the areas that hold the greatest significance for you. </p>
            <div className="flex space-x-2 pt-3">
              <Button  variant={"default"} asChild size={"lg"}>
                <a href="#globalcases">Global Cases </a>
              </Button>
              <Button asChild variant={"outline"} size={"lg"}>
                <Link href="/dashboard" className="flex items-center space-x-2 "><span>Country</span> <FaArrowRight /> </Link>
              </Button>
            </div>
          </div>
          <div className="lg:1/2">
            <div className="relative">
              <Image 
                src="/img/randomvirus.png"
                width={450}
                height={450}
                alt="randomvirus"
              />
              <div className="absolute top-36 ">
                <div className="relative flex flex-row my-0 mx-auto w-full max-w-[400px] lg:left-10 bg-lightgray rounded-lg  border border-silver py-2 px-3.5 z-99">
                  <input type="text" placeholder="Search Country" className="bg-transparent focus:outline-none grow align-middle "/>
                  <Button variant={"default"} className="align-middle text-sm" size="sm" type="submit">Search</Button>
                </div>
                <Image
                  src="/img/dot.png"
                  width={80}
                  height={80}
                  alt="dot"
                  className="relative -z-50 -top-5 left-[270px] lg:left-80 "
                />
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </Container>
  );
}

export default HomePage;