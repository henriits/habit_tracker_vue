<script setup>
import { RouterLink, RouterView } from "vue-router";
import DatesView from "./components/DatesView.vue";
</script>

<template>
  <div>
    <nav class="nav-bar">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink :to="{ name: 'createHabits' }">Create Habits</RouterLink>
      <h1 class="title">DailyDrive</h1>
    </nav>
    <div class="container">
      <DatesView />
    </div>
  </div>
  <br />
  <RouterView />
</template>
