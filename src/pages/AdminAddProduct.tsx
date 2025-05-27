
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Upload, X, Plus } from 'lucide-react';

const AdminAddProduct = () => {
  const { state } = useApp();
  const navigate = useNavigate();
  
  // Check if user is admin
  if (!state.user || !state.user.isAdmin) {
    navigate('/');
    return null;
  }

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    inStock: true,
  });

  const [sizes, setSizes] = useState<string[]>(['S', 'M', 'L']);
  const [colors, setColors] = useState<string[]>(['Black', 'White']);
  const [newSize, setNewSize] = useState('');
  const [newColor, setNewColor] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const categories = ['T-Shirts', 'Shirts', 'Polo', 'Hoodies', 'Jackets', 'Pants', 'Accessories'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const addSize = () => {
    if (newSize.trim() && !sizes.includes(newSize.trim())) {
      setSizes(prev => [...prev, newSize.trim()]);
      setNewSize('');
    }
  };

  const removeSize = (sizeToRemove: string) => {
    setSizes(prev => prev.filter(size => size !== sizeToRemove));
  };

  const addColor = () => {
    if (newColor.trim() && !colors.includes(newColor.trim())) {
      setColors(prev => [...prev, newColor.trim()]);
      setNewColor('');
    }
  };

  const removeColor = (colorToRemove: string) => {
    setColors(prev => prev.filter(color => color !== colorToRemove));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Product description is required';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Please enter a valid price';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Product image URL is required';
    }

    if (sizes.length === 0) {
      newErrors.sizes = 'At least one size is required';
    }

    if (colors.length === 0) {
      newErrors.colors = 'At least one color is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // In a real app, this would make an API call to create the product
      // await createProduct({ ...formData, sizes, colors, price: parseFloat(formData.price) });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock success
      alert('Product created successfully!');
      navigate('/admin/dashboard');
    } catch (error) {
      setErrors({ general: 'Failed to create product. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-3xl font-light text-foreground">Add New Product</h1>
            <p className="text-muted-foreground mt-1">
              Create a new product listing for your store
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {errors.general && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-sm text-red-600 dark:text-red-400">{errors.general}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Product Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Product Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.name ? 'border-red-300' : 'border-border'
                  }`}
                  placeholder="Enter product name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.description ? 'border-red-300' : 'border-border'
                  }`}
                  placeholder="Enter product description"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
                )}
              </div>

              {/* Price and Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-foreground mb-2">
                    Price ($) *
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.price ? 'border-red-300' : 'border-border'
                    }`}
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.price}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.category ? 'border-red-300' : 'border-border'
                    }`}
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.category}</p>
                  )}
                </div>
              </div>

              {/* Stock Status */}
              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                  />
                  <span className="text-sm font-medium text-foreground">In Stock</span>
                </label>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Product Image */}
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-foreground mb-2">
                  Product Image URL *
                </label>
                <div className="space-y-3">
                  <input
                    id="image"
                    name="image"
                    type="url"
                    value={formData.image}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.image ? 'border-red-300' : 'border-border'
                    }`}
                    placeholder="https://example.com/image.jpg"
                  />
                  
                  {formData.image && (
                    <div className="aspect-square w-full max-w-xs bg-card border border-border rounded-md overflow-hidden">
                      <img
                        src={formData.image}
                        alt="Product preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
                {errors.image && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.image}</p>
                )}
              </div>

              {/* Sizes */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Available Sizes *
                </label>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <div
                        key={size}
                        className="flex items-center space-x-1 bg-muted px-3 py-1 rounded-md"
                      >
                        <span className="text-sm">{size}</span>
                        <button
                          type="button"
                          onClick={() => removeSize(size)}
                          className="text-muted-foreground hover:text-red-500 transition-colors duration-200"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newSize}
                      onChange={(e) => setNewSize(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSize())}
                      className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Add size (e.g., XL)"
                    />
                    <button
                      type="button"
                      onClick={addSize}
                      className="px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {errors.sizes && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.sizes}</p>
                )}
              </div>

              {/* Colors */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Available Colors *
                </label>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <div
                        key={color}
                        className="flex items-center space-x-1 bg-muted px-3 py-1 rounded-md"
                      >
                        <span className="text-sm">{color}</span>
                        <button
                          type="button"
                          onClick={() => removeColor(color)}
                          className="text-muted-foreground hover:text-red-500 transition-colors duration-200"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newColor}
                      onChange={(e) => setNewColor(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addColor())}
                      className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Add color (e.g., Navy)"
                    />
                    <button
                      type="button"
                      onClick={addColor}
                      className="px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {errors.colors && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.colors}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border">
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="px-6 py-3 border border-border text-foreground rounded-md font-medium hover:bg-muted transition-colors duration-200"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? 'Creating Product...' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddProduct;
