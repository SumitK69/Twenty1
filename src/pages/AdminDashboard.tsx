
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { 
  ShoppingBag, 
  Users, 
  Package, 
  TrendingUp, 
  Plus,
  BarChart3,
  DollarSign,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const AdminDashboard = () => {
  const { state } = useApp();
  const navigate = useNavigate();

  // Check if user is admin
  if (!state.user || !state.user.isAdmin) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🔒</div>
            <h2 className="text-3xl font-light text-foreground mb-4">Access Denied</h2>
            <p className="text-muted-foreground mb-8">
              You don't have permission to access this page.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors duration-200"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Mock analytics data
  const analytics = {
    totalSales: 25432.50,
    totalOrders: 156,
    totalCustomers: 89,
    totalProducts: state.products.length,
    salesGrowth: 12.5,
    ordersGrowth: 8.3,
    customersGrowth: 15.2,
    productsGrowth: 0,
  };

  const recentOrders = state.orders.slice(0, 5);

  const salesData = [
    { month: 'Jan', sales: 4200 },
    { month: 'Feb', sales: 3800 },
    { month: 'Mar', sales: 5100 },
    { month: 'Apr', sales: 4600 },
    { month: 'May', sales: 6200 },
  ];

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    growth, 
    format = 'number' 
  }: {
    title: string;
    value: number;
    icon: any;
    growth: number;
    format?: 'number' | 'currency';
  }) => {
    const isPositive = growth >= 0;
    const formattedValue = format === 'currency' ? `$${value.toLocaleString()}` : value.toLocaleString();

    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className={`flex items-center space-x-1 text-sm ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
            <span>{Math.abs(growth)}%</span>
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-1">{formattedValue}</h3>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-light text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {state.user.name}
            </p>
          </div>
          
          <Link
            to="/admin/add-product"
            className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors duration-200"
          >
            <Plus className="h-5 w-5" />
            <span>Add Product</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Sales"
            value={analytics.totalSales}
            icon={DollarSign}
            growth={analytics.salesGrowth}
            format="currency"
          />
          <StatCard
            title="Total Orders"
            value={analytics.totalOrders}
            icon={ShoppingBag}
            growth={analytics.ordersGrowth}
          />
          <StatCard
            title="Total Customers"
            value={analytics.totalCustomers}
            icon={Users}
            growth={analytics.customersGrowth}
          />
          <StatCard
            title="Total Products"
            value={analytics.totalProducts}
            icon={Package}
            growth={analytics.productsGrowth}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sales Chart */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Sales Overview</h2>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="space-y-4">
              {salesData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{item.month}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(item.sales / 6200) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-16 text-right">
                      ${item.sales.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Average Monthly Sales</span>
                <span className="font-semibold text-foreground">
                  ${Math.round(salesData.reduce((sum, item) => sum + item.sales, 0) / salesData.length).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Recent Orders</h2>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-background rounded-md">
                  <div>
                    <p className="font-medium text-foreground">Order #{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-foreground">${order.total.toFixed(2)}</p>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'delivered' ? 'text-green-600 bg-green-100 dark:bg-green-900/20' :
                      order.status === 'shipped' ? 'text-blue-600 bg-blue-100 dark:bg-blue-900/20' :
                      'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
                    }`}>
                      {order.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <Link
                to="/orders"
                className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200"
              >
                View all orders →
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/admin/add-product"
              className="flex items-center space-x-3 p-4 bg-card border border-border rounded-lg hover:bg-muted transition-colors duration-200"
            >
              <div className="p-2 bg-primary/10 rounded-lg">
                <Plus className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Add New Product</h3>
                <p className="text-sm text-muted-foreground">Create a new product listing</p>
              </div>
            </Link>
            
            <button className="flex items-center space-x-3 p-4 bg-card border border-border rounded-lg hover:bg-muted transition-colors duration-200">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Manage Customers</h3>
                <p className="text-sm text-muted-foreground">View and manage customer accounts</p>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 p-4 bg-card border border-border rounded-lg hover:bg-muted transition-colors duration-200">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">View Analytics</h3>
                <p className="text-sm text-muted-foreground">Detailed sales and performance reports</p>
              </div>
            </button>
          </div>
        </div>

        {/* Top Products */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Top Products</h2>
          
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left py-3 px-6 font-medium text-foreground">Product</th>
                    <th className="text-left py-3 px-6 font-medium text-foreground">Category</th>
                    <th className="text-left py-3 px-6 font-medium text-foreground">Price</th>
                    <th className="text-left py-3 px-6 font-medium text-foreground">Stock</th>
                    <th className="text-left py-3 px-6 font-medium text-foreground">Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {state.products.map((product, index) => (
                    <tr key={product.id} className="border-t border-border">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-md bg-muted"
                          />
                          <div>
                            <p className="font-medium text-foreground">{product.name}</p>
                            <p className="text-sm text-muted-foreground">ID: {product.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-muted-foreground">{product.category}</td>
                      <td className="py-4 px-6 font-semibold text-foreground">${product.price.toFixed(2)}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          product.inStock 
                            ? 'text-green-600 bg-green-100 dark:bg-green-900/20' 
                            : 'text-red-600 bg-red-100 dark:bg-red-900/20'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-muted-foreground">{Math.floor(Math.random() * 50) + 10}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
