import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
}

const PageHeader = ({ title, subtitle, icon: Icon }: PageHeaderProps) => {
  return (
    <div className="text-center py-12 md:py-16 animate-fade-in">
      {Icon && (
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
          <Icon className="w-8 h-8 text-primary" />
        </div>
      )}
      <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient-green mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageHeader;
