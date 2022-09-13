<script setup lang="ts">
import { onMounted } from 'vue'
import { createCollection } from './utils/FA2/contracts'
import { connect, getSigner } from './utils/wallet'
onMounted(async () => {
  const wallet = await connect()
  if(wallet){
    const {address,walletInstance } = await getSigner(wallet)
    console.log(address,walletInstance)
    const testmeta = {
  "name": "leowang",
  "description": "Awesome NFT collection",
  "homepage": "https://github.com/oxheadalpha/nft-tutorial",
  "authors": [
    "John Doe <john.doe@johndoe.com>"
  ],
  "version": "1.0.0",
  "license": {
    "name": "MIT"
  },
  "interfaces": [
    "TZIP-016",
    "TZIP-012",
    "TZIP-021"
  ],
  "source": {
    "tools": [
      "LIGO"
    ],
    "location": "https://github.com/oxheadalpha/nft-tutorial"
  }
}
    createCollection(walletInstance,address,testmeta)
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
