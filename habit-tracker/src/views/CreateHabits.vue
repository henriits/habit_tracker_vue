<template>
    <!-- Use the AddHabitForm component -->
    <AddHabitForm @add="addNewHabit"></AddHabitForm>
    <div>Create habits here!</div>
    <ul>
        <li v-for="(habit, index) in habits" :key="index">{{ habit }}</li>
    </ul>
</template>



<script setup>
import { ref } from 'vue';
import AddHabitForm from "../components/AddHabitForm.vue";

const habits = ref([]);

const addNewHabit = (habitName) => {
    habits.value.push(habitName); // Add the new habit to the list of habits
};
</script>