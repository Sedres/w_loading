<template>
  <v-sheet theme="dark" class="socials">
    <v-btn
      v-for="social in globalStore.socials?.Socials"
      :key="social.icon"
      theme="dark"
      :ripple="false"
      variant="text"
      class="socials-btn"
      :icon="social.icon"
      @click="openUrl(social.url)"
    >
    </v-btn>
  </v-sheet>
</template>

<script setup>
import { useGlobalStore } from '@/stores/global'

const globalStore = useGlobalStore()

// Computed para usar el ShadowColor con v-bind
const shadowColor = computed(
  () => globalStore.config?.ShadowColor || 'rgba(255, 255, 255, 1)'
)

function openUrl(url) {
  if (window.invokeNative) {
    window.invokeNative('openUrl', url)
  } else {
    console.error('invokeNative no está disponible.')
  }
}
</script>

<style scoped>
.socials {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  max-height: 500px;
  gap: 20px;

  background: none;

  z-index: 2;
  padding: 10px;
  border-radius: 10px;
  color: white;
  transition: text-shadow 0.5s, color 0.5s;
}

.socials-btn {
  background: var(--backgrounds);
  border-radius: 10px;
  color: white;
  cursor: pointer;
  transition: scale 0.2s, text-shadow 0.2s;
}

.socials-btn:hover {
  scale: 1.1;
  box-shadow: 0 0px 20px v-bind(shadowColor);
}

.socials-btn:active {
  transform: scale(0.8);
}
</style>
