import { useState } from 'react';
import { Users, ChevronRight, Trophy, Star } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Modal from '@/components/Modal';
import { cn } from '@/lib/utils';

interface LeadershipRole {
  id: number;
  title: string;
  organization: string;
  period: string;
  summary: string;
  details: string[];
  achievements: string[];
}

const leadershipRoles: LeadershipRole[] = [
  {
    id: 1,
    title: 'Tech Club President',
    organization: 'University Tech Society',
    period: '2022 - 2023',
    summary: 'Led a team of 50+ members organizing hackathons and workshops',
    details: [
      'Managed annual budget of $25,000 for events and resources',
      'Coordinated with industry sponsors including Google and Microsoft',
      'Organized bi-weekly workshops on emerging technologies',
    ],
    achievements: [
      'Grew membership by 150% in one year',
      'Hosted the largest campus hackathon with 500+ participants',
      'Secured $10,000 in additional sponsorship funding',
    ],
  },
  {
    id: 2,
    title: 'Open Source Maintainer',
    organization: 'React UI Library',
    period: '2021 - Present',
    summary: 'Core maintainer of a popular React component library with 5K+ stars',
    details: [
      'Review and merge pull requests from community contributors',
      'Manage release cycles and maintain documentation',
      'Provide support through GitHub issues and Discord',
    ],
    achievements: [
      'Grew community from 1K to 5K+ GitHub stars',
      'Onboarded 20+ regular contributors',
      'Featured in React ecosystem newsletters',
    ],
  },
  {
    id: 3,
    title: 'Volunteer Tech Lead',
    organization: 'Code for Good',
    period: '2020 - 2021',
    summary: 'Led development of web applications for non-profit organizations',
    details: [
      'Coordinated team of 8 volunteer developers',
      'Managed project timelines and client communications',
      'Implemented agile methodologies for efficient delivery',
    ],
    achievements: [
      'Delivered 5 projects for local non-profits',
      'Reduced manual processes by 60% for partner organizations',
      'Trained 15 new volunteers in web development',
    ],
  },
  {
    id: 4,
    title: 'Student Ambassador',
    organization: 'Major Tech Conference',
    period: '2019 - 2020',
    summary: 'Represented the university at national technology conferences',
    details: [
      'Networked with industry professionals and recruiters',
      'Presented student projects to potential sponsors',
      'Organized travel and accommodation for student delegations',
    ],
    achievements: [
      'Secured 10+ internship offers for fellow students',
      'Established ongoing partnership with 3 tech companies',
      'Featured in conference highlight reel',
    ],
  },
];

const Leadership = () => {
  const [selectedRole, setSelectedRole] = useState<LeadershipRole | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4">
        <PageHeader
          title="Leadership Experience"
          subtitle="The Meeting Room - Roles where I led, mentored, and drove change"
          icon={Users}
        />

        <div className="max-w-3xl mx-auto space-y-4">
          {leadershipRoles.map((role, index) => (
            <div
              key={role.id}
              onClick={() => setSelectedRole(role)}
              onMouseEnter={() => setHoveredId(role.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={cn(
                "bg-card border border-border rounded-xl p-6 cursor-pointer transition-all duration-300 opacity-0 animate-fade-in",
                hoveredId === role.id && "border-primary/50 shadow-nvidia bg-primary/5"
              )}
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className={cn(
                      "w-5 h-5 transition-colors duration-300",
                      hoveredId === role.id ? "text-primary" : "text-muted-foreground"
                    )} />
                    <span className="text-sm text-muted-foreground">{role.period}</span>
                  </div>
                  <h3 className={cn(
                    "text-lg font-display font-bold transition-colors duration-300",
                    hoveredId === role.id ? "text-primary" : "text-foreground"
                  )}>
                    {role.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">{role.organization}</p>
                  <p className="text-foreground mt-3">{role.summary}</p>

                  {/* Sub-bullets Preview */}
                  <ul className="mt-3 space-y-1">
                    {role.details.slice(0, 2).map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1 h-1 bg-primary/50 rounded-full mt-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={cn(
                  "p-2 rounded-lg transition-all duration-300",
                  hoveredId === role.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leadership Modal */}
        <Modal
          isOpen={!!selectedRole}
          onClose={() => setSelectedRole(null)}
          title={selectedRole?.title || ''}
        >
          {selectedRole && (
            <div className="space-y-6">
              <div>
                <p className="text-primary font-medium">{selectedRole.organization}</p>
                <p className="text-sm text-muted-foreground">{selectedRole.period}</p>
              </div>

              <p className="text-foreground leading-relaxed">{selectedRole.summary}</p>

              {/* Responsibilities */}
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-3">Responsibilities</h4>
                <ul className="space-y-2">
                  {selectedRole.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-foreground">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Achievements */}
              <div className="pt-4 border-t border-border">
                <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary" />
                  Key Achievements
                </h4>
                <ul className="space-y-2">
                  {selectedRole.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-foreground">
                      <Trophy className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Leadership;
