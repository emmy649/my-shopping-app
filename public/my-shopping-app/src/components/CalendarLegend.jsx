import React from 'react';

const legendItems = [
  { label: 'Работа', color: 'bg-blue-200' },
  { label: 'Лични', color: 'bg-pink-200' },
  { label: 'Домашни', color: 'bg-green-200' },
  { label: 'Специални', color: 'bg-purple-200' },
  { label: 'Общи', color: 'bg-gray-200' },
];

export default function CalendarLegend() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-gray-600 mb-4">
      {legendItems.map((item) => (
        <div key={item.label} className="flex items-center gap-1">
          <span className={`w-3 h-3 rounded-sm ${item.color}`}></span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
