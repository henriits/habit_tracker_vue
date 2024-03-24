<template>
    <div>
        <h2>Add New Habit</h2>
        <form @submit.prevent="addHabit">
            <label for="habitName">Habit Name:</label>
            <input type="text" id="habitName" v-model="habitName" required>
            <button type="submit">Add Habit</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            habitName: ''
        };
    },
    methods: {
        addHabit() {
            if (this.habitName.trim() === '') return; // Prevent adding empty habit
            this.$emit('add', this.habitName); // Emit an event with the new habit name
            this.habitName = ''; // Clear the input field
        }
    }
};
</script>