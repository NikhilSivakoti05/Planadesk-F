// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { 
//   LayoutDashboard, 
//   Package, 
//   Users, 
//   ShoppingCart, 
//   Settings, 
//   Plus, 
//   Edit, 
//   Trash2, 
//   Eye,
//   ArrowLeft,
//   Search,
//   Filter,
//   ChevronDown,
//   TrendingUp,
//   DollarSign,
//   Package2,
//   UserCheck
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';

// // Demo data
// const demoProducts = [
//   { id: 1, name: 'Artisan Leather Bag', price: 299, category: 'Accessories', stock: 45, status: 'Active' },
//   { id: 2, name: 'Minimal Gold Watch', price: 499, category: 'Watches', stock: 23, status: 'Active' },
//   { id: 3, name: 'Cashmere Scarf', price: 189, category: 'Apparel', stock: 67, status: 'Active' },
//   { id: 4, name: 'Designer Sunglasses', price: 349, category: 'Accessories', stock: 12, status: 'Low Stock' },
//   { id: 5, name: 'Silk Evening Dress', price: 899, category: 'Apparel', stock: 8, status: 'Low Stock' },
// ];

// const demoOrders = [
//   { id: 'TRK-2024-001', customer: 'John Smith', email: 'john@example.com', total: 598, status: 'Processing', date: '2024-01-10', items: 2 },
//   { id: 'TRK-2024-002', customer: 'Sarah Johnson', email: 'sarah@example.com', total: 499, status: 'Shipped', date: '2024-01-09', items: 1 },
//   { id: 'TRK-2024-003', customer: 'Michael Brown', email: 'michael@example.com', total: 1247, status: 'Delivered', date: '2024-01-08', items: 3 },
//   { id: 'TRK-2024-004', customer: 'Emily Davis', email: 'emily@example.com', total: 189, status: 'Placed', date: '2024-01-10', items: 1 },
//   { id: 'TRK-2024-005', customer: 'David Wilson', email: 'david@example.com', total: 2499, status: 'Processing', date: '2024-01-10', items: 1 },
// ];

// const demoUsers = [
//   { id: 1, name: 'John Smith', email: 'john@example.com', orders: 5, totalSpent: 2847, country: 'USA', joined: '2023-11-15' },
//   { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', orders: 3, totalSpent: 1456, country: 'UK', joined: '2023-12-01' },
//   { id: 3, name: 'Michael Brown', email: 'michael@example.com', orders: 8, totalSpent: 5234, country: 'Canada', joined: '2023-09-20' },
//   { id: 4, name: 'Emily Davis', email: 'emily@example.com', orders: 2, totalSpent: 678, country: 'India', joined: '2024-01-05' },
// ];

// const stats = [
//   { label: 'Total Revenue', value: '$124,580', change: '+12.5%', icon: DollarSign, color: 'text-green-500' },
//   { label: 'Total Orders', value: '1,284', change: '+8.2%', icon: ShoppingCart, color: 'text-blue-500' },
//   { label: 'Products', value: '156', change: '+3', icon: Package2, color: 'text-purple-500' },
//   { label: 'Customers', value: '2,847', change: '+156', icon: UserCheck, color: 'text-accent' },
// ];

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [showProductModal, setShowProductModal] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);

//   const tabs = [
//     { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
//     { id: 'products', label: 'Products', icon: Package },
//     { id: 'orders', label: 'Orders', icon: ShoppingCart },
//     { id: 'users', label: 'Users', icon: Users },
//     { id: 'settings', label: 'Settings', icon: Settings },
//   ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Placed': return 'bg-yellow-500/10 text-yellow-500';
//       case 'Processing': return 'bg-blue-500/10 text-blue-500';
//       case 'Shipped': return 'bg-purple-500/10 text-purple-500';
//       case 'Delivered': return 'bg-green-500/10 text-green-500';
//       case 'Cancelled': return 'bg-red-500/10 text-red-500';
//       default: return 'bg-muted text-muted-foreground';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Sidebar */}
//       <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border p-6 z-40 hidden lg:block">
//         <div className="mb-8">
//           <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
//             <ArrowLeft className="h-4 w-4" />
//             Back to Store
//           </Link>
//           <h1 className="text-2xl font-display font-bold">
//             LUXE<span className="text-accent">.</span> Admin
//           </h1>
//         </div>

