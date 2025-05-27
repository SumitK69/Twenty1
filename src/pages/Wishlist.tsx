
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Heart, ShoppingCart, X, ArrowLeft } from 'lucide-react';

const Wishlist = () => {
  const { state, dispatch } = useApp();

  const removeFromWishlist = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  const addToCart = (product: any) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        ...product,
        quantity: 1,
        selectedSize: product.sizes[0],
        selectedColor: product.colors[0],
      },
    });
  };

  const moveAllToCart = () => {
    state.wishlist.forEach(product => {
      addToCart(product);
    });
    // Clear wishlist after moving all items
    state.wishlist.forEach(product => {
      removeFromWishlist(product.id);
    });
  };

  if (state.wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <Heart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-3xl font-light text-foreground mb-4">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8">
              Save items you love by clicking the heart icon.
            </p>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Start Shopping</span>
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
            <h1 className="text-3xl font-light text-foreground">My Wishlist</h1>
            <p className="text-muted-foreground mt-1">
              {state.wishlist.length} {state.wishlist.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {state.wishlist.length > 0 && (
              <button
                onClick={moveAllToCart}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors duration-200"
              >
                Move All to Cart
              </button>
            )}
            
            <Link
              to="/"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {state.wishlist.map((product) => {
            const isInCart = state.cart.some(item => item.id === product.id);
            
            return (
              <div
                key={product.id}
                className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-muted">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  
                  {/* Remove from Wishlist */}
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
                    aria-label="Remove from wishlist"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  {/* Stock Status */}
                  {!product.inStock && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
                      <Link to={`/product/${product.id}`}>
                        {product.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{product.category}</p>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-foreground">
                      ${product.price.toFixed(2)}
                    </span>
                    
                    {/* Color Options */}
                    <div className="flex items-center space-x-1">
                      {product.colors.slice(0, 3).map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full border border-border"
                          style={{ 
                            backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' : 
                                           color.toLowerCase() === 'black' ? '#000000' :
                                           color.toLowerCase() === 'gray' ? '#6b7280' :
                                           color.toLowerCase() === 'navy' ? '#1e3a8a' :
                                           color.toLowerCase() === 'blue' ? '#3b82f6' :
                                           color.toLowerCase() === 'light blue' ? '#93c5fd' :
                                           color.toLowerCase()
                          }}
                        />
                      ))}
                      {product.colors.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{product.colors.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                        product.inStock
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                          : 'bg-muted text-muted-foreground cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span className="text-sm">
                        {isInCart ? 'Added to Cart' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </span>
                    </button>
                    
                    <Link
                      to={`/product/${product.id}`}
                      className="w-full block text-center py-2 px-4 border border-border text-foreground rounded-md font-medium hover:bg-muted transition-colors duration-200"
                    >
                      <span className="text-sm">View Details</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recently Viewed or Suggestions */}
        <div className="mt-16">
          <h2 className="text-2xl font-light text-foreground mb-8 text-center">
            You might also like
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {state.products
              .filter(product => !state.wishlist.some(wishItem => wishItem.id === product.id))
              .slice(0, 4)
              .map((product) => (
                <div key={product.id} className="group">
                  <Link to={`/product/${product.id}`}>
                    <div className="aspect-square bg-card rounded-lg overflow-hidden mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-2">{product.category}</p>
                    <p className="font-semibold text-foreground">${product.price.toFixed(2)}</p>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
