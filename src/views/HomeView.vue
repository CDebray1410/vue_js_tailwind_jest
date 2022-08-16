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


        </section>

        <section>
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
        },
        player() {
            return this.$store.getters.getCurrentPlayer;
        },
        situations() {
            return this.$store.getters.getSituations;
        },
        currentSituation() {
            return this.$store.getters.getCurrentSituation;
        }
    },
    components: {
        CreateCaracterForm
    },
    props: {},
    mounted() {
        this.getRandomSituation()
    },
    methods: {
        // REFACTO loop througth each pnjs in order to display every dialogue of every involved caracters
        getRandomSituation() {
            let situation = this.situations[Math.floor(Math.random()*this.situations.length)];
            let npc = this.$store.getters.getNpcCaracterById(situation.npcId);
            this.$store.dispatch('storeCurrentSituation', {
                "situation": situation,
                "npc": npc,
            });

            let lines = ``;
            if (npc.behaviour === "friendly") {
                situation.lines.forEach(line => {
                    let lineContent = line.type === "quest" ? `<li class="text-tercaryColor">${line.content}</li>` : `<li>${line.content}</li>`
                    lines = lines + lineContent;
                })
    
                document.getElementById('situation_dialog').innerHTML = `<div>
                    <p class="text-lg" data-pnj-id="${npc.id}">${npc.name}</p>
                    <div>
                        <ol>
                            ${lines}
                        </ol>
                    </div>
                </div>`;
            }
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
                this.$store.dispatch('storePlayerCaracter', caracter);
                return;
            }

            caracter.id = this.npcCaracters.length + 1;
            this.$store.dispatch('storeNpcCaracter', caracter);
        }
    },
};
</script>
