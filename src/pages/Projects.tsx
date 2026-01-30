import { useState } from 'react';
import { FolderOpen, ExternalLink, Github } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'AI-Powered Analytics Dashboard',
    description: 'Real-time data visualization platform with machine learning insights.',
    longDescription: 'A comprehensive analytics solution that processes millions of data points in real-time. Features include predictive modeling, anomaly detection, and automated report generation. Built with scalability in mind to handle enterprise-level workloads.',
    technologies: ['React', 'Python', 'TensorFlow', 'D3.js'],
  },
  {
    id: 2,
    title: '3D Product Configurator',
    description: 'Interactive 3D visualization tool for e-commerce customization.',
    longDescription: 'An immersive product customization experience that allows users to modify and view products in 3D. Supports real-time material changes, lighting adjustments, and AR preview on mobile devices.',
    technologies: ['Three.js', 'WebGL', 'React', 'Node.js'],
  },
  {
    id: 3,
    title: 'Smart Home IoT Platform',
    description: 'Unified control system for connected home devices.',
    longDescription: 'A centralized platform for managing smart home devices. Features voice control, automated routines, energy monitoring, and security alerts. Integrates with major IoT protocols and manufacturers.',
    technologies: ['React Native', 'MQTT', 'AWS IoT', 'GraphQL'],
  },
  {
    id: 4,
    title: 'Collaborative Design Tool',
    description: 'Real-time collaborative workspace for design teams.',
    longDescription: 'A Figma-like collaborative tool that enables design teams to work together in real-time. Features include version control, component libraries, design tokens, and developer handoff tools.',
    technologies: ['Vue.js', 'WebSocket', 'Canvas API', 'PostgreSQL'],
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4">
        <PageHeader
          title="Projects"
          subtitle="The Roof - A showcase of innovative solutions and creative builds"
          icon={FolderOpen}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group bg-card border border-border rounded-xl overflow-hidden cursor-pointer card-hover opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
            >
              {/* Image Placeholder */}
              <div className="relative h-48 bg-muted flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent z-10" />
                <span className="text-muted-foreground text-sm">Image Here</span>
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject?.title || ''}
        >
          {selectedProject && (
            <div className="space-y-6">
              {/* Image */}
              <div className="h-40 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Project Image</span>
              </div>

              {/* Description */}
              <p className="text-foreground leading-relaxed">
                {selectedProject.longDescription}
              </p>

              {/* Technologies */}
              <div>
                <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4 border-t border-border">
                <Button variant="nvidia" className="flex-1">
                  <ExternalLink className="w-4 h-4" />
                  View Live
                </Button>
                <Button variant="nvidia-outline" className="flex-1">
                  <Github className="w-4 h-4" />
                  Source Code
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Projects;
