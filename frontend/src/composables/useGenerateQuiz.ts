import { quizApi } from '@/api/quiz.api'
import { useQuizStore } from '@/stores/quiz.store'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useGenerateQuiz = () => {
  const topic = ref<string>('')
  const isLoading = ref<boolean>(false)
  const isError = ref<boolean>(false)
  const { setQuiz } = useQuizStore()
  const { push } = useRouter()

  const generateQuiz = async () => {
    try {
      if (topic.value.trim() == '') return
      isLoading.value = true
      setQuiz(await quizApi.generate(topic.value))
      await push({ name: 'quiz' })
    } catch (e) {
      console.error(e)
      isError.value = true
      isLoading.value = false
    }
  }
  return { topic, generateQuiz, isLoading, isError }
}
