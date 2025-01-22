<template>
  <div>
    <!-- Imagen de fondo -->
    <v-img
      v-if="Background.IsImage"
      aspect-ratio="16/9"
      cover
      :src="Background.Path"
      class="background-image"
    ></v-img>

    <!-- Video local de fondo -->
    <video
      v-else-if="Background.IsVideo"
      autoplay
      muted
      loop
      playsinline
      class="background-video"
    >
      <source src="../assets/background.mp4" type="video/mp4" />
      Tu navegador no soporta la reproducción de video.
    </video>

    <!-- Video de YouTube de fondo -->
    <iframe
      v-else-if="Background.IsYouTube"
      :src="youtubeURL"
      class="background-youtube"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script setup>
import { Background } from '../../../config/Config.json'

const youtubeURL = computed(() => {
  if (!Background.VideoId) return ''
  return `https://www.youtube.com/embed/${Background.VideoId}
    ?autoplay=1
    &mute=1
    &loop=1
    &controls=0
    &showinfo=0
    &rel=0
    &playlist=${Background.VideoId}`.replace(/\s+/g, '') // Quita espacios
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
