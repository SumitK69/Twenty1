
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp, Product } from '@/context/AppContext';
import { ShoppingCart, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const { state, dispatch } = useApp();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const isInWishlist = state.wishlist.some(item => item.id === product.id);
  const isInCart = state.cart.some(item => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
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

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    }
  };

  return (
    <div 
      className={`group relative bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
      onMouseEnter={() => setShowQuickAdd(true)}
      onMouseLeave={() => setShowQuickAdd(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsImageLoaded(true)}
          />
          
          {/* Quick Actions */}
          <div className={`absolute top-4 right-4 flex flex-col space-y-2 transition-all duration-300 ${
            showQuickAdd ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}>
            <button
              onClick={handleToggleWishlist}
              className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                isInWishlist 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/80 text-gray-700 hover:bg-red-500 hover:text-white'
              }`}
              aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Quick Add to Cart */}
          <div className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${
            showQuickAdd ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                product.inStock
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="text-sm">
                {isInCart ? 'Added' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </span>
            </button>
          </div>

          {/* Sale Badge */}
          {!product.inStock && (
            <div className="absolute top-4 left-4">
              <span className="bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
              {product.name}
            </h3>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            
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
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
