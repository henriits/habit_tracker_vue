<template>
    <div>
        <h1>Date Details</h1>
        <p>{{ formattedDate }}</p>
        <ul v-if="habits.length > 0">
            <li v-for="habit in habits" :key="habit">{{ habit }}</li>
        </ul>
        <p v-else>No habits found for this date.</p>
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
                this.habits = dateHabitMapping[this.formattedDate];
            } else {
                this.habits = [];
            }
        }
    }
};
</script>

<style>
/* Styles */
</style>
