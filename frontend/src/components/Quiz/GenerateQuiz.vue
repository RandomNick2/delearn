<template>
  <div class="generate-quiz">
    <h1>
      <TypingText text="Генерация quiz" />
    </h1>
    <input v-model="topic" placeholder="Тема квиза" />
    <span v-if="isError">Ошибка! Попробуйте ещё раз</span>
    <button :disabled="isLoading" @click="generateQuiz">
      <ConnectWallet v-if="!account.connected"
        >Подключить кошелёк
      </ConnectWallet>
      <span v-else-if="!isLoading">Генерировать!</span>
      <span v-else><TypingText :speed="250" text="Генерация..." /></span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import ConnectWallet from '@/components/Layout/ConnectWallet.vue'
import TypingText from '@/components/TypingText.vue'
import { useGenerateQuiz } from '@/composables/useGenerateQuiz'
import { account } from '@kolirt/vue-web3-auth'

const { topic, generateQuiz, isLoading, isError } = useGenerateQuiz()
</script>

<style lang="scss" scoped>
.generate-quiz {
  @apply pt-64 flex flex-col gap-4;

  h1 {
    @apply text-2xl;
  }

  input {
    @apply flex items-center pl-4;
    height: 50px;
    background: rgba(37, 37, 50, 0.6);
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #252532;
  }

  button {
    @apply py-3.5 text-xl;
    background: linear-gradient(90deg, #0cbaf1 0%, #e95ce9 100%);
    letter-spacing: 0.1em;
  }
}
</style>
