import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Home, FolderOpen, Briefcase, FileText, GraduationCap, Award, Users, Share2, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const navLinks = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/projects', label: 'Projects', icon: FolderOpen },
  { to: '/experience', label: 'Experience', icon: Briefcase },
  { to: '/cv', label: 'CV', icon: FileText },
  { to: '/courses', label: 'Courses', icon: GraduationCap },
  { to: '/transcript', label: 'Transcript', icon: Award },
  { to: '/leadership', label: 'Leadership', icon: Users },
  { to: '/social', label: 'Social', icon: Share2 },
  { to: '/contact', label: 'Contact', icon: Mail },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="blueprint-text text-xl font-bold text-primary hover:text-primary/80 transition-colors duration-300"
          >
            3D House Portfolio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "nav-link px-3 py-2 text-sm font-medium rounded-md flex items-center gap-1.5",
                  location.pathname === link.to
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="relative overflow-hidden"
            >
              <Sun className={cn(
                "h-5 w-5 transition-all duration-300",
                theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
              )} />
              <Moon className={cn(
                "absolute h-5 w-5 transition-all duration-300",
                theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
              )} />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-out",
          isOpen ? "max-h-[500px] pb-4" : "max-h-0"
        )}>
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
                  location.pathname === link.to
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
