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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <h3 className="text-lg font-bold mb-4 text-center">Нова среща</h3>
        <input
          type="text"
          placeholder="Заглавие"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-2"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-2"
        >
          <option>Общи</option>
          <option>Работа</option>
          <option>Лични</option>
          <option>Домашни</option>
          <option>Специални</option>
        </select>

        <div className="flex gap-2 mb-2">
          <div className="flex-1">
            <label className="text-sm">От дата</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div className="flex-1">
            <label className="text-sm">Час</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
        </div>

        <div className="flex gap-2 mb-2">
          <div className="flex-1">
            <label className="text-sm">До дата</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div className="flex-1">
            <label className="text-sm">Час</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
        </div>

        <input
          type="text"
          placeholder="Място (по избор)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-2"
        />

        <textarea
          placeholder="Описание (по избор)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
        ></textarea>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Отказ
          </button>
          <button
            onClick={handleAdd}
            className="bg-purple-400 text-white px-4 py-2 rounded hover:bg-purple-500"
          >
            Запази
          </button>
        </div>
      </div>
    </div>
  );
}
