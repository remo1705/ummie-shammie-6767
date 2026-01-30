import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoomCardProps {
  title: string;
  description: string;
  teaser: string;
  icon: LucideIcon;
  to: string;
  delay?: number;
}

const RoomCard = ({ title, description, teaser, icon: Icon, to, delay = 0 }: RoomCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={to}
      className={cn(
        "group relative block bg-card border border-border rounded-xl p-6 card-hover overflow-hidden",
        "opacity-0 animate-fade-in"
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Glow */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300",
        isHovered && "opacity-100"
      )} />

      {/* Icon */}
      <div className={cn(
        "w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 transition-all duration-300",
        isHovered && "bg-primary shadow-nvidia"
      )}>
        <Icon className={cn(
          "w-6 h-6 transition-colors duration-300",
          isHovered ? "text-primary-foreground" : "text-primary"
        )} />
      </div>

      {/* Content */}
      <h3 className="text-lg font-display font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>

      {/* Expanded Teaser */}
      <div className={cn(
        "overflow-hidden transition-all duration-300",
        isHovered ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
      )}>
        <p className="text-xs text-muted-foreground border-t border-border pt-3 mt-3">
          {teaser}
        </p>
      </div>

      {/* Arrow */}
      <div className={cn(
        "absolute bottom-6 right-6 transition-all duration-300",
        isHovered ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
      )}>
        <ChevronRight className="w-5 h-5 text-primary" />
      </div>
    </Link>
  );
};

export default RoomCard;
