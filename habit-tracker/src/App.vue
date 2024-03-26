<script setup>
import { RouterLink, RouterView } from 'vue-router';
import DatesView from './components/DatesView.vue';



</script>

<template>

    <div>
        <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/create_habits">Create Habits</RouterLink>
        </nav>
        <DatesView></DatesView>
    </div>
    <br>



    <!-- Render the dynamic component -->
    <RouterView />
</template>
