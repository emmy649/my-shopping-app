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
    const item = {
      id: Date.now(),
      text: newItem.trim(),
      done: false,
    };
    setItems([item, ...items]);
    setNewItem('');
    setShowModal(false);
  };

  const toggleDone = (id) => {
    setItems(items.map(i => i.id === id ? { ...i, done: !i.done } : i));
  };
 

    useEffect(() => {
      localStorage.setItem('purchases', JSON.stringify(items));
}    , [items]);


  const deleteItem = (id) => {
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <div className="relative min-h-screen p-4 pb-24 max-w-md mx-auto">

      <Link
        to="/"
        className="fixed top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-gray-500 hover:text-gray-700 transition z-50"

        title="Обратно към началната страница"
      >
          ←
        </Link>

      <h2 className="text-xl font italic text-center mb-4"> Какво да купя...</h2>

      <div className="bg-white rounded-xl shadow-md p-4">
        <p className="text-sm text-gray-500 mb-2">{formattedDate}</p>
        <ul className="flex flex-col gap-2">
          {items.map(item => (
            <li key={item.id} className="flex justify-between items-center px-3 py-2 bg-gray-50 rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => toggleDone(item.id)}
                />
                <span className={`text-sm ${item.done ? 'line-through text-gray-400' : ''}`}>
                  {item.text}
                </span>
              </div>
              <button onClick={() => deleteItem(item.id)} className="text-red-400 hover:text-red-600 text-sm">Х</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Плаващ бутон */}
      <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-green-200 text-white shadow-lg hover:bg-green-300 transition flex items-center justify-center text-3xl"
      >
             +
       </button>

      {/* Модален прозорец */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80">
            <h3 className="text-lg font-semibold mb-4 text-center">Нова покупка</h3>
            <input
              type="text"
              placeholder="Въведи покупка"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="text-sm px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                Отказ
              </button>
              <button
                onClick={handleAdd}
                className="text-sm px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
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
