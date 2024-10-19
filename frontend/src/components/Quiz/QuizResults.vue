<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      Вы ответили правильно на {{ quizStore.correctAnswered }}/10 вопроса 🥳<br />Вы
      получили {{ quizStore.correctAnswered }} Quiz Token
      <button
        class="mt-2"
        @click="
          () => {
            quizStore.$reset()
            $router.push({ name: 'home' })
          }
        "
      >
        Сгенерировать ещё
      </button>
      <button
        class="mt-1 bg-transparent w-full py-1"
        @click="isVisible = false"
      >
        Посмотреть ответы
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useQuizStore } from '@/stores/quiz.store'
import { ref } from 'vue'

const isVisible = ref<boolean>(true)
const quizStore = useQuizStore()
</script>

<style lang="scss" scoped>
.modal {
  @apply fixed left-0 top-0 z-50 w-dvw h-full flex justify-center items-center;

  .modal-content {
    @apply p-6 text-xl w-4/5 rounded-b-md shadow-2xl;
    background-color: #252532;

    button:not(.mt-1) {
      @apply py-3.5 text-xl w-full;
      background: linear-gradient(90deg, #0cbaf1 0%, #e95ce9 100%);
      letter-spacing: 0.1em;
    }
  }
}
</style>
