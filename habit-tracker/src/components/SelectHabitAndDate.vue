<template>
    <div class="select-date-and-habit">
        <div class="main-content">
            <h3 class="content-heading">Select a Date:</h3>
            <input type="date" v-model="selectedDate" aria-label="input" class="custom-input">

            <h3 class="content-heading">Select a Habit:</h3>
            <select v-model="selectedHabit" aria-label="select" class="custom-select">
                <option disabled value="">Please select a habit</option>
                <option v-for="(habit, index) in habits" :key="index" :value="habit.name">{{ habit.name }}</option>
            </select>

            <br>

            <button @click="attachHabitToSelectedDate" type="button" class="custom-button">
                Attach Habit
            </button>

            <div v-if="showNotification" class="notification">
                This habit already exists for the selected date.
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue';

const habits = ref([]);
const selectedDate = ref('');
const selectedHabit = ref('');
const showNotification = ref(false);

onMounted(() => {
    // Watch for changes in localStorage and update habits accordingly
    watchEffect(() => {
        const savedHabits = localStorage.getItem('CreatedHabits');
        if (savedHabits) {
            habits.value = JSON.parse(savedHabits);
        }
    });
});

function saveHabitToSelectedDate(date, habit) {
    // Retrieve the existing date-habit mapping from localStorage
    const dateHabitMapping = JSON.parse(localStorage.getItem('DateHabitMapping')) || {};

    // If habits for the selected date already exist, check if the habit already exists before adding it
    if (Array.isArray(dateHabitMapping[date])) {
        if (!dateHabitMapping[date].includes(habit)) {
            // Add the habit with completed status (initially false)
            dateHabitMapping[date].push({ name: habit, completed: false });
        } else {
            // Show notification to inform the user that the habit already exists
            showNotification.value = true;
            setTimeout(() => {
                showNotification.value = false;
            }, 3000); // Hide notification after 3 seconds
        }
    } else {
        // If there are no habits associated with the selected date yet, create a new array with the new habit
        dateHabitMapping[date] = [{ name: habit, completed: false }];
    }

    // Save the updated date-habit mapping back to localStorage
    localStorage.setItem('DateHabitMapping', JSON.stringify(dateHabitMapping));
}

function attachHabitToSelectedDate() {
    if (!selectedDate.value || !selectedHabit.value) return;

    // Check if the habit already exists for the selected date
    const dateHabitMapping = JSON.parse(localStorage.getItem('DateHabitMapping')) || {};
    if (Array.isArray(dateHabitMapping[selectedDate.value])) {
        const existingHabits = dateHabitMapping[selectedDate.value].map(habit => habit.name);
        if (existingHabits.includes(selectedHabit.value)) {
            // If the habit already exists, show notification and return
            showNotification.value = true;
            setTimeout(() => {
                showNotification.value = false;
            }, 3000); // Hide notification after 3 seconds
            return;
        }
    }

    // Assuming you have a function to save the date-habit mapping to localStorage
    saveHabitToSelectedDate(selectedDate.value, selectedHabit.value);
}


</script>

<style>
.select-date-and-habit {
    max-width: 400px;
    margin: 0 auto;

}

.content-heading {
    margin-bottom: 5px;
}

.custom-input,
.custom-select {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

.custom-button {
    display: inline-block;
    padding: 10px 20px;
    background-color: aquamarine;
    color: #0c0a0a;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
}

.custom-button:hover {
    background-color: aqua;
}
</style>
