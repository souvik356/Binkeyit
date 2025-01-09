import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <>
    <Header />
    <div className="min-h-[82vh]">
       <Outlet/>
    </div>
     <Footer/>
     <Toaster />
    </>
  )
}