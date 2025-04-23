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
    <div className="relative min-h-screen p-4 pb-24 max-w-md mx-auto">

      {/* Бутон назад */}
      <Link
        to="/"
        className="fixed top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-gray-500 hover:text-gray-700 transition z-50"
        title="Обратно към началото"
      >
        ←
      </Link>

      <h2 className="text-xl font italic text-center mb-10">Какво искаш да си купиш ?</h2>

      {/* Акордеон по категории */}
      {Object.keys(categories).map((catKey) => {
        const isOpen = openSections.includes(catKey);
        const categoryItems = items.filter(item => item.category === catKey);

        return (
          <div key={catKey} className="mb-4">
            <button
              onClick={() => toggleSection(catKey)}
              className="w-full text-left font-medium text-sm text-gray-600 bg-gray-100 rounded-md px-3 py-2 shadow-sm hover:bg-gray-200 transition"
            >
              {categories[catKey]}
              <span className="float-right">{isOpen ? '▲' : '▼'}</span>
            </button>

            {isOpen && (
              <ul className="mt-2 flex flex-col gap-2">
                {categoryItems.length === 0 && (
                  <li className="text-xs text-gray-400 italic px-3">Няма добавени покупки.</li>
                )}
                {categoryItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between bg-white rounded-lg px-3 py-2 shadow-sm"
                  >
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
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-red-400 hover:text-red-600 text-sm"
                    >
                      Х
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}

      {/* Плаващ бутон */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-rose-300 text-white shadow-lg hover:bg-rose-400 transition flex items-center justify-center text-3xl"
      >
        +
      </button>

      {/* Модален прозорец */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80">
            <h3 className="text-lg font-semibold mb-4 text-center">Нова месечна покупка</h3>

            <input
              type="text"
              placeholder="Име на покупка"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm mb-4"
            />

            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm mb-4"
            >
              {Object.keys(categories).map((key) => (
                <option key={key} value={key}>
                  {categories[key]}
                </option>
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
                className="text-sm px-4 py-2 rounded-lg bg-rose-300 text-white hover:bg-rose-400"
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
