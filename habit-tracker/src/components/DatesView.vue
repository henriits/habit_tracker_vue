<template>
  <div>
    <label for="daysBeforeInput" class="input-label">Days Before:</label>
    <input
      id="daysBeforeInput"
      type="number"
      v-model="numberOfDaysBefore"
      class="days-input"
      min="0"
    />
    <label for="daysAfterInput" class="input-label">Days After:</label>
    <input
      id="daysAfterInput"
      type="number"
      v-model="numberOfDaysAfter"
      class="days-input"
      min="0"
    />
  </div>
  <p class="sentence">Please select the number of days before and after today.</p>

  <div ref="scrollContainer" class="scroll-container" @scroll="handleScroll">
    <div class="date-div-container">
      <div
        v-for="(date, index) in dates"
        :key="index"
        @click="handleDateClick(date)"
        @keydown="index"
        :class="{
          'date-div': true,
          'glow-selected': isSelectedDate(date),
          today: date === today,
        }"
      >
        <span>{{ date }}</span>
      </div>
    </div>
  </div>
  <div class="scroll-button-position">
    <button class="custom-button" type="button" @click="scrollToMiddle">
      Scroll to Selected Date
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const currentDate = new Date();
const numberOfDaysBefore = ref(10);
const numberOfDaysAfter = ref(10);
const dates = ref([]);
const scrollContainer = ref(null);
const scrollTimeout = ref(null);
const selectedDate = ref(null);
const today = new Date().toDateString(); // Calculate today's date once

const generateDates = () => {
  dates.value = [];
  let i = -numberOfDaysBefore.value;
  while (i <= numberOfDaysAfter.value) {
    const date = new Date();
    date.setDate(currentDate.getDate() + i);
    dates.value.push(date.toDateString());
    i += 1;
  }
};

const isSelectedDate = (dateString) => dateString === selectedDate.value;

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const handleDateClick = (date) => {
  selectedDate.value = date;
  const formattedDate = formatDate(new Date(date));
  router.push({ name: "dateDetails", params: { date: formattedDate } });
};

const scrollToMiddle = () => {
  const container = scrollContainer.value;
  if (container) {
    const middlePosition = container.scrollWidth / 2 - container.clientWidth / 2;
    container.scrollLeft = middlePosition;
  }
};

const handleScroll = () => {
  clearTimeout(scrollTimeout.value);
};

onMounted(() => {
  generateDates();
});

// Watch for changes in numberOfDaysBefore and numberOfDaysAfter
watch([numberOfDaysBefore, numberOfDaysAfter], () => {
  generateDates();
});
</script>

<style scoped>
.input-label {
  font-size: 16px;
  margin-right: 10px;
}

.days-input {
  width: 50px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin-right: 20px;
}

.sentence {
  font-size: 18px;
  margin-top: 10px;
}

.scroll-button-position {
  margin: 30px;
}

.date-div-container {
  display: inline-block;
  width: max-content;
  margin: 20px;
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
  width: 60px;
  border-radius: 30px;
}

.date-div:hover {
  background-color: #f0f0f042;
}

.scroll-container {
  direction: ltr;
  display: block;
  overflow: auto;
  height: 20%;
}

.glow-selected {
  animation: glow-animation 1s ease-in-out infinite alternate;
}

.today {
  background-color: aquamarine;
  color: #000;
}

.today:hover {
  color: #fff;
}

@keyframes glow-animation {
  0% {
    box-shadow: 0 0 5px aquamarine;
  }

  100% {
    box-shadow: 0 0 20px aquamarine;
  }
}

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
  background: aqua;
}
</style>
