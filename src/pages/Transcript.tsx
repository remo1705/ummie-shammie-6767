import { useState, useMemo } from 'react';
import { Award, ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { cn } from '@/lib/utils';

interface TranscriptEntry {
  subject: string;
  grade: string;
  semester: string;
  credits: number;
}

const transcriptData: TranscriptEntry[] = [
  { subject: 'Advanced Algorithms', grade: 'A', semester: 'Fall 2023', credits: 4 },
  { subject: 'Machine Learning', grade: 'A+', semester: 'Fall 2023', credits: 4 },
  { subject: 'Computer Graphics', grade: 'A-', semester: 'Spring 2023', credits: 3 },
  { subject: 'Database Systems', grade: 'A', semester: 'Spring 2023', credits: 4 },
  { subject: 'Software Engineering', grade: 'A', semester: 'Fall 2022', credits: 4 },
  { subject: 'Operating Systems', grade: 'B+', semester: 'Fall 2022', credits: 4 },
  { subject: 'Data Structures', grade: 'A+', semester: 'Spring 2022', credits: 4 },
];

type SortField = 'subject' | 'grade' | 'semester';
type SortDirection = 'asc' | 'desc';

const gradeOrder: Record<string, number> = {
  'A+': 10, 'A': 9, 'A-': 8, 'B+': 7, 'B': 6, 'B-': 5,
  'C+': 4, 'C': 3, 'C-': 2, 'D': 1, 'F': 0,
};

const Transcript = () => {
  const [sortField, setSortField] = useState<SortField>('semester');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = useMemo(() => {
    return [...transcriptData].sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'subject':
          comparison = a.subject.localeCompare(b.subject);
          break;
        case 'grade':
          comparison = (gradeOrder[b.grade] || 0) - (gradeOrder[a.grade] || 0);
          break;
        case 'semester':
          comparison = a.semester.localeCompare(b.semester);
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [sortField, sortDirection]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 text-muted-foreground" />;
    }
    return sortDirection === 'asc' 
      ? <ChevronUp className="w-4 h-4 text-primary" />
      : <ChevronDown className="w-4 h-4 text-primary" />;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4">
        <PageHeader
          title="Academic Transcript"
          subtitle="The Records - Detailed academic performance and achievements"
          icon={Award}
        />

        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-xl overflow-hidden opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left p-4">
                      <button
                        onClick={() => handleSort('subject')}
                        className="flex items-center gap-2 font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        Subject
                        <SortIcon field="subject" />
                      </button>
                    </th>
                    <th className="text-left p-4">
                      <button
                        onClick={() => handleSort('grade')}
                        className="flex items-center gap-2 font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        Grade
                        <SortIcon field="grade" />
                      </button>
                    </th>
                    <th className="text-left p-4">
                      <button
                        onClick={() => handleSort('semester')}
                        className="flex items-center gap-2 font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        Semester
                        <SortIcon field="semester" />
                      </button>
                    </th>
                    <th className="text-left p-4 font-semibold text-foreground">
                      Credits
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((entry, index) => (
                    <tr
                      key={entry.subject}
                      className={cn(
                        "border-b border-border last:border-b-0 transition-colors duration-200 hover:bg-primary/5",
                        index % 2 === 0 ? "bg-background" : "bg-muted/30"
                      )}
                    >
                      <td className="p-4 font-medium">{entry.subject}</td>
                      <td className="p-4">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-sm font-semibold",
                          entry.grade.startsWith('A') 
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        )}>
                          {entry.grade}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground">{entry.semester}</td>
                      <td className="p-4 text-muted-foreground">{entry.credits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-border">
              {sortedData.map((entry, index) => (
                <div
                  key={entry.subject}
                  className={cn(
                    "p-4",
                    index % 2 === 0 ? "bg-background" : "bg-muted/30"
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-foreground">{entry.subject}</h3>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-sm font-semibold",
                      entry.grade.startsWith('A')
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    )}>
                      {entry.grade}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{entry.semester}</span>
                    <span>{entry.credits} credits</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GPA Summary */}
          <div className="mt-6 p-6 bg-card border border-border rounded-xl opacity-0 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Cumulative GPA</span>
              <span className="text-2xl font-display font-bold text-primary">3.87 / 4.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transcript;
