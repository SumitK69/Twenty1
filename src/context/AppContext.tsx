import React, { createContext, useContext, useReducer, useEffect } from "react";

// Types
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: "pending" | "shipped" | "delivered";
  date: string;
}

interface AppState {
  user: User | null;
  cart: CartItem[];
  wishlist: Product[];
  orders: Order[];
  products: Product[];
  darkMode: boolean;
}

type AppAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_CART_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "ADD_TO_WISHLIST"; payload: Product }
  | { type: "REMOVE_FROM_WISHLIST"; payload: string }
  | { type: "ADD_ORDER"; payload: Order }
  | { type: "TOGGLE_DARK_MODE" }
  | { type: "SET_DARK_MODE"; payload: boolean };

// Mock data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Minimal White Tee",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    description:
      "A perfectly crafted minimalist white t-shirt made from premium cotton.",
    category: "T-Shirts",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Gray"],
    inStock: true,
  },
  {
    id: "2",
    name: "Classic Black Shirt",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",
    description: "Elegant black shirt perfect for any occasion.",
    category: "Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy", "White"],
    inStock: true,
  },
  {
    id: "3",
    name: "Casual Denim Shirt",
    price: 55.99,
    image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500",
    description: "Comfortable denim shirt with a modern fit.",
    category: "Shirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Blue", "Light Blue", "Black"],
    inStock: true,
  },
  {
    id: "4",
    name: "Premium Polo",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500",
    description: "High-quality polo shirt for a sophisticated look.",
    category: "Polo",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Navy", "White", "Gray"],
    inStock: true,
  },
];

const mockOrders: Order[] = [
  {
    id: "1",
    userId: "1",
    items: [
      {
        ...mockProducts[0],
        quantity: 2,
        selectedSize: "M",
        selectedColor: "White",
      },
    ],
    total: 59.98,
    status: "delivered",
    date: "2024-01-15",
  },
  {
    id: "2",
    userId: "1",
    items: [
      {
        ...mockProducts[1],
        quantity: 1,
        selectedSize: "L",
        selectedColor: "Black",
      },
    ],
    total: 45.99,
    status: "shipped",
    date: "2024-01-20",
  },
];

// Initial state
const initialState: AppState = {
  user: null,
  cart: [],
  wishlist: [],
  orders: mockOrders,
  products: mockProducts,
  darkMode: false,
};

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };

    case "ADD_TO_CART":
      const existingItem = state.cart.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize &&
          item.selectedColor === action.payload.selectedColor
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id &&
            item.selectedSize === action.payload.selectedSize &&
            item.selectedColor === action.payload.selectedColor
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }

      return { ...state, cart: [...state.cart, action.payload] };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(
          (item) =>
            !(
              item.id === action.payload.split("-")[0] &&
              item.selectedSize === action.payload.split("-")[1] &&
              item.selectedColor === action.payload.split("-")[2]
            )
        ),
      };

    case "UPDATE_CART_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "ADD_TO_WISHLIST":
      if (state.wishlist.find((item) => item.id === action.payload.id)) {
        return state;
      }
      return { ...state, wishlist: [...state.wishlist, action.payload] };

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item.id !== action.payload),
      };

    case "ADD_ORDER":
      return { ...state, orders: [...state.orders, action.payload] };

    case "TOGGLE_DARK_MODE":
      const newDarkMode = !state.darkMode;
      document.cookie = `darkMode=${newDarkMode}; path=/; max-age=31536000`;
      if (newDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return { ...state, darkMode: newDarkMode };

    case "SET_DARK_MODE":
      if (action.payload) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return { ...state, darkMode: action.payload };

    default:
      return state;
  }
};

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load dark mode preference from cookies on mount
  useEffect(() => {
    const cookies = document.cookie.split(";");
    const darkModeCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("darkMode=")
    );

    if (darkModeCookie) {
      const darkMode = darkModeCookie.split("=")[1] === "true";
      dispatch({ type: "SET_DARK_MODE", payload: darkMode });
    }
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
