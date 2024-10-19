import './assets/styles/main.scss'
import { Chains, createWeb3Auth } from '@kolirt/vue-web3-auth'
import cloneDeep from 'lodash.clonedeep'
import { createPinia } from 'pinia'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(
  createWeb3Auth({
    projectId: 'c4875b80ef444b63d8097f1269064e29', // generate here https://cloud.walletconnect.com/ and turn on 'Supports Sign v2'
    chains: [Chains.bsc, Chains.mainnet, Chains.polygon],
  }),
)

const store = createPinia()
store.use(({ store }) => {
  const initialState = cloneDeep(store.$state)
  store.$reset = () => {
    store.$patch($state => {
      Object.assign($state, initialState)
    })
  }
})
app.use(store)
app.use(router)

app.mount('#app')
