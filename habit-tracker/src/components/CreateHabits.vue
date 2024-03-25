<template>
    <!-- Use the AddHabitForm component -->
    <AddHabitForm @add="addNewHabit"></AddHabitForm>
    <div>Create habits here!</div>
    <ol>
        <li v-for="(habit, index) in habits" :key="index">
            <span v-if="!habit.editing">{{ habit.name }}</span>
            <input v-else v-model="habit.name" @blur="saveEditedHabit(index)" />
            <button type="button" @click="toggleEdit(index)">
                {{ habit.editing ? 'Save' : 'Edit' }}
            </button>
            <button type="button" @click="removeHabit(index)">Remove</button>
        </li>
    </ol>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AddHabitForm from "./AddHabitForm.vue";

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
    habits.value.push({ name: habitName, editing: false });
    saveHabitsToLocalStorage();
};

const removeHabit = (index) => {
    habits.value.splice(index, 1);
    saveHabitsToLocalStorage();
};

const toggleEdit = (index) => {
    habits.value[index].editing = !habits.value[index].editing;
};

const saveEditedHabit = (index) => {
    habits.value[index].editing = false;
    saveHabitsToLocalStorage();
};
</script>
