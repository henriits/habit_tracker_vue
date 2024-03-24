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
    <div v-if="showNotification" class="notification">
      This habit already exists for the selected date.
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import DateSelector from "../components/DatesView.vue";

const habits = ref([]);
const selectedDate = ref('');
const selectedHabit = ref('');
const showNotification = ref(false);

onMounted(() => {
  const savedHabits = localStorage.getItem('CreatedHabits');
  if (savedHabits) {
    habits.value = JSON.parse(savedHabits);
  }
});

function saveHabitToSelectedDate(date, habit) {
  // Retrieve the existing date-habit mapping from localStorage
  const dateHabitMapping = JSON.parse(localStorage.getItem('DateHabitMapping')) || {};

  // If habits for the selected date already exist, check if the habit already exists before adding it
  if (Array.isArray(dateHabitMapping[date])) {
    if (!dateHabitMapping[date].includes(habit)) {
      dateHabitMapping[date].push(habit);
    } else {
      // Show notification to inform the user that the habit already exists
      showNotification.value = true;
      setTimeout(() => {
        showNotification.value = false;
      }, 3000); // Hide notification after 3 seconds
    }
  } else {
    // If there are no habits associated with the selected date yet, create a new array with the new habit
    dateHabitMapping[date] = [habit];
  }

  // Save the updated date-habit mapping back to localStorage
  localStorage.setItem('DateHabitMapping', JSON.stringify(dateHabitMapping));
}



function attachHabitToSelectedDate() {
  if (!selectedDate.value || !selectedHabit.value) return;

  // Assuming you have a function to save the date-habit mapping to localStorage
  saveHabitToSelectedDate(selectedDate.value, selectedHabit.value);
}
</script>

<style>
.notification {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #d71111;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
  z-index: 9999;
}
</style>