<template>
    <table class="caracter_table">
        <tr>
            <th>name</th>
            <th v-if="true == isNpcList">behaviour</th>
            <th v-if="true == isNpcList">background</th>
            <th v-if="true == isNpcList">awarness</th>
            <th>life</th>
            <th>attack</th>
            <th>defense</th>
            <th>agility</th>
            <th>speed</th>
            <th>luck</th>
        </tr>
        <tr v-for="caracter in caracters" v-bind:key="caracter.id">
            <td>{{ caracter.name }}</td>
            <td v-if="true == isNpcList">{{caracter.behaviour}}</td>
            <td v-if="true == isNpcList">{{caracter.background}}</td>
            <td v-if="true == isNpcList">{{caracter.awarness}}</td>
            <td>{{caracter.life}}</td>
            <td>{{caracter.attack}}</td>
            <td>{{caracter.defense}}</td>
            <td>{{caracter.agility}}</td>
            <td>{{caracter.speed}}</td>
            <td>{{caracter.luck}}</td>
            <td v-if="false == isNpcList" @click="choosePlayerCaracter($event)" :data-caracter="JSON.stringify(caracter)">Choose caracter</td>
        </tr>
    </table>
</template>

<script>
export default {
    props: {
        caracters: Array,
        isNpcList: {
            default: false,
            type: Boolean
        }
    },
    methods: {
        choosePlayerCaracter(event) {
            let caracter = JSON.parse(event.target.dataset.caracter);
            this.$store.dispatch('setCurrentPlayerCaracter', caracter)
        }
    }
}
</script>

<style>

</style>