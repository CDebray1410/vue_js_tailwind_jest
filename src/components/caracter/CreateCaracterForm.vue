<template>
    <form action="" method="post" class="caracter_form">
        <div class="group_form">
            <input required type="text" name="name" placeholder="Nom" v-model.trim="name" />
        </div>
        <div class="group_form">
            <input required type="number" name="life" min="1" placeholder="Vie" v-model="life" />
            <input required type="number" name="attack" min="1" placeholder="Attaque" v-model="attack" />
            <input required type="number" name="defense" min="1" placeholder="Defense" v-model="defense" />
        </div>
        <div class="group_form">
            <input required type="number" name="speed" min="1" placeholder="Vitesse" v-model="speed" />
            <input required type="number" name="agility" min="1" placeholder="Agilité" v-model="agility" />
            <input required type="number" name="luck" min="1" placeholder="Chance" v-model="luck" />
        </div>
        <div class="group_form">
            <div>
                <label for="npc-caracterType-radio">Npc</label>
                <input required type="radio" name="caracterType" id="npc-caracterType-radio" value="npc" v-model="caracterType" />
            </div>
            <div>
                <label for="player-caracterType-radio">Joueur</label>
                <input required type="radio" name="caracterType" id="player-caracterType-radio" value="player" v-model="caracterType" />
            </div>
        </div>
        <div v-if="caracterType === 'npc'" >
            <div class="group_form">
                <select v-model="behaviour">
                    <option v-for="behaviourOption in behaviourList" v-bind:value="behaviourOption.value" v-bind:key="behaviourOption.value">
                        {{ behaviourOption.text }}
                    </option>
                </select>

                <select v-model="awarness">
                    <option v-for="awarnessOption in awarnessList" v-bind:key="awarnessOption.value" v-bind:value="awarnessOption.value">
                        {{ awarnessOption.text }}
                    </option>
                </select>

                <select v-model="background">
                    <option v-for="backgroundOption in backgroundList" v-bind:key="backgroundOption.value" v-bind:value="backgroundOption.value">
                        {{ backgroundOption.text }}
                    </option>
                </select>
            </div>
        </div>
        <button v-on:click="this.createCaracter($event)">Créer un personnage</button>
    </form>
</template>

<script>

export default {
    name: "CreateCaracterForm",
    data () {
        return {
            caracterType: null,
            behaviourList: [
                { text: 'Amical', value: 'friendly' },
                { text: 'Neutre', value: 'neutral' },
                { text: 'Agressif', value: 'aggresive' }
            ],
            awarnessList: [
                { text: 'Inattentif', value: 'none' },
                { text: 'Faible', value: 'low' },
                { text: 'Moyenne', value: 'medium' },
                { text: 'Haute', value: 'high' }
            ],
            backgroundList: [
                { text: 'Soldat', value: 'soldier' },
                { text: 'Paysan', value: 'villager' },
                { text: 'Noble de bas rang', value: 'chief-small' },
                { text: 'Noble de rang moyen', value: 'chief-medium' },
                { text: 'Noble de haut rang', value: 'chief-high' }
            ]
        }
    },
    props: {},
    methods: {
        createCaracter(event) {
            event.preventDefault()
            let caracter = {
                "name": this.name,
                "life": this.life,
                "attack": this.attack,
                "defense": this.defense,
                "speed": this.speed,
                "agility": this.agility,
                "luck": this.luck,
                "items": [],
                "caracterType": "player"
            }

            if(this.caracterType === 'npc') {
                caracter.behaviour = this.behaviour,
                caracter.background = this.background,
                caracter.awarness = this.awarness,
                caracter.caracterType = "npc"
            }
            this.$emit('createdCaracter', caracter);
        }
    }
}
</script>

<style>

</style>