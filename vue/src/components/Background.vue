<template>
  <div v-if="config">
    <!-- Imagen de fondo -->
    <v-img
      v-if="isImage"
      :src="`nui://w_loading/${config.Background.Path}`"
      aspect-ratio="16/9"
      cover
      class="background-image"
      @error="handleImageError"
    ></v-img>

    <!-- Video local de fondo -->
    <video
      v-if="isVideo"
      ref="videoElement"
      :src="videoSource"
      loop
      muted
      autoplay
      preload="auto"
      class="background-video"
      @error="handleVideoError"
      @loadeddata="onVideoLoaded"
      @canplay="onVideoCanPlay"
      @stalled="onVideoStalled"
    ></video>

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
import { ref, computed, watch, onMounted } from 'vue'

// Recibir la configuración desde el padre
const props = defineProps({
  config: {
    type: Object,
    required: true
  }
})

// Desestructurar `config` para evitar acceder directamente a `props.config`
const background = computed(() => props.config?.Background || {})

const videoElement = ref(null)

// Computed properties para acceder a la configuración de fondo de forma segura
const isImage = computed(() => {
  const result = background.value?.IsImage && background.value?.Path
  console.log('isImage:', result)
  return result
})

const isVideo = computed(() => {
  const result = background.value?.IsVideo && background.value?.Path
  console.log('isVideo:', result)
  return result
})

const isYouTube = computed(() => {
  const result = background.value?.IsYouTube && background.value?.VideoId
  console.log('isYouTube:', result)
  return result
})

// Fuente del video (manejo seguro)
const videoSource = computed(() => {
  const source = isVideo.value ? `nui://w_loading/${background.value.Path}` : ''
  console.log('videoSource:', source)
  return source
})

// URL de YouTube formateada correctamente
const youtubeURL = computed(() => {
  const url = isYouTube.value
    ? `https://www.youtube.com/embed/${background.value.VideoId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=${background.value.VideoId}`
    : ''
  console.log('youtubeURL:', url)
  return url
})

// Función para recargar el video en caso de error
const reloadVideo = () => {
  if (videoElement.value) {
    console.warn('Recargando el video...')
    videoElement.value.pause()
    videoElement.value.currentTime = 0
    videoElement.value.load()
    videoElement.value.play().catch((err) => {
      console.error('Error al intentar reproducir el video:', err)
    })
  }
}

const handleVideoError = (event) => {
  console.error('Error al cargar el video:', JSON.stringify(event))
  console.warn('Intentando recargar el video...')
  reloadVideo()
}

const onVideoLoaded = () => {
  console.log('Datos del video cargados.')
}

const onVideoCanPlay = () => {
  console.log('El video está listo para reproducirse.')
}

const onVideoStalled = () => {
  console.warn('La carga del video se ha detenido, intentando recargar...')
  reloadVideo()
}

// Manejo de errores
const handleImageError = (event) => {
  console.error('Error al cargar la imagen:', event)
}

// Ver cambios en config para recargar contenido
watch(
  () => props.config,
  (newConfig) => {
    console.log('Nueva configuración:', newConfig)
  }
)

// Inicialización al montar el componente
onMounted(() => {
  console.log('Componente montado con configuración:', props.config)
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
