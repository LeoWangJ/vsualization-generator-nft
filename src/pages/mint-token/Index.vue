<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import {  toRaw } from 'vue';
import {IPFS_URL_PREFIX} from '@/utils/constants'
import { mintNfts } from '@/utils/FA2/contracts'
import { useWalletStore } from '@/store'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'

const nftCollectionLocal = useLocalStorage('nftCollection',{})


const handleMint = async (collection,address) =>{
  const wallet = useWalletStore()
  try{
    await mintNfts({
      wallet:toRaw(wallet.$state.walletInstance), 
      address:toRaw(wallet.$state.address), 
      collectionAddress:address, 
      tokens:[{tokenId:collection.tokenId,metadataUri:collection.metadataUri}]
    })
    ElMessage({ message: 'success!',type: 'success', })
    nftCollectionLocal.value[address] = nftCollectionLocal.value[address].map(nft => {
      if(nft.tokenId === collection.tokenId) return {...nft,minted:true}
      return nft
    })
  }catch(e){
    ElMessage({ message: 'error!',type: 'error', })

  }
  
}

</script>

<template>
  <el-row 
      v-for="(nftCollection, address) in nftCollectionLocal"
      :key="address">
      <div>Contract: {{address}}</div>
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
  </el-row>
</template>
