import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { MenuItem, MENU_CATEGORIES } from '../../../types';
import {
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  Clock,
  Sparkles,
  Flame,
  Search,
  AlertTriangle,
} from 'lucide-react';

export const AdminMenu: React.FC = () => {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<MenuItem['category']>('Subha Ka Nasta');
  const [price, setPrice] = useState<number>(99);
  const [fullPrice, setFullPrice] = useState<string>('');
  const [imageUrl, setImageUrl] = useState('');
  const [isVeg, setIsVeg] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);
  const [isPopular, setIsPopular] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [prepTime, setPrepTime] = useState<number>(12);
  const [calories, setCalories] = useState<number>(350);
  const [nutritionalTagsInput, setNutritionalTagsInput] = useState<string>('High Protein');
  const [visibleLimit, setVisibleLimit] = useState<number>(36);

  const categories = ['All', ...MENU_CATEGORIES];

  const openCreateModal = () => {
    setEditingItem(null);
    setName('');
    setDescription('');
    setCategory('Subha Ka Nasta');
    setPrice(99);
    setFullPrice('');
    setImageUrl('https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80');
    setIsVeg(true);
    setIsAvailable(true);
    setIsPopular(false);
    setIsFeatured(false);
    setPrepTime(12);
    setCalories(350);
    setNutritionalTagsInput('High Protein, Balanced Meal');
    setIsEditingModalOpen(true);
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setName(item.name);
    setDescription(item.description);
    setCategory(item.category);
    setPrice(item.price);
    setFullPrice(item.fullPrice ? String(item.fullPrice) : '');
    setImageUrl(item.imageUrl);
    setIsVeg(item.isVeg);
    setIsAvailable(item.isAvailable);
    setIsPopular(item.isPopular || false);
    setIsFeatured(item.isFeatured || false);
    setPrepTime(item.preparationTimeMinutes);
    setCalories(item.calories || 300);
    setNutritionalTagsInput(item.nutritionalTags ? item.nutritionalTags.join(', ') : '');
    setIsEditingModalOpen(true);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const parsedTags = nutritionalTagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const parsedFullPrice = fullPrice.trim() ? Number(fullPrice) : undefined;

    if (editingItem) {
      updateMenuItem({
        ...editingItem,
        name: name.trim(),
        description: description.trim(),
        category,
        price: Number(price),
        fullPrice: parsedFullPrice && parsedFullPrice > 0 ? parsedFullPrice : undefined,
        imageUrl: imageUrl.trim(),
        isVeg,
        isAvailable,
        isPopular,
        isFeatured,
        preparationTimeMinutes: Number(prepTime),
        calories: Number(calories) || undefined,
        nutritionalTags: parsedTags,
      });
    } else {
      addMenuItem({
        id: `menu-${Date.now()}`,
        name: name.trim(),
        description: description.trim(),
        category,
        price: Number(price),
        fullPrice: parsedFullPrice && parsedFullPrice > 0 ? parsedFullPrice : undefined,
        imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80',
        isVeg,
        isAvailable,
        isPopular,
        isFeatured,
        preparationTimeMinutes: Number(prepTime),
        calories: Number(calories) || undefined,
        nutritionalTags: parsedTags,
      });
    }
    setIsEditingModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      deleteMenuItem(itemToDelete);
      setItemToDelete(null);
    }
  };

  const filteredItems = menuItems.filter((item) => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      return (
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Menu Item Management
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Add new student dishes, edit prices, toggle stock availability, and manage tags.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-1.5 bg-amber-800 hover:bg-amber-900 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Dish</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search dish by name or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-amber-900 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing <strong className="text-slate-800">{Math.min(visibleLimit, filteredItems.length)}</strong> of{' '}
          <strong className="text-slate-800">{filteredItems.length}</strong> dishes ({menuItems.length} total in menu)
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.slice(0, visibleLimit).map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-2xl border p-4 flex flex-col justify-between transition-all ${
              item.isAvailable ? 'border-slate-200' : 'border-rose-200 bg-rose-50/20 opacity-80'
            }`}
          >
            <div>
              <div className="flex items-start gap-3">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-100"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    {item.isVeg ? (
                      <span className="w-3 h-3 border border-emerald-600 flex items-center justify-center shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      </span>
                    ) : (
                      <span className="w-3 h-3 border border-rose-600 flex items-center justify-center shrink-0">
                        <span className="w-1.5 h-1.5 bg-rose-600"></span>
                      </span>
                    )}
                    <h3 className="font-bold text-slate-900 text-xs truncate">{item.name}</h3>
                  </div>

                  <p className="text-[10px] text-slate-500 font-semibold mt-0.5 flex items-center gap-1.5">
                    <span>{item.category} • ~{item.preparationTimeMinutes} mins</span>
                    {item.calories && (
                      <span className="text-amber-800 font-bold bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 text-[9px] flex items-center gap-0.5">
                        <Flame className="w-2.5 h-2.5 text-orange-500 fill-orange-500" />
                        {item.calories} kcal
                      </span>
                    )}
                  </p>

                  <p className="text-xs font-black text-amber-900 mt-1">
                    ₹{item.price}
                    {item.fullPrice ? (
                      <span className="font-semibold text-slate-500">
                        {' '}
                        / ₹{item.fullPrice} ({item.portionLabels ? `${item.portionLabels[0]}/${item.portionLabels[1]}` : 'Half/Full'})
                      </span>
                    ) : null}
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 mt-3 line-clamp-2">{item.description}</p>

              {/* Nutritional Tags */}
              {item.nutritionalTags && item.nutritionalTags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.nutritionalTags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[9px] px-1.5 py-0.2 rounded border font-semibold ${
                        tag === 'High Protein'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : tag === 'Low Carb'
                          ? 'bg-sky-50 text-sky-800 border-sky-300'
                          : 'bg-amber-50 text-amber-900 border-amber-200'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Status Tags */}
              <div className="flex flex-wrap gap-1 mt-2">
                {item.isPopular && (
                  <span className="text-[9px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded">
                    Popular
                  </span>
                )}
                {item.isFeatured && (
                  <span className="text-[9px] bg-blue-100 text-blue-900 font-bold px-1.5 py-0.5 rounded">
                    Featured
                  </span>
                )}
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    item.isAvailable
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {item.isAvailable ? 'In Stock' : 'Sold Out'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              {/* Availability Toggle */}
              <button
                type="button"
                onClick={() => updateMenuItem({ ...item, isAvailable: !item.isAvailable })}
                className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition ${
                  item.isAvailable
                    ? 'border-slate-200 text-slate-600 hover:bg-slate-100'
                    : 'border-emerald-300 bg-emerald-50 text-emerald-800'
                }`}
              >
                {item.isAvailable ? 'Mark Sold Out' : 'Mark Available'}
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(item)}
                  className="p-1.5 text-slate-600 hover:text-amber-800 hover:bg-slate-100 rounded-lg transition"
                  title="Edit dish"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setItemToDelete(item.id)}
                  className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition"
                  title="Delete dish"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length > visibleLimit && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setVisibleLimit((prev) => prev + 36)}
            className="px-4 py-2 bg-amber-900 hover:bg-amber-950 text-white text-xs font-bold rounded-xl transition"
          >
            Load 36 More
          </button>
          <button
            onClick={() => setVisibleLimit(filteredItems.length)}
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl transition"
          >
            Show All {filteredItems.length}
          </button>
        </div>
      )}

      {/* Edit / Create Item Modal */}
      {isEditingModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            onClick={() => setIsEditingModalOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl relative border border-slate-200 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900">
                  {editingItem ? `Edit Dish: ${editingItem.name}` : 'Add New Campus Dish'}
                </h3>
                <button
                  onClick={() => setIsEditingModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveItem} className="mt-4 space-y-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Dish Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Description *</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as MenuItem['category'])}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                    >
                      {MENU_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Price / Half (₹) *</label>
                    <input
                      type="number"
                      required
                      min={5}
                      max={2000}
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Full Price (Opt.)</label>
                    <input
                      type="number"
                      min={0}
                      max={3000}
                      value={fullPrice}
                      onChange={(e) => setFullPrice(e.target.value)}
                      placeholder="Optional"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Prep Time (Mins)</label>
                    <input
                      type="number"
                      min={2}
                      max={60}
                      value={prepTime}
                      onChange={(e) => setPrepTime(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Image URL</label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Calories (kcal)</label>
                    <input
                      type="number"
                      min={0}
                      max={2000}
                      value={calories}
                      onChange={(e) => setCalories(Number(e.target.value))}
                      placeholder="e.g. 340"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Nutritional Tags</label>
                    <input
                      type="text"
                      value={nutritionalTagsInput}
                      onChange={(e) => setNutritionalTagsInput(e.target.value)}
                      placeholder="e.g. High Protein, Low Carb, High Fiber"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Quick Tag Pills Helper */}
                <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                  <span className="text-slate-400 font-semibold">Quick add:</span>
                  {['High Protein', 'Low Carb', 'High Fiber', 'Low Fat', 'Rich Calcium', 'Immunity Herbs'].map(
                    (tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          const current = nutritionalTagsInput
                            .split(',')
                            .map((t) => t.trim())
                            .filter(Boolean);
                          if (!current.includes(tag)) {
                            setNutritionalTagsInput(
                              current.length > 0 ? `${nutritionalTagsInput}, ${tag}` : tag
                            );
                          }
                        }}
                        className="px-2 py-0.5 bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 rounded-md border border-slate-200 transition"
                      >
                        +{tag}
                      </button>
                    )
                  )}
                </div>

                {/* Flags Checkboxes */}
                <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-700">
                  <label className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isVeg}
                      onChange={(e) => setIsVeg(e.target.checked)}
                      className="rounded text-amber-800"
                    />
                    <span>Pure Vegetarian</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAvailable}
                      onChange={(e) => setIsAvailable(e.target.checked)}
                      className="rounded text-amber-800"
                    />
                    <span>In Stock / Available</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPopular}
                      onChange={(e) => setIsPopular(e.target.checked)}
                      className="rounded text-amber-800"
                    />
                    <span>Mark as Popular</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="rounded text-amber-800"
                    />
                    <span>Featured on Home</span>
                  </label>
                </div>

                <div className="pt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingModalOpen(false)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-xl shadow-xs"
                  >
                    {editingItem ? 'Save Changes' : 'Create Item'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Item Confirmation Dialog */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            onClick={() => setItemToDelete(null)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="w-full max-w-sm bg-white rounded-3xl p-6 text-center shadow-2xl relative border border-slate-200">
              <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl mx-auto flex items-center justify-center mb-3">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Delete Menu Item?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to remove this dish from the cafe menu?
              </p>

              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => setItemToDelete(null)}
                  className="flex-1 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
