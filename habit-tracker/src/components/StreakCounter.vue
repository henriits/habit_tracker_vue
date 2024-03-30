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
import { ref, onMounted } from 'vue';

const streak = ref(0);


function calculateStreak(dateHabitMapping) {
    const dates = Object.keys(dateHabitMapping);
    let currentStreak = 0;

    for (let i = 0; i < dates.length; i += 1) {
        const date = dates[i];
        const habits = dateHabitMapping[date];
        let allCompleted = true;

        for (let j = 0; j < habits.length; j += 1) {
            if (!habits[j].completed) {
                allCompleted = false;
                break;
            }
        }

        if (allCompleted) {
            currentStreak += 1;
        } else {
            break;
        }
    }

    streak.value = currentStreak;
}

onMounted(() => {
    const data = localStorage.getItem('DateHabitMapping');
    if (data) {
        const dateHabitMapping = JSON.parse(data);
        calculateStreak(dateHabitMapping);
    }
});
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