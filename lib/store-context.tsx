"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  unit: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: CartItem[];
  total: number;
  time: string;
  status: "new" | "in-progress" | "delivered";
  deliveryTime?: number;
}

interface StoreContextType {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Omit<Product, "id">) => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "time" | "status">) => void;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  setDeliveryTime: (orderId: string, minutes: number) => void;
}

const initialProducts: Product[] = [
  // Rice
  {
    id: "1",
    name: "Basmati Rice Premium",
    price: 180,
    category: "Rice",
    image: "/images/basmati-rice.jpg",
    unit: "kg",
  },
  {
    id: "2",
    name: "Sona Masoori Rice",
    price: 65,
    category: "Rice",
    image: "/images/sona-masoori.jpg",
    unit: "kg",
  },
  {
    id: "3",
    name: "Kolam Rice",
    price: 55,
    category: "Rice",
    image: "/images/kolam-rice.jpg",
    unit: "kg",
  },
  {
    id: "4",
    name: "Brown Rice",
    price: 95,
    category: "Rice",
    image: "/images/brown-rice.jpg",
    unit: "kg",
  },
  {
    id: "1",
    name: "Basmati Rice Premium",
    price: 180,
    category: "Rice",
    image: "/images/basmati-rice.jpg",
    unit: "kg",
  },
  {
    id: "2",
    name: "Sona Masoori Rice",
    price: 65,
    category: "Rice",
    image: "/images/sona-masoori.jpg",
    unit: "kg",
  },
  {
    id: "3",
    name: "Kolam Rice",
    price: 55,
    category: "Rice",
    image: "/images/kolam-rice.jpg",
    unit: "kg",
  },
  {
    id: "4",
    name: "Brown Rice",
    price: 95,
    category: "Rice",
    image: "/images/brown-rice.jpg",
    unit: "kg",
  },
  {
    id: "1",
    name: "Basmati Rice Premium",
    price: 180,
    category: "Rice",
    image: "/images/basmati-rice.jpg",
    unit: "kg",
  },
  {
    id: "2",
    name: "Sona Masoori Rice",
    price: 65,
    category: "Rice",
    image: "/images/sona-masoori.jpg",
    unit: "kg",
  },
  {
    id: "3",
    name: "Kolam Rice",
    price: 55,
    category: "Rice",
    image: "/images/kolam-rice.jpg",
    unit: "kg",
  },
  {
    id: "4",
    name: "Brown Rice",
    price: 95,
    category: "Rice",
    image: "/images/brown-rice.jpg",
    unit: "kg",
  },
  {
    id: "1",
    name: "Basmati Rice Premium",
    price: 180,
    category: "Rice",
    image: "/images/basmati-rice.jpg",
    unit: "kg",
  },
  {
    id: "2",
    name: "Sona Masoori Rice",
    price: 65,
    category: "Rice",
    image: "/images/sona-masoori.jpg",
    unit: "kg",
  },
  {
    id: "3",
    name: "Kolam Rice",
    price: 55,
    category: "Rice",
    image: "/images/kolam-rice.jpg",
    unit: "kg",
  },
  {
    id: "4",
    name: "Brown Rice",
    price: 95,
    category: "Rice",
    image: "/images/brown-rice.jpg",
    unit: "kg",
  },
  {
    id: "1",
    name: "Basmati Rice Premium",
    price: 180,
    category: "Rice",
    image: "/images/basmati-rice.jpg",
    unit: "kg",
  },
  {
    id: "2",
    name: "Sona Masoori Rice",
    price: 65,
    category: "Rice",
    image: "/images/sona-masoori.jpg",
    unit: "kg",
  },
  {
    id: "3",
    name: "Kolam Rice",
    price: 55,
    category: "Rice",
    image: "/images/kolam-rice.jpg",
    unit: "kg",
  },
  {
    id: "4",
    name: "Brown Rice",
    price: 95,
    category: "Rice",
    image: "/images/brown-rice.jpg",
    unit: "kg",
  },
  // Atta & Flour
  {
    id: "5",
    name: "Whole Wheat Atta",
    price: 48,
    category: "Atta & Flour",
    image: "/images/wheat-atta.jpg",
    unit: "kg",
  },
  {
    id: "6",
    name: "Multigrain Atta",
    price: 72,
    category: "Atta & Flour",
    image: "/images/multigrain-atta.jpg",
    unit: "kg",
  },
  {
    id: "7",
    name: "Besan (Gram Flour)",
    price: 85,
    category: "Atta & Flour",
    image: "/images/besan.jpg",
    unit: "kg",
  },
  {
    id: "8",
    name: "Maida",
    price: 42,
    category: "Atta & Flour",
    image: "/images/maida.jpg",
    unit: "kg",
  },

  // Dals & Pulses
  {
    id: "9",
    name: "Toor Dal",
    price: 145,
    category: "Dals & Pulses",
    image: "/images/toor-dal.jpg",
    unit: "kg",
  },
  {
    id: "10",
    name: "Moong Dal",
    price: 135,
    category: "Dals & Pulses",
    image: "/images/moong-dal.jpg",
    unit: "kg",
  },
  {
    id: "11",
    name: "Chana Dal",
    price: 95,
    category: "Dals & Pulses",
    image: "/images/chana-dal.jpg",
    unit: "kg",
  },
  {
    id: "12",
    name: "Masoor Dal",
    price: 110,
    category: "Dals & Pulses",
    image: "/images/masoor-dal.jpg",
    unit: "kg",
  },

  // Oils
  {
    id: "13",
    name: "Sunflower Oil",
    price: 165,
    category: "Oil",
    image: "/images/sunflower-oil.jpg",
    unit: "L",
  },
  {
    id: "14",
    name: "Groundnut Oil",
    price: 195,
    category: "Oil",
    image: "/images/groundnut-oil.jpg",
    unit: "L",
  },
  {
    id: "15",
    name: "Mustard Oil",
    price: 175,
    category: "Oil",
    image: "/images/mustard-oil.jpg",
    unit: "L",
  },
  {
    id: "16",
    name: "Coconut Oil",
    price: 220,
    category: "Oil",
    image: "/images/coconut-oil.jpg",
    unit: "L",
  },

  // Masala
  {
    id: "17",
    name: "Turmeric Powder",
    price: 180,
    category: "Masala",
    image: "/images/turmeric.jpg",
    unit: "250g",
  },
  {
    id: "18",
    name: "Red Chilli Powder",
    price: 220,
    category: "Masala",
    image: "/images/red-chilli.jpg",
    unit: "250g",
  },
  {
    id: "19",
    name: "Coriander Powder",
    price: 120,
    category: "Masala",
    image: "/images/coriander.jpg",
    unit: "250g",
  },
  {
    id: "20",
    name: "Garam Masala",
    price: 165,
    category: "Masala",
    image: "/images/garam-masala.jpg",
    unit: "100g",
  },

  // Dry Fruits
  {
    id: "21",
    name: "Almonds",
    price: 850,
    category: "Dry Fruits",
    image: "/images/almonds.jpg",
    unit: "500g",
  },
  {
    id: "22",
    name: "Cashews",
    price: 720,
    category: "Dry Fruits",
    image: "/images/cashews.jpg",
    unit: "500g",
  },
  {
    id: "23",
    name: "Raisins",
    price: 180,
    category: "Dry Fruits",
    image: "/images/raisins.jpg",
    unit: "250g",
  },
  {
    id: "24",
    name: "Walnuts",
    price: 550,
    category: "Dry Fruits",
    image: "/images/walnuts.jpg",
    unit: "250g",
  },

  // Packaged Items
  {
    id: "25",
    name: "Sugar",
    price: 45,
    category: "Packaged Items",
    image: "/images/sugar.jpg",
    unit: "kg",
  },
  {
    id: "26",
    name: "Salt",
    price: 22,
    category: "Packaged Items",
    image: "/images/salt.jpg",
    unit: "kg",
  },
  {
    id: "27",
    name: "Tea Leaves",
    price: 280,
    category: "Packaged Items",
    image: "/images/tea.jpg",
    unit: "500g",
  },
  {
    id: "28",
    name: "Coffee Powder",
    price: 320,
    category: "Packaged Items",
    image: "/images/coffee.jpg",
    unit: "250g",
  },
];

