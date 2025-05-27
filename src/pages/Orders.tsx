
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Package, ArrowLeft, Truck, CheckCircle, Clock } from 'lucide-react';

const Orders = () => {
  const { state } = useApp();
  const navigate = useNavigate();

  // Check if user is logged in
  if (!state.user) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <Package className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-3xl font-light text-foreground mb-4">Please sign in</h2>
            <p className="text-muted-foreground mb-8">
              You need to be logged in to view your orders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors duration-200"
              >
                Sign In
              </Link>
              <button
                onClick={() => navigate('/')}
                className="border border-border text-foreground px-6 py-3 rounded-md font-medium hover:bg-muted transition-colors duration-200"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'shipped':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'delivered':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  if (state.orders.length === 0) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <Package className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-3xl font-light text-foreground mb-4">No orders yet</h2>
            <p className="text-muted-foreground mb-8">
              When you place your first order, it will appear here.
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-light text-foreground">My Orders</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage your orders
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

        {/* Orders List */}
        <div className="space-y-6">
          {state.orders
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((order) => (
              <div
                key={order.id}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
              >
                {/* Order Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        Order #{order.id}
                      </h3>
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Placed on {new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-semibold text-foreground">
                      ${order.total.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.items.reduce((total, item) => total + item.quantity, 0)} item{order.items.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-background rounded-md">
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md bg-muted"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground">
                          <Link
                            to={`/product/${item.id}`}
                            className="hover:text-primary transition-colors duration-200"
                          >
                            {item.name}
                          </Link>
                        </h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span>Size: {item.selectedSize}</span>
                          <span>Color: {item.selectedColor}</span>
                          <span>Qty: {item.quantity}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold text-foreground">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Actions */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    {order.status === 'delivered' && (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Delivered</span>
                      </>
                    )}
                    {order.status === 'shipped' && (
                      <>
                        <Truck className="h-4 w-4 text-blue-500" />
                        <span>In transit</span>
                      </>
                    )}
                    {order.status === 'pending' && (
                      <>
                        <Clock className="h-4 w-4 text-yellow-500" />
                        <span>Processing</span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {order.status === 'shipped' && (
                      <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200">
                        Track Package
                      </button>
                    )}
                    
                    {order.status === 'delivered' && (
                      <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200">
                        Reorder
                      </button>
                    )}
                    
                    <button className="border border-border text-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors duration-200">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Order Summary Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-card border border-border rounded-lg">
            <div className="text-2xl font-bold text-foreground mb-1">
              {state.orders.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Orders</div>
          </div>
          
          <div className="text-center p-6 bg-card border border-border rounded-lg">
            <div className="text-2xl font-bold text-foreground mb-1">
              ${state.orders.reduce((total, order) => total + order.total, 0).toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">Total Spent</div>
          </div>
          
          <div className="text-center p-6 bg-card border border-border rounded-lg">
            <div className="text-2xl font-bold text-foreground mb-1">
              {state.orders.filter(order => order.status === 'delivered').length}
            </div>
            <div className="text-sm text-muted-foreground">Delivered Orders</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
