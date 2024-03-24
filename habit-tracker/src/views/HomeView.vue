<template>
  <div>
    <DateSelector></DateSelector>
    <div>
      <h3>Select a Date:</h3>
      <input type="date" v-model="selectedDate">
      <h3>Select a Habit:</h3>
      <select v-model="selectedHabit">
        <option disabled value="">Please select a habit</option>
        <option v-for="(habit, index) in habits" :key="index" :value="habit.name">
          {{ habit.name }}
        </option>
      </select>
      <button @click="attachHabitToSelectedDate">Attach Habit</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import DateSelector from "../components/DatesView.vue";

const habits = ref([]);
const selectedDate = ref('');
const selectedHabit = ref('');

onMounted(() => {
  const savedHabits = localStorage.getItem('CreatedHabits');
  if (savedHabits) {
    habits.value = JSON.parse(savedHabits);
  }
});

function saveHabitToSelectedDate(date, habit) {
  // Retrieve the existing date-habit mapping from localStorage
  const dateHabitMapping = JSON.parse(localStorage.getItem('DateHabitMapping')) || {};

  // Add or update the habit for the selected date
  dateHabitMapping[date] = habit;

  // Save the updated date-habit mapping back to localStorage
  localStorage.setItem('DateHabitMapping', JSON.stringify(dateHabitMapping));
}
function attachHabitToSelectedDate() {
  if (!selectedDate.value || !selectedHabit.value) return;

  // Assuming you have a function to save the date-habit mapping to localStorage
  saveHabitToSelectedDate(selectedDate.value, selectedHabit.value);
}

</script>