const initialOrders: Order[] = [
  {
    id: "order-1",
    customerName: "Priya Sharma",
    phone: "+91 98765 12345",
    address: "Flat 402, Sunshine Apartments, Andheri West, Mumbai - 400058",
    items: [
      {
        id: "1",
        name: "Basmati Rice Premium",
        price: 180,
        category: "Rice",
        image: "/images/basmati-rice.jpg",
        unit: "kg",
        quantity: 2,
      },
      {
        id: "9",
        name: "Toor Dal",
        price: 145,
        category: "Dals & Pulses",
        image: "/images/toor-dal.jpg",
        unit: "kg",
        quantity: 1,
      },
    ],
    total: 505,
    time: "3/4/2026, 10:30:45 AM",
    status: "new",
  },
  {
    id: "order-2",
    customerName: "Rahul Patel",
    phone: "+91 87654 32109",
    address: "Shop 12, Dadar Market, Near Railway Station, Mumbai - 400014",
    items: [
      {
        id: "13",
        name: "Sunflower Oil",
        price: 165,
        category: "Oil",
        image: "/images/sunflower-oil.jpg",
        unit: "L",
        quantity: 2,
      },
      {
        id: "5",
        name: "Whole Wheat Atta",
        price: 48,
        category: "Atta & Flour",
        image: "/images/wheat-atta.jpg",
        unit: "kg",
        quantity: 5,
      },
      {
        id: "25",
        name: "Sugar",
        price: 45,
        category: "Packaged Items",
        image: "/images/sugar.jpg",
        unit: "kg",
        quantity: 2,
      },
    ],
    total: 660,
    time: "3/4/2026, 9:15:22 AM",
    status: "in-progress",
    deliveryTime: 30,
  },
  {
    id: "order-3",
    customerName: "Amit Kumar",
    phone: "+91 99887 76655",
    address: "B-201, Green Valley Society, Powai, Mumbai - 400076",
    items: [
      {
        id: "21",
        name: "Almonds",
        price: 850,
        category: "Dry Fruits",
        image: "/images/almonds.jpg",
        unit: "500g",
        quantity: 1,
      },
      {
        id: "22",
        name: "Cashews",
        price: 720,
        category: "Dry Fruits",
        image: "/images/cashews.jpg",
        unit: "500g",
        quantity: 1,
      },
    ],
    total: 1570,
    time: "2/4/2026, 6:45:10 PM",
    status: "delivered",
    deliveryTime: 45,
  },
];

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => setCart([]);

  const addOrder = (order: Omit<Order, "id" | "time" | "status">) => {
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      time: new Date().toLocaleString("en-IN"),
      status: "new",
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order,
      ),
    );
  };

  const setDeliveryTime = (orderId: string, minutes: number) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, deliveryTime: minutes } : order,
      ),
    );
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        setProducts,
        addProduct,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        orders,
        addOrder,
        updateOrderStatus,
        setDeliveryTime,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}

export const categories = [
  { name: "Rice", icon: "🍚", slug: "rice" },
  { name: "Atta & Flour", icon: "🌾", slug: "atta-flour" },
  { name: "Dals & Pulses", icon: "🫘", slug: "dals-pulses" },
  { name: "Oil", icon: "🫒", slug: "oil" },
  { name: "Masala", icon: "🌶️", slug: "masala" },
  { name: "Dry Fruits", icon: "🥜", slug: "dry-fruits" },
  { name: "Packaged Items", icon: "📦", slug: "packaged-items" },
  { name: "Snacks", icon: "🍪", slug: "snacks" },
  { name: "Beverages", icon: "🥤", slug: "beverages" },
  { name: "Personal Care", icon: "🧴", slug: "personal-care" },
  { name: "Household", icon: "🏠", slug: "household" },
  { name: "Baby Care", icon: "👶", slug: "baby-care" },
  { name: "Pet Care", icon: "🐾", slug: "pet-care" },
  { name: "Health & Wellness", icon: "💊", slug: "health-wellness" },
];
