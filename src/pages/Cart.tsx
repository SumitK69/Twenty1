
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { state, dispatch } = useApp();

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id: itemId, quantity: newQuantity } });
    }
  };

  const removeItem = (itemId: string, size: string, color: string) => {
    const itemKey = `${itemId}-${size}-${color}`;
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemKey });
  };

  const subtotal = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-3xl font-light text-foreground mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-light text-foreground">Shopping Cart</h1>
            <p className="text-muted-foreground mt-1">
              {state.cart.reduce((total, item) => total + item.quantity, 0)} items in your cart
            </p>
          </div>
          
          <Link
            to="/"
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.cart.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                className="bg-card border border-border rounded-lg p-6"
              >
                <div className="flex items-start space-x-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-md bg-muted"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-foreground mb-1">
                          <Link
                            to={`/product/${item.id}`}
                            className="hover:text-primary transition-colors duration-200"
                          >
                            {item.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Size: {item.selectedSize}</span>
                          <span>Color: {item.selectedColor}</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => removeItem(item.id, item.selectedSize, item.selectedColor)}
                        className="text-muted-foreground hover:text-red-500 transition-colors duration-200"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Price and Quantity */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 border border-border rounded-md flex items-center justify-center hover:bg-muted transition-colors duration-200"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 border border-border rounded-md flex items-center justify-center hover:bg-muted transition-colors duration-200"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-semibold text-foreground">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ${item.price.toFixed(2)} each
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-foreground mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                {shipping === 0 && (
                  <div className="text-sm text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
                    🎉 You qualify for free shipping!
                  </div>
                )}
                
                {subtotal < 50 && (
                  <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping
                  </div>
                )}
                
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between text-lg font-semibold text-foreground">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-md font-medium hover:bg-primary/90 transition-colors duration-200 mt-6"
                onClick={() => {
                  // In a real app, this would redirect to checkout
                  alert('Checkout functionality would be implemented here');
                }}
              >
                Proceed to Checkout
              </button>

              {/* Payment Icons */}
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">We accept</p>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-5 bg-muted rounded flex items-center justify-center text-xs font-medium">
                    VISA
                  </div>
                  <div className="w-8 h-5 bg-muted rounded flex items-center justify-center text-xs font-medium">
                    MC
                  </div>
                  <div className="w-8 h-5 bg-muted rounded flex items-center justify-center text-xs font-medium">
                    AMEX
                  </div>
                  <div className="w-8 h-5 bg-muted rounded flex items-center justify-center text-xs font-medium">
                    PP
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mt-4 text-xs text-muted-foreground">
                🔒 Your payment information is secure and encrypted
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
