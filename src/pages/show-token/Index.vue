<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { onMounted,toRaw,reactive } from 'vue'
import {IPFS_URL_PREFIX} from '@/utils/constants'
import { showBalances } from '@/utils/FA2/contracts'
import { useWalletStore } from '@/store'
import {showNFTMetadata} from '@/utils/FA2/metadata'
import { NftCollectionLocal } from '@/utils/FA2/type'

const nftCollectionLocal = useLocalStorage<NftCollectionLocal>('nftCollection',{})
</script>

<template>
  <el-row 
      v-for="(nftCollection, address) in nftCollectionLocal"
      :key="address">
      <div style="margin: 10px;">Contract: {{address}}</div>
      <el-col style="display:flex">
        <el-col
          v-for="(collection) in nftCollection"
          :key="collection.tokenId"
          :span="8"
          v-show="collection.minted === true"
        >
          <el-card :body-style="{ padding: '0px' }" >
            <img
              :src="`${IPFS_URL_PREFIX}${collection.image}`"
              class="image"
            />
            <div style="padding: 14px">
              <span>TokenId: {{collection.tokenId}}</span>
              <div>Metadata IPFS: {{collection.metadataUri}}</div>
            </div>
          </el-card>
        </el-col>
      </el-col>
  </el-row>
</template>
