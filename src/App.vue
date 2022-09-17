<script setup lang="ts">
import { onMounted } from 'vue'
import { useWalletStore } from '@/store'
import Header from '@/components/Header.vue'
onMounted(async () => {
  const wallet = useWalletStore()
  await wallet.setWallet()
})
</script>

<template>
  <Header></Header>
  <div>
    <router-view></router-view>
  </div>
</template>
