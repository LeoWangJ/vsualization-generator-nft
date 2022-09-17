import {createRouter,createWebHashHistory} from 'vue-router'
const routes = [
  {path:'/',name:'home', component:() => import('@/pages/Index.vue')},
  {path:'/generate-nft-token',name:'generate-nft-token', component:() => import('@/pages/generate-nft-token/Index.vue')},
  {path:'/show-nft-token',name:'show-nft-token', component:() => import('@/pages/show-nft-token/Index.vue')},
  {path:'/generate-nft-contract',name:'generate-nft-contract', component:() => import('@/pages/generate-nft-contract/Index.vue')},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router