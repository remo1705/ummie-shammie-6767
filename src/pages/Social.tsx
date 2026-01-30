import { useState } from 'react';
import { Share2, Github, Linkedin, Copy, Check, ExternalLink } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/yourusername',
    description: 'Check out my open source projects and contributions',
    color: 'hover:text-foreground',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com/in/yourusername',
    description: 'Connect with me professionally',
    color: 'hover:text-blue-500',
  },
];

const Social = () => {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4">
        <PageHeader
          title="Connect With Me"
          subtitle="The Windows - Find me across the digital landscape"
          icon={Share2}
        />

        <div className="max-w-2xl mx-auto">
          {/* Large Social Icons */}
          <div className="flex justify-center gap-12 mb-12">
            {socialLinks.map((social, index) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredIcon(social.name)}
                onMouseLeave={() => setHoveredIcon(null)}
                className={cn(
                  "group relative p-8 rounded-2xl bg-card border border-border transition-all duration-300 opacity-0 animate-fade-in",
                  hoveredIcon === social.name && "border-primary shadow-nvidia scale-105"
                )}
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
              >
                <social.icon className={cn(
                  "w-16 h-16 transition-all duration-300 icon-rotate",
                  hoveredIcon === social.name ? "text-primary" : "text-muted-foreground"
                )} />
                
                {/* Tooltip */}
                <div className={cn(
                  "absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full opacity-0 transition-all duration-300 pointer-events-none",
                  hoveredIcon === social.name && "opacity-100"
                )}>
                  <div className="bg-card border border-border rounded-lg px-4 py-2 shadow-lg whitespace-nowrap">
                    <p className="text-sm font-medium text-foreground">{social.name}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Social Cards */}
          <div className="space-y-4">
            {socialLinks.map((social, index) => (
              <div
                key={social.name}
                className="bg-card border border-border rounded-xl p-6 opacity-0 animate-fade-in"
                style={{ animationDelay: `${(index + 2) * 150}ms`, animationFillMode: 'forwards' }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <social.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground">{social.name}</h3>
                      <p className="text-sm text-muted-foreground">{social.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="nvidia-outline"
                      size="sm"
                      onClick={() => copyToClipboard(social.url)}
                    >
                      {copiedUrl === social.url ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </Button>
                    <Button
                      variant="nvidia"
                      size="sm"
                      asChild
                    >
                      <a href={social.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        Visit
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Follow Me Button */}
          <div className="text-center mt-12 opacity-0 animate-fade-in" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
            <Button
              variant="hero"
              size="xl"
              onClick={() => copyToClipboard(window.location.href)}
              className="group animate-glow-pulse"
            >
              {copiedUrl === window.location.href ? (
                <>
                  <Check className="w-5 h-5" />
                  Portfolio Link Copied!
                </>
              ) : (
                <>
                  <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  Share My Portfolio
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Social;
