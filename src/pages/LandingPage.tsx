import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, Sparkles, ShoppingBag, ArrowRight, Star, Users, TrendingUp } from 'lucide-react';

export default function LandingPage() {
  const steps = [
    {
      icon: Upload,
      title: 'Upload Photo',
      description: 'Simply upload a product photo and provide a brief description of your item.',
      step: 1,
    },
    {
      icon: Sparkles,
      title: 'AI Generates Listing',
      description: 'Our AI creates a compelling product title, description, pricing, and SEO tags instantly.',
      step: 2,
    },
    {
      icon: ShoppingBag,
      title: 'Start Selling',
      description: 'Your product goes live on your storefront instantly. Accept payments via Stripe.',
      step: 3,
    },
  ];

  const stats = [
    { icon: Users, label: 'Sellers', value: '10,000+' },
    { icon: TrendingUp, label: 'Revenue Generated', value: '$2M+' },
    { icon: Star, label: 'Average Rating', value: '4.9/5' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            AI-Powered E-Commerce Platform
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Turn Your Products Into a{' '}
            <span className="text-[#4F46E5]">Store in Seconds</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            AI-powered visual e-commerce platform for small business owners. Upload a photo,
            let AI do the work, and start selling instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white text-lg px-8 py-6 h-auto"
            >
              <Link to="/login">Get Started Free <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 h-auto"
            >
              <Link to="/storefront">Browse Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center gap-2">
                <stat.icon className="w-8 h-8 text-[#4F46E5]" />
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Three simple steps to start selling online
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <Card key={step.step} className="text-center border-border bg-card hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-6 space-y-4">
                  <div className="w-16 h-16 mx-auto bg-[#4F46E5]/10 rounded-full flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-[#4F46E5]" />
                  </div>
                  <div className="w-8 h-8 mx-auto bg-[#FF6B6B] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#4F46E5] py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Start Selling?</h2>
            <p className="text-lg text-indigo-200">
              Join thousands of small business owners who trust SnapStore to power their online sales.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white text-lg px-8 py-6 h-auto"
            >
              <Link to="/login">Create Your Store Today</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
