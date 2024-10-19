<template>
  <div class="layout-wrapper">
    <div class="layout-content">
      <slot />
      <ConnectWallet />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ConnectWallet from '@/components/Layout/ConnectWallet.vue'
</script>

<style lang="scss" scoped>
.layout-wrapper {
  @apply flex flex-col items-center w-dvw absolute left-0 top-0;

  .layout-content {
    @apply w-4/5 relative;
  }
}
</style>
