import Container from "./container";
import { SiBuymeacoffee } from "react-icons/si";
import { FaInstagram, FaGithub, FaDribbble } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import Link from "next/link";
const Footer = () => {
  const socialmedia = [
    {
      name: "Instagram",
      icon: <FaInstagram size="22" />,
      link: "https://www.instagram.com/virn_el/",
    },
    {
      name: "X",
      icon: <FaXTwitter size="22" />,
      link: "https://twitter.com/elvirafirmansy1",
    },
    {
      name: "github",
      icon: <FaGithub size="22" />,
      link: "https://github.com/elvirafimansyah",
    },
    {
      name: "dribbble",
      icon: <FaDribbble size="22" />,
      link: "https://dribbble.com/ElviraFir",
    },
  ]
  return ( 
    <Container>
      <div className="bg-white py-8">
        <div className="flex items-center space-x-6 justify-center mb-6">
          <Link href="https://github.com/elvirafimansyah" target="_blank">
            <div className="flex items-center space-x-2 ">
              <FaGithub size="24"/>
              <span className="capitalize font-medium">source code</span>
            </div>
          </Link>
          <Link href="https://www.buymeacoffee.com/elvira" target="_blank">
            <div className="bg-[#FFDD00] flex items-center px-3 py-2 space-x-2 rounded-md">
              <SiBuymeacoffee />
              <span className="uppercase text-xs font-medium">
                buy me coffee
              </span>
            </div>
          </Link>
        </div>
        <div className="bg-lightgray py-5 px-8 border border-line rounded-lg flex justify-between items-center">
          <span className="text-gray-800 font-medium ">© 2023 Covore. All rights reserved.</span>
          <div className="flex gap-5">
            {socialmedia.map((_, idx) => (
              <Link key={idx} href={_.link} target="_blank" className="text-gray-800">
                {_.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Footer;