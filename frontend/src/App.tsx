import NavBar from "./components/navbar/navbar";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/home";
import NotFoundPage from "./pages/NotFoundPage";


export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-amber-300 border-5 border-amber-950">
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/*' element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
