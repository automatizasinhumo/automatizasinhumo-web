/**
 * Carta QR de ejemplo (Automatiza sin humo), sobre QuickMenu (licencia MIT).
 * Precios en euros enteros. El número de WhatsApp es ficticio: en tu versión va el tuyo.
 */

const RESTAURANT_CONFIG = {
  restaurantName: "Bar La Plaza",
  tagline: "Cocina de mercado. Pide desde la mesa o para llevar",
  whatsappNumber: "34000000000", // Ficticio: en la demo no llega a nadie
  currency: "€",
  deliveryFee: 2,               // 0 = envío gratis
  taxPercent: 0,                // IVA ya incluido en los precios

  categories: [
    { id: "all", name: "Todo", icon: "fa-utensils" },
    { id: "burgers", name: "Hamburguesas", icon: "fa-hamburger" },
    { id: "pizza", name: "Pizzas", icon: "fa-pizza-slice" },
    { id: "sides", name: "Raciones", icon: "fa-drumstick-bite" },
    { id: "drinks", name: "Bebidas", icon: "fa-glass-whiskey" }
  ],

  menuItems: [
    { id: 1, name: "Hamburguesa de ternera gallega", category: "burgers", price: 13, description: "Doble de ternera, queso cheddar, cebolla caramelizada y salsa de la casa.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80", isPopular: true },
    { id: 2, name: "Hamburguesa de pollo crujiente", category: "burgers", price: 11, description: "Pechuga rebozada, lechuga fresca y mayonesa de ajo picante.", image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600&auto=format&fit=crop&q=80", isPopular: true },
    { id: 3, name: "Pizza de pepperoni", category: "pizza", price: 12, description: "Masa fina, mozzarella, pepperoni y orégano.", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&auto=format&fit=crop&q=80", isPopular: true },
    { id: 4, name: "Pizza de pollo y champiñones", category: "pizza", price: 13, description: "Salsa blanca de ajo, pollo marinado, champiñones y albahaca.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80", isPopular: false },
    { id: 5, name: "Patatas con queso", category: "sides", price: 6, description: "Patatas en espiral con salsa de cheddar y jalapeños.", image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80", isPopular: false },
    { id: 6, name: "Alitas barbacoa (6 uds.)", category: "sides", price: 8, description: "Con salsa barbacoa de miel ahumada y salsa ranchera.", image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600&auto=format&fit=crop&q=80", isPopular: true },
    { id: 7, name: "Limonada con hierbabuena", category: "drinks", price: 3, description: "Limón exprimido, hielo picado y hierbabuena fresca.", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80", isPopular: false },
    { id: 8, name: "Batido de chocolate", category: "drinks", price: 4, description: "Helado de chocolate batido con sirope de chocolate belga.", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80", isPopular: true }
  ]
};
