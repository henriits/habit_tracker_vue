<template>
  <div class="date-container">
    <div class="input-section">
      <label for="daysBeforeInput" class="input-label">Days Before:</label>
      <input
        id="daysBeforeInput"
        type="number"
        v-model="numberOfDaysBefore"
        class="days-input"
        min="0"
        max="30"
      />
      <label for="daysAfterInput" class="input-label">Days After:</label>
      <input
        id="daysAfterInput"
        type="number"
        v-model="numberOfDaysAfter"
        class="days-input"
        min="0"
        max="30"
      />
    </div>
    <p class="sentence">Please select the number of days before and after today.</p>
  </div>

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
    <p>Select a date to view your added habits!</p>
    <button class="scroll-button" type="button" @click="scrollToMiddle">
      Scroll to Middle
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const currentDate = new Date();
const numberOfDaysBefore = ref(7);
const numberOfDaysAfter = ref(7);
const dates = ref([]);
const scrollContainer = ref(null);
const scrollTimeout = ref(null);
const selectedDate = ref(null);
const today = new Date().toDateString();

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
  const dateDivContainer = scrollContainer.value.querySelector(".date-div-container");
  if (dateDivContainer) {
    const middlePosition =
      dateDivContainer.scrollWidth / 2 - dateDivContainer.clientWidth / 2;
    dateDivContainer.scrollLeft = middlePosition;
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
p {
  color: #6c757d;
}

.input-section {
  display: flex;
  align-items: center;
}

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

.scroll-button {
  font-size: 16px;
  padding: 8px 12px;
  margin-left: 5px;
  margin-top: 30px;
  background-color: aquamarine;
  color: #100d0d;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  max-width: 100%;
}

.scroll-button:hover {
  background-color: aqua;
}

.date-div-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  width: 100%;
  margin: 20px;
  overflow-x: auto;
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

.date-container,
.scroll-button-position {
  direction: ltr;
  overflow: auto;
  height: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
