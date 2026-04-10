import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, ShoppingBag, LayoutDashboard, ArrowRight } from 'lucide-react';

export default function PaymentSuccessPage() {
  const orderNumber = `#${Math.floor(Math.random() * 9000) + 1000}`;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-foreground">Payment Successful!</h1>
          <p className="text-muted-foreground text-lg">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          <div className="bg-secondary/50 rounded-lg p-4 inline-block">
            <p className="text-sm text-muted-foreground">Order Number</p>
            <p className="text-xl font-bold text-[#4F46E5]">{orderNumber}</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-card border rounded-lg p-6 text-left space-y-4">
          <h2 className="font-semibold text-foreground">What happens next?</h2>
          <div className="space-y-3">
            {[
              { step: '1', text: 'You will receive a confirmation email shortly' },
              { step: '2', text: 'The seller will prepare and ship your order' },
              { step: '3', text: 'You will get tracking information once shipped' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#4F46E5] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {item.step}
                </div>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            asChild
            className="flex-1 bg-[#4F46E5] hover:bg-[#4338CA] text-white"
          >
            <Link to="/storefront">
              <ShoppingBag className="w-4 h-4 mr-2" /> Continue Shopping
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="flex-1"
          >
            <Link to="/dashboard">
              <LayoutDashboard className="w-4 h-4 mr-2" /> View Dashboard
            </Link>
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          Questions about your order?{' '}
          <a href="mailto:support@snapstore.ai" className="text-[#4F46E5] hover:underline">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
