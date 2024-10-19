import { $http } from '@/api/index'
import { type IQuiz } from '@/types/quiz.types'
import type { IResult } from '@/types/result.types'

class QuizApi {
  async generate(topic: string): Promise<IQuiz> {
    return (
      await $http.post<IQuiz>('/quizs/generate', {
        topic,
      })
    ).data
  }

  async submit(
    quizId: number | undefined,
    answers: number[],
    address: `0x${string}` | undefined,
  ): Promise<IResult> {
    return (
      await $http.put<IResult>('/quizs/submit', {
        quizId,
        answers,
        address,
      })
    ).data
  }
}

export const quizApi = new QuizApi()
