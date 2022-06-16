<template>
  <div class="random">
    <form @submit.prevent="handleFormSubmit">
      <p>
        <span>Generate a random date, on a working day, between </span> <br>
        <strong>{{ formatDate(startDate) }}</strong>
        <span> and </span>
        <strong>{{ formatDate(endDate) }}</strong>
      </p>
      <Button label="Generate date" class="p-button-lg p-button-raised" type="submit" />
    </form>
    <div class="result" :style="{ 'visibility': state.result !== 'nothing' ? 'visible' : 'hidden' }">
      {{ state.result }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { eachDayOfInterval, getDay } from 'date-fns'
import Calendar from 'primevue/calendar'
let state = reactive({ result: 'nothing' })

const startDate = new Date('2022-9-01')
const endDate = new Date('2022-12-31')
const formatDate = (date: Date) => date.toLocaleDateString('nl-NL', { dateStyle: 'long' })

function handleFormSubmit() {
  const workingDays = eachDayOfInterval({ start: startDate, end: endDate }).filter(date => ![0, 6].includes(getDay(date)))
  const randomDate = workingDays[Math.floor(Math.random() * workingDays.length)]
  state.result = randomDate.toLocaleDateString('en-GB', { dateStyle: 'full' })
}

</script>

<style>
.random {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--space-s);

  inline-size: 100%;
  block-size: 100%;

  font-size: var(--step-0);
  text-align: center;
  line-height: 1.5;
}

.result {
  font-weight: bold;
  font-size: var(--step-3);
}
</style>