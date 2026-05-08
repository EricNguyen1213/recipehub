import NavBar from "./components/navbar/navbar";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import Footer from "./components/footer/footer";
import Profile from "./components/Profile";
import Explore from "./components/Explore";
import { useEffect, useState } from "react";


function useMediaQuery(query: string) {
    const [value, setValue] = useState(() => {
        if (typeof window !== "undefined") {
        return window.matchMedia(query).matches;
        }
        return false;
    });

    useEffect(() => {
        const mql = window.matchMedia(query);
        const onChange = () => setValue(mql.matches);
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, [query]);

    return value;
}




export default function App() {

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const isSmSize = useMediaQuery("(min-width: 640px)");

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col justify-between">
        <NavBar 
          isSideMenuOpen={isSideMenuOpen}
          setIsSideMenuOpen={setIsSideMenuOpen}
        />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route 
            path='/explore' 
            element={
              <Explore 
                isSmSize={isSmSize}
                isSideMenuOpen={isSideMenuOpen}
                setIsSideMenuOpen={setIsSideMenuOpen}
              />
            } 
          />
          <Route path='/*' element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
