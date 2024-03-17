import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"

import Link from 'next/link'
import { IoMenu } from "react-icons/io5";

const NavigationBar = () => {
  return (
    <div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger><IoMenu size="32px" /></SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetDescription>
                <div className="flex flex-col space-y-10 items-start w-full text-lg text-black mt-10 font-semibold">
                  <SheetClose asChild className="bg-lightgray w-full py-4 rounded-lg">
                    <Link href="/">Home</Link>
                  </SheetClose>
                  <SheetClose asChild className="bg-lightgray w-full py-4 rounded-lg">
                    <Link href="/dashboard">Dashboard</Link>
                  </SheetClose>
                  <SheetClose asChild className="bg-lightgray w-full py-4 rounded-lg">
                    <Link href="/vaccine">Vaccine</Link>
                  </SheetClose>
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