export interface Topic {
  id: string;
  title: string;
  slug: string;
  category: string;
  icon: string;
  summary: string;
  description: string;
  keyPoints: string[];
  codeExample?: string;
  whenToUse?: string;
  commonMistakes?: string[];
  interviewQuestion?: string;
  interviewAnswerShort?: string;
  interviewAnswerStructured?: string;
  hasDemo: boolean;
  demoComponent?: string;
}

export interface TopicCategory {
  name: string;
  icon: string;
  topics: Topic[];
}
