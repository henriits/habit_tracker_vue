<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <header>
        <div>
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/create_habits">Create Habits</RouterLink>
            </nav>
        </div>
    </header>

    <RouterView />
</template>
