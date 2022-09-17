<script setup lang="ts">
import { createCollection } from '../../utils/FA2/contracts'
import { reactive, ref } from 'vue';
import { useWalletStore } from '../../store';
import { createCollectionMeta } from '../../utils/FA2/metadata'
import { TezosToolkit } from '@taquito/taquito'
import { useLocalStorage } from '@vueuse/core'
const contractAddress = ref('')
const error = ref('')
const isSetMetadata = ref(true)

const metadataField = reactive({
  name:'', 
  description:'', 
  homepage:'', 
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
  licenseName: { name: 'MIT' },
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
  const address = await createCollection(wallet.$state.walletInstance as TezosToolkit,wallet.$state.address,metadata)
  if(address.endsWith('error')){
    error.value = address
  }else{
    contractAddress.value = address
    useLocalStorage('contractAddress',address)
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
    <el-form-item label="Homepage">
      <el-input v-model="metadataField.homepage" />
    </el-form-item>
    <el-form-item label="Author">
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
    <div><el-icon><ArrowLeftBold /></el-icon>Back</div>
    <p>Check the contract JSON that you will deploy</p>
    <pre>{{JSON.stringify(metadata, null, 2)}}</pre>
    <el-divider />
    <el-button type="primary" @click="handleCreateCollection">Deploy</el-button>
    <p v-if="contractAddress">Contract address: {{contractAddress}} </p>
    <p v-if="error">{{error}}</p>
  </template>
</template>
