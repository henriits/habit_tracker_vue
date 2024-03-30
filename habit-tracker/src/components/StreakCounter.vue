<template>
    <div class="streak-display">
        <div class="streak-counter">
            <p v-if="streak > 0" class="streak-message">
                Current Streak <strong>{{ streak }} </strong> day(s)!
            </p>
            <p v-else class="no-streak-message">
                You haven't started a streak yet.
            </p>
        </div>
        <div class="highest-streak">
            <p v-if="highestStreak > 0" class="highest-streak-message">
                Your overall highest streak<strong>{{ highestStreak }}</strong>day(s)!
            </p>
            <p v-else class="no-highest-streak-message">
                You haven't achieved your highest streak yet.
            </p>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted, watchEffect } from 'vue';

const streak = ref(0);
const highestStreak = ref(0);

function updateHighestStreak(currentStreak) {
    if (currentStreak > highestStreak.value) {
        highestStreak.value = currentStreak;
        localStorage.setItem('HighestStreak', currentStreak.toString());
    }
}
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

    updateHighestStreak(currentStreak);
}


onMounted(() => {
    const data = localStorage.getItem('DateHabitMapping');
    if (data) {
        const dateHabitMapping = JSON.parse(data);
        calculateStreak(dateHabitMapping);
    }

    const savedHighestStreak = localStorage.getItem('HighestStreak');
    if (savedHighestStreak) {
        highestStreak.value = parseInt(savedHighestStreak, 10);
    }
});

watchEffect(() => {
    updateHighestStreak(streak.value);
});
</script>




<style scoped>
.streak-display,
.highest-streak {
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
}

.streak-message,
.no-streak-message,
.highest-streak-message,
.no-highest-streak-message {
    font-family: Arial, sans-serif;
    font-size: 24px;
    display: flex;
    align-items: center;


    /* Center vertically */
}

.streak-message strong,
.highest-streak-message strong {
    font-size: 36px;
    color: aquamarine;
    font-weight: bold;
    margin-left: 5px;

    /* Add some space between the text and number */
}

.no-streak-message,
.no-highest-streak-message {
    color: #666;
}

.streak-counter {
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgb(0 0 0 / 10%);
    display: inline-block;
}
</style>
