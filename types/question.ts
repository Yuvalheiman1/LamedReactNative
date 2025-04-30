// types/question.ts
export interface Question {
    id: number;
    text: {
      he: string;
      en: string;
      ar: string;
    };
    options: {
      he: string;
      en: string;
      ar: string;
    }[];
    correctOptionIndex: number;
    explanation: {
      he: string;
      en: string;
      ar: string;
    };
    isImportant: boolean;
    categoryId: number;
    relatedSignId: number;
    imageSource?: string;
  }
  