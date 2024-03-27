<script setup>
import { RouterLink, RouterView } from 'vue-router';
import DatesView from './components/DatesView.vue';




</script>

<template>
    <div>
        <nav class="nav-bar">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/create_habits">Create Habits</RouterLink>
            <h1 class="title">ZAIABALL</h1>
        </nav>
        <div class="container">
            <DatesView></DatesView>
        </div>
    </div>
    <br>



    <!-- Render the dynamic component -->
    <RouterView />
</template>
