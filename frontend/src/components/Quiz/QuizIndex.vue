<template>
  <div>
    <div ref="index" class="indexs">
      <div
        v-for="(question, index) in quiz?.questions"
        :key="question.id"
        :class="{ active: question.current }"
        @click="setCurrentQuestion(question.id)"
      >
        {{ index + 1 }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useQuizStore } from '@/stores/quiz.store'
import { useTemplateRef, watch } from 'vue'

const { quiz, setCurrent, answers } = useQuizStore()

const indexRef = useTemplateRef<HTMLDivElement>('index')

watch(answers, () => {
  if (!indexRef.value) return
  indexRef.value.scrollBy({
    behavior: 'smooth',
    left: 40,
  })
})

const setCurrentQuestion = (questionId: number) => {
  const { isFinished } = useQuizStore()
  if (!isFinished) return
  setCurrent(questionId)
}
</script>

<style lang="scss" scoped>
.indexs {
  @apply mt-5 min-w-full pb-3 flex flex-col gap-4 flex-wrap overflow-x-auto;
  max-height: 45px;

  > div {
    @apply flex items-center justify-center;
    width: 40px;
    height: 45px;
    background: rgba(37, 37, 50, 0.6);
    border-radius: 4px;

    &.active {
      background: linear-gradient(90deg, #0cbaf1 0%, #e95ce9 100%);
    }
  }
}
</style>
