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
  TrendingUp,
  BookOpen,
  Briefcase,
  FileText,
  LogOut,
  Play,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { trpc } from "@/lib/trpc";

interface MainLayoutProps {
  children: React.ReactNode;
}

// More dropdown items
const moreItems = [
  { name: "Sales Flow Journey", href: "/journey", icon: Map },
  { name: "Experiences", href: "https://demo-chat.ikoneworld.net/dashboard", icon: Sparkles, requiresSSO: true },
  { name: "Research & Feedback", href: "/research-sources", icon: BookOpen },
];

export default function MainLayout({ children }: MainLayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLaunchingSSO, setIsLaunchingSSO] = useState(false);
  const { logout, user, isAdmin } = useAuth();
  const generateTokenMutation = trpc.auth.generateAuthToken.useMutation();

  const handleSSOLaunch = async (url: string) => {
    try {
      setIsLaunchingSSO(true);
      
      // Generate auth token
      const response = await generateTokenMutation.mutateAsync();
      const token = response?.token;
      
      // Extract the path from the chat site URL
      const urlObj = new URL(url);
      const redirectPath = urlObj.pathname + urlObj.search;
      
      // Redirect through SSO login page
      const finalUrl = `https://demo-chat.ikoneworld.net/sso-login?token=${encodeURIComponent(token)}&redirect=${encodeURIComponent(redirectPath)}`;
      
      // Open in new window
      window.open(finalUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Error launching SSO:", err);
      // Fallback: open without token
      window.open(url, "_blank", "noopener,noreferrer");
    } finally {
      setIsLaunchingSSO(false);
    }
  };

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

  const isMoreActive = moreItems.some(item => isActive(item.href));

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
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Home Button */}
            <Link href="/">
              <Button
                variant={isActive("/") ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <Home className="h-4 w-4" />
                <span className="hidden xl:inline">Home</span>
              </Button>
            </Link>

            {/* Vertical Separator */}
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-border to-transparent mx-3" />

            {/* Exec Summary Button */}
            <Link href="/executive-intro">
              <Button
                variant={isActive("/executive-intro") ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <Briefcase className="h-4 w-4" />
                <span className="hidden xl:inline">Exec Summary</span>
              </Button>
            </Link>

            {/* Video Button */}
            <Link href="/videos">
              <Button
                variant={isActive("/videos") ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <Play className="h-4 w-4" />
                <span className="hidden xl:inline">Video</span>
              </Button>
            </Link>

            {/* Personas Button */}
            <Link href="/personas">
              <Button
                variant={isActive("/personas") ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <Users className="h-4 w-4" />
                <span className="hidden xl:inline">Personas</span>
              </Button>
            </Link>

            {/* Vertical Separator */}
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-border to-transparent mx-3" />

            {/* More Dropdown */}
            <div className="relative group">
              <Button
                variant={isMoreActive ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <span className="hidden xl:inline">More</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
              
              {/* Dropdown Menu */}
              <div className="absolute left-0 mt-0 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
                {moreItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  const isExternal = item.href.startsWith('http://') || item.href.startsWith('https://');
                  const requiresSSO = 'requiresSSO' in item && item.requiresSSO;
                  
                  if (isExternal) {
                    return (
                      <button
                        key={item.href}
                        onClick={() => requiresSSO ? handleSSOLaunch(item.href) : window.open(item.href, '_blank', 'noopener,noreferrer')}
                        disabled={isLaunchingSSO}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent rounded-none text-left disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Icon className="h-4 w-4" />
                        {isLaunchingSSO && requiresSSO ? 'Launching...' : item.name}
                      </button>
                    );
                  }
                  
                  return (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant={active ? "default" : "ghost"}
                        size="sm"
                        className="w-full justify-start gap-2 rounded-none px-4"
                      >
                        <Icon className="h-4 w-4" />
                        {item.name}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Logout Button - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {user && (
              <span className="text-sm text-gray-600">Welcome, <span className="font-semibold">{user}</span></span>
            )}
            {isAdmin && (
              <Link href="/admin">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                >
                  <Briefcase className="h-4 w-4" />
                  <span>Admin</span>
                </Button>
              </Link>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>

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
                {/* Home Button */}
                <Link href="/">
                  <Button
                    variant={isActive("/") ? "default" : "ghost"}
                    className="w-full justify-start gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Home className="h-4 w-4" />
                    Home
                  </Button>
                </Link>

                {/* Separator */}
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-2" />

                {/* Exec Summary Button */}
                <Link href="/executive-intro">
                  <Button
                    variant={isActive("/executive-intro") ? "default" : "ghost"}
                    className="w-full justify-start gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Briefcase className="h-4 w-4" />
                    Exec Summary
                  </Button>
                </Link>

                {/* Video Button */}
                <Link href="/videos">
                  <Button
                    variant={isActive("/videos") ? "default" : "ghost"}
                    className="w-full justify-start gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Play className="h-4 w-4" />
                    Video
                  </Button>
                </Link>

                {/* Personas Button */}
                <Link href="/personas">
                  <Button
                    variant={isActive("/personas") ? "default" : "ghost"}
                    className="w-full justify-start gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Users className="h-4 w-4" />
                    Personas
                  </Button>
                </Link>

                {/* Separator */}
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-2" />

                {/* More Section */}
                <div className="text-xs font-semibold text-muted-foreground px-3 py-2">
                  More
                </div>
                {moreItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  const isExternal = item.href.startsWith('http://') || item.href.startsWith('https://');
                  const requiresSSO = 'requiresSSO' in item && item.requiresSSO;
                  
                  if (isExternal) {
                    return (
                      <button
                        key={item.href}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          if (requiresSSO) {
                            handleSSOLaunch(item.href);
                          } else {
                            window.open(item.href, '_blank', 'noopener,noreferrer');
                          }
                        }}
                        disabled={isLaunchingSSO}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-md text-left disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Icon className="h-4 w-4" />
                        {isLaunchingSSO && requiresSSO ? 'Launching...' : item.name}
                      </button>
                    );
                  }
                  
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

                {/* User Info and Logout */}
                {user && (
                  <div className="px-3 py-2">
                    <p className="text-xs text-gray-600 mb-2">Logged in as: <span className="font-semibold">{user}</span></p>
                  </div>
                )}
                {isAdmin && (
                  <Link href="/admin">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Briefcase className="h-4 w-4" />
                      Admin Panel
                    </Button>
                  </Link>
                )}
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
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

