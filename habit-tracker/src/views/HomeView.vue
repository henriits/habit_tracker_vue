<script setup>
import { ref } from 'vue';
import DateSelector from "../components/DatesView.vue"

const name = ref("Home View")

</script>

<template>

    <h1>{{ name }} </h1>
    <DateSelector></DateSelector>
    <div>Create habits here!</div>

</template>