//         <nav className="space-y-2">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
//                 activeTab === tab.id
//                   ? 'bg-accent text-accent-foreground'
//                   : 'text-muted-foreground hover:bg-muted hover:text-foreground'
//               }`}
//             >
//               <tab.icon className="h-5 w-5" />
//               {tab.label}
//             </button>
//           ))}
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="lg:ml-64 p-4 sm:p-6 lg:p-8">
//         <AnimatePresence mode="wait">
//           {/* Dashboard */}
//           {activeTab === 'dashboard' && (
//             <motion.div
//               key="dashboard"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="space-y-8"
//             >
//               <div>
//                 <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2">Dashboard</h2>
//                 <p className="text-muted-foreground text-sm sm:text-base">Welcome back! Here's what's happening with your store.</p>
//               </div>

//               {/* Stats */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {stats.map((stat, index) => (
//                   <motion.div
//                     key={stat.label}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     className="p-6 rounded-2xl bg-card border border-border"
//                   >
//                     <div className="flex items-start justify-between mb-4">
//                       <div className={`p-3 rounded-xl bg-muted ${stat.color}`}>
//                         <stat.icon className="h-5 w-5" />
//                       </div>
//                       <span className="flex items-center gap-1 text-sm text-green-500">
//                         <TrendingUp className="h-4 w-4" />
//                         {stat.change}
//                       </span>
//                     </div>
//                     <p className="text-2xl font-bold mb-1">{stat.value}</p>
//                     <p className="text-sm text-muted-foreground">{stat.label}</p>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Recent Orders */}
//               <div className="bg-card rounded-2xl border border-border p-4 sm:p-6">
//                 <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Recent Orders</h3>
//                 <div className="overflow-x-auto -mx-4 sm:mx-0">
//                   <table className="w-full min-w-[600px]">
//                     <thead>
//                       <tr className="text-left text-muted-foreground border-b border-border">
//                         <th className="pb-4 font-medium">Order ID</th>
//                         <th className="pb-4 font-medium">Customer</th>
//                         <th className="pb-4 font-medium">Total</th>
//                         <th className="pb-4 font-medium">Status</th>
//                         <th className="pb-4 font-medium">Date</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {demoOrders.slice(0, 5).map((order) => (
//                         <tr key={order.id} className="border-b border-border last:border-0">
//                           <td className="py-4 font-medium">{order.id}</td>
//                           <td className="py-4">{order.customer}</td>
//                           <td className="py-4 font-semibold">${order.total}</td>
//                           <td className="py-4">
//                             <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
//                               {order.status}
//                             </span>
//                           </td>
//                           <td className="py-4 text-muted-foreground">{order.date}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {/* Products */}
//           {activeTab === 'products' && (
//             <motion.div
//               key="products"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="space-y-6"
//             >
//               <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//                 <div>
//                   <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2">Products</h2>
//                   <p className="text-muted-foreground text-sm sm:text-base">Manage your product catalog</p>
//                 </div>
//                 <Button className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl w-full sm:w-auto">
//                   <Plus className="h-4 w-4 mr-2" />
//                   Add Product
//                 </Button>
//               </div>

//               <div className="flex items-center gap-4">
//                 <div className="relative flex-1 max-w-md">
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input placeholder="Search products..." className="pl-10 rounded-xl" />
//                 </div>
//                 <Button variant="outline" className="rounded-xl">
//                   <Filter className="h-4 w-4 mr-2" />
//                   Filter
//                 </Button>
//               </div>

//               <div className="bg-card rounded-2xl border border-border overflow-hidden">
//                 <div className="overflow-x-auto -mx-4 sm:mx-0">
//                   <table className="w-full min-w-[600px]">
//                     <thead className="bg-muted/50">
//                       <tr className="text-left">
//                         <th className="px-4 sm:px-6 py-4 font-medium text-muted-foreground text-xs sm:text-sm">Product</th>
//                         <th className="px-4 sm:px-6 py-4 font-medium text-muted-foreground text-xs sm:text-sm hidden md:table-cell">Category</th>
//                         <th className="px-4 sm:px-6 py-4 font-medium text-muted-foreground text-xs sm:text-sm">Price</th>
//                         <th className="px-4 sm:px-6 py-4 font-medium text-muted-foreground text-xs sm:text-sm">Stock</th>
//                         <th className="px-4 sm:px-6 py-4 font-medium text-muted-foreground text-xs sm:text-sm">Status</th>
//                         <th className="px-4 sm:px-6 py-4 font-medium text-muted-foreground text-xs sm:text-sm">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {demoProducts.map((product) => (
//                         <tr key={product.id} className="border-t border-border">
//                           <td className="px-4 sm:px-6 py-4 font-medium text-xs sm:text-sm">{product.name}</td>
//                           <td className="px-4 sm:px-6 py-4 text-muted-foreground text-xs sm:text-sm hidden md:table-cell">{product.category}</td>
//                           <td className="px-4 sm:px-6 py-4 font-semibold text-xs sm:text-sm">${product.price}</td>
//                           <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm">{product.stock}</td>
//                           <td className="px-4 sm:px-6 py-4">
//                             <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
//                               product.status === 'Active' 
//                                 ? 'bg-green-500/10 text-green-500' 
//                                 : 'bg-yellow-500/10 text-yellow-500'
//                             }`}>
//                               {product.status}
//                             </span>
//                           </td>
//                           <td className="px-4 sm:px-6 py-4">
//                             <div className="flex items-center gap-1 sm:gap-2">
//                               <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8">
//                                 <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
//                               </Button>
//                               <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8">
//                                 <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
//                               </Button>
//                               <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 text-red-500">
//                                 <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
//                               </Button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {/* Orders */}
//           {activeTab === 'orders' && (
//             <motion.div
//               key="orders"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="space-y-6"
//             >
//               <div>
//                 <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2">Orders</h2>
//                 <p className="text-muted-foreground text-sm sm:text-base">View and manage customer orders</p>
//               </div>

