
// ! YARIN EKLENECEK
// !             {latestTask && <h1>Yeni Görev: {latestTask}</h1>}
// SON OLAN




import React, { useState, useEffect } from "react";
import { FaBell, FaUserCircle, FaPlus, FaSearch, FaRegTrashAlt } from "react-icons/fa";
import { IoToday } from "react-icons/io5";
import { GrStatusGoodSmall } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { LiaTabletSolid } from "react-icons/lia";
import { SlSizeFullscreen } from "react-icons/sl";
import { SlSizeActual } from "react-icons/sl";
import { BsBack } from "react-icons/bs";
import { GoPeople } from "react-icons/go";


const App = () => {
  const [time, setTime] = useState(new Date().toLocaleDateString());
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState("addTask");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [latestTask, setLatestTask] = useState(null);
  // ! Change for You (Custom)
  const P_URL = "https://toprak.nivesoft.com/img/tpasha.jpg";
  const N_NAME = "TPasha";

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (savedTasks.length > 0) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleString()); // Tarih ve saat birlikte güncelleniyor
    }, 1000);
  
    return () => clearInterval(interval); // Temizlik
  }, []);
  
  const addTask = () => {
    if (task.trim()) {
      const newTask = { text: task, completed: false, createdAt: new Date() };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setTask("");
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); 
      setLatestTask(newTask.text); 
      toast.success("Görev Eklendi!");
    }
  };
  

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); 
  };

  const filteredTasks = tasks.filter((t) =>
    t.text.toLowerCase().includes(search.toLowerCase())
  );
  const todayTasks = tasks.filter((t) => {
    const now = new Date();
    const taskTime = new Date(t.createdAt);
    return (now - taskTime) / (1000 * 60 * 60) <= 24;
  });
  
    // Local Storage Entegration
    const allDelete = () => {
      localStorage.removeItem("tasks"); // Sadece "tasks" anahtarını sil
      setTasks([]); // State'i sıfırla
      toast.success("Başarıyla Silindi!");
    };
    

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div
        className={`w-full bg-white shadow-md p-7 flex items-center justify-between ${isMobileMenuOpen ? "h-auto" : "h-0 overflow-hidden"}`}
      >
        <div className="flex items-center mt-1">
        <img className="w-10 h-10 rounded-full" src={P_URL} alt="User-Name" />
        {/* <FaUserCircle size={36} className="text-gray-700" /> */}
        {/* <span style={{ fontFamily: 'Rubik, serif' }}className="ml-3 font-bold text-lg">{N_NAME} <GoPeople/></span> */}
          <span style={{ fontFamily: 'Rubik, serif' }}className="ml-3 font-bold text-lg flex items-center space-x-2">{N_NAME}&nbsp; <GoPeople/></span>
        </div>
        <div className="flex items-center gap-3">
        <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 p-2 md:hidden text-xl"
            // style={{ fontSize: '25px' }}
          >
            {isMobileMenuOpen ? <SlSizeActual /> : <SlSizeFullscreen /> }
          </button>
          {/* hmm */}
          <FaBell size={24} className="text-gray-700 cursor-pointer" />
        </div>
      </div>
      <div className="flex-1 flex mt-3"
      style={{ fontFamily: 'Roboto Slab, serif'}}>
        <div
          className={`col-span-3 bg-white shadow-md rounded-lg p-5 transition-all duration-300 ${isMobileMenuOpen ? "w-1/4" : "w-0 overflow-hidden"} md:w-1/4`}
        >
          <p className="text-lg font-semibold text-blue-600">{time}</p>
          <h2 className="font-bold text-xl mb-4 ml-5">&nbsp; Sıralama</h2>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setActiveSection("addTask")}
              className={`flex items-center gap-2 px-4 py-2 text-left ${activeSection === "addTask" ? "text-blue-600" : "text-gray-700"} hover:text-blue-600`}
            >
              <FaPlus /> Görev Ekle
            </button>
            <button
              onClick={() => setActiveSection("search")}
              className={`flex items-center gap-2 px-4 py-2 text-left ${activeSection === "search" ? "text-blue-600" : "text-gray-700"} hover:text-blue-600`}
            >
              <FaSearch /> Ara
            </button>
            <button
              onClick={() => setActiveSection("today")}
              className={`px-4 py-2 text-left ${activeSection === "today" ? "text-blue-600" : "text-gray-700"} hover:text-blue-600 flex items-center gap-2`}
            >
              <IoToday /> Bugün
            </button>
            <button
              onClick={() => setActiveSection("allTasks")}
              className={`px-4 py-2 text-left ${activeSection === "allTasks" ? "text-blue-600" : "text-gray-700"} hover:text-blue-600 flex items-center gap-2`}
            >
              <GrStatusGoodSmall /> Hepsi
            </button>
            <div className="border-t-2 border-gray-300 my-4"></div>
            <button 
             onClick={allDelete}
             className="px-4 py-2text-gray-700 hover:text-blue-600 flex items-center gap-2"
             > <FaRegTrashAlt/> Clear</button>
          </div>
        </div>
        <div className="col-span-9 bg-white shadow-md rounded-lg p-5 flex flex-col w-full">
          {activeSection === "addTask" && (
          <div className="flex flex-col gap-3 mb-5">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Görev ekle..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
                style={{ fontFamily: 'DM Mono, monospace' }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring focus:ring-blue-500"
              />
              <button
                onClick={addTask}
                style={{ fontFamily: 'Rubik, serif' }}
                className="px-5 py-2 bg-green-500 text-white rounded-xl shadow hover:bg-red-600"
              >
                Ekle
              </button>
            </div>
            <div className="">{latestTask && <h1>Son Eklenen: {latestTask}</h1>}</div>
          </div>
        )}
          {activeSection === "search" && (
            <div>
              <input
                type="text"
                placeholder="Ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring focus:ring-blue-500 mb-5"
              />
              <div className="space-y-3">
                {filteredTasks.map((t, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-md shadow cursor-pointer ${t.completed ? "bg-gray-200" : "bg-blue-100"}`}
                  >
                    <span className={`flex-1 ${t.completed ? "line-through text-gray-500" : ""}`}>
                      {t.text}
                    </span>
                    <button
                      onClick={() => toggleComplete(index)}
                      className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-md shadow hover:bg-yellow-600"
                    >
                      {t.completed ? "Yeniden Yap" : "Tamamla"}
                    </button>
                  </div>
                ))}
                {filteredTasks.length === 0 && (
                  <p className="text-center text-gray-500">Görev bulunamadı...</p>
                )}
              </div>
            </div>
          )}
          {activeSection === "today" && (
            <div className="flex-1 overflow-y-auto">
              <h2 className="font-bold text-lg mb-4">Bugün</h2>
              {todayTasks.map((t, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-md shadow cursor-pointer ${t.completed ? "bg-gray-200" : "bg-blue-100"}`}
                >
                  <span className={`flex-1 ${t.completed ? "line-through text-gray-500" : ""}`}>
                    {t.text}
                  </span>
                  <button
                    onClick={() => toggleComplete(index)}
                    className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-md shadow hover:bg-yellow-600"
                  >
                    {t.completed ? "Yeniden Yap" : "Tamamla"}
                  </button>
                </div>
              ))}
              {todayTasks.length === 0 && <p className="text-center text-gray-500">Bugün için görev bulunamadı...</p>}
            </div>
          )}
          {activeSection === "allTasks" && (
            <div className="flex-1 overflow-y-auto">
              <h2 className="font-bold text-lg mb-4">Hepsi</h2>
              {tasks.map((t, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-md shadow cursor-pointer ${t.completed ? "bg-gray-200" : "bg-blue-100"}`}
                >
                  <span className={`flex-1 ${t.completed ? "line-through text-gray-500" : ""}`}>
                    {t.text}
                  </span>
                  <button
                    onClick={() => toggleComplete(index)}
                    className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-md shadow hover:bg-yellow-600"
                  >
                    {t.completed ? "Yeniden Yap" : "Tamamla"}
                  </button>
                </div>
              ))}
              {tasks.length === 0 && <p className="text-center text-gray-500">Hiç görev bulunamadı...</p>}
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;