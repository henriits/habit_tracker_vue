<!-- StreakCounter.vue -->
<template>
    <div class="streak-counter">
        <p v-if="streak > 0" class="streak-message">
            You've completed all habits for <strong>{{ streak }}</strong> consecutive days!
        </p>
        <p v-else class="no-streak-message">
            You haven't started any streak yet.
        </p>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Function to fetch habit completion data from localStorage
const fetchHabitCompletionData = () => {
    const habitCompletionData = JSON.parse(localStorage.getItem('DateHabitMapping')) || {};
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const habits = habitCompletionData[today] || []; // Get today's habits
    return Object.values(habitCompletionData).flat().concat(habits); // Concatenate today's habits with other habits
};


// Function to calculate streak
const calculateStreak = () => {
    const habitCompletionData = fetchHabitCompletionData();
    let streak = 0;
    for (let i = habitCompletionData.length - 1; i >= 0; i -= 1) {
        if (habitCompletionData[i].completed) {
            streak += 1;
        } else {
            break;
        }
    }
    return streak;
};

// Streak ref
const streak = ref(calculateStreak());
</script>

<style scoped>
.streak-counter {
    margin-top: 20px;
}

.streak-message {
    font-size: 18px;
    color: green;
}

.no-streak-message {
    font-size: 18px;
    color: red;
}
</style>