<template>
    <div class="scroll-container">
        <div class="date-div-container">
            <router-link v-for="(date, index) in dates" :key="index" :to="`/date/${date}`" class="date-div"
                :class="{ 'glow': isCurrentDate(date) }">
                <span>{{ date }}</span>

            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentDate: new Date(),
            numberOfDaysBefore: 7,
            numberOfDaysAfter: 7,
            dates: [],
            checked: []
        };
    },
    mounted() {
        this.generateDates();
    },
    methods: {
        generateDates() {
            let i = -this.numberOfDaysBefore;
            while (i <= this.numberOfDaysAfter) {
                const date = new Date();
                date.setDate(this.currentDate.getDate() + i);
                this.dates.push(date.toDateString());
                this.checked.push(false);
                i += 1;
            }
        },
        isCurrentDate(dateString) {
            const date = new Date(dateString);
            return (
                date.getDate() === this.currentDate.getDate() &&
                date.getMonth() === this.currentDate.getMonth() &&
                date.getFullYear() === this.currentDate.getFullYear()
            );
        }
    }
};
</script>

<style>
.date-div-container {
    display: inline-block;
    width: 100%;
}

.date-div {
    width: calc(33.33% - 10px);
    box-sizing: border-box;
    display: inline-block;
    vertical-align: top;
    text-align: center;
    border: 1px solid black;
    padding: 10px;
    margin: 5px;
    cursor: pointer;

}

.date-div:hover {
    background-color: #f0f0f0;

}

.glow {
    animation: glow-animation 1s ease-in-out infinite alternate;
}

@keyframes glow-animation {
    0% {
        box-shadow: 0 0 5px yellow;
    }

    100% {
        box-shadow: 0 0 20px yellow;
    }
}

.date-div span {
    display: inline-block;
}

.date-div img {
    vertical-align: m iddle;
    margin-left: 5px;

}
</style>