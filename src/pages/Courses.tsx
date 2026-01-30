import { useState } from 'react';
import { GraduationCap, ChevronDown, ChevronUp, Calendar, ExternalLink } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { cn } from '@/lib/utils';

interface Course {
  id: number;
  title: string;
  platform: string;
  completionDate: string;
  description: string;
  keyLearnings: string[];
}

const courses: Course[] = [
  {
    id: 1,
    title: 'Advanced React Patterns',
    platform: 'Frontend Masters',
    completionDate: 'December 2023',
    description: 'Deep dive into advanced React patterns including compound components, render props, and hooks.',
    keyLearnings: [
      'Compound component pattern for flexible APIs',
      'Custom hooks for reusable stateful logic',
      'Performance optimization with useMemo and useCallback',
    ],
  },
  {
    id: 2,
    title: 'Machine Learning Specialization',
    platform: 'Coursera',
    completionDate: 'August 2023',
    description: 'Comprehensive ML course covering supervised learning, neural networks, and deep learning.',
    keyLearnings: [
      'Building and training neural networks',
      'Feature engineering and data preprocessing',
      'Model evaluation and hyperparameter tuning',
    ],
  },
  {
    id: 3,
    title: 'Three.js Journey',
    platform: 'Three.js Journey',
    completionDate: 'May 2023',
    description: 'Complete guide to creating 3D experiences on the web using Three.js and WebGL.',
    keyLearnings: [
      'Scene, camera, and renderer setup',
      'Custom shaders and materials',
      'Physics integration and animations',
    ],
  },
  {
    id: 4,
    title: 'AWS Solutions Architect',
    platform: 'AWS Training',
    completionDate: 'February 2023',
    description: 'Official AWS certification preparation covering cloud architecture best practices.',
    keyLearnings: [
      'Designing scalable and fault-tolerant systems',
      'Cost optimization strategies',
      'Security best practices in the cloud',
    ],
  },
  {
    id: 5,
    title: 'TypeScript Fundamentals',
    platform: 'Udemy',
    completionDate: 'November 2022',
    description: 'From JavaScript to TypeScript: type safety, generics, and advanced types.',
    keyLearnings: [
      'Type inference and type guards',
      'Generic types and utility types',
      'Integration with React and Node.js',
    ],
  },
];

const Courses = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleCourse = (id: number) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4">
        <PageHeader
          title="Courses & Certifications"
          subtitle="The Library - Continuous learning and professional development"
          icon={GraduationCap}
        />

        <div className="max-w-3xl mx-auto space-y-4">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="bg-card border border-border rounded-xl overflow-hidden opacity-0 animate-fade-in transition-all duration-300 hover:border-primary/30"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <button
                onClick={() => toggleCourse(course.id)}
                className="w-full p-6 text-left hover:bg-muted/30 transition-colors duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                      {course.id}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-display font-bold text-foreground group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <ExternalLink className="w-4 h-4" />
                          {course.platform}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {course.completionDate}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {course.description}
                      </p>
                    </div>
                  </div>
                  <div className={cn(
                    "p-2 rounded-lg transition-all duration-300 flex-shrink-0",
                    expandedId === course.id ? "bg-primary text-primary-foreground" : "bg-muted"
                  )}>
                    {expandedId === course.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </button>

              {/* Expandable Content */}
              <div className={cn(
                "overflow-hidden transition-all duration-300",
                expandedId === course.id ? "max-h-96" : "max-h-0"
              )}>
                <div className="px-6 pb-6">
                  <div className="ml-12 border-t border-border pt-4">
                    <h4 className="text-sm font-semibold text-primary mb-3">Key Learnings</h4>
                    <ul className="space-y-2">
                      {course.keyLearnings.map((learning, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                          {learning}
                        </li>
                      ))}
                    </ul>
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

export default Courses;
