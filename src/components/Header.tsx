import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, LayoutDashboard, Upload, Store, LogIn, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: '/storefront', label: 'Browse', icon: Store },
    { to: '/upload', label: 'Sell', icon: Upload },
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-[#4F46E5]">
            <ShoppingBag className="w-7 h-7" />
            <span>SnapStore</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                  isActive(link.to) ? 'text-[#4F46E5]' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <Button asChild variant="outline" size="sm">
              <Link to="/login"><LogIn className="w-4 h-4 mr-1.5" /> Sign In</Link>
            </Button>
            <Button asChild size="sm" className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white">
              <Link to="/login">Get Started</Link>
            </Button>
          </div>
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>
  );
}
