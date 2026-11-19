import { MenuItem, MenuCategoryName } from '../types';

// Curated food imagery mapped by dish type for clean visual presentation
const IMG = {
  momos: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
  friedMomos: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=600&q=80',
  noodles: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80',
  chilli: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80',
  manchurian: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
  wings: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=600&q=80',
  poha: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?auto=format&fit=crop&w=600&q=80',
  paratha: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80',
  paneerParatha: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
  omelette: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
  maggi: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80',
  cheeseMaggi: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
  toast: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
  soup: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80',
  chickenSoup: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=600&q=80',
  rice: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80',
  friedRice: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80',
  dal: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
  rajma: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80',
  sabzi: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
  paneer: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
  palakPaneer: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
  chaap: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80',
  chickenCurry: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80',
  butterChicken: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=600&q=80',
  eggCurry: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80',
  salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
  raita: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80',
  tikka: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80',
  tandooriChicken: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=600&q=80',
  roti: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
  naan: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=600&q=80',
  pakoda: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
  friedChicken: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=600&q=80',
  pasta: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=600&q=80',
  sandwich: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
  burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
  roll: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
  springRoll: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
  thali: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80',
  comboChinese: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80',
  pizzaVeg: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
  pizzaChicken: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
  chai: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
  coffee: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
  coldCoffee: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
  shikanji: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
  lassi: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80',
  shake: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
  strawberryShake: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80',
};

type RawDish = {
  id: string;
  name: string;
  category: MenuCategoryName;
  price: number;
  fullPrice?: number;
  portionLabels?: [string, string];
  isVeg: boolean;
  img: keyof typeof IMG;
  desc: string;
  prep?: number;
  cal: number;
  tags: string[];
  popular?: boolean;
  featured?: boolean;
};

