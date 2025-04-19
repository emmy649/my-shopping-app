import React, { useState, useEffect } from 'react';
import CalendarHeader from '../components/CalendarHeader';
import CalendarLegend from '../components/CalendarLegend';
import CalendarMonth from '../components/CalendarMonth';
import CalendarWeek from '../components/CalendarWeek';
import ModalAddEvent from '../components/ModalAddEvent';
import ModalViewDay from '../components/ModalViewDay';
import { Link } from 'react-router-dom';

export default function Schedule() {
  const today = new Date();

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const [weekStartDate, setWeekStartDate] = useState(() => {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    return d;
  });

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('schedule-events');
    return saved ? JSON.parse(saved) : [];
  });

  const [view, setView] = useState('month');
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('schedule-events', JSON.stringify(events));
  }, [events]);

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const goToPreviousWeek = () => {
    const prev = new Date(weekStartDate);
    prev.setDate(prev.getDate() - 7);
    setWeekStartDate(prev);
  };

  const goToNextWeek = () => {
    const next = new Date(weekStartDate);
    next.setDate(next.getDate() + 7);
    setWeekStartDate(next);
  };

  return (
    <div className="relative min-h-screen p-4 max-w-5xl mx-auto">
      <Link
        to="/"
        className="fixed top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-gray-500 hover:text-gray-700 transition z-50"
        title="Обратно към началото"
      >
        ←
      </Link>

      <h2 className="text-xl font italic text-center mb-4">График</h2>

      <CalendarLegend />
         <CalendarHeader
           view={view}
           setView={setView}
            onToday={() => {
            const now = new Date();
            now.setHours(12, 0, 0, 0);
            setSelectedDate(now.toISOString().split('T')[0]);
            setCurrentYear(now.getFullYear());
            setCurrentMonth(now.getMonth());
            setWeekStartDate(now);
             }}
            />

      {view === 'week' ? (
        <CalendarWeek
          events={events}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          openViewModal={() => setShowViewModal(true)}
          weekStartDate={weekStartDate}
          goToPreviousWeek={goToPreviousWeek}
          goToNextWeek={goToNextWeek}
        />
      ) : (
        <CalendarMonth
          events={events}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          openViewModal={() => setShowViewModal(true)}
          currentMonth={currentMonth}
          currentYear={currentYear}
          goToPreviousMonth={goToPreviousMonth}
          goToNextMonth={goToNextMonth}
        />
      )}

      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-purple-300 text-white shadow-lg hover:bg-purple-400 transition flex items-center justify-center text-3xl"
      >
        +
      </button>

      {showAddModal && (
        <ModalAddEvent
          date={selectedDate}
          onClose={() => setShowAddModal(false)}
          onSave={(newEvent) => {
            setEvents([...events, newEvent]);
            setShowAddModal(false);
          }}
        />
      )}

      {showViewModal && (
        <ModalViewDay
          date={selectedDate}
          events={events}
          onClose={() => setShowViewModal(false)}
          onDelete={(id) => {
            setEvents(events.filter((e) => e.id !== id));
          }}
        />
      )}
    </div>
  );
}
