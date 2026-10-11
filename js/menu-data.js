// Base de datos de platillos y configuración de Yum & Fit

const RESTAURANT_CONFIG = {
  name: "Yum & Fit",
  tagline: "Healthy & Delicious",
  phoneDisplay: "098 184 0168",
  phoneWhatsApp: "593981840168",
  currency: "$"
};

const CATEGORIES = [
  { id: "all", label: "Todos los Platillos", icon: "sparkles" },
  { id: "bowls", label: "Bowls Proteicos", icon: "utensils" },
  { id: "salads", label: "Ensaladas Gourmet", icon: "leaf" },
  { id: "keto", label: "Keto & Low Carb", icon: "flame" },
  { id: "drinks", label: "Bebidas & Smoothies", icon: "cup-soda" }
];

const MENU_ITEMS = [
  {
    id: "power-steak-bowl",
    name: "Power Steak & Avocado Bowl",
    category: "bowls",
    description: "Tiras de lomo fino magro a la plancha sobre base de quinoa tricolor tibia, aguacate fresco, kale crujiente, tomates cherry y aderezo especial de la casa.",
    price: 8.99,
    calories: 540,
    protein: "42g",
    carbs: "34g",
    badge: "Plato Estrella",
    badgeColor: "gold",
    image: "Assets/images/power-steak-bowl.jpg"
  },
  {
    id: "garden-crunch-salad",
    name: "Ensalada Garden Fresh Crunch",
    category: "salads",
    description: "Mix crujiente de lechugas orgánicas, zanahorias baby ralladas, pepino europeo, tomates cherry y vinagreta cítrica emulsionada con aceite de oliva extra virgen.",
    price: 7.50,
    calories: 360,
    protein: "18g",
    carbs: "22g",
    badge: "100% Fresco",
    badgeColor: "emerald",
    image: "Assets/images/fresh-salad.jpg"
  },
  {
    id: "keto-salmon-avocado",
    name: "Salmon Grill & Aguacate Hass",
    category: "keto",
    description: "Filete de salmón rosado sellado a las finas hierbas con medio aguacate hass tierno, espinacas baby salteadas y semillas de sésamo tostadas.",
    price: 9.80,
    calories: 510,
    protein: "38g",
    carbs: "8g",
    badge: "Keto Friendly",
    badgeColor: "amber",
    image: "Assets/images/avocado-prep.jpg"
  },
  {
    id: "chicken-quinoa-power",
    name: "Pollo Grill & Quinoa Real",
    category: "bowls",
    description: "Pechuga de pollo marinada al limón y romero, quinoa andina esponjosa, brócoli al vapor, maíz tierno y crema ligera de aguacate.",
    price: 8.20,
    calories: 490,
    protein: "41g",
    carbs: "38g",
    badge: "Alto en Proteína",
    badgeColor: "emerald",
    image: "Assets/images/power-steak-bowl.jpg"
  },
  {
    id: "mediterranean-kale",
    name: "Ensalada Mediterránea con Kale",
    category: "salads",
    description: "Hojas de kale masajeado en limón, aceitunas kalamata, queso feta bajo en grasa, pepinos crujientes y vinagreta balsámica artesanal.",
    price: 7.25,
    calories: 340,
    protein: "16g",
    carbs: "20g",
    badge: "Bajo en Sodio",
    badgeColor: "emerald",
    image: "Assets/images/fresh-salad.jpg"
  },
  {
    id: "keto-beef-cauliflower",
    name: "Beef & Arroz de Coliflor",
    category: "keto",
    description: "Cortes de lomo en cubos salteados con pimientos y champiñones sobre una cama de arroz de coliflor al ajo tierno y aguacate rebanado.",
    price: 9.20,
    calories: 480,
    protein: "44g",
    carbs: "9g",
    badge: "Zero Harinas",
    badgeColor: "amber",
    image: "Assets/images/power-steak-bowl.jpg"
  },
  {
    id: "green-detox-smoothie",
    name: "Smoothie Green Detox Vitality",
    category: "drinks",
    description: "Extracto en frío de espinaca, apio, manzana verde, pepino, jengibre y toque refrescante de menta silvestre. Sin azúcares añadidos.",
    price: 3.99,
    calories: 140,
    protein: "5g",
    carbs: "26g",
    badge: "100% Natural",
    badgeColor: "emerald",
    image: "Assets/images/fresh-salad.jpg"
  },
  {
    id: "protein-berry-shake",
    name: "Batido Berry Protein & Chía",
    category: "drinks",
    description: "Mezcla antioxidante de arándanos, fresas, proteína vegetal de suero limpia, leche de almendras sin endulzante y semillas de chía activadas.",
    price: 4.50,
    calories: 260,
    protein: "25g",
    carbs: "18g",
    badge: "Post Entreno",
    badgeColor: "gold",
    image: "Assets/images/avocado-prep.jpg"
  }
];

/**
 * Genera la URL con texto codificado para realizar pedidos directos vía WhatsApp.
 * @param {string} dishName Nombre del platillo
 * @param {number} price Precio unitario
 * @param {string} phone Número telefónico de destino (internacional sin '+')
 * @returns {string} Enlace listo para invocar la API de WhatsApp
 */
function buildWhatsAppOrderUrl(dishName, price, phone = RESTAURANT_CONFIG.phoneWhatsApp) {
  const priceFormatted = Number(price).toFixed(2);
  const message = `Hola Yum & Fit! 🥑 Me gustaría pedir:\n` +
                  `🍽️ Platillo: ${dishName}\n` +
                  `💵 Precio: $${priceFormatted}\n` +
                  `📍 Mi dirección de entrega es: `;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Genera URL de WhatsApp para consulta general o reserva de mesa.
 */
function buildGeneralWhatsAppUrl(phone = RESTAURANT_CONFIG.phoneWhatsApp) {
  const message = `Hola Yum & Fit! 🐶 Me gustaría consultar el menú de hoy o realizar una reserva.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

// Exportación compatible para Browser y Node.js (Testing)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    RESTAURANT_CONFIG,
    CATEGORIES,
    MENU_ITEMS,
    buildWhatsAppOrderUrl,
    buildGeneralWhatsAppUrl
  };
} else if (typeof window !== "undefined") {
  window.YumMenu = {
    RESTAURANT_CONFIG,
    CATEGORIES,
    MENU_ITEMS,
    buildWhatsAppOrderUrl,
    buildGeneralWhatsAppUrl
  };
}
