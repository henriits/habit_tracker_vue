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

const fetchHabitCompletionData = () => {
    const habitCompletionData = JSON.parse(localStorage.getItem('DateHabitMapping')) || {};
    const allHabits = Object.values(habitCompletionData).flat(); // Get all habits from localStorage
    return allHabits;
};

const calculateStreak = () => {
    const habitCompletionData = fetchHabitCompletionData();
    let streak = 0;
    let consecutiveCompletedDays = 0;

    for (let i = habitCompletionData.length - 1; i >= 0; i -= 1) {
        if (habitCompletionData[i].completed) {
            consecutiveCompletedDays += 1;
        } else {
            // If the streak is broken, update the streak value and reset the consecutive days count
            if (consecutiveCompletedDays > streak) {
                streak = consecutiveCompletedDays;
            }
            consecutiveCompletedDays = 0;
        }
    }

    // Check if the streak continues until the end of the habit data
    if (consecutiveCompletedDays > streak) {
        streak = consecutiveCompletedDays;
    }

    // If the streak was broken by an incomplete day, reset it to 0
    if (habitCompletionData.length > 0 && !habitCompletionData[0].completed) {
        streak = 0;
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