<template>
  <v-container class="loading-container">
    <v-card theme="dark" class="loading-container-info">
      <v-avatar
        :image="ConfigData.LoadingAvatar"
        class="loading-avatar"
        size="100%"
      ></v-avatar>
      <v-card-text class="text-body-1 pa-2">{{ LoadingText }}</v-card-text>
    </v-card>
    <v-card theme="dark" class="loading-card pa-2">
      <v-progress-circular
        indeterminate
        :color="ConfigData.LoadingColor"
        :size="25"
      ></v-progress-circular>
      <v-progress-linear
        :model-value="LoadingProgress"
        :height="10"
        class="loading-bar"
        max="1"
      ></v-progress-linear>
    </v-card>
  </v-container>
</template>

<script setup>
import { useWindowEventListener } from '../utils/useServerMessages'
import Translations from '../../../config/Language.json'
import ConfigData from '../../../config/Config.json'

const LoadingProgress = ref(0)
const LoadingText = ref(Translations[ConfigData.Language]['LoadingDefault'])

// Handler for "message" event
const handleMessage = (event) => {
  const data = event.data

  switch (data.eventName) {
    case 'loadProgress':
      LoadingProgress.value = data.loadFraction
      break
    case 'initFunctionInvoked':
      switch (data.type) {
        case 'INIT_BEFORE_MAP_LOADED':
        case 'INIT_AFTER_MAP_LOADED':
          LoadingText.value = Translations[ConfigData.Language]['LoadingMap']
          break
        case 'INIT_SESSION':
          LoadingText.value =
            Translations[ConfigData.Language]['LoadingSession']
          break
      }
      break
  }
}

// Use the composable to listen for the "message" event
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
