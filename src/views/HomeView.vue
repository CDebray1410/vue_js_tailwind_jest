<template>
    <main>
        <h1 class="text-center text-xl">Bienvenue sur Vue js</h1>
        <section class="show_container flex"  v-if="currentSituation">
            <div id="situation_dialog" v-if="currentSituation">
                <p class="text-lg" :data-pnj-id="currentSituation.npc.id">{{currentSituation.npc.name}}</p>
                <div>
                    <ol>
                        <li v-for="line in currentSituation.lines" :key="line.content" :class="[{ 'text-tercaryColor': line.type === 'quest' }]">
                            {{ line.content }}
                        </li>

                    </ol>
                </div>
            </div>
            <div id="situation_action">
                <button data-type="attack" v-on:click="this.clickAction($event)">Attack</button>
                <button data-type="steal" v-on:click="this.clickAction($event)">Steal</button>
            </div>
            <div id="situation_message">
            </div>

            <CreateCaracterForm @createdCaracter="createCaracter" />
        </section>

        <section v-if="player">
            <caption class="m-auto">Current player</caption>
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
                <tr>
                    <td>{{player.name }}</td>
                    <td>{{player.life}}</td>
                    <td>{{player.attack}}</td>
                    <td>{{player.defense}}</td>
                    <td>{{player.agility}}</td>
                    <td>{{player.speed}}</td>
                    <td>{{player.luck}}</td>
                </tr>
            </table>
        </section>
        <section>
            <div>
                <caption>Choisissez un personnage</caption>
                <CaractersInfosTable :caracters="playerCaracters" />
            </div>

            <div>
                <caption class="m-auto">Npcs</caption>
                <CaractersInfosTable :caracters="npcCaracters" :isNpcList="true" />
            </div>
        </section>
    </main>
</template>

<script>
import CreateCaracterForm from '../components/caracter/CreateCaracterForm.vue';
import CaractersInfosTable from '../components/caracter/CaractersInfosTable.vue';

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
            return this.$store.getters.getSituationsByType("starter");
        }
    },
    components: {
        CreateCaracterForm,
        CaractersInfosTable
    },
    props: {},
    mounted() {
        console.log(this.currentSituation)
    },
    methods: {
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
