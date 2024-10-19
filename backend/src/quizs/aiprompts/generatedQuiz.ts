export interface IQuizOptions {
  answer: string;
  correct: boolean;
}

export interface IQuizQuestion {
  question: string;
  questionOptions: IQuizOptions[];
}

export interface IGeneratedQuiz {
  quizQuestions: IQuizQuestion[];
}
