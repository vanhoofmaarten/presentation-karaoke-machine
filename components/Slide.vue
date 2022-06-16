<template>
  <div>
    <div class="screen-content">
      <h2 class="screen-title">{{ slide.keyword }}</h2>
      <ul v-if="slide.synonyms.length" style="margin-bottom: 0">
        <li v-for="(synonym, index) in slide.synonyms">
          {{ synonym }}
        </li>
      </ul>
    </div>
    <img :src="slide.imageUrl" alt="A random image from Unsplash" class="screen-image" />
  </div>
</template>

<script setup lang="ts">
import type { Slide } from '~/server/api/slide';

const props = defineProps<{ slide: Slide }>()

</script>

