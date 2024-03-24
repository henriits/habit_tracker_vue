<template>
  <div>
    <DateSelector></DateSelector>
    <div>
      <h3>Habits:</h3>
      <ul>
        <li v-for="(habit, index) in habits" :key="index">
          {{ habit.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import DateSelector from "../components/DatesView.vue";

const habits = ref([]);

onMounted(() => {
  const savedHabits = localStorage.getItem('CreatedHabits');
  if (savedHabits) {
    habits.value = JSON.parse(savedHabits);
  }
});
</script>
