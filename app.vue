<template>
  <div class="scroller">
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <Wizard class="screen" @submit="handleWizardSubmit" :loading="state.loading" :amount="10" />
    <Slide ref="slideRefs" v-for="(slide, index) in state.slides" :key="index" class="screen slide" :slide="slide" />
    <RandomDate class="screen" />
  </div>
</template>

<script setup lang="ts">
import pMap from './lib/pMap';
import timeout from './lib/timeout';
import type { Slide } from './server/api/slide';

let errorMessage = null

const keywords = []

const slideRefs = ref(null)
defineExpose({ slideRefs })

async function getSlide(keyword: string): Promise<Slide> {
  errorMessage = null
  await timeout(500)
  return $fetch(`/api/slide?keyword=${keyword}`).catch(err => {
    console.error(err)
    errorMessage = "Error: during fetching slides"
  }) as Promise<Slide>
}

let state = reactive({ slides: [], loading: false });

async function handleWizardSubmit(keywords: string[]) {
  state.loading = true
  state.slides = await pMap(keywords, getSlide, { concurrency: 1 }) as Slide[]
  await nextTick()
  document.querySelector('.slide').scrollIntoView({ behavior: 'smooth' })
  state.loading = false
}
</script>