import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets.js";
import { AppContext } from "../../context/AppContext.jsx";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);
    
  const { slotDateFormat } = useContext(AppContext);
  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);
  return (
    dashData && (
      
        <div className="m-5">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-4 min-w-52 rounded border border-gray-100 dark:border-gray-700 cursor-pointer hover:scale-105 transition-all">
              <img className="w-14" src={assets.doctor_icon} alt="" />
              <div>
                <p className="text-xl font-semibold text-gray-600 dark:text-white">
                  {dashData?.doctors}
                </p>
                <p className="text-gray-400 dark:text-gray-500">Doctors</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-4 min-w-52 rounded border border-gray-100 dark:border-gray-700 cursor-pointer hover:scale-105 transition-all">
              <img className="w-14" src={assets.appointments_icon} alt="" />
              <div>
                <p className="text-xl font-semibold text-gray-600 dark:text-white">
                  {dashData?.appointments}
                </p>
                <p className="text-gray-400 dark:text-gray-500">Appointment</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-4 min-w-52 rounded border border-gray-100 dark:border-gray-700 cursor-pointer hover:scale-105 transition-all">
              <img className="w-14" src={assets.patients_icon} alt="" />
              <div>
                <p className="text-xl font-semibold text-gray-600 dark:text-white">
                  {dashData?.users}
                </p>
                <p className="text-gray-400 dark:text-gray-500">Patients</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800">
            <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-gray-200 dark:border-gray-700">
              <img src={assets.list_icon} alt="" />
              <p className="font-semibold text-gray-800 dark:text-white">Latest Bookings</p>
            </div>

            <div className="pt-4 border border-t-0 border-gray-200 dark:border-gray-700">
              {dashData?.latestAppointments?.map((item, index) => (
                <div
                  className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100 dark:hover:bg-slate-700 transition"
                  key={index}
                >
                  <img
                    className="rounded-full w-10"
                    src={item?.docData?.image}
                    alt=""
                  />
                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 dark:text-white font-medium">
                      {item?.docData?.name}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {slotDateFormat(item?.slotDate)}
                    </p>
                  </div>
                  {item.cancelled ? (
                    <p className="text-red-400 text-xs font-medium">
                      Cancelled
                    </p>
                  ) : item.isCompleted ? (
                    <p className="text-green-500 text-xs font-medium">
                      Completed
                    </p>
                  ) : (
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-10 cursor-pointer hover:opacity-70"
                      src={assets.cancel_icon}
                      alt=""
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      
    )
  );
};

export default Dashboard;