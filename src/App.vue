<script setup lang="ts">
import { onMounted } from 'vue'
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
