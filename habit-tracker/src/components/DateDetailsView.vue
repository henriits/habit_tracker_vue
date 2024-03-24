<template>
    <div>
        <h1>Date Details</h1>
        <p>{{ formattedDate }}</p>
        <ul v-if="habits.length > 0">
            <li v-for="(habit, index) in habits" :key="index">
                <label>
                    <input type="checkbox" v-model="habit.completed" @change="updateLocalStorage">
                    {{ habit.name }}
                </label>
                <button @click="removeHabit(index)" type="button">Remove</button>
            </li>
        </ul>
        <p v-else>No habits found for this date.</p>
        <p>{{ completedHabitsCount }} out of {{ habits.length }} habits completed.</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedDate: null,
            habits: []
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
            } else {
                this.habits = [];
            }
        },
        updateLocalStorage() {
            const dateHabitMapping = JSON.parse(localStorage.getItem('DateHabitMapping')) || {};
            dateHabitMapping[this.formattedDate] = this.habits.map(habit => ({ name: habit.name, completed: habit.completed }));
            localStorage.setItem('DateHabitMapping', JSON.stringify(dateHabitMapping));
        },
        removeHabit(index) {
            this.habits.splice(index, 1); // Remove habit from the habits array
            this.updateLocalStorage(); // Update Local Storage after removing the habit
        }
    }
};
</script>

<style>
/* Styles */
</style>
