<template>
    <div class="container">
        <div class="main-content">
            <h3>Select a Date:</h3>
            <input type="date" v-model="selectedDate" aria-label="input">
            <h3>Select a Habit:</h3>
            <select v-model="selectedHabit" aria-label="select">
                <option disabled value="">Please select a habit</option>
                <option v-for="(habit, index) in habits" :key="index" :value="habit.name">
                    {{ habit.name }}
                </option>
            </select>
            <button @click="attachHabitToSelectedDate" type="button">Attach Habit</button>
            <div v-if="showNotification" class="notification">
                This habit already exists for the selected date.
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const habits = ref([]);
const selectedDate = ref('');
const selectedHabit = ref('');
const showNotification = ref(false);

onMounted(() => {
    const savedHabits = localStorage.getItem('CreatedHabits');
    if (savedHabits) {
        habits.value = JSON.parse(savedHabits);
    }
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

// Function to update habit in DateHabitMapping
function updateHabitInMapping(oldHabit, newHabit) {
    const dateHabitMapping = JSON.parse(localStorage.getItem('DateHabitMapping')) || {};
    Object.keys(dateHabitMapping).forEach(date => {
        const habits = dateHabitMapping[date];
        habits.forEach(habit => {
            if (habit.name === oldHabit) {
                habit.name = newHabit;
            }
        });
    });
    localStorage.setItem('DateHabitMapping', JSON.stringify(dateHabitMapping));
}
</script>

<style>
.container {
    display: grid;
}

.sidebar {
    flex: 1;
    padding: 20px;
}

.main-content {
    flex: 3;
    padding: 20px;
}


.notification {
    position: fixed;
    bottom: 220px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #d71111;
    color: #fff;
    padding: 10px 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
    z-index: 9999;
}
</style>
