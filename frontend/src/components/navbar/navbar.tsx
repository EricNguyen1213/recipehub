import logo from "../../assets/images/logo.png";
import logoText from "../../assets/images/logoText.png";
import { BiSolidFoodMenu } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { FaBookOpen } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";


function useOutsideClick(ref: React.RefObject<HTMLElement>, callback: () => void) {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {

      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, callback]);
}



// interface NavBarProps {
//   variant?: "exploreOpen" | "exploreClosed" | "default";
// }

export default function NavBar() {
  
  
  const [isNavOpen, setIsNavOpen] = useState(false);
  const withinNav = useRef<HTMLElement>(null!);
  useOutsideClick(withinNav, () => setIsNavOpen(false));

  const [isExplorePage, setIsExplorePage] = useState(false);
  const [isSideSearchOpen, setIsSideSearchOpen] = useState(false);

  return (
    <nav ref={withinNav} className="bg-white w-full shadow-lg sticky top-0 z-50">
      
      <section className="w-full h-13 flex">
        {isExplorePage ? 
          <div className="w-17 flex justify-end my-auto">
              {isSideSearchOpen ? 
                <FaBookOpen size="2.25em" className="text-mydarkgreen" />
                : <BiSolidFoodMenu size="2.25em" className="text-mydarkgreen" />}
          </div>
          : <div className="md:w-17"></div>}
        
        
        <div className="px-3 flex justify-between mx-auto w-7/8 md:w-4/5">
          <div className="flex gap-1 h-full">
            <img className="w-9 my-auto" src={logo} alt="Logo" />

            <img className="w-30 my-auto" src={logoText} alt="Shop4Food" />
          </div>

          <div className="my-auto sm:hidden">
              <Button 
                className="" 
                variant="ghostIcon" 
                size="icon-lg"
                onClick={() => setIsNavOpen(() => !isNavOpen)}
              >
                {!isNavOpen && <GiHamburgerMenu className="text-mydarkgreen size-5" />}
                {isNavOpen && <IoMdClose className="text-mydarkgreen size-6" />}
              </Button>
          </div>

          <div className="my-auto hidden sm:flex gap-3">
            <div>
              <Button className="text-base" variant="navLink">Explore</Button>
            
              <Button className="text-base" variant="navLink">Feed</Button>
            
              <Button className="text-base" variant="navLink">Profile</Button>
            </div>
            <div className="flex gap-2 my-auto">
              <Button className="text-base" variant="homeLight" size="sm">Sign In</Button>
              <Button className="text-base" variant="homeDark" size="sm">Sign Up</Button>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isNavOpen && (
          <motion.section
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col gap-2 overflow-hidden pb-2 px-10 sm:hidden"
          >
            <div>
              <Button className="text-base" variant="navLink">Explore</Button>
            </div>
            <div>
              <Button className="text-base" variant="navLink">Feed</Button>
            </div>
            <div>
              <Button className="text-base" variant="navLink">Profile</Button>
            </div>
            <div className="flex gap-2">
              <Button className="text-base" variant="homeLight" size="sm">Sign In</Button>
              <Button className="text-base" variant="homeDark" size="sm">Sign Up</Button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </nav>
  )
}