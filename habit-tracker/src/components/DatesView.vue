<template>
    <div ref="scrollContainer" class="scroll-container" @scroll="handleScroll">
        <div class="date-div-container">
            <div v-for="(date, index) in dates" :key="index" @click="handleDateClick(date)" @keydown="index"
                class="date-div" :class="{ 'glow': isCurrentDate(date) }">
                <span>{{ date }}</span>
            </div>
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
        // Automatically scroll back to the middle after a delay
        setTimeout(() => {
            this.scrollToMiddle();
        }, 3000); // Adjust the delay as needed
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
        },
        handleDateClick(date) {
            this.$router.push({ name: 'dateDetails', params: { date } });
        },
        scrollToMiddle() {
            const container = this.$refs.scrollContainer;
            if (container) {
                const middlePosition = container.scrollWidth / 2 - container.clientWidth / 2;
                container.scrollLeft = middlePosition;
            }
        },
        handleScroll() {
            clearTimeout(this.scrollTimeout);
            this.scrollTimeout = setTimeout(() => {
                this.scrollToMiddle();
            }, 5000); // Adjust the delay as needed
        }
    }
};
</script>

<style>
/* For WebKit (Safari, Google Chrome etc.) */
::-webkit-scrollbar {
    width: 12px;

}

::-webkit-scrollbar-track {
    background: #f1f1f140;
    border-radius: 6px;
}

::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
    background: #0ea918;
}


.scroll-container {
    direction: ltr;
    display: block;
    overflow: auto;
    height: 20%;
    width: 56%;
}

.date-div-container {
    display: inline-block;
    width: max-content;
}

.date-div {
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
    background-color: #f0f0f042;
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
    vertical-align: middle;
    margin-left: 5px;
}


@media screen and (width <=768px) {
    .scroll-container {
        /* Adjust width for smaller screens */
        width: 100%;

        /* Optionally, you can also adjust other properties like padding or margin */
    }
}
</style>
