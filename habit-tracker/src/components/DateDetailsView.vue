<template>
    <div>
        <h1>Date Details</h1>
        <p>{{ selectedDate }}</p>
        <!-- Add more details here as needed -->

    </div>
</template>



<script>


export default {
    data() {
        return {
            selectedDate: null
        };
    },
    created() {
        this.updateSelectedDate();
    },
    watch: {
        '$route.params.date': 'updateSelectedDate'
    },
    methods: {
        updateSelectedDate() {
            this.selectedDate = this.$route.params.date;
        }
    }
};
</script>

<style>
/* Styles */
</style>
