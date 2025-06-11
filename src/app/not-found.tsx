import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 px-4">
        <div className="space-y-2">
          <h1 className="text-9xl font-bold text-primary animate-pulse">404</h1>
          <h2 className="text-3xl font-semibold text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        
        <div className="flex justify-center">
          <Button
            asChild
            size="lg"
            className="group transition-all duration-300 hover:scale-105"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              <span>Return Home</span>
            </Link>
          </Button>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>If you believe this is a mistake, please contact support.</p>
        </div>
      </div>
    </div>
  );
} 