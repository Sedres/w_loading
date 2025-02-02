<script setup>
import { useGlobalStore } from '@/stores/global'
const globalStore = useGlobalStore()
onMounted(async () => {
  await globalStore.loadAllConfigs()
})
</script>
<template>
  <Background />
  <InfoCard />
  <v-container class="bottom-container">
    <MusicPlayer />
    <Socials />
    <LoadingCard />
  </v-container>
</template>

<style>
:root {
  --backgrounds: linear-gradient(
    -135deg,
    #00000091 0%,
    #1a1a1aab 50%,
    #333333 100%
  );
}
html {
  scrollbar-width: none;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.bottom-container {
  position: absolute;
  bottom: 0;
  left: 0;
  max-width: 600px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: start;
  justify-content: space-between;
}
</style>
