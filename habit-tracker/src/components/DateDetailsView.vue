<template>
    <div>
        <h1>Date Details</h1>
        <p>Selected Date: {{ formattedDate }}</p>
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
    computed: {
        formattedDate() {
            if (!this.selectedDate) return '';
            const dateObj = new Date(this.selectedDate);
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Month is zero-based
            const day = String(dateObj.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
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
