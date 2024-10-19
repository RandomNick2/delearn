<template>
  <div class="pt-5">
    <QuizIndex />
    <QuizQuestion />
    <QuizResults v-if="quizStore.isFinished" />
    <button
      v-if="quizStore.isFinished"
      class="bg-blue-600 fixed w-4/5 bottom-6 p-4 rounded-sm"
      @click="
        () => {
          quizStore.$reset()
          $router.push({ name: 'home' })
        }
      "
    >
      Попробовать ещё
    </button>
  </div>
</template>

<script lang="ts" setup>
import QuizIndex from '@/components/Quiz/QuizIndex.vue'
import QuizQuestion from '@/components/Quiz/QuizQuestion.vue'
import QuizResults from '@/components/Quiz/QuizResults.vue'
import { useQuizStore } from '@/stores/quiz.store'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const quizStore = useQuizStore()
const { push } = useRouter()

onMounted(async () => {
  if (quizStore.quiz.topic === '') await push({ name: 'home' })
})
</script>

<style scoped></style>
