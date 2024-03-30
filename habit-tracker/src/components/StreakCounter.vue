<template>
    <div class="streak-display">
        <div class="streak-counter">
            <p v-if="streak > 0" class="streak-message">
                You've completed all habits <br> for <strong>{{ streak }}</strong> consecutive day(s)!
                <br> Keep up the good work!
            </p>
            <p v-else class="no-streak-message">
                You haven't started a streak yet.
            </p>
        </div>
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
.streak-display {
    max-width: 500px;
    margin: 0 auto;
    text-align: center;
}

.streak-message,
.no-streak-message {
    font-family: Arial, sans-serif;
    font-size: 24px;
}

.streak-message strong {
    font-size: 36px;
    color: aquamarine;
    font-weight: bold;
}

.no-streak-message {
    color: #666;
}

.streak-counter {
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgb(0 0 0 / 10%);
    display: inline-block;
}
</style>