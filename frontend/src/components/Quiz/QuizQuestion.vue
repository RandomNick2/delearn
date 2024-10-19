<template>
  <div>
    <div class="question">
      <div class="question-header">
        <div class="question-title">{{ question?.question }}</div>
      </div>
      <div class="question-body">
        <QuizOption
          v-for="option in question?.questionOptions"
          :key="option.id"
          :option="option"
          @click="addAnswer(option.id)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import QuizOption from '@/components/Quiz/QuizOption.vue'
import { useQuizStore } from '@/stores/quiz.store'
import { computed } from 'vue'

const { quiz, addAnswer } = useQuizStore()
const question = computed(() => {
  return quiz?.questions.filter(q => q.current)[0]
})
</script>

<style lang="scss" scoped>
.question {
  @apply flex flex-col gap-4 pt-7;

  &-header {
    @apply p-3;
  }

  &-title {
    @apply text-2xl;
  }

  &-body {
    @apply flex flex-col gap-3;
  }
}
</style>
