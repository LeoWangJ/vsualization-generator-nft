<script setup lang="ts">
import { createCollection } from '@/utils/FA2/contracts'
import { reactive, ref, toRaw } from 'vue'
import { useWalletStore } from '@/store'
import { createCollectionMeta } from '@/utils/FA2/metadata'
import { TezosToolkit } from '@taquito/taquito'
import { useLocalStorage } from '@vueuse/core'
const contractAddress = ref('')
const error = ref('')
const isSetMetadata = ref(true)

const metadataField = reactive({
  name:'', 
  description:'', 
  author:'', 
  version:'1.0.0', 
  licenseName:'MIT'
})

let metadata = reactive({
  name:'', 
  description:'', 
  homepage:'', 
  authors:[], 
  version:'1.0.0', 
  licenseName:'MIT',
  interfaces: ['TZIP-016', 'TZIP-012', 'TZIP-021'],
  source: {
      tools: ['LIGO'],
      location: 'https://github.com/LeoWangJ/vsualization-generator-nft'
  }
})

const setCollectionMeta = () =>{
  metadata = Object.assign(metadata,createCollectionMeta(metadataField))
  isSetMetadata.value = false
}

const handleCreateCollection = async ()=>{
  const wallet = useWalletStore()
  const address = await createCollection(toRaw(wallet.$state.walletInstance) as TezosToolkit,wallet.$state.address,toRaw(metadata))
  if(address.endsWith('error')){
    error.value = address
  }else{
    contractAddress.value = address
    const contractAddressLocal = useLocalStorage('contractAddress','')
    contractAddressLocal.value = address
    const nftCollectionLocal = useLocalStorage('nftCollection',{})
    nftCollectionLocal.value = {...nftCollectionLocal.value,[address]:[]}
  }
}
</script>

<template>
  <template v-if="isSetMetadata">
    <h4>Fill in the information to be deployed</h4>
    <el-form
    label-position="left"
    label-width="100px"
    :model="metadataField"
    style="max-width: 460px;margin-top: 20px;"
  >
    <el-form-item label="Name">
      <el-input v-model="metadataField.name" />
    </el-form-item>
    <el-form-item label="Description">
      <el-input v-model="metadataField.description" />
    </el-form-item>
    <el-form-item label="Author" placeholder="Print Name <contact-url-or-email>">
      <el-input v-model="metadataField.author" />
    </el-form-item>
    <el-form-item label="Version">
      <el-input v-model="metadataField.version" />
    </el-form-item>
    <el-form-item label="License Name">
      <el-input v-model="metadataField.licenseName" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="setCollectionMeta">Submit</el-button>
    </el-form-item>
  </el-form>
  </template>
  <template v-else>
    <div @click="isSetMetadata = true"><el-icon><ArrowLeftBold /></el-icon>Back</div>
    <p>Check the contract metadata that you will deploy</p>
    <pre>{{JSON.stringify(metadata, null, 2)}}</pre>
    <el-divider />
    <el-button type="primary" @click="handleCreateCollection">Deploy</el-button>
    <p v-if="contractAddress">Check Contract address: <a :href="`https://better-call.dev/ghostnet/${contractAddress}/operations`" target="_blank"></a></p>
    <p v-if="error">{{error}}</p>
  </template>
</template>
