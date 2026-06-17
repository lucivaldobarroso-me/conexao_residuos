export type WasteGroup = 'A' | 'B' | 'C' | 'D' | 'E';
export type Language = 'pt' | 'en' | 'es';

export interface WasteInfo {
  id: WasteGroup;
  title: string;
  subtitle: string;
  description: string;
  examples: {
    label: string;
    description: string;
    icon: string;
  }[];
  disposal: {
    instructions: string;
    container: string;
    image: string;
  };
  risks: string[];
  mistakes: string[];
  summary: {
    attribute: string;
    specification: string;
    term: string;
  }[];
  practicalTip: string;
}

export interface Scenario {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  wrong: string;
  right: string;
  attention?: string;
  groups?: WasteGroup[];
  sector?: string;
  reference?: string;
}

export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizParticipant {
  id: string;
  participantName: string;
  profession: string;
  cpfMask: string;
  attemptCount: number;
}

export interface QuizLeaderboardEntry {
  id: string;
  participantName: string;
  profession: string;
  cpfMask: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  durationSeconds: number;
  completedAt: string;
}

export interface QuizStats {
  participantCount: number;
  attemptCount: number;
  averagePercentage: number;
  mostUsedQuestionCount: number | null;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  action: string;
  description: string;
  icon: string;
  color?: string;
  targetTab?: string;
  targetGroupId?: WasteGroup;
}

export interface UIStrings {
  dashboard: string;
  groups: string;
  scenarios: string;
  quiz: string;
  history: string;
  back: string;
  search: string;
  risks: string;
  mistakes: string;
  technicalSummary: string;
  practicalTipTitle: string;
  share: string;
  examplesTitle: string;
  instructions: string;
  container: string;
  clearHistory: string;
  noHistory: string;
  noHistorySub: string;
  results: string;
  score: string;
  restart: string;
}
