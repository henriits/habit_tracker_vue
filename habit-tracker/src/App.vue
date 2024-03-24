<script setup>
import { RouterLink, RouterView } from 'vue-router';
import DateSelector from "./components/DatesView.vue";
import SelectHabitAndDate from './components/SelectHabitAndDate.vue'


</script>

<template>
    <header>
        <div>
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/create_habits">Create Habits</RouterLink>
            </nav>
        </div>
        <div>
            <DateSelector></DateSelector>
        </div>
        <div>
            <SelectHabitAndDate />
        </div>
    </header>


    <RouterView />
</template>
