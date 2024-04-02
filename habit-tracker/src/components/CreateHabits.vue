<template>
  <div class="custom-created-habits">
    <AddHabitForm @add="addNewHabit"></AddHabitForm>
    <div class="habit-list-title">Custom Created Habits!</div>
    <ol v-if="habits.length > 0" class="habit-list">
      <li v-for="(habit, index) in habits" :key="index" class="habit-item">
        <span v-if="!habit.editing" class="habit-name">{{ habit.name }}</span>
        <input
          v-else
          v-model="habit.name"
          @blur="saveEditedHabit(index)"
          class="habit-edit-input"
        />
        <div class="button-container">
          <button type="button" @click="toggleEdit(index)" class="habit-button">
            {{ habit.editing ? "Save" : "Edit" }}
          </button>
          <button type="button" @click="removeHabit(index)" class="remove-button">
            Remove
          </button>
        </div>
      </li>
    </ol>
    <div v-else class="no-habits-message">No custom habits created yet.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AddHabitForm from "./AddHabitForm.vue";

const habits = ref([]);

const loadHabitsFromLocalStorage = () => {
  const savedHabits = localStorage.getItem("CreatedHabits");
  if (savedHabits) {
    habits.value = JSON.parse(savedHabits);
  }
};

onMounted(() => {
  loadHabitsFromLocalStorage();
});

const saveHabitsToLocalStorage = () => {
  localStorage.setItem("CreatedHabits", JSON.stringify(habits.value));
};

const addNewHabit = (habitName) => {
  habits.value.push({ name: habitName, editing: false });
  saveHabitsToLocalStorage();
};

const removeHabit = (index) => {
  habits.value.splice(index, 1);
  saveHabitsToLocalStorage();
};

const toggleEdit = (index) => {
  habits.value[index].editing = !habits.value[index].editing;
};

const saveEditedHabit = (index) => {
  habits.value[index].editing = false;
  saveHabitsToLocalStorage();
};
</script>

<style scoped>
.custom-created-habits {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.habit-list-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  padding: 20px;
}

.habit-list {
  list-style-type: none;
  padding: 20px;
}

.habit-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.habit-name {
  font-size: 18px;
}

.habit-edit-input {
  font-size: 18px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-container {
  display: flex;
}

.habit-button {
  font-size: 16px;
  padding: 8px 12px;
  margin-left: 5px;
  background-color: aquamarine;
  color: #100d0d;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.habit-button:hover {
  background-color: aqua;
}

.remove-button {
  font-size: 16px;
  padding: 8px 12px;
  margin-left: 5px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.remove-button:hover {
  background-color: #c82333;
}
</style>
