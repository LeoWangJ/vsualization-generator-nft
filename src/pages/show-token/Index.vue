<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { onMounted,toRaw,reactive } from 'vue'
import {IPFS_URL_PREFIX} from '@/utils/constants'
import { showBalances } from '@/utils/FA2/contracts'
import { useWalletStore } from '@/store'
import {showNFTMetadata} from '@/utils/FA2/metadata'

const nftCollectionLocal = useLocalStorage('nftCollection',{})
const ownerToken = reactive([])

onMounted(async()=>{
  await showBalance()
})
const showBalance = async () => {
  const wallet = useWalletStore()
  for(const nftAddress in nftCollectionLocal.value){
    const nftCollection = nftCollectionLocal.value[nftAddress]
    const tokenIds = nftCollection.map(nft => `${nft.tokenId}`)
    const balances = await showBalances({ 
      tz: toRaw(wallet.$state.walletInstance), 
      ownerAddress:toRaw(wallet.$state.address), 
      nftAddress:nftAddress, 
      tokens:tokenIds })
      console.log(balances)
      console.log(nftAddress)
      const list = await showNFTMetadata(toRaw(wallet.$state.walletInstance),nftAddress,['1'])
      console.log(list)
   // TODO : 顯示 balance > 1 , showNFTMetadata, 取得token image, 顯示 tokenId, nftAddress, metadata ipfs 
  }
}
</script>

<template>
  <!-- <el-row 
      v-for="(nftCollection, address) in nftCollectionLocal"
      :key="address">
      <div>{{address}}</div>
      <el-col style="display:flex">
        <el-col
          v-for="(collection) in nftCollection"
          :key="collection.tokenId"
          :span="8"
        >
          <el-card :body-style="{ padding: '0px' }">
            <img
              :src="`${IPFS_URL_PREFIX}${collection.image}`"
              class="image"
            />
            <div style="padding: 14px">
              <span>TokenId: {{collection.tokenId}}</span>
              <div>Metadata IPFS: {{collection.metadataUri}}</div>
              <div class="bottom">
                <el-button type="primary" @click="handleMint(collection,address)" :disabled="collection.minted">MINT</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-col>
  </el-row> -->
</template>
