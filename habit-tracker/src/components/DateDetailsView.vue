<template>
    <div class="date-details">
        <p class="formatted-date">{{ formattedDate }}</p>
        <ol v-if="habits.length > 0" class="habit-list">
            <li v-for="(habit, index) in habits" :key="index" class="habit-item" :class="{ 'disabled': isFutureDate }">
                <label class="habit-label">
                    <input type="checkbox" v-model="habit.completed" :disabled="isFutureDate"
                        @change="updateHabit(index)" :class="{
            'habit-checkbox': !isFutureDate,
            'disabled-habit-checkbox': isFutureDate
        }">

                    <span>{{ habit.name }}</span>
                </label>
                <button @click="removeHabit(index)" type="button" class="remove-button">Remove</button>
            </li>
        </ol>
        <p v-else class="no-habits">No habits found for this date.</p>
        <p class="habit-count">{{ completedHabitsCount }} out of {{ habits.length }} habits completed.</p>
        <p v-if="allHabitsCompleted" class="completion-message">Congratulations! You've completed all habits for this
            date.</p>
        <p v-if="isFutureDate" class="future-date-message">You cannot mark habits as complete for future dates.</p>

    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedDate: null,
            habits: [],
            currentDate: new Date()
        };
    },
    created() {
        this.updateSelectedDate();
    },
    watch: {
        '$route.params.date': 'updateSelectedDate'
    },
    computed: {
        formattedDate() {
            if (!this.selectedDate) return '';
            const dateObj = new Date(this.selectedDate);
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Month is zero-based
            const day = String(dateObj.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        completedHabitsCount() {
            return this.habits.filter(habit => habit.completed).length;
        },
        allHabitsCompleted() {
            return this.habits.length > 0 && this.completedHabitsCount === this.habits.length;
        },
        isFutureDate() {
            return this.selectedDate && new Date(this.selectedDate) > this.currentDate;
        }
    },
    methods: {
        updateSelectedDate() {
            this.selectedDate = this.$route.params.date;
            this.fetchHabitsForDate();
        },
        fetchHabitsForDate() {
            const dateHabitMapping = JSON.parse(localStorage.getItem('DateHabitMapping'));
            if (dateHabitMapping && dateHabitMapping[this.formattedDate]) {
                // Update habits array to include completed status from localStorage
                this.habits = dateHabitMapping[this.formattedDate].map(habit => ({
                    name: habit.name,
                    completed: habit.completed || false // Use existing completed status or default to false
                }));

                // Check if all habits for this date are completed and update allHabitsCompleted property
                this.allHabitsCompleted = this.habits.every(habit => habit.completed);
            } else {
                this.habits = [];
            }
        },
        updateHabit(index) {
            const habitToUpdate = this.habits[index];
            const dateHabitMapping = JSON.parse(localStorage.getItem('DateHabitMapping')) || {};
            const habitsForDate = dateHabitMapping[this.formattedDate];
            if (habitsForDate) {
                const habitIndex = habitsForDate.findIndex(h => h.name === habitToUpdate.name);
                if (habitIndex !== -1) {
                    habitsForDate[habitIndex].completed = habitToUpdate.completed;
                    localStorage.setItem('DateHabitMapping', JSON.stringify(dateHabitMapping));
                }
            }
        },
        removeHabit(index) {
            this.habits.splice(index, 1); // Remove habit from the habits array
            this.updateLocalStorage(); // Update Local Storage after removing the habit
        },
        updateLocalStorage() {
            const dateHabitMapping = JSON.parse(localStorage.getItem('DateHabitMapping')) || {};
            dateHabitMapping[this.formattedDate] = this.habits.map(habit => ({ name: habit.name, completed: habit.completed }));
            localStorage.setItem('DateHabitMapping', JSON.stringify(dateHabitMapping));
        }
    }
};
</script>

<style scoped>
.date-details {
    max-width: 500px;
    margin: 0 auto;
}

.section-heading {
    font-size: 24px;
    margin-bottom: 10px;
}

.formatted-date {
    font-size: 18px;
    margin-bottom: 20px;
}

.habit-list {
    list-style-type: none;
    padding: 0;
}

.habit-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 22px;
}

.habit-label {
    flex-grow: 1;
    display: flex;
    align-items: center;
}

.habit-checkbox {
    margin-right: 10px;
    cursor: pointer;
}

.disabled-habit-checkbox {
    margin-right: 10px;
    cursor: not-allowed;
}

.remove-button {
    background-color: #dc3545;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;
}

.remove-button:hover {
    background-color: #c82333;
}

.no-habits {
    font-size: 16px;
    color: #6c757d;
}

.habit-count {
    font-size: 18px;
}

.future-date-message {
    color: red;
    font-size: 18px;
}
</style>
