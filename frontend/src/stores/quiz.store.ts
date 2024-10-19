import { quizApi } from '@/api/quiz.api'
import type { IQuiz } from '@/types/quiz.types'
import { account } from '@kolirt/vue-web3-auth'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useQuizStore = defineStore('quiz', () => {
  const quiz = reactive<IQuiz>({ id: 0, questions: [], topic: '' })
  const answers = ref<number[]>([])
  const isFinished = ref<boolean>(false)
  const correctAnswered = ref<number>(0)

  const submitAnswers = async () => {
    isFinished.value = true
    const results = await quizApi.submit(
      quiz?.id,
      answers.value,
      account.address,
    )
    correctAnswered.value = results.correctAnsweredOptions.length
    quiz?.questions.forEach(q => {
      q.questionOptions.forEach(option => {
        option.correct = results.correctAnswersArray.includes(option.id)
      })
    })
  }

  const addAnswer = async (optionId: number) => {
    if (isFinished.value) return

    answers.value.push(optionId)
    const lastQuestion = quiz?.questions[quiz?.questions.length - 1]
    const question = quiz?.questions.find(quiz =>
      quiz.questionOptions.map(o => o.id).includes(optionId),
    )
    if (lastQuestion && question && lastQuestion.id === question.id) {
      await submitAnswers()
      return
    }
    const currentQuestionIndex = quiz?.questions.findIndex(
      question => question.current,
    )
    if (currentQuestionIndex == undefined) return
    quiz?.questions.forEach((question, index) => {
      question.current = index === currentQuestionIndex + 1
    })
  }

  const setCurrent = (questionId: number) => {
    quiz?.questions.forEach(q => {
      q.current = q.id === questionId
    })
  }

  const setQuiz = (newQuiz: IQuiz) => {
    quiz.questions = newQuiz.questions
    quiz.id = newQuiz.id
    quiz.topic = newQuiz.topic
    quiz.questions[0].current = true
  }

  return {
    quiz,
    answers,
    isFinished,
    correctAnswered,
    setQuiz,
    addAnswer,
    setCurrent,
  }
})
