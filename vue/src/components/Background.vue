<template>
  <div>
    <!-- Imagen de fondo -->
    <v-img
      v-if="isImage"
      aspect-ratio="16/9"
      cover
      :src="background.Path"
      class="background-image"
    ></v-img>

    <!-- Video local de fondo -->
    <video
      v-else-if="isVideo"
      autoplay
      muted
      loop
      playsinline
      class="background-video"
      @error="reloadVideo"
      ref="videoElement"
    >
      <source :src="videoSource" type="video/mp4" />
      Tu navegador no soporta la reproducción de video.
    </video>

    <!-- Video de YouTube de fondo -->
    <iframe
      v-else-if="isYouTube"
      :src="youtubeURL"
      class="background-youtube"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useGlobalStore } from '@/stores/global'

const globalStore = useGlobalStore()
const videoElement = ref(null)

// Asegurar que la configuración esté cargada
onMounted(async () => {
  if (!globalStore.config.Background) {
    await globalStore.loadJson('Config.json', 'config')
  }
})

// Computed properties para simplificar condiciones
const background = computed(() => globalStore.config?.Background || {})
const isImage = computed(
  () => background.value?.IsImage && background.value.Path
)
const isVideo = computed(
  () => background.value?.IsVideo && background.value.Path
)
const isYouTube = computed(
  () => background.value?.IsYouTube && background.value.VideoId
)

// Fuente del video (manejo seguro)
const videoSource = computed(() =>
  isVideo.value ? `nui://w_loading/${background.value.Path}` : ''
)

// URL de YouTube formateada correctamente
const youtubeURL = computed(() =>
  isYouTube.value
    ? `https://www.youtube.com/embed/${background.value.VideoId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=${background.value.VideoId}`
    : ''
)

// Función para recargar el video en caso de error
const reloadVideo = () => {
  if (videoElement.value) {
    console.warn('El video no se pudo cargar, intentando recargar...')
    videoElement.value.load()
  }
}

// Vigilar cambios en la configuración para recargar si es necesario
watch(background, (newVal, oldVal) => {
  if (newVal.Path !== oldVal.Path) {
    if (videoElement.value) {
      videoElement.value.load()
    }
  }
})
</script>

<style scoped>
.background-image,
.background-video,
.background-youtube {
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
  top: -19%;
  left: -19%;
  width: 150%;
  height: 150%;
}
</style>
