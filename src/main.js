import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from "./router";
import './index.css'

const store = createStore({
    state () {
        return {
            playerCaracters: [],
            npcCaracters: [],
        }
    },
    mutations: {
        STORE_PLAYER_CARACTERS ({ state } ,playerCaracters) {
            state.playerCaracters = playerCaracters;
        },
        STORE_NPC_CARACTERS ({ state } ,npcCaracters) {
            state.npcCaracters = npcCaracters;
        }
    },
    actions: {
        storePlayerCaracters(context, playerCaracters) {
            context.commit('STORE_PLAYER_CARACTERS', playerCaracters)
        },
        storeNpcCaracters(context, npcCaracters) {
            context.commit('STORE_NPC_CARACTERS', npcCaracters)
        },
    }
})  

const app = createApp(App);
app.use(router);
app.use(store)
app.mount("#app");