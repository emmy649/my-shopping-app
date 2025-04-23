import React, { useState } from 'react';

export default function ModalAddEvent({ onClose, onAdd, date }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Общи');
  const [startDate, setStartDate] = useState(date || '');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState(date || '');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const normalizeCategory = (cat) => {
    switch (cat) {
      case 'Работа': return 'work';
      case 'Лични': return 'personal';
      case 'Домашни': return 'home';
      case 'Специални': return 'special';
      default: return 'default';
    }
  };

  const handleAdd = () => {
    if (!title.trim() || !startDate) return;

    const normalizedCategory = normalizeCategory(category);

    onAdd({
      title,
      category: normalizedCategory,
      startDate,
      startTime,
      endDate,
      endTime,
      location,
      description,
    });

    setTitle('');
    setCategory('Общи');
    setStartDate('');
    setStartTime('');
    setEndDate('');
    setEndTime('');
    setLocation('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-md animate-in fade-in scale-95 duration-200">
        <h3 className="text-center text-lg font-semibold mb-4">
          Нова среща
        </h3>

        <input
          type="text"
          placeholder="Заглавие"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm mb-2"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm mb-4"
        >
          <option>Общи</option>
          <option>Работа</option>
          <option>Лични</option>
          <option>Домашни</option>
          <option>Специални</option>
        </select>

        <div className="mb-3">
          <label className="text-sm block">От дата</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm mb-2"
          />
          <label className="text-sm block">Час от</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div className="mb-3">
          <label className="text-sm block">До дата</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm mb-2"
          />
          <label className="text-sm block">Час до</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <input
          type="text"
          placeholder="Място (по избор)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm mb-2"
        />

        <textarea
          placeholder="Описание (по избор)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm mb-4"
        ></textarea>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="text-sm px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Отказ
          </button>
          <button
            onClick={handleAdd}
            className="text-sm px-4 py-2 rounded-lg bg-purple-400 text-white hover:bg-purple-500"
          >
            Запази
          </button>
        </div>
      </div>
    </div>
  );
}
