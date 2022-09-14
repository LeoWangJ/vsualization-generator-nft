import { PollingSubscribeProvider, TezosToolkit } from '@taquito/taquito';
import { TempleDAppNetwork, TempleWallet } from '@temple-wallet/dapp'
import { NETWORK, RPC_URL } from './constants';

export async function connect() {
  try {
    const mywallet = new TempleWallet('vsualization-generator-nft')
    if (mywallet.permission === null) {
      await mywallet.connect({ name: NETWORK.testnet, rpc: RPC_URL.testnet } as TempleDAppNetwork)
    }
    return mywallet
  } catch (err) {
    console.log(`connect error:`, err);
  }
}

export async function getSigner(wallet: TempleWallet) {
  const Tezos = await wallet.toTezos()
  Tezos.setProvider({ wallet })
  return {
    address: await wallet.getPKH(),
    walletInstance: Tezos
  }
}

export function createToolkitWithoutSigner(): TezosToolkit {
  const toolkit = new TezosToolkit(RPC_URL.testnet)
  toolkit.setStreamProvider(
    toolkit.getFactory(PollingSubscribeProvider)({
      pollingIntervalMilliseconds: 5000
    })
  );
  return toolkit;
}