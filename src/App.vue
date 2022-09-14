<script setup lang="ts">
import { onMounted } from 'vue'
import { createCollection } from './utils/FA2/contracts'
import { connect, getSigner } from './utils/wallet'
onMounted(async () => {
  const wallet = await connect()
  if (wallet) {
    const { address, walletInstance } = await getSigner(wallet)
  }
})
</script>

<template>
  <div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
