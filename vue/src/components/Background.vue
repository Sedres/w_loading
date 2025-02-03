<template>
  <div>
    <!-- Imagen de fondo -->
    <v-img
      v-if="background?.IsImage"
      aspect-ratio="16/9"
      cover
      :src="background.Path"
      class="background-image"
    ></v-img>

    <!-- Video local de fondo -->
    <video
      v-else-if="background?.IsVideo"
      autoplay
      muted
      loop
      playsinline
      class="background-video"
    >
      <source
        :src="background.Path ? 'nui://w_loading/' + background.Path : ''"
        type="video/mp4"
      />
      Tu navegador no soporta la reproducción de video.
    </video>

    <!-- Video de YouTube de fondo -->
    <iframe
      v-else-if="background?.IsYouTube"
      :src="youtubeURL"
      class="background-youtube"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useGlobalStore } from '@/stores/global'

const globalStore = useGlobalStore()

// Cargar la configuración si aún no está en la store
onMounted(async () => {
  if (Object.keys(globalStore.config).length === 0) {
    globalStore.loadJson('Config.json', 'config')
  }
})

// Computed para evitar errores de acceso a `null`
const background = computed(() => globalStore.config?.Background || {})

// Computed para generar la URL de YouTube correctamente
const youtubeURL = computed(() => {
  if (!background.value.VideoId) return ''
  return `https://www.youtube.com/embed/${background.value.VideoId}
    ?autoplay=1
    &mute=1
    &loop=1
    &controls=0
    &showinfo=0
    &rel=0
    &playlist=${background.value.VideoId}`.replace(/\s+/g, '')
})
</script>

<style scoped>
.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  user-select: none;
}

.background-video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  pointer-events: none;
  user-select: none;
}

.background-youtube {
  position: fixed;
  top: -19%;
  left: -19%;
  width: 150%;
  height: 150%;
  z-index: -1;
  pointer-events: none;
  user-select: none;
}
</style>
