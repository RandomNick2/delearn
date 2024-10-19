<template>
  {{ currentText }}
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const props = defineProps<{
  text: string
  speed?: number
}>()

const currentText = ref<string>('')

const startTyping = () => {
  currentText.value = ''

  let index = 0
  const type = () => {
    if (index < props.text.length) {
      currentText.value += props.text[index]
      index++
      setTimeout(type, props.speed || 70)
    }
  }

  type()
}

onMounted(() => {
  startTyping()
})
</script>
