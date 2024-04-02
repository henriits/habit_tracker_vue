<template>
  <div class="date-details">
    <p class="formatted-date">{{ formattedDate }}</p>
    <ol v-if="habits.length > 0" class="habit-list">
      <li
        v-for="(habit, index) in habits"
        :key="index"
        class="habit-item"
        :class="{ disabled: isFutureDate }"
      >
        <label class="habit-label">
          <input
            type="checkbox"
            v-model="habit.completed"
            :disabled="isFutureDate"
            @change="updateHabit(index)"
            :class="{
              'habit-checkbox': !isFutureDate,
              'disabled-habit-checkbox': isFutureDate,
            }"
          />

          <span>{{ habit.name }}</span>
        </label>
        <button @click="removeHabit(index)" type="button" class="remove-button">
          Remove
        </button>
      </li>
    </ol>
    <p v-else class="no-habits">No habits found for this date.</p>
    <div v-if="habits.length > 0" class="progress-bar">
      <div class="progress" :style="{ width: progressPercentage }"></div>
    </div>
    <p v-if="habits.length > 0" class="habit-count">
      {{ completedHabitsCount }} out of {{ habits.length }} habits completed.
    </p>
    <p v-if="allHabitsCompleted" class="completion-message">
      Congratulations! You've completed all habits for this date.
    </p>
    <p v-if="isFutureDate" class="future-date-message">
      You cannot mark habits as complete for future dates.
    </p>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const selectedDate = ref(null);
const habits = ref([]);
const currentDate = new Date();
const areAllHabitsCompleted = ref(false);

const formattedDate = computed(() => {
  if (!selectedDate.value) return "";
  const dateObj = new Date(selectedDate.value);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
});

const completedHabitsCount = computed(
  () => habits.value.filter((habit) => habit.completed).length
);

const allHabitsCompleted = computed(
  () => habits.value.length > 0 && completedHabitsCount.value === habits.value.length
);

const isFutureDate = computed(
  () => selectedDate.value && new Date(selectedDate.value) > currentDate
);

const progressPercentage = computed(() => {
  if (habits.value.length === 0) return "0%";
  return `${(completedHabitsCount.value / habits.value.length) * 100}%`;
});

const fetchHabitsForDate = () => {
  const dateHabitMapping = JSON.parse(localStorage.getItem("DateHabitMapping"));
  if (dateHabitMapping && dateHabitMapping[formattedDate.value]) {
    habits.value = dateHabitMapping[formattedDate.value].map((habit) => ({
      name: habit.name,
      completed: habit.completed || false,
    }));

    areAllHabitsCompleted.value = habits.value.every((habit) => habit.completed);
  } else {
    habits.value = [];
    areAllHabitsCompleted.value = false;
  }
};
const updateSelectedDate = () => {
  selectedDate.value = route.params.date;
  fetchHabitsForDate();
};

const updateHabit = (index) => {
  const habitToUpdate = habits.value[index];
  const dateHabitMapping = JSON.parse(localStorage.getItem("DateHabitMapping")) || {};
  const habitsForDate = dateHabitMapping[formattedDate.value];
  if (habitsForDate) {
    const habitIndex = habitsForDate.findIndex((h) => h.name === habitToUpdate.name);
    if (habitIndex !== -1) {
      habitsForDate[habitIndex].completed = habitToUpdate.completed;
      localStorage.setItem("DateHabitMapping", JSON.stringify(dateHabitMapping));
    }
  }
};

const updateLocalStorage = () => {
  const dateHabitMapping = JSON.parse(localStorage.getItem("DateHabitMapping")) || {};
  dateHabitMapping[formattedDate.value] = habits.value.map((habit) => ({
    name: habit.name,
    completed: habit.completed,
  }));
  localStorage.setItem("DateHabitMapping", JSON.stringify(dateHabitMapping));
};
const removeHabit = (index) => {
  habits.value.splice(index, 1);
  updateLocalStorage();
};
watch(() => route.params.date, updateSelectedDate);
updateSelectedDate();
</script>

<style scoped>
.date-details {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.section-heading {
  font-size: 24px;
  margin-bottom: 10px;
}

.formatted-date {
  font-size: 18px;
  margin-bottom: 20px;
}

.habit-list {
  list-style-type: none;
  padding: 0;
}

.habit-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 22px;
}

.habit-label {
  flex-grow: 1;
  display: flex;
  align-items: center;
}

.habit-checkbox {
  margin-right: 10px;
  cursor: pointer;
}

.disabled-habit-checkbox {
  margin-right: 10px;
  cursor: not-allowed;
}

.remove-button {
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
}

.remove-button:hover {
  background-color: #c82333;
}

.no-habits {
  font-size: 16px;
  color: #6c757d;
}

.habit-count {
  font-size: 18px;
}

.future-date-message {
  color: red;
  font-size: 18px;
}

.progress-bar {
  width: 100%;
  height: 20px;
  background-color: #6c757d;
  border-radius: 10px;
  margin-bottom: 20px;
  overflow: hidden;
}

.progress {
  height: 100%;
  border-radius: 10px;
  background-color: aquamarine;
  transition: width 0.5s ease-in-out;
}
</style>
