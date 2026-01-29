import React, { useContext } from "react";
import Login from "./pages/Login.jsx"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AdminContext} from './context/AdminContext.jsx';
import {DoctorContext} from './context/DoctorContext.jsx';
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import {Route,Routes} from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard.jsx'
import AllAppointements from "./pages/Admin/AllAppointements.jsx"
import AddDoctors from './pages/Admin/AddDoctors.jsx'
import DoctorsList from "./pages/Admin/DoctorsList.jsx";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard.jsx";
import DoctorAppointments from "./pages/Doctor/DoctorAppointment.jsx";
import DoctorProfile from "./pages/Doctor/DoctorProfile.jsx";

const App = ()=>{

  const {aToken} = useContext(AdminContext)
  const{dToken} = useContext(DoctorContext);
  //console.log(aToken);
  

  return aToken || dToken ? (
    <div className="bg-white dark:bg-slate-900 text-black dark:text-white min-h-screen">

      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/*Admin Route */}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointements' element={<AllAppointements />} />
          <Route path='/add-doctor' element={<AddDoctors />} />
          <Route path='/doctor-list' element={<DoctorsList />} />

          {/*Doctor Route */}
          <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
          <Route path='/doctor-appointments' element={<DoctorAppointments />} />
          <Route path='/doctor-profile' element={<DoctorProfile />} />


          
        </Routes>
      </div>
    </div>
  ) :(
    <>
      <Login />
      <ToastContainer />
    </>  
  )
}

export default App;