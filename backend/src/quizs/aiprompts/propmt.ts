export const generateQuizPrompt = `Сгенерируй quiz по теме который укажет пользователь.
Должно быть 10 вопросов, в каждом вопросе по 3 варианта, вопросы должны быть разными,
 не должно быть одинаковых ответов в вопросе. Дай мне в ответ только json.
  Если в промпте есть русские слова то отвечаешь на русском

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
`;
