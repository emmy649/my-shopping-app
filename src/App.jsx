import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Purchases from './pages/Purchases';
import Monthly from './pages/Monthly';
import Notes from './pages/Notes';
import Tasks from './pages/Tasks';
import Schedule from './pages/Schedule';

function App() {
  const [greeting, setGreeting] = useState('');
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 5) setGreeting('Спокойна нощ, Еми 🌙');
    else if (hour < 12) setGreeting('Добро утро, Еми ☀️');
    else if (hour < 18) setGreeting('Прекрасен ден, Еми 🌼');
    else setGreeting('Хубава вечер, Еми ❣️');

    const timeout = setTimeout(() => setShowGreeting(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Router>
      <div className="min-h-[100dvh] bg-gradient-to-br from-green-100 via-rose-50 to-white text-gray-700 p-4 font-sans">
        <div className="max-w-md mx-auto px-2">
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex flex-col items-center justify-start min-h-[100dvh] gap-20 pt-20">
                  <h1 className="text-3xl font-[cursive] text-center">
                    Здравей,
                  </h1>
                  <p
                    className={`text-cm text-gray-500 italic mt-2 transition-opacity duration-[2000ms] ease-in-out ${
                      showGreeting ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {greeting}
                  </p>

                  <div className="flex flex-wrap justify-center gap-6 mt-4">
                    <NavItem
                      to="/tasks"
                      iconPath={`${import.meta.env.BASE_URL}icons/tasks.svg`}
                      label="Задачи"
                    />
                    <NavItem
                      to="/schedule"
                      iconPath={`${import.meta.env.BASE_URL}icons/schedule.svg`}
                      label="График"
                    />
                    <NavItem
                      to="/notes"
                      iconPath={`${import.meta.env.BASE_URL}icons/note.svg`}
                      label="Бележки"
                    />
                    <NavItem
                      to="/purchases"
                      iconPath={`${import.meta.env.BASE_URL}icons/shopping-bag.svg`}
                      label="Покупки"
                    />
                    <NavItem
                      to="/monthly"
                      iconPath={`${import.meta.env.BASE_URL}icons/calendar.svg`}
                      label="Месечни покупки"
                    />
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

function NavItem({ to, iconPath, label }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center w-24">
      <Link
        to={to}
        className="w-24 h-20 rounded-xl bg-white shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center"
      >
        <img
          src={iconPath}
          alt={label}
          className="w-full h-full p-4 object-contain"
        />
      </Link>
      <span className="text-xs text-gray-500 leading-tight">{label}</span>
    </div>
  );
}

export default App;