<template>
  <div ref="scrollContainer" class="scroll-container" @scroll="handleScroll">
    <div class="date-div-container">
      <div
        v-for="(date, index) in dates"
        :key="index"
        @click="handleDateClick(date)"
        @keydown="index"
        class="date-div"
        :class="{ glow: isCurrentDate(date) }"
      >
        <span>{{ date }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const currentDate = new Date();
const numberOfDaysBefore = 7;
const numberOfDaysAfter = 7;
const dates = ref([]);
const checked = ref([]);
const scrollContainer = ref(null);
const scrollTimeout = ref(null);

const generateDates = () => {
  let i = -numberOfDaysBefore;
  while (i <= numberOfDaysAfter) {
    const date = new Date();
    date.setDate(currentDate.getDate() + i);
    dates.value.push(date.toDateString());
    checked.value.push(false);
    i += 1;
  }
};

const isCurrentDate = (dateString) => {
  const date = new Date(dateString);
  return (
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  );
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}_${month}_${day}`;
};

const handleDateClick = (date) => {
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
  scrollTimeout.value = setTimeout(() => {
    scrollToMiddle();
  }, 5000);
};

onMounted(() => {
  generateDates();
  setTimeout(() => {
    scrollToMiddle();
  }, 3000);
});

onBeforeUnmount(() => {
  clearTimeout(scrollTimeout.value);
});
</script>

<style scoped>
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

.glow {
  animation: glow-animation 1s ease-in-out infinite alternate;
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
