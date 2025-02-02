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
import { ref, computed, onMounted } from 'vue'
import { useGlobalStore } from '@/stores/global'
import { useWindowEventListener } from '../utils/useServerMessages'

const globalStore = useGlobalStore()

const loadingProgress = ref(0)
const loadingText = ref('Loading...')
// Cargar la configuración si aún no está en la store
onMounted(() => {
  if (!globalStore.config) {
    globalStore.loadJson('Config.json', 'config')
  }
  if (!globalStore.language) {
    globalStore.loadJson('Language.json', 'language')
  }
})

// Computed para obtener los datos actualizados de la store
const config = computed(() => globalStore.config || {})
const translations = computed(() => globalStore.language || {})

// Actualizar el texto de carga según el idioma y la etapa de carga
const handleMessage = (event) => {
  const data = event.data

  if (!config.value || !translations.value) return

  switch (data.eventName) {
    case 'loadProgress':
      loadingProgress.value = data.loadFraction
      break
    case 'initFunctionInvoked':
      switch (data.type) {
        case 'INIT_BEFORE_MAP_LOADED':
        case 'INIT_AFTER_MAP_LOADED':
          loadingText.value =
            translations.value[config.value.Language]?.LoadingMap ||
            'Loading Map...'
          break
        case 'INIT_SESSION':
          loadingText.value =
            translations.value[config.value.Language]?.LoadingSession ||
            'Loading Session...'
          break
        default:
          loadingText.value =
            translations.value[config.value.Language]?.LoadingDefault ||
            'Loading...'
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
