<template>
    <div>
        <form @submit.prevent="addHabit">
            <input class="custom-select" type="text" id="habitName" v-model="habitName" required
                placeholder="Enter Habit name">

            <select v-model="selectedEmoji" id="habitEmoji" class="custom-select">
                <option disabled value="">Please select a Emoji</option>
                <option v-for="emoji in emojis" :key="emoji.value" :value="emoji.value">{{ emoji.label }}</option>
            </select>
            <button type="submit" class="custom-select">Create New Habit</button>
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
