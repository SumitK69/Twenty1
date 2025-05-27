import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import {
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Sun,
  Moon,
  Search,
} from "lucide-react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state, dispatch } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartItemCount = state.cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const wishlistCount = state.wishlist.length;

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const toggleDarkMode = () => {
    dispatch({ type: "TOGGLE_DARK_MODE" });
  };

  const handleLogout = () => {
    dispatch({ type: "SET_USER", payload: null });
    // Firebase logout would go here
    // auth.signOut()
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-9xl mx-auto px-10 h-15 sm:px-10 lg:px-16">
          {" "}
          {/* Increased horizontal padding */}
          <div className="flex justify-between items-center h-24 py-4">
            {/* Logo aligned left */}
            <Link to="/" className="flex items-center">
              <img
                src="/assets/logo.png"
                alt="Twenty 1 Logo"
                className="object-contain" // Slightly larger and square
                style={{ marginRight: 0 }}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-raisin_black dark:hover:text-white_smoke ${
                    location.pathname === item.href
                      ? "text-raisin_black dark:text-white_smoke"
                      : "text-jet dark:text-isabelline"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 text-jet dark:text-isabelline hover:text-raisin_black dark:hover:text-white_smoke transition-colors duration-200"
                aria-label="Toggle dark mode"
              >
                {state.darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              <button className="p-2 text-jet dark:text-isabelline hover:text-raisin_black dark:hover:text-white_smoke transition-colors duration-200">
                <Search className="h-5 w-5" />
              </button>

              {state.user ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/wishlist"
                    className="relative p-2 text-jet dark:text-isabelline hover:text-raisin_black dark:hover:text-white_smoke transition-colors duration-200"
                  >
                    <Heart className="h-5 w-5" />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-raisin_black dark:bg-white_smoke text-white_smoke dark:text-raisin_black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/cart"
                    className="relative p-2 text-jet dark:text-isabelline hover:text-raisin_black dark:hover:text-white_smoke transition-colors duration-200"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-raisin_black dark:bg-white_smoke text-white_smoke dark:text-raisin_black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>

                  <div className="relative group">
                    <button className="p-2 text-jet dark:text-isabelline hover:text-raisin_black dark:hover:text-white_smoke transition-colors duration-200">
                      <User className="h-5 w-5" />
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="py-1">
                        <Link
                          to="/orders"
                          className="block px-4 py-2 text-sm text-foreground hover:bg-muted"
                        >
                          My Orders
                        </Link>
                        {state.user.isAdmin && (
                          <Link
                            to="/admin/dashboard"
                            className="block px-4 py-2 text-sm text-foreground hover:bg-muted"
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="text-sm font-medium text-jet dark:text-isabelline hover:text-raisin_black dark:hover:text-white_smoke transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-raisin_black dark:bg-white_smoke text-white_smoke dark:text-raisin_black px-4 py-2 rounded-md text-sm font-medium hover:bg-eerie_black dark:hover:bg-isabelline transition-colors duration-200"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-jet dark:text-isabelline hover:text-raisin_black dark:hover:text-white_smoke"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="border-t border-border pt-4 mt-4">
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm font-medium text-foreground">
                    Dark Mode
                  </span>
                  <button
                    onClick={toggleDarkMode}
                    className="p-1 text-muted-foreground hover:text-foreground"
                  >
                    {state.darkMode ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {state.user ? (
                  <div className="space-y-1">
                    <Link
                      to="/cart"
                      className="flex items-center justify-between px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>Cart</span>
                      {cartItemCount > 0 && (
                        <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {cartItemCount}
                        </span>
                      )}
                    </Link>
                    <Link
                      to="/wishlist"
                      className="flex items-center justify-between px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>Wishlist</span>
                      {wishlistCount > 0 && (
                        <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {wishlistCount}
                        </span>
                      )}
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Orders
                    </Link>
                    {state.user.isAdmin && (
                      <Link
                        to="/admin/dashboard"
                        className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Link
                      to="/login"
                      className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className="pt-16">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src="/assets/logo.png"
                  alt="Twenty 1 Logo"
                  className="w-8 h-8 object-contain"
                />
                {/* <span className="font-bold text-xl text-raisin_black dark:text-white_smoke">
                Twenty 1
              </span> */}
              </div>
              <p className="text-muted-foreground mb-4">
                Premium clothing store offering minimalist designs and
                exceptional quality.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/shop"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">
                Customer Service
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Shipping
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Returns
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 Twenty 1. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