//               <div className="bg-card rounded-2xl border border-border overflow-hidden">
//                 <div className="overflow-x-auto -mx-4 sm:mx-0">
//                   <table className="w-full min-w-[800px]">
//                     <thead className="bg-muted/50">
//                       <tr className="text-left">
//                         <th className="px-4 sm:px-6 py-4 font-medium text-muted-foreground text-xs sm:text-sm">Tracking ID</th>
//                         <th className="px-4 sm:px-6 py-4 font-medium text-muted-foreground text-xs sm:text-sm">Customer</th>
//                         <th className="px-4 sm:px-6 py-4 font-medium text-muted-foreground text-xs sm:text-sm hidden md:table-cell">Email</th>
//                         <th className="px-4 sm:px-6 py-4 font-medium text-muted-foreground text-xs sm:text-sm">Items</th>
//                         <th className="px-4 sm:px-6 py-4 font-medium text-muted-foreground text-xs sm:text-sm">Total</th>
//                         <th className="px-4 sm:px-6 py-4 font-medium text-muted-foreground text-xs sm:text-sm">Status</th>
//                         <th className="px-4 sm:px-6 py-4 font-medium text-muted-foreground text-xs sm:text-sm hidden lg:table-cell">Date</th>
//                         <th className="px-4 sm:px-6 py-4 font-medium text-muted-foreground text-xs sm:text-sm">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                       {demoOrders.map((order) => (
//                         <tr key={order.id} className="border-t border-border">
//                           <td className="px-4 sm:px-6 py-4 font-mono font-medium text-accent text-xs sm:text-sm">{order.id}</td>
//                           <td className="px-4 sm:px-6 py-4 font-medium text-xs sm:text-sm">{order.customer}</td>
//                           <td className="px-4 sm:px-6 py-4 text-muted-foreground text-xs sm:text-sm hidden md:table-cell">{order.email}</td>
//                           <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm">{order.items}</td>
//                           <td className="px-4 sm:px-6 py-4 font-semibold text-xs sm:text-sm">${order.total}</td>
//                           <td className="px-4 sm:px-6 py-4">
//                             <select 
//                               defaultValue={order.status}
//                               className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-muted border border-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-accent"
//                             >
//                               <option value="Placed">Placed</option>
//                               <option value="Processing">Processing</option>
//                               <option value="Shipped">Shipped</option>
//                               <option value="Delivered">Delivered</option>
//                               <option value="Cancelled">Cancelled</option>
//                             </select>
//                           </td>
//                           <td className="px-4 sm:px-6 py-4 text-muted-foreground text-xs sm:text-sm hidden lg:table-cell">{order.date}</td>
//                           <td className="px-4 sm:px-6 py-4">
//                             <Button variant="ghost" size="sm" className="text-accent text-xs sm:text-sm">
//                               View
//                             </Button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {/* Users */}
//           {activeTab === 'users' && (
//             <motion.div
//               key="users"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="space-y-6"
//             >
//               <div>
//                 <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2">Users</h2>
//                 <p className="text-muted-foreground text-sm sm:text-base">Manage registered customers</p>
//               </div>

