const assert = require('assert');

let menuModule;
try {
  menuModule = require('../js/menu-data.js');
} catch (e) {
  console.error("FAIL: Cannot load js/menu-data.js", e.message);
  process.exit(1);
}

const { MENU_ITEMS, CATEGORIES, buildWhatsAppOrderUrl } = menuModule;

console.log("Running tests for js/menu-data.js...");

// Test 1: CATEGORIES exist and valid
assert(Array.isArray(CATEGORIES), "CATEGORIES should be an array");
assert(CATEGORIES.length >= 4, "Should have at least 4 categories");
const catIds = CATEGORIES.map(c => c.id);
assert(catIds.includes('all'), "Should have 'all' category");
assert(catIds.includes('bowls'), "Should have 'bowls' category");
assert(catIds.includes('salads'), "Should have 'salads' category");

// Test 2: MENU_ITEMS count and categories
assert(Array.isArray(MENU_ITEMS), "MENU_ITEMS should be an array");
assert(MENU_ITEMS.length >= 8, `Expected at least 8 dishes, found ${MENU_ITEMS.length}`);

// Test 3: Validate each dish structure
const categoriesPresent = new Set();
MENU_ITEMS.forEach((dish, idx) => {
  assert(dish.id, `Dish ${idx} missing id`);
  assert(dish.name, `Dish ${idx} missing name`);
  assert(dish.category, `Dish ${idx} missing category`);
  assert(typeof dish.price === 'number' && dish.price > 0, `Dish ${idx} has invalid price: ${dish.price}`);
  assert(typeof dish.calories === 'number' && dish.calories > 0, `Dish ${idx} has invalid calories`);
  assert(dish.protein, `Dish ${idx} missing protein info`);
  assert(dish.image, `Dish ${idx} missing image path`);
  assert(dish.description, `Dish ${idx} missing description`);
  categoriesPresent.add(dish.category);
});

assert(categoriesPresent.has('bowls'), "Menu must contain bowls");
assert(categoriesPresent.has('salads'), "Menu must contain salads");
assert(categoriesPresent.has('keto'), "Menu must contain keto dishes");
assert(categoriesPresent.has('drinks'), "Menu must contain drinks");

// Test 4: buildWhatsAppOrderUrl function
assert(typeof buildWhatsAppOrderUrl === 'function', "buildWhatsAppOrderUrl must be a function");
const sampleUrl = buildWhatsAppOrderUrl("Power Steak & Avocado Bowl", 8.99);
assert(sampleUrl.startsWith("https://wa.me/593981840168"), "URL must target correct WhatsApp phone");
assert(sampleUrl.includes("Power%20Steak%20%26%20Avocado%20Bowl") || sampleUrl.includes("Power+Steak") || sampleUrl.includes("Power Steak"), "URL must encode dish name");
assert(sampleUrl.includes("8.99"), "URL must include price");

console.log("All menu data and WhatsApp URL tests passed successfully!");
