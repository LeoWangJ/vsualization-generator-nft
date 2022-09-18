<script setup lang="ts">
import { computed, ref } from 'vue'
import { useWalletStore } from '../store'
const initActiveIndex = ():string => {
  const path = window.location.hash.replace('#/',"")
  return path === '' ? 'home' : path
}
const activeIndex = ref(initActiveIndex() as string)

const wallet = useWalletStore()
const address = computed(()=>{
  return wallet.getAddress
})

const menus = [
  { router: 'home',name:'HOME'},
  { router: 'generate-nft-contract',name:'GENERATE NFT CONTRACT'},
  { router: 'generate-nft-token',name:'GENERATE NFT TOKEN'},
  { router: 'mint-token',name:'MINT TOKEN'},
  { router: 'show-token',name:'SHOW TOKEN'},
]
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
  > 
    <el-menu-item v-for="menu in menus" :key="menu.router" :index="menu.router">
      <router-link :to="{name: menu.router}" custom v-slot="{navigate}"><span @click="navigate">{{menu.name}}</span></router-link>
    </el-menu-item>
    <div class="flex-grow"></div>
    <el-menu-item index="4" >
      <el-icon>
        <User />
      </el-icon> 
      {{address}}
    </el-menu-item>
  </el-menu>
</template>
<style>
  .flex-grow {
    flex-grow: 1;
  }
</style>