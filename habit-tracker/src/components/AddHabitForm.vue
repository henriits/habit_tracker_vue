<template>
    <div>
        <form @submit.prevent="addHabit" class="habit-form">
            <input type="text" id="habitName" v-model="habitName" required placeholder="Enter Habit name"
                class="habit-input">

            <select v-model="selectedEmoji" id="habitEmoji" class="habit-select">
                <option disabled value="">Please select an Emoji</option>
                <option v-for="emoji in emojis" :key="emoji.value" :value="emoji.value">{{ emoji.label }}</option>
            </select>
            <button type="submit" class="habit-button">Create New Habit</button>
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

<style scoped>
.habit-form {
    max-width: 400px;
    margin: 0 auto;
}

.habit-input,
.habit-select {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

.habit-select {
    cursor: pointer;
}

.habit-button {
    display: inline-block;
    padding: 10px 20px;
    background-color: aquamarine;
    color: #161010;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
}

.habit-button:hover {
    background-color: aqua;
}
</style>