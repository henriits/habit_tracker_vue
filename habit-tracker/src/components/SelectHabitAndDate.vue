<template>
  <div class="select-date-and-habit">
    <div class="main-content">
      <h3 class="content-heading">
        {{
          !habits.length ? "Please create habits first!" : "Select a Date and a Habit!"
        }}
      </h3>
      <div v-if="habits.length">
        <input
          type="date"
          v-model="selectedDate"
          aria-label="input"
          class="custom-input"
        />

        <select v-model="selectedHabit" aria-label="select" class="custom-select">
          <option disabled value="">Please select a habit</option>
          <option
            v-for="(habit, index) in habits"
            :key="index"
            :value="habit.name"
            :disabled="habit.paused"
          >
            {{ habit.name }}
            <span v-if="habit.paused">(disabled)</span>
          </option>
        </select>

        <br />

        <button @click="attachHabitToSelectedDate" type="button" class="custom-button">
          Attach Habit
        </button>
      </div>

      <div v-if="showNotification" class="notification">
        This habit already exists for the selected date.
      </div>

      <div v-if="habitAddedNotification" class="green-notification">
        Habit successfully added!
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const habits = ref([]);
const selectedDate = ref("");
const selectedHabit = ref("");
const showNotification = ref(false);
const habitAddedNotification = ref(false);

onMounted(() => {
  const savedHabits = localStorage.getItem("CreatedHabits");
  if (savedHabits) {
    habits.value = JSON.parse(savedHabits);
  }
});

function saveHabitToSelectedDate(date, habit) {
  const dateHabitMapping = JSON.parse(localStorage.getItem("DateHabitMapping")) || {};
  if (Array.isArray(dateHabitMapping[date])) {
    if (!dateHabitMapping[date].includes(habit)) {
      dateHabitMapping[date].push({ name: habit, completed: false });
      habitAddedNotification.value = true;
      setTimeout(() => {
        habitAddedNotification.value = false;
      }, 3000);
    } else {
      showNotification.value = true;
      setTimeout(() => {
        showNotification.value = false;
      }, 3000);
    }
  } else {
    // If there are no habits associated with the selected date yet, create a new array with the new habit
    dateHabitMapping[date] = [{ name: habit, completed: false }];
    habitAddedNotification.value = true;
    setTimeout(() => {
      habitAddedNotification.value = false;
    }, 3000);
  }
  localStorage.setItem("DateHabitMapping", JSON.stringify(dateHabitMapping));
}

function attachHabitToSelectedDate() {
  if (!selectedDate.value || !selectedHabit.value) return;
  const dateHabitMapping = JSON.parse(localStorage.getItem("DateHabitMapping")) || {};
  if (Array.isArray(dateHabitMapping[selectedDate.value])) {
    const existingHabits = dateHabitMapping[selectedDate.value].map(
      (habit) => habit.name
    );
    if (existingHabits.includes(selectedHabit.value)) {
      showNotification.value = true;
      setTimeout(() => {
        showNotification.value = false;
      }, 3000);
      return;
    }
  }

  saveHabitToSelectedDate(selectedDate.value, selectedHabit.value);
}
</script>

<style scoped>
.select-date-and-habit {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.content-heading {
  margin-bottom: 5px;
  color: #6c757d;
  text-align: center;
}

.custom-input,
.custom-select {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.custom-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: aquamarine;
  color: #0c0a0a;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin: auto;
  width: 100%;
}

.custom-button:hover {
  background-color: aqua;
}

.green-notification {
  color: aquamarine;
}

@media (width <=600px) {
  .custom-select {
    font-size: 13px;
  }
}
</style>
