import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from "./router";
import './index.css'

const store = createStore({
    state () {
        return {
            playerCaracters: [
                {
                    "name": "Grunlek",
                    "life": 16,
                    "attack": 5,
                    "defense": 3,
                    "speed": 2,
                    "agility": 3,
                    "luck": 3,
                    "items": [],
                    "caracterType": "player",
                    "id": 1
                },
                {
                    "name": "Théo",
                    "life": 18,
                    "attack": 4,
                    "defense": 5,
                    "speed": 2,
                    "agility": 3,
                    "luck": 3,
                    "items": [],
                    "caracterType": "player",
                    "id": 2
                },
                {
                    "name": "Baltazar",
                    "life": 10,
                    "attack": 8,
                    "defense": 2,
                    "speed": 2,
                    "agility": 4,
                    "luck": 2,
                    "items": [],
                    "caracterType": "player",
                    "id": 3
                }
            ],
            npcCaracters: [
                {
                    "id": 1,
                    "name": "Valou",
                    "behaviour": "friendly",
                    "background": "villager",
                    "awarness": "none",
                    "life": 5,
                    "attack": 2,
                    "defense": 1,
                    "agility": 1,
                    "speed": 3,
                    "luck": 1,
                    // REFACTO add infos / data / description to items
                    "items": [
                        "bread"
                    ]
                },
            ],
            currentSituation: {
                "situation": null,
                "npc": null,
            },
        }
    },
    getters: {
        getPlayerCaracters(state) {
            return state.playerCaracters;
        },
        getPlayerCaracterById: (state) => (id) => {
            return state.playerCaracters.find(playerCaracter => playerCaracter.id === id)
        },
        getNpcCaracters(state) {
            return state.npcCaracters;
        },
        getNpcCaracterById: (state) => (id) => {
            return state.npcCaracters.find(npcCaracter => npcCaracter.id === id)
        },
    },
    mutations: {
        STORE_PLAYER_CARACTERS (state, playerCaracters) {
            state.playerCaracters = playerCaracters;
        },
        STORE_NPC_CARACTERS ({ state } ,npcCaracters) {
            state.npcCaracters = npcCaracters;
        }
    },
    actions: {
        storePlayerCaracters({ commit }, playerCaracters) {
            commit('STORE_PLAYER_CARACTERS', playerCaracters)
        },
        storeNpcCaracters({ commit }, npcCaracters) {
            commit('STORE_NPC_CARACTERS', npcCaracters)
        },
    }
})  

const app = createApp(App);
app.use(router);
app.use(store)
app.mount("#app");