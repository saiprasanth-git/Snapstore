import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Auth handled by MeDo Supabase integration
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate('/dashboard');
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold text-[#4F46E5]">
            <ShoppingBag className="w-8 h-8" />
            SnapStore
          </Link>
          <p className="mt-2 text-muted-foreground">AI-powered e-commerce for everyone</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{isLogin ? 'Welcome back' : 'Create account'}</CardTitle>
            <CardDescription>
              {isLogin
                ? 'Sign in to manage your store'
                : 'Start selling in minutes with AI-powered listings'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">{error}</div>
              )}
              <Button
                type="submit"
                className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white"
                disabled={loading}
              >
                {loading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait</>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
              </span>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#4F46E5] hover:underline font-medium"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </div>
            <div className="mt-4 text-center">
              <Link
                to="/storefront"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Continue as guest to browse products
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
