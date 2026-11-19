import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { MenuItem, MenuCategory, MENU_CATEGORIES } from '../../types';
import {
  Search,
  SlidersHorizontal,
  Plus,
  Minus,
  Clock,
  Sparkles,
  Flame,
  Info,
  X,
  Zap,
  ChevronDown,
} from 'lucide-react';

const INITIAL_PAGE_SIZE = 24;

export const MenuSection: React.FC = () => {
  const {
    menuItems,
    cart,
    addToCart,
    updateCartQuantity,
    selectedCategory,
    setSelectedCategory,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [nutritionFilter, setNutritionFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'calories-low'>('popular');
  const [selectedPortions, setSelectedPortions] = useState<Record<string, 'base' | 'full'>>({});
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_PAGE_SIZE);

  const categories: MenuCategory[] = ['All', ...MENU_CATEGORIES];

  // Reset pagination whenever filters or category change
  useEffect(() => {
    setVisibleCount(INITIAL_PAGE_SIZE);
  }, [selectedCategory, dietaryFilter, nutritionFilter, searchQuery, sortBy]);

  // Count dishes per category for pill badges
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: menuItems.length };
    menuItems.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [menuItems]);

  const nutritionFilterOptions = [
    { id: 'all', label: 'All Nutrition' },
    { id: 'High Protein', label: '⚡ High Protein' },
    { id: 'Low Carb', label: '🥗 Low Carb' },
    { id: 'High Fiber', label: '🌾 High Fiber' },
    { id: 'under-350', label: '🔥 Under 350 kcal' },
  ];

  // Helper for tag color
  const getTagStyle = (tag: string) => {
    switch (tag) {
      case 'High Protein':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold';
      case 'Low Carb':
        return 'bg-sky-50 text-sky-800 border-sky-300 font-bold';
      case 'High Fiber':
        return 'bg-amber-50 text-amber-900 border-amber-300 font-bold';
      case 'Low Fat':
      case 'Low Calorie':
        return 'bg-teal-50 text-teal-800 border-teal-300 font-bold';
      case 'Rich Calcium':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200 font-medium';
      case 'Quick Energy':
        return 'bg-orange-50 text-orange-800 border-orange-200 font-medium';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200 font-medium';
    }
  };

  // Filtered and sorted menu items
  const filteredItems = useMemo(() => {
    return menuItems
      .filter((item) => {
        // Category filter
        if (selectedCategory !== 'All' && item.category !== selectedCategory) {
          return false;
        }
        // Dietary filter
        if (dietaryFilter === 'veg' && !item.isVeg) return false;
        if (dietaryFilter === 'non-veg' && item.isVeg) return false;

        // Nutrition filter
        if (nutritionFilter !== 'all') {
          if (nutritionFilter === 'under-350') {
            if (!item.calories || item.calories > 350) return false;
          } else {
            if (!item.nutritionalTags?.includes(nutritionFilter)) return false;
          }
        }

        // Search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchesName = item.name.toLowerCase().includes(query);
          const matchesDesc = item.description.toLowerCase().includes(query);
          const matchesCat = item.category.toLowerCase().includes(query);
          const matchesNutr = item.nutritionalTags?.some((t) => t.toLowerCase().includes(query));
          return matchesName || matchesDesc || matchesCat || matchesNutr;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'calories-low') return (a.calories || 0) - (b.calories || 0);
        // Default: Popular/Featured first
        if (a.isPopular && !b.isPopular) return -1;
        if (!a.isPopular && b.isPopular) return 1;
        return 0;
      });
  }, [menuItems, selectedCategory, dietaryFilter, nutritionFilter, searchQuery, sortBy]);

  const displayedItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  // Helper to get quantity of an item (or specific portion variant) in cart
  const getCartQuantity = (cartKey: string) => {
    const found = cart.find((c) => c.item.id === cartKey);
    return found ? found.quantity : 0;
  };

  // Build portion-aware cart item object
  const buildPortionCartItem = (item: MenuItem, portion: 'base' | 'full'): MenuItem => {
    if (!item.fullPrice) return item;
    const [baseLabel, fullLabel] = item.portionLabels || ['Half', 'Full'];
    if (portion === 'full') {
      return {
        ...item,
        id: `${item.id}__full`,
        name: `${item.name} (${fullLabel})`,
        price: item.fullPrice,
      };
    }
    return {
      ...item,
      id: item.id,
      name: `${item.name} (${baseLabel})`,
      price: item.price,
    };
  };

  return (
    <section id="menu-section" className="py-10 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2.5 py-0.5 rounded-md">
                Official Rush n Hill Menu
              </span>
              <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />
                {menuItems.length} Dishes • Nutrition & Calorie Verified
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
              Fresh Meals, Tandoor, Chinese, Pizzas & More
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Complete menu across {MENU_CATEGORIES.length} categories (₹10 – ₹650) with Half/Full portions, calorie counts & nutritional tags.
            </p>
          </div>

          {/* Quick Notice Pill */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2 max-w-sm">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              Pre-order online for <strong>Takeaway</strong> or <strong>Dine-in</strong> to skip the lunchtime counter line!
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 mb-6 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 265 dishes or tags (e.g. Momos, Kadhai Paneer, Biryani, Pizza, Chai, High Protein)..."
                className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Veg / Non-Veg filter toggle */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
              <button
                onClick={() => setDietaryFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  dietaryFilter === 'all'
                    ? 'bg-white text-slate-800 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setDietaryFilter('veg')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  dietaryFilter === 'veg'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full border border-current flex items-center justify-center p-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                </span>
                Veg
              </button>
              <button
                onClick={() => setDietaryFilter('non-veg')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  dietaryFilter === 'non-veg'
                    ? 'bg-rose-700 text-white shadow-xs'
                    : 'text-rose-700 hover:bg-rose-50'
                }`}
              >
                <span className="w-2.5 h-2.5 border border-current flex items-center justify-center p-0.5">
                  <span className="w-1.5 h-1.5 bg-current"></span>
                </span>
                Non-Veg
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-slate-500 hidden sm:inline" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="popular">Popular Dishes</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="calories-low">Calories: Low to High</option>
              </select>
            </div>
          </div>

          {/* Nutritional Tags Filter Row */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar border-t border-slate-100">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 shrink-0 mr-1 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-600" />
              Nutrition:
            </span>
            {nutritionFilterOptions.map((opt) => {
              const isSelected = nutritionFilter === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setNutritionFilter(opt.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-emerald-700 text-white shadow-xs scale-[1.02]'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar border-t border-slate-100">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count = categoryCounts[cat] || 0;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-900 text-white shadow-md shadow-amber-900/15 scale-[1.02]'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                      isSelected ? 'bg-amber-800 text-amber-100' : 'bg-white/80 text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pizza Menu Special Promo Banner */}
        {selectedCategory === 'Pizza Menu' && (
          <div className="mb-6 bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 text-white rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md border border-amber-700/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300">
                  Official Rush n Hill Pizza Deal
                </p>
                <h3 className="text-base sm:text-lg font-extrabold text-white">
                  ★ Buy Two Get One Free on Pizzas!
                </h3>
                <p className="text-xs text-amber-100/90">
                  Apply promo code <strong className="font-mono text-amber-200">PIZZAB2G1</strong> at checkout on pizza orders of ₹300+.
                </p>
              </div>
            </div>
            <span className="self-start sm:self-center text-xs font-extrabold bg-amber-400 text-amber-950 px-3 py-1.5 rounded-xl shrink-0">
              Code: PIZZAB2G1
            </span>
          </div>
        )}

        {/* Active Results Counter */}
        <div className="flex items-center justify-between mb-4 text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-800">{displayedItems.length}</strong> of{' '}
            <strong className="text-slate-800">{filteredItems.length}</strong> dishes
            {selectedCategory !== 'All' && (
              <span>
                {' '}
                in <strong className="text-amber-900">{selectedCategory}</strong>
              </span>
            )}
          </span>
          {(searchQuery || selectedCategory !== 'All' || dietaryFilter !== 'all' || nutritionFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setDietaryFilter('all');
                setNutritionFilter('all');
              }}
              className="text-amber-800 hover:text-amber-950 font-bold underline"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-md mx-auto my-8">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl mx-auto flex items-center justify-center text-amber-700 mb-3">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No food items found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search query, nutritional tag, or category filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setDietaryFilter('all');
                setNutritionFilter('all');
              }}
              className="mt-4 px-4 py-2 bg-amber-800 text-white text-xs font-bold rounded-xl hover:bg-amber-900 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {displayedItems.map((item) => {
                const hasDualPortion = typeof item.fullPrice === 'number';
                const activePortion = selectedPortions[item.id] || 'base';
                const [baseLabel, fullLabel] = item.portionLabels || ['Half', 'Full'];
                const activeCartKey =
                  hasDualPortion && activePortion === 'full' ? `${item.id}__full` : item.id;
                const activePrice =
                  hasDualPortion && activePortion === 'full' ? item.fullPrice! : item.price;
                const qtyInCart = getCartQuantity(activeCartKey);

                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-2xl overflow-hidden border transition-all duration-200 flex flex-col justify-between group hover:shadow-md ${
                      !item.isAvailable
                        ? 'opacity-70 border-slate-200'
                        : 'border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    {/* Food Image & Top Tags */}
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent opacity-80"></div>

                      {/* Veg / Non-Veg Indicator */}
                      <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs p-1 rounded-md shadow-xs border border-slate-100">
                        {item.isVeg ? (
                          <div
                            className="w-4 h-4 border-2 border-emerald-600 flex items-center justify-center rounded-xs"
                            title="Pure Vegetarian"
                          >
                            <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                          </div>
                        ) : (
                          <div
                            className="w-4 h-4 border-2 border-rose-600 flex items-center justify-center rounded-xs"
                            title="Non-Vegetarian"
                          >
                            <div className="w-2 h-2 bg-rose-600 rotate-45"></div>
                          </div>
                        )}
                      </div>

                      {/* Popular / Featured Badge */}
                      {item.isPopular && (
                        <div className="absolute top-2.5 right-2.5 bg-amber-600/95 text-white font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                          <Flame className="w-3 h-3 text-amber-200" /> Popular
                        </div>
                      )}

                      {/* Prep Time Tag */}
                      <div className="absolute bottom-2 left-2.5 bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>{item.preparationTimeMinutes} mins</span>
                      </div>

                      {/* Calorie Count Badge */}
                      {item.calories && (
                        <div className="absolute bottom-2 right-2.5 bg-slate-950/85 backdrop-blur-xs text-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 border border-amber-500/20 shadow-xs">
                          <Flame className="w-3 h-3 text-orange-400 fill-orange-400" />
                          <span>{item.calories} kcal</span>
                        </div>
                      )}

                      {/* Availability Overlay */}
                      {!item.isAvailable && (
                        <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center text-white text-xs font-bold uppercase tracking-wider">
                          Sold Out For Today
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-amber-900 transition">
                            {item.name}
                          </h3>
                        </div>

                        <p className="text-[10px] font-semibold text-amber-800/80 mt-0.5">
                          {item.category}
                        </p>

                        {/* Nutritional Tags row */}
                        {item.nutritionalTags && item.nutritionalTags.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1 mt-1.5">
                            {item.nutritionalTags.map((tag) => (
                              <span
                                key={tag}
                                className={`text-[9px] px-1.5 py-0.5 rounded-md border tracking-tight ${getTagStyle(
                                  tag
                                )}`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <p className="text-[11px] text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>

                        {/* Half / Full (or Single / Double, 1 Combo / 2 Combos) Portion Selector */}
                        {hasDualPortion && (
                          <div className="mt-3 grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-xl">
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedPortions((prev) => ({ ...prev, [item.id]: 'base' }))
                              }
                              className={`py-1 px-2 rounded-lg text-[10px] font-bold transition flex items-center justify-between ${
                                activePortion === 'base'
                                  ? 'bg-white text-amber-950 shadow-xs'
                                  : 'text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              <span>{baseLabel}</span>
                              <span>₹{item.price}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedPortions((prev) => ({ ...prev, [item.id]: 'full' }))
                              }
                              className={`py-1 px-2 rounded-lg text-[10px] font-bold transition flex items-center justify-between ${
                                activePortion === 'full'
                                  ? 'bg-white text-amber-950 shadow-xs'
                                  : 'text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              <span>{fullLabel}</span>
                              <span>₹{item.fullPrice}</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Price and Cart Action */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 font-semibold block leading-none">
                            {hasDualPortion
                              ? activePortion === 'full'
                                ? fullLabel
                                : baseLabel
                              : 'Price'}
                          </span>
                          <span className="text-base sm:text-lg font-extrabold text-slate-900">
                            ₹{activePrice}
                          </span>
                        </div>

                        {/* Add Button or Quantity Controls */}
                        {item.isAvailable ? (
                          qtyInCart > 0 ? (
                            <div className="flex items-center bg-amber-900 text-white rounded-xl overflow-hidden shadow-xs">
                              <button
                                onClick={() => updateCartQuantity(activeCartKey, qtyInCart - 1)}
                                className="px-2.5 py-1.5 hover:bg-amber-800 transition active:scale-95"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-2 text-xs font-bold min-w-[20px] text-center">
                                {qtyInCart}
                              </span>
                              <button
                                onClick={() => updateCartQuantity(activeCartKey, qtyInCart + 1)}
                                className="px-2.5 py-1.5 hover:bg-amber-800 transition active:scale-95"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() =>
                                addToCart(buildPortionCartItem(item, activePortion))
                              }
                              className="flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-xs active:scale-95"
                            >
                              <Plus className="w-3.5 h-3.5 text-amber-700" />
                              <span>Add</span>
                            </button>
                          )
                        ) : (
                          <span className="text-[11px] font-semibold text-slate-400">
                            Unavailable
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More / Show All Pagination */}
            {filteredItems.length > visibleCount && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setVisibleCount((prev) => prev + INITIAL_PAGE_SIZE)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-900 hover:bg-amber-950 text-white text-xs font-bold shadow-md transition active:scale-95"
                >
                  <span>
                    Load More Dishes ({Math.min(INITIAL_PAGE_SIZE, filteredItems.length - visibleCount)} more)
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setVisibleCount(filteredItems.length)}
                  className="px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold transition"
                >
                  Show All {filteredItems.length} Dishes
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

