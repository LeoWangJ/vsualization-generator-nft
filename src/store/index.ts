import { TezosToolkit } from "@taquito/taquito"
import { defineStore } from "pinia"
import { connect, getSigner } from "../utils/wallet"

export const useWalletStore = defineStore('wallet', {
  state: () => ({
    address: '', 
    walletInstance: null as TezosToolkit | null
  }),
  getters:{
    getAddress():string{
      return this.address
    },
    getWalletInstance(): TezosToolkit | null{
      return this.walletInstance as TezosToolkit | null
    }

  },
  actions: {
    async setWallet() {
      const wallet = await connect()
      if (wallet) {
        const { address, walletInstance } = await getSigner(wallet)
        this.address = address
        this.walletInstance = walletInstance
      }
    },
  },
})