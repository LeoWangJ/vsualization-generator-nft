<script setup lang="ts">
import { onMounted } from 'vue'
import { createCollection, showBalances } from './utils/FA2/contracts'
import { pinFile } from './utils/FA2/ipfs';
import { showNFTMetadata } from './utils/FA2/metadata';
import { connect, getSigner } from './utils/wallet'
onMounted(async () => {
  const wallet = await connect()
  if (wallet) {
    const { address, walletInstance } = await getSigner(wallet)
    const balances = await showBalances({
      tz: walletInstance,
      ownerAddress: address,
      nftAddress: 'KT1ABJsFWGLUoLYcAKwPwKfsi34KAnr5K3rk',
      tokens: ['1', '2']
    })
    console.log(balances)
    await showNFTMetadata(walletInstance, 'KT1ABJsFWGLUoLYcAKwPwKfsi34KAnr5K3rk', ['1', '2'])
    await pinFile({
      apiKey: 'd6d52f1bf82aacb65ecf',
      secretKey: 'cb6a51b85d2b5e4144b25a7eb9e6c1a859a1dbd6fe5d625b61eb1fb96530743b',
      name: 'leowang1.json',
      metadata: {
        "decimals": 0,
        "isBooleanAmount": true,
        "name": "Token1",
        "description": "",
        "tags": [
          "awesome",
          "nft"
        ],
        "minter": "tz1Miryg4mYhjwdpgvJwhx2qbxg7P5yFnXMZ",
        "artifactUri": "ipfs://QmRyTc9KbD7ZSkmEf4e7fk6A44RPciW5pM4iyqRGrhbyvj",
        "displayUri": "ipfs://QmRyTc9KbD7ZSkmEf4e7fk6A44RPciW5pM4iyqRGrhbyvj",
        "thumbnailUri": "ipfs://QmRyTc9KbD7ZSkmEf4e7fk6A44RPciW5pM4iyqRGrhbyvj",
        "creators": [],
        "rights": "",
        "attributes": [
          {
            "name": "sample attribute",
            "value": "sample value"
          }
        ]
      }
    })
  }
})
</script>

<template>
  <div>
  </div>
</template>
