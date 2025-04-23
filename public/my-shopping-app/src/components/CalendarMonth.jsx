import React from 'react';

const getBgColor = (category = '') => {
  switch (category.toLowerCase()) {
    case 'work':
    case 'работа':
      return 'bg-blue-100';
    case 'personal':
    case 'лични':
      return 'bg-pink-100';
    case 'home':
    case 'домашни':
      return 'bg-green-100';
    case 'special':
    case 'специални':
      return 'bg-purple-100';
    default:
      return 'bg-gray-200';
  }
};

export default function CalendarMonth({
  events,
  selectedDate,
  setSelectedDate,
  openViewModal,
  currentMonth,
  currentYear,
  goToPreviousMonth,
  goToNextMonth,
}) {
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
  const totalCells = Math.ceil((adjustedFirstDay + daysInMonth) / 7) * 7;

  const weeks = [];
  let day = 1 - adjustedFirstDay;

  for (let i = 0; i < totalCells / 7; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      const d = new Date(currentYear, currentMonth, day);
      d.setHours(12, 0, 0, 0);
      const dateStr = d.toISOString().split('T')[0];
      const eventsForDay = events.filter((e) => {
        const start = e.startDate ? new Date(e.startDate).toISOString().split('T')[0] : '';
        const end = e.endDate ? new Date(e.endDate).toISOString().split('T')[0] : start;
        return dateStr >= start && dateStr <= end;
      });
      week.push({ day: d.getDate(), month: d.getMonth(), year: d.getFullYear(), dateStr, events: eventsForDay });
      day++;
    }
    weeks.push(week);
  }

  const isToday = (d, m, y) => {
    const today = new Date();
    return d === today.getDate() && m === today.getMonth() && y === today.getFullYear();
  };

  return (
    <div className="w-full mt-2 p-1 border border-gray-100 rounded-xl shadow-inner bg-white">
      {/* Навигация */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={goToPreviousMonth}
          className="text-lg px-3 py-1 rounded-full hover:bg-gray-100"
        >
          ←
        </button>
        <span className="text-base font-semibold text-center">
          {new Date(currentYear, currentMonth).toLocaleDateString('bg-BG', {
            month: 'long',
            year: 'numeric',
          })}
        </span>
        <button
          onClick={goToNextMonth}
          className="text-lg px-3 py-1 rounded-full hover:bg-gray-100"
        >
          →
        </button>
      </div>

      {/* Заглавия на дните */}
      <div className="grid grid-cols-7 text-center text-xs text-gray-500 mb-2">
        {['Пон', 'Вт', 'Ср', 'Чет', 'Пет', 'Съб', 'Нед'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Клетки */}
      <div className="grid grid-cols-7 gap-1 p-1 bg-white rounded-xl">
        {weeks.flat().map((cell, index) => {
          const isCurrent = cell.month === currentMonth && cell.year === currentYear;
          return (
            <div
              key={index}
              onClick={() => {
                if (isCurrent) {
                  setSelectedDate(cell.dateStr);
                  openViewModal();
                }
              }}
              className={`min-h-[80px] sm:min-h-[90px] p-1 flex flex-col text-[12px] sm:text-sm border border-gray-50 relative transition-all cursor-pointer rounded-md
                ${isCurrent ? 'bg-white hover:bg-yellow-50' : 'bg-white text-transparent pointer-events-none'}
                ${cell.dateStr === selectedDate && isCurrent ? 'bg-yellow-' : ''}
                ${isToday(cell.day, cell.month, cell.year) ? 'ring-2 ring-yellow-100' : ''}`}
            >
              <div className={`text-right text-[11px] sm:text-xs font-semibold ${isCurrent ? 'text-gray-700' : 'text-transparent'}`}>
                {cell.day}
              </div>
              <div className="flex flex-col gap-0.5 mt-1">
                {cell.events.map((ev, i) => (
                  <div
                    key={i}
                    className={`truncate text-[11px] px-1 rounded ${getBgColor(ev.category)}`}
                    title={ev.title}
                  >
                    {ev.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}