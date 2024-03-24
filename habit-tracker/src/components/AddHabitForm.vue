<template>
    <div>
        <h2>Add New Habit</h2>
        <form @submit.prevent="addHabit">
            <label for="habitName">Habit Name:</label>
            <input type="text" id="habitName" v-model="habitName" required>
            <label for="habitEmoji">Select Emoji:</label>
            <select v-model="selectedEmoji" id="habitEmoji">
                <option v-for="emoji in emojis" :value="emoji.value">{{ emoji.label }}</option>
            </select>
            <button type="submit">Add Habit</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            habitName: '',
            selectedEmoji: '',
            emojis: [
                { label: '🏃 Running', value: '🏃' },
                { label: '📚 Reading', value: '📚' },
                { label: '🎨 Art', value: '🎨' },
                { label: '💪 Exercise', value: '💪' },
                { label: '🍎 Healthy Eating', value: '🍎' },
                { label: '🧘 Meditation', value: '🧘' },
                { label: '🎵 Music', value: '🎵' },
                { label: '🛌 Sleep', value: '🛌' },
                { label: '🧹 Cleaning', value: '🧹' },
                { label: '🌱 Gardening', value: '🌱' },
                { label: '🚭 Quit Smoking', value: '🚭' },
                { label: '📝 Journalizing', value: '📝' },
                { label: '🎲 Gaming', value: '🎲' },
                { label: '🧘‍♂️ Yoga', value: '🧘‍♂️' },
                { label: '🚶 Walking', value: '🚶' },
                { label: '🚰 Drink Water', value: '🚰' }
            ]
        };
    },
    methods: {
        addHabit() {
            if (this.habitName.trim() === '') return; // Prevent adding empty habit
            const habitWithEmoji = `${this.selectedEmoji} ${this.habitName}`; // Combine emoji and habit name
            this.$emit('add', habitWithEmoji); // Emit an event with the new habit name
            this.habitName = ''; // Clear the input field
            this.selectedEmoji = ''; // Clear the selected emoji
        }
    }
};
</script>
