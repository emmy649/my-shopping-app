import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Purchases from './pages/Purchases';
import Monthly from './pages/Monthly';
import Notes from './pages/Notes';
import Tasks from './pages/Tasks';
import Schedule from './pages/Schedule';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-green-50 to-white text-gray-700 p-4 font-sans">
        <div className="max-w-sm mx-auto">
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex flex-col items-center justify-center min-h-screen gap-16">
                  <h1 className="text-2xl font-[cursive] text-center">Здравей, Еми !</h1>

                  <div className="flex flex-wrap justify-center gap-6 mt-8">
                    {/* Задачи */}
                    <div className="flex flex-col items-center gap-2 text-center w-24">
                      <Link
                        to="/tasks"
                        className="w-24 h-24 rounded-xl bg-white shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center"
                      >
                        <img
                          src="/icons/tasks.svg"
                          alt="Задачи"
                          className="w-full h-full p-4 object-contain"
                        />
                      </Link>
                      <span className="text-xs text-gray-500">Задачи</span>
                    </div>

                    {/* График */}
                    <div className="flex flex-col items-center gap-2 text-center w-24">
                      <Link
                        to="/schedule"
                        className="w-24 h-24 rounded-xl bg-white shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center"
                      >
                        <img
                          src="/icons/schedule.svg"
                          alt="График"
                          className="w-full h-full p-4 object-contain"
                        />
                      </Link>
                      <span className="text-xs text-gray-500">График</span>
                    </div>

                    {/* Покупки */}
                    <div className="flex flex-col items-center gap-2 text-center w-24">
                      <Link
                        to="/purchases"
                        className="w-24 h-24 rounded-xl bg-white shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center"
                      >
                        <img
                          src="/icons/shopping-bag.svg"
                          alt="Покупки"
                          className="w-full h-full p-4 object-contain"
                        />
                      </Link>
                      <span className="text-xs text-gray-500">Покупки</span>
                    </div>

                    {/* Месечни */}
                    <div className="flex flex-col items-center gap-2 text-center w-24">
                      <Link
                        to="/monthly"
                        className="w-24 h-24 rounded-xl bg-white shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center"
                      >
                        <img
                          src="/icons/calendar.svg"
                          alt="Месечни"
                          className="w-full h-full p-4 object-contain"
                        />
                      </Link>
                      <span className="text-xs text-gray-500 leading-tight">Месечни покупки</span>
                    </div>

                    {/* Бележки */}
                    <div className="flex flex-col items-center gap-2 text-center w-24">
                      <Link
                        to="/notes"
                        className="w-24 h-24 rounded-xl bg-white shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center"
                      >
                        <img
                          src="/icons/note.svg"
                          alt="Бележки"
                          className="w-full h-full p-4 object-contain"
                        />
                      </Link>
                      <span className="text-xs text-gray-500">Бележки</span>
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/monthly" element={<Monthly />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/schedule" element={<Schedule />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