const RAW_DISHES: RawDish[] = [
  // ==========================================
  // PAGE 1: MADE IN CHINA (30 items)
  // ==========================================
  { id: 'rnh-c1', name: 'Veg. Steam Momos', category: 'Made in China', price: 80, isVeg: true, img: 'momos', desc: 'Soft steamed Himalayan dumplings stuffed with fresh seasoned vegetables, served with spicy red chutney.', prep: 10, cal: 260, tags: ['Low Fat', 'Low Carb'], popular: true, featured: true },
  { id: 'rnh-c2', name: 'Veg. Fried Momos', category: 'Made in China', price: 90, isVeg: true, img: 'friedMomos', desc: 'Golden crispy deep-fried vegetable momos served hot with tangy momos chutney.', prep: 10, cal: 330, tags: ['Quick Energy'] },
  { id: 'rnh-c3', name: 'Veg. Kurkure Momos', category: 'Made in China', price: 160, isVeg: true, img: 'friedMomos', desc: 'Extra crunchy spiced crumb-coated veg momos served with creamy dip and spicy salsa.', prep: 12, cal: 410, tags: ['Student Fav'], popular: true },
  { id: 'rnh-c4', name: 'Veg. Gravy Momos', category: 'Made in China', price: 120, isVeg: true, img: 'chilli', desc: 'Juicy veg momos tossed in a rich, spicy Indo-Chinese garlic gravy.', prep: 12, cal: 360, tags: ['Comfort Food'] },
  { id: 'rnh-c5', name: 'Veg. Tandoori Momos', category: 'Made in China', price: 160, isVeg: true, img: 'tikka', desc: 'Smoky clay-oven roasted veg momos marinated in spiced hung curd and herbs.', prep: 15, cal: 350, tags: ['High Protein'], popular: true },
  { id: 'rnh-c6', name: 'Chicken Steam Momos', category: 'Made in China', price: 120, isVeg: false, img: 'momos', desc: 'Delicate steamed dumplings filled with minced spiced chicken and spring onions.', prep: 12, cal: 290, tags: ['High Protein', 'Low Fat'], popular: true },
  { id: 'rnh-c7', name: 'Chicken Fried Momos', category: 'Made in China', price: 130, isVeg: false, img: 'friedMomos', desc: 'Crispy fried chicken dumplings served with signature spicy red chutney.', prep: 12, cal: 370, tags: ['High Protein'] },
  { id: 'rnh-c8', name: 'Chicken Kurkure Momos', category: 'Made in China', price: 260, isVeg: false, img: 'friedMomos', desc: 'Crunchy kurkure-crusted juicy chicken momos paired with house chutney.', prep: 15, cal: 450, tags: ['High Protein', 'Student Fav'] },
  { id: 'rnh-c9', name: 'Chicken Gravy Momos', category: 'Made in China', price: 220, isVeg: false, img: 'chilli', desc: 'Succulent chicken momos simmered in fiery Indo-Chinese Manchurian gravy.', prep: 15, cal: 420, tags: ['High Protein'] },
  { id: 'rnh-c10', name: 'Chicken Tandoori Momos', category: 'Made in China', price: 260, isVeg: false, img: 'tikka', desc: 'Char-grilled smoky chicken momos coated in aromatic tandoori masala.', prep: 15, cal: 390, tags: ['High Protein', 'Low Carb'], popular: true },
  { id: 'rnh-c11', name: 'Veg. Noodles', category: 'Made in China', price: 60, fullPrice: 100, isVeg: true, img: 'noodles', desc: 'Wok-tossed classic street-style noodles with crisp cabbage, carrots, and capsicum.', prep: 10, cal: 340, tags: ['Quick Energy', 'Student Fav'], popular: true },
  { id: 'rnh-c12', name: 'Egg Noodles', category: 'Made in China', price: 80, fullPrice: 120, isVeg: false, img: 'noodles', desc: 'Savory wok-fried noodles tossed with scrambled eggs, soy sauce, and crunchy veggies.', prep: 10, cal: 390, tags: ['High Protein'] },
  { id: 'rnh-c13', name: 'Chicken Noodles', category: 'Made in China', price: 100, fullPrice: 160, isVeg: false, img: 'noodles', desc: 'Smoky noodles stir-fried with shredded tender chicken and fresh garden vegetables.', prep: 12, cal: 430, tags: ['High Protein'] },
  { id: 'rnh-c14', name: 'Veg Hakka Noodles', category: 'Made in China', price: 80, fullPrice: 120, isVeg: true, img: 'noodles', desc: 'Authentic non-sticky Hakka noodles wok-tossed with bell peppers, garlic, and light soy.', prep: 10, cal: 350, tags: ['Quick Energy'] },
  { id: 'rnh-c15', name: 'Veg. Chilli Garlic Noodles', category: 'Made in China', price: 80, fullPrice: 120, isVeg: true, img: 'noodles', desc: 'Fiery roasted garlic and red chilli tossed noodles loaded with crisp veggies.', prep: 10, cal: 360, tags: ['Quick Energy'] },
  { id: 'rnh-c16', name: 'Egg Hakka Noodles', category: 'Made in China', price: 90, fullPrice: 120, isVeg: false, img: 'noodles', desc: 'Wok-seared Hakka noodles with fluffy scrambled eggs and spring onions.', prep: 12, cal: 400, tags: ['High Protein'] },
  { id: 'rnh-c17', name: 'Egg Chilli Garlic Noodles', category: 'Made in China', price: 90, fullPrice: 120, isVeg: false, img: 'noodles', desc: 'Spicy chilli-garlic noodles tossed with double egg and aromatic wok spices.', prep: 12, cal: 410, tags: ['High Protein'] },
  { id: 'rnh-c18', name: 'Chicken Hakka Noodles', category: 'Made in China', price: 120, fullPrice: 180, isVeg: false, img: 'noodles', desc: 'Classic Hakka noodles loaded with juicy chicken strips and crisp vegetables.', prep: 12, cal: 450, tags: ['High Protein'] },
  { id: 'rnh-c19', name: 'Chicken Chilli Garlic Noodles', category: 'Made in China', price: 130, fullPrice: 180, isVeg: false, img: 'noodles', desc: 'Bold chilli-garlic flavored noodles tossed with tender chicken and crunchy peppers.', prep: 12, cal: 460, tags: ['High Protein'] },
  { id: 'rnh-c20', name: 'Chilli Potato', category: 'Made in China', price: 160, isVeg: true, img: 'chilli', desc: 'Crispy fried potato fingers wok-tossed in spicy chilli-garlic sauce and spring onions.', prep: 12, cal: 380, tags: ['Student Fav'] },
  { id: 'rnh-c21', name: 'Honey Chilli Potato', category: 'Made in China', price: 160, isVeg: true, img: 'chilli', desc: 'Sweet and spicy crispy potato fingers glazed with honey, chilli sauce, and toasted sesame.', prep: 12, cal: 410, tags: ['Student Fav'], popular: true },
  { id: 'rnh-c22', name: 'Chilli Paneer', category: 'Made in China', price: 160, fullPrice: 260, isVeg: true, img: 'chilli', desc: 'Soft cottage cheese cubes tossed with onions, capsicum, and zesty Indo-Chinese chilli sauce.', prep: 14, cal: 420, tags: ['High Protein', 'Rich Calcium'], popular: true },
  { id: 'rnh-c23', name: 'Mushroom Chilli', category: 'Made in China', price: 150, fullPrice: 250, isVeg: true, img: 'chilli', desc: 'Crispy button mushrooms wok-tossed in tangy soy, green chilli, and garlic sauce.', prep: 14, cal: 340, tags: ['Low Carb', 'High Fiber'] },
  { id: 'rnh-c24', name: 'Chilli Chicken', category: 'Made in China', price: 170, fullPrice: 270, isVeg: false, img: 'chilli', desc: 'Boneless crispy chicken chunks tossed with peppers, onions, and spicy garlic chilli sauce.', prep: 15, cal: 450, tags: ['High Protein', 'Low Carb'], popular: true },
  { id: 'rnh-c25', name: 'Veg. Manchurian', category: 'Made in China', price: 100, fullPrice: 160, isVeg: true, img: 'manchurian', desc: 'Crispy mixed vegetable dumplings tossed in savory ginger-garlic soy Manchurian sauce.', prep: 12, cal: 360, tags: ['High Fiber'] },
  { id: 'rnh-c26', name: 'Gobhi Manchurian', category: 'Made in China', price: 120, fullPrice: 180, isVeg: true, img: 'manchurian', desc: 'Crunchy golden cauliflower florets glazed in spicy Manchurian sauce.', prep: 12, cal: 350, tags: ['High Fiber'] },
  { id: 'rnh-c27', name: 'Chicken Manchurian', category: 'Made in China', price: 180, fullPrice: 300, isVeg: false, img: 'manchurian', desc: 'Tender fried chicken bites coated in thick, tangy ginger-garlic Manchurian glaze.', prep: 15, cal: 440, tags: ['High Protein'] },
  { id: 'rnh-c28', name: 'Chicken Lollipop (6 Pcs.)', category: 'Made in China', price: 320, isVeg: false, img: 'wings', desc: 'Six crisp marinated chicken drumettes tossed in spicy Schezwan-garlic seasoning.', prep: 16, cal: 520, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-c29', name: 'Chicken Wings (6 Pcs.)', category: 'Made in China', price: 320, isVeg: false, img: 'wings', desc: 'Six juicy golden-fried spiced chicken wings served hot with house dip.', prep: 16, cal: 510, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-c30', name: 'Chilli Chicken Wings (6 Pcs.)', category: 'Made in China', price: 350, isVeg: false, img: 'wings', desc: 'Six crispy chicken wings tossed in fiery chilli-garlic wok sauce.', prep: 16, cal: 540, tags: ['High Protein', 'Low Carb'] },

  // ==========================================
  // PAGE 2: SUBHA KA NASTA (27 items)
  // ==========================================
  { id: 'rnh-b1', name: 'Poha', category: 'Subha Ka Nasta', price: 100, isVeg: true, img: 'poha', desc: 'Light flattened rice tempered with mustard seeds, curry leaves, peanuts, onions, and lemon.', prep: 8, cal: 270, tags: ['Low Fat', 'High Iron'] },
  { id: 'rnh-b2', name: 'Egg Bhurji', category: 'Subha Ka Nasta', price: 50, isVeg: false, img: 'omelette', desc: 'Spiced Indian-style scrambled eggs cooked with finely chopped onions, tomatoes, and green chillies.', prep: 8, cal: 240, tags: ['High Protein', 'Low Carb'], popular: true },
  { id: 'rnh-b3', name: 'Aalu Paratha', category: 'Subha Ka Nasta', price: 40, isVeg: true, img: 'paratha', desc: 'Hot whole-wheat flatbread stuffed with homestyle spiced mashed potatoes.', prep: 10, cal: 310, tags: ['High Fiber', 'Student Fav'], popular: true, featured: true },
  { id: 'rnh-b4', name: 'Aalu Pyaj Paratha', category: 'Subha Ka Nasta', price: 50, isVeg: true, img: 'paratha', desc: 'Crispy tawa paratha stuffed with spiced potatoes, crunchy onions, and coriander.', prep: 10, cal: 330, tags: ['High Fiber'] },
  { id: 'rnh-b5', name: 'Onion Paratha', category: 'Subha Ka Nasta', price: 50, isVeg: true, img: 'paratha', desc: 'Flavorful flatbread stuffed with spiced chopped onions, carom seeds, and fresh herbs.', prep: 10, cal: 290, tags: ['High Fiber'] },
  { id: 'rnh-b6', name: 'Gobhi Paratha', category: 'Subha Ka Nasta', price: 50, isVeg: true, img: 'paratha', desc: 'Grated spiced cauliflower stuffed whole-wheat paratha roasted golden on tawa.', prep: 10, cal: 290, tags: ['High Fiber', 'Low Fat'] },
  { id: 'rnh-b7', name: 'Mooli Paratha', category: 'Subha Ka Nasta', price: 50, isVeg: true, img: 'paratha', desc: 'Traditional grated radish and ginger-spiced tawa paratha cooked fresh.', prep: 10, cal: 280, tags: ['High Fiber', 'Low Fat'] },
  { id: 'rnh-b8', name: 'Egg Paratha', category: 'Subha Ka Nasta', price: 70, isVeg: false, img: 'paratha', desc: 'Flaky whole-wheat paratha layered and pan-griddled with spiced whisked egg.', prep: 10, cal: 370, tags: ['High Protein'] },
  { id: 'rnh-b9', name: 'Paneer Paratha', category: 'Subha Ka Nasta', price: 70, isVeg: true, img: 'paneerParatha', desc: 'Hearty whole-wheat paratha stuffed with spiced crumbled cottage cheese and herbs.', prep: 12, cal: 390, tags: ['High Protein', 'Rich Calcium'], popular: true, featured: true },
  { id: 'rnh-b10', name: 'Paneer Pyaj Paratha', category: 'Subha Ka Nasta', price: 80, isVeg: true, img: 'paneerParatha', desc: 'Stuffed with seasoned paneer, crunchy onions, and green chillies, roasted golden.', prep: 12, cal: 410, tags: ['High Protein', 'Rich Calcium'] },
  { id: 'rnh-b11', name: 'Special Paneer Paratha', category: 'Subha Ka Nasta', price: 120, isVeg: true, img: 'paneerParatha', desc: 'Extra-loaded signature paneer paratha served with butter, curd, and tangy pickle.', prep: 12, cal: 460, tags: ['High Protein', 'Rich Calcium'] },
  { id: 'rnh-b12', name: 'Corn Paratha', category: 'Subha Ka Nasta', price: 80, isVeg: true, img: 'paratha', desc: 'Sweet corn kernels spiced with herbs and mashed seasoning inside crisp flatbread.', prep: 10, cal: 340, tags: ['High Fiber'] },
  { id: 'rnh-b13', name: 'Mix Paratha', category: 'Subha Ka Nasta', price: 85, isVeg: true, img: 'paratha', desc: 'Wholesome blend of potato, paneer, onion, and seasonal veggies stuffed in tawa paratha.', prep: 12, cal: 380, tags: ['Balanced Meal', 'High Fiber'] },
  { id: 'rnh-b14', name: 'Cheese Paratha', category: 'Subha Ka Nasta', price: 80, isVeg: true, img: 'paneerParatha', desc: 'Melted gooey spiced cheese stuffed inside a crispy golden paratha.', prep: 10, cal: 430, tags: ['Rich Calcium'] },
  { id: 'rnh-b15', name: 'Special Omelette', category: 'Subha Ka Nasta', price: 60, isVeg: false, img: 'omelette', desc: 'Fluffy farm-egg omelette cooked in butter with house seasoning and herbs.', prep: 8, cal: 250, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-b16', name: 'Masala Omelette', category: 'Subha Ka Nasta', price: 70, isVeg: false, img: 'omelette', desc: 'Desi-style masala omelette loaded with onions, tomatoes, green chillies, and coriander.', prep: 8, cal: 270, tags: ['High Protein', 'Low Carb'], popular: true },
  { id: 'rnh-b17', name: 'Bread Omelette', category: 'Subha Ka Nasta', price: 70, isVeg: false, img: 'omelette', desc: 'Classic campus breakfast — spiced fluffy omelette folded with toasted buttered bread.', prep: 8, cal: 350, tags: ['High Protein', 'Quick Energy'], popular: true },
  { id: 'rnh-b18', name: 'Boil Egg (4 Pcs.)', category: 'Subha Ka Nasta', price: 60, isVeg: false, img: 'omelette', desc: 'Four perfectly boiled eggs sprinkled with black pepper, chaat masala, and salt.', prep: 6, cal: 280, tags: ['High Protein', 'Low Carb', 'Low Calorie'] },
  { id: 'rnh-b19', name: 'Maggi', category: 'Subha Ka Nasta', price: 40, isVeg: true, img: 'maggi', desc: 'Classic hot soupy Maggi noodles cooked fresh — the ultimate campus comfort bite.', prep: 6, cal: 290, tags: ['Quick Energy', 'Student Fav'], popular: true },
  { id: 'rnh-b20', name: 'Masala Maggi', category: 'Subha Ka Nasta', price: 50, isVeg: true, img: 'maggi', desc: 'Maggi cooked with extra roasted spices, onions, and tangy masala kick.', prep: 7, cal: 310, tags: ['Quick Energy', 'Student Fav'], popular: true },
  { id: 'rnh-b21', name: 'Egg Maggi', category: 'Subha Ka Nasta', price: 60, isVeg: false, img: 'maggi', desc: 'Hot spiced Maggi tossed with fluffy scrambled egg for extra protein.', prep: 8, cal: 370, tags: ['High Protein', 'Quick Energy'] },
  { id: 'rnh-b22', name: 'Veg. Maggi', category: 'Subha Ka Nasta', price: 70, isVeg: true, img: 'maggi', desc: 'Loaded with crunchy green peas, carrots, onions, capsicum, and house spices.', prep: 8, cal: 330, tags: ['High Fiber'] },
  { id: 'rnh-b23', name: 'Veg. Schezwan Maggi', category: 'Subha Ka Nasta', price: 70, isVeg: true, img: 'maggi', desc: 'Fiery Schezwan-tossed vegetable Maggi with bold garlic-chilli flavor.', prep: 8, cal: 350, tags: ['Quick Energy'] },
  { id: 'rnh-b24', name: 'Veg. Cheese Maggi', category: 'Subha Ka Nasta', price: 80, isVeg: true, img: 'cheeseMaggi', desc: 'Creamy melted cheese folded over hot vegetable masala Maggi.', prep: 9, cal: 420, tags: ['Rich Calcium', 'Student Fav'], popular: true },
  { id: 'rnh-b25', name: 'Bun Maska', category: 'Subha Ka Nasta', price: 40, isVeg: true, img: 'toast', desc: 'Soft warm bakery bun generously slathered with creamy salted butter.', prep: 4, cal: 260, tags: ['Quick Energy'] },
  { id: 'rnh-b26', name: 'Bread Butter Jam (2 Pcs.)', category: 'Subha Ka Nasta', price: 60, isVeg: true, img: 'toast', desc: 'Two fresh bread slices layered with salted butter and mixed fruit jam.', prep: 5, cal: 270, tags: ['Quick Energy'] },
  { id: 'rnh-b27', name: 'Bread Toast (4 Pcs.)', category: 'Subha Ka Nasta', price: 50, isVeg: true, img: 'toast', desc: 'Four crisp golden-brown toasted bread slices brushed with butter.', prep: 5, cal: 280, tags: ['Quick Energy'] },

  // ==========================================
  // PAGE 3 TOP: SOUPS (10 items)
  // ==========================================
  { id: 'rnh-s1', name: 'Veg. Manchow Soup', category: 'Soups', price: 70, isVeg: true, img: 'soup', desc: 'Hot & savory Indo-Chinese vegetable soup topped with crispy fried noodles.', prep: 8, cal: 130, tags: ['Low Calorie', 'Low Fat'], popular: true },
  { id: 'rnh-s2', name: 'Hot & Sour Soup', category: 'Soups', price: 80, isVeg: true, img: 'soup', desc: 'Tangy, peppery vegetable broth brimming with finely diced veggies and soy.', prep: 8, cal: 120, tags: ['Low Calorie', 'Low Carb'] },
  { id: 'rnh-s3', name: 'Sweet Corn Soup', category: 'Soups', price: 90, isVeg: true, img: 'soup', desc: 'Velvety creamy sweet corn soup studded with crisp vegetables and cracked pepper.', prep: 8, cal: 150, tags: ['Low Fat', 'Low Calorie'] },
  { id: 'rnh-s4', name: 'Ginger Lemon Soup', category: 'Soups', price: 80, isVeg: true, img: 'soup', desc: 'Soothing immunity-boosting clear broth infused with fresh ginger, lemon, and coriander.', prep: 8, cal: 90, tags: ['Low Calorie', 'Low Carb', 'Immunity Herbs'] },
  { id: 'rnh-s5', name: 'Clear Soup', category: 'Soups', price: 80, isVeg: true, img: 'soup', desc: 'Light, wholesome aromatic vegetable broth seasoned with subtle herbs and pepper.', prep: 8, cal: 80, tags: ['Low Calorie', 'Low Carb', 'Low Fat'] },
  { id: 'rnh-s6', name: 'Spinach Soup', category: 'Soups', price: 80, isVeg: true, img: 'soup', desc: 'Creamy iron-rich fresh palak soup lightly spiced with garlic and black pepper.', prep: 10, cal: 140, tags: ['High Iron', 'Low Carb'] },
  { id: 'rnh-s7', name: 'Chicken Soup', category: 'Soups', price: 120, isVeg: false, img: 'chickenSoup', desc: 'Nourishing slow-simmered homestyle chicken broth with tender chicken shreds.', prep: 10, cal: 170, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-s8', name: 'Chicken Manchow Soup', category: 'Soups', price: 120, isVeg: false, img: 'chickenSoup', desc: 'Spicy garlic-soy chicken soup garnished with crunchy fried noodles.', prep: 10, cal: 200, tags: ['High Protein', 'Low Fat'] },
  { id: 'rnh-s9', name: 'Chicken Hot & Sour Soup', category: 'Soups', price: 120, isVeg: false, img: 'chickenSoup', desc: 'Bold and tangy hot-and-sour broth loaded with shredded chicken and veggies.', prep: 10, cal: 185, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-s10', name: 'Chicken Sweet Corn Soup', category: 'Soups', price: 130, isVeg: false, img: 'chickenSoup', desc: 'Silky sweet corn soup enriched with tender chicken pieces and mild spices.', prep: 10, cal: 210, tags: ['High Protein'] },

  // ==========================================
  // PAGE 3 BOTTOM: CHEF'S SPECIAL RICE (13 items)
  // ==========================================
  { id: 'rnh-r1', name: 'Plain Rice', category: "Chef's Special Rice", price: 60, fullPrice: 80, isVeg: true, img: 'rice', desc: 'Fluffy steamed long-grain basmati rice cooked fresh.', prep: 8, cal: 240, tags: ['Low Fat'] },
  { id: 'rnh-r2', name: 'Jeera Rice', category: "Chef's Special Rice", price: 80, fullPrice: 100, isVeg: true, img: 'rice', desc: 'Fragrant basmati rice tempered with roasted cumin seeds and ghee.', prep: 8, cal: 270, tags: ['Comfort Food'] },
  { id: 'rnh-r3', name: 'Peas Pulao', category: "Chef's Special Rice", price: 110, fullPrice: 160, isVeg: true, img: 'rice', desc: 'Aromatic basmati pulao cooked with sweet green peas and whole garam masala.', prep: 12, cal: 310, tags: ['High Fiber'] },
  { id: 'rnh-r4', name: 'Veg. Pulao', category: "Chef's Special Rice", price: 120, fullPrice: 180, isVeg: true, img: 'rice', desc: 'Fragrant rice cooked with seasonal vegetables, saffron hints, and mild spices.', prep: 12, cal: 340, tags: ['Balanced Meal', 'High Fiber'] },
  { id: 'rnh-r5', name: 'Veg. Fried Rice', category: "Chef's Special Rice", price: 70, fullPrice: 110, isVeg: true, img: 'friedRice', desc: 'Wok-tossed basmati rice with finely chopped veggies, soy, and spring onions.', prep: 10, cal: 350, tags: ['Quick Energy'], popular: true },
  { id: 'rnh-r6', name: 'Paneer Fried Rice', category: "Chef's Special Rice", price: 90, fullPrice: 140, isVeg: true, img: 'friedRice', desc: 'Flavorful fried rice tossed with golden-seared paneer cubes and crunchy veggies.', prep: 12, cal: 410, tags: ['High Protein'] },
  { id: 'rnh-r7', name: 'Egg Fried Rice', category: "Chef's Special Rice", price: 80, fullPrice: 120, isVeg: false, img: 'friedRice', desc: 'Smoky wok-fried rice combined with seasoned scrambled eggs and scallions.', prep: 10, cal: 390, tags: ['High Protein'] },
  { id: 'rnh-r8', name: 'Chicken Fried Rice', category: "Chef's Special Rice", price: 110, fullPrice: 160, isVeg: false, img: 'friedRice', desc: 'Classic Indo-Chinese fried rice tossed with diced tender chicken and crisp veggies.', prep: 12, cal: 440, tags: ['High Protein'], popular: true },
  { id: 'rnh-r9', name: 'Veg. Schezwan Fried Rice', category: "Chef's Special Rice", price: 90, fullPrice: 130, isVeg: true, img: 'friedRice', desc: 'Spicy wok-tossed rice coated in fiery house-made Schezwan chilli-garlic sauce.', prep: 10, cal: 370, tags: ['Quick Energy'] },
  { id: 'rnh-r10', name: 'Egg Schezwan Fried Rice', category: "Chef's Special Rice", price: 90, fullPrice: 130, isVeg: false, img: 'friedRice', desc: 'Zesty Schezwan fried rice loaded with scrambled eggs and crunchy vegetables.', prep: 12, cal: 410, tags: ['High Protein'] },
  { id: 'rnh-r11', name: 'Paneer Schezwan Fried Rice', category: "Chef's Special Rice", price: 100, fullPrice: 150, isVeg: true, img: 'friedRice', desc: 'Fiery Schezwan rice tossed with soft cottage cheese cubes and peppers.', prep: 12, cal: 430, tags: ['High Protein'] },
  { id: 'rnh-r12', name: 'Chicken Schezwan Fried Rice', category: "Chef's Special Rice", price: 120, fullPrice: 180, isVeg: false, img: 'friedRice', desc: 'Bold Schezwan fried rice loaded with juicy chicken chunks and wok-charred aromatics.', prep: 12, cal: 460, tags: ['High Protein'] },
  { id: 'rnh-r13', name: 'Triple Fried Rice', category: "Chef's Special Rice", price: 250, isVeg: true, img: 'friedRice', desc: 'Hearty combination of Schezwan fried rice, crispy noodles, and rich Manchurian gravy.', prep: 15, cal: 580, tags: ['Balanced Meal'] },

  // ==========================================
  // PAGES 4, 5, 6 TOP: HILLS TADKA (78 items)
  // ==========================================
  { id: 'rnh-t1', name: 'Daal Tadka', category: 'Hills Tadka', price: 90, fullPrice: 130, isVeg: true, img: 'dal', desc: 'Yellow lentils slow-cooked and finished with sizzling desi ghee, cumin, and garlic tadka.', prep: 12, cal: 280, tags: ['High Protein', 'High Fiber'], popular: true },
  { id: 'rnh-t2', name: 'Daal Fry', category: 'Hills Tadka', price: 80, fullPrice: 120, isVeg: true, img: 'dal', desc: 'Homestyle spiced yellow dal sautéed with onions, tomatoes, and fresh coriander.', prep: 12, cal: 260, tags: ['High Protein', 'High Fiber'] },
  { id: 'rnh-t3', name: 'Daal Makhni', category: 'Hills Tadka', price: 110, fullPrice: 180, isVeg: true, img: 'dal', desc: 'Creamy black urad lentils simmered overnight with butter, tomato puree, and mild spices.', prep: 14, cal: 360, tags: ['High Protein', 'Comfort Food'], popular: true },
  { id: 'rnh-t4', name: 'Rajma Masala', category: 'Hills Tadka', price: 110, fullPrice: 180, isVeg: true, img: 'rajma', desc: 'Punjabi-style red kidney beans simmered in thick, spiced onion-tomato masala.', prep: 12, cal: 330, tags: ['High Protein', 'High Fiber'], popular: true },
  { id: 'rnh-t5', name: 'Chilli Masala', category: 'Hills Tadka', price: 110, fullPrice: 180, isVeg: true, img: 'sabzi', desc: 'Zesty dhaba-style spiced masala curry with bold chilli and aromatic whole spices.', prep: 12, cal: 310, tags: ['High Fiber'] },
  { id: 'rnh-t6', name: 'Black Chana Masala', category: 'Hills Tadka', price: 120, fullPrice: 200, isVeg: true, img: 'rajma', desc: 'Protein-rich black chickpeas cooked in rustic roasted masala gravy.', prep: 14, cal: 320, tags: ['High Protein', 'High Fiber', 'High Iron'] },
  { id: 'rnh-t7', name: 'Aalu Gobhi', category: 'Hills Tadka', price: 110, fullPrice: 160, isVeg: true, img: 'sabzi', desc: 'Homestyle dry-sautéed potatoes and cauliflower florets with turmeric, ginger, and cumin.', prep: 12, cal: 270, tags: ['High Fiber', 'Low Fat'] },
  { id: 'rnh-t8', name: 'Aalu Matar', category: 'Hills Tadka', price: 110, fullPrice: 160, isVeg: true, img: 'sabzi', desc: 'Classic comforting curry of tender potatoes and sweet green peas in spiced tomato gravy.', prep: 12, cal: 280, tags: ['High Fiber'] },
  { id: 'rnh-t9', name: 'Aalu Tamatar', category: 'Hills Tadka', price: 110, fullPrice: 170, isVeg: true, img: 'sabzi', desc: 'Tangy North Indian potato and tomato rasedar curry tempered with hing and cumin.', prep: 12, cal: 260, tags: ['Low Fat'] },
  { id: 'rnh-t10', name: 'Aalu Bhujiya', category: 'Hills Tadka', price: 160, fullPrice: 240, isVeg: true, img: 'sabzi', desc: 'Crisp Bihari/homestyle pan-fried thinly sliced potatoes with turmeric and green chilli.', prep: 12, cal: 310, tags: ['Comfort Food'] },
  { id: 'rnh-t11', name: 'Aalu ka Chokha', category: 'Hills Tadka', price: 90, fullPrice: 150, isVeg: true, img: 'sabzi', desc: 'Rustic mashed spiced potatoes tempered with mustard oil, chopped onions, and coriander.', prep: 10, cal: 250, tags: ['Low Fat', 'Comfort Food'] },
  { id: 'rnh-t12', name: 'Dum Aalu', category: 'Hills Tadka', price: 110, fullPrice: 180, isVeg: true, img: 'sabzi', desc: 'Baby potatoes slow-cooked in a rich, velvety yogurt and spiced tomato gravy.', prep: 14, cal: 340, tags: ['Comfort Food'] },
  { id: 'rnh-t13', name: 'Kashmiri Aalu Dum', category: 'Hills Tadka', price: 550, isVeg: true, img: 'sabzi', desc: 'Royal Kashmiri-style stuffed baby potatoes simmered in fragrant fennel and saffron gravy.', prep: 18, cal: 460, tags: ['Rich Calcium'] },
  { id: 'rnh-t14', name: 'Jeera Aalu', category: 'Hills Tadka', price: 90, fullPrice: 160, isVeg: true, img: 'sabzi', desc: 'Diced potatoes tossed in roasted cumin seeds, amchur, and fresh coriander.', prep: 10, cal: 250, tags: ['Low Fat'] },
  { id: 'rnh-t15', name: 'Aalu Chholaa', category: 'Hills Tadka', price: 90, fullPrice: 160, isVeg: true, img: 'rajma', desc: 'Hearty spiced chickpea and potato curry simmered in tangy Punjabi masala.', prep: 12, cal: 320, tags: ['High Protein', 'High Fiber'] },
  { id: 'rnh-t16', name: 'Mix Veg.', category: 'Hills Tadka', price: 120, fullPrice: 170, isVeg: true, img: 'sabzi', desc: 'Seasonal carrots, beans, peas, cauliflower, and paneer tossed in semi-dry masala.', prep: 12, cal: 290, tags: ['High Fiber', 'Balanced Meal'] },
  { id: 'rnh-t17', name: 'Veg. Kadai', category: 'Hills Tadka', price: 130, fullPrice: 200, isVeg: true, img: 'sabzi', desc: 'Assorted garden veggies cooked with freshly pounded coriander and red chillies in kadai gravy.', prep: 14, cal: 310, tags: ['High Fiber'] },
  { id: 'rnh-t18', name: 'Veg. Kolhapuri', category: 'Hills Tadka', price: 130, fullPrice: 200, isVeg: true, img: 'sabzi', desc: 'Spicy Maharashtrian-style mixed vegetable curry with roasted coconut and Kolhapuri spices.', prep: 14, cal: 330, tags: ['High Fiber'] },
  { id: 'rnh-t19', name: 'Matar Paneer', category: 'Hills Tadka', price: 140, fullPrice: 220, isVeg: true, img: 'paneer', desc: 'Soft paneer cubes and sweet green peas simmered in classic spiced tomato-onion gravy.', prep: 14, cal: 370, tags: ['High Protein', 'Rich Calcium'] },
  { id: 'rnh-t20', name: 'Kadai Paneer', category: 'Hills Tadka', price: 140, fullPrice: 220, isVeg: true, img: 'paneer', desc: 'Cottage cheese tossed with crunchy bell peppers, onions, and freshly ground kadai masala.', prep: 14, cal: 400, tags: ['High Protein', 'Rich Calcium'], popular: true, featured: true },
  { id: 'rnh-t21', name: 'Shahi Paneer', category: 'Hills Tadka', price: 170, fullPrice: 270, isVeg: true, img: 'paneer', desc: 'Royal creamy cashew-tomato gravy enveloping soft malai paneer cubes.', prep: 15, cal: 440, tags: ['High Protein', 'Rich Calcium'], popular: true },
  { id: 'rnh-t22', name: 'Paneer Butter Masala', category: 'Hills Tadka', price: 160, fullPrice: 260, isVeg: true, img: 'paneer', desc: 'Rich velvety tomato-butter makhani gravy loaded with succulent paneer cubes.', prep: 15, cal: 450, tags: ['High Protein', 'Rich Calcium'], popular: true },
  { id: 'rnh-t23', name: 'Paneer Do Pyaza', category: 'Hills Tadka', price: 150, fullPrice: 230, isVeg: true, img: 'paneer', desc: 'Paneer cooked with double layers of caramelized and crisp diced onions in spiced gravy.', prep: 14, cal: 390, tags: ['High Protein'] },
  { id: 'rnh-t24', name: 'Handi Paneer', category: 'Hills Tadka', price: 150, fullPrice: 230, isVeg: true, img: 'paneer', desc: 'Slow-cooked earthen-pot style creamy spiced paneer masala finished with kasuri methi.', prep: 15, cal: 410, tags: ['High Protein'] },
  { id: 'rnh-t25', name: 'Palak Paneer', category: 'Hills Tadka', price: 140, fullPrice: 220, isVeg: true, img: 'palakPaneer', desc: 'Fresh blanched spinach puree tempered with garlic and studded with soft paneer cubes.', prep: 14, cal: 340, tags: ['High Protein', 'High Iron', 'Low Carb'] },
  { id: 'rnh-t26', name: 'Paneer Bhurji', category: 'Hills Tadka', price: 160, fullPrice: 260, isVeg: true, img: 'paneer', desc: 'Scrambled fresh cottage cheese sautéed with onions, tomatoes, green chillies, and herbs.', prep: 12, cal: 380, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-t27', name: 'Paneer Rada', category: 'Hills Tadka', price: 220, fullPrice: 320, isVeg: true, img: 'paneer', desc: 'Rich Punjabi-style paneer cubes cooked in a thick grated-paneer spiced masala gravy.', prep: 15, cal: 460, tags: ['High Protein'] },
  { id: 'rnh-t28', name: 'Paneer Achari', category: 'Hills Tadka', price: 220, fullPrice: 320, isVeg: true, img: 'paneer', desc: 'Tangy pickle-spiced cottage cheese curry with fennel, kalonji, and mustard seeds.', prep: 15, cal: 410, tags: ['High Protein'] },
  { id: 'rnh-t29', name: 'Paneer Rajwadi', category: 'Hills Tadka', price: 230, fullPrice: 330, isVeg: true, img: 'paneer', desc: 'Rajasthani royal-style rich nutty paneer gravy infused with aromatic royal spices.', prep: 16, cal: 470, tags: ['High Protein', 'Rich Calcium'] },
  { id: 'rnh-t30', name: 'Paneer Lababdar', category: 'Hills Tadka', price: 230, fullPrice: 330, isVeg: true, img: 'paneer', desc: 'Luscious mildly sweet and tangy tomato-cashew gravy topped with grated paneer and cream.', prep: 15, cal: 460, tags: ['High Protein', 'Rich Calcium'] },
  { id: 'rnh-t31', name: 'Paneer Kolhapuri', category: 'Hills Tadka', price: 220, fullPrice: 320, isVeg: true, img: 'paneer', desc: 'Fiery Kolhapuri spiced gravy loaded with tender paneer cubes for spice lovers.', prep: 15, cal: 420, tags: ['High Protein'] },
  { id: 'rnh-t32', name: 'Paneer Patiyala', category: 'Hills Tadka', price: 230, fullPrice: 330, isVeg: true, img: 'paneer', desc: 'Decadent Punjabi specialty of stuffed paneer rolls served in rich royal gravy.', prep: 16, cal: 480, tags: ['High Protein'] },
  { id: 'rnh-t33', name: 'Paneer 65', category: 'Hills Tadka', price: 250, fullPrice: 350, isVeg: true, img: 'chilli', desc: 'Crispy South-Indian spiced paneer bites tempered with curry leaves and green chillies.', prep: 15, cal: 430, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-t34', name: 'Paneer Pakoda Masala', category: 'Hills Tadka', price: 250, fullPrice: 350, isVeg: true, img: 'paneer', desc: 'Golden gram-flour paneer fritters simmered in rich dhaba-style masala gravy.', prep: 16, cal: 470, tags: ['High Protein'] },
  { id: 'rnh-t35', name: 'Paneer Pasanda', category: 'Hills Tadka', price: 550, isVeg: true, img: 'paneer', desc: 'Stuffed paneer sandwiches simmered in an ultra-rich saffron and dry-fruit shahi gravy.', prep: 18, cal: 540, tags: ['High Protein', 'Rich Calcium'] },
  { id: 'rnh-t36', name: 'Shahi Malai Kofta', category: 'Hills Tadka', price: 550, isVeg: true, img: 'paneer', desc: 'Melt-in-mouth paneer and dry-fruit kofta dumplings served in silky white-gold shahi gravy.', prep: 18, cal: 550, tags: ['Rich Calcium'] },
  // Page 5 Veg (Soya Chaap & Mushroom)
  { id: 'rnh-t37', name: 'Soya Chaap Masala', category: 'Hills Tadka', price: 110, fullPrice: 180, isVeg: true, img: 'chaap', desc: 'Tender protein-packed soya chaap chunks simmered in rich onion-tomato masala gravy.', prep: 14, cal: 350, tags: ['High Protein', 'Low Carb'], popular: true },
  { id: 'rnh-t38', name: 'Malai Chaap', category: 'Hills Tadka', price: 170, fullPrice: 270, isVeg: true, img: 'chaap', desc: 'Succulent soya chaap tossed in creamy cashew, cream, and white pepper gravy.', prep: 15, cal: 420, tags: ['High Protein'] },
  { id: 'rnh-t39', name: 'Shahi Chaap', category: 'Hills Tadka', price: 160, fullPrice: 260, isVeg: true, img: 'chaap', desc: 'Soft soya chaap cooked in mildly spiced royal tomato-butter shahi gravy.', prep: 15, cal: 410, tags: ['High Protein'] },
  { id: 'rnh-t40', name: 'Chaap Do Pyaza', category: 'Hills Tadka', price: 130, fullPrice: 230, isVeg: true, img: 'chaap', desc: 'Flavorful soya chaap tossed with double caramelized onions and roasted Indian spices.', prep: 14, cal: 370, tags: ['High Protein'] },
  { id: 'rnh-t41', name: 'Achari Chaap', category: 'Hills Tadka', price: 160, fullPrice: 260, isVeg: true, img: 'chaap', desc: 'Tangy North Indian pickle-spiced soya chaap cooked to perfection.', prep: 15, cal: 380, tags: ['High Protein'] },
  { id: 'rnh-t42', name: 'Kadai Chaap', category: 'Hills Tadka', price: 150, fullPrice: 260, isVeg: true, img: 'chaap', desc: 'Soya chaap stir-cooked with capsicum, onions, and coarsely crushed kadai spices.', prep: 15, cal: 375, tags: ['High Protein'] },
  { id: 'rnh-t43', name: 'Matar Mushroom', category: 'Hills Tadka', price: 140, fullPrice: 240, isVeg: true, img: 'sabzi', desc: 'Fresh button mushrooms and green peas simmered in spiced onion-tomato gravy.', prep: 14, cal: 290, tags: ['Low Carb', 'High Fiber'] },
  { id: 'rnh-t44', name: 'Masala Mushroom', category: 'Hills Tadka', price: 160, fullPrice: 260, isVeg: true, img: 'sabzi', desc: 'Juicy button mushrooms coated in thick, aromatic dhaba-style masala.', prep: 14, cal: 310, tags: ['Low Carb', 'High Fiber'] },
  { id: 'rnh-t45', name: 'Mushroom Do Pyaza', category: 'Hills Tadka', price: 180, fullPrice: 280, isVeg: true, img: 'sabzi', desc: 'Button mushrooms sautéed with double onions, tomatoes, and fresh ground spices.', prep: 14, cal: 320, tags: ['Low Carb', 'High Fiber'] },
  { id: 'rnh-t46', name: 'Handi Mushroom', category: 'Hills Tadka', price: 150, fullPrice: 250, isVeg: true, img: 'sabzi', desc: 'Slow-cooked creamy mushroom curry finished with roasted spices and herbs.', prep: 15, cal: 340, tags: ['Low Carb'] },
  { id: 'rnh-t47', name: 'Mushroom Butter Masala', category: 'Hills Tadka', price: 170, fullPrice: 270, isVeg: true, img: 'sabzi', desc: 'Tender mushrooms bathed in velvety butter-tomato makhani sauce.', prep: 15, cal: 370, tags: ['Low Carb'] },
  { id: 'rnh-t48', name: 'Kadai Mushroom', category: 'Hills Tadka', price: 150, fullPrice: 250, isVeg: true, img: 'sabzi', desc: 'Mushrooms and crunchy bell peppers tossed in spicy freshly roasted kadai masala.', prep: 14, cal: 310, tags: ['Low Carb', 'High Fiber'] },
  { id: 'rnh-t49', name: 'Mushroom Kolhapuri', category: 'Hills Tadka', price: 170, fullPrice: 270, isVeg: true, img: 'sabzi', desc: 'Bold and fiery Kolhapuri spiced mushroom curry.', prep: 15, cal: 330, tags: ['Low Carb'] },
  // Page 5 Non-Veg (Chicken)
  { id: 'rnh-t50', name: 'Kadai Chicken', category: 'Hills Tadka', price: 200, fullPrice: 300, isVeg: false, img: 'chickenCurry', desc: 'Bone-in tender chicken cooked with capsicum, onions, and freshly pounded kadai spices.', prep: 16, cal: 460, tags: ['High Protein', 'Low Carb'], popular: true },
  { id: 'rnh-t51', name: 'Butter Chicken', category: 'Hills Tadka', price: 220, fullPrice: 360, isVeg: false, img: 'butterChicken', desc: 'Tandoor-charred chicken simmered in rich, silky tomato-butter makhani gravy.', prep: 16, cal: 510, tags: ['High Protein'], popular: true, featured: true },
  { id: 'rnh-t52', name: 'Chicken Curry', category: 'Hills Tadka', price: 170, fullPrice: 270, isVeg: false, img: 'chickenCurry', desc: 'Classic North Indian chicken curry slow-simmered in aromatic whole-spice gravy.', prep: 15, cal: 430, tags: ['High Protein', 'Low Carb'], popular: true },
  { id: 'rnh-t53', name: 'Chicken Home Style', category: 'Hills Tadka', price: 170, fullPrice: 270, isVeg: false, img: 'chickenCurry', desc: 'Light, comforting homestyle chicken gravy cooked with ginger, garlic, and desi masalas.', prep: 15, cal: 410, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-t54', name: 'Handi Chicken', category: 'Hills Tadka', price: 180, fullPrice: 280, isVeg: false, img: 'chickenCurry', desc: 'Slow-braised handi chicken infused with roasted spices, yogurt, and fresh coriander.', prep: 16, cal: 450, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-t55', name: 'Chicken Masala', category: 'Hills Tadka', price: 180, fullPrice: 280, isVeg: false, img: 'chickenCurry', desc: 'Succulent chicken pieces coated in thick, richly spiced onion-tomato bhuna masala.', prep: 16, cal: 460, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-t56', name: 'Chicken Do Pyaza', category: 'Hills Tadka', price: 220, fullPrice: 320, isVeg: false, img: 'chickenCurry', desc: 'Juicy chicken cooked with generous double onions and warming whole spices.', prep: 16, cal: 450, tags: ['High Protein'] },
  { id: 'rnh-t57', name: 'Shahi Chicken', category: 'Hills Tadka', price: 250, fullPrice: 350, isVeg: false, img: 'butterChicken', desc: 'Royal Mughlai-inspired chicken simmered in creamy cashew and cardamom gravy.', prep: 18, cal: 520, tags: ['High Protein'] },
  { id: 'rnh-t58', name: 'Chicken 65', category: 'Hills Tadka', price: 460, isVeg: false, img: 'friedChicken', desc: 'Crisp deep-fried spicy boneless chicken tossed with curry leaves and green chillies.', prep: 16, cal: 510, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-t59', name: 'Chicken Kolhapuri', category: 'Hills Tadka', price: 280, fullPrice: 380, isVeg: false, img: 'chickenCurry', desc: 'Fiery red Kolhapuri chicken curry spiced with roasted chillies and traditional masala.', prep: 16, cal: 470, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-t60', name: 'Chicken Rada', category: 'Hills Tadka', price: 260, fullPrice: 360, isVeg: false, img: 'chickenCurry', desc: 'Punjabi signature dish combining chicken pieces and spiced minced chicken keema gravy.', prep: 18, cal: 530, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-t61', name: 'Chicken Changezi', category: 'Hills Tadka', price: 240, fullPrice: 360, isVeg: false, img: 'butterChicken', desc: 'Old Delhi-style tangy, creamy roasted chicken simmered in rich spiced tomato gravy.', prep: 18, cal: 520, tags: ['High Protein'] },
  { id: 'rnh-t62', name: 'Bengali Chicken', category: 'Hills Tadka', price: 240, fullPrice: 380, isVeg: false, img: 'chickenCurry', desc: 'Aromatic mustard-oil and whole-spice Bengali kosha style slow-cooked chicken.', prep: 18, cal: 460, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-t63', name: 'Pahadi Chicken', category: 'Hills Tadka', price: 250, fullPrice: 360, isVeg: false, img: 'chickenCurry', desc: 'Uttarakhand hills specialty chicken simmered with mountain herbs and rustic spices.', prep: 18, cal: 450, tags: ['High Protein', 'Low Carb'], popular: true },
  { id: 'rnh-t64', name: 'Chicken Latpata', category: 'Hills Tadka', price: 220, fullPrice: 340, isVeg: false, img: 'chickenCurry', desc: 'Thick semi-dry tangy and spicy masala-coated chicken pieces.', prep: 16, cal: 470, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-t65', name: 'Rogan Chicken', category: 'Hills Tadka', price: 200, fullPrice: 320, isVeg: false, img: 'chickenCurry', desc: 'Slow-cooked Kashmiri rogan josh style chicken in vibrant aromatic red gravy.', prep: 18, cal: 460, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-t66', name: 'Pepper Chicken', category: 'Hills Tadka', price: 180, fullPrice: 320, isVeg: false, img: 'chickenCurry', desc: 'Tender chicken sautéed in freshly cracked black pepper, curry leaves, and garlic.', prep: 15, cal: 420, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-t67', name: 'Chicken Kaali Mirch', category: 'Hills Tadka', price: 320, fullPrice: 470, isVeg: false, img: 'butterChicken', desc: 'Creamy white cashew-yogurt chicken infused generously with crushed black pepper.', prep: 18, cal: 510, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-t68', name: 'Lemon Chicken', category: 'Hills Tadka', price: 200, fullPrice: 300, isVeg: false, img: 'chickenCurry', desc: 'Zesty pan-seared chicken glazed in fresh lemon juice, herbs, and mild pepper sauce.', prep: 15, cal: 410, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-t69', name: 'Chicken Keema', category: 'Hills Tadka', price: 240, fullPrice: 340, isVeg: false, img: 'chickenCurry', desc: 'Finely minced spiced chicken slow-cooked with ginger, green peas, and garam masala.', prep: 16, cal: 480, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-t70', name: 'Chicken Mughlai', category: 'Hills Tadka', price: 650, isVeg: false, img: 'butterChicken', desc: 'Grand royal platter of tender chicken cooked in saffron, almond, and creamy Mughlai sauce.', prep: 20, cal: 640, tags: ['High Protein'] },
  // Page 6 Top: Egg Curry (8 items)
  { id: 'rnh-t71', name: 'Egg Curry', category: 'Hills Tadka', price: 180, isVeg: false, img: 'eggCurry', desc: 'Pan-seared boiled eggs simmered in homestyle spiced onion-tomato curry.', prep: 12, cal: 340, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-t72', name: 'Kadai Egg Curry', category: 'Hills Tadka', price: 220, isVeg: false, img: 'eggCurry', desc: 'Boiled eggs tossed with capsicum, onions, and freshly ground kadai masala.', prep: 14, cal: 360, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-t73', name: 'Handi Egg Curry', category: 'Hills Tadka', price: 220, isVeg: false, img: 'eggCurry', desc: 'Slow-cooked creamy spiced egg curry finished with roasted cumin and herbs.', prep: 14, cal: 370, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-t74', name: 'Masala Egg Curry', category: 'Hills Tadka', price: 250, isVeg: false, img: 'eggCurry', desc: 'Rich dhaba-style bhuna masala curry with golden-fried boiled eggs.', prep: 14, cal: 380, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-t75', name: 'Kolhapuri Egg Curry', category: 'Hills Tadka', price: 270, isVeg: false, img: 'eggCurry', desc: 'Fiery Kolhapuri spiced gravy paired with simmered boiled eggs.', prep: 14, cal: 380, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-t76', name: 'Egg Curry Do Pyaza', category: 'Hills Tadka', price: 220, isVeg: false, img: 'eggCurry', desc: 'Boiled eggs cooked in savory gravy with double caramelized and diced onions.', prep: 14, cal: 360, tags: ['High Protein'] },
  { id: 'rnh-t77', name: 'Bengali Egg Curry', category: 'Hills Tadka', price: 280, isVeg: false, img: 'eggCurry', desc: 'Traditional Bengali dimer dalna cooked with light spices and potatoes.', prep: 15, cal: 390, tags: ['High Protein'] },
  { id: 'rnh-t78', name: 'Rogan Egg Curry', category: 'Hills Tadka', price: 300, isVeg: false, img: 'eggCurry', desc: 'Kashmiri rogan-spiced vibrant red curry simmered with farm eggs.', prep: 15, cal: 390, tags: ['High Protein', 'Low Carb'] },

  // ==========================================
  // PAGE 6 MIDDLE: SALAD & RAITA (7 items)
  // ==========================================
  { id: 'rnh-sr1', name: 'Green Salad', category: 'Salad & Raita', price: 70, isVeg: true, img: 'salad', desc: 'Freshly sliced cucumber, tomato, carrot, onion, and lemon wedges with chaat masala.', prep: 5, cal: 65, tags: ['Low Calorie', 'Low Carb', 'High Fiber'] },
  { id: 'rnh-sr2', name: 'Cucumber Salad', category: 'Salad & Raita', price: 70, isVeg: true, img: 'salad', desc: 'Crisp chilled cucumber slices tossed with black salt, mint, and fresh lemon juice.', prep: 5, cal: 45, tags: ['Low Calorie', 'Low Carb', 'Low Fat'] },
  { id: 'rnh-sr3', name: 'Lachchha Onion', category: 'Salad & Raita', price: 70, isVeg: true, img: 'salad', desc: 'Crunchy red onion rings tossed in tangy lemon juice, green chilli, and Kashmiri spice.', prep: 5, cal: 55, tags: ['Low Calorie', 'Low Carb'] },
  { id: 'rnh-sr4', name: 'Carrot & Radish Salad', category: 'Salad & Raita', price: 70, isVeg: true, img: 'salad', desc: 'Fresh crunchy seasonal carrot and radish batons dusted with roasted jeera.', prep: 5, cal: 60, tags: ['Low Calorie', 'High Fiber'] },
  { id: 'rnh-sr5', name: 'Mix Raita', category: 'Salad & Raita', price: 80, isVeg: true, img: 'raita', desc: 'Chilled whipped curd blended with finely chopped cucumber, tomato, onion, and cumin.', prep: 5, cal: 130, tags: ['Probiotic', 'Rich Calcium', 'Low Carb'] },
  { id: 'rnh-sr6', name: 'Boondi Raita', category: 'Salad & Raita', price: 70, isVeg: true, img: 'raita', desc: 'Creamy spiced yogurt topped with crisp gram-flour boondi and roasted cumin powder.', prep: 5, cal: 150, tags: ['Probiotic', 'Rich Calcium'] },
  { id: 'rnh-sr7', name: 'Cucumber Raita', category: 'Salad & Raita', price: 80, isVeg: true, img: 'raita', desc: 'Refreshing grated cucumber folded into cool seasoned curd with mint.', prep: 5, cal: 120, tags: ['Probiotic', 'Low Carb', 'Low Calorie'] },

  // ==========================================
  // PAGE 6 BOTTOM: KOYLE KI KHAN SE (10 items)
  // ==========================================
  { id: 'rnh-k1', name: 'Paneer Tikka', category: 'Koyle ki Khan se', price: 280, isVeg: true, img: 'tikka', desc: 'Charcoal-grilled cottage cheese cubes marinated in spiced hung curd, served with mint chutney.', prep: 16, cal: 390, tags: ['High Protein', 'Low Carb'], popular: true },
  { id: 'rnh-k2', name: 'Mushroom Tikka', category: 'Koyle ki Khan se', price: 260, isVeg: true, img: 'tikka', desc: 'Smoky tandoor-roasted button mushrooms marinated in aromatic spices and peppers.', prep: 15, cal: 280, tags: ['Low Carb', 'High Fiber'] },
  { id: 'rnh-k3', name: 'Paneer Malai Tikka', category: 'Koyle ki Khan se', price: 320, isVeg: true, img: 'tikka', desc: 'Melt-in-mouth paneer marinated in cream, cashew paste, and cardamom, roasted over charcoal.', prep: 16, cal: 440, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-k4', name: 'Paneer Achari Tikka', category: 'Koyle ki Khan se', price: 300, isVeg: true, img: 'tikka', desc: 'Tangy pickle-spiced paneer skewers charred in the clay tandoor.', prep: 16, cal: 400, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-k5', name: 'Tandoori Chaap', category: 'Koyle ki Khan se', price: 250, isVeg: true, img: 'chaap', desc: 'Smoky flame-roasted soya chaap tossed in butter, chaat masala, and fresh cream.', prep: 15, cal: 370, tags: ['High Protein', 'Low Carb'], popular: true },
  { id: 'rnh-k6', name: 'Chicken Tikka', category: 'Koyle ki Khan se', price: 350, isVeg: false, img: 'tikka', desc: 'Boneless succulent chicken chunks marinated in fiery tandoori spices and roasted over coals.', prep: 18, cal: 410, tags: ['High Protein', 'Low Carb'], popular: true },
  { id: 'rnh-k7', name: 'Chicken Malai Tikka', category: 'Koyle ki Khan se', price: 440, isVeg: false, img: 'tikka', desc: 'Creamy, delicately spiced boneless chicken morsels roasted tender in the tandoor.', prep: 18, cal: 460, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-k8', name: 'Afgani Chicken', category: 'Koyle ki Khan se', price: 480, isVeg: false, img: 'tandooriChicken', desc: 'Rich cashew-cream and black pepper marinated chicken grilled smoky over charcoal.', prep: 20, cal: 520, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-k9', name: 'Achari Chicken Tikka', category: 'Koyle ki Khan se', price: 460, isVeg: false, img: 'tikka', desc: 'Zesty pickle-marinated boneless chicken tikka straight from the charcoal tandoor.', prep: 18, cal: 430, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-k10', name: 'Tandoori Chicken', category: 'Koyle ki Khan se', price: 350, fullPrice: 450, isVeg: false, img: 'tandooriChicken', desc: 'Iconic bone-in chicken marinated in hung curd and red chilli, charred smoky over coal.', prep: 20, cal: 490, tags: ['High Protein', 'Low Carb'], popular: true },

  // ==========================================
  // PAGE 7 TOP: BREAD BASKET (18 items)
  // ==========================================
  { id: 'rnh-br1', name: 'Tawa Roti', category: 'Bread Basket', price: 10, isVeg: true, img: 'roti', desc: 'Soft, fresh whole-wheat phulka cooked hot on an iron tawa.', prep: 4, cal: 85, tags: ['Low Fat', 'High Fiber'] },
  { id: 'rnh-br2', name: 'Butter Roti', category: 'Bread Basket', price: 12, isVeg: true, img: 'roti', desc: 'Warm whole-wheat tawa roti brushed generously with melted butter.', prep: 4, cal: 115, tags: ['High Fiber'] },
  { id: 'rnh-br3', name: 'Ghee Roti', category: 'Bread Basket', price: 15, isVeg: true, img: 'roti', desc: 'Fresh tawa roti topped with pure aromatic desi ghee.', prep: 4, cal: 125, tags: ['High Fiber'] },
  { id: 'rnh-br4', name: 'Tandoori Roti', category: 'Bread Basket', price: 15, isVeg: true, img: 'roti', desc: 'Crisp-edged smoky whole-wheat roti baked fresh on clay tandoor walls.', prep: 5, cal: 110, tags: ['Low Fat', 'High Fiber'] },
  { id: 'rnh-br5', name: 'Plain Naan', category: 'Bread Basket', price: 30, isVeg: true, img: 'naan', desc: 'Soft leavened tandoori flatbread baked bubbly and golden.', prep: 6, cal: 210, tags: ['Quick Energy'] },
  { id: 'rnh-br6', name: 'Butter Naan', category: 'Bread Basket', price: 40, isVeg: true, img: 'naan', desc: 'Pillowy tandoor-baked naan finished with melted salted butter.', prep: 6, cal: 250, tags: ['Comfort Food'], popular: true },
  { id: 'rnh-br7', name: 'Garlic Butter Naan', category: 'Bread Basket', price: 50, isVeg: true, img: 'naan', desc: 'Aromatic tandoori naan topped with minced roasted garlic, coriander, and butter.', prep: 6, cal: 265, tags: ['Student Fav'], popular: true },
  { id: 'rnh-br8', name: 'Cheese Naan', category: 'Bread Basket', price: 80, isVeg: true, img: 'naan', desc: 'Warm tandoori naan stuffed with melted spiced mozzarella and cheddar.', prep: 8, cal: 340, tags: ['Rich Calcium'] },
  { id: 'rnh-br9', name: 'Stuffed Naan', category: 'Bread Basket', price: 80, isVeg: true, img: 'naan', desc: 'Crisp tandoori naan stuffed with spiced mashed potato, paneer, and herbs.', prep: 8, cal: 330, tags: ['Balanced Meal'] },
  { id: 'rnh-br10', name: 'Churchur Naan', category: 'Bread Basket', price: 85, isVeg: true, img: 'naan', desc: 'Flaky, crushed buttery layered naan stuffed with spiced filling and baked crisp.', prep: 8, cal: 380, tags: ['Comfort Food'] },
  { id: 'rnh-br11', name: 'Plain Paratha', category: 'Bread Basket', price: 20, isVeg: true, img: 'paratha', desc: 'Layered whole-wheat triangular paratha pan-cooked golden.', prep: 6, cal: 180, tags: ['High Fiber'] },
  { id: 'rnh-br12', name: 'Lachchha Paratha', category: 'Bread Basket', price: 35, isVeg: true, img: 'paratha', desc: 'Multi-layered flaky whole-wheat paratha brushed with butter.', prep: 7, cal: 240, tags: ['High Fiber'] },
  { id: 'rnh-br13', name: 'Maida Plain Paratha', category: 'Bread Basket', price: 30, isVeg: true, img: 'paratha', desc: 'Soft flaky refined-flour paratha griddled crisp on the tawa.', prep: 6, cal: 210, tags: ['Quick Energy'] },
  { id: 'rnh-br14', name: 'Maida Lachchha Paratha', category: 'Bread Basket', price: 50, isVeg: true, img: 'paratha', desc: 'Crisp multi-layered flaky maida paratha ideal with rich curries.', prep: 7, cal: 270, tags: ['Quick Energy'] },
  { id: 'rnh-br15', name: 'Tandoori Lachchha Paratha', category: 'Bread Basket', price: 70, isVeg: true, img: 'naan', desc: 'Smoky clay-oven baked crisp flaky layered paratha finished with butter.', prep: 8, cal: 290, tags: ['Comfort Food'] },
  { id: 'rnh-br16', name: 'Rumaali Roti', category: 'Bread Basket', price: 50, isVeg: true, img: 'roti', desc: 'Paper-thin handkerchief-soft roti cooked over an inverted kadai.', prep: 6, cal: 160, tags: ['Low Fat'] },
  { id: 'rnh-br17', name: 'Rumali Paratha', category: 'Bread Basket', price: 70, isVeg: true, img: 'roti', desc: 'Thin folded buttery rumali-style flaky paratha.', prep: 7, cal: 230, tags: ['Quick Energy'] },
  { id: 'rnh-br18', name: 'Poori', category: 'Bread Basket', price: 12, isVeg: true, img: 'roti', desc: 'Golden puffed deep-fried whole-wheat bread served hot.', prep: 5, cal: 130, tags: ['Quick Energy'] },

  // ==========================================
  // PAGE 7 BOTTOM: HILLS APPETIZER (11 items)
  // ==========================================
  { id: 'rnh-a1', name: 'Paneer Pakoda (8 Pcs.)', category: 'Hills Appetizer', price: 220, isVeg: true, img: 'pakoda', desc: 'Eight thick spiced cottage cheese slices dipped in seasoned besan batter and fried crisp.', prep: 12, cal: 460, tags: ['High Protein', 'Rich Calcium'] },
  { id: 'rnh-a2', name: 'Onion Pakoda', category: 'Hills Appetizer', price: 120, isVeg: true, img: 'pakoda', desc: 'Crunchy golden onion fritters spiced with carom seeds and coriander, served with chutney.', prep: 10, cal: 320, tags: ['Student Fav'] },
  { id: 'rnh-a3', name: 'Gobhi Pakoda', category: 'Hills Appetizer', price: 110, isVeg: true, img: 'pakoda', desc: 'Crispy besan-coated spiced cauliflower florets served piping hot.', prep: 10, cal: 300, tags: ['High Fiber'] },
  { id: 'rnh-a4', name: 'Aalu Pakoda', category: 'Hills Appetizer', price: 80, isVeg: true, img: 'pakoda', desc: 'Classic crisp potato slice fritters dusted with tangy chaat masala.', prep: 10, cal: 310, tags: ['Quick Energy'] },
  { id: 'rnh-a5', name: 'Mix Pakoda', category: 'Hills Appetizer', price: 150, isVeg: true, img: 'pakoda', desc: 'Assorted platter of crispy potato, onion, cauliflower, and paneer pakodas with mint chutney.', prep: 12, cal: 390, tags: ['Student Fav'], popular: true },
  { id: 'rnh-a6', name: 'Aalu Pyaj Pakoda', category: 'Hills Appetizer', price: 100, isVeg: true, img: 'pakoda', desc: 'Crunchy spiced potato and onion fritters perfect with evening masala chai.', prep: 10, cal: 320, tags: ['Quick Energy'] },
  { id: 'rnh-a7', name: 'Bhajiya', category: 'Hills Appetizer', price: 140, isVeg: true, img: 'pakoda', desc: 'Crisp homestyle spiced gram-flour fritters served with green chutney and ketchup.', prep: 10, cal: 340, tags: ['Comfort Food'] },
  { id: 'rnh-a8', name: 'Chicken Pakoda (8 Pcs.)', category: 'Hills Appetizer', price: 260, isVeg: false, img: 'friedChicken', desc: 'Eight tender marinated boneless chicken bites fried crisp in spiced besan coating.', prep: 14, cal: 470, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-a9', name: 'Fish Pakoda (8 Pcs.)', category: 'Hills Appetizer', price: 260, isVeg: false, img: 'friedChicken', desc: 'Eight Amritsari-style ajwain spiced crisp fish fritters served with mint dip.', prep: 14, cal: 430, tags: ['High Protein', 'Low Carb'] },
  { id: 'rnh-a10', name: 'KFC Chicken', category: 'Hills Appetizer', price: 400, isVeg: false, img: 'friedChicken', desc: 'Extra-crunchy double-breaded golden spiced fried chicken bucket pieces.', prep: 16, cal: 580, tags: ['High Protein'] },
  { id: 'rnh-a11', name: 'Fried Chicken', category: 'Hills Appetizer', price: 320, isVeg: false, img: 'friedChicken', desc: 'Juicy desi-spiced crispy fried chicken pieces served with tangy house sauce.', prep: 15, cal: 520, tags: ['High Protein', 'Low Carb'] },

  // ==========================================
  // PAGE 8 TOP: PASTA, SANDWICHES & BURGERS (13 items)
  // ==========================================
  { id: 'rnh-p1', name: 'Desi Pasta', category: 'Pasta, Sandwiches & Burgers', price: 100, isVeg: true, img: 'pasta', desc: 'Penne pasta tossed in spicy Indian-style onion-tomato masala with crunchy veggies.', prep: 12, cal: 370, tags: ['Quick Energy', 'Student Fav'] },
  { id: 'rnh-p2', name: 'White Sauce Pasta', category: 'Pasta, Sandwiches & Burgers', price: 120, isVeg: true, img: 'pasta', desc: 'Creamy cheesy Alfredo-style pasta with sweet corn, capsicum, oregano, and chilli flakes.', prep: 12, cal: 440, tags: ['Rich Calcium', 'Student Fav'], popular: true },
  { id: 'rnh-p3', name: 'Red Sauce Pasta', category: 'Pasta, Sandwiches & Burgers', price: 120, isVeg: true, img: 'pasta', desc: 'Zesty Arrabbiata tomato-basil pasta tossed with garlic, herbs, and fresh vegetables.', prep: 12, cal: 360, tags: ['Low Fat'] },
  { id: 'rnh-p4', name: 'Mix Sauce Pasta', category: 'Pasta, Sandwiches & Burgers', price: 140, isVeg: true, img: 'pasta', desc: 'Best of both worlds — velvety pink sauce blending rich cream and tangy tomato herbs.', prep: 12, cal: 420, tags: ['Rich Calcium'], popular: true },
  { id: 'rnh-p5', name: 'Veg. Sandwich', category: 'Pasta, Sandwiches & Burgers', price: 80, isVeg: true, img: 'sandwich', desc: 'Crisp grilled sandwich packed with cucumber, tomato, spiced potato, and mint chutney.', prep: 8, cal: 290, tags: ['High Fiber'] },
  { id: 'rnh-p6', name: 'Veg. Cheese Sandwich', category: 'Pasta, Sandwiches & Burgers', price: 100, isVeg: true, img: 'sandwich', desc: 'Golden toasted vegetable sandwich loaded with melted mozzarella and cheddar cheese.', prep: 8, cal: 360, tags: ['Rich Calcium'] },
  { id: 'rnh-p7', name: 'Chicken Sandwich', category: 'Pasta, Sandwiches & Burgers', price: 140, isVeg: false, img: 'sandwich', desc: 'Grilled sandwich generously filled with spiced pulled chicken, mayo, and crisp veggies.', prep: 10, cal: 400, tags: ['High Protein'] },
  { id: 'rnh-p8', name: 'Paneer Sandwich', category: 'Pasta, Sandwiches & Burgers', price: 120, isVeg: true, img: 'sandwich', desc: 'Toasted sandwich stuffed with marinated spiced paneer, onions, and tangy chutney.', prep: 10, cal: 380, tags: ['High Protein', 'Rich Calcium'] },
  { id: 'rnh-p9', name: 'Chicken Cheese Sandwich', category: 'Pasta, Sandwiches & Burgers', price: 150, isVeg: false, img: 'sandwich', desc: 'Loaded grilled chicken sandwich oozing with melted cheese and herbs.', prep: 10, cal: 450, tags: ['High Protein'] },
  { id: 'rnh-p10', name: 'Paneer Cheese Sandwich', category: 'Pasta, Sandwiches & Burgers', price: 130, isVeg: true, img: 'sandwich', desc: 'Rich toasted paneer sandwich layered with melted cheese and bell peppers.', prep: 10, cal: 430, tags: ['High Protein', 'Rich Calcium'] },
  { id: 'rnh-p11', name: 'Veg. Burger', category: 'Pasta, Sandwiches & Burgers', price: 60, isVeg: true, img: 'burger', desc: 'Crispy herb-potato patty tucked in a toasted bun with lettuce, onion, and creamy mayo.', prep: 8, cal: 340, tags: ['Student Fav'], popular: true },
  { id: 'rnh-p12', name: 'Paneer Burger', category: 'Pasta, Sandwiches & Burgers', price: 80, isVeg: true, img: 'burger', desc: 'Crunchy spiced paneer patty burger topped with fresh veggies and tandoori mayo.', prep: 10, cal: 410, tags: ['High Protein'] },
  { id: 'rnh-p13', name: 'Chicken Burger', category: 'Pasta, Sandwiches & Burgers', price: 120, isVeg: false, img: 'burger', desc: 'Crispy golden chicken fillet burger with fresh veggies and smoky burger sauce.', prep: 10, cal: 450, tags: ['High Protein'] },

  // ==========================================
  // PAGE 8 BOTTOM: ROLLS & KATHI ROLLS (13 items)
  // ==========================================
  { id: 'rnh-rl1', name: 'Veg. Spring Roll', category: 'Rolls & Kathi Rolls', price: 100, isVeg: true, img: 'springRoll', desc: 'Crisp golden pastry rolls stuffed with wok-tossed noodles and veggies, served with dip.', prep: 10, cal: 340, tags: ['Quick Energy'] },
  { id: 'rnh-rl2', name: 'Veg. Roll', category: 'Rolls & Kathi Rolls', price: 80, fullPrice: 110, portionLabels: ['Single', 'Double'], isVeg: true, img: 'roll', desc: 'Flaky paratha wrapped around spiced sautéed veggies, crunchy onions, and mint chutney.', prep: 10, cal: 330, tags: ['High Fiber', 'Grab & Go'] },
  { id: 'rnh-rl3', name: 'Egg Roll', category: 'Rolls & Kathi Rolls', price: 100, fullPrice: 120, portionLabels: ['Single', 'Double'], isVeg: false, img: 'roll', desc: 'Street-style egg-layered paratha roll packed with tangy onions and house sauces.', prep: 10, cal: 390, tags: ['High Protein', 'Grab & Go'], popular: true },
  { id: 'rnh-rl4', name: 'Egg Bhurji Roll', category: 'Rolls & Kathi Rolls', price: 150, fullPrice: 170, portionLabels: ['Single', 'Double'], isVeg: false, img: 'roll', desc: 'Loaded Kathi roll stuffed with spicy masala egg bhurji and zesty mint mayo.', prep: 10, cal: 430, tags: ['High Protein'] },
  { id: 'rnh-rl5', name: 'Paneer Roll', category: 'Rolls & Kathi Rolls', price: 120, fullPrice: 140, portionLabels: ['Single', 'Double'], isVeg: true, img: 'roll', desc: 'Warm flaky paratha filled with spiced paneer cubes, peppers, and tangy chutney.', prep: 10, cal: 420, tags: ['High Protein', 'Grab & Go'], popular: true },
  { id: 'rnh-rl6', name: 'Paneer Bhurji Roll', category: 'Rolls & Kathi Rolls', price: 140, fullPrice: 180, portionLabels: ['Single', 'Double'], isVeg: true, img: 'roll', desc: 'Generously stuffed with spiced crumbled paneer bhurji and crunchy lachha onions.', prep: 12, cal: 450, tags: ['High Protein'] },
  { id: 'rnh-rl7', name: 'Chicken Roll', category: 'Rolls & Kathi Rolls', price: 120, fullPrice: 140, portionLabels: ['Single', 'Double'], isVeg: false, img: 'roll', desc: 'Juicy spiced chicken chunks wrapped in crispy paratha with house chutney.', prep: 12, cal: 450, tags: ['High Protein', 'Grab & Go'], popular: true },
  { id: 'rnh-rl8', name: 'Achari Veg. Roll', category: 'Rolls & Kathi Rolls', price: 90, fullPrice: 110, portionLabels: ['Single', 'Double'], isVeg: true, img: 'roll', desc: 'Tangy achari-marinated vegetables wrapped in flaky paratha with crisp onions.', prep: 10, cal: 350, tags: ['High Fiber'] },
  { id: 'rnh-rl9', name: 'Achari Chicken Roll', category: 'Rolls & Kathi Rolls', price: 130, fullPrice: 150, portionLabels: ['Single', 'Double'], isVeg: false, img: 'roll', desc: 'Pickle-spiced succulent chicken wrapped hot inside a soft Kathi paratha.', prep: 12, cal: 460, tags: ['High Protein'] },
  { id: 'rnh-rl10', name: 'Achari Paneer Roll', category: 'Rolls & Kathi Rolls', price: 130, fullPrice: 150, portionLabels: ['Single', 'Double'], isVeg: true, img: 'roll', desc: 'Zesty achari-marinated paneer tikka rolled with onions and mint sauce.', prep: 12, cal: 440, tags: ['High Protein'] },
  { id: 'rnh-rl11', name: 'Tandoori Veg. Roll', category: 'Rolls & Kathi Rolls', price: 90, fullPrice: 110, portionLabels: ['Single', 'Double'], isVeg: true, img: 'roll', desc: 'Smoky tandoori-spiced veggies and creamy mayo wrapped in a crispy paratha.', prep: 10, cal: 360, tags: ['High Fiber'] },
  { id: 'rnh-rl12', name: 'Tandoori Chicken Roll', category: 'Rolls & Kathi Rolls', price: 130, fullPrice: 150, portionLabels: ['Single', 'Double'], isVeg: false, img: 'roll', desc: 'Char-grilled smoky chicken tikka wrapped in paratha with spicy mint dip.', prep: 12, cal: 470, tags: ['High Protein'] },
  { id: 'rnh-rl13', name: 'Tandoori Paneer Roll', category: 'Rolls & Kathi Rolls', price: 130, fullPrice: 150, portionLabels: ['Single', 'Double'], isVeg: true, img: 'roll', desc: 'Smoky clay-oven roasted paneer tikka wrapped in a warm Kathi roll.', prep: 12, cal: 450, tags: ['High Protein'] },

  // ==========================================
  // PAGE 9: COMBOS (6 items)
  // ==========================================
  { id: 'rnh-cb1', name: 'Veg Thali Combo', category: 'Combos', price: 200, fullPrice: 340, portionLabels: ['1 Combo', '2 Combos'], isVeg: true, img: 'thali', desc: 'Paneer + Daal Makhani + 4 Butter Roti + Jeera Rice + Raita + Papad + Sweet. (Two Combos at only ₹340!)', prep: 15, cal: 680, tags: ['Balanced Meal', 'High Protein'], popular: true, featured: true },
  { id: 'rnh-cb2', name: 'Veg Chinese Combo', category: 'Combos', price: 269, fullPrice: 460, portionLabels: ['1 Combo', '2 Combos'], isVeg: true, img: 'comboChinese', desc: 'Complete Indo-Chinese feast platter for hungry students. (Two Chinese Combos at only ₹460!)', prep: 15, cal: 640, tags: ['Student Saver'] },
  { id: 'rnh-cb3', name: 'Noodles + Manchurian Combo', category: 'Combos', price: 189, isVeg: true, img: 'comboChinese', desc: 'Wok-tossed Veg Noodles paired with hot and savory Veg Manchurian gravy.', prep: 12, cal: 560, tags: ['Student Saver', 'Quick Energy'], popular: true },
  { id: 'rnh-cb4', name: 'Veg. Fried Rice + Manchurian Combo', category: 'Combos', price: 179, isVeg: true, img: 'friedRice', desc: 'Fragrant Veg Fried Rice served alongside saucy Veg Manchurian dumplings.', prep: 12, cal: 550, tags: ['Student Saver', 'Balanced Meal'], popular: true },
  { id: 'rnh-cb5', name: 'Chicken Thali Combo', category: 'Combos', price: 220, fullPrice: 400, portionLabels: ['1 Combo', '2 Combos'], isVeg: false, img: 'thali', desc: 'Chicken + 4 Butter Roti + Jeera Rice + Daal + Papad + Sweet + Salad. (Two Combos at only ₹400!)', prep: 16, cal: 720, tags: ['High Protein', 'Balanced Meal'], popular: true, featured: true },
  { id: 'rnh-cb6', name: 'Chicken Chinese Combo', category: 'Combos', price: 379, fullPrice: 650, portionLabels: ['1 Combo', '2 Combos'], isVeg: false, img: 'comboChinese', desc: 'Full non-veg Indo-Chinese combo platter loaded with chicken favorites. (Two Combos at only ₹650!)', prep: 16, cal: 740, tags: ['High Protein', 'Student Saver'] },

  // ==========================================
  // PAGE 10: PIZZA MENU (13 items — Buy Two Get One Free!)
  // ==========================================
  { id: 'rnh-pz1', name: 'Veg. Over Loaded Pizza', category: 'Pizza Menu', price: 159, isVeg: true, img: 'pizzaVeg', desc: 'Loaded with onions, capsicum, tomatoes, sweet corn, olives, and extra mozzarella. ★ Buy 2 Get 1 Free!', prep: 15, cal: 540, tags: ['Rich Calcium', 'Student Fav'], popular: true },
  { id: 'rnh-pz2', name: 'Margherita Pizza', category: 'Pizza Menu', price: 179, isVeg: true, img: 'pizzaVeg', desc: 'Classic Italian-style pizza with rich tomato basil sauce and molten mozzarella cheese. ★ Buy 2 Get 1 Free!', prep: 14, cal: 490, tags: ['Rich Calcium'] },
  { id: 'rnh-pz3', name: 'Double Cheese Burst Pizza', category: 'Pizza Menu', price: 189, isVeg: true, img: 'pizzaVeg', desc: 'Crust filled with liquid cheese and topped with double mozzarella blend. ★ Buy 2 Get 1 Free!', prep: 15, cal: 620, tags: ['Rich Calcium'], popular: true },
  { id: 'rnh-pz4', name: 'Hills Pizza', category: 'Pizza Menu', price: 169, isVeg: true, img: 'pizzaVeg', desc: 'Rush in Hill house special veggie pizza with spiced toppings and melted cheese. ★ Buy 2 Get 1 Free!', prep: 15, cal: 530, tags: ['Student Fav'] },
  { id: 'rnh-pz5', name: 'Cheese Corn Pizza', category: 'Pizza Menu', price: 159, isVeg: true, img: 'pizzaVeg', desc: 'Sweet golden corn kernels baked over tangy pizza sauce and gooey cheese. ★ Buy 2 Get 1 Free!', prep: 14, cal: 500, tags: ['Rich Calcium'] },
  { id: 'rnh-pz6', name: 'Paneer Pizza', category: 'Pizza Menu', price: 169, isVeg: true, img: 'pizzaVeg', desc: 'Topped with spiced soft paneer cubes, crunchy capsicum, and melted mozzarella. ★ Buy 2 Get 1 Free!', prep: 15, cal: 560, tags: ['High Protein', 'Rich Calcium'] },
  { id: 'rnh-pz7', name: 'Onion Corn Pizza', category: 'Pizza Menu', price: 149, isVeg: true, img: 'pizzaVeg', desc: 'Crunchy red onions and sweet corn baked with herbed cheese on a crisp base. ★ Buy 2 Get 1 Free!', prep: 14, cal: 470, tags: ['Student Fav'] },
  { id: 'rnh-pz8', name: 'Farm Fresh Pizza', category: 'Pizza Menu', price: 189, isVeg: true, img: 'pizzaVeg', desc: 'Crisp capsicum, onions, tomatoes, and mushrooms baked over cheesy herb crust. ★ Buy 2 Get 1 Free!', prep: 15, cal: 520, tags: ['High Fiber'] },
  { id: 'rnh-pz9', name: 'Chicken Over Loaded Pizza', category: 'Pizza Menu', price: 259, isVeg: false, img: 'pizzaChicken', desc: 'Packed generously with spiced chicken chunks, veggies, and molten mozzarella. ★ Buy 2 Get 1 Free!', prep: 16, cal: 630, tags: ['High Protein'], popular: true },
  { id: 'rnh-pz10', name: 'Chicken Pizza', category: 'Pizza Menu', price: 229, isVeg: false, img: 'pizzaChicken', desc: 'Classic savory roasted chicken pizza with onions and herbed cheese. ★ Buy 2 Get 1 Free!', prep: 15, cal: 580, tags: ['High Protein'] },
  { id: 'rnh-pz11', name: 'Tandoori Chicken Pizza', category: 'Pizza Menu', price: 269, isVeg: false, img: 'pizzaChicken', desc: 'Smoky tandoori chicken tikka, red onions, and tandoori drizzle on a cheesy crust. ★ Buy 2 Get 1 Free!', prep: 16, cal: 610, tags: ['High Protein'] },
  { id: 'rnh-pz12', name: 'Chicken Cheese Burst Pizza', category: 'Pizza Menu', price: 279, isVeg: false, img: 'pizzaChicken', desc: 'Liquid cheese-burst crust topped with juicy spiced chicken and double cheese. ★ Buy 2 Get 1 Free!', prep: 16, cal: 690, tags: ['High Protein', 'Rich Calcium'] },
  { id: 'rnh-pz13', name: 'Chicken Margherita Pizza', category: 'Pizza Menu', price: 279, isVeg: false, img: 'pizzaChicken', desc: 'Rich tomato-basil cheesy Margherita elevated with tender roasted chicken. ★ Buy 2 Get 1 Free!', prep: 15, cal: 590, tags: ['High Protein'] },

  // ==========================================
  // PAGE 11 TOP: BEVERAGES (18 items)
  // ==========================================
  { id: 'rnh-bv1', name: 'Hot Milk', category: 'Beverages', price: 40, isVeg: true, img: 'lassi', desc: 'Steaming glass of pure hot milk sweetened lightly to taste.', prep: 4, cal: 150, tags: ['Rich Calcium', 'High Protein'] },
  { id: 'rnh-bv2', name: 'Haldi Milk', category: 'Beverages', price: 40, isVeg: true, img: 'lassi', desc: 'Warm golden turmeric milk infused with immunity-boosting spices.', prep: 5, cal: 160, tags: ['Immunity Herbs', 'Rich Calcium'] },
  { id: 'rnh-bv3', name: 'Chai', category: 'Beverages', price: 15, isVeg: true, img: 'chai', desc: 'Classic freshly brewed hot campus cutting chai.', prep: 4, cal: 75, tags: ['Low Calorie', 'Student Fav'], popular: true },
  { id: 'rnh-bv4', name: 'Masala Chai', category: 'Beverages', price: 20, isVeg: true, img: 'chai', desc: 'Strong milk tea brewed with crushed ginger, green cardamom, and cloves.', prep: 5, cal: 85, tags: ['Immunity Herbs', 'Low Calorie'], popular: true },
  { id: 'rnh-bv5', name: 'Kulhad Chai', category: 'Beverages', price: 30, isVeg: true, img: 'chai', desc: 'Aromatic masala chai served piping hot in a traditional earthen clay kulhad.', prep: 5, cal: 95, tags: ['Immunity Herbs', 'Low Calorie'], popular: true, featured: true },
  { id: 'rnh-bv6', name: 'Tandoori Chai', category: 'Beverages', price: 40, isVeg: true, img: 'chai', desc: 'Smoky rich tea poured sizzling into a tandoor-heated clay kulhad.', prep: 6, cal: 110, tags: ['Immunity Herbs'] },
  { id: 'rnh-bv7', name: 'Lemon Tea', category: 'Beverages', price: 20, isVeg: true, img: 'shikanji', desc: 'Light refreshing black tea brewed with fresh lemon juice and mild spices.', prep: 4, cal: 45, tags: ['Low Calorie', 'Low Carb'] },
  { id: 'rnh-bv8', name: 'Lemon Green Tea', category: 'Beverages', price: 30, isVeg: true, img: 'shikanji', desc: 'Antioxidant-rich green tea brightened with a squeeze of fresh lemon.', prep: 4, cal: 20, tags: ['Low Calorie', 'Low Carb', 'Immunity Herbs'] },
  { id: 'rnh-bv9', name: 'Green Tea', category: 'Beverages', price: 25, isVeg: true, img: 'shikanji', desc: 'Pure soothing hot green tea for focus between study sessions.', prep: 4, cal: 10, tags: ['Low Calorie', 'Low Carb'] },
  { id: 'rnh-bv10', name: 'Hot Coffee', category: 'Beverages', price: 30, isVeg: true, img: 'coffee', desc: 'Rich frothy hand-beaten cafe-style hot coffee.', prep: 5, cal: 120, tags: ['Quick Energy'] },
  { id: 'rnh-bv11', name: 'Hot Chocolate Coffee', category: 'Beverages', price: 40, isVeg: true, img: 'coffee', desc: 'Velvety mocha blend of strong hot coffee and rich cocoa chocolate.', prep: 5, cal: 170, tags: ['Quick Energy'] },
  { id: 'rnh-bv12', name: 'Lassi', category: 'Beverages', price: 49, isVeg: true, img: 'lassi', desc: 'Thick chilled sweet Punjabi churned yogurt drink.', prep: 5, cal: 210, tags: ['Probiotic', 'Rich Calcium'] },
  { id: 'rnh-bv13', name: 'Kulhad Lassi', category: 'Beverages', price: 69, isVeg: true, img: 'lassi', desc: 'Creamy malai-topped sweet lassi served chilled in an earthen kulhad.', prep: 5, cal: 240, tags: ['Probiotic', 'Rich Calcium'] },
  { id: 'rnh-bv14', name: 'Dry Fruit Lassi', category: 'Beverages', price: 79, isVeg: true, img: 'lassi', desc: 'Rich chilled lassi generously garnished with chopped almonds, cashews, and pistachios.', prep: 6, cal: 290, tags: ['Probiotic', 'Rich Calcium'] },
  { id: 'rnh-bv15', name: 'Rasgulla Lassi', category: 'Beverages', price: 89, isVeg: true, img: 'lassi', desc: 'Indulgent chilled thick lassi crowned with a soft juicy rasgulla.', prep: 6, cal: 330, tags: ['Probiotic', 'Rich Calcium'] },
  { id: 'rnh-bv16', name: 'Nimbu Paani', category: 'Beverages', price: 49, isVeg: true, img: 'shikanji', desc: 'Chilled freshly squeezed lemonade with black salt and roasted cumin.', prep: 4, cal: 65, tags: ['Low Calorie', 'Low Carb', 'Vitamin C'] },
  { id: 'rnh-bv17', name: 'Nimbu Pudina Soda Shikanji', category: 'Beverages', price: 59, isVeg: true, img: 'shikanji', desc: 'Fizzy club-soda shikanji muddled with fresh mint leaves, lemon, and masala.', prep: 4, cal: 75, tags: ['Low Calorie', 'Low Carb', 'Vitamin C'] },
  { id: 'rnh-bv18', name: 'Kulhad Coffee', category: 'Beverages', price: 49, isVeg: true, img: 'coffee', desc: 'Frothy hot espresso-style coffee served steaming in an aromatic clay kulhad.', prep: 5, cal: 135, tags: ['Quick Energy'] },

  // ==========================================
  // PAGE 11 BOTTOM: SHAKES PLAZA (8 items)
  // ==========================================
  { id: 'rnh-sh1', name: 'Cold Coffee', category: 'Shakes Plaza', price: 60, isVeg: true, img: 'coldCoffee', desc: 'Chilled thick blended cafe cold coffee topped with creamy froth.', prep: 5, cal: 210, tags: ['Quick Energy', 'Student Fav'], popular: true, featured: true },
  { id: 'rnh-sh2', name: 'Choco Cold Coffee', category: 'Shakes Plaza', price: 70, isVeg: true, img: 'coldCoffee', desc: 'Thick cold coffee blended with rich chocolate syrup and cocoa drizzle.', prep: 5, cal: 250, tags: ['Quick Energy', 'Rich Calcium'], popular: true },
  { id: 'rnh-sh3', name: 'Vanilla Shake', category: 'Shakes Plaza', price: 70, isVeg: true, img: 'shake', desc: 'Smooth and creamy chilled classic vanilla ice-cream milkshake.', prep: 5, cal: 260, tags: ['Rich Calcium'] },
  { id: 'rnh-sh4', name: 'Oreo Shake', category: 'Shakes Plaza', price: 80, isVeg: true, img: 'shake', desc: 'Thick milkshake blended with crunchy Oreo cookies and chocolate swirl.', prep: 5, cal: 330, tags: ['Student Fav', 'Quick Energy'], popular: true },
  { id: 'rnh-sh5', name: 'Kit Kat Shake', category: 'Shakes Plaza', price: 80, isVeg: true, img: 'shake', desc: 'Crisp wafer chocolate Kit Kat blended into a chilled creamy milkshake.', prep: 5, cal: 340, tags: ['Student Fav'] },
  { id: 'rnh-sh6', name: 'Cadbury Shake', category: 'Shakes Plaza', price: 90, isVeg: true, img: 'shake', desc: 'Indulgent chilled Dairy Milk chocolate milkshake topped with chocolate shavings.', prep: 6, cal: 360, tags: ['Rich Calcium'] },
  { id: 'rnh-sh7', name: 'Strawberry Shake', category: 'Shakes Plaza', price: 70, isVeg: true, img: 'strawberryShake', desc: 'Refreshing chilled pink milkshake blended with sweet strawberry crush and milk.', prep: 5, cal: 270, tags: ['Rich Calcium'] },
  { id: 'rnh-sh8', name: 'Chocolate Shake', category: 'Shakes Plaza', price: 80, isVeg: true, img: 'shake', desc: 'Rich double-chocolate thick milkshake served chilled.', prep: 5, cal: 320, tags: ['Quick Energy'] },
];

export const RUSH_N_HILL_MENU_ITEMS: MenuItem[] = RAW_DISHES.map((d) => ({
  id: d.id,
  name: d.name,
  description: d.desc,
  category: d.category,
  price: d.price,
  ...(d.fullPrice !== undefined ? { fullPrice: d.fullPrice } : {}),
  ...(d.portionLabels ? { portionLabels: d.portionLabels } : {}),
  imageUrl: IMG[d.img],
  isVeg: d.isVeg,
  isAvailable: true,
  isPopular: Boolean(d.popular),
  isFeatured: Boolean(d.featured),
  preparationTimeMinutes: d.prep ?? 12,
  calories: d.cal,
  nutritionalTags: d.tags,
}));
