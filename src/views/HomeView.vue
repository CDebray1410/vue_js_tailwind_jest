<template>
    <main>
        <h1 class="text-center text-xl">Bienvenue sur Vue js</h1>
        <section class="show_container flex">
            <div id="situation_dialog">
            </div>
            <div id="situation_action">
                <button data-type="attack" v-on:click="this.clickAction($event)">Attack</button>
                <button data-type="steal" v-on:click="this.clickAction($event)">Steal</button>
            </div>
            <div id="situation_message">
            </div>

            <CreateCaracterForm @createdCaracter="createCaracter" />

            <button data-modal-trigger="infos-modal" class="demo__btn demo__btn--secondary">Show caracters</button>
            
            <div class="modal" data-modal-name="infos-modal" data-modal-dismiss>
                <div class="modal__content">
                    <div>
                        <caption class="m-auto">Players</caption>
                        <table class="caracter_table">
                            <tr>
                                <th>name</th>
                                <th>life</th>
                                <th>attack</th>
                                <th>defense</th>
                                <th>agility</th>
                                <th>speed</th>
                                <th>luck</th>
                            </tr>
                            <tr v-for="playerCaracter in playerCaracters" v-bind:key="playerCaracter.id">
                                <td>{{ playerCaracter.name }}</td>
                                <td>{{playerCaracter.life}}</td>
                                <td>{{playerCaracter.attack}}</td>
                                <td>{{playerCaracter.defense}}</td>
                                <td>{{playerCaracter.agility}}</td>
                                <td>{{playerCaracter.speed}}</td>
                                <td>{{playerCaracter.luck}}</td>
                            </tr>
                        </table>
                    </div>

                    <div>
                        <caption class="m-auto">Npcs</caption>
                        <table class="caracter_table">
                            <tr>
                                <th>name</th>
                                <th>behaviour</th>
                                <th>background</th>
                                <th>awarness</th>
                                <th>life</th>
                                <th>attack</th>
                                <th>defense</th>
                                <th>agility</th>
                                <th>speed</th>
                                <th>luck</th>
                            </tr>
                            <tr v-for="npcCaracter in npcCaracters" v-bind:key="npcCaracter.id">
                                <td>{{ npcCaracter.name }}</td>
                                <td>{{npcCaracter.behaviour}}</td>
                                <td>{{npcCaracter.background}}</td>
                                <td>{{npcCaracter.awarness}}</td>
                                <td>{{npcCaracter.life}}</td>
                                <td>{{npcCaracter.attack}}</td>
                                <td>{{npcCaracter.defense}}</td>
                                <td>{{npcCaracter.agility}}</td>
                                <td>{{npcCaracter.speed}}</td>
                                <td>{{npcCaracter.luck}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>

        </section>
    </main>
</template>

<script>
import CreateCaracterForm from '../components/caracter/CreateCaracterForm.vue';

export default {
    name: "HomeView",
    computed: {
        playerCaracters() {
            return this.$store.getters.getPlayerCaracters;
        },
        npcCaracters() {
            return this.$store.getters.getNpcCaracters;
        }
    },
    components: {
        CreateCaracterForm
    },
    data() {
        return {
            playerCaracters: [
                {
                    "id": 1,
                    "name": "Warrior",
                    "life": 10,
                    "attack": 6,
                    "defense": 5,
                    "speed": 4,
                    "agility": 1,
                    "luck": 1,
                    "items": []
                }
            ],
            npcs: [
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
            situations: [
                {
                    "npc": [
                        {
                            "npcId": 1,
                            "lines": [
                                {
                                    "type": "quest",
                                    "content": "Go get my poney into the lake !",
                                    "reward": "Combat turtle"
                                },
                                {
                                    "type": "infos",
                                    "content": "Today is à sunny day !",
                                }
                            ]
                        }
                    ],
                }
            ],
            player: {
                "name": "Player",
                "life": 10,
                "attack": 6,
                "defense": 5,
                "speed": 4,
                "agility": 1,
                "luck": 1,
                "items": []
            },
            currentSituation: {
                "situation": null,
                "npc": null,
            },
        };
    },
    props: {},
    mounted() {
        this.getRandomSituation()
    },
    methods: {
        // REFACTO loop througth each pnjs in order to display every dialogue of every involved caracters
        getRandomSituation() {
            let situation = this.situations[Math.floor(Math.random()*this.situations.length)];
            let npc = this.getNpcById(situation.npc[0].npcId);
            this.currentSituation = {
                "situation": situation,
                "npc": npc[0],
            }

            let lines = ``;
            if (npc[0].behaviour === "friendly") {
                situation.npc[0].lines.forEach(line => {
                    let lineContent = line.type === "quest" ? `<li class="text-tercaryColor">${line.content}</li>` : `<li>${line.content}</li>`
                    lines = lines + lineContent;
                })
    
                document.getElementById('situation_dialog').innerHTML = `<div>
                    <p class="text-lg" data-pnj-id="${npc[0].id}">${npc[0].name}</p>
                    <div>
                        <ol>
                            ${lines}
                        </ol>
                    </div>
                </div>`;
            }
        },
        getNpcById(npcId) {
            return this.npcs.filter(npc => (npc.id === npcId));
        },
        clickAction(event) {
            let actionType = event.target.dataset.type;
            let chanceNumber = Math.floor(Math.random() * 11);
            let returnData;

            switch (actionType) {
                case "attack":
                    
                    break;
                case "steal":
                    let success = chanceNumber <= (1 + this.player.luck) ? true : false;
                    if(!success) {
                        returnData = {
                            "status": "error",
                            "message": `${this.currentSituation.npc.name} saw you and attack as payback !`
                        };
                        break;
                    }

                    let npcItemsLength = this.currentSituation.npc.items.length;
                    if (0 === npcItemsLength) {
                        returnData = {
                            "status": "error",
                            "message": `${this.currentSituation.npc.name} has no object to steal`
                        };
                        break;
                    }
                    let itemToGet = Math.floor(Math.random() * (npcItemsLength-1));
                    let item = this.currentSituation.npc.items[npcItemsLength-1];
                    this.player.items.push(item);
                    this.currentSituation.npc.items.splice(item,1);

                    returnData = {
                        "status": "success",
                        "message": `You stole '${item}'`
                    };
                    break;
                default:
                    alert("PROBLEM");
                    break;
            }

            this.displaySituationMessage(returnData);
        },
        displaySituationMessage(data) {
            let messageContent = `<div class="bg-${data.status}">
                ${data.message}
            </div>`
            document.getElementById('situation_message').innerHTML = messageContent
        },
        createCaracter(caracter) {
            if(caracter.caracterType === "player") {
                caracter.id = this.playerCaracters.length + 1;
                this.playerCaracters.push(caracter);
                console.log(this.$store.playerCaracters)
                this.$store.dispatch('storePlayerCaracters', caracter);
                console.log(this.$store.playerCaracters)
                return;
            }

            caracter.id = this.npcs.length + 1;
            this.npcs.push(caracter);
            this.$store.dispatch('storeNpcCaracters', caracter);
        }
    },
};
</script>