//               <div className="bg-card rounded-2xl border border-border overflow-hidden">
//                 <div className="overflow-x-auto -mx-4 sm:mx-0">
//                   <table className="w-full min-w-[700px]">
//                     <thead className="bg-muted/50">
//                       <tr className="text-left">
//                         <th className="px-4 sm:px-6 py-4 font-medium text-muted-foreground text-xs sm:text-sm">Customer</th>
//                         <th className="px-4 sm:px-6 py-4 font-medium text-muted-foreground text-xs sm:text-sm hidden md:table-cell">Email</th>
//                         <th className="px-4 sm:px-6 py-4 font-medium text-muted-foreground text-xs sm:text-sm">Country</th>
//                         <th className="px-4 sm:px-6 py-4 font-medium text-muted-foreground text-xs sm:text-sm">Orders</th>
//                         <th className="px-4 sm:px-6 py-4 font-medium text-muted-foreground text-xs sm:text-sm">Total Spent</th>
//                         <th className="px-4 sm:px-6 py-4 font-medium text-muted-foreground text-xs sm:text-sm hidden lg:table-cell">Joined</th>
//                         <th className="px-4 sm:px-6 py-4 font-medium text-muted-foreground text-xs sm:text-sm">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {demoUsers.map((user) => (
//                         <tr key={user.id} className="border-t border-border">
//                           <td className="px-4 sm:px-6 py-4 font-medium text-xs sm:text-sm">{user.name}</td>
//                           <td className="px-4 sm:px-6 py-4 text-muted-foreground text-xs sm:text-sm hidden md:table-cell">{user.email}</td>
//                           <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm">{user.country}</td>
//                           <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm">{user.orders}</td>
//                           <td className="px-4 sm:px-6 py-4 font-semibold text-xs sm:text-sm">${user.totalSpent}</td>
//                           <td className="px-4 sm:px-6 py-4 text-muted-foreground text-xs sm:text-sm hidden lg:table-cell">{user.joined}</td>
//                           <td className="px-4 sm:px-6 py-4">
//                             <div className="flex items-center gap-2">
//                               <Button variant="ghost" size="sm" className="text-accent text-xs sm:text-sm">
//                                 View Orders
//                               </Button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {/* Settings */}
//           {activeTab === 'settings' && (
//             <motion.div
//               key="settings"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="space-y-6"
//             >
//               <div>
//                 <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2">Settings</h2>
//                 <p className="text-muted-foreground text-sm sm:text-base">Configure your store settings</p>
//               </div>

//               <div className="grid gap-6 max-w-2xl">
//                 <div className="bg-card rounded-2xl border border-border p-6">
//                   <h3 className="text-lg font-semibold mb-4">Store Information</h3>
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Store Name</label>
//                       <Input defaultValue="LUXE" className="rounded-xl" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Contact Email</label>
//                       <Input defaultValue="hello@luxe.com" className="rounded-xl" />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-card rounded-2xl border border-border p-6">
//                   <h3 className="text-lg font-semibold mb-4">Currency Settings</h3>
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Default Currency</label>
//                       <select className="w-full px-4 py-2 rounded-xl bg-background border border-border">
//                         <option>USD - US Dollar</option>
//                         <option>EUR - Euro</option>
//                         <option>GBP - British Pound</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>

//                 <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl h-12">
//                   Save Settings
//                 </Button>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

import { useState } from 'react';
import {
  LayoutDashboard, Package, Users, ShoppingCart, Settings,
  ArrowLeft, Flag, Menu, X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardView from './DashboardView';
import ProductsView from './ProductsView';
import OrdersView from './OrdersView';
import UsersView from './UsersView';
import SettingsView from './SettingsView';
import CountryView from './CountryView';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [open, setOpen] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'country', label: 'Countries', icon: Flag },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-card border-b p-4 flex justify-between items-center">
        <button onClick={() => setOpen(true)}>
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-bold">LUXE<span className="text-accent">.</span> Admin</h1>
      </div>

      {/* Overlay */}
      {open && <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-card border-r p-6 z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="mb-8 flex justify-between items-start">
          <div>
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="h-4 w-4" /> Back to Store
            </Link>
            <h1 className="text-2xl font-display font-bold">
              LUXE<span className="text-accent">.</span> Admin
            </h1>
          </div>
          {/* Close Button Mobile */}
          <button className="lg:hidden" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0 p-4 sm:p-6 lg:p-8">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'products' && <ProductsView />}
        {activeTab === 'country' && <CountryView />}
        {activeTab === 'orders' && <OrdersView />}
        {activeTab === 'users' && <UsersView />}
        {activeTab === 'settings' && <SettingsView />}
      </main>
    </div>
  );
};

export default AdminDashboard;
