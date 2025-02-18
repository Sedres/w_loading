<template>
  <v-container class="loading-container">
    <v-card theme="dark" class="loading-container-info">
      <v-avatar
        v-if="config"
        :image="config.LoadingAvatar"
        class="loading-avatar"
        size="100%"
      ></v-avatar>
      <v-card-text class="text-body-1 pa-2">{{ loadingText }}</v-card-text>
    </v-card>
    <v-card theme="dark" class="loading-card pa-2">
      <v-progress-circular
        indeterminate
        :color="config?.LoadingColor || 'white'"
        :size="25"
      ></v-progress-circular>
      <v-progress-linear
        :model-value="loadingProgress"
        :height="10"
        class="loading-bar"
        max="1"
      ></v-progress-linear>
    </v-card>
  </v-container>
</template>

<script setup>
import { useWindowEventListener } from '../utils/useServerMessages'

// Recibir `config` y `language` como props desde el padre
const props = defineProps({
  config: Object,
  language: Object
})

const loadingProgress = ref(0)
const loadingText = ref('Loading...')

// Actualizar el texto de carga según el idioma y la etapa de carga
const handleMessage = (event) => {
  const data = event.data

  if (!props.config || !props.language) return

  const currentLang = props.language?.[props.config.Language] || {}

  switch (data.eventName) {
    case 'loadProgress':
      loadingProgress.value = data.loadFraction
      break
    case 'initFunctionInvoked':
      switch (data.type) {
        case 'INIT_BEFORE_MAP_LOADED':
        case 'INIT_AFTER_MAP_LOADED':
          loadingText.value = currentLang?.LoadingMap || 'Loading Map...'
          break
        case 'INIT_SESSION':
          loadingText.value =
            currentLang?.LoadingSession || 'Loading Session...'
          break
        default:
          loadingText.value = currentLang?.LoadingDefault || 'Loading...'
          break
      }
      break
  }
}

// Escuchar los eventos del servidor
useWindowEventListener('message', handleMessage)
</script>

<style scoped>
.loading-container {
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: flex-start;
  gap: 10px;
}

.loading-container-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: var(--backgrounds);
  width: 200px;
}

.loading-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 500px;
  border-radius: 10px;
  background: var(--backgrounds);
}

.loading-bar {
  border-radius: 16px;
}

.loading-avatar {
  border-radius: 0;
  width: 100%;
  height: auto;
}
</style>
