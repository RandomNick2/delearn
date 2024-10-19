<template>
  <div
    :class="{ correct: option.correct, chosen: answers.includes(option.id) }"
    class="question-option"
  >
    {{ option.answer }}
  </div>
</template>

<script lang="ts" setup>
import { useQuizStore } from '@/stores/quiz.store'
import type { IQuizOption } from '@/types/quiz.types'

defineProps<{
  option: IQuizOption
}>()

const { answers } = useQuizStore()
</script>

<style lang="scss" scoped>
.question-option {
  @apply p-4 w-full text-lg;
  background: rgba(37, 37, 50, 0.6);
  border-radius: 4px;

  &.correct {
    background-color: #00c566;
  }

  &.chosen {
    border: 2px solid #b0b0b2;

    &:not(.correct) {
      background-color: #ff4747;
    }
  }
}
</style>
