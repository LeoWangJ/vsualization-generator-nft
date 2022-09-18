<script setup lang="ts">
import { reactive, ref } from 'vue';
import { createNFTMeta } from '@/utils/FA2/metadata'
import { useLocalStorage } from '@vueuse/core'
import { pinFile } from '@/utils/FA2/ipfs'
  const hash = ref('')
  const error = ref('')
  const isSetMetadata = ref(true)
  
  const metadataField = reactive({
    name:'', 
    description:'', 
    minterAddress:'', 
    artifactUri:''
  })
  const contractField = ref('')
  const contractAddress = useLocalStorage('contractAddress','')
  let metadata = reactive({
    decimals: 0,
    isBooleanAmount: true,
    name:'',
    description:'',
    tags:[],
    minter: '',
    artifactUri:'',
    displayUri: '',
    thumbnailUri: '',
    creators: [],
    rights: '',
    attributes: [{ name: 'sample attribute', value: 'sample value' }]
  })
  
  let pinataField = reactive({
    apiKey:'',
    secretKey:'',
    name:''
  })

  const setCollectionMeta = () =>{
    metadata = Object.assign(metadata,createNFTMeta(metadataField))
    isSetMetadata.value = false
  }

  const handlePinTokenMetadata = async ()=>{
    const tx = await pinFile({
      apiKey:pinataField.apiKey,
      secretKey:pinataField.secretKey,
      name:pinataField.name,
      metadata:metadata
    })
    hash.value = tx
    const nftCollection = useLocalStorage('nftCollection',{})
    
    //@ts-ignore
    if(nftCollection.value[contractField.value]  && nftCollection.value[contractField.value].length !== 0){
      //@ts-ignore
      nftCollection.value = {...nftCollection.value, [contractField.value]:[...nftCollection.value[contractField.value],{tokenId:nftCollection.value[contractField.value].length +1,metadataUri:`ipfs://${tx}`,image: metadataField.artifactUri.replace("ipfs://",""),minted:false}]} 
    }else{
      nftCollection.value = {...nftCollection.value,[contractField.value]:[{tokenId:1,metadataUri:`ipfs://${tx}`,image: metadataField.artifactUri.replace("ipfs://",""),minted:false}]}
    }
  }
  </script>
  
  <template>
    <template v-if="isSetMetadata">
      <h4>Fill in the information to be generated</h4>
      <p>{{contractAddress === ''? `No` : contractAddress}} contract address you created last time, you can also choose to fill in other contract address. </p>
      <el-form
        label-position="left"
        label-width="180px"
        :model="metadataField"
        style="max-width: 460px;margin-top: 20px;"
      > 
        <el-form-item label="Contract address">
          <el-input v-model="contractField" />
        </el-form-item>
        <el-form-item label="Name">
          <el-input v-model="metadataField.name" />
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="metadataField.description" />
        </el-form-item>
        <el-form-item label="Token issuer address">
          <el-input v-model="metadataField.minterAddress" />
        </el-form-item>
        <el-form-item label="Image IPFS link">
          <el-input v-model="metadataField.artifactUri" placeholder="ipfs://"/>
          <p>You can upload pictures with <a href="https://www.pinata.cloud/" taget="_blank">pinata</a> to obtain IPFS pictures link.</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="setCollectionMeta">Submit</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template v-else>
      <div @click="isSetMetadata = true"><el-icon><ArrowLeftBold /></el-icon>Back</div>
      <p>Check the metadata that you will generate</p>
      <pre>{{JSON.stringify(metadata, null, 2)}}</pre>
      <el-divider />
      <p>Pin Token Metadata on IPFS</p>
      <el-form
        label-position="left"
        label-width="140px"
        :model="pinataField"
        style="max-width: 460px;margin-top: 20px;"
      >
        <el-form-item label="File name">
          <el-input v-model="pinataField.name" />
        </el-form-item>
        <el-form-item label="Pinata api key">
          <el-input v-model="pinataField.apiKey" />
        </el-form-item>
        <el-form-item label="Pinata secret key">
          <el-input v-model="pinataField.secretKey" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handlePinTokenMetadata">Pin Token</el-button>
        </el-form-item>
      </el-form>
      <p v-if="hash">ipfs: {{hash}} </p>
      <p v-if="error">{{error}}</p>
    </template>
  </template>
  