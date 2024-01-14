import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import Link from 'next/link'
import { IoMenu } from "react-icons/io5";

const NavigationBar = () => {
  return ( 
    <div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger><IoMenu size="32px"  /></SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetDescription>
                <div className="flex flex-col space-y-4 items-start w-full text-lg text-black mt-10">
                  <Link href="/">Home</Link>
                  <Link href="/">Dashboard</Link>
                  <Link href="/">Vaccine</Link>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>  
      <div className="hidden md:flex">
        <div className="flex space-x-7">
          <Link href="/" className="font-medium hover:font-semibold ">Home</Link>
          <Link href="/dashboard" className="font-medium hover:font-semibold">Dashboard</Link>
          <Link href="/vaccine" className="font-medium hover:font-semibold" >Vaccine</Link>
        </div>
      </div>
    </div>
  );
}
 
export default NavigationBar;