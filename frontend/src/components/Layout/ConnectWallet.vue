<template>
  <div @click="connect(Chains.mainnet)">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { Chains, connect } from '@kolirt/vue-web3-auth'
</script>
