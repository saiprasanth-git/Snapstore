import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Package, DollarSign, ShoppingBag, TrendingUp, Eye, Edit, Trash2 } from 'lucide-react';

interface Order {
  id: string;
  product: string;
  buyer: string;
  amount: number;
  status: 'completed' | 'pending' | 'refunded';
  date: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  sold: number;
  status: 'active' | 'draft';
}

const MOCK_ORDERS: Order[] = [
  { id: '#1001', product: 'Premium Ceramic Coffee Mug', buyer: 'alice@example.com', amount: 24.99, status: 'completed', date: '2025-04-22' },
  { id: '#1002', product: 'Artisan Leather Wallet', buyer: 'bob@example.com', amount: 49.99, status: 'completed', date: '2025-04-21' },
  { id: '#1003', product: 'Hand-Poured Soy Candle Set', buyer: 'carol@example.com', amount: 34.99, status: 'pending', date: '2025-04-20' },
  { id: '#1004', product: 'Macrame Wall Hanging', buyer: 'dave@example.com', amount: 39.99, status: 'completed', date: '2025-04-19' },
  { id: '#1005', product: 'Custom Watercolor Portrait', buyer: 'eve@example.com', amount: 89.99, status: 'refunded', date: '2025-04-18' },
];

const MOCK_PRODUCTS: Product[] = [
  { id: 1, title: 'Premium Ceramic Coffee Mug', price: 24.99, sold: 12, status: 'active' },
  { id: 2, title: 'Artisan Leather Wallet', price: 49.99, sold: 8, status: 'active' },
  { id: 3, title: 'Hand-Poured Soy Candle Set', price: 34.99, sold: 15, status: 'active' },
  { id: 4, title: 'Macrame Wall Hanging', price: 39.99, sold: 5, status: 'draft' },
];

const STATUS_COLORS = {
  completed: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  refunded: 'bg-red-100 text-red-700',
  active: 'bg-green-100 text-green-700',
  draft: 'bg-gray-100 text-gray-700',
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');

  const totalRevenue = MOCK_ORDERS.filter((o) => o.status === 'completed').reduce((sum, o) => sum + o.amount, 0);
  const totalProducts = MOCK_PRODUCTS.filter((p) => p.status === 'active').length;
  const totalOrders = MOCK_ORDERS.filter((o) => o.status === 'completed').length;
  const avgOrderValue = totalRevenue / totalOrders;

  const stats = [
    { icon: DollarSign, label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, color: 'text-green-600', bg: 'bg-green-50' },
    { icon: Package, label: 'Active Products', value: totalProducts, color: 'text-[#4F46E5]', bg: 'bg-[#4F46E5]/10' },
    { icon: ShoppingBag, label: 'Total Orders', value: totalOrders, color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: TrendingUp, label: 'Avg Order Value', value: `$${avgOrderValue.toFixed(2)}`, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Seller Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your products and track your revenue</p>
          </div>
          <Button asChild className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white">
            <Link to="/upload">
              <Plus className="w-4 h-4 mr-2" /> Add New Product
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'orders'
                ? 'border-[#4F46E5] text-[#4F46E5]'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Recent Orders
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'products'
                ? 'border-[#4F46E5] text-[#4F46E5]'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            My Products
          </button>
        </div>

        {/* Orders Table */}
        {activeTab === 'orders' && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Buyer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_ORDERS.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{order.product}</TableCell>
                      <TableCell>{order.buyer}</TableCell>
                      <TableCell>${order.amount.toFixed(2)}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[order.status]}`}>
                          {order.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Products Table */}
        {activeTab === 'products' && (
          <Card>
            <CardHeader>
              <CardTitle>My Products</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Units Sold</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_PRODUCTS.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.title}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.sold}</TableCell>
                      <TableCell>${(product.price * product.sold).toFixed(2)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[product.status]}`}>
                          {product.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <button className="p-1 text-muted-foreground hover:text-foreground">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-muted-foreground hover:text-[#4F46E5]">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-muted-foreground hover:text-red-500">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
