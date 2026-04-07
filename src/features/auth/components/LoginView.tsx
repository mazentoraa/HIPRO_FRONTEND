"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { useToast } from '../../../lib/hooks/use-toast';
import { useAuth } from '../../../lib/hooks/useAuth';
import {
  Zap,
  MousePointerClick,
  Globe,
  BarChart3,
  Settings2,
  Users,
  Sparkles,
  Mail,
  Lock,
  ArrowRight,
  Phone,
  AlertCircle
} from 'lucide-react';

const features = [
  { icon: Zap, label: 'Automatisation', color: 'text-amber-400' },
  { icon: MousePointerClick, label: "Facilité d'utilisation", color: 'text-emerald-400' },
  { icon: Globe, label: 'En ligne', color: 'text-sky-400' },
  { icon: BarChart3, label: 'Analytique & Stats', color: 'text-violet-400' },
  { icon: Settings2, label: 'Personnalisable', color: 'text-rose-400' },
  { icon: Users, label: 'Collaboratif', color: 'text-orange-400' },
];

function LoginContent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { login, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const callbackUrl = searchParams.get('callbackUrl') || '/';
      router.replace(callbackUrl);
    }
  }, [isAuthenticated, router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(username, password);

      toast({
        title: 'Connexion réussie',
        description: 'Bienvenue dans Torazen Training Center Management System !',
      });

      const callbackUrl = searchParams.get('callbackUrl') || '/';
      router.replace(callbackUrl);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue lors de la connexion';
      setError(errorMessage);

      toast({
        title: 'Erreur de connexion',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex selection:bg-accent/30">
      {/* Left Panel - Features */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-sidebar via-sidebar/95 to-sidebar/90">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-20 w-60 h-60 bg-success/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 right-1/4 w-72 h-72 bg-accent/15 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          {/* Logo */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center shadow-lg">
                <Sparkles className="w-8 h-8 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-sidebar-foreground">HIPRO</h1>
                <span className="text-accent font-semibold text-xl">Training Center Management System</span>
              </div>
            </div>
            <p className="text-sidebar-foreground/80 text-lg max-w-md">
              Votre solution de gestion complète pour votre activité avec simplicité et efficacité.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={feature.label}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/10 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
                <span className="text-sidebar-foreground text-sm font-medium">{feature.label}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-12 flex gap-8">
            <div>
              <div className="text-3xl font-bold text-accent">99.9%</div>
              <div className="text-sidebar-foreground/70 text-sm">Disponibilité</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">24/7</div>
              <div className="text-sidebar-foreground/70 text-sm">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 bg-background">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Torazen</h1>
                <span className="text-accent font-semibold text-lg">Training Center Management System</span>
              </div>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground">Bon retour !</h2>
            <p className="text-muted-foreground mt-2">Connectez-vous pour accéder à votre espace de gestion.</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive animate-fade-in">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground font-medium">Nom d'utilisateur</Label>
              <div className="relative group">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-accent" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Votre nom d'utilisateur"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError(null);
                  }}
                  className="pl-11 h-12 bg-secondary/50 border-transparent focus:border-accent/50 focus:bg-background transition-all"
                  required
                  disabled={isLoading}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">Mot de passe</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-accent" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                  className="pl-11 h-12 bg-secondary/50 border-transparent focus:border-accent/50 focus:bg-background transition-all"
                  required
                  disabled={isLoading}
                  autoComplete="current-password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-border text-accent focus:ring-accent accent-accent" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">Se souvenir de moi</span>
              </label>
              <button type="button" className="text-accent hover:text-accent/80 hover:underline font-medium transition-colors">
                Mot de passe oublié ?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base gap-2 group shadow-lg shadow-accent/20 transition-all active:scale-[0.98]"
              disabled={isLoading}
              variant="accent"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                  Connexion...
                </span>
              ) : (
                <>
                  Se connecter
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {/* Contact Section */}
          <div className="mt-10 pt-8 border-t border-border">
            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Besoin d'aide ou de créer un compte ?
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="mailto:mazentoraa2@gmail.com"
                  className="inline-flex items-center justify-center gap-2 text-accent hover:underline font-medium text-sm transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  mazentoraa2@gmail.com
                </a>
                <a
                  href="tel:58877447"
                  className="inline-flex items-center justify-center gap-2 text-accent hover:underline font-medium text-sm transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  58 877 447
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-muted-foreground">
            © 2025 Torazen TTC. Tous droits réservés.
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoginView() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background text-foreground">Chargement...</div>}>
      <LoginContent />
    </Suspense>
  );
}
