import { useState } from 'react';
import { FileText, ChevronDown, ChevronUp, GraduationCap, Wrench, Briefcase } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { cn } from '@/lib/utils';

const skills = [
  'React', 'TypeScript', 'Three.js', 'Node.js', 'Python',
  'TensorFlow', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL'
];

const education = [
  {
    school: 'Stanford University',
    degree: 'M.S. Computer Science',
    dates: '2015 - 2017',
  },
  {
    school: 'MIT',
    degree: 'B.S. Computer Engineering',
    dates: '2011 - 2015',
  },
];

const workHistory = [
  {
    title: 'Senior Software Engineer',
    company: 'Tech Innovations Inc.',
    dates: 'Jan 2022 - Present',
    description: 'Leading frontend architecture and mentoring team members',
  },
  {
    title: 'Full Stack Developer',
    company: 'Digital Solutions Ltd.',
    dates: 'Mar 2019 - Dec 2021',
    description: 'Building scalable web applications and APIs',
  },
  {
    title: 'Junior Developer',
    company: 'StartUp Ventures',
    dates: 'Jun 2017 - Feb 2019',
    description: 'Frontend development and testing',
  },
];

interface SectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection = ({ title, icon: Icon, children, defaultOpen = true }: SectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 hover:bg-muted/50 transition-colors duration-300"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-display font-bold">{title}</h3>
        </div>
        <div className={cn(
          "p-2 rounded-lg transition-all duration-300",
          isOpen ? "bg-primary text-primary-foreground" : "bg-muted"
        )}>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      <div className={cn(
        "overflow-hidden transition-all duration-300",
        isOpen ? "max-h-[1000px]" : "max-h-0"
      )}>
        <div className="p-6 pt-0 border-t border-border">
          {children}
        </div>
      </div>
    </div>
  );
};

const CV = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4">
        <PageHeader
          title="Curriculum Vitae"
          subtitle="The Blueprint - A comprehensive overview of qualifications"
          icon={FileText}
        />

        <div className="max-w-3xl mx-auto space-y-6">
          {/* Education */}
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
            <CollapsibleSection title="Education" icon={GraduationCap}>
              <div className="space-y-4 mt-4">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-4 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <h4 className="font-semibold text-foreground">{edu.school}</h4>
                      <p className="text-muted-foreground">{edu.degree}</p>
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">{edu.dates}</span>
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          </div>

          {/* Skills */}
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            <CollapsibleSection title="Skills" icon={Wrench}>
              <div className="flex flex-wrap gap-3 mt-4">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={cn(
                      "px-4 py-2 rounded-full font-medium text-sm cursor-pointer transition-all duration-300",
                      hoveredSkill === skill
                        ? "bg-primary text-primary-foreground shadow-nvidia scale-110"
                        : "bg-primary/10 text-primary hover:bg-primary/20"
                    )}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CollapsibleSection>
          </div>

          {/* Work History */}
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <CollapsibleSection title="Work History" icon={Briefcase}>
              <div className="space-y-4 mt-4">
                {workHistory.map((job, index) => (
                  <div
                    key={index}
                    className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <h4 className="font-semibold text-primary">{job.title}</h4>
                        <p className="text-foreground">{job.company}</p>
                        <p className="text-sm text-muted-foreground mt-1">{job.description}</p>
                      </div>
                      <span className="text-sm text-muted-foreground whitespace-nowrap">{job.dates}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CV;
