export interface IQuiz {
  id: number
  topic: string
  questions: IQuizQuestion[]
}

export interface IQuizQuestion {
  id: number
  question: string
  questionOptions: IQuizOption[]
  current: boolean
}

export interface IQuizOption {
  id: number
  answer: string
  correct?: boolean
}
