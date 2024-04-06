<template>
  <div>
    <form @submit.prevent="addHabit" class="habit-form">
      <input
        type="text"
        id="habitName"
        v-model="habitName"
        required
        placeholder="Enter Habit name"
        class="habit-input"
      />

      <select v-model="selectedEmoji" id="habitEmoji" class="habit-select">
        <option disabled value="">Please select an Emoji</option>
        <option v-for="emoji in emojis" :key="emoji.value" :value="emoji.value">
          {{ emoji.label }}
        </option>
      </select>
      <button type="submit" class="habit-button">Create New Habit</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const habitName = ref("");
const selectedEmoji = ref("");
const emojis = [
  { label: "🏃 Running", value: "🏃" },
  { label: "📚 Reading", value: "📚" },
  { label: "🎨 Art", value: "🎨" },
  { label: "💪 Exercise", value: "💪" },
  { label: "🍎 Healthy Eating", value: "🍎" },
  { label: "🧘 Meditation", value: "🧘" },
  { label: "🎵 Music", value: "🎵" },
  { label: "🛌 Sleep", value: "🛌" },
  { label: "🧹 Cleaning", value: "🧹" },
  { label: "🌱 Gardening", value: "🌱" },
  { label: "🚭 Quit Smoking", value: "🚭" },
  { label: "📝 Journalizing", value: "📝" },
  { label: "🎲 Gaming", value: "🎲" },
  { label: "🚶 Walking", value: "🚶" },
  { label: "🚰 Drink Water", value: "🚰" },
  { label: "🎬 Movie Night", value: "🎬" },
  { label: "🍳 Cooking", value: "🍳" },
  { label: "🍰 Baking", value: "🍰" },
  { label: "🎭 Theater", value: "🎭" },
  { label: "🎮 Video Games", value: "🎮" },
  { label: "🧩 Puzzles", value: "🧩" },
  { label: "📸 Photography", value: "📸" },
  { label: "🖋️ Writing", value: "🖋️" },
  { label: "✈️ Travel", value: "✈️" },
  { label: "🏞️ Nature Walks", value: "🏞️" },
  { label: "🚣‍♂️ Rowing", value: "🚣‍♂️" },
  { label: "🚴 Cycling", value: "🚴" },
  { label: "🎤 Karaoke", value: "🎤" },
  { label: "🏹 Archery", value: "🏹" },
  { label: "🏕️ Camping", value: "🏕️" },
  { label: "🎡 Amusement Parks", value: "🎡" },
  { label: "🛹 Skateboarding", value: "🛹" },
  { label: "🎭 Improv Comedy", value: "🎭" },
  { label: "🍷 Wine Tasting", value: "🍷" },
  { label: "🛫 Paragliding", value: "🛫" },
  { label: "🌋 Volcano Watching", value: "🌋" },
  { label: "🏄 Surfing", value: "🏄" },
  { label: "🚤 Sailing", value: "🚤" },
  { label: "🏔️ Mountaineering", value: "🏔️" },
  { label: "🎨 Pottery", value: "🎨" },
  { label: "🎳 Bowling", value: "🎳" },
  { label: "🎬 Film Making", value: "🎬" },
  { label: "🚗 Road Trips", value: "🚗" },
  { label: "🌊 Scuba Diving", value: "🌊" },
  { label: "🎣 Fishing", value: "🎣" },
  { label: "🚁 Helicopter Tours", value: "🚁" },
  { label: "🌟 Other", value: "🌟" },
];

const emit = defineEmits(["add"]);

const addHabit = () => {
  if (habitName.value.trim() === "") return;
  const habitWithEmoji = `${selectedEmoji.value} ${habitName.value}`;
  emit("add", habitWithEmoji);
  habitName.value = "";
  selectedEmoji.value = "";
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
  width: 100%;
}

.habit-button:hover {
  background-color: aqua;
}
</style>
