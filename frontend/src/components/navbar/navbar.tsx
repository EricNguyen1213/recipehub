import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BiSolidFoodMenu } from "react-icons/bi";
import { FaBookOpen } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { HashLink as Link } from 'react-router-hash-link';
import logo from "../../assets/images/logo.png";
import logoText from "../../assets/images/logoText.png";
import { useLocation } from "react-router-dom";


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

interface NavBarProps {
  isSideMenuOpen: boolean;
  setIsSideMenuOpen: (newState: boolean) => void;
}

export default function NavBar({ isSideMenuOpen, setIsSideMenuOpen } : NavBarProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const withinNav = useRef<HTMLElement>(null!);
  useOutsideClick(withinNav, () => setIsNavOpen(false));

  const isExplorePage = useLocation().pathname === '/explore';

  useEffect(() => {
    if (isSideMenuOpen) {
      const timer = setTimeout(() => {
        const nav = document.querySelector('nav');
        if (nav) {
          nav.removeAttribute('aria-hidden');
          nav.removeAttribute('data-aria-hidden');
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isSideMenuOpen]);

  return (
    <nav ref={withinNav} className="bg-white w-full shadow-lg sticky top-0 z-50 pointer-events-auto">
      <section className="w-full h-13 flex">
        {isExplorePage ? 
          <div className="w-17 flex justify-end my-auto">
              {isSideMenuOpen ? 
                <Button 
                  className="" 
                  variant="ghostIcon" 
                  size="icon-lg"
                  onClick={(e) => {
                    (e.currentTarget as HTMLButtonElement).blur();
                    setIsSideMenuOpen(false);
                  }}
                > 
                  <FaBookOpen className="text-mydarkgreen size-[2.25em]" />
                </Button>
                : <Button 
                  className="" 
                  variant="ghostIcon" 
                  size="icon-lg"
                  onClick={(e) => {
                    (e.currentTarget as HTMLButtonElement).blur();
                    setIsSideMenuOpen(true);
                  }}
                > 
                  <BiSolidFoodMenu className="text-mydarkgreen size-[2.25em]" />
                </Button>}
          </div>
          : <div className="md:w-17"></div>}
        
        
        <div className="px-3 flex justify-between mx-auto w-7/8 md:w-4/5">
          <Link smooth className="flex gap-1 h-full" to="/" reloadDocument>
            <img className="w-9 my-auto" src={logo} alt="Logo" />
            <img className="w-30 my-auto" src={logoText} alt="Shop4Food" />
          </Link>

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
              <Link to="/explore" reloadDocument>
                <Button className="text-base" variant="navLink">Explore</Button>
              </Link>
            
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
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex flex-col gap-2 overflow-hidden pb-2 px-10 sm:hidden"
          >
            <Link to="/explore" reloadDocument>
              <Button className="text-base" variant="navLink">Explore</Button>
            </Link>
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