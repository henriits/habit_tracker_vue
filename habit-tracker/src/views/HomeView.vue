<template>
  <div>
    <DateSelector></DateSelector>
    <div>
      <h3>Select a Habit:</h3>
      <select v-model="selectedHabit" aria-label="selectedHabit">
        <option disabled value="">Please select a habit</option>
        <option v-for="(habit, index) in habits" :key="index" :value="habit.name">
          {{ habit.name }}
        </option>
      </select>
      <p>You selected: {{ selectedHabit }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import DateSelector from "../components/DatesView.vue";

const habits = ref([]);
const selectedHabit = ref('');

onMounted(() => {
  const savedHabits = localStorage.getItem('CreatedHabits');
  if (savedHabits) {
    habits.value = JSON.parse(savedHabits);
  }
});
</script>
