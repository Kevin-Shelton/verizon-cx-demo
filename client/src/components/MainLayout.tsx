import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { APP_LOGO, APP_TITLE } from "@/const";
import {
  Home,
  Users,
  Map,
  Sparkles,
  MessageSquare,
  Menu,
  X,
  Calculator,
  Languages,
  TrendingUp,
  BookOpen,
  Briefcase,
  FileText,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MainLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Personas", href: "/personas", icon: Users },
  { name: "Journey", href: "/journey", icon: Map },
  { name: "Experiences", href: "/experiences", icon: Sparkles },
  { name: "Feedback", href: "/feedback", icon: MessageSquare },
];

const executiveInsights = [
  { name: "Executive Intro", href: "/executive-intro", icon: Briefcase },
  { name: "Verizon Case Study", href: "/verizon-case-study", icon: FileText },
  { name: "Translation Demo", href: "/translation-demo", icon: Languages },
  { name: "Journey Heatmap", href: "/journey-heatmap", icon: TrendingUp },
  { name: "Research Sources", href: "/research-sources", icon: BookOpen },
];

export default function MainLayout({ children }: MainLayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header
        className={`sticky top-0 z-50 border-b border-border transition-all duration-300 ${
          scrolled
            ? "bg-card/95 backdrop-blur-md shadow-md"
            : "bg-card/80 backdrop-blur-sm"
        }`}
      >
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <img src="https://files.manuscdn.com/user_upload_by_module/session_file/120250985/tIYLxxOFWqHZpwVA.png" alt="Invictus" className="h-10 w-auto" />
              <span className="text-sm text-muted-foreground">Presented by Invictus</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Customer Journey Section */}
            <div className="flex items-center gap-1 px-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={active ? "default" : "ghost"}
                      size="sm"
                      className="gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </div>

            {/* Vertical Separator */}
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-border to-transparent mx-3" />

            {/* Executive Insights Section */}
            <div className="flex items-center gap-1 px-2">
              <span className="text-xs font-semibold text-muted-foreground mr-2 hidden xl:block">
                Executive Insights
              </span>
              {executiveInsights.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={active ? "default" : "ghost"}
                      size="sm"
                      className="gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden xl:inline">{item.name}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-border overflow-hidden bg-card"
            >
              <nav className="container py-4 flex flex-col gap-2">
                {/* Customer Journey Section */}
                <div className="text-xs font-semibold text-muted-foreground px-3 py-2">
                  Customer Journey
                </div>
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant={active ? "default" : "ghost"}
                        className="w-full justify-start gap-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Icon className="h-4 w-4" />
                        {item.name}
                      </Button>
                    </Link>
                  );
                })}

                {/* Separator */}
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-2" />

                {/* Executive Insights Section */}
                <div className="text-xs font-semibold text-muted-foreground px-3 py-2">
                  Executive Insights
                </div>
                {executiveInsights.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant={active ? "default" : "ghost"}
                        className="w-full justify-start gap-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Icon className="h-4 w-4" />
                        {item.name}
                      </Button>
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="container py-8">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-3">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/120250985/tIYLxxOFWqHZpwVA.png" alt="Invictus" className="h-6 w-auto" />
                <span className="text-sm font-semibold text-foreground">Presented by Invictus</span>
              </div>
              <p className="text-xs text-muted-foreground">
                © 2025 Verizon. Multilingual CX Demo Portal.
              </p>
            </div>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <a href="mailto:support@verizon.com" className="hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

