<template>
  <form class="wizard" @submit.prevent="handleWizardSubmit">
    <h1>
      Presentation <br />
      karaoke machine
    </h1>
    <p class="intro">First, give us some keywords</p>

    <div class="inputs">
      <span v-for="(input, index) in Array(amount)" :key="index" class="p-form-group">
        <label :for="`keyword_${index}`">Keyword {{ index + 1 }}</label>
        <InputText :id="`keyword_${index}`" type="text" v-model="keywords[index]" class="p-inputtext-lg" required />
      </span>
    </div>

    <Button label="Generate slides" class="p-button-lg p-button-raised" :loading="loading" type="submit" />
  </form>
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext";
const emit = defineEmits(["submit"]);

const { loading, amount } = defineProps({
  loading: {
    default: false,
    type: Boolean,
  },
  amount: {
    default: 2,
    type: Number,
  },
});

const keywords = [];

function handleWizardSubmit(data) {
  emit("submit", keywords);
}
</script>

<style>
.wizard {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: var(--space-l);
}

h1 {
  margin-block: 0;
  font-size: var(--step-3);
}

.intro {
  font-size: var(--step--1);
}

.inputs {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: var(--space-xs) var(--space-s);
  grid-auto-flow: dense;
  inline-size: 100%;
  margin: 0 auto;
  max-width: 900px;
  margin-block-end: var(--space-s);
}

.p-inputtext {
  inline-size: 100%;
}

.p-form-group {
  text-align: left;
}

label {
  display: inline-block;
  margin-bottom: 0.33rem;
}
</style>
