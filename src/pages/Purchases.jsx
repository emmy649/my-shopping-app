import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const categories = {
  kitchen: '🍽️ Кухня',
  cosmetics: '💄 Козметика',
  bathroom: '🚿 Баня и хигиена',
  furniture: '🛋️ Мебели и дом',
  repairs: '🛠️ Ремонти',
  clothes: '👗 Дрехи и аксесоари',
  pet: '🐶 Домашен любимец',
  other: '➕ Други',
};

export default function Monthly() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('monthlyItems');
    return saved ? JSON.parse(saved) : [];
  });

  const [openSections, setOpenSections] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newText, setNewText] = useState('');
  const [newCategory, setNewCategory] = useState('kitchen');

  useEffect(() => {
    localStorage.setItem('monthlyItems', JSON.stringify(items));
  }, [items]);

  const handleAdd = () => {
    if (!newText.trim()) return;

    const item = {
      id: Date.now(),
      text: newText.trim(),
      category: newCategory,
      done: false,
    };

    setItems([item, ...items]);
    setNewText('');
    setNewCategory('kitchen');
    setShowModal(false);
  };

  const toggleDone = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleSection = (key) => {
    setOpenSections((prev) =>
      prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key]
    );
  };

  return (
    <div className="relative min-h-[100dvh] p-4 pb-24 max-w-md mx-auto">
      <Link
        to="/"
        className="fixed top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-gray-500 hover:text-gray-700 transition z-50"
        title="Обратно към началото"
      >
        ←
      </Link>

      <h2 className="text-xl font italic text-center mb-10">Какво искаш да си купиш?</h2>

      <div className="flex flex-col gap-4">
        {Object.entries(categories).map(([key, label]) => {
          const filtered = items.filter((i) => i.category === key);
          if (filtered.length === 0 && !openSections.includes(key)) return null;

          return (
            <div key={key} className="bg-white rounded-xl shadow p-3">
              <button
                onClick={() => toggleSection(key)}
                className="w-full text-left font-semibold text-gray-700 text-sm mb-2"
              >
                {label}
              </button>
              {openSections.includes(key) && (
                <ul className="flex flex-col gap-2">
                  {filtered.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center px-3 py-2 bg-gray-50 rounded-lg shadow-sm"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={item.done}
                          onChange={() => toggleDone(item.id)}
                        />
                        <span className={`text-sm ${item.done ? 'line-through text-green-500' : 'text-gray-800'}`}>
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
              )}
            </div>
          );
        })}
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
            <h3 className="text-center text-lg font-semibold mb-4">Нова месечна покупка</h3>
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="Въведи продукт..."
              className="w-full border rounded-lg px-3 py-2 text-sm mb-3"
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm mb-4"
            >
              {Object.entries(categories).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
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