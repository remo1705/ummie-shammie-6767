import { useState } from 'react';
import { Briefcase, ChevronDown, ChevronUp, MapPin, Calendar } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { cn } from '@/lib/utils';

interface ExperienceEntry {
  id: number;
  title: string;
  company: string;
  location: string;
  dates: string;
  responsibilities: string[];
}

const experiences: ExperienceEntry[] = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'Tech Innovations Inc.',
    location: 'San Francisco, CA',
    dates: 'Jan 2022 - Present',
    responsibilities: [
      'Led development of microservices architecture serving 10M+ users',
      'Mentored team of 5 junior developers and conducted code reviews',
      'Reduced system latency by 40% through performance optimization',
      'Implemented CI/CD pipelines reducing deployment time by 60%',
    ],
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    company: 'Digital Solutions Ltd.',
    location: 'New York, NY',
    dates: 'Mar 2019 - Dec 2021',
    responsibilities: [
      'Built and maintained React applications with TypeScript',
      'Designed RESTful APIs using Node.js and Express',
      'Collaborated with UX team to implement responsive designs',
      'Managed PostgreSQL databases and optimized complex queries',
    ],
  },
  {
    id: 3,
    title: 'Junior Developer',
    company: 'StartUp Ventures',
    location: 'Austin, TX',
    dates: 'Jun 2017 - Feb 2019',
    responsibilities: [
      'Developed frontend features using React and Redux',
      'Participated in agile sprints and daily standups',
      'Wrote unit tests achieving 80% code coverage',
      'Contributed to open-source projects and documentation',
    ],
  },
];

const Experience = () => {
  const [expandedItems, setExpandedItems] = useState<number[]>([1]);

  const toggleItem = (id: number) => {
    setExpandedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4">
        <PageHeader
          title="Experience"
          subtitle="The Foundation - A timeline of professional growth and achievements"
          icon={Briefcase}
        />

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-border" />

          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="relative pl-12 md:pl-20 pb-12 last:pb-0 opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms`, animationFillMode: 'forwards' }}
            >
              {/* Timeline Dot */}
              <div className={cn(
                "absolute left-2 md:left-6 w-5 h-5 rounded-full border-4 transition-all duration-300",
                expandedItems.includes(exp.id)
                  ? "bg-primary border-primary shadow-nvidia"
                  : "bg-card border-border"
              )} />

              {/* Card */}
              <div 
                className={cn(
                  "bg-card border border-border rounded-xl overflow-hidden cursor-pointer transition-all duration-300",
                  expandedItems.includes(exp.id) && "border-primary/50 shadow-nvidia"
                )}
                onClick={() => toggleItem(exp.id)}
              >
                {/* Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-display font-bold text-primary mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-foreground font-medium">{exp.company}</p>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {exp.dates}
                        </span>
                      </div>
                    </div>
                    <div className={cn(
                      "p-2 rounded-lg transition-all duration-300",
                      expandedItems.includes(exp.id) ? "bg-primary text-primary-foreground" : "bg-muted"
                    )}>
                      {expandedItems.includes(exp.id) ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expandable Content */}
                <div className={cn(
                  "overflow-hidden transition-all duration-300",
                  expandedItems.includes(exp.id) ? "max-h-96" : "max-h-0"
                )}>
                  <div className="px-6 pb-6">
                    <div className="border-t border-border pt-4">
                      <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                        Key Responsibilities & Achievements
                      </h4>
                      <ul className="space-y-2">
                        {exp.responsibilities.map((resp, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-foreground"
                          >
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
