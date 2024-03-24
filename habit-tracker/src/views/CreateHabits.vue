<template>
    <!-- Use the AddHabitForm component -->
    <AddHabitForm @add="addNewHabit"></AddHabitForm>
    <div>Create habits here!</div>
    <ul>
        <li v-for="(habit, index) in habits" :key="index">
            <span>{{ habit.name }}</span>
            <button type="button" @click="removeHabit(index)">Remove</button>
        </li>
    </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AddHabitForm from "../components/AddHabitForm.vue";

const habits = ref([]);

const loadHabitsFromLocalStorage = () => {
    const savedHabits = localStorage.getItem('CreatedHabits');
    if (savedHabits) {
        habits.value = JSON.parse(savedHabits);
    }
};

onMounted(() => {
    loadHabitsFromLocalStorage();
});

const saveHabitsToLocalStorage = () => {
    localStorage.setItem('CreatedHabits', JSON.stringify(habits.value));
};

const addNewHabit = (habitName) => {
    habits.value.push({ name: habitName });
    saveHabitsToLocalStorage();
};

const removeHabit = (index) => {
    habits.value.splice(index, 1);
    saveHabitsToLocalStorage();
};
</script>
