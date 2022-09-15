<script setup lang="ts">
import { onMounted } from 'vue'
import { createCollection, mintNfts } from './utils/FA2/contracts'
import { connect, getSigner } from './utils/wallet'
onMounted(async () => {
  const wallet = await connect()
  if (wallet) {
    const { address, walletInstance } = await getSigner(wallet)
    mintNfts({
      wallet: walletInstance,
      address,
      collectionAddress: 'KT1ABJsFWGLUoLYcAKwPwKfsi34KAnr5K3rk',
      tokens: [{ tokenId: 1, metadataUri: 'ipfs://QmVuKT3HEoRXmaCTjUkzhNdWLfmyv6jXG7ug1NL1UX73hU' }]
    })
  }
})
</script>

<template>
  <div>
  </div>
</template>
