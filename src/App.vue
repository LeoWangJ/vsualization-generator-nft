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
