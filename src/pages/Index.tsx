import { useState } from 'react';
import { Home, FolderOpen, Briefcase, FileText, GraduationCap, Award, Users, Share2, Mail, ChevronDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RoomCard from '@/components/RoomCard';

const rooms = [
  {
    title: 'Projects',
    description: 'The Roof - Showcasing my best work',
    teaser: 'Explore innovative projects spanning AI, web development, and 3D visualization.',
    icon: FolderOpen,
    to: '/projects',
  },
  {
    title: 'Experience',
    description: 'The Foundation - Professional journey',
    teaser: 'A timeline of roles that built my expertise in technology and leadership.',
    icon: Briefcase,
    to: '/experience',
  },
  {
    title: 'CV',
    description: 'The Blueprint - Complete overview',
    teaser: 'Education, skills, and work history compiled in a structured format.',
    icon: FileText,
    to: '/cv',
  },
  {
    title: 'Courses',
    description: 'The Library - Continuous learning',
    teaser: 'Certifications and courses that keep my knowledge current.',
    icon: GraduationCap,
    to: '/courses',
  },
  {
    title: 'Transcript',
    description: 'The Records - Academic achievements',
    teaser: 'Detailed academic performance and grades.',
    icon: Award,
    to: '/transcript',
  },
  {
    title: 'Leadership',
    description: 'The Meeting Room - Leadership roles',
    teaser: 'Positions where I led teams and drove organizational change.',
    icon: Users,
    to: '/leadership',
  },
  {
    title: 'Social Media',
    description: 'The Windows - Connect with me',
    teaser: 'Find me on professional platforms and social networks.',
    icon: Share2,
    to: '/social',
  },
  {
    title: 'Contact',
    description: 'The Door - Get in touch',
    teaser: 'Ready to collaborate? Reach out through the contact form.',
    icon: Mail,
    to: '/contact',
  },
];

const Index = () => {
  const scrollToRooms = () => {
    document.getElementById('rooms')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 nvidia-gradient overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

        {/* 3D Viewer Placeholder */}
        <div 
          id="threejs-viewer"
          className="relative w-full max-w-4xl h-64 md:h-[400px] lg:h-[500px] rounded-2xl border border-border bg-card/50 backdrop-blur-sm flex items-center justify-center mb-12 animate-fade-in overflow-hidden"
        >
          {/* Animated House Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <Home className="w-24 h-24 md:w-32 md:h-32 text-primary/30 animate-float" />
              <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-primary animate-pulse" />
            </div>
          </div>
          
          <div className="relative z-10 text-center p-6">
            <p className="text-muted-foreground text-sm md:text-base">
              3D House Viewer Placeholder
            </p>
            <p className="text-muted-foreground/60 text-xs mt-2">
              Hover sections here in future updates
            </p>
          </div>

          {/* Corner Decorations */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/50" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/50" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/50" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/50" />
        </div>

        {/* Intro Text */}
        <div className="text-center max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gradient-green mb-6">
            Explore My Portfolio as an Interactive House
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Each section represents a room in this digital architecture. 
            The <span className="text-primary font-semibold">Roof</span> showcases projects, 
            the <span className="text-primary font-semibold">Foundation</span> holds experience, 
            and every room tells a story of growth and innovation.
          </p>
          
          <Button 
            variant="hero" 
            size="xl"
            onClick={scrollToRooms}
            className="group"
          >
            Enter the House
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
          </Button>
        </div>
      </section>

      {/* Rooms Grid Section */}
      <section id="rooms" className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Navigate the <span className="text-primary">Rooms</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each room contains a unique aspect of my professional journey. 
              Hover over a card to preview, click to explore.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {rooms.map((room, index) => (
              <RoomCard
                key={room.to}
                {...room}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
