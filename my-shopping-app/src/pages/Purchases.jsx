import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const formatDate = (date) => {
  const daysBg = ['Неделя', 'Понеделник', 'Вторник', 'Сряда', 'Четвъртък', 'Петък', 'Събота'];
  const day = daysBg[date.getDay()];
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${day}, ${d}.${m}.${y} г.`;
};

const bgColors = [
  'bg-rose-100', 'bg-pink-100', 'bg-purple-100', 'bg-indigo-100',
  'bg-blue-100', 'bg-teal-100', 'bg-green-100', 'bg-lime-100', 'bg-yellow-100'
];

export default function Purchases() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('purchases');
    return saved ? JSON.parse(saved) : [];
  });

  const [newItem, setNewItem] = useState('');
  const [showModal, setShowModal] = useState(false);

  const today = new Date();
  const formattedDate = formatDate(today);

  const handleAdd = () => {
    if (!newItem.trim()) return;
    const randomColor = bgColors[Math.floor(Math.random() * bgColors.length)];
    const item = {
      id: Date.now(),
      text: newItem.trim(),
      done: false,
      color: randomColor
    };
    setItems([item, ...items]);
    setNewItem('');
    setShowModal(false);
  };

  const toggleDone = (id) => {
    setItems(items.map(i => i.id === id ? { ...i, done: !i.done } : i));
  };

  const deleteItem = (id) => {
    setItems(items.filter(i => i.id !== id));
  };

  useEffect(() => {
    localStorage.setItem('purchases', JSON.stringify(items));
  }, [items]);

  return (
    <div className="relative min-h-[100dvh] p-4 pb-24 max-w-md mx-auto">
      <Link
        to="/"
        className="fixed top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-gray-500 hover:text-gray-700 transition z-50"
        title="Обратно към началната страница"
      >
        ←
      </Link>

      <h2 className="text-xl font italic text-center mb-6">Какво да купя...</h2>

      <div className="rounded-xl p-2">
        <p className="text-sm text-gray-500 mb-4">{formattedDate}</p>
        <ul className="flex flex-col gap-2">
          {items.map(item => (
            <li
              key={item.id}
              className={`flex justify-between items-center px-3 py-2 rounded-lg ${item.color}`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => toggleDone(item.id)}
                />
                <span className={`text-sm ${item.done ? 'line-through text-green-600' : 'text-gray-800'}`}>
                  {item.text}
                </span>
              </div>
              <button
                onClick={() => deleteItem(item.id)}
                className="text-xs text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 bg-purple-500 text-white rounded-full w-12 h-12 text-xl shadow-lg hover:bg-purple-600 z-50"
        title="Добави покупка"
      >
        ＋
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-md animate-in fade-in scale-95 duration-200">
            <h3 className="text-center text-lg font-semibold mb-4">Нова покупка</h3>
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Добави нещо..."
              className="w-full border rounded-lg px-3 py-2 text-sm mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setNewItem('');
                }}
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
      )}
    </div>
  );
}