import { motion } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import {
  TrendingUp, ShoppingCart, DollarSign, Users,
  Package, Clock, CheckCircle, AlertCircle
} from 'lucide-react';

// Mock data for the last 30 days
const generateOrderData = () => {
  const data = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      orders: Math.floor(Math.random() * 50) + 10,
      revenue: Math.floor(Math.random() * 5000) + 1000,
      customers: Math.floor(Math.random() * 30) + 5
    });
  }
  return data;
};

const orderData = generateOrderData();

// Order status distribution
const statusData = [
  { name: 'Delivered', value: 245, color: '#10b981' },
  { name: 'Processing', value: 78, color: '#3b82f6' },
  { name: 'Shipped', value: 92, color: '#8b5cf6' },
  { name: 'Pending', value: 45, color: '#f59e0b' },
  { name: 'Cancelled', value: 15, color: '#ef4444' }
];

// Category performance
const categoryData = [
  { category: 'Electronics', revenue: 12500, orders: 45 },
  { category: 'Apparel', revenue: 9800, orders: 78 },
  { category: 'Accessories', revenue: 7600, orders: 92 },
  { category: 'Home', revenue: 6200, orders: 34 },
  { category: 'Beauty', revenue: 5400, orders: 51 }
];

// Stats cards data
const stats = [
  {
    label: 'Total Orders',
    value: '475',
    change: '+12.5%',
    icon: ShoppingCart,
    color: 'from-blue-500 to-blue-600'
  },
  {
    label: 'Revenue',
    value: '$41,500',
    change: '+8.2%',
    icon: DollarSign,
    color: 'from-green-500 to-green-600'
  },
  {
    label: 'New Customers',
    value: '156',
    change: '+3%',
    icon: Users,
    color: 'from-purple-500 to-purple-600'
  },
  {
    label: 'Pending Orders',
    value: '45',
    change: '-2.1%',
    icon: Clock,
    color: 'from-orange-500 to-orange-600'
  }
];

// Recent orders
const recentOrders = [
  { id: 'ORD-001', customer: 'John Doe', amount: '$2,450', status: 'Delivered', date: '2 hours ago' },
  { id: 'ORD-002', customer: 'Jane Smith', amount: '$1,890', status: 'Shipped', date: '4 hours ago' },
  { id: 'ORD-003', customer: 'Mike Johnson', amount: '$3,200', status: 'Processing', date: '6 hours ago' },
  { id: 'ORD-004', customer: 'Sarah Williams', amount: '$1,560', status: 'Pending', date: '8 hours ago' },
  { id: 'ORD-005', customer: 'Alex Brown', amount: '$4,100', status: 'Delivered', date: '10 hours ago' }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Delivered': return 'bg-green-500/10 text-green-600 border-green-200';
    case 'Shipped': return 'bg-purple-500/10 text-purple-600 border-purple-200';
    case 'Processing': return 'bg-blue-500/10 text-blue-600 border-blue-200';
    case 'Pending': return 'bg-yellow-500/10 text-yellow-600 border-yellow-200';
    case 'Cancelled': return 'bg-red-500/10 text-red-600 border-red-200';
    default: return 'bg-gray-500/10 text-gray-600 border-gray-200';
  }
};

const StatCard = ({ stat, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className={`p-6 rounded-2xl bg-gradient-to-br ${stat.color} text-white overflow-hidden relative group`}
  >
    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-300" />
    <div className="relative z-10">
      <div className="flex items-start justify-between mb-4">
        <stat.icon className="h-6 w-6 opacity-80" />
        <span className="text-xs font-semibold opacity-90">Last 30 days</span>
      </div>
      <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
      <p className="text-sm opacity-80">{stat.label}</p>
      <p className="text-xs font-semibold mt-3 opacity-90">{stat.change}</p>
    </div>
  </motion.div>
);

const DashboardView = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your sales performance for the last 30 days.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders & Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-card rounded-2xl border border-border p-6"
        >
          <h2 className="text-xl font-bold mb-6">Orders & Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={orderData}>
              <defs>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Area
                type="monotone"
                dataKey="orders"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorOrders)"
                name="Orders"
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                name="Revenue ($)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Order Status Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl border border-border p-6 flex flex-col"
        >
          <h2 className="text-xl font-bold mb-6">Order Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {statusData.map((status) => (
              <div key={status.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }} />
                  <span className="text-muted-foreground">{status.name}</span>
                </div>
                <span className="font-semibold">{status.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Category Performance & Daily Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl border border-border p-6"
        >
          <h2 className="text-xl font-bold mb-6">Revenue by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="category" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Revenue ($)" />
              <Bar dataKey="orders" fill="#8b5cf6" radius={[8, 8, 0, 0]} name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Daily Orders Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-2xl border border-border p-6"
        >
          <h2 className="text-xl font-bold mb-6">Daily Orders Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={orderData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ fill: '#ef4444', r: 4 }}
                activeDot={{ r: 6 }}
                name="Orders"
              />
              <Line
                type="monotone"
                dataKey="customers"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{ fill: '#f59e0b', r: 4 }}
                activeDot={{ r: 6 }}
                name="New Customers"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-card rounded-2xl border border-border overflow-hidden"
      >
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr key={order.id} className={`border-t border-border hover:bg-muted/30 transition-colors ${index === recentOrders.length - 1 ? '' : ''}`}>
                  <td className="px-6 py-4 font-mono text-sm font-semibold text-accent">{order.id}</td>
                  <td className="px-6 py-4 text-sm font-medium">{order.customer}</td>
                  <td className="px-6 py-4 text-sm font-bold">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                      {order.status === 'Delivered' && <CheckCircle className="h-3 w-3" />}
                      {order.status === 'Pending' && <AlertCircle className="h-3 w-3" />}
                      {order.status === 'Processing' && <Clock className="h-3 w-3" />}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-200 rounded-2xl p-6"
        >
          <Package className="h-8 w-8 text-blue-600 mb-3" />
          <h3 className="font-semibold mb-1">Total Items Sold</h3>
          <p className="text-3xl font-bold text-blue-600">2,847</p>
          <p className="text-sm text-muted-foreground mt-2">+542 this month</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-200 rounded-2xl p-6"
        >
          <TrendingUp className="h-8 w-8 text-green-600 mb-3" />
          <h3 className="font-semibold mb-1">Average Order Value</h3>
          <p className="text-3xl font-bold text-green-600">$87.37</p>
          <p className="text-sm text-muted-foreground mt-2">+5% increase</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-200 rounded-2xl p-6"
        >
          <Users className="h-8 w-8 text-purple-600 mb-3" />
          <h3 className="font-semibold mb-1">Customer Satisfaction</h3>
          <p className="text-3xl font-bold text-purple-600">94.2%</p>
          <p className="text-sm text-muted-foreground mt-2">Based on reviews</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardView;
