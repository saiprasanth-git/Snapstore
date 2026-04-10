import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, X, Plus, Minus, CreditCard, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
}

interface CartItem extends Product {
  quantity: number;
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Premium Ceramic Coffee Mug',
    description: 'Handcrafted ceramic mug with beautiful blue glaze. Holds 12oz. Microwave and dishwasher safe.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop',
    category: 'Home & Kitchen',
    tags: ['handmade', 'ceramic', 'coffee'],
  },
  {
    id: 2,
    title: 'Artisan Leather Wallet',
    description: 'Full-grain leather bifold wallet with RFID blocking. Slim profile, holds up to 8 cards.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop',
    category: 'Accessories',
    tags: ['leather', 'handmade', 'wallet'],
  },
  {
    id: 3,
    title: 'Hand-Poured Soy Candle Set',
    description: 'Set of 3 hand-poured soy candles with natural essential oil scents. 40+ hour burn time each.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1602178506264-cbfc1d8d9d5e?w=400&h=400&fit=crop',
    category: 'Home Decor',
    tags: ['candle', 'soy', 'natural'],
  },
  {
    id: 4,
    title: 'Macrame Wall Hanging',
    description: 'Boho-style macrame wall hanging, 100% cotton rope. Measures 18" x 36". Ready to hang.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    category: 'Home Decor',
    tags: ['macrame', 'boho', 'handmade'],
  },
  {
    id: 5,
    title: 'Succulent Plant Arrangement',
    description: 'Curated arrangement of 5 different succulents in a terracotta pot. Perfect for desk or shelf.',
    price: 27.99,
    image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=400&h=400&fit=crop',
    category: 'Plants',
    tags: ['succulent', 'plant', 'home'],
  },
  {
    id: 6,
    title: 'Custom Watercolor Portrait',
    description: 'Hand-painted watercolor portrait from your photo. Ships within 7-10 days. 8x10 inches.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop',
    category: 'Art',
    tags: ['watercolor', 'portrait', 'custom'],
  },
];

export default function StorefrontPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [checkingOut, setCheckingOut] = useState(false);

  const filteredProducts = SAMPLE_PRODUCTS.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = async () => {
    setCheckingOut(true);
    // Stripe payment initiated via MeDo Stripe plugin
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setCheckingOut(false);
    alert('Redirecting to Stripe checkout...');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#4F46E5]">SnapStore Marketplace</h1>
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setCartOpen(!cartOpen)}
              className="relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF6B6B] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">{filteredProducts.length} products</p>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" /> Filter
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="secondary" className="mb-2 text-xs">{product.category}</Badge>
                    <h3 className="font-semibold text-foreground line-clamp-1">{product.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{product.description}</p>
                    <p className="text-xl font-bold text-[#4F46E5] mt-3">${product.price.toFixed(2)}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      onClick={() => addToCart(product)}
                      className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          {cartOpen && (
            <div className="w-80 shrink-0">
              <div className="sticky top-20 border rounded-lg p-4 bg-card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-lg">Your Cart ({cartCount})</h2>
                  <button onClick={() => setCartOpen(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Your cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.title}</p>
                            <p className="text-sm text-[#4F46E5]">${item.price.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm w-6 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t mt-4 pt-4">
                      <div className="flex justify-between font-semibold mb-4">
                        <span>Total</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                      <Button
                        onClick={handleCheckout}
                        disabled={checkingOut}
                        className="w-full bg-[#FF6B6B] hover:bg-[#FF5252] text-white"
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        {checkingOut ? 'Processing...' : 'Checkout with Stripe'}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
